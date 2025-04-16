'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface Song {
  title: string
  artist: string
  cover: string
  url: string
}

interface MusicPlayerContextProps {
  currentSong: Song | null
  playlist: Song[]
  currentIndex: number
  playSong: (song: Song) => void
  loadPlaylist: (songs: Song[], startIndex?: number) => void
  playNext: () => void
  playPrev: () => void
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined)

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const currentSong = playlist[currentIndex] || null

  const playSong = (song: Song) => {
    const index = playlist.findIndex(s => s.url === song.url)
    if (index !== -1) {
      setCurrentIndex(index)
    } else {
      setPlaylist([song])
      setCurrentIndex(0)
    }
  }

  const loadPlaylist = (songs: Song[], startIndex = 0) => {
    setPlaylist(songs)
    setCurrentIndex(startIndex)
  }

  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <MusicPlayerContext.Provider
      value={{ currentSong, playlist, currentIndex, playSong, loadPlaylist, playNext, playPrev }}
    >
      {children}
    </MusicPlayerContext.Provider>
  )
}

export const useMusicPlayer = (): MusicPlayerContextProps => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider')
  }
  return context
}
