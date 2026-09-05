// Small shared pieces used by Reading, Listening, and Writing so the three
// non-Speaking modules read as one consistent system: a module eyebrow +
// accent dot, and a thin segmented progress bar instead of "Item 1 of 5".

export function ModuleHeader({ title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: accent, textTransform: 'uppercase' }}>{title}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>{subtitle}</p>
    </div>
  )
}

export function TopProgress({ index, total, accent }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= index ? accent : 'var(--line)' }} />
      ))}
    </div>
  )
}

// Plain-English phonetic respelling shown under a French phrase — not IPA,
// just something a first-time learner can sound out immediately. Sits at
// the bottom of the phrase/passage block, quiet by default (not a big claim
// of authority — it's a rough guide, not a certified transcription).
export function Pronunciation({ text, accent }) {
  if (!text) return null
  return (
    <p style={{
      fontSize: 12.5,
      color: 'var(--ink-soft)',
      fontStyle: 'italic',
      margin: '10px 0 0',
      lineHeight: 1.5,
    }}>
      <span style={{
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: accent || 'var(--ink-soft)',
        marginRight: 6,
      }}>
        Say it like
      </span>
      {text}
    </p>
  )
}
