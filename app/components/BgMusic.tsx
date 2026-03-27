'use client'

import { useEffect, useRef, useState } from 'react'

export default function BgMusic({ startPlaying = false }: { startPlaying?: boolean }) {
  const btnRef   = useRef<HTMLButtonElement>(null)
  const audio    = useRef<HTMLAudioElement | null>(null)
  const unmuted  = useRef(false)
  const [on, setOn] = useState(true)

  // Create audio and start muted autoplay on mount
  useEffect(() => {
    const a = new Audio('/assets/birthday.mp3')
    a.loop   = true
    a.volume = 0.6
    a.muted  = true
    audio.current = a
    a.play().catch(() => {})

    // Fallback: unmute on any page interaction
    function doUnmute() {
      if (unmuted.current) return
      unmuted.current = true
      a.muted = false
      if (a.paused) a.play().catch(() => {})
      window.removeEventListener('scroll',     doUnmute)
      window.removeEventListener('touchstart', doUnmute)
      window.removeEventListener('mousedown',  doUnmute)
    }
    window.addEventListener('scroll',     doUnmute, { passive: true })
    window.addEventListener('touchstart', doUnmute, { passive: true })
    window.addEventListener('mousedown',  doUnmute)

    return () => {
      window.removeEventListener('scroll',     doUnmute)
      window.removeEventListener('touchstart', doUnmute)
      window.removeEventListener('mousedown',  doUnmute)
      a.pause()
    }
  }, [])

  // Unmute as soon as startPlaying becomes true (splash was tapped)
  useEffect(() => {
    if (!startPlaying) return
    const a = audio.current
    if (!a || unmuted.current) return
    unmuted.current = true
    a.muted = false          // no play() needed — audio is already playing muted
    if (a.paused) a.play().catch(() => {})
  }, [startPlaying])

  function toggle() {
    const a = audio.current
    if (!a) return
    if (!unmuted.current) {
      unmuted.current = true
      a.muted = false
      if (a.paused) a.play().catch(() => {})
      return
    }
    if (on) { a.pause(); setOn(false) }
    else    { a.play().catch(() => {}); setOn(true) }
  }

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      aria-label={on ? 'Pause music' : 'Play music'}
      style={{
        position: 'fixed', bottom: '24px', right: '20px', zIndex: 9999,
        width: '48px', height: '48px', borderRadius: '50%',
        border: `1.5px solid ${on ? 'rgba(232,96,122,0.6)' : 'rgba(255,255,255,0.15)'}`,
        background: 'rgba(7,0,15,0.75)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: on
          ? '0 0 18px rgba(232,96,122,0.55), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s ease, border 0.3s ease',
      }}
    >
      {on ? (
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
  )
}
