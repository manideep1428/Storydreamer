import textToSpeech from '@google-cloud/text-to-speech';

// Initialize the Text-to-Speech client
// Note: This requires proper authentication setup
// For client-side usage, we'll need to create an API route
let ttsClient: textToSpeech.TextToSpeechClient | null = null;

// Initialize the TTS client if credentials are available
try {
  // In production, you would use proper authentication
  // This is just a placeholder for demonstration
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    ttsClient = new textToSpeech.TextToSpeechClient();
  }
} catch (error) {
  console.error('Failed to initialize Text-to-Speech client:', error);
}

export interface TTSOptions {
  text: string;
  voice?: {
    languageCode: string;
    name?: string;
    ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  };
  audioConfig?: {
    audioEncoding: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
    pitch?: number;
    speakingRate?: number;
  };
}

export async function synthesizeSpeech(options: TTSOptions): Promise<string> {
  if (!ttsClient) {
    throw new Error('Text-to-Speech client is not initialized');
  }

  try {
    const request = {
      input: { text: options.text },
      voice: options.voice || {
        languageCode: 'en-US',
        ssmlGender: 'NEUTRAL' as const,
      },
      audioConfig: options.audioConfig || {
        audioEncoding: 'MP3' as const,
        pitch: 0,
        speakingRate: 1.0,
      },
    };

    // Perform the text-to-speech request
    const [response] = await ttsClient.synthesizeSpeech(request);
    
    if (response.audioContent) {
      // Convert audio content to base64 for browser playback
      const audioBase64 = Buffer.from(response.audioContent as Uint8Array).toString('base64');
      return `data:audio/mp3;base64,${audioBase64}`;
    }
    
    throw new Error('No audio content received');
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
}
