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

// A compact "A1.1 · A1.2 · A1.3" row, shown under LevelSelector once a
// CEFR level is picked — the sub-level ladder that actually gates which
// chapters below are open, mirroring buildLevelLadder's own visual
// language (a small dot per checkpoint) at a finer grain. `subLadder` is
// buildSubLevelLadder's output (lib/subLevels.js): an array of
// { index, status } in order.
export function SubLevelBar({ level, subLadder, accent }) {
  if (!subLadder?.length) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18, marginTop: -12 }}>
      {subLadder.map(sub => {
        const complete = sub.status === 'complete'
        const locked = sub.status === 'locked'
        const current = sub.status === 'current'
        return (
          <div key={sub.index} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: complete ? 'var(--sage-deep)' : current ? accent : 'var(--line)',
              border: locked ? '1px solid var(--line)' : 'none',
            }} />
            <span style={{
              fontSize: 10.5, fontWeight: 700,
              color: complete ? 'var(--sage-deep)' : current ? accent : 'var(--ink-soft)',
            }}>
              {level}.{sub.index + 1}
            </span>
            {sub.index < subLadder.length - 1 && <span style={{ color: 'var(--line)', fontSize: 10, marginLeft: 1 }}>&middot;</span>}
          </div>
        )
      })}
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
