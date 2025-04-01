// Audio player utility for handling text-to-speech playback

class AudioPlayerManager {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.onended = () => {
        this.isPlaying = false;
      };
    }
  }

  public async play(audioSrc: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.audioElement) {
        reject(new Error('Audio element not available'));
        return;
      }

      if (this.isPlaying) {
        this.stop();
      }

      this.audioElement.src = audioSrc;
      this.audioElement.oncanplaythrough = () => {
        if (this.audioElement) {
          this.audioElement.play()
            .then(() => {
              this.isPlaying = true;
              resolve();
            })
            .catch(error => {
              console.error('Error playing audio:', error);
              reject(error);
            });
        }
      };

      this.audioElement.onerror = (error) => {
        console.error('Error loading audio:', error);
        reject(error);
      };
    });
  }

  public stop(): void {
    if (this.audioElement && this.isPlaying) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
    }
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

// Singleton instance
export const audioPlayer = typeof window !== 'undefined' 
  ? new AudioPlayerManager() 
  : null;
