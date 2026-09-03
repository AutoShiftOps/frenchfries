export default function ChapterList({ chapters, completedPhrases, onSelectChapter }) {
  return (
    <div style={styles.list}>
      {chapters.map(ch => {
        const doneCount = ch.phrases.filter(
          p => completedPhrases?.[`${ch.id}:${p.id}`]
        ).length
        const total = ch.phrases.length

        return (
          <button key={ch.id} onClick={() => onSelectChapter(ch)} style={styles.item}>
            <div style={styles.itemText}>
              <span style={styles.title}>{ch.title}</span>
              <span style={styles.desc}>{ch.description}</span>
            </div>
            <span style={styles.progress}>{doneCount}/{total}</span>
          </button>
        )
      })}
    </div>
  )
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 24,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 16px',
    textAlign: 'left',
    gap: 12,
  },
  itemText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--ink)',
  },
  desc: {
    fontSize: 12,
    color: 'var(--ink-soft)',
  },
  progress: {
    fontSize: 13,
    color: 'var(--terracotta-deep)',
    fontWeight: 500,
    flexShrink: 0,
  },
}
