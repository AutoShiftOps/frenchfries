/**
 * Real-time audio level metering — the thing that makes Camille feel like
 * she's actually listening/talking instead of just playing a canned
 * animation. Both the mic (while recording) and the TTS playback (while
 * she "speaks") get wired through here so the UI reacts to the true
 * loudness of the sound, sampled ~20x/second.
 */

function meter(audioCtx, sourceNode, onLevel) {
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 256
  sourceNode.connect(analyser)

  const data = new Uint8Array(analyser.frequencyBinCount)
  let raf
  let lastUpdate = 0

  const tick = (t) => {
    analyser.getByteTimeDomainData(data)
    let sumSquares = 0
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128
      sumSquares += v * v
    }
    const rms = Math.sqrt(sumSquares / data.length)
    if (t - lastUpdate > 50) {
      onLevel(Math.min(1, rms * 4.5))
      lastUpdate = t
    }
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  return () => cancelAnimationFrame(raf)
}

/** Meters a live mic stream. Returns a stop() that tears everything down. */
export function startMicLevelMeter(stream, onLevel) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioCtx()
  const source = ctx.createMediaStreamSource(stream)
  const stopTicking = meter(ctx, source, onLevel)
  return () => {
    stopTicking()
    source.disconnect()
    ctx.close().catch(() => {})
    onLevel(0)
  }
}

/**
 * Meters an <audio> element's own playback (e.g. Camille's TTS voice) so
 * her mouth can move in sync with her actual words. Safe to call once per
 * element — createMediaElementSource throws if reused on the same node.
 */
export function startElementLevelMeter(audioEl, onLevel) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioCtx()
  const source = ctx.createMediaElementSource(audioEl)
  source.connect(ctx.destination) // keep it audible — analysing is a tap, not a redirect
  const stopTicking = meter(ctx, source, onLevel)
  return () => {
    stopTicking()
    source.disconnect()
    ctx.close().catch(() => {})
    onLevel(0)
  }
}
