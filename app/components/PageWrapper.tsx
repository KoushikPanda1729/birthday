'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import SplashScreen from './SplashScreen'
import CakeScreen   from './CakeScreen'

type Step = 'splash' | 'cake' | 'main'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>('splash')
  const [musicOn, setMusicOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create audio on mount — muted so autoplay works
  useEffect(() => {
    const a = new Audio('/assets/birthday.mp3')
    a.loop   = true
    a.volume = 0.6
    a.muted  = true
    audioRef.current = a
    a.play().catch(() => {})
    return () => { a.pause() }
  }, [])

  // Called directly from candle tap (inside click handler = gesture context)
  const startMusic = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.muted = false
    if (a.paused) a.play().catch(() => {})
  }, [])

  function toggleMusic() {
    const a = audioRef.current
    if (!a) return
    if (musicOn) { a.pause(); setMusicOn(false) }
    else         { a.play().catch(() => {}); setMusicOn(true) }
  }

  return (
    <>
      {step === 'splash' && (
        <SplashScreen onTap={() => {}} onDone={() => setStep('cake')} />
      )}

      {step === 'cake' && (
        <CakeScreen
          onMusicStart={startMusic}
          onDone={() => setStep('main')}
        />
      )}

      {/* Music toggle button — shown only on main page */}
      {step === 'main' && (
        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed', bottom: '24px', right: '20px', zIndex: 9999,
            width: '48px', height: '48px', borderRadius: '50%',
            border: `1.5px solid ${musicOn ? 'rgba(232,96,122,0.6)' : 'rgba(255,255,255,0.15)'}`,
            background: 'rgba(7,0,15,0.75)', backdropFilter: 'blur(10px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: musicOn
              ? '0 0 18px rgba(232,96,122,0.55), 0 4px 20px rgba(0,0,0,0.5)'
              : '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.3s ease, border 0.3s ease',
          }}
        >
          {musicOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8607a">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff55">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
              <line x1="3" y1="3" x2="21" y2="21" stroke="#ffffff55" strokeWidth="2"/>
            </svg>
          )}
        </button>
      )}

      <div style={{
        opacity: step === 'main' ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: step === 'main' ? 'all' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
