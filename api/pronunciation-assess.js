/**
 * /api/pronunciation-assess — Vercel serverless proxy for Azure
 * Pronunciation Assessment (Speech-to-Text with scoring enabled).
 *
 * Keeps AZURE_SPEECH_KEY server-side only.
 *
 * Body:    raw WAV audio (PCM 16-bit / 16 kHz / mono) + X-Reference-Text header
 * Returns: { accuracyScore, fluencyScore, prosodyScore, pronScore,
 *            words: [{ word, accuracyScore, errorType, phonemes: [...] }] }
 *
 * Free tier (F0): 5 audio hours/month at no cost.
 * Note: Node runtime (not edge) — needed for binary audio body handling.
 */

export const config = { runtime: 'nodejs' }

import { verifyCaller } from './_lib/verifyCaller.js'
import { checkRateLimit, clientIp } from './_lib/rateLimit.js'

// Anonymous "glimpse" callers only (verified Clerk sessions are exempt —
// see rateLimit.js). Tighter than tts.js's limit since this hits Azure's
// smaller free quota (5 audio hours/month vs. 500k characters/month).
const ANON_RATE_LIMIT = { windowMinutes: 15, limit: 20 }

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Reference-Text, Authorization')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const check = await verifyCaller({
    authHeader: req.headers['authorization'],
    originHeader: req.headers['origin'],
    refererHeader: req.headers['referer'],
  })
  if (!check.ok) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(check.status).json({ error: check.error })
  }

  if (!check.userId) {
    const rl = await checkRateLimit(clientIp(req), ANON_RATE_LIMIT)
    if (!rl.ok) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(rl.status).json({ error: rl.error })
    }
  }

  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION
  if (!key || !region) {
    return res.status(500).json({ error: 'AZURE_SPEECH_KEY or AZURE_SPEECH_REGION not configured' })
  }

  const rawRef = req.headers['x-reference-text']
  if (!rawRef) {
    return res.status(400).json({ error: 'X-Reference-Text header is required — the phrase the user was asked to say' })
  }
  // Client sends it percent-encoded so accented French survives the header.
  let referenceText
  try {
    referenceText = decodeURIComponent(rawRef)
  } catch {
    referenceText = rawRef
  }

  // Collect the raw audio body — WAV/PCM/16kHz/mono from the browser.
  // Some runtimes (e.g. `vercel dev`) buffer the body onto req.body before
  // the handler runs, leaving the stream already consumed; fall back to it.
  let audioBuffer
  if (req.body && (Buffer.isBuffer(req.body) || req.body instanceof Uint8Array)) {
    audioBuffer = Buffer.from(req.body)
  } else if (typeof req.body === 'string') {
    audioBuffer = Buffer.from(req.body, 'binary')
  } else {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    audioBuffer = Buffer.concat(chunks)
  }

  if (!audioBuffer || audioBuffer.length === 0) {
    return res.status(400).json({ error: 'No audio data received' })
  }

  // Pronunciation assessment config — base64-encoded JSON in a header,
  // per Azure's documented approach for the REST STT endpoint.
  const pronAssessmentConfig = Buffer.from(JSON.stringify({
    ReferenceText: referenceText,
    GradingSystem: 'HundredMark',
    Granularity: 'Phoneme',
    Dimension: 'Comprehensive',
    EnableMiscue: true,
    EnableProsodyAssessment: 'True',
  })).toString('base64')

  try {
    const azureUrl =
      `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1` +
      `?language=fr-FR&format=detailed`

    const azureResp = await fetch(azureUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Accept': 'application/json',
        'Pronunciation-Assessment': pronAssessmentConfig,
      },
      body: audioBuffer,
    })

    if (!azureResp.ok) {
      const errText = await azureResp.text()
      console.error('[pronunciation-assess] Azure error', azureResp.status, errText)
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(azureResp.status).json({
        error: `Azure Speech error ${azureResp.status}`,
        detail: errText || azureResp.statusText,
        azureRequestId: azureResp.headers.get('apim-request-id') || azureResp.headers.get('x-requestid') || null,
      })
    }

    const data = await azureResp.json()

    // Azure returns NBest[0] with PronunciationAssessment details when
    // format=detailed and the Pronunciation-Assessment header is set.
    const best = data?.NBest?.[0]
    if (!best) {
      console.warn('[pronunciation-assess] no NBest', JSON.stringify(data))
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(200).json({
        recognized: false,
        recognitionStatus: data?.RecognitionStatus || 'Unknown',
        message: 'Could not recognize speech. Try speaking closer to the microphone.',
      })
    }

    // The REST endpoint puts scores directly on NBest[0] and on each word/
    // phoneme (not nested under a "PronunciationAssessment" object the way
    // the Speech SDK's result shape does) — read both shapes defensively.
    const assessment = {
      AccuracyScore: best.PronunciationAssessment?.AccuracyScore ?? best.AccuracyScore ?? null,
      FluencyScore: best.PronunciationAssessment?.FluencyScore ?? best.FluencyScore ?? null,
      ProsodyScore: best.PronunciationAssessment?.ProsodyScore ?? best.ProsodyScore ?? null,
      PronScore: best.PronunciationAssessment?.PronScore ?? best.PronScore ?? null,
      CompletenessScore: best.PronunciationAssessment?.CompletenessScore ?? best.CompletenessScore ?? null,
    }
    if (assessment.AccuracyScore == null) {
      console.warn('[pronunciation-assess] recognized but no assessment scores', JSON.stringify(best))
    }
    const words = (best.Words || []).map(w => ({
      word: w.Word,
      accuracyScore: w.PronunciationAssessment?.AccuracyScore ?? w.AccuracyScore ?? null,
      errorType: w.PronunciationAssessment?.ErrorType ?? w.ErrorType ?? 'None',
      phonemes: (w.Phonemes || []).map(p => ({
        phoneme: p.Phoneme,
        accuracyScore: p.PronunciationAssessment?.AccuracyScore ?? p.AccuracyScore ?? null,
      })),
    }))

    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json({
      recognized: true,
      recognizedText: best.Display || best.Lexical,
      accuracyScore: assessment.AccuracyScore ?? null,
      fluencyScore: assessment.FluencyScore ?? null,
      prosodyScore: assessment.ProsodyScore ?? null,
      pronScore: assessment.PronScore ?? null,
      completenessScore: assessment.CompletenessScore ?? null,
      words,
    })
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(500).json({ error: `Proxy error: ${err.message}` })
  }
}
