'use client'

import { useState } from 'react'

/* ── Realistic SVG Cake ─────────────────────────────────── */
function Cake({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 280 210" width="280" style={{
      filter: lit
        ? 'drop-shadow(0 0 32px rgba(255,160,50,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.7))'
        : 'drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
      transition: 'filter 1.2s ease',
      overflow: 'visible',
    }}>
      <defs>
        {/* Frosting gradients */}
        <linearGradient id="ft1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f48fb1"/>
          <stop offset="45%"  stopColor="#ff80ab"/>
          <stop offset="100%" stopColor="#e91e8c"/>
        </linearGradient>
        <linearGradient id="fs1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ad1457"/>
          <stop offset="30%"  stopColor="#e91e8c"/>
          <stop offset="65%"  stopColor="#f06292"/>
          <stop offset="100%" stopColor="#c2185b"/>
        </linearGradient>
        <linearGradient id="ft2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f06292"/>
          <stop offset="50%"  stopColor="#ff80ab"/>
          <stop offset="100%" stopColor="#d81b60"/>
        </linearGradient>
        <linearGradient id="fs2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c2185b"/>
          <stop offset="50%"  stopColor="#e91e8c"/>
          <stop offset="100%" stopColor="#880e4f"/>
        </linearGradient>
        {/* Sponge */}
        <linearGradient id="sp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff9e0"/>
          <stop offset="100%" stopColor="#ffe082"/>
        </linearGradient>
        {/* Cream */}
        <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#fce4ec"/>
        </linearGradient>
        {/* Plate */}
        <linearGradient id="pl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4af5a"/>
          <stop offset="100%" stopColor="#8b6914"/>
        </linearGradient>
        {/* Strawberry */}
        <radialGradient id="sb" cx="40%" cy="30%">
          <stop offset="0%"   stopColor="#ff6b6b"/>
          <stop offset="100%" stopColor="#c0392b"/>
        </radialGradient>
      </defs>

      {/* ── Ground shadow ── */}
      <ellipse cx="140" cy="206" rx="115" ry="7" fill="rgba(0,0,0,0.45)"/>

      {/* ── Plate ── */}
      <ellipse cx="140" cy="193" rx="120" ry="10" fill="url(#pl)"/>
      <ellipse cx="140" cy="190" rx="120" ry="10" fill="#d4af5a"/>
      <ellipse cx="140" cy="188" rx="118" ry="8"  fill="#e8c46a"/>

      {/* ════ BOTTOM TIER ════ */}
      {/* Side cylinder */}
      <path d="M 30,145 L 30,182 Q 140,198 250,182 L 250,145 Q 140,161 30,145 Z" fill="url(#fs1)"/>
      {/* Sponge & cream layers visible on side */}
      <path d="M 30,145 L 250,145 L 250,152 Q 140,168 30,152 Z" fill="url(#sp)" opacity="0.95"/>
      <path d="M 30,152 L 250,152 L 250,157 Q 140,173 30,157 Z" fill="url(#cr)" opacity="0.9"/>
      <path d="M 30,157 L 250,157 L 250,164 Q 140,180 30,164 Z" fill="url(#sp)" opacity="0.95"/>
      <path d="M 30,164 L 250,164 L 250,168 Q 140,184 30,168 Z" fill="url(#cr)" opacity="0.9"/>
      {/* Top ellipse */}
      <ellipse cx="140" cy="145" rx="110" ry="18" fill="url(#ft1)"/>
      {/* Frosting highlight */}
      <ellipse cx="125" cy="140" rx="65"  ry="9"  fill="rgba(255,255,255,0.22)"/>

      {/* Frosting drips on bottom tier */}
      {[
        'M 55,144 Q 50,158 54,166 Q 60,158 62,144 Z',
        'M 82,142 Q 78,154 81,161 Q 87,154 89,142 Z',
        'M 112,140 Q 109,150 112,157 Q 117,150 119,140 Z',
        'M 142,139 Q 139,149 142,156 Q 147,149 149,139 Z',
        'M 170,140 Q 167,152 170,159 Q 175,152 177,140 Z',
        'M 198,141 Q 195,153 198,160 Q 203,153 205,141 Z',
        'M 224,143 Q 221,155 224,162 Q 229,155 231,143 Z',
      ].map((d, i) => <path key={i} d={d} fill="#ff80ab"/>)}

      {/* Pearl border bottom tier */}
      {[48,78,108,140,170,200,230].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="180" r="5.5" fill="white" opacity="0.92"/>
          <circle cx={x-1} cy="178.5" r="2" fill="rgba(255,255,255,0.7)"/>
        </g>
      ))}

      {/* ════ TOP TIER ════ */}
      {/* Side */}
      <path d="M 78,105 L 78,142 Q 140,156 202,142 L 202,105 Q 140,119 78,105 Z" fill="url(#fs2)"/>
      {/* Sponge layers */}
      <path d="M 78,105 L 202,105 L 202,112 Q 140,126 78,112 Z" fill="url(#sp)" opacity="0.95"/>
      <path d="M 78,112 L 202,112 L 202,116 Q 140,130 78,116 Z" fill="url(#cr)" opacity="0.9"/>
      <path d="M 78,116 L 202,116 L 202,123 Q 140,137 78,123 Z" fill="url(#sp)" opacity="0.95"/>
      {/* Top ellipse */}
      <ellipse cx="140" cy="105" rx="62"  ry="11" fill="url(#ft2)"/>
      {/* Highlight */}
      <ellipse cx="130" cy="101" rx="36"  ry="6"  fill="rgba(255,255,255,0.25)"/>

      {/* Drips on top tier */}
      {[
        'M 92,104 Q 89,113 92,119 Q 96,113 98,104 Z',
        'M 116,102 Q 113,110 116,116 Q 120,110 122,102 Z',
        'M 140,101 Q 137,109 140,115 Q 144,109 146,101 Z',
        'M 163,102 Q 160,111 163,117 Q 167,111 169,102 Z',
        'M 186,104 Q 183,112 186,118 Q 190,112 192,104 Z',
      ].map((d, i) => <path key={i} d={d} fill="#ff80ab"/>)}

      {/* Pearl border top tier */}
      {[90,115,140,165,190].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="140" r="4.5" fill="white" opacity="0.9"/>
          <circle cx={x-1} cy="138.5" r="1.5" fill="rgba(255,255,255,0.7)"/>
        </g>
      ))}

      {/* ── Strawberries on top ── */}
      {[
        { cx: 115, cy: 99 },
        { cx: 140, cy: 96 },
        { cx: 165, cy: 99 },
      ].map((s, i) => (
        <g key={i}>
          {/* Berry body */}
          <path d={`M ${s.cx},${s.cy+10} Q ${s.cx-8},${s.cy} ${s.cx},${s.cy-9} Q ${s.cx+8},${s.cy} ${s.cx},${s.cy+10} Z`}
            fill="url(#sb)"/>
          {/* Seeds */}
          {[[-3,-2],[1,-4],[3,0],[-1,2]].map(([dx,dy],j) => (
            <ellipse key={j} cx={s.cx+dx} cy={s.cy+dy} rx="0.8" ry="1" fill="rgba(255,255,200,0.8)" transform={`rotate(${j*20} ${s.cx+dx} ${s.cy+dy})`}/>
          ))}
          {/* Leaves */}
          <path d={`M ${s.cx-2},${s.cy-9} Q ${s.cx-6},${s.cy-14} ${s.cx-3},${s.cy-13} Z`} fill="#4caf50"/>
          <path d={`M ${s.cx+2},${s.cy-9} Q ${s.cx+6},${s.cy-14} ${s.cx+3},${s.cy-13} Z`} fill="#4caf50"/>
          <path d={`M ${s.cx},${s.cy-9}   Q ${s.cx},${s.cy-16}   ${s.cx+1},${s.cy-14}  Z`} fill="#66bb6a"/>
        </g>
      ))}

      {/* Small hearts decoration on top tier side */}
      {[98,130,162,188].map((x, i) => (
        <text key={i} x={x} y="130" fontSize="8" fill="rgba(255,255,255,0.7)" textAnchor="middle">♥</text>
      ))}
    </svg>
  )
}

