"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Wand2, BookOpen, Volume2, Stars, Moon } from "lucide-react";
import { audioPlayer } from "@/app/utils/audio";
import axios from "axios"

export default function Home() {
  const [story, setStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [characterName, setCharacterName] = useState("");
  const [setting, setSetting] = useState("");
  const [error, setError] = useState("");

  const generateStory = async () => {
    try {
      setError("");
      setIsGenerating(true);
      
      const response = await axios.post("/api/groq", {
        characterName,
        setting
      });
      
      setStory(response.data.story);
    } catch (err) {
      console.error("Error generating story:", err);
      setError(err instanceof Error ? err.message : "Failed to generate story");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            className="floating inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Stars className="w-16 h-16 text-primary mb-4" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            StoryDreams
          </h1>
          <p className="text-lg mt-4 text-muted-foreground">
            Create magical bedtime stories with AI
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Create Your Story
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Main character's name"
                className="bg-background/50"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              />
              <Input
                placeholder="Story setting (e.g., magical forest)"
                className="bg-background/50"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
              />
              <Button
                onClick={generateStory}
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? "Creating Magic..." : "Generate Story"}
              </Button>
            </div>
          </Card>

          <div className="storybook-container">
            <Card
              className={`storybook p-6 ${isBookOpen ? "open" : ""}`}
              onClick={() => setIsBookOpen(!isBookOpen)}
            >
              <div className="page front">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Your Story
                </h2>
                <div className="prose">
                  {story ? (
                    <>
                      <p className="mb-4">{story}</p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // playStory();
                        }}
                        variant="secondary"
                        className="w-full"
                        disabled={isPlaying}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        {isPlaying ? "Playing..." : "Listen to Story"}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Moon className="w-12 h-12 mx-auto mb-4 floating" />
                      <p>Your magical story will appear here...</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="page back absolute inset-0 bg-muted/10 backdrop-blur-sm rounded-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Story Settings</h3>
                  <p className="text-muted-foreground">
                    Click to flip back to your story!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  );
}