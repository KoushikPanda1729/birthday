'use client'

import { useState } from 'react'

// 12 stars forming a heart in a 300 × 250 SVG viewBox
const STARS = [
  { id: 1,  cx: 150, cy: 58,  msg: 'Your smile is my sunrise ✦' },
  { id: 2,  cx: 108, cy: 48,  msg: 'Your laugh is my favourite music ✦' },
  { id: 3,  cx: 68,  cy: 70,  msg: 'You turn every day into an adventure ✦' },
  { id: 4,  cx: 52,  cy: 106, msg: 'Your kindness moves me every single day ✦' },
  { id: 5,  cx: 68,  cy: 146, msg: 'Wherever you are is home to me ✦' },
  { id: 6,  cx: 110, cy: 188, msg: 'You make me a better person ✦' },
  { id: 7,  cx: 150, cy: 220, msg: 'You are the greatest blessing of my life ✦' },
  { id: 8,  cx: 190, cy: 188, msg: 'Your strength leaves me in awe ✦' },
  { id: 9,  cx: 232, cy: 146, msg: 'Your warmth lights up every room you enter ✦' },
  { id: 10, cx: 248, cy: 106, msg: 'Your dreams inspire mine ✦' },
  { id: 11, cx: 232, cy: 70,  msg: 'You love so deeply and so freely ✦' },
  { id: 12, cx: 192, cy: 48,  msg: 'You are everything I ever wished for ✦' },
]

const EDGES: [number, number][] = [
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,1],
]

export default function Constellation() {
  const [active, setActive] = useState<number | null>(null)
  const activeStar = STARS.find(s => s.id === active)

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Heading hint */}
      <p style={{ color: '#ff6b9d66', fontSize: '0.78rem', letterSpacing: '0.18em', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
        tap a star
      </p>

      {/* SVG heart constellation */}
      <svg
        viewBox="0 0 300 250"
        className="w-full max-w-xs"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,107,157,0.18))', overflow: 'visible' }}
      >
        {/* Connection lines */}
        {EDGES.map(([a, b], i) => {
          const s1 = STARS.find(s => s.id === a)!
          const s2 = STARS.find(s => s.id === b)!
          const lit = active === a || active === b
          return (
            <line
              key={i}
              x1={s1.cx} y1={s1.cy} x2={s2.cx} y2={s2.cy}
              stroke={lit ? '#ff6b9daa' : '#ff6b9d1a'}
              strokeWidth={lit ? 1.6 : 0.8}
              style={{ transition: 'all 0.35s ease' }}
            />
          )
        })}

        {/* Stars */}
        {STARS.map(star => {
          const on = active === star.id
          return (
            <g key={star.id} style={{ cursor: 'pointer' }} onClick={() => setActive(on ? null : star.id)}>
              {/* Outer pulse ring */}
              <circle cx={star.cx} cy={star.cy} r={on ? 16 : 0}
                fill="none" stroke="#ff6b9d" strokeWidth="1" opacity="0.35"
                style={{ transition: 'r 0.35s ease' }}
              />
              {/* Glow fill */}
              <circle cx={star.cx} cy={star.cy} r={on ? 11 : 7}
                fill={on ? '#ff6b9d2a' : '#ff6b9d0e'}
                style={{ transition: 'all 0.35s ease' }}
              />
              {/* Core dot */}
              <circle cx={star.cx} cy={star.cy} r={on ? 5 : 3}
                fill={on ? '#fff' : '#ff8fab'}
                style={{ transition: 'all 0.35s ease' }}
              />
              {/* ✦ label above */}
              <text x={star.cx} y={star.cy - 13} textAnchor="middle"
                fill="#ff6b9d44" fontSize="8" style={{ userSelect: 'none' }}>
                ✦
              </text>
            </g>
          )
        })}
      </svg>

      {/* Message card */}
      <div
        className="text-center px-8 py-5 rounded-2xl flex items-center justify-center"
        style={{
          minHeight: '72px',
          maxWidth: '360px',
          width: '100%',
          background:    active ? 'linear-gradient(135deg,#1a002888,#25003a88)' : 'transparent',
          border:        `1px solid ${active ? '#ff6b9d44' : 'transparent'}`,
          backdropFilter: active ? 'blur(8px)' : 'none',
          transition: 'all 0.45s ease',
        }}
      >
        {activeStar ? (
          <p
            key={activeStar.id}
            className="animate-fade-in-up"
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: '#ffd6e7', fontSize: '0.97rem', lineHeight: 1.65 }}
          >
            {activeStar.msg}
          </p>
        ) : (
          <p style={{ color: '#ff6b9d44', fontSize: '0.78rem', fontFamily: 'var(--font-playfair)', letterSpacing: '0.1em', fontStyle: 'italic' }}>
            12 stars · 12 reasons I love you ♥
          </p>
        )}
      </div>
    </div>
  )
}
