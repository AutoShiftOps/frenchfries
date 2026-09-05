import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Camille from '../speaking/Camille'
import LevelSelector from '../speaking/LevelSelector'
import ChapterList from '../speaking/ChapterList'
import { ModuleHeader, TopProgress, Pronunciation } from '../shared/ModuleUI'
import { CHAPTERS_BY_LEVEL } from '../../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId } from '../../lib/progressPath'
import { resumeIndexForChapter } from '../../lib/continueTarget'
import { loadProgress, saveAttempt, completedForModule, canStartChapter, recordChapterStart } from '../../lib/supabase'
import { playCamilleAudio } from '../../lib/ttsPlayback'
import SignInCard from '../auth/SignInCard'

const MODULE = 'listening'

export default function ListeningPractice({ onBack, session }) {
  const [level, setLevel] = useState('A1')
  const [userPickedLevel, setUserPickedLevel] = useState(false)
  const [activeChapter, setActiveChapter] = useState(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [progress, setProgress] = useState(null)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [camilleState, setCamilleState] = useState('idle')
  const [camilleLevel, setCamilleLevel] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [gatedChapter, setGatedChapter] = useState(null)
  const [showNudge, setShowNudge] = useState(false)
  const playCountRef = useRef(0)

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
    setPicked(null)
    setHasPlayed(false)
    playCountRef.current = 0
  }, [session, progress])

  const handlePlay = useCallback(async () => {
    if (!current) return
    const token = await session?.getToken?.()
    playCamilleAudio(current.text, {
      onStart: () => setCamilleState('speaking'),
      onLevel: setCamilleLevel,
      onDone: () => {
        setCamilleLevel(0)
        setCamilleState('idle')
        setHasPlayed(true)
        playCountRef.current += 1
      },
      token,
    })
  }, [current, session])

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
    setHasPlayed(false)
    playCountRef.current = 0
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
        <ModuleHeader title="Listening" subtitle="Hear Camille, then prove you understood" accent="var(--gold)" />
        <LevelSelector current={level} onSelect={(id) => { setUserPickedLevel(true); setLevel(id) }} availableLevels={availableLevels} ladder={ladder} accent="var(--gold)" />
        <ChapterList
          chapters={chapters}
          completedPhrases={completedForModule(progress, MODULE)}
          onSelectChapter={handleSelectChapter}
          accent="var(--gold)"
        />
        {gatedChapter && (
          <SignInCard variant="gate" moduleLabel="Listening" onDismiss={() => setGatedChapter(null)} />
        )}
      </div>
    )
  }

  const isCorrect = picked !== null && picked === current.answerIndex

  return (
    <div style={styles.page}>
      <button onClick={() => setActiveChapter(null)} style={styles.backBtn}>← Chapters</button>

      <TopProgress index={index} total={activeChapter.phrases.length} accent="var(--gold)" />

      <Camille state={camilleState} message={hasPlayed ? null : 'Tap play — I\'ll say it once, then ask you about it.'} level={camilleLevel} />

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 28px' }}>
        <motion.button
          onClick={handlePlay}
          whileTap={{ scale: 0.95 }}
          style={styles.playBtn}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--cream)"><path d="M8 5v14l11-7z" /></svg>
          {playCountRef.current > 0 ? 'Play again' : 'Play'}
        </motion.button>
      </div>

      <AnimatePresence>
        {hasPlayed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
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

            {picked !== null && (
              <div style={{ marginTop: 16 }}>
                <p style={{ ...styles.feedback, color: isCorrect ? 'var(--sage-deep)' : 'var(--terracotta-deep)' }}>
                  {isCorrect ? 'Correct.' : `Not quite — it was "${current.options[current.answerIndex]}".`}
                </p>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>{current.text} — {current.translation}</p>
                <Pronunciation text={current.pronunciation} accent="var(--gold)" />
                <div style={{ marginTop: 14 }} />
                <button onClick={handleNext} style={styles.nextBtn}>
                  {index < activeChapter.phrases.length - 1 ? 'Next clip →' : 'Finish chapter →'}
                </button>
                {showNudge && (
                  <SignInCard variant="nudge" onDismiss={() => setShowNudge(false)} />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
  playBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    background: 'var(--gold)',
    color: 'var(--cream)',
    borderRadius: 999,
    padding: '13px 24px',
    fontSize: 14,
    fontWeight: 600,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: 'var(--ink-soft)',
    textTransform: 'uppercase',
    margin: '0 0 12px',
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
    margin: '0 0 6px',
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
