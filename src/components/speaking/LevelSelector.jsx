// Structured/hairline restyle: an underline-tab row instead of solid
// filled pills — matches the quieter chrome used across the other modules.
// Which levels are actually clickable is passed in from the caller
// (derived from buildLevelLadder + real progress), not hard-coded here —
// so a level shows a lock label only when it's genuinely not reachable yet.
//
// Two different reasons look the same to a learner only at a glance —
// "soon" (nothing built yet) vs "locked" (it exists, finish the level
// before it first) mean very different things once every level has real
// content, so this mirrors ProgressMap's distinction instead of a single
// blanket label. `ladder` (buildLevelLadder's output) is optional, so
// older callers/tests that only pass `availableLevels` still work — they
// just fall back to "soon" for anything unavailable.
import { CEFR_LEVELS } from '../../lib/progressPath'

export default function LevelSelector({ current, onSelect, availableLevels = ['A1'], ladder = null, accent = 'var(--terracotta-deep)' }) {
  const reasonFor = (id) => ladder?.find(l => l.id === id)?.reason
  return (
    <div style={styles.row}>
      {CEFR_LEVELS.map(id => {
        const available = availableLevels.includes(id)
        const label = reasonFor(id) === 'prior-incomplete' ? 'locked' : 'soon'
        return (
          <button
            key={id}
            onClick={() => available && onSelect(id)}
            disabled={!available}
            style={{
              ...styles.btn,
              ...(id === current ? { color: accent, borderBottomColor: accent } : {}),
              ...(!available ? styles.disabled : {}),
            }}
          >
            {id}
            {!available && <span style={styles.soon}>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}

const styles = {
  row: {
    display: 'flex',
    gap: 4,
    marginBottom: 24,
    borderBottom: '1px solid var(--line)',
  },
  btn: {
    flex: 1,
    padding: '0 0 10px',
    border: 'none',
    borderBottom: '2px solid transparent',
    background: 'transparent',
    color: 'var(--ink-soft)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    marginBottom: -1,
  },
  disabled: {
    color: 'var(--line)',
    cursor: 'not-allowed',
  },
  soon: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    opacity: 0.8,
  },
}
