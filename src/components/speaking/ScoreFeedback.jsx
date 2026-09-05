import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion'

function scoreColor(score) {
  if (score >= 80) return 'var(--sage-deep)'
  if (score >= 60) return 'var(--gold)'
  return 'var(--terracotta-deep)'
}

export default function ScoreFeedback({ result, onShowCorrection }) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      {result && !result.recognized && (
        <motion.div
          key="not-recognized"
          style={styles.box}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          <p style={styles.notRecognized}>{result.message}</p>
        </motion.div>
      )}

      {result?.recognized && (
        <Scored key={`scored-${result.recognizedText}-${result.accuracyScore}`} result={result} onShowCorrection={onShowCorrection} reduceMotion={reduceMotion} />
      )}
    </AnimatePresence>
  )
}

function Scored({ result, onShowCorrection, reduceMotion }) {
  const { accuracyScore, fluencyScore, prosodyScore, words } = result
  const weakWords = (words || []).filter(w => w.accuracyScore !== null && w.accuracyScore < 70)

  return (
    <motion.div
      style={styles.box}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <div style={styles.scoresRow}>
        <ScorePill label="Accuracy" value={accuracyScore} delay={0} reduceMotion={reduceMotion} />
        <ScorePill label="Fluency" value={fluencyScore} delay={0.08} reduceMotion={reduceMotion} />
        <ScorePill label="Prosody" value={prosodyScore} delay={0.16} reduceMotion={reduceMotion} />
      </div>

      {weakWords.length > 0 ? (
        <motion.div
          style={styles.correctionSection}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 22 }}
        >
          <p style={styles.correctionIntro}>
            One thing to fix: <strong style={styles.weakWord}>{weakWords[0].word}</strong>
          </p>
          <motion.button
            onClick={() => onShowCorrection(weakWords[0])}
            style={styles.correctionBtn}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
          >
            See mouth position →
          </motion.button>
        </motion.div>
      ) : (
        <motion.p
          style={styles.allGood}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 22 }}
        >
          Nice — every word landed clearly.
        </motion.p>
      )}
    </motion.div>
  )
}

function ScorePill({ label, value, delay, reduceMotion }) {
  const target = value ?? 0
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v))

  useEffect(() => {
    if (reduceMotion) {
      count.set(target)
      return
    }
    const controls = animate(count, target, { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, delay])

  return (
    <motion.div
      style={styles.pill}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <motion.span style={{ ...styles.pillValue, color: scoreColor(target) }}>{rounded}</motion.span>
      <span style={styles.pillLabel}>{label}</span>
    </motion.div>
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
