// Camille — the speaking companion.
// MVP: a warm illustrated circle with simple state-based expressions.
// Future iteration: swap the emoji face for an SVG face with viseme
// mouth-shapes driven by TTS phoneme timing (Azure returns word/viseme
// boundaries in the TTS response — see api/tts.js for where to extend).

const STATES = {
  idle:        { face: '😊', scale: 1,    ring: 'var(--terracotta)' },
  listening:   { face: '👂', scale: 1.06, ring: 'var(--gold)' },
  thinking:    { face: '🤔', scale: 1,    ring: 'var(--sage)' },
  encouraging: { face: '🙂', scale: 1.04, ring: 'var(--sage-deep)' },
  celebrating: { face: '🎉', scale: 1.08, ring: 'var(--terracotta-deep)' },
}

export default function Camille({ state = 'idle', message }) {
  const s = STATES[state] || STATES.idle

  return (
    <div style={styles.wrap}>
      <div
        style={{
          ...styles.avatar,
          transform: `scale(${s.scale})`,
          boxShadow: `0 0 0 4px ${s.ring}22`,
        }}
      >
        <span style={styles.face}>{s.face}</span>
      </div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    padding: '28px 20px',
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--line)',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: '50%',
    background: 'var(--terracotta)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  face: {
    fontSize: 32,
  },
  message: {
    fontSize: 15,
    color: 'var(--ink)',
    textAlign: 'center',
    margin: 0,
    maxWidth: 340,
    lineHeight: 1.5,
  },
}
