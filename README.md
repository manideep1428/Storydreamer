# AI Bedtime Story Generator

## Overview

AI Bedtime Story Generator is a child-friendly web application that allows kids to create personalized bedtime stories using AI and listen to them with voice narration.

## Features

- **AI Story Generation**: Uses the Gemini API to create unique bedtime stories based on user prompts.
- **Text-to-Speech (TTS)**: Converts generated stories into audio using Google Speech.
- **Child-Friendly UI**: Designed with a gradient, playful theme for an engaging experience.
- **Seamless User Experience**: Built with Next.js and ShadCN for smooth animations and responsiveness.

## Technologies Used

- **Frontend**: Next.js, ShadCN (for UI components)
- **AI Integration**: Gemini API (for story generation)
- **Text-to-Speech**: Google Speech (for narration)
- **Styling**: Tailwind CSS with a vibrant children's theme

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-bedtime-story.git
   cd ai-bedtime-story
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up API keys for Gemini and Google Speech in an `.env` file.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter a story prompt (e.g., characters, setting, theme).
2. Click **Generate Story** to receive an AI-generated bedtime tale.
3. Press **Play** to listen to the narrated version.

## Future Enhancements

- **Save & Share**: Allow users to save and share their favorite stories.
- **Illustrations**: Auto-generate storybook illustrations.
- **Multi-Language Support**: Expand narration to different languages.

## License

MIT License

