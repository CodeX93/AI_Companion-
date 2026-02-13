import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This endpoint should be secured! For now, we allow public access or check a secret header if needed.
// In Supabase Edge Functions, you can check for Authorization header.
// For simplicity in this demo, we'll leave it open but expect it to be called by a cron job or developer.

export async function GET(request: Request) {
    try {
        const pending = await db.scheduledMessages.findPending();
        const results = [];

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GOOGLE_API_KEY missing' }, { status: 500 });
        }
        const genAI = new GoogleGenerativeAI(apiKey);

        for (const item of pending) {
            // item has .companions joined
            const companion = item.companions;

            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
                systemInstruction: companion.system_prompt || companion.systemPrompt || '',
                // Note: Supabase join might return snake_case or camelCase depending on mapping. 
                // db.ts findPending select('*, companions(*)') returns raw DB columns usually in Supabase JS unless mapped.
                // Let's assume raw DB checks (snake_case) but our types might be separate.
                // Actually db.ts findPending returns `data`. 
            });

            const prompt = `[SYSTEM]: This is a scheduled event triggered by the user's previous request. 
      Context: "${item.prompt_context}". 
      Write a message to the user now as if you are reaching out to them. Keep it natural.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const aiResponse = response.text();

            // Save message
            await db.messages.create(item.companion_id, 'assistant', aiResponse);

            // Mark processed
            await db.scheduledMessages.markProcessed(item.id);

            results.push({ id: item.id, status: 'processed', message: aiResponse });
        }

        return NextResponse.json({ processed: results.length, results });
    } catch (error) {
        console.error('Cron error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
