'use client'

import { useState, useCallback, useRef } from 'react'

export default function SplashScreen({ onTap, onDone }: { onTap: () => void; onDone: () => void }) {
  const [tapped,   setTapped]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [leaving,  setLeaving]  = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const begin = useCallback(() => {
    if (tapped) return
    setTapped(true)

    // Notify parent — triggers birthday music unmute
    onTap()

    // Play baby cry inside user gesture
    const audio = new Audio('/assets/baby_cry.mp3')
    audio.volume = 0.9
    audio.play().catch(() => {})
    audioRef.current = audio

    // Progress over 5 s
    const start    = Date.now()
    const DURATION = 5000
    const tick = setInterval(() => {
      const pct = Math.min((Date.now() - start) / DURATION * 100, 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(tick)
    }, 50)

    setTimeout(() => {
      setLeaving(true)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setTimeout(onDone, 700)
    }, DURATION)
  }, [tapped, onTap, onDone])

  return (
    <div
      onClick={begin}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#07000f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '32px', cursor: tapped ? 'default' : 'pointer',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.7s ease',
        userSelect: 'none',
      }}
    >
      {/* Pulsing hearts */}
      <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[1, 1.6, 2.2].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '60px', height: '60px', borderRadius: '50%',
            border: '1px solid rgba(232,96,122,0.3)',
            transform: `scale(${scale})`,
            animation: `heartPulse ${1.4 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
        <div style={{
          fontSize: '42px', lineHeight: 1,
          animation: 'heartPulse 1.2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 18px rgba(232,96,122,0.8))',
        }}>♥</div>
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center', padding: '0 36px' }}>
        {!tapped ? (
          <>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#e8607a99', fontSize: '11px',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              preparing something special
            </p>
            <p style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.6rem,6vw,2.4rem)',
              color: '#fff0f3', lineHeight: 1.3,
            }}>
              Tap anywhere to begin ♥
            </p>
          </>
        ) : (
          <>
            {/* Special welcome message — fades in after tap */}
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#e8607a99', fontSize: '11px',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              marginBottom: '18px',
              animation: 'fadeInUp 0.7s ease-out forwards',
            }}>
              she arrived ♥
            </p>
            <p style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.9rem,7vw,3rem)',
              color: '#fff0f3', lineHeight: 1.25,
              marginBottom: '16px',
              animation: 'fadeInUp 0.8s ease-out 0.1s both',
              textShadow: '0 0 30px rgba(232,96,122,0.4)',
            }}>
              Welcome to this world,<br />
              <span className="shimmer-rose">my Princess</span> 👑
            </p>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#ffffff77', fontSize: 'clamp(0.9rem,3vw,1.05rem)',
              lineHeight: 1.8,
              animation: 'fadeInUp 0.8s ease-out 0.3s both',
            }}>
              The day you were born,<br />the world became more beautiful.
            </p>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'clamp(200px,60vw,280px)', height: '2px',
        background: 'rgba(232,96,122,0.15)', borderRadius: '2px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg,#c9507d,#e8607a,#ffb3c6)',
          borderRadius: '2px',
          transition: 'width 0.05s linear',
          boxShadow: '0 0 8px rgba(232,96,122,0.6)',
        }} />
      </div>

      {!tapped && (
        <p style={{
          fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
          color: '#ffffff33', fontSize: '11px', letterSpacing: '0.2em',
          animation: 'heartPulse 2s ease-in-out infinite',
        }}>
          touch to start
        </p>
      )}
    </div>
  )
}
