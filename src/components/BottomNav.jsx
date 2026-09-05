// Two destinations only — everything else is reached by tapping into the
// path itself, so there is never a menu to get lost in.
export default function BottomNav({ tab, onSelectTab }) {
  return (
    <div style={styles.bar}>
      <button onClick={() => onSelectTab('path')} style={styles.item}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === 'path' ? 'var(--terracotta)' : 'var(--ink-soft)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 21V4" /><path d="M6 4h11l-3 4 3 4H6" />
        </svg>
        <span style={{ ...styles.label, color: tab === 'path' ? 'var(--terracotta)' : 'var(--ink-soft)' }}>Path</span>
      </button>
      <button onClick={() => onSelectTab('you')} style={styles.item}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === 'you' ? 'var(--terracotta)' : 'var(--ink-soft)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
        <span style={{ ...styles.label, color: tab === 'you' ? 'var(--terracotta)' : 'var(--ink-soft)' }}>You</span>
      </button>
    </div>
  )
}

const styles = {
  bar: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    borderTop: '1px solid var(--line)',
    background: 'var(--white)',
    padding: '10px 40px 18px',
    maxWidth: 480,
    margin: '0 auto',
  },
  item: {
    flex: 1,
    border: 'none',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: 700,
  },
}
