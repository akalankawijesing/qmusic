"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useState } from "react";

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState([]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-background shadow-lg border-t border-border p-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center">
          <img
            src="/path/to/album-cover.jpg"
            alt="Album Cover"
            className="h-12 w-12 rounded-md"
          />
          <div className="ml-4">
            <h3 className="text-sm font-semibold leading-tight">Song Title</h3>
            <p className="text-xs text-muted-foreground">Artist Name</p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="w-full md:w-2/3">
          <AudioPlayer
            autoPlay
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            onPlay={() => console.log("onPlay")}
            layout="horizontal"
            showJumpControls={false}
            customAdditionalControls={[]}
            customVolumeControls={[]}
          />
        </div>
      </div>
    </div>
  );
}
