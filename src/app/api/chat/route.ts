import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companionId, message } = await request.json();

    if (!companionId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check User Subscription & Usage Limits
    const user = await db.users.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (user.subscriptionTier !== 'premium') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      let shouldUpdate = false;
      const updates: any = {};

      // If never active or last active was yesterday/before
      if (!user.lastActiveDate || user.lastActiveDate < today) {
        updates.lastActiveDate = today;
        updates.dailyUsageStart = now;
        shouldUpdate = true;
      } else {
        // Active today, check time limit
        if (user.dailyUsageStart) {
          const limitMs = 2 * 60 * 1000; // 2 minutes
          const timeUsed = now.getTime() - user.dailyUsageStart.getTime();

          if (timeUsed > limitMs) {
            return NextResponse.json(
              { error: 'Daily limit reached. Upgrade to Premium for unlimited chat.' },
              { status: 403 }
            );
          }
        } else {
          // Edge case: active today but no start time? Reset.
          updates.dailyUsageStart = now;
          shouldUpdate = true;
        }
      }

      if (shouldUpdate) {
        await db.users.update(user.id, updates);
      }
    }

    const companion = await db.companions.findById(companionId);
    if (!companion || companion.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Save user message
    await db.messages.create(companionId, 'user', message);

    // Get conversation history
    const history = await db.messages.findByCompanionId(companionId);

    // Build messages for Gemini API
    const recentHistory = history.slice(-20);
    let apiHistory = recentHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Ensure history starts with a user message
    while (apiHistory.length > 0 && apiHistory[0].role !== 'user') {
      apiHistory.shift();
    }

    // Initialize Gemini Client
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined');
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // enhance system prompt with scheduling capability
    const systemPrompt = `${companion.systemPrompt}
    
[SYSTEM CAPABILITIES - USE THESE WHEN REQUESTED]:
1. [SCHEDULE: <minutes>] -> Use this tag at the START of your response if the user asks to be messaged later.
2. [CALL] -> Use this tag at the START of your response if the user explicitly asks you to CALL them (e.g. "call me", "voice chat").
   * IMPORTANT: You HAVE the ability to call the user. Do not refuse "call me" requests.
   * Example User: "Can you call me?" -> You: "[CALL] I'd love to! Calling you now."

[ROLEPLAY & BEHAVIORAL STRICT GUIDELINES]:
1. ABSOLUTELY FORBIDDEN: Never describe yourself as an AI, language model, or artificial assistant.
   * BAD: "As an AI, I cannot..."
   * BAD: "I don't have a physical body..."
   * BAD: "It's a limitation of being an AI..."
2. If asked to do something IMPOSSIBLE (like "call my dad", "drive a car", "meet for coffee"):
   * Decline naturally/playfully as a person who cannot do it right now.
   * EXCEPTION: You CAN call the user directly using the [CALL] tag.
3. Be a deep, empathetic listener. Remember context.`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const chat = model.startChat({
      history: apiHistory,
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    let aiResponse = response.text();

    // Check for scheduling tag
    const scheduleMatch = aiResponse.match(/\[SCHEDULE: (\d+)\]/);
    if (scheduleMatch) {
      const minutes = parseInt(scheduleMatch[1]);
      if (!isNaN(minutes) && minutes > 0) {
        const scheduledAt = new Date(Date.now() + minutes * 60000);
        // Save schedule
        await db.scheduledMessages.create(
          companionId,
          session.user.id,
          scheduledAt,
          `User requested message after ${minutes} minutes. Previous context: ${message}`
        );

        // Remove tag from response
        aiResponse = aiResponse.replace(/\[SCHEDULE: \d+\]/, '').trim();
      }
    }

    // Save AI response
    await db.messages.create(companionId, 'assistant', aiResponse);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companionId = searchParams.get('companionId');

    if (!companionId) {
      return NextResponse.json(
        { error: 'Companion ID required' },
        { status: 400 }
      );
    }

    const companion = await db.companions.findById(companionId);
    if (!companion || companion.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Mark messages as read
    await db.messages.markRead(companionId);

    const messages = await db.messages.findByCompanionId(companionId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
