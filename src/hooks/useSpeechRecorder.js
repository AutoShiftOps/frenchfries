import { useRef, useState, useCallback } from 'react'
import { webmBlobToWav16kMono } from '../lib/audioConvert'
import { startMicLevelMeter } from '../lib/audioLevel'

/**
 * Records short audio clips from the mic and submits them to
 * /api/pronunciation-assess for Azure scoring against a reference phrase.
 *
 * Also exposes `level` — a live 0..1 mic loudness reading, sampled while
 * recording, so the UI can visibly react to the user's actual voice
 * instead of playing a generic "listening" loop.
 */
export function useSpeechRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [level, setLevel] = useState(0)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const stopMeterRef = useRef(null)

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
      stopMeterRef.current = startMicLevelMeter(stream, setLevel)
    } catch (err) {
      setError('Microphone access denied. Enable it in your browser settings to practice speaking.')
    }
  }, [])

  const stopRecording = useCallback((referenceText, token) => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current
      if (!recorder) return resolve(null)

      recorder.onstop = async () => {
        stopMeterRef.current?.()
        stopMeterRef.current = null
        setIsRecording(false)
        setIsProcessing(true)

        const webmBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        recorder.stream.getTracks().forEach(t => t.stop())

        try {
          // Azure's REST endpoint only scores uncompressed audio — convert
          // the Opus clip to WAV/PCM/16kHz/mono before uploading.
          const wavBlob = await webmBlobToWav16kMono(webmBlob)

          // Sent as octet-stream (not audio/wav) so the serverless runtime
          // reliably buffers the raw body — `vercel dev` drains the stream
          // for unrecognised content types. The API sets Azure's own type.
          const headers = {
            'Content-Type': 'application/octet-stream',
            'X-Reference-Text': encodeURIComponent(referenceText),
          }
          if (token) headers['Authorization'] = `Bearer ${token}`
          const resp = await fetch('/api/pronunciation-assess', {
            method: 'POST',
            headers,
            body: wavBlob,
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

  return { isRecording, isProcessing, error, level, startRecording, stopRecording }
}
