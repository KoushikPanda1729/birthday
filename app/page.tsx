// ─────────────────────────────────────────────────────────
//  A love story in scenes
// ─────────────────────────────────────────────────────────

import Image         from 'next/image'
import TypeWriter    from './components/TypeWriter'
import ScrollReveal  from './components/ScrollReveal'
import PhotoCarousel from './components/PhotoCarousel'
import Fireworks     from './components/Fireworks'
import VideoPlayer   from './components/VideoPlayer'
import PageWrapper  from './components/PageWrapper'

// ── Deterministic stars ───────────────────────────────────
const STARS = Array.from({ length: 18 }, (_, i) => ({
  top:      `${((i * 13 + 7) * 31) % 100}%`,
  left:     `${((i * 17 + 3) * 37) % 100}%`,
  size:      1 + (i % 2),
  delay:    `${((i * 11 + 5) % 20) / 10}s`,
  duration: `${1.8 + (i % 4) * 0.45}s`,
}))

// ── Floating hearts ───────────────────────────────────────
const HEARTS = [
  { l: '8%',  d: '0s',   dur: '11s', s: 9  },
  { l: '25%', d: '3.5s', dur: '13s', s: 7  },
  { l: '44%', d: '1.4s', dur: '10s', s: 11 },
  { l: '63%', d: '5.1s', dur: '12s', s: 8  },
  { l: '80%', d: '2.7s', dur: '14s', s: 10 },
  { l: '93%', d: '7.0s', dur: '11s', s: 7  },
]

// ── Gallery (couple photos) ───────────────────────────────
const GALLERY = [
  { src: '/assets/first-photo.jpg',                                 caption: 'Where it all began ♥'   },
  { src: '/assets/IMG-20250825-WA0014.jpg',                        caption: 'Our first adventure ♥'  },
  { src: '/assets/IMG-20250914-WA0002.jpg',                        caption: 'Us ♥'                   },
  { src: '/assets/IMG-20251219-WA0004.jpg',                        caption: 'By the waters ♥'        },
  { src: '/assets/IMG-20251219-WA0005.jpg',                        caption: 'Under the stars ♥'      },
  { src: '/assets/ChatGPT Image Dec 24, 2025, 12_44_33 AM.png',   caption: 'Our story ♥'            },
  { src: '/assets/IMG_20260220_002853_581.webp',                   caption: 'Together, always ♥'    },
  { src: '/assets/special-2.webp',                                  caption: 'Home ♥'                 },
]

// ── Funny moments ─────────────────────────────────────────
const FUNNY = [
  { src: '/assets/Screenshot_2026-03-04-19-17-04-17_6012fa4d4ddec268fc5c7112cbb265e7.jpg',  caption: 'Too close on the call 😂'    },
  { src: '/assets/Screenshot_2026-03-04-19-19-17-91_6012fa4d4ddec268fc5c7112cbb265e7.jpg', caption: 'The look you give me 😆'    },
  { src: '/assets/Screenshot_2026-03-04-19-19-27-04_6012fa4d4ddec268fc5c7112cbb265e7.jpg', caption: 'Maximum chaos 😂'            },
  { src: '/assets/IMG-20260106-WA0007.jpg',                                                  caption: 'My cutest human 🐘'        },
]

// ── Section title helper ──────────────────────────────────
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <p style={{
        color: '#e8607a66', fontSize: '10px', letterSpacing: '0.38em',
        textTransform: 'uppercase', fontFamily: 'var(--font-elegant)',
        fontStyle: 'italic', marginBottom: '12px',
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: 'var(--font-romantic)', fontSize: 'clamp(2.2rem,7vw,3.4rem)',
        color: '#fff0f3', lineHeight: 1.1, marginBottom: '10px',
      }}>{title}</h2>
      <div style={{ width: '36px', height: '1px', background: '#e8607a', opacity: 0.5, margin: '0 auto' }} />
    </div>
  )
}

