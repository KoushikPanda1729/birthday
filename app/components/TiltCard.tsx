'use client'

import { useRef } from 'react'

export default function TiltCard({
  children,
  className,
  style,
  maxTilt = 14,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function tilt(clientX: number, clientY: number) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width  - 0.5
    const y = (clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.05)`
  }

  function reset() {
    if (ref.current)
      ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: 'transform 0.18s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={e => tilt(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchMove={e => { const t = e.touches[0]; tilt(t.clientX, t.clientY) }}
      onTouchEnd={reset}
    >
      {children}
    </div>
  )
}
