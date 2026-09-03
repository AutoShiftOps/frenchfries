import { PHONEME_GUIDANCE } from '../../data/a1-chapters'

// MVP: text + diagram-style guidance.
// Next iteration: replace the illustration placeholder with a short
// looping video clip per phoneme (record once, reuse for every user —
// see project notes on phoneme clip production).

export default function PhonemeCorrection({ phoneme, onClose }) {
  const guide = PHONEME_GUIDANCE[phoneme]
  if (!guide) return null

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.close} aria-label="Close">×</button>

        <span style={styles.eyebrow}>Mouth position</span>
        <h3 style={styles.label}>{guide.label}</h3>

        <div style={styles.illustration}>
          <span style={styles.illustrationEmoji}>👄</span>
        </div>

        <p style={styles.tip}>{guide.tip}</p>

        <div style={styles.exampleBox}>
          <span style={styles.exampleLabel}>Practice with</span>
          <span style={styles.exampleWords}>{guide.example}</span>
        </div>

        <button onClick={onClose} style={styles.tryAgain}>Try the phrase again</button>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(43, 36, 32, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 10,
  },
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px 24px',
    maxWidth: 360,
    width: '100%',
    position: 'relative',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 16,
    border: 'none',
    background: 'none',
    fontSize: 22,
    color: 'var(--ink-soft)',
    lineHeight: 1,
  },
  eyebrow: {
    fontSize: 11,
    color: 'var(--terracotta-deep)',
    fontWeight: 500,
  },
  label: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    margin: '6px 0 16px',
    color: 'var(--ink)',
  },
  illustration: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: 'var(--cream-deep)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 18px',
  },
  illustrationEmoji: {
    fontSize: 44,
  },
  tip: {
    fontSize: 14,
    color: 'var(--ink)',
    lineHeight: 1.6,
    margin: '0 0 18px',
  },
  exampleBox: {
    background: 'var(--cream)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  exampleLabel: {
    fontSize: 11,
    color: 'var(--ink-soft)',
  },
  exampleWords: {
    fontSize: 14,
    color: 'var(--terracotta-deep)',
    fontWeight: 500,
  },
  tryAgain: {
    width: '100%',
    padding: '12px 0',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: 'var(--terracotta)',
    color: 'var(--cream)',
    fontSize: 14,
    fontWeight: 500,
  },
}
