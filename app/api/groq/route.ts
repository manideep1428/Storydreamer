import { NextRequest, NextResponse } from 'next/server';
import Groq  from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function getGroqChatCompletion(characterName: string, setting: string) {
  try {
    const systemPrompt = "Generate a **short, engaging bedtime story** for children based on the given theme and characters. Keep it simple, magical, and soothing, ensuring it's easy to listen to before sleep.";
    
    // Construct the user prompt based on the provided character and setting
    let userPrompt = "Create a bedtime story";
    if (characterName) {
      userPrompt += ` with a main character named ${characterName}`;
    }
    if (setting) {
      userPrompt += ` set in ${setting}`;
    }
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return chatCompletion.choices[0]?.message?.content || "Once upon a time...";
  } catch (error) {
    console.error("Error in Groq API:", error);
    throw new Error("Failed to generate story with Groq");
  }
}

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
    
    const story = await getGroqChatCompletion(characterName, setting);
    
    return NextResponse.json({ story });
  } catch (error) {
    console.error('Error in Groq API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}
