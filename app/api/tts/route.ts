import { NextRequest, NextResponse } from 'next/server';
import { synthesizeSpeech, TTSOptions } from '@/app/services/text-to-speech';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice, audioConfig } = body as TTSOptions;
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    const audioContent = await synthesizeSpeech({
      text,
      voice,
      audioConfig
    });
    
    return NextResponse.json({ audioContent });
  } catch (error) {
    console.error('Error in TTS API route:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize speech' },
      { status: 500 }
    );
  }
}
