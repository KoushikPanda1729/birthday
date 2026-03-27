'use client'

import { useRef, useState, useEffect } from 'react'

const HEARTS = [
  { left: '8%',  delay: '0s',   dur: '4.2s' },
  { left: '28%', delay: '1.1s', dur: '5.1s' },
  { left: '52%', delay: '0.5s', dur: '4.6s' },
  { left: '74%', delay: '1.8s', dur: '5.4s' },
  { left: '91%', delay: '0.9s', dur: '4s'   },
]

export default function VideoPlayer({ src = '/love.mp4', noSound = false }: { src?: string; noSound?: boolean }) {
  const ref               = useRef<HTMLVideoElement>(null)
  const wrapRef           = useRef<HTMLDivElement>(null)
  const [playing, set]    = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    if (wrapRef.current) observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

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
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', maxWidth: 'clamp(280px,82vw,400px)', margin: '0 auto' }}>

      {/* Floating hearts — visible only while playing */}
      {playing && HEARTS.map((h, i) => (
        <div key={i} className="animate-float-up" style={{
          position: 'absolute', bottom: 0, left: h.left,
          fontSize: '18px', color: i % 2 === 0 ? '#e8607a' : '#ffb3c6',
          animationDuration: h.dur, animationDelay: h.delay,
          opacity: 0, pointerEvents: 'none', zIndex: 20,
        }}>♥</div>
      ))}

      {/* Animated glow ring */}
      <div style={{
        position: 'absolute', inset: '-3px', borderRadius: '26px', zIndex: 0,
        backgroundImage: playing
          ? 'linear-gradient(135deg,#e8607a,#ffb3c6,#c9507d,#ffd6e7,#e8607a)'
          : 'linear-gradient(135deg,#e8607a55,#ffb3c633)',
        backgroundSize: '300% 300%',
        animation: playing ? 'shimmer 3s linear infinite' : 'none',
        transition: 'opacity 0.6s ease',
      }} />

      {/* Video wrapper */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: '24px', overflow: 'hidden',
        boxShadow: playing
          ? '0 0 50px rgba(232,96,122,0.45), 0 24px 70px rgba(0,0,0,0.7)'
          : '0 24px 60px rgba(0,0,0,0.65)',
        transition: 'box-shadow 0.6s ease',
      }}>
        <video
          ref={ref} src={src} playsInline muted loop
          style={{ width: '100%', display: 'block' }}
          onPlay={() => set(true)} onPause={() => set(false)}
        />

        {/* Play overlay */}
        {!playing && (
          <div onClick={togglePlay} style={{
            position: 'absolute', inset: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(7,0,15,0.38)',
          }}>
            {/* Pulse rings */}
            {[100, 78].map((size, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: `${size}px`, height: `${size}px`,
                borderRadius: '50%',
                border: `1.5px solid rgba(232,96,122,${0.25 + i * 0.2})`,
                animation: `heartPulse ${1.6 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }} />
            ))}
            {/* Play button */}
            <div style={{
              width: '66px', height: '66px', borderRadius: '50%', zIndex: 1,
              background: 'linear-gradient(135deg,#e8607a,#c9507d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 36px rgba(232,96,122,0.75)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '22px 14px 14px',
          background: 'linear-gradient(to top, rgba(7,0,15,0.78), transparent)',
          display: 'flex', justifyContent: 'flex-end', gap: '10px',
        }}>
          {[
            {
              onClick: togglePlay,
              icon: playing
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>,
            },
            ...(!noSound ? [{
              onClick: toggleMute,
              icon: muted
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
            }] : []),
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: 'none', background: 'rgba(255,255,255,0.14)',
              cursor: 'pointer', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{btn.icon}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
