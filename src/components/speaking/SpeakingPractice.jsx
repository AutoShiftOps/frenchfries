import { useState, useEffect, useCallback } from 'react'
import Camille from './Camille'
import LevelSelector from './LevelSelector'
import ChapterList from './ChapterList'
import ScoreFeedback from './ScoreFeedback'
import PhonemeCorrection from './PhonemeCorrection'
import { A1_CHAPTERS } from '../../data/a1-chapters'
import { useSpeechRecorder } from '../../hooks/useSpeechRecorder'
import { loadProgress, saveAttempt } from '../../lib/supabase'

async function playCamilleAudio(text) {
  try {
    const resp = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    if (!resp.ok) return
    const blob = await resp.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.play()
  } catch {
    // Silent fail — visual state still communicates the moment
  }
}

export default function SpeakingPractice({ onBack }) {
  const [level, setLevel] = useState('A1')
  const [activeChapter, setActiveChapter] = useState(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [camilleState, setCamilleState] = useState('idle')
  const [camilleMessage, setCamilleMessage] = useState(
    "I'm Camille, your speaking companion. Let's start practising."
  )
  const [scoreResult, setScoreResult] = useState(null)
  const [correctionWord, setCorrectionWord] = useState(null)
  const [progress, setProgress] = useState(null)

  const { isRecording, isProcessing, error, startRecording, stopRecording } = useSpeechRecorder()

  useEffect(() => {
    loadProgress().then(setProgress)
  }, [])

  const currentPhrase = activeChapter?.phrases[phraseIndex]

  const handleSelectChapter = useCallback((chapter) => {
    setActiveChapter(chapter)
    setPhraseIndex(0)
    setScoreResult(null)
    setCamilleState('idle')
    setCamilleMessage(`Let's work on: ${chapter.title.toLowerCase()}.`)
  }, [])

  const handleMicPress = useCallback(async () => {
    if (isRecording) {
      setCamilleState('thinking')
      setCamilleMessage('Let me listen to that...')
      const result = await stopRecording(currentPhrase.text)
      setScoreResult(result)

      if (result?.recognized) {
        const weak = (result.words || []).filter(w => w.accuracyScore < 70)
        if (weak.length === 0) {
          setCamilleState('celebrating')
          setCamilleMessage('Excellent! That was clear and natural.')
        } else {
          setCamilleState('encouraging')
          setCamilleMessage('Good try! One small correction below.')
        }

        await saveAttempt({
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
        loadProgress().then(setProgress)
      } else {
        setCamilleState('idle')
        setCamilleMessage(result?.message || "I couldn't quite hear that — let's try again.")
      }
    } else {
      setScoreResult(null)
      setCamilleState('listening')
      setCamilleMessage("I'm listening...")
      startRecording()
    }
  }, [isRecording, currentPhrase, activeChapter, startRecording, stopRecording])

  const handleHearPhrase = useCallback(() => {
    if (currentPhrase) playCamilleAudio(currentPhrase.text)
  }, [currentPhrase])

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
        <Camille state={camilleState} message={camilleMessage} />
        <div style={{ marginTop: 20 }}>
          <LevelSelector current={level} onSelect={setLevel} />
          <ChapterList
            chapters={A1_CHAPTERS}
            completedPhrases={progress?.completed_phrases}
            onSelectChapter={handleSelectChapter}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <button onClick={() => setActiveChapter(null)} style={styles.backBtn}>← Chapters</button>

      <Camille state={camilleState} message={camilleMessage} />

      <div style={styles.practiceCard}>
        <p style={styles.progressLabel}>
          Phrase {phraseIndex + 1} of {activeChapter.phrases.length}
        </p>

        <p style={styles.sayThis}>Say this phrase</p>
        <p style={styles.phrase}>{currentPhrase.text}</p>
        <p style={styles.translation}>{currentPhrase.translation}</p>

        <button onClick={handleHearPhrase} style={styles.hearBtn}>
          🔊 Hear Camille say it
        </button>

        <button
          onClick={handleMicPress}
          disabled={isProcessing}
          style={{
            ...styles.micBtn,
            ...(isRecording ? styles.micBtnActive : {}),
          }}
        >
          {isProcessing ? '...' : isRecording ? '■' : '🎙'}
        </button>

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
    maxWidth: 480,
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
    margin: '0 0 20px',
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
