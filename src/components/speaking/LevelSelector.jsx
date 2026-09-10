// "Mission tab" restyle — round status badges + a soft highlight pill
// behind the current level, instead of the old flat underline-tab row.
// The idea (and the label "Cleared"/"Locked"/"Soon") comes from a
// mission-style control-center UI Sajja pointed at as a reference: each
// stop reads as its own badge (checkmark once it's done, a lock while
// it's out of reach, the level itself while it's open) rather than a
// plain text tab. Same props/signature as before, so every caller
// (Speaking/Reading/Listening/Writing/Exams) needs no changes — only
// this file's markup and styles changed.
//
// Which levels are actually clickable is passed in from the caller
// (derived from buildLevelLadder + real progress), not hard-coded here —
// so a level shows a lock only when it's genuinely not reachable yet.
// Two different reasons look the same to a learner only at a glance —
// "soon" (nothing built yet) vs "locked" (it exists, finish the level
// before it first) mean very different things once every level has real
// content, so this mirrors ProgressMap's distinction instead of a single
// blanket label. `ladder` (buildLevelLadder's output) is optional, so
// older callers/tests that only pass `availableLevels` still work — they
// just fall back to "soon" for anything unavailable.
import { CEFR_LEVELS } from '../../lib/progressPath'

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  )
}

export default function LevelSelector({ current, onSelect, availableLevels = ['A1'], ladder = null, accent = 'var(--terracotta-deep)' }) {
  const statusFor = (id) => ladder?.find(l => l.id === id)?.status
  const reasonFor = (id) => ladder?.find(l => l.id === id)?.reason

  return (
    <div style={styles.row}>
      {CEFR_LEVELS.map(id => {
        const available = availableLevels.includes(id)
        const complete = statusFor(id) === 'complete'
        const isCurrent = id === current
        const caption = complete ? 'Cleared' : !available ? (reasonFor(id) === 'prior-incomplete' ? 'Locked' : 'Soon') : null

        return (
          <button
            key={id}
            onClick={() => available && onSelect(id)}
            disabled={!available}
            style={{ ...styles.tab, ...(isCurrent ? styles.tabActive : {}) }}
          >
            <span
              style={{
                ...styles.badge,
                ...(complete
                  ? { background: 'var(--sage-deep)', borderColor: 'var(--sage-deep)' }
                  : !available
                    ? styles.badgeLocked
                    : { borderColor: accent, color: accent, ...(isCurrent ? { background: accent, color: 'var(--cream)' } : {}) }),
              }}
            >
              {complete ? <CheckIcon /> : !available ? <LockIcon /> : id}
            </span>
            <span style={{ ...styles.label, ...(isCurrent ? { color: accent } : !available ? { color: 'var(--ink-soft)' } : {}) }}>
              {id}
            </span>
            {caption && <span style={styles.caption}>{caption}</span>}
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
    overflowX: 'auto',
  },
  tab: {
    flex: 1,
    minWidth: 0,
    border: 'none',
    background: 'transparent',
    borderRadius: 'var(--radius-md)',
    padding: '10px 4px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  tabActive: {
    background: 'var(--white)',
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '2px solid var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11.5,
    fontWeight: 700,
    color: 'var(--ink-soft)',
  },
  badgeLocked: {
    borderColor: 'var(--line)',
    background: 'transparent',
  },
  label: {
    fontSize: 11.5,
    fontWeight: 700,
    color: 'var(--ink)',
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: 8.5,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--ink-soft)',
    opacity: 0.85,
  },
}
