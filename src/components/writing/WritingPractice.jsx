import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LevelSelector from '../speaking/LevelSelector'
import ChapterList from '../speaking/ChapterList'
import { ModuleHeader, TopProgress, Pronunciation } from '../shared/ModuleUI'
import { CHAPTERS_BY_LEVEL } from '../../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId } from '../../lib/progressPath'
import { resumeIndexForChapter } from '../../lib/continueTarget'
import { loadProgress, saveAttempt, completedForModule, canStartChapter, recordChapterStart } from '../../lib/supabase'
import SignInCard from '../auth/SignInCard'
import { scoreAnswer } from '../../lib/writingScorer'

const MODULE = 'writing'

export default function WritingPractice({ onBack, session }) {
  const [level, setLevel] = useState('A1')
  const [userPickedLevel, setUserPickedLevel] = useState(false)
  const [activeChapter, setActiveChapter] = useState(null)
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [progress, setProgress] = useState(null)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [gatedChapter, setGatedChapter] = useState(null)
  const [showNudge, setShowNudge] = useState(false)

  useEffect(() => { loadProgress(session).then(p => { setProgress(p); setProgressLoaded(true) }) }, [session])

  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const availableLevels = useMemo(() => ladder.filter(l => l.status !== 'locked').map(l => l.id), [ladder])
  useEffect(() => {
    if (!userPickedLevel && progressLoaded) setLevel(currentLevelId(ladder))
  }, [progressLoaded, ladder, userPickedLevel])

  const chapters = CHAPTERS_BY_LEVEL[level]?.[MODULE] || []
  const current = activeChapter?.phrases[index]

  const handleSelectChapter = useCallback((chapter) => {
    if (!canStartChapter(session, MODULE, chapter.id)) {
      setGatedChapter(chapter)
      return
    }
    recordChapterStart(session, MODULE, chapter.id)
    setGatedChapter(null)
    setActiveChapter(chapter)
    setIndex(resumeIndexForChapter(progress, MODULE, chapter))
    setInput('')
    setResult(null)
    setShowHint(false)
  }, [session, progress])

  const handleCheck = useCallback(async () => {
    const outcome = scoreAnswer(input, current.accepted)
    setResult(outcome)
    if (outcome.verdict === 'correct' || outcome.verdict === 'close') {
      await saveAttempt({
        session,
        module: MODULE,
        chapterId: activeChapter.id,
        phraseId: current.id,
        phraseText: current.accepted[0],
        scores: { accuracyScore: outcome.verdict === 'correct' ? 100 : 75 },
      })
      loadProgress(session).then(setProgress)
      if (!session) setShowNudge(true)
    }
  }, [input, current, activeChapter, session])

  const handleNext = useCallback(() => {
    setInput('')
    setResult(null)
    setShowHint(false)
    if (index < activeChapter.phrases.length - 1) {
      setIndex(i => i + 1)
    } else {
      setActiveChapter(null)
    }
  }, [index, activeChapter])

  if (!activeChapter) {
    return (
      <div style={styles.page}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <ModuleHeader title="Writing" subtitle="Translate the prompt into French" accent="var(--ink)" />
        <LevelSelector current={level} onSelect={(id) => { setUserPickedLevel(true); setLevel(id) }} availableLevels={availableLevels} ladder={ladder} accent="var(--ink)" />
        <ChapterList
          chapters={chapters}
          completedPhrases={completedForModule(progress, MODULE)}
          onSelectChapter={handleSelectChapter}
          accent="var(--ink)"
        />
        {gatedChapter && (
          <SignInCard variant="gate" moduleLabel="Writing" onDismiss={() => setGatedChapter(null)} />
        )}
      </div>
    )
  }

  const canRetry = result && result.verdict !== 'correct' && result.verdict !== 'close'

  return (
    <div style={styles.page}>
      <button onClick={() => setActiveChapter(null)} style={styles.backBtn}>← Chapters</button>

      <TopProgress index={index} total={activeChapter.phrases.length} accent="var(--ink)" />

      <p style={styles.eyebrow}>Write it</p>
      <p style={styles.prompt}>{current.prompt}</p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={result?.verdict === 'correct' || result?.verdict === 'close'}
        placeholder="Type your answer in French…"
        style={styles.textarea}
        rows={2}
      />

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {!result || canRetry ? (
          <>
            <button onClick={handleCheck} style={styles.checkBtn} disabled={!input.trim()}>Check</button>
            <button onClick={() => setShowHint(h => !h)} style={styles.hintBtn}>
              {showHint ? current.hint : 'Show hint'}
            </button>
          </>
        ) : (
          <button onClick={handleNext} style={styles.nextBtn}>
            {index < activeChapter.phrases.length - 1 ? 'Next prompt →' : 'Finish chapter →'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...styles.feedback,
              color: result.verdict === 'correct' ? 'var(--sage-deep)'
                : result.verdict === 'close' ? 'var(--gold)'
                : 'var(--terracotta-deep)',
            }}
          >
            {result.verdict === 'correct' && 'Correct.'}
            {result.verdict === 'close' && `Close — accepted, but check: "${current.accepted[0]}"`}
            {result.verdict === 'incorrect' && `Not quite. Expected something like: "${current.accepted[0]}"`}
            {result.verdict === 'empty' && 'Type an answer first.'}
          </motion.p>
        )}
      </AnimatePresence>

      {(result?.verdict === 'correct' || result?.verdict === 'close' || result?.verdict === 'incorrect') && (
        <Pronunciation text={current.pronunciation} accent="var(--ink)" />
      )}

      {showNudge && (
        <SignInCard variant="nudge" onDismiss={() => setShowNudge(false)} />
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
    marginBottom: 20,
    padding: 0,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: 'var(--ink-soft)',
    textTransform: 'uppercase',
    margin: '0 0 10px',
  },
  prompt: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    lineHeight: 1.35,
    color: 'var(--ink)',
    margin: '0 0 20px',
  },
  textarea: {
    width: '100%',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 16px',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    color: 'var(--ink)',
    background: 'var(--white)',
    resize: 'none',
  },
  checkBtn: {
    flex: 1,
    border: 'none',
    background: 'var(--ink)',
    color: 'var(--cream)',
    borderRadius: 999,
    padding: '14px 0',
    fontSize: 14,
    fontWeight: 600,
  },
  hintBtn: {
    flex: 1,
    border: '1px solid var(--line)',
    background: 'var(--white)',
    color: 'var(--ink-soft)',
    borderRadius: 999,
    padding: '14px 8px',
    fontSize: 13,
  },
  nextBtn: {
    width: '100%',
    border: 'none',
    background: 'var(--ink)',
    color: 'var(--cream)',
    borderRadius: 999,
    padding: '15px 0',
    fontSize: 14,
    fontWeight: 600,
  },
  feedback: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 16,
  },
}