/* ── Main Screen ────────────────────────────────────────── */
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
    setTimeout(() => {
      setLeaving(true)
      setTimeout(onDone, 1000)
    }, 2000)
  }

  return (
    <div
      onClick={blowCandle}
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '0px',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 1s ease',
        overflow: 'hidden',
        userSelect: 'none',
        cursor: blown ? 'default' : 'pointer',
      }}
    >
      {/* Background candlelight */}
      <div style={{ position: 'absolute', inset: 0, background: '#07000f' }}/>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: blown ? 'transparent'
          : 'radial-gradient(ellipse 65% 55% at 50% 38%, rgba(255,155,45,0.2) 0%, rgba(232,96,122,0.07) 55%, transparent 75%)',
        animation: blown ? 'none' : 'flameWobble 1.4s ease-in-out infinite alternate',
        transition: 'background 1.6s ease',
      }}/>

      {/* Stars */}
      {[
        {t:'7%',l:'10%',s:'2px',  dur:'2.2s',del:'0s'  },
        {t:'12%',l:'80%',s:'1.5px',dur:'3s',  del:'0.6s'},
        {t:'20%',l:'4%', s:'1px', dur:'2.6s',del:'1.1s'},
        {t:'16%',l:'91%',s:'2px', dur:'1.9s',del:'0.3s'},
        {t:'75%',l:'6%', s:'1px', dur:'2.8s',del:'1.7s'},
        {t:'82%',l:'90%',s:'1.5px',dur:'2.1s',del:'0.9s'},
      ].map((s,i) => (
        <div key={i} className="animate-twinkle" style={{
          position:'absolute', top:s.t, left:s.l,
          width:s.s, height:s.s, borderRadius:'50%',
          background: i%2===0 ? '#fff' : '#ffb3c6',
          animationDuration:s.dur, animationDelay:s.del, pointerEvents:'none',
        }}/>
      ))}

      {/* ── Cake + Candle (candle sits on top of cake) ── */}
      <div style={{ position:'relative', zIndex:2, width:'280px' }}>

        {/* Candle — absolutely positioned on top of cake's top tier */}
        <div style={{
          position:'absolute', bottom:'108px', left:'50%',
          transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center',
          zIndex:3,
        }}>
          {/* Flame area */}
          <div style={{ height:'80px', display:'flex', alignItems:'flex-end', justifyContent:'center', position:'relative', width:'60px' }}>
            {!blown ? (
              <>
                <div style={{ position:'absolute', bottom:'8px', left:'50%', transform:'translateX(-50%)', width:'54px', height:'64px', background:'radial-gradient(ellipse at 50% 85%, rgba(255,140,30,0.42) 0%, transparent 70%)', filter:'blur(10px)', animation:'flameWobble 0.9s ease-in-out infinite alternate', borderRadius:'50% 50% 30% 30%' }}/>
                <div style={{ position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', width:'28px', height:'48px', background:'radial-gradient(ellipse at 50% 80%, rgba(255,190,65,0.75) 0%, rgba(255,100,20,0.4) 55%, transparent 80%)', filter:'blur(4px)', animation:'flameWobble 0.65s ease-in-out infinite alternate', animationDelay:'0.1s', borderRadius:'50% 50% 25% 25% / 60% 60% 30% 30%', transformOrigin:'bottom center' }}/>
                <div style={{ position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', width:'18px', height:'46px', background:'linear-gradient(to top, #ff4500 0%, #ff8c00 30%, #ffb830 65%, #ffe566 100%)', borderRadius:'50% 50% 22% 22% / 60% 60% 28% 28%', animation:'flameWobble 0.55s ease-in-out infinite alternate', animationDelay:'0.05s', transformOrigin:'bottom center', filter:'drop-shadow(0 0 4px #ff8c00)' }}/>
                <div style={{ position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', width:'10px', height:'32px', background:'linear-gradient(to top, #ff6600 0%, #ffcc00 50%, #fffde0 100%)', borderRadius:'50% 50% 20% 20% / 55% 55% 25% 25%', animation:'flameWobble 0.45s ease-in-out infinite alternate', animationDelay:'0.08s', transformOrigin:'bottom center' }}/>
                <div style={{ position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', width:'5px', height:'16px', background:'linear-gradient(to top, #ffdd88, #ffffff)', borderRadius:'50% 50% 20% 20% / 55% 55% 25% 25%', animation:'flameWobble 0.38s ease-in-out infinite alternate', transformOrigin:'bottom center' }}/>
              </>
            ) : (
              <>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ position:'absolute', bottom:`${8+i*6}px`, left:`${22+(i%2===0?-5:5)}px`, width:`${5+i*2}px`, height:`${5+i*2}px`, borderRadius:'50%', background:'rgba(180,180,200,0.5)', animation:'smokeDrift 1.6s ease-out forwards', animationDelay:`${i*0.12}s` }}/>
                ))}
                <div style={{ width:'4px', height:'6px', background:'#444', borderRadius:'2px', marginBottom:'2px' }}/>
              </>
            )}
          </div>

          {/* Wick */}
          <div style={{ width:'2px', height:'8px', background:'#555', borderRadius:'1px' }}/>

          {/* Wax */}
          <div style={{ width:'16px', height:'72px', position:'relative', background:'linear-gradient(90deg,#e8d5b8 0%,#fff8ee 35%,#ffefd4 65%,#e0c8a0 100%)', borderRadius:'3px 3px 2px 2px', boxShadow: blown ? 'none' : '0 0 14px rgba(255,160,50,0.45)', transition:'box-shadow 1s ease' }}>
            <div style={{ position:'absolute', top:'8px', left:'-3px', width:'7px', height:'20px', background:'linear-gradient(180deg,#fff8ee,#e8d5b8)', borderRadius:'0 0 50% 50%', opacity:0.9 }}/>
            <div style={{ position:'absolute', top:'5px', right:'-2px', width:'6px', height:'14px', background:'linear-gradient(180deg,#ffefd4,#e0c8a0)', borderRadius:'0 0 50% 50%', opacity:0.8 }}/>
            <div style={{ position:'absolute', top:0, bottom:0, left:'4px', width:'4px', background:'rgba(255,255,255,0.35)', borderRadius:'2px' }}/>
          </div>

          {/* Holder */}
          <div style={{ width:'26px', height:'9px', background:'linear-gradient(180deg,#d4a843,#a07830)', borderRadius:'4px', boxShadow:'0 3px 8px rgba(0,0,0,0.5)' }}/>
        </div>

        {/* Cake SVG */}
        <Cake lit={!blown} />
      </div>

      {/* ── Instruction ── */}
      <div style={{ textAlign:'center', marginTop:'40px', padding:'0 40px', position:'relative', zIndex:2 }}>
        {!blown ? (
          <>
            <p style={{ fontFamily:'var(--font-elegant)', fontStyle:'italic', color:'#ffb36688', fontSize:'11px', letterSpacing:'0.36em', textTransform:'uppercase', marginBottom:'12px' }}>
              make a wish ✨
            </p>
            <p style={{ fontFamily:'var(--font-romantic)', fontSize:'clamp(1.4rem,5vw,2rem)', color:'#fff0f3', textShadow:'0 0 20px rgba(255,160,50,0.45)', animation:'heartPulse 2s ease-in-out infinite' }}>
              Tap anywhere ♥
            </p>
          </>
        ) : (
          <>
            <p style={{ fontFamily:'var(--font-elegant)', fontStyle:'italic', color:'#e8607a99', fontSize:'11px', letterSpacing:'0.36em', textTransform:'uppercase', marginBottom:'12px', animation:'fadeInUp 0.6s ease-out forwards' }}>
              wish granted ✨
            </p>
            <p style={{ fontFamily:'var(--font-romantic)', fontSize:'clamp(1.5rem,5vw,2.2rem)', color:'#ffd6e7', textShadow:'0 0 24px rgba(232,96,122,0.55)', animation:'fadeInUp 0.7s ease-out 0.1s both' }}>
              Happy Birthday ♥
            </p>
          </>
        )}
      </div>
    </div>
  )
}
