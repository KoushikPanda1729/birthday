'use client'

import { useRef, useState } from 'react'

export default function VideoPlayer({ src = '/love.mp4' }: { src?: string }) {
  const ref                     = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]   = useState(false)
  const [muted,   setMuted]     = useState(true)

  function togglePlay() {
    if (!ref.current) return
    playing ? ref.current.pause() : ref.current.play()
  }

  function toggleMute() {
    if (!ref.current) return
    ref.current.muted = !muted
    setMuted(m => !m)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'clamp(300px,60vw,640px)',
        margin: '0 auto',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}
    >
      <video
        ref={ref}
        src={src}
        playsInline
        muted
        loop
        style={{ width: '100%', display: 'block' }}
        onPlay={()  => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Big play overlay */}
      {!playing && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(7,0,15,0.4)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: '#e8607a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(232,96,122,0.6)',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 16px 16px',
        background: 'linear-gradient(to top, rgba(7,0,15,0.7), transparent)',
        display: 'flex', justifyContent: 'flex-end', gap: '10px',
      }}>
        <button
          onClick={togglePlay}
          style={{
            width: '38px', height: '38px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.18)', color: '#fff',
            fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>
        <button
          onClick={toggleMute}
          style={{
            width: '38px', height: '38px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.18)', color: '#fff',
            fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {muted
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          }
        </button>
      </div>
    </div>
  )
}
