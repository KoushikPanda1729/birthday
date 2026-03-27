'use client'

import { useState, useCallback } from 'react'
import SplashScreen from './SplashScreen'
import BgMusic from './BgMusic'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [done,          setDone]          = useState(false)
  const [musicStarted,  setMusicStarted]  = useState(false)

  const handleTap  = useCallback(() => setMusicStarted(true), [])
  const handleDone = useCallback(() => setDone(true), [])

  return (
    <>
      {!done && <SplashScreen onTap={handleTap} onDone={handleDone} />}

      {/* BgMusic lives here so it mounts immediately and starts muted autoplay */}
      <BgMusic startPlaying={musicStarted} />

      <div style={{
        opacity: done ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: done ? 'all' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
