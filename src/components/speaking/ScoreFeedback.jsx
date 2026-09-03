function scoreColor(score) {
  if (score >= 80) return 'var(--sage-deep)'
  if (score >= 60) return 'var(--gold)'
  return 'var(--terracotta-deep)'
}

function scoreLabel(score) {
  if (score >= 80) return 'Strong'
  if (score >= 60) return 'Good progress'
  return 'Needs work'
}

export default function ScoreFeedback({ result, onShowCorrection }) {
  if (!result) return null

  if (!result.recognized) {
    return (
      <div style={styles.box}>
        <p style={styles.notRecognized}>{result.message}</p>
      </div>
    )
  }

  const { accuracyScore, fluencyScore, prosodyScore, words } = result
  const weakWords = (words || []).filter(w => w.accuracyScore !== null && w.accuracyScore < 70)

  return (
    <div style={styles.box}>
      <div style={styles.scoresRow}>
        <ScorePill label="Accuracy" value={accuracyScore} />
        <ScorePill label="Fluency" value={fluencyScore} />
        <ScorePill label="Prosody" value={prosodyScore} />
      </div>

      {weakWords.length > 0 ? (
        <div style={styles.correctionSection}>
          <p style={styles.correctionIntro}>
            One thing to fix: <strong style={styles.weakWord}>{weakWords[0].word}</strong>
          </p>
          <button
            onClick={() => onShowCorrection(weakWords[0])}
            style={styles.correctionBtn}
          >
            See mouth position →
          </button>
        </div>
      ) : (
        <p style={styles.allGood}>Nice — every word landed clearly.</p>
      )}
    </div>
  )
}

function ScorePill({ label, value }) {
  const v = value ?? 0
  return (
    <div style={styles.pill}>
      <span style={{ ...styles.pillValue, color: scoreColor(v) }}>{Math.round(v)}</span>
      <span style={styles.pillLabel}>{label}</span>
    </div>
  )
}

const styles = {
  box: {
    marginTop: 16,
    background: 'var(--cream)',
    borderRadius: 'var(--radius-md)',
    padding: 16,
  },
  scoresRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 12,
  },
  pill: {
    flex: 1,
    background: 'var(--white)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  pillValue: {
    fontSize: 20,
    fontWeight: 600,
  },
  pillLabel: {
    fontSize: 11,
    color: 'var(--ink-soft)',
  },
  correctionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  correctionIntro: {
    fontSize: 14,
    color: 'var(--ink)',
    margin: 0,
  },
  weakWord: {
    color: 'var(--terracotta-deep)',
  },
  correctionBtn: {
    alignSelf: 'flex-start',
    border: 'none',
    background: 'none',
    color: 'var(--terracotta-deep)',
    fontSize: 13,
    fontWeight: 500,
    padding: 0,
  },
  allGood: {
    fontSize: 14,
    color: 'var(--sage-deep)',
    margin: 0,
  },
  notRecognized: {
    fontSize: 14,
    color: 'var(--ink-soft)',
    margin: 0,
    textAlign: 'center',
  },
}
