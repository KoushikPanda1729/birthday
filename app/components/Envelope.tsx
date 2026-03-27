'use client'

import { useState } from 'react'

type State = 'sealed' | 'opening' | 'open'

export default function Envelope() {
  const [state, setState] = useState<State>('sealed')

  function open() {
    if (state !== 'sealed') return
    setState('opening')
    setTimeout(() => setState('open'), 720)
  }

  /* ── Open: letter ─────────────────────────────────────── */
  if (state === 'open') {
    return (
      <div
        className="animate-reveal-up paper rounded-xl relative"
        style={{
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          padding: 'clamp(24px, 6vw, 48px)',
          boxShadow: '0 20px 64px rgba(0,0,0,0.65), 0 0 0 1px #e8d5c422',
        }}
      >
        <span className="absolute top-4 right-5 text-lg select-none">💌</span>

        <p style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(1.3rem,4vw,1.6rem)', color: '#6b2d45', marginBottom: '1rem' }}>
          My dearest,
        </p>

        <div style={{ fontFamily: 'var(--font-elegant)', color: '#4a2030', lineHeight: 2, fontSize: 'clamp(0.88rem,2.5vw,0.95rem)' }}>
          <p style={{ marginBottom: '1rem' }}>
            On this beautiful day, I want you to know how deeply and completely
            you are loved — not just today, but every ordinary Tuesday,
            every sleepy morning, every long quiet evening.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            You have made my life infinitely richer just by being in it.
            Your laughter is my favourite sound. Your presence is my safest place.
            Your love is the greatest gift I have ever received.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            Today I celebrate you — your heart, your spirit, your beautiful soul.
            Happy birthday, my love. Here is to a thousand more tomorrows by your side.
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(1.3rem,4vw,1.5rem)', color: '#8b1a4a', textAlign: 'right' }}>
          Forever yours ♥
        </p>
      </div>
    )
  }

  /* ── Sealed / opening ─────────────────────────────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <button
        onClick={open}
        aria-label="Open the letter"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        {/* Envelope */}
        <div
          style={{
            position: 'relative',
            width: 'min(300px, 80vw)',
            height: 'min(200px, 53vw)',
            perspective: '700px',
          }}
        >
          {/* Body */}
          <div
            style={{
              position: 'absolute', inset: 0,
              borderRadius: '12px',
              background: 'linear-gradient(150deg,#3d0a2a,#220015)',
              border: '1px solid #e8607a33',
              boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* V-fold lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              viewBox="0 0 300 200" preserveAspectRatio="none">
              <line x1="0"   y1="200" x2="150" y2="110" stroke="#e8607a18" strokeWidth="1"/>
              <line x1="300" y1="200" x2="150" y2="110" stroke="#e8607a18" strokeWidth="1"/>
            </svg>
            {/* Seal */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 2px 10px #e8607a55)', transition: 'transform 0.3s ease' }}>
                💌
              </span>
            </div>
          </div>

          {/* Top flap */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '50%',
              transformOrigin: 'top center',
              transform: state === 'opening' ? 'scaleY(-1)' : 'scaleY(1)',
              transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            <svg viewBox="0 0 300 100" width="100%" height="100%">
              <polygon points="0,0 300,0 150,100" fill="#5a0a3a" stroke="#e8607a22" strokeWidth="0.8"/>
            </svg>
          </div>
        </div>
      </button>

      <p
        style={{
          color: '#e8607a55',
          fontSize: '12px',
          letterSpacing: '0.16em',
          fontFamily: 'var(--font-elegant)',
          fontStyle: 'italic',
          animation: state === 'sealed' ? 'heartPulse 2s ease-in-out infinite' : 'none',
        }}
      >
        {state === 'opening' ? 'opening…' : 'tap to open ♥'}
      </p>
    </div>
  )
}
