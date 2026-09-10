import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LevelSelector from '../speaking/LevelSelector'
import ChapterList from '../speaking/ChapterList'
import { ModuleHeader, TopProgress, Pronunciation, SubLevelBar } from '../shared/ModuleUI'
import { CHAPTERS_BY_LEVEL } from '../../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId } from '../../lib/progressPath'
import { buildSubLevelLadder, currentSubLevelIndex, annotateChaptersWithSubLevel } from '../../lib/subLevels'
import { resumeIndexForChapter } from '../../lib/continueTarget'
import { loadProgress, saveAttempt, completedForModule, canStartChapter, recordChapterStart } from '../../lib/supabase'
import SignInCard from '../auth/SignInCard'

const MODULE = 'reading'

export default function ReadingPractice({ onBack, session }) {
  const [level, setLevel] = useState('A1')
  const [userPickedLevel, setUserPickedLevel] = useState(false)
  const [activeChapter, setActiveChapter] = useState(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
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

  const chaptersByModuleForLevel = CHAPTERS_BY_LEVEL[level] || {}
  const chapters = chaptersByModuleForLevel[MODULE] || []
  const subLadder = useMemo(() => buildSubLevelLadder(progress, chaptersByModuleForLevel), [progress, level])
  const unlockedSubIndex = currentSubLevelIndex(subLadder)
  const chaptersWithLock = useMemo(
    () => annotateChaptersWithSubLevel(chapters, unlockedSubIndex),
    [chapters, unlockedSubIndex]
  )
  const current = activeChapter?.phrases[index]

  const handleSelectChapter = useCallback((chapter) => {
    if (chapter.locked) return
    if (!canStartChapter(session, MODULE, chapter.id)) {
      setGatedChapter(chapter)
      return
    }
    recordChapterStart(session, MODULE, chapter.id)
    setGatedChapter(null)
    setActiveChapter(chapter)
    setIndex(resumeIndexForChapter(progress, MODULE, chapter))
    setPicked(null)
  }, [session, progress])

  const handlePick = useCallback(async (optIndex) => {
    if (picked !== null) return
    setPicked(optIndex)
    const correct = optIndex === current.answerIndex
    await saveAttempt({
      session,
      module: MODULE,
      chapterId: activeChapter.id,
      phraseId: current.id,
      phraseText: current.text,
      scores: { accuracyScore: correct ? 100 : 40 },
    })
    loadProgress(session).then(setProgress)
    if (!session) setShowNudge(true)
  }, [picked, current, activeChapter, session])

  const handleNext = useCallback(() => {
    setPicked(null)
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
        <ModuleHeader title="Reading" subtitle="Short passages, real comprehension" accent="var(--sage-deep)" />
        <LevelSelector current={level} onSelect={(id) => { setUserPickedLevel(true); setLevel(id) }} availableLevels={availableLevels} ladder={ladder} accent="var(--sage-deep)" />
        <SubLevelBar level={level} subLadder={subLadder} accent="var(--sage-deep)" />
        <ChapterList
          chapters={chaptersWithLock}
          completedPhrases={completedForModule(progress, MODULE)}
          onSelectChapter={handleSelectChapter}
          accent="var(--sage-deep)"
        />
        {gatedChapter && (
          <SignInCard variant="gate" moduleLabel="Reading" onDismiss={() => setGatedChapter(null)} />
        )}
      </div>
    )
  }

  const isCorrect = picked !== null && picked === current.answerIndex

  return (
    <div style={styles.page}>
      <button onClick={() => setActiveChapter(null)} style={styles.backBtn}>← Chapters</button>

      <TopProgress index={index} total={activeChapter.phrases.length} accent="var(--sage-deep)" />

      <p style={styles.eyebrow}>Passage</p>
      <p style={styles.passage}>{current.text}</p>
      <p style={styles.translation}>{current.translation}</p>
      <Pronunciation text={current.pronunciation} accent="var(--sage-deep)" />

      <div style={{ height: 1, background: 'var(--line)', margin: '28px 0 20px' }} />

      <p style={styles.eyebrow}>{current.question}</p>
      <div style={styles.options}>
        {current.options.map((opt, i) => {
          const isPicked = picked === i
          const showCorrect = picked !== null && i === current.answerIndex
          return (
            <motion.button
              key={i}
              onClick={() => handlePick(i)}
              disabled={picked !== null}
              whileTap={picked === null ? { scale: 0.98 } : {}}
              style={{
                ...styles.option,
                ...(showCorrect ? styles.optionCorrect : {}),
                ...(isPicked && !showCorrect ? styles.optionWrong : {}),
              }}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 20 }}
          >
            <p style={{ ...styles.feedback, color: isCorrect ? 'var(--sage-deep)' : 'var(--terracotta-deep)' }}>
              {isCorrect ? 'Correct.' : `Not quite — the answer is "${current.options[current.answerIndex]}".`}
            </p>
            <button onClick={handleNext} style={styles.nextBtn}>
              {index < activeChapter.phrases.length - 1 ? 'Next passage →' : 'Finish chapter →'}
            </button>
            {showNudge && (
              <SignInCard variant="nudge" onDismiss={() => setShowNudge(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 640,
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
  passage: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    lineHeight: 1.35,
    color: 'var(--ink)',
    margin: 0,
  },
  translation: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    marginTop: 10,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  option: {
    textAlign: 'left',
    padding: '14px 16px',
    border: '1px solid var(--line)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 14,
    color: 'var(--ink)',
  },
  optionCorrect: {
    borderColor: 'var(--sage-deep)',
    background: 'color-mix(in srgb, var(--sage) 12%, var(--white))',
  },
  optionWrong: {
    borderColor: 'var(--terracotta-deep)',
    background: 'color-mix(in srgb, var(--terracotta) 10%, var(--white))',
  },
  feedback: {
    fontSize: 14,
    fontWeight: 500,
    margin: '0 0 14px',
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
}