// ── Full-screen cinematic scene ───────────────────────────
function CinematicScene({
  src, eyebrow, title, pos = 'center center', overlayDir = 'top',
}: {
  src: string; eyebrow: string; title: string; pos?: string; overlayDir?: 'top' | 'bottom'
}) {
  const gradient = overlayDir === 'top'
    ? 'linear-gradient(to top, rgba(7,0,15,0.96) 0%, rgba(7,0,15,0.18) 55%, rgba(7,0,15,0.35) 100%)'
    : 'linear-gradient(to bottom, rgba(7,0,15,0.5) 0%, rgba(7,0,15,0.1) 40%, rgba(7,0,15,0.96) 100%)'
  return (
    <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
      <Image src={src} alt={title} fill sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: gradient }} />
      <div style={{
        position: 'absolute',
        ...(overlayDir === 'top' ? { bottom: 0 } : { top: 0 }),
        left: 0, right: 0,
        padding: 'clamp(32px,8vw,60px) clamp(24px,6vw,48px)',
        textAlign: 'center', zIndex: 1,
      }}>
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
            color: '#e8607a99', fontSize: '11px',
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '14px',
          }}>{eyebrow}</p>
          <p style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(2rem,7vw,3.8rem)',
            color: '#fff0f3', lineHeight: 1.15,
          }}>{title}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────
