import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
// You'll need to replace this with your actual API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

// Create a client
export const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate a story using Gemini
export async function generateStoryWithGemini(
  characterName: string,
  setting: string
): Promise<string> {
  try {
    // Make sure API key is available
    if (!API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct the prompt
    const prompt = `
      Create a short, engaging bedtime story for children with the following details:
      - Main character: ${characterName || "a brave child"}
      - Setting: ${setting || "a magical forest"}
      - The story should be positive, uplifting, and have a gentle moral lesson
      - Keep it under 500 words
      - Make it engaging and imaginative
      - End with a calming conclusion
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    return "I couldn't create a story right now. Please try again later.";
  }
}
