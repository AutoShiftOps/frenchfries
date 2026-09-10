import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Camille from './Camille'
import LevelSelector from './LevelSelector'
import ChapterList from './ChapterList'
import ScoreFeedback from './ScoreFeedback'
import PhonemeCorrection from './PhonemeCorrection'
import { CHAPTERS_BY_LEVEL } from '../../data/chaptersByLevel'
import { buildLevelLadder, currentLevelId } from '../../lib/progressPath'
import { buildSubLevelLadder, currentSubLevelIndex, annotateChaptersWithSubLevel } from '../../lib/subLevels'
import { SubLevelBar } from '../shared/ModuleUI'
import { resumeIndexForChapter } from '../../lib/continueTarget'
import { useSpeechRecorder } from '../../hooks/useSpeechRecorder'
import { loadProgress, saveAttempt, completedForModule, canStartChapter, recordChapterStart } from '../../lib/supabase'
import { playCamilleAudio } from '../../lib/ttsPlayback'
import SignInCard from '../auth/SignInCard'

const MODULE = 'speaking'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

/**
 * Graduated reaction instead of a binary good/bad — a real listener's
 * feedback varies with how well it actually went, and names the specific
 * word when there's one worth naming.
 */
function reactionFor(result, weakWord) {
  const score = result.accuracyScore ?? 0
  if (score >= 90) {
    return { state: 'celebrating', message: 'That was beautiful — you sound like you mean it.' }
  }
  if (score >= 75) {
    return {
      state: 'encouraging',
      message: weakWord ? `Really solid. Just tighten up "${weakWord}" and that's it.` : 'Excellent! That was clear and natural.',
    }
  }
  if (score >= 55) {
    return {
      state: 'thoughtful',
      message: weakWord ? `There's a lot right here — let's work on "${weakWord}" together.` : "Good effort — let's smooth this out together.",
    }
  }
  return { state: 'gentle', message: "Let's slow that down and try it again, together." }
}

