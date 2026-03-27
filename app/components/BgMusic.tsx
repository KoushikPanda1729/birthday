'use client'

import { useEffect, useRef, useState } from 'react'

export default function BgMusic() {
  const btnRef   = useRef<HTMLButtonElement>(null)
  const audio    = useRef<HTMLAudioElement | null>(null)
  const unmuted  = useRef(false)
  const [on, setOn] = useState(true)

  useEffect(() => {
    const a = new Audio('/assets/birthday.mp3')
    a.loop   = true
    a.volume = 0.6
    a.muted  = true          // muted autoplay always works in every browser
    audio.current = a
    a.play().catch(() => {}) // silent play — browser allows muted

    function doUnmute() {
      if (unmuted.current) return
      unmuted.current = true
      a.muted = false
      // If initial play() failed for any reason, retry now (inside a gesture)
      if (a.paused) a.play().catch(() => {})
      window.removeEventListener('scroll',     onScroll)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('mousedown',  onMouse)
    }

    function onScroll()              { doUnmute() }
    function onTouch(e: TouchEvent)  { if (!btnRef.current?.contains(e.target as Node)) doUnmute() }
    function onMouse(e: MouseEvent)  { if (!btnRef.current?.contains(e.target as Node)) doUnmute() }

    window.addEventListener('scroll',     onScroll, { passive: true })
    window.addEventListener('touchstart', onTouch,  { passive: true })
    window.addEventListener('mousedown',  onMouse)

    return () => {
      window.removeEventListener('scroll',     onScroll)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('mousedown',  onMouse)
      a.pause()
    }
  }, [])

  function toggle() {
    const a = audio.current
    if (!a) return

    if (!unmuted.current) {
      // First tap on icon — just unmute, keep playing
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
