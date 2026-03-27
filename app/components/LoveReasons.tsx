import ScrollReveal from './ScrollReveal'

const REASONS = [
  { n: '01', text: 'Your smile. The way your eyes crinkle at the corners when something makes you genuinely, completely happy.' },
  { n: '02', text: 'Your laugh. Unguarded, real, unstoppable — it fills every room and stays with me long after it fades.' },
  { n: '03', text: 'Your kindness. The quiet, instinctive way you always make the people around you feel seen and loved.' },
  { n: '04', text: 'Your strength. How you face every storm with grace and still manage to come out shining on the other side.' },
  { n: '05', text: 'The way you love. Fully, fearlessly, without a single condition. It is the most beautiful thing I have ever witnessed.' },
  { n: '06', text: 'Simply you. Every part of you is my home, my peace, my greatest adventure and my greatest gift.' },
]

export default function LoveReasons() {
  return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {REASONS.map((r, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div
            style={{
              padding: '28px 0',
              borderBottom: i < REASONS.length - 1 ? '1px solid #ffffff08' : 'none',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-elegant)',
              color: '#c9a96e',
              fontSize: '10px',
              letterSpacing: '0.3em',
              marginBottom: '10px',
            }}>
              {r.n}
            </p>
            <p style={{
              fontFamily: 'var(--font-elegant)',
              fontStyle: 'italic',
              color: '#fff0f3bb',
              fontSize: '1rem',
              lineHeight: 1.9,
            }}>
              {r.text}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
