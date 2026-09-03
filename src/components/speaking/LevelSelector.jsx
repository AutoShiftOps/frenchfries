const LEVELS = [
  { id: 'A1', label: 'A1', available: true },
  { id: 'A2', label: 'A2', available: false },
  { id: 'B1', label: 'B1', available: false },
  { id: 'B2', label: 'B2', available: false },
]

export default function LevelSelector({ current, onSelect }) {
  return (
    <div style={styles.row}>
      {LEVELS.map(lv => (
        <button
          key={lv.id}
          onClick={() => lv.available && onSelect(lv.id)}
          disabled={!lv.available}
          style={{
            ...styles.btn,
            ...(lv.id === current ? styles.active : {}),
            ...(!lv.available ? styles.disabled : {}),
          }}
        >
          {lv.label}
          {!lv.available && <span style={styles.soon}>soon</span>}
        </button>
      ))}
    </div>
  )
}

const styles = {
  row: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    padding: '10px 0',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--line)',
    background: 'var(--white)',
    color: 'var(--ink)',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  active: {
    background: 'var(--terracotta)',
    color: 'var(--cream)',
    borderColor: 'var(--terracotta)',
  },
  disabled: {
    color: 'var(--ink-soft)',
    cursor: 'not-allowed',
  },
  soon: {
    fontSize: 10,
    opacity: 0.7,
  },
}
