'use client'

import { useState, useCallback } from 'react'

interface P {
  id: number; x: number; y: number
  vx: number; vy: number; color: string
  w: number;  h: number;  alpha: number
  rot: number; rotV: number; isRect: boolean
}

const COLORS = ['#e8607a','#ffd700','#ffb3c6','#ffd6e7','#c9a96e','#fff','#a78bfa','#67e8f9','#86efac','#fb923c']

function mkBurst(cx: number, cy: number, n: number, base: number): P[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 + Math.random() * 0.5
    const spd   = 1.4 + Math.random() * 3.6
    const rect  = Math.random() > 0.5
    return {
      id: base + i, x: cx, y: cy,
      vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: rect ? 4 + Math.random() * 4 : 5 + Math.random() * 5,
      h: rect ? 8 + Math.random() * 8 : 5 + Math.random() * 5,
      alpha: 1, rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 14, isRect: rect,
    }
  })
}

export default function Fireworks() {
  const [blown, setBlown]       = useState(false)
  const [particles, setParticles] = useState<P[]>([])

  const launch = useCallback(() => {
    if (blown) return
    setBlown(true)

    let all: P[] = []
    ;[
      [22,28],[78,22],[50,12],[35,50],[65,45],[50,32],
    ].forEach(([x,y], i) => { all = [...all, ...mkBurst(x, y, 20, i * 20)] })
    setParticles(all)

    let f = 0
    const loop = () => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx * 0.52, y: p.y + p.vy * 0.52, vy: p.vy + 0.044, alpha: p.alpha - 0.013, rot: p.rot + p.rotV }))
          .filter(p => p.alpha > 0)
      )
      if (++f < 92) requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }, [blown])

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
      {/* Confetti */}
      {particles.length > 0 && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.w}px`, height: `${p.h}px`,
              borderRadius: p.isRect ? '2px' : '50%',
              background: p.color, opacity: p.alpha,
              transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
              willChange: 'transform, opacity',
            }}/>
          ))}
        </div>
      )}

      {/* Cake */}
      <div style={{ fontSize: '72px', filter: blown ? 'none' : 'drop-shadow(0 0 22px rgba(255,215,0,0.5))' }}>
        {blown ? '🎉' : '🎂'}
      </div>

      {!blown ? (
        <button
          onClick={launch}
          style={{
            background: 'linear-gradient(135deg,#e8607a,#c9507d)',
            color: '#fff', border: 'none', cursor: 'pointer',
            padding: '16px 36px', borderRadius: '100px',
            fontFamily: 'var(--font-romantic)', fontSize: 'clamp(1.3rem,4vw,1.6rem)',
            fontWeight: 600, letterSpacing: '0.02em',
            boxShadow: '0 8px 28px rgba(232,96,122,0.5)',
            transition: 'transform 0.2s ease',
            /* min tap target */
            minHeight: '52px', minWidth: '200px',
          }}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.96)')}
          onTouchEnd={e   => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ✨ Make a Wish &amp; Blow!
        </button>
      ) : (
        <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
          <p className="shimmer-rose" style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(1.9rem,6vw,3rem)', fontWeight: 700 }}>
            May all your wishes come true 🎊
          </p>
          <p style={{ color: '#ffd6e7aa', fontFamily: 'var(--font-elegant)', fontStyle: 'italic', fontSize: '1rem', marginTop: '12px', maxWidth: '340px' }}>
            Because you deserve every beautiful thing this world has to offer.
          </p>
        </div>
      )}
    </div>
  )
}
