'use client'

import { useState, useEffect } from 'react'

export default function TypeWriter({
  text,
  speed = 75,
  startDelay = 0,
  className,
  style,
  onDone,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  style?: React.CSSProperties
  onDone?: () => void
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)
  const [done, setDone]           = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setDone(true)
        onDone?.()
      }
    }, speed)
    return () => clearInterval(timer)
  }, [started, text, speed, onDone])

  return (
    <span className={className} style={style}>
      {displayed}
      {!done && (
        <span
          className="inline-block animate-pulse"
          style={{ width: '3px', height: '0.75em', background: 'currentColor', marginLeft: '4px', verticalAlign: 'middle', borderRadius: '1px' }}
        />
      )}
    </span>
  )
}
