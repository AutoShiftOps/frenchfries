const TILES = [
  {
    id: 'reading',
    label: 'Reading',
    sub: 'Coming soon',
    icon: '📖',
    active: false,
  },
  {
    id: 'listening',
    label: 'Listening',
    sub: 'Coming soon',
    icon: '🎧',
    active: false,
  },
  {
    id: 'writing',
    label: 'Writing',
    sub: 'Coming soon',
    icon: '✍️',
    active: false,
  },
  {
    id: 'speaking',
    label: 'Speaking',
    sub: 'Talk with Camille',
    icon: '💬',
    active: true,
  },
]

export default function Landing({ onSelectSkill }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>FrenchFry</h1>
        <p style={styles.tagline}>Learn French with a companion who actually listens</p>
      </header>

      <div style={styles.grid}>
        {TILES.map(tile => (
          <button
            key={tile.id}
            onClick={() => tile.active && onSelectSkill(tile.id)}
            disabled={!tile.active}
            style={{
              ...styles.tile,
              ...(tile.active ? styles.tileActive : styles.tileDisabled),
            }}
          >
            <span style={styles.tileIcon}>{tile.icon}</span>
            <span style={styles.tileLabel}>{tile.label}</span>
            <span style={{
              ...styles.tileSub,
              color: tile.active ? 'var(--cream)' : 'var(--ink-soft)',
            }}>
              {tile.sub}
            </span>
          </button>
        ))}
      </div>

      <p style={styles.footer}>Preparing for TEF Canada? Start with Speaking — it's where the real score gains hide.</p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 24px',
    maxWidth: 720,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: 42,
    fontWeight: 600,
    color: 'var(--terracotta-deep)',
    margin: '0 0 8px',
  },
  tagline: {
    fontSize: 16,
    color: 'var(--ink-soft)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    width: '100%',
  },
  tile: {
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    padding: '36px 20px',
    minHeight: 180,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 6,
    textAlign: 'left',
    transition: 'transform 0.15s ease',
  },
  tileActive: {
    background: 'var(--terracotta)',
    color: 'var(--cream)',
    cursor: 'pointer',
  },
  tileDisabled: {
    background: 'var(--cream-deep)',
    color: 'var(--ink-soft)',
    cursor: 'not-allowed',
  },
  tileIcon: {
    fontSize: 28,
  },
  tileLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 500,
  },
  tileSub: {
    fontSize: 13,
  },
  footer: {
    marginTop: 40,
    fontSize: 13,
    color: 'var(--ink-soft)',
    textAlign: 'center',
    maxWidth: 400,
  },
}
