// Four destinations — everything else is reached by tapping into the
// path itself, so there is never a menu to get lost in.
export default function BottomNav({ tab, onSelectTab }) {
  return (
    <div className="bottom-nav" style={styles.bar}>
      <button onClick={() => onSelectTab('path')} style={styles.item}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === 'path' ? 'var(--terracotta)' : 'var(--ink-soft)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 21V4" /><path d="M6 4h11l-3 4 3 4H6" />
        </svg>
        <span style={{ ...styles.label, color: tab === 'path' ? 'var(--terracotta)' : 'var(--ink-soft)' }}>Path</span>
      </button>
      <button onClick={() => onSelectTab('exams')} style={styles.item}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === 'exams' ? 'var(--terracotta)' : 'var(--ink-soft)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
        <span style={{ ...styles.label, color: tab === 'exams' ? 'var(--terracotta)' : 'var(--ink-soft)' }}>Exams</span>
      </button>
      <button onClick={() => onSelectTab('board')} style={styles.item}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === 'board' ? 'var(--terracotta)' : 'var(--ink-soft)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 01-10 0V4z" /><path d="M7 6H4a1 1 0 00-1 1 4 4 0 004 4M17 6h3a1 1 0 011 1 4 4 0 01-4 4" />
        </svg>
        <span style={{ ...styles.label, color: tab === 'board' ? 'var(--terracotta)' : 'var(--ink-soft)' }}>Board</span>
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
    // No `display` here on purpose — .bottom-nav in index.css owns
    // display (flex by default on mobile, none at >=900px where the
    // Sidebar takes over). An inline `display` would always win over
    // that media query and keep this bar showing at desktop widths too.
    position: 'sticky',
    bottom: 0,
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
