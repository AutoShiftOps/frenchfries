/**
 * Browser-side audio conversion for Azure Pronunciation Assessment.
 *
 * MediaRecorder gives us compressed audio/webm;codecs=opus. Azure's REST
 * Speech endpoint only does pronunciation scoring on uncompressed audio
 * (the compressed-audio path needs the GStreamer pipeline that's exclusive
 * to the Speech SDK). So we decode the clip with the Web Audio API and
 * re-encode it as WAV / PCM 16-bit / 16 kHz / mono — the format Azure
 * documents for the REST endpoint.
 */

const TARGET_SAMPLE_RATE = 16000

/**
 * @param {Blob} blob  audio/webm (or any format the browser can decode)
 * @returns {Promise<Blob>} audio/wav — PCM s16le, 16 kHz, mono
 */
export async function webmBlobToWav16kMono(blob) {
  const arrayBuffer = await blob.arrayBuffer()

  const DecodeCtx = window.AudioContext || window.webkitAudioContext
  const decodeCtx = new DecodeCtx()
  let decoded
  try {
    decoded = await decodeCtx.decodeAudioData(arrayBuffer.slice(0))
  } finally {
    decodeCtx.close()
  }

  // Downmix + resample offline to the exact rate Azure wants.
  const frameCount = Math.ceil(decoded.duration * TARGET_SAMPLE_RATE)
  const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext
  const offline = new OfflineCtx(1, frameCount, TARGET_SAMPLE_RATE)

  const source = offline.createBufferSource()
  source.buffer = decoded
  source.connect(offline.destination)
  source.start(0)

  const rendered = await offline.startRendering()
  return encodeWav(rendered.getChannelData(0), TARGET_SAMPLE_RATE)
}

/** Float32 [-1,1] samples -> WAV Blob (PCM s16le mono). */
function encodeWav(samples, sampleRate) {
  const bytesPerSample = 2
  const dataSize = samples.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)          // fmt chunk size
  view.setUint16(20, 1, true)           // PCM
  view.setUint16(22, 1, true)           // channels
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * bytesPerSample, true) // byte rate
  view.setUint16(32, bytesPerSample, true)              // block align
  view.setUint16(34, 16, true)          // bits per sample
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
    offset += 2
  }

  return new Blob([view], { type: 'audio/wav' })
}
