import { motion } from 'framer-motion'

// Structured/hairline restyle: numbered rows separated by thin dividers
// (no bordered cards), with a slim per-chapter progress bar instead of a
// "3/5" badge — matches the eyebrow-label system used across Reading,
// Listening, and Writing (see ModuleUI.jsx).
export default function ChapterList({ chapters, completedPhrases, onSelectChapter, accent = 'var(--terracotta-deep)' }) {
  return (
    <div style={styles.list}>
      {chapters.map((ch, i) => {
        const doneCount = ch.phrases.filter(
          p => completedPhrases?.[`${ch.id}:${p.id}`]
        ).length
        const total = ch.phrases.length
        const pct = total > 0 ? doneCount / total : 0

        return (
          <motion.button
            key={ch.id}
            onClick={() => onSelectChapter(ch)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.99 }}
            style={styles.item}
          >
            <span style={{ ...styles.index, color: accent }}>{String(i + 1).padStart(2, '0')}</span>
            <div style={styles.itemText}>
              <span style={styles.title}>{ch.title}</span>
              <span style={styles.desc}>{ch.description}</span>
              <div style={styles.track}>
                <div style={{ ...styles.trackFill, width: `${pct * 100}%`, background: accent }} />
              </div>
            </div>
            <span style={{ ...styles.progress, color: accent }}>{doneCount}/{total}</span>
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
}
