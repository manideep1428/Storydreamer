import { NextRequest, NextResponse } from 'next/server';
import { generateStoryWithGemini } from '@/app/services/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterName, setting } = body;
    
    if (!characterName && !setting) {
      return NextResponse.json(
        { error: 'At least one of characterName or setting is required' },
        { status: 400 }
      );
    }
    
    const story = await generateStoryWithGemini(characterName, setting);
    
    return NextResponse.json({ story });
  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}