export default function BirthdayPage() {
  return (
    <PageWrapper>
    <div style={{ background: '#07000f', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════════════
          SCENE I  ·  The Opening
      ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {/* Background video */}
        <video src="/love.mp4" autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none',
        }} />

        {/* Dark cinematic overlay — heavier so text pops */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,0,15,0.82) 0%, rgba(7,0,15,0.68) 40%, rgba(7,0,15,0.78) 70%, rgba(7,0,15,0.98) 100%)',
        }} />

        {/* Rose-gold center glow behind text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,96,122,0.14) 0%, rgba(201,80,125,0.06) 55%, transparent 75%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Twinkling stars — mix white + rose */}
        {STARS.map((s, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: s.top, left: s.left,
            width: `${s.size * 2.4}px`, height: `${s.size * 2.4}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#ffb3c6' : '#fff',
            pointerEvents: 'none',
            animationDuration: s.duration, animationDelay: s.delay,
          }} />
        ))}

        {/* Floating hearts */}
        {HEARTS.map((h, i) => (
          <div key={i} className="animate-float-up" style={{
            position: 'absolute', bottom: 0, left: h.l,
            fontSize: `${h.s}px`,
            color: i % 3 === 0 ? '#e8607a' : i % 3 === 1 ? '#ffb3c6' : '#ffd6e7',
            animationDuration: h.dur, animationDelay: h.d,
            opacity: 0, pointerEvents: 'none', userSelect: 'none',
          }}>♥</div>
        ))}

        {/* Extra ambient hearts — fixed positions, very faint */}
        {[
          { top: '12%', left: '8%',  size: '28px', delay: '0s',   dur: '6s'  },
          { top: '18%', left: '82%', size: '20px', delay: '2.1s', dur: '7s'  },
          { top: '72%', left: '6%',  size: '16px', delay: '1.2s', dur: '5s'  },
          { top: '68%', left: '88%', size: '22px', delay: '3s',   dur: '8s'  },
        ].map((h, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: h.top, left: h.left,
            fontSize: h.size, color: '#e8607a', opacity: 0.12,
            pointerEvents: 'none', userSelect: 'none',
            animationDuration: h.dur, animationDelay: h.delay,
          }}>♥</div>
        ))}

        {/* Main text content */}
        <div style={{
          position: 'relative', zIndex: 1, textAlign: 'center',
          padding: '0 28px', width: '100%', maxWidth: 'clamp(320px,88vw,620px)',
        }}>

          {/* Eyebrow */}
          <p className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '0.2s',
            color: '#e8607acc', fontSize: '10px',
            letterSpacing: '0.38em', textTransform: 'uppercase',
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic', marginBottom: '18px',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>
            a gift made with love, just for you
          </p>

          {/* Happy Birthday — typewriter */}
          <div style={{
            fontFamily: 'var(--font-romantic)', fontWeight: 700, lineHeight: 1.05, marginBottom: '8px',
            filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.9))',
          }}>
            <TypeWriter text="Happy Birthday" speed={72} startDelay={600}
              className="shimmer-rose" style={{ fontSize: 'clamp(3rem,11vw,6rem)' }} />
          </div>

          {/* Divider with pulsing heart */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '16px 0' }}>
            <div style={{ height: '1px', flex: 1, maxWidth: '70px', background: 'linear-gradient(90deg,transparent,#e8607a88)' }} />
            <span className="animate-heart-pulse" style={{ color: '#e8607a', fontSize: '16px', display: 'inline-block' }}>♥</span>
            <div style={{ height: '1px', flex: 1, maxWidth: '70px', background: 'linear-gradient(90deg,#e8607a88,transparent)' }} />
          </div>

          {/* My Love */}
          <div className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '0.7s',
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(2rem,8vw,3.8rem)',
            color: '#ffd6e7',
            textShadow: '0 0 40px rgba(232,96,122,0.6), 0 4px 20px rgba(0,0,0,0.9)',
            marginBottom: '28px',
          }}>
            My Love ❤️
          </div>

          {/* Rose divider line */}
          <div className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '0.9s',
            height: '1px', maxWidth: '200px', margin: '0 auto 24px',
            background: 'linear-gradient(90deg,transparent,#e8607a66,transparent)',
          }} />

          {/* Romantic quote */}
          <p className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '1.1s',
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
            color: '#ffffffcc', fontSize: 'clamp(0.95rem,3.2vw,1.1rem)',
            lineHeight: 1.9, maxWidth: '300px', margin: '0 auto 24px',
            textShadow: '0 2px 16px rgba(0,0,0,0.95)',
          }}>
            Today the whole world celebrates because you were born —
            and I am the luckiest person alive to call you mine.
          </p>

          {/* Signature */}
          <p className="animate-fade-in-up shimmer-rose" style={{
            opacity: 0, animationDelay: '1.4s',
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(1.1rem,3.5vw,1.4rem)',
            textShadow: '0 2px 16px rgba(0,0,0,0.9)',
          }}>
            — with all my love ♥
          </p>
        </div>

        {/* Scroll hint */}
        <div className="animate-fade-in-up" style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          opacity: 0, animationDelay: '2s',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1,
        }}>
          <div style={{ color: '#ffffff44', fontSize: '18px', animation: 'gentleFloat 2s ease-in-out infinite' }}>↓</div>
          <span style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#ffffff33', fontFamily: 'var(--font-elegant)' }}>SCROLL</span>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE II  ·  Breathtaking
          Her stunning black-saree photoshoot
      ════════════════════════════════════════════════ */}
      <CinematicScene
        src="/assets/IMG-20250914-WA0008.jpg"
        eyebrow="every single time"
        title="You take my breath away ♥"
        pos="center 30%"
        overlayDir="top"
      />


      {/* ════════════════════════════════════════════════
          SCENE III  ·  The Special Moment
      ════════════════════════════════════════════════ */}
      <CinematicScene
        src="/assets/special.webp"
        eyebrow="my favourite moment"
        title="This joy, this smile — all mine ♥"
        pos="center 55%"
        overlayDir="top"
      />


      {/* ════════════════════════════════════════════════
          SCENE IV  ·  Our Beautiful Story
          Swipeable couple gallery
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) 0',
        background: 'linear-gradient(180deg,#07000f 0%,#0f0020 50%,#07000f 100%)',
      }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', padding: '0 clamp(24px,8vw,80px)', marginBottom: '40px' }}>
            <SectionTitle eyebrow="our story in pictures" title="Beautiful Memories" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <PhotoCarousel photos={GALLERY} />
        </ScrollReveal>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE V  ·  Just You
          Magazine-style portrait gallery — all her photos
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) clamp(16px,5vw,36px)',
        background: 'linear-gradient(180deg,#0f0020 0%,#07000f 50%,#0f0020 100%)',
      }}>
        <ScrollReveal>
          <SectionTitle eyebrow="just you, always you" title="Simply Beautiful ♥" />
        </ScrollReveal>

        <div style={{ maxWidth: 'clamp(300px,92vw,560px)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(10px,3vw,18px)' }}>

          {/* Row 1 — full width */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
              <img src="/assets/IMG-20250914-WA0001.jpg" alt="reading"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(7,0,15,0.88), transparent)',
                padding: '28px 18px 16px', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(1.2rem,4vw,1.5rem)' }}>
                  Lost in her world ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 2 — two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,3vw,18px)' }}>
            {[
              { src: '/assets/IMG-20250822-WA0012.jpg', caption: 'Every glance ♥', pos: 'center 20%' },
              { src: '/assets/IMG-20250822-WA0013.jpg', caption: 'Pure grace ♥',   pos: 'center 30%' },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  <img src={p.src} alt={p.caption}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: p.pos, display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(7,0,15,0.85), transparent)',
                    padding: '20px 10px 10px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(0.95rem,3vw,1.1rem)' }}>
                      {p.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 3 — full width */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
              <img src="/assets/IMG-20250914-WA0008.jpg" alt="glowing"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 28%', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(7,0,15,0.9), transparent)',
                padding: '28px 18px 16px', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(1.2rem,4vw,1.5rem)' }}>
                  She glows ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 4 — two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,3vw,18px)' }}>
            {[
              { src: '/assets/IMG-20251022-WA0036.jpg', caption: 'Lighting every room ♥', pos: 'center 20%' },
              { src: '/assets/IMG-20251023-WA0007.jpg', caption: 'Beautiful always ♥',    pos: 'center 20%' },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  <img src={p.src} alt={p.caption}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: p.pos, display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(7,0,15,0.85), transparent)',
                    padding: '20px 10px 10px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(0.95rem,3vw,1.1rem)' }}>
                      {p.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 5 — full width */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
              <img src="/assets/IMG-20260208-WA0001.jpg" alt="stunning"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 22%', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(7,0,15,0.9), transparent)',
                padding: '28px 18px 16px', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(1.2rem,4vw,1.5rem)' }}>
                  My favourite human ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 6 — two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,3vw,18px)' }}>
            {[
              { src: '/assets/IMG-20260117-WA0013.jpg', caption: 'Even without trying ♥', pos: 'center 25%' },
              { src: '/assets/IMG20260124202559.jpg',   caption: 'That smile ♥',           pos: 'center 20%' },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  <img src={p.src} alt={p.caption}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: p.pos, display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(7,0,15,0.85), transparent)',
                    padding: '20px 10px 10px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(0.95rem,3vw,1.1rem)' }}>
                      {p.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 7 — full width, the 4-grid selfie collage */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
              <img src="/assets/IMG-20260209-WA0010.jpg" alt="collage"
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(7,0,15,0.88), transparent)',
                padding: '28px 18px 16px', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(1.2rem,4vw,1.5rem)' }}>
                  Every angle, perfect ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 8 — two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,3vw,18px)' }}>
            {[
              { src: '/assets/IMG-20251022-WA0039.jpg', caption: 'In her element ♥',  pos: 'center 20%' },
              { src: '/assets/IMG-20260105-WA0007.jpg', caption: 'Cozy & perfect ♥',  pos: 'center 25%' },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  <img src={p.src} alt={p.caption}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: p.pos, display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(7,0,15,0.85), transparent)',
                    padding: '20px 10px 10px', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--font-romantic)', color: '#ffd6e7', fontSize: 'clamp(0.95rem,3vw,1.1rem)' }}>
                      {p.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 9 — the yellow flower / ring close-up, romantic closing shot */}
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
              <img src="/assets/IMG-20250911-WA0012.jpg" alt="forever"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(7,0,15,0.92) 0%, rgba(7,0,15,0.1) 50%, transparent 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 20px 20px', textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: '#e8607a88', fontSize: '10px',
                  letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px',
                }}>always & forever</p>
                <p className="shimmer-rose" style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(1.4rem,5vw,2rem)' }}>
                  Mine ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VI  ·  The Silly Side
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) clamp(16px,5vw,36px)',
        background: 'linear-gradient(180deg,#07000f 0%,#100018 100%)',
      }}>
        <ScrollReveal>
          <SectionTitle eyebrow="because you are also this" title="The Silly Side ♥" />
        </ScrollReveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(10px,3vw,18px)',
          maxWidth: 'clamp(300px,88vw,540px)', margin: '0 auto',
        }}>
          {FUNNY.map((f, i) => (
            <ScrollReveal key={i} delay={i * 90}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.55)', border: '1px solid #ffffff08' }}>
                  <img src={f.src} alt={f.caption}
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
                </div>
                <p style={{
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: '#ffd6e788', fontSize: 'clamp(0.72rem,2.4vw,0.85rem)',
                  lineHeight: 1.5, marginTop: '10px', padding: '0 4px',
                }}>{f.caption}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VII  ·  A Moment We Shared — Video
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) clamp(20px,6vw,40px)',
        background: 'radial-gradient(ellipse at 50% 40%, #1e0030 0%, #07000f 70%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Soft sparkle dots bg */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute',
            top:  `${((i * 17 + 5) * 29) % 100}%`,
            left: `${((i * 13 + 3) * 37) % 100}%`,
            width: '3px', height: '3px', borderRadius: '50%',
            background: '#e8607a', opacity: 0.3, pointerEvents: 'none',
            animationDuration: `${1.8 + (i % 4) * 0.5}s`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <SectionTitle eyebrow="a message just for you" title="Just For You ♥" />
          </ScrollReveal>

          {/* Love letter card */}
          <ScrollReveal delay={100}>
            <div style={{
              maxWidth: 'clamp(280px,82vw,400px)', margin: '0 auto 36px',
              background: 'linear-gradient(145deg,#1a0a28,#120020)',
              border: '1px solid #e8607a22',
              borderRadius: '20px',
              padding: 'clamp(22px,6vw,32px)',
              boxShadow: '0 8px 40px rgba(232,96,122,0.12), inset 0 1px 0 rgba(232,96,122,0.08)',
              position: 'relative',
            }}>
              {/* Corner hearts */}
              <span style={{ position: 'absolute', top: '14px', left: '16px',  fontSize: '10px', color: '#e8607a44' }}>♥</span>
              <span style={{ position: 'absolute', top: '14px', right: '16px', fontSize: '10px', color: '#e8607a44' }}>♥</span>

              {/* Opening line */}
              <p style={{
                fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                color: '#e8607a88', fontSize: '10px', letterSpacing: '0.28em',
                textTransform: 'uppercase', textAlign: 'center', marginBottom: '18px',
              }}>for your eyes only</p>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#e8607a33)' }} />
                <span style={{ color: '#e8607a66', fontSize: '12px' }}>♥</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#e8607a33,transparent)' }} />
              </div>

              <p style={{
                fontFamily: 'var(--font-romantic)',
                color: '#ffd6e7cc', fontSize: 'clamp(1.05rem,3.5vw,1.25rem)',
                lineHeight: 1.85, textAlign: 'center',
              }}>
                I saved this because it is my favourite kind of you —
                unfiltered, real, completely yourself.
              </p>

              <p style={{
                fontFamily: 'var(--font-romantic)',
                color: '#e8a0bfaa', fontSize: 'clamp(0.95rem,3vw,1.1rem)',
                lineHeight: 1.85, textAlign: 'center', marginTop: '14px',
              }}>
                I could watch this forever and still fall in love all over again.
              </p>

              {/* Signature */}
              <div style={{ marginTop: '22px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#e8607a22)' }} />
                  <span style={{ color: '#e8607a55', fontSize: '10px' }}>♥</span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#e8607a22,transparent)' }} />
                </div>
                <p className="shimmer-rose" style={{
                  fontFamily: 'var(--font-romantic)',
                  fontSize: 'clamp(1.3rem,4vw,1.6rem)',
                }}>
                  Always yours ♥
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Videos */}
          {[
            { src: '/assets/WhatsApp Video 2026-03-27 at 16.50.14.mp4', label: 'video one' },
            { src: '/assets/WhatsApp Video 2026-03-27 at 18.09.23.mp4', label: 'video two' },
            { src: '/assets/WhatsApp Video 2026-03-27 at 18.12.17.mp4', label: 'video three' },
          ].map((v, i) => (
            <ScrollReveal key={i} delay={i * 160}>
              <div style={{ marginBottom: i < 2 ? 'clamp(32px,8vw,52px)' : 0 }}>
                <p style={{
                  textAlign: 'center', marginBottom: '14px',
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: '#e8607a66', fontSize: '10px', letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}>♥ {v.label}</p>
                <VideoPlayer src={v.src} />
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={300}>
            <div style={{ marginTop: '32px' }}>
              <VideoPlayer src="/assets/WhatsApp Video 2026-03-27 at 18.09.23.mp4" noSound />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div style={{ marginTop: '32px' }}>
              <VideoPlayer src="/assets/WhatsApp Video 2026-03-27 at 18.12.17.mp4" noSound />
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VII.5  ·  Love Declaration
      ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(72px,14vw,110px) clamp(28px,8vw,64px)',
        background: 'linear-gradient(180deg,#07000f 0%,#12001e 50%,#07000f 100%)',
        textAlign: 'center',
      }}>
        {/* Faint bg hearts */}
        {['12%','85%','50%'].map((l,i) => (
          <div key={i} aria-hidden style={{
            position:'absolute', top:`${20+i*28}%`, left:l,
            fontSize:'clamp(60px,18vw,120px)', color:'#e8607a04',
            fontFamily:'serif', pointerEvents:'none', userSelect:'none',
            transform:`rotate(${i*14-10}deg)`,
          }}>♥</div>
        ))}

        <div style={{ position:'relative', zIndex:1, maxWidth:'clamp(300px,86vw,560px)', margin:'0 auto' }}>

          <ScrollReveal>
            <p style={{
              fontFamily:'var(--font-elegant)', fontStyle:'italic',
              color:'#e8607a55', fontSize:'10px',
              letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:'48px',
            }}>from my heart to yours</p>
          </ScrollReveal>

          {[
            { line: 'On every ordinary day,',       sub: 'you make it extraordinary.' },
            { line: 'In every quiet moment,',        sub: 'you are my loudest joy.'    },
            { line: 'Across every distance,',        sub: 'you feel like home.'        },
            { line: 'You are the greatest thing',    sub: 'that ever happened to me.'  },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div style={{ marginBottom: 'clamp(28px,7vw,44px)' }}>
                <p style={{
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: '#ffffff55', fontSize: 'clamp(0.85rem,2.8vw,1rem)',
                  letterSpacing: '0.04em', marginBottom: '4px',
                }}>{s.line}</p>
                <p style={{
                  fontFamily: 'var(--font-romantic)',
                  fontSize: 'clamp(1.7rem,6vw,2.8rem)',
                  color: '#fff0f3', lineHeight: 1.15,
                }}>{s.sub}</p>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={320}>
            <div style={{ margin: 'clamp(36px,8vw,56px) auto 0', maxWidth: '240px' }}>
              <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,#e8607a55,transparent)', marginBottom: '32px' }} />
              <p className="shimmer-rose" style={{
                fontFamily: 'var(--font-romantic)',
                fontSize: 'clamp(2rem,7vw,3.2rem)', lineHeight: 1.2,
              }}>
                I love you —
              </p>
              <p style={{
                fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                color: '#e8a0bf99', fontSize: 'clamp(0.95rem,3vw,1.1rem)',
                marginTop: '10px', letterSpacing: '0.08em',
              }}>
                now, always, forever.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VIII  ·  Make a Wish
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(64px,12vw,100px) 24px clamp(80px,15vw,120px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 55%,#1a0028 0%,#07000f 80%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '60vw', color: '#e8607a05',
          pointerEvents: 'none', userSelect: 'none', fontFamily: 'serif',
        }}>♥</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <p style={{ color: '#e8607a66', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontFamily: 'var(--font-elegant)', fontStyle: 'italic', marginBottom: '12px' }}>
              close your eyes
            </p>
            <h2 className="shimmer-rose animate-gentle-float" style={{
              fontFamily: 'var(--font-romantic)', fontWeight: 700,
              fontSize: 'clamp(3rem,10vw,6rem)', marginBottom: '10px',
            }}>
              Make a Wish
            </h2>
            <div style={{ width: '36px', height: '1px', background: '#e8607a', opacity: 0.5, margin: '0 auto' }} />
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#e8a0bf77', fontSize: '0.95rem', lineHeight: 1.8,
              maxWidth: '300px', margin: '20px auto 48px',
            }}>
              Blow out the candles and let the universe hear what your heart is hoping for.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={180}><Fireworks /></ScrollReveal>
          <ScrollReveal delay={320}>
            <p className="shimmer-gold" style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.6rem,5vw,2.4rem)', marginTop: '60px',
            }}>
              With all my love, always ♥
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* Footer */}
      <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #ffffff08', background: '#050008' }}>
        <p style={{ color: '#ffffff15', fontSize: '11px', fontFamily: 'var(--font-elegant)', letterSpacing: '0.1em' }}>
          Made with ♥ just for you &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
      </footer>

    </div>
    </PageWrapper>
  )
}
