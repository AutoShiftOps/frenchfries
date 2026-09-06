import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LevelSelector from '../speaking/LevelSelector'
import { ModuleHeader, TopProgress, Pronunciation } from '../shared/ModuleUI'
import { EXAMS_BY_LEVEL } from '../../data/examsByLevel'
import { CHAPTERS_BY_LEVEL } from '../../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId } from '../../lib/progressPath'
import { scoreExamAttempt, examVerdict } from '../../lib/examScorer'
import { loadProgress, loadExamResults, saveExamResult, canStartChapter, recordChapterStart } from '../../lib/supabase'
import { playCamilleAudio } from '../../lib/ttsPlayback'
import SignInCard from '../auth/SignInCard'

const MODULE = 'exams'
const ACCENT = 'var(--terracotta-deep)'

const VERDICT_COPY = {
  excellent: { emoji: '🌟', message: 'Excellent work — that\'s a strong result.' },
  pass: { emoji: '✅', message: 'Solid pass. A little more practice and this level is yours.' },
  'keep-practicing': { emoji: '💪', message: 'Good attempt — review this set\'s topics and try again.' },
}

// A peer of Path/Board/You — reached via BottomNav's "Exams" tab, not a
// full-screen module launched from the path (so no top-level "back" out
// of the tab itself; the internal exit buttons below only step back
// within the exam flow, from a question or result screen to the set list).
export default function ExamPractice({ session }) {
  const [level, setLevel] = useState('A1')
  const [userPickedLevel, setUserPickedLevel] = useState(false)
  const [progress, setProgress] = useState(null)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [examResults, setExamResults] = useState({})
  const [activeSet, setActiveSet] = useState(null)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [picked, setPicked] = useState(null) // selected MCQ option this question
  const [writingInput, setWritingInput] = useState('')
  const [finalResult, setFinalResult] = useState(null) // set once the exam is submitted
  const [gatedSet, setGatedSet] = useState(null)
  const [showNudge, setShowNudge] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    loadProgress(session).then(p => { setProgress(p); setProgressLoaded(true) })
    loadExamResults(session).then(setExamResults)
  }, [session])

  // Same ladder gating as the four practice modules, for a consistent
  // "you can only reach what you've unlocked" experience — exams aren't
  // in CHAPTERS_BY_LEVEL themselves, but they reuse its unlock state.
  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const availableLevels = useMemo(() => ladder.filter(l => l.status !== 'locked').map(l => l.id), [ladder])
  useEffect(() => {
    if (!userPickedLevel && progressLoaded) setLevel(currentLevelId(ladder))
  }, [progressLoaded, ladder, userPickedLevel])

  const sets = EXAMS_BY_LEVEL[level] || []
  const question = activeSet?.questions[qIndex]

  const handleSelectSet = useCallback((set) => {
    if (!canStartChapter(session, MODULE, set.id)) {
      setGatedSet(set)
      return
    }
    recordChapterStart(session, MODULE, set.id)
    setGatedSet(null)
    setActiveSet(set)
    setQIndex(0)
    setAnswers({})
    setPicked(null)
    setWritingInput('')
    setFinalResult(null)
  }, [session])

  const handlePickOption = useCallback((optIndex) => {
    if (picked !== null) return
    setPicked(optIndex)
    setAnswers(a => ({ ...a, [question.id]: optIndex }))
  }, [picked, question])

  const goToNext = useCallback(() => {
    if (qIndex < activeSet.questions.length - 1) {
      setQIndex(i => i + 1)
      setPicked(null)
      setWritingInput('')
    } else {
      // Last question — score and persist.
      const finalAnswers = question.type === 'writing'
        ? { ...answers, [question.id]: writingInput }
        : answers
      const result = scoreExamAttempt(activeSet, finalAnswers)
      setFinalResult(result)
      saveExamResult(session, activeSet.id, result.scorePct)
      loadExamResults(session).then(setExamResults)
      if (!session) setShowNudge(true)
    }
  }, [qIndex, activeSet, question, answers, writingInput, session])

  const handleWritingSubmit = useCallback(() => {
    setAnswers(a => ({ ...a, [question.id]: writingInput }))
    goToNext()
  }, [question, writingInput, goToNext])

  const handleHear = useCallback(async () => {
    if (!question || isSpeaking) return
    const token = await session?.getToken?.()
    setIsSpeaking(true)
    playCamilleAudio(question.text, { onDone: () => setIsSpeaking(false), token })
  }, [question, isSpeaking, session])

  const exitExam = useCallback(() => {
    setActiveSet(null)
    setFinalResult(null)
  }, [])

  // ── Results screen ────────────────────────────────────────────────
  if (activeSet && finalResult) {
    const verdict = examVerdict(finalResult.scorePct)
    const copy = VERDICT_COPY[verdict]
    return (
      <div style={styles.page}>
        <button onClick={exitExam} style={styles.backBtn}>← Back to sets</button>
        <div style={styles.resultCard}>
          <p style={styles.resultEmoji}>{copy.emoji}</p>
          <p style={styles.resultScore}>{finalResult.scorePct}%</p>
          <p style={styles.resultDetail}>{finalResult.correctCount} of {finalResult.totalCount} correct</p>
          <p style={styles.resultMessage}>{copy.message}</p>
          <button onClick={exitExam} style={styles.primaryBtn}>Back to {level} exams</button>
        </div>
        {showNudge && <SignInCard variant="nudge" onDismiss={() => setShowNudge(false)} />}
      </div>
    )
  }

  // ── Active question screen ────────────────────────────────────────
  if (activeSet && question) {
    const isMcq = question.type === 'reading' || question.type === 'listening'
    return (
      <div style={styles.page}>
        <button onClick={exitExam} style={styles.backBtn}>← Exit exam</button>
        <ModuleHeader title={`${activeSet.title} · ${activeSet.difficulty}`} subtitle={`Question ${qIndex + 1} of ${activeSet.questions.length}`} accent={ACCENT} />
        <TopProgress index={qIndex} total={activeSet.questions.length} accent={ACCENT} />

        <div style={styles.card}>
          {question.type === 'reading' && (
            <>
              <p style={styles.eyebrowSmall}>Read this</p>
              <p style={styles.passage}>{question.text}</p>
              <p style={styles.translation}>{question.translation}</p>
            </>
          )}

          {question.type === 'listening' && (
            <>
              <p style={styles.eyebrowSmall}>Listen</p>
              <button onClick={handleHear} style={styles.hearBtn} disabled={isSpeaking}>
                {isSpeaking ? '🔊 Playing…' : '🔊 Hear the sentence'}
              </button>
            </>
          )}

          {isMcq && (
            <>
              <p style={styles.question}>{question.question}</p>
              <div style={styles.options}>
                {question.options.map((opt, i) => {
                  const isPicked = picked === i
                  const isCorrect = i === question.answerIndex
                  const showState = picked !== null
                  return (
                    <button
                      key={i}
                      onClick={() => handlePickOption(i)}
                      disabled={picked !== null}
                      style={{
                        ...styles.option,
                        ...(showState && isCorrect ? styles.optionCorrect : {}),
                        ...(showState && isPicked && !isCorrect ? styles.optionWrong : {}),
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              <Pronunciation text={question.pronunciation} accent={ACCENT} />
              {picked !== null && (
                <button onClick={goToNext} style={styles.primaryBtn}>
                  {qIndex < activeSet.questions.length - 1 ? 'Next question →' : 'See my score →'}
                </button>
              )}
            </>
          )}

          {question.type === 'writing' && (
            <>
              <p style={styles.question}>{question.prompt}</p>
              <input
                type="text"
                value={writingInput}
                onChange={e => setWritingInput(e.target.value)}
                placeholder="Type your answer in French…"
                style={styles.input}
              />
              <Pronunciation text={question.pronunciation} accent={ACCENT} />
              <button onClick={handleWritingSubmit} disabled={!writingInput.trim()} style={styles.primaryBtn}>
                {qIndex < activeSet.questions.length - 1 ? 'Next question →' : 'See my score →'}
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── Set list screen ───────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <ModuleHeader title="Practice exams" subtitle="Six mixed sets per level — reading, listening, and writing together, at rising difficulty." accent={ACCENT} />
      <LevelSelector current={level} onSelect={(id) => { setUserPickedLevel(true); setLevel(id) }} availableLevels={availableLevels} ladder={ladder} accent={ACCENT} />

      <div style={styles.setList}>
        {sets.map((set, i) => {
          const best = examResults[set.id]
          return (
            <motion.button
              key={set.id}
              onClick={() => handleSelectSet(set)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              style={styles.setItem}
            >
              <span style={styles.setIndex}>{String(i + 1).padStart(2, '0')}</span>
              <div style={styles.setText}>
                <span style={styles.setTitle}>{set.title}</span>
                <span style={styles.setDesc}>{set.difficulty} · {set.questions.length} questions</span>
              </div>
              <span style={styles.setScore}>{best != null ? `${best}%` : '—'}</span>
            </motion.button>
          )
        })}
      </div>

      {gatedSet && (
        <SignInCard variant="gate" moduleLabel="Practice exams" onDismiss={() => setGatedSet(null)} />
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '24px 20px 60px',
  },
  backBtn: {
    border: 'none',
    background: 'none',
    color: 'var(--ink-soft)',
    fontSize: 14,
    marginBottom: 16,
    padding: 0,
  },
  setList: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid var(--line)',
  },
  setItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    border: 'none',
    borderBottom: '1px solid var(--line)',
    background: 'transparent',
    padding: '16px 4px',
    textAlign: 'left',
  },
  setIndex: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: ACCENT,
    flexShrink: 0,
    width: 20,
  },
  setText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flex: 1,
    minWidth: 0,
  },
  setTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 500,
    color: 'var(--ink)',
  },
  setDesc: {
    fontSize: 12,
    color: 'var(--ink-soft)',
  },
  setScore: {
    fontSize: 13,
    fontWeight: 700,
    color: ACCENT,
    flexShrink: 0,
  },
  card: {
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
  },
  eyebrowSmall: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--ink-soft)',
    margin: '0 0 8px',
  },
  passage: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    color: 'var(--ink)',
    margin: '0 0 6px',
    lineHeight: 1.5,
  },
  translation: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    margin: '0 0 16px',
  },
  hearBtn: {
    border: '1px solid var(--line)',
    background: 'var(--cream)',
    color: 'var(--ink)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 18px',
    fontSize: 14,
    marginBottom: 20,
  },
  question: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--ink)',
    margin: '0 0 12px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 8,
  },
  option: {
    textAlign: 'left',
    border: '1px solid var(--line)',
    background: 'var(--white)',
    color: 'var(--ink)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 14,
  },
  optionCorrect: {
    borderColor: 'var(--sage-deep)',
    background: 'var(--sage-deep)',
    color: 'var(--cream)',
  },
  optionWrong: {
    borderColor: 'var(--terracotta-deep)',
    background: 'var(--terracotta-deep)',
    color: 'var(--cream)',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 15,
    marginBottom: 8,
  },
  primaryBtn: {
    marginTop: 16,
    border: 'none',
    background: ACCENT,
    color: 'var(--cream)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 500,
  },
  resultCard: {
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px 24px',
    textAlign: 'center',
  },
  resultEmoji: {
    fontSize: 40,
    margin: '0 0 8px',
  },
  resultScore: {
    fontFamily: 'var(--font-display)',
    fontSize: 40,
    fontWeight: 600,
    color: ACCENT,
    margin: '0 0 4px',
  },
  resultDetail: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    margin: '0 0 16px',
  },
  resultMessage: {
    fontSize: 14,
    color: 'var(--ink)',
    margin: '0 0 20px',
  },
}
