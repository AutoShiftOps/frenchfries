import { useRef, useState, useCallback } from 'react'

/**
 * Records short audio clips from the mic and submits them to
 * /api/pronunciation-assess for Azure scoring against a reference phrase.
 */
export function useSpeechRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
    } catch (err) {
      setError('Microphone access denied. Enable it in your browser settings to practice speaking.')
    }
  }, [])

  const stopRecording = useCallback((referenceText) => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current
      if (!recorder) return resolve(null)

      recorder.onstop = async () => {
        setIsRecording(false)
        setIsProcessing(true)

        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        recorder.stream.getTracks().forEach(t => t.stop())

        try {
          const resp = await fetch('/api/pronunciation-assess', {
            method: 'POST',
            headers: {
              'Content-Type': 'audio/webm',
              'X-Reference-Text': encodeURIComponent(referenceText),
            },
            body: audioBlob,
          })
          const data = await resp.json()
          setIsProcessing(false)
          resolve(data)
        } catch (err) {
          setError('Could not reach the pronunciation service. Try again.')
          setIsProcessing(false)
          resolve(null)
        }
      }

      recorder.stop()
    })
  }, [])

  return { isRecording, isProcessing, error, startRecording, stopRecording }
}
