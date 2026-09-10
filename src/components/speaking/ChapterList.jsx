import { motion } from 'framer-motion'

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  )
}

// Structured/hairline restyle: numbered rows separated by thin dividers
// (no bordered cards), with a slim per-chapter progress bar instead of a
// "3/5" badge — matches the eyebrow-label system used across Reading,
// Listening, and Writing (see ModuleUI.jsx).
//
// A chapter may arrive pre-annotated with `locked` (see
// lib/subLevels.js's annotateChaptersWithSubLevel) when its sub-level
// isn't reached yet — it renders muted, un-clickable, with a lock badge
// instead of a progress count, the same visual language LevelSelector
// already uses for a locked CEFR level.
export default function ChapterList({ chapters, completedPhrases, onSelectChapter, accent = 'var(--terracotta-deep)' }) {
  return (
    <div style={styles.list}>
      {chapters.map((ch, i) => {
        const doneCount = ch.phrases.filter(
          p => completedPhrases?.[`${ch.id}:${p.id}`]
        ).length
        const total = ch.phrases.length
        const pct = total > 0 ? doneCount / total : 0
        const locked = !!ch.locked

        return (
          <motion.button
            key={ch.id}
            onClick={() => !locked && onSelectChapter(ch)}
            disabled={locked}
            whileHover={locked ? {} : { x: 2 }}
            whileTap={locked ? {} : { scale: 0.99 }}
            style={{ ...styles.item, ...(locked ? styles.itemLocked : {}) }}
          >
            <span style={{ ...styles.index, color: locked ? 'var(--ink-soft)' : accent }}>{String(i + 1).padStart(2, '0')}</span>
            <div style={styles.itemText}>
              <span style={{ ...styles.title, ...(locked ? { color: 'var(--ink-soft)' } : {}) }}>{ch.title}</span>
              <span style={styles.desc}>{locked ? `Finish sub-level ${ch.subLevel - 1} to unlock` : ch.description}</span>
              {!locked && (
                <div style={styles.track}>
                  <div style={{ ...styles.trackFill, width: `${pct * 100}%`, background: accent }} />
                </div>
              )}
            </div>
            {locked ? (
              <span style={styles.lockBadge}><LockIcon /></span>
            ) : (
              <span style={{ ...styles.progress, color: accent }}>{doneCount}/{total}</span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
    borderTop: '1px solid var(--line)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    border: 'none',
    borderBottom: '1px solid var(--line)',
    background: 'transparent',
    padding: '16px 4px',
    textAlign: 'left',
  },
  itemLocked: {
    cursor: 'not-allowed',
  },
  index: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    flexShrink: 0,
    width: 20,
  },
  itemText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 500,
    color: 'var(--ink)',
  },
  desc: {
    fontSize: 12,
    color: 'var(--ink-soft)',
  },
  track: {
    height: 2,
    borderRadius: 1,
    background: 'var(--line)',
    marginTop: 4,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 1,
  },
  progress: {
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  lockBadge: {
    display: 'flex',
    flexShrink: 0,
  },
}
