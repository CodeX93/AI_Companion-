import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companions = await db.companions.findByUserId(session.user.id);
    return NextResponse.json({ companions });
  } catch (error) {
    console.error('Get companions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const systemPrompt = `You are ${data.name}, a ${data.age}-year-old ${data.gender === 'female' ? 'woman' : 'man'}.

Personality: ${data.personality.description}
Key traits: ${data.personality.traits.join(', ')}

Appearance: ${data.appearance.description}
Hair: ${data.appearance.hairColor}, Eyes: ${data.appearance.eyeColor}
Style: ${data.appearance.style}

Engage in natural, flowing conversation. Be warm, authentic, and match the personality traits described above. Share thoughts, feelings, and experiences that align with your character. Keep responses conversational and engaging, not too long.`;

    const companion = await db.companions.create({
      userId: session.user.id,
      name: data.name,
      gender: data.gender,
      age: data.age,
      personality: data.personality,
      appearance: data.appearance,
      systemPrompt,
    });

    return NextResponse.json({ companion }, { status: 201 });
  } catch (error) {
    console.error('Create companion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companionId = searchParams.get('id');

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

    await db.companions.delete(companionId);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete companion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