export default function SpeakingPractice({ onBack, session }) {
  const [level, setLevel] = useState('A1')
  const [userPickedLevel, setUserPickedLevel] = useState(false)
  const [activeChapter, setActiveChapter] = useState(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [camilleState, setCamilleState] = useState('idle')
  const [camilleMessage, setCamilleMessage] = useState(
    "I'm Camille, your speaking companion. Let's start practising."
  )
  const [scoreResult, setScoreResult] = useState(null)
  const [correctionWord, setCorrectionWord] = useState(null)
  const [progress, setProgress] = useState(null)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [avatarLevel, setAvatarLevel] = useState(0)
  const [gatedChapter, setGatedChapter] = useState(null)
  const [showNudge, setShowNudge] = useState(false)

  const { isRecording, isProcessing, error, level: micLevel, startRecording, stopRecording } = useSpeechRecorder()

  useEffect(() => {
    loadProgress(session).then(p => { setProgress(p); setProgressLoaded(true) })
  }, [session])

  // Which CEFR levels this learner can actually open right now, derived
  // from the same ladder logic the path screen uses — and default the
  // tab to wherever they currently stand, once, unless they've since
  // picked a level themselves.
  const ladder = useMemo(() => buildLevelLadder(progress, CHAPTERS_BY_LEVEL), [progress])
  const availableLevels = useMemo(() => ladder.filter(l => l.status !== 'locked').map(l => l.id), [ladder])
  useEffect(() => {
    if (!userPickedLevel && progressLoaded) setLevel(currentLevelId(ladder))
  }, [progressLoaded, ladder, userPickedLevel])

  const chaptersByModuleForLevel = CHAPTERS_BY_LEVEL[level] || {}
  const chapters = chaptersByModuleForLevel[MODULE] || []
  // Finer-grained gating inside an unlocked CEFR level — same "finish
  // everything before moving on" philosophy as the level ladder above,
  // one tier down (see lib/subLevels.js).
  const subLadder = useMemo(() => buildSubLevelLadder(progress, chaptersByModuleForLevel), [progress, level])
  const unlockedSubIndex = currentSubLevelIndex(subLadder)
  const chaptersWithLock = useMemo(
    () => annotateChaptersWithSubLevel(chapters, unlockedSubIndex),
    [chapters, unlockedSubIndex]
  )
  const currentPhrase = activeChapter?.phrases[phraseIndex]

  const handleSelectChapter = useCallback((chapter) => {
    if (chapter.locked) return
    if (!canStartChapter(session, MODULE, chapter.id)) {
      setGatedChapter(chapter)
      return
    }
    recordChapterStart(session, MODULE, chapter.id)
    setGatedChapter(null)
    setActiveChapter(chapter)
    setPhraseIndex(resumeIndexForChapter(progress, MODULE, chapter))
    setScoreResult(null)
    setCamilleState('idle')
    setCamilleMessage(`Let's work on: ${chapter.title.toLowerCase()}.`)
  }, [session, progress])

  const handleMicPress = useCallback(async () => {
    if (isRecording) {
      // Beat 1: she's genuinely working on it — no result shown yet, and
      // this holds for a real moment even if the API comes back instantly.
      setCamilleState('thinking')
      setCamilleMessage('Mmm — let me really listen to that...')
      setScoreResult(null)
      const started = Date.now()
      const token = await session?.getToken?.()
      const result = await stopRecording(currentPhrase.text, token)
      const minThinkMs = 1000
      const elapsed = Date.now() - started
      if (elapsed < minThinkMs) await sleep(minThinkMs - elapsed)

      if (result?.recognized) {
        // Beat 2: prove she actually heard *you*, specifically — a real
        // listener confirms what they caught before reacting to it.
        setCamilleMessage(`I heard: "${result.recognizedText}"`)
        const readWords = result.recognizedText.split(' ').length
        await sleep(readWords * 90 + 550)

        // Beat 3: an honest, graded reaction — not a binary pass/fail.
        const weak = (result.words || []).filter(w => w.accuracyScore !== null && w.accuracyScore < 70)
        const reaction = reactionFor(result, weak[0]?.word)
        setCamilleState(reaction.state)
        setCamilleMessage(reaction.message)
        setScoreResult(result)

        await saveAttempt({
          session,
          module: MODULE,
          chapterId: activeChapter.id,
          phraseId: currentPhrase.id,
          phraseText: currentPhrase.text,
          scores: result,
          mistakes: weak.map(w => ({
            word: w.word,
            phoneme: currentPhrase.focus,
            score: w.accuracyScore,
          })),
        })
        loadProgress(session).then(setProgress)
        if (!session) setShowNudge(true)
      } else {
        setCamilleState('gentle')
        setCamilleMessage(result?.message || "I couldn't quite hear that — let's try again.")
        setScoreResult(result)
      }
    } else {
      setScoreResult(null)
      setCamilleState('listening')
      setCamilleMessage("I'm listening...")
      startRecording()
    }
  }, [isRecording, currentPhrase, activeChapter, startRecording, stopRecording, session])

  const handleHearPhrase = useCallback(async () => {
    if (!currentPhrase) return
    const restoreState = camilleState
    const restoreMessage = camilleMessage
    const token = await session?.getToken?.()
    playCamilleAudio(currentPhrase.text, {
      onStart: () => setCamilleState('speaking'),
      onLevel: setAvatarLevel,
      onDone: () => {
        setAvatarLevel(0)
        setCamilleState(restoreState)
        setCamilleMessage(restoreMessage)
      },
      token,
    })
  }, [currentPhrase, camilleState, camilleMessage, session])

  const handleNextPhrase = useCallback(() => {
    setScoreResult(null)
    setCamilleState('idle')
    if (phraseIndex < activeChapter.phrases.length - 1) {
      setPhraseIndex(i => i + 1)
      setCamilleMessage('Ready for the next one?')
    } else {
      setCamilleMessage("You've finished this chapter. Well done!")
    }
  }, [phraseIndex, activeChapter])

  if (!activeChapter) {
    return (
      <div style={styles.page}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <Camille
          state={camilleState}
          message={camilleMessage}
          level={camilleState === 'listening' ? micLevel : camilleState === 'speaking' ? avatarLevel : 0}
        />
        <div style={{ marginTop: 20 }}>
          <LevelSelector current={level} onSelect={(id) => { setUserPickedLevel(true); setLevel(id) }} availableLevels={availableLevels} ladder={ladder} />
          <SubLevelBar level={level} subLadder={subLadder} accent="var(--terracotta-deep)" />
          <ChapterList
            chapters={chaptersWithLock}
            completedPhrases={completedForModule(progress, MODULE)}
            onSelectChapter={handleSelectChapter}
          />
          {gatedChapter && (
            <SignInCard variant="gate" moduleLabel="Speaking" onDismiss={() => setGatedChapter(null)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <button onClick={() => setActiveChapter(null)} style={styles.backBtn}>← Chapters</button>

      <Camille
        state={camilleState}
        message={camilleMessage}
        level={camilleState === 'listening' ? micLevel : camilleState === 'speaking' ? avatarLevel : 0}
      />

      <div style={styles.practiceCard}>
        <p style={styles.progressLabel}>
          Phrase {phraseIndex + 1} of {activeChapter.phrases.length}
        </p>

        <p style={styles.sayThis}>Say this phrase</p>
        <p style={styles.phrase}>{currentPhrase.text}</p>
        <p style={styles.translation}>{currentPhrase.translation}</p>
        {currentPhrase.pronunciation && (
          <p style={styles.pronunciation}>
            <span style={styles.pronunciationLabel}>Say it like</span>
            {currentPhrase.pronunciation}
          </p>
        )}

        <motion.button
          onClick={handleHearPhrase}
          style={styles.hearBtn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          🔊 Hear Camille say it
        </motion.button>

        <motion.button
          onClick={handleMicPress}
          disabled={isProcessing}
          style={{
            ...styles.micBtn,
            ...(isRecording ? styles.micBtnActive : {}),
          }}
          animate={isRecording ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={isRecording ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : { type: 'spring', stiffness: 260, damping: 16 }}
          whileHover={{ scale: isRecording ? undefined : 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          {isProcessing ? '...' : isRecording ? '■' : '🎙'}
        </motion.button>

        {error && <p style={styles.errorText}>{error}</p>}

        <ScoreFeedback
          result={scoreResult}
          onShowCorrection={(word) => setCorrectionWord(activeChapter.focus ? activeChapter : { focus: currentPhrase.focus })}
        />

        {scoreResult?.recognized && (
          <button onClick={handleNextPhrase} style={styles.nextBtn}>
            Next phrase →
          </button>
        )}

        {showNudge && (
          <SignInCard variant="nudge" onDismiss={() => setShowNudge(false)} />
        )}
      </div>

      {correctionWord && (
        <PhonemeCorrection
          phoneme={currentPhrase.focus}
          onClose={() => setCorrectionWord(null)}
        />
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '24px 20px 60px',
    position: 'relative',
  },
  backBtn: {
    border: 'none',
    background: 'none',
    color: 'var(--ink-soft)',
    fontSize: 14,
    marginBottom: 16,
    padding: 0,
  },
  practiceCard: {
    marginTop: 20,
    background: 'var(--white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    textAlign: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: 'var(--ink-soft)',
    margin: '0 0 16px',
  },
  sayThis: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    margin: '0 0 8px',
  },
  phrase: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    color: 'var(--ink)',
    margin: '0 0 6px',
  },
  translation: {
    fontSize: 13,
    color: 'var(--ink-soft)',
    margin: '0 0 8px',
  },
  pronunciation: {
    fontSize: 12.5,
    color: 'var(--ink-soft)',
    fontStyle: 'italic',
    margin: '0 0 20px',
    lineHeight: 1.5,
  },
  pronunciationLabel: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 10,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--terracotta-deep)',
    marginRight: 6,
  },
  hearBtn: {
    border: '1px solid var(--line)',
    background: 'var(--cream)',
    color: 'var(--ink)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 16px',
    fontSize: 13,
    marginBottom: 20,
  },
  micBtn: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    border: 'none',
    background: 'var(--terracotta)',
    color: 'var(--cream)',
    fontSize: 24,
    display: 'block',
    margin: '0 auto',
  },
  micBtnActive: {
    background: 'var(--terracotta-deep)',
  },
  errorText: {
    fontSize: 13,
    color: 'var(--terracotta-deep)',
    marginTop: 12,
  },
  nextBtn: {
    marginTop: 16,
    border: 'none',
    background: 'var(--sage-deep)',
    color: 'var(--cream)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 500,
  },
}
