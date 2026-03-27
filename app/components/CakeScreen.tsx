'use client'

import { useState } from 'react'

export default function CakeScreen({ onMusicStart, onDone }: {
  onMusicStart: () => void
  onDone: () => void
}) {
  const [blown,   setBlown]   = useState(false)
  const [leaving, setLeaving] = useState(false)

  function blowCandle() {
    if (blown) return
    setBlown(true)
    onMusicStart()
    // Let smoke/dark animation play, then go to main page
    setTimeout(() => {
      setLeaving(true)
      setTimeout(onDone, 1000)
    }, 1800)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: leaving ? 0 : 1,
      transition: 'opacity 1s ease',
      overflow: 'hidden',
      userSelect: 'none',
    }}>

      {/* ── Background — warm candlelight glow ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#07000f',
        transition: 'background 1.5s ease',
      }} />
      {/* Candlelight radial — flickers with flame, fades when blown */}
      <div style={{
        position: 'absolute', inset: 0,
        background: blown
          ? 'transparent'
          : 'radial-gradient(ellipse 60% 55% at 50% 36%, rgba(255,160,50,0.22) 0%, rgba(232,96,122,0.08) 50%, transparent 75%)',
        animation: blown ? 'none' : 'flameWobble 1.2s ease-in-out infinite alternate',
        transition: 'background 1.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Stars */}
      {[
        { top:'8%',  left:'12%', s:'1.5px', dur:'2.1s', del:'0s'   },
        { top:'14%', left:'78%', s:'2px',   dur:'3.1s', del:'0.7s' },
        { top:'22%', left:'6%',  s:'1px',   dur:'2.5s', del:'1.2s' },
        { top:'18%', left:'90%', s:'1.5px', dur:'1.8s', del:'0.3s' },
        { top:'72%', left:'5%',  s:'1px',   dur:'2.8s', del:'1.8s' },
        { top:'80%', left:'92%', s:'1.5px', dur:'2.2s', del:'0.9s' },
      ].map((s, i) => (
        <div key={i} className="animate-twinkle" style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.s, height: s.s, borderRadius: '50%',
          background: i % 2 === 0 ? '#fff' : '#ffb3c6',
          animationDuration: s.dur, animationDelay: s.del,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Candle + Cake ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Candle — clickable */}
        <div
          onClick={blowCandle}
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', cursor: blown ? 'default' : 'pointer',
            marginBottom: '-2px', position: 'relative',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {/* ── FLAME ── */}
          <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative', width: '60px' }}>

            {!blown ? (
              <>
                {/* Outermost ambient glow */}
                <div style={{
                  position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                  width: '52px', height: '62px',
                  background: 'radial-gradient(ellipse at 50% 85%, rgba(255,140,30,0.4) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  animation: 'flameWobble 0.9s ease-in-out infinite alternate',
                  borderRadius: '50% 50% 30% 30%',
                }} />
                {/* Mid glow */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                  width: '28px', height: '46px',
                  background: 'radial-gradient(ellipse at 50% 80%, rgba(255,180,60,0.7) 0%, rgba(255,100,20,0.4) 55%, transparent 80%)',
                  filter: 'blur(4px)',
                  animation: 'flameWobble 0.65s ease-in-out infinite alternate',
                  animationDelay: '0.1s',
                  borderRadius: '50% 50% 25% 25% / 60% 60% 30% 30%',
                  transformOrigin: 'bottom center',
                }} />
                {/* Outer flame */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                  width: '18px', height: '44px',
                  background: 'linear-gradient(to top, #ff4500 0%, #ff8c00 30%, #ffb830 65%, #ffe566 100%)',
                  borderRadius: '50% 50% 22% 22% / 60% 60% 28% 28%',
                  animation: 'flameWobble 0.55s ease-in-out infinite alternate',
                  animationDelay: '0.05s',
                  transformOrigin: 'bottom center',
                  filter: 'drop-shadow(0 0 4px #ff8c00)',
                }} />
                {/* Inner bright flame */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                  width: '10px', height: '32px',
                  background: 'linear-gradient(to top, #ff6600 0%, #ffcc00 50%, #fffde0 100%)',
                  borderRadius: '50% 50% 20% 20% / 55% 55% 25% 25%',
                  animation: 'flameWobble 0.45s ease-in-out infinite alternate',
                  animationDelay: '0.08s',
                  transformOrigin: 'bottom center',
                }} />
                {/* White hot core */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                  width: '5px', height: '16px',
                  background: 'linear-gradient(to top, #ffdd88, #ffffff)',
                  borderRadius: '50% 50% 20% 20% / 55% 55% 25% 25%',
                  animation: 'flameWobble 0.38s ease-in-out infinite alternate',
                  transformOrigin: 'bottom center',
                }} />
              </>
            ) : (
              /* Smoke after blown */
              <>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    position: 'absolute',
                    bottom: `${8 + i * 6}px`,
                    left: `${22 + (i % 2 === 0 ? -5 : 5)}px`,
                    width: `${5 + i * 2}px`, height: `${5 + i * 2}px`,
                    borderRadius: '50%',
                    background: 'rgba(180,180,200,0.55)',
                    animation: 'smokeDrift 1.6s ease-out forwards',
                    animationDelay: `${i * 0.12}s`,
                  }} />
                ))}
                {/* Burnt wick */}
                <div style={{
                  width: '4px', height: '6px',
                  background: '#444', borderRadius: '2px',
                  marginBottom: '2px',
                }} />
              </>
            )}
          </div>

          {/* Wick */}
          <div style={{
            width: '2px', height: '8px',
            background: '#555',
            borderRadius: '1px',
          }} />

          {/* Wax body */}
          <div style={{
            width: '18px', height: '80px', position: 'relative',
            background: 'linear-gradient(90deg, #e8d5b8 0%, #fff8ee 35%, #ffefd4 65%, #e0c8a0 100%)',
            borderRadius: '3px 3px 2px 2px',
            boxShadow: blown
              ? '0 0 0 transparent'
              : '0 0 12px rgba(255,160,50,0.4), inset -3px 0 6px rgba(0,0,0,0.08)',
            transition: 'box-shadow 1s ease',
          }}>
            {/* Wax drip left */}
            <div style={{
              position: 'absolute', top: '10px', left: '-3px',
              width: '7px', height: '18px',
              background: 'linear-gradient(180deg,#fff8ee,#e8d5b8)',
              borderRadius: '0 0 50% 50%',
              opacity: 0.9,
            }} />
            {/* Wax drip right */}
            <div style={{
              position: 'absolute', top: '6px', right: '-2px',
              width: '6px', height: '14px',
              background: 'linear-gradient(180deg,#ffefd4,#e0c8a0)',
              borderRadius: '0 0 50% 50%',
              opacity: 0.8,
            }} />
            {/* Highlight streak */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '4px',
              width: '4px',
              background: 'rgba(255,255,255,0.35)',
              borderRadius: '2px',
            }} />
          </div>

          {/* Holder */}
          <div style={{
            width: '28px', height: '10px',
            background: 'linear-gradient(180deg, #d4a843, #a07830)',
            borderRadius: '5px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
          }} />
        </div>

        {/* ── CAKE ── */}
        <div style={{ position: 'relative' }}>

          {/* Frosting arch */}
          <div style={{
            width: '200px', height: '28px', margin: '0 auto',
            background: 'linear-gradient(180deg, #ff8fab, #f06292)',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            position: 'relative', zIndex: 1,
            boxShadow: blown ? 'none' : '0 -4px 20px rgba(255,120,160,0.3)',
            transition: 'box-shadow 1.2s ease',
          }}>
            {/* Frosting drips */}
            {[16, 42, 70, 100, 130, 158, 180].map((x, i) => (
              <div key={i} style={{
                position: 'absolute', bottom: '-13px', left: `${x}px`,
                width: '14px', height: '16px',
                background: '#f06292',
                borderRadius: '0 0 50% 50%',
              }} />
            ))}
            {/* Hearts on top */}
            {[28, 65, 100, 136, 168].map((x, i) => (
              <span key={i} style={{
                position: 'absolute', top: '6px', left: `${x}px`,
                fontSize: '8px', color: 'rgba(255,255,255,0.8)',
              }}>♥</span>
            ))}
          </div>

          {/* Layer 1 */}
          <div style={{
            width: '208px', height: '64px',
            background: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd0 100%)',
            borderLeft: '3px solid #f48fb1',
            borderRight: '3px solid #f48fb1',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Light stripes */}
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `${24 + i * 46}px`, width: '20px',
                background: 'rgba(255,255,255,0.22)',
              }} />
            ))}
            {/* Candlelight warm tint (disappears when blown) */}
            <div style={{
              position: 'absolute', inset: 0,
              background: blown ? 'transparent' : 'linear-gradient(180deg, rgba(255,200,100,0.08) 0%, transparent 60%)',
              transition: 'background 1.2s ease',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Layer 2 */}
          <div style={{
            width: '220px', height: '50px',
            background: 'linear-gradient(180deg, #f48fb1 0%, #ec407a 100%)',
            borderLeft: '3px solid #e91e8c44',
            borderRight: '3px solid #e91e8c44',
            position: 'relative',
          }}>
            {/* Dots */}
            {[18, 54, 92, 132, 168, 198].map((x, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: `${x}px`,
                transform: 'translateY(-50%)',
                width: '9px', height: '9px', borderRadius: '50%',
                background: i % 2 === 0 ? '#fff' : '#fce4ec',
                opacity: 0.85,
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            ))}
          </div>

          {/* Base board */}
          <div style={{
            width: '240px', height: '16px', margin: '0 auto',
            background: 'linear-gradient(180deg, #c9a050, #8b6914)',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
          }} />
        </div>
      </div>

      {/* ── Instruction ── */}
      <div style={{ textAlign: 'center', marginTop: '52px', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        {!blown ? (
          <>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#ffb36688', fontSize: '10px',
              letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: '12px',
            }}>make a wish ✨</p>
            <p style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.4rem,5vw,2rem)',
              color: '#fff0f3',
              textShadow: '0 0 20px rgba(255,160,50,0.5)',
              animation: 'heartPulse 2s ease-in-out infinite',
            }}>
              Tap the candle ♥
            </p>
          </>
        ) : (
          <>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#e8607a99', fontSize: '10px',
              letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: '12px',
            }}>wish granted ✨</p>
            <p style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.5rem,5vw,2.2rem)',
              color: '#ffd6e7',
              textShadow: '0 0 24px rgba(232,96,122,0.5)',
            }}>
              Happy Birthday ♥
            </p>
          </>
        )}
      </div>

    </div>
  )
}
