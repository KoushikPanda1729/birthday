'use client'

import { useState, useRef } from 'react'

interface Photo {
  src:     string | null
  caption: string
}

function Placeholder() {
  return (
    <div
      className="w-full"
      style={{
        aspectRatio: '3/4',
        background: 'linear-gradient(135deg,#16002a,#250040,#16002a)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '10px',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="#e8607a" strokeWidth="1.3" strokeLinecap="round" opacity="0.35">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      <p style={{ color: '#e8607a44', fontSize: '10px', letterSpacing: '0.2em', fontFamily: 'var(--font-elegant)' }}>
        ADD PHOTO
      </p>
    </div>
  )
}

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [idx, setIdx]   = useState(0)
  const startX          = useRef(0)
  const moved           = useRef(false)

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
    moved.current  = false
  }
  function onTouchMove(e: React.TouchEvent) {
    if (Math.abs(e.touches[0].clientX - startX.current) > 8) moved.current = true
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!moved.current) return
    const dx = startX.current - e.changedTouches[0].clientX
    if (dx >  48 && idx < photos.length - 1) setIdx(i => i + 1)
    if (dx < -48 && idx > 0)                 setIdx(i => i - 1)
  }

  return (
    <div className="w-full select-none">
      {/* Slide track */}
      <div
        style={{ overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${idx * 100}%)`,
            transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'transform',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              style={{ width: '100%', flexShrink: 0, display: 'flex', justifyContent: 'center', padding: '0 24px' }}
            >
              <div
                className="polaroid"
                style={{ width: '100%', maxWidth: '260px', transform: i % 2 === 0 ? 'rotate(-2.5deg)' : 'rotate(2deg)' }}
              >
                {photo.src
                  ? <img src={photo.src} alt={photo.caption} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  : <Placeholder />
                }
                <p
                  className="text-center"
                  style={{ fontFamily: 'var(--font-romantic)', fontSize: '1.15rem', color: '#6b4c3b', paddingTop: '8px' }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {photos.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? 'dot-active' : 'dot-inactive'}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint — only on small screens, fades after first interaction */}
      {idx === 0 && photos.length > 1 && (
        <p
          className="text-center mt-3"
          style={{ color: '#ffffff22', fontSize: '11px', letterSpacing: '0.18em', fontFamily: 'var(--font-elegant)', fontStyle: 'italic' }}
        >
          swipe ›
        </p>
      )}
    </div>
  )
}
