// ─────────────────────────────────────────────────────────
//  A love story in six scenes
// ─────────────────────────────────────────────────────────

import Image         from 'next/image'
import TypeWriter    from './components/TypeWriter'
import ScrollReveal  from './components/ScrollReveal'
import PhotoCarousel from './components/PhotoCarousel'
import LoveReasons   from './components/LoveReasons'
import Fireworks     from './components/Fireworks'
import VideoPlayer   from './components/VideoPlayer'

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

// ── Gallery photos (real images) ──────────────────────────
const GALLERY = [
  { src: '/photos/g1.webp', caption: 'Together always ♥'      },
  { src: '/photos/g2.jpg',  caption: 'You shine so bright ♥'  },
  { src: '/photos/g3.jpg',  caption: 'Simply you ♥'           },
  { src: '/photos/g4.png',  caption: 'Our adventure ♥'        },
  { src: '/photos/g6.jpg',  caption: 'A day to remember ♥'    },
  { src: '/photos/first.jpg', caption: 'Where it all began ♥'  },
]

// ─────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────
export default function BirthdayPage() {
  return (
    <div style={{ background: '#07000f', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════════════
          SCENE I  ·  The Opening
          first-photo.jpg as full-screen cinematic bg
      ════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background video — autoplays silently, loops */}
        <video
          src="/love.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            pointerEvents: 'none',
          }}
        />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,0,15,0.6) 0%, rgba(7,0,15,0.5) 40%, rgba(7,0,15,0.92) 100%)',
        }} />

        {/* Stars */}
        {STARS.map((s, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: `${s.size * 2.4}px`, height: `${s.size * 2.4}px`,
            borderRadius: '50%', background: '#fff',
            pointerEvents: 'none',
            animationDuration: s.duration, animationDelay: s.delay,
          }} />
        ))}

        {/* Floating hearts */}
        {HEARTS.map((h, i) => (
          <div key={i} className="animate-float-up" style={{
            position: 'absolute', bottom: 0, left: h.l,
            fontSize: `${h.s}px`,
            color: i % 2 === 0 ? '#e8607a' : '#ffb3c6',
            animationDuration: h.dur, animationDelay: h.d,
            opacity: 0, pointerEvents: 'none', userSelect: 'none',
          }}>♥</div>
        ))}

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          width: '100%', maxWidth: '480px',
        }}>
          <p className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '0.3s',
            color: '#e8607a88', fontSize: '10px',
            letterSpacing: '0.38em', textTransform: 'uppercase',
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
            marginBottom: '20px',
          }}>
            a gift made with love, just for you
          </p>

          <div style={{ fontFamily: 'var(--font-romantic)', fontWeight: 700, lineHeight: 1.05, marginBottom: '14px' }}>
            <TypeWriter
              text="Happy Birthday"
              speed={72}
              startDelay={700}
              className="shimmer-rose"
              style={{ fontSize: 'clamp(2.8rem,10vw,5.5rem)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '18px 0' }}>
            <div style={{ height: '1px', width: '44px', background: 'linear-gradient(90deg,transparent,#e8607a66)' }} />
            <span className="animate-heart-pulse" style={{ color: '#e8607a', fontSize: '14px', display: 'inline-block' }}>♥</span>
            <div style={{ height: '1px', width: '44px', background: 'linear-gradient(90deg,#e8607a66,transparent)' }} />
          </div>

          <div className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '0.6s',
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(1.9rem,7vw,3.4rem)',
            color: '#ffd6e7', marginBottom: '22px',
          }}>
            My Love ❤️
          </div>

          <p className="animate-fade-in-up" style={{
            opacity: 0, animationDelay: '1s',
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
            color: '#ffffff99', fontSize: 'clamp(0.9rem,3vw,1.05rem)',
            lineHeight: 1.8, maxWidth: '320px', margin: '0 auto',
          }}>
            Today the whole world celebrates because you were born —
            and I am the luckiest person alive to call you mine.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="animate-fade-in-up" style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          opacity: 0, animationDelay: '1.8s',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          zIndex: 1,
        }}>
          <div style={{ color: '#ffffff55', fontSize: '18px', animation: 'gentleFloat 2s ease-in-out infinite' }}>↓</div>
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#ffffff33', fontFamily: 'var(--font-elegant)' }}>
            SCROLL
          </span>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE III  ·  The Special Moment
          The kiss photo — full screen
      ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
        <Image
          src="/photos/special.webp"
          alt="Special moment"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,0,15,0.95) 0%, rgba(7,0,15,0.15) 50%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(28px,8vw,52px) 28px',
          textAlign: 'center', zIndex: 1,
        }}>
          <ScrollReveal>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: '#e8607a99', fontSize: '11px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              my favourite moment
            </p>
            <p style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.9rem,6vw,3rem)',
              color: '#fff0f3', lineHeight: 1.2,
            }}>
              This joy, this smile — all mine ♥
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE IV  ·  Our Story
          Swipeable gallery of memories
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) 0',
        background: 'linear-gradient(180deg,#07000f 0%,#0f0020 50%,#07000f 100%)',
      }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: '40px' }}>
            <p style={{ color: '#e8607a66', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontFamily: 'var(--font-elegant)', fontStyle: 'italic', marginBottom: '12px' }}>
              our story in pictures
            </p>
            <h2 style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(2.2rem,7vw,3.4rem)', color: '#fff0f3', lineHeight: 1.1, marginBottom: '10px' }}>
              Beautiful Memories
            </h2>
            <div style={{ width: '36px', height: '1px', background: '#e8607a', opacity: 0.5, margin: '0 auto' }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <PhotoCarousel photos={GALLERY} />
        </ScrollReveal>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE V  ·  A Moment We Shared
          The video
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) 24px',
        background: 'radial-gradient(ellipse at 50% 50%,#16002a 0%,#07000f 100%)',
      }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p style={{ color: '#e8607a66', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontFamily: 'var(--font-elegant)', fontStyle: 'italic', marginBottom: '12px' }}>
              a moment we shared
            </p>
            <h2 style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(2.2rem,7vw,3.4rem)', color: '#fff0f3', lineHeight: 1.1, marginBottom: '10px' }}>
              Just For You ♥
            </h2>
            <div style={{ width: '36px', height: '1px', background: '#e8607a', opacity: 0.5, margin: '0 auto' }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <VideoPlayer />
        </ScrollReveal>
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VI  ·  Why I Love You
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px,10vw,88px) clamp(20px,6vw,48px)',
        background: 'linear-gradient(180deg,#07000f 0%,#0f0020 50%,#07000f 100%)',
      }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p style={{ color: '#e8607a66', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', fontFamily: 'var(--font-elegant)', fontStyle: 'italic', marginBottom: '12px' }}>
              just a few of the infinite reasons
            </p>
            <h2 style={{ fontFamily: 'var(--font-romantic)', fontSize: 'clamp(2.2rem,7vw,3.4rem)', color: '#fff0f3', lineHeight: 1.1, marginBottom: '10px' }}>
              Why I Love You
            </h2>
            <div style={{ width: '36px', height: '1px', background: '#e8607a', opacity: 0.5, margin: '0 auto' }} />
          </div>
        </ScrollReveal>
        <LoveReasons />
      </section>


      {/* ════════════════════════════════════════════════
          SCENE VII  ·  Make a Wish
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(64px,12vw,100px) 24px clamp(80px,15vw,120px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 55%,#1a0028 0%,#07000f 80%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Faded giant heart bg */}
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

          <ScrollReveal delay={180}>
            <Fireworks />
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <p className="shimmer-gold" style={{
              fontFamily: 'var(--font-romantic)',
              fontSize: 'clamp(1.6rem,5vw,2.4rem)',
              marginTop: '60px',
            }}>
              With all my love, always ♥
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* Footer */}
      <footer style={{
        padding: '24px', textAlign: 'center',
        borderTop: '1px solid #ffffff08', background: '#050008',
      }}>
        <p style={{ color: '#ffffff15', fontSize: '11px', fontFamily: 'var(--font-elegant)', letterSpacing: '0.1em' }}>
          Made with ♥ just for you &nbsp;·&nbsp; {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  )
}
