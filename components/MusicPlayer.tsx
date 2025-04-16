'use client'
import AudioPlayer from 'react-h5-audio-player'
import { useMusicPlayer } from '@/context/MusicPlayerContext'
import 'react-h5-audio-player/lib/styles.css'

export default function MusicPlayer() {
  const { currentSong, playNext, playPrev } = useMusicPlayer()

  if (!currentSong) return null

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-background shadow-lg border-t border-border p-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <img src={currentSong.cover} alt="Album Cover" className="h-12 w-12 rounded-md" />
          <div className="ml-4">
            <h3 className="text-sm font-semibold leading-tight">{currentSong.title}</h3>
            <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <AudioPlayer
            autoPlay
            src={currentSong.url}
            layout="horizontal"
            showSkipControls
            showJumpControls={false}
            onClickPrevious={playPrev}
            onClickNext={playNext}
            onEnded={playNext}
            customAdditionalControls={[]}
            customVolumeControls={[]}
          />
        </div>
      </div>
    </div>
  )
}
