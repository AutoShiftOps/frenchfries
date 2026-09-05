import { startElementLevelMeter } from './audioLevel'

/**
 * Plays Camille's TTS voice and drives `onLevel`/`onDone` so a listening
 * companion's mouth can move in sync with her own speech instead of
 * sitting static while audio plays somewhere invisible. Shared by the
 * Speaking and Listening modules.
 */
export async function playCamilleAudio(text, { onStart, onLevel, onDone, token } = {}) {
  try {
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const resp = await fetch('/api/tts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    })
    if (!resp.ok) return onDone?.()
    const blob = await resp.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    let stopMeter = null

    audio.onplay = () => {
      onStart?.()
      stopMeter = startElementLevelMeter(audio, l => onLevel?.(l))
    }
    const finish = () => {
      stopMeter?.()
      URL.revokeObjectURL(url)
      onDone?.()
    }
    audio.onended = finish
    audio.onerror = finish

    await audio.play()
  } catch {
    // Silent fail — visual state still communicates the moment
    onDone?.()
  }
}
