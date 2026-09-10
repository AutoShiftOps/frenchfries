import AuthBar from './auth/AuthBar'

// Desktop-only left rail (≥900px — see .app-sidebar in index.css, which
// hides this and shows BottomNav below that breakpoint instead). Same
// four destinations as BottomNav, same icons, just a vertical nav instead
// of a bottom bar — the two are never both visible at once.
const ICONS = {
  path: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V4" /><path d="M6 4h11l-3 4 3 4H6" />
    </svg>
  ),
  exams: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  ),
  board: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 01-10 0V4z" /><path d="M7 6H4a1 1 0 00-1 1 4 4 0 004 4M17 6h3a1 1 0 011 1 4 4 0 01-4 4" />
    </svg>
  ),
  you: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
}

const NAV = [
  { key: 'path', label: 'Path' },
  { key: 'exams', label: 'Exams' },
  { key: 'board', label: 'Board' },
  { key: 'you', label: 'You' },
]

export default function Sidebar({ tab, onSelectTab, session }) {
  return (
    <nav className="app-sidebar" style={styles.wrap}>
      <div style={styles.brand}>FrenchFry</div>
      <div style={styles.navList}>
        {NAV.map(item => {
          const active = tab === item.key
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}
            >
              <span style={{ color: active ? 'var(--terracotta)' : 'var(--ink-soft)', display: 'flex' }}>
                {ICONS[item.key]}
              </span>
              <span style={{ color: active ? 'var(--terracotta)' : 'var(--ink-soft)' }}>{item.label}</span>
            </button>
          )
        })}
      </div>
      <div style={styles.authSlot}>
        <AuthBar session={session} />
      </div>
    </nav>
  )
}

const styles = {
  wrap: {
    // No `display` here on purpose — .app-sidebar in index.css owns
    // display (none by default, flex only at >=900px). An inline
    // `display` would always win over that media query and force this
    // full-height rail to render on mobile too, hiding the real page
    // content below it.
    flexDirection: 'column',
    height: '100dvh',
    padding: '28px 16px',
    borderRight: '1px solid var(--line)',
    position: 'sticky',
    top: 0,
  },
  brand: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 600,
    color: 'var(--terracotta)',
    marginBottom: 32,
    paddingLeft: 8,
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    border: 'none',
    background: 'transparent',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 12px',
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'left',
  },
  navItemActive: {
    background: 'var(--white)',
  },
  authSlot: {
    borderTop: '1px solid var(--line)',
    paddingTop: 16,
  },
}
