/**
 * /api/pronunciation-assess — Vercel serverless proxy for Azure
 * Pronunciation Assessment (Speech-to-Text with scoring enabled).
 *
 * Keeps AZURE_SPEECH_KEY server-side only.
 *
 * Body:    multipart audio (webm/wav) + referenceText as query param
 * Returns: { accuracyScore, fluencyScore, prosodyScore, pronScore,
 *            words: [{ word, accuracyScore, errorType, phonemes: [...] }] }
 *
 * Free tier (F0): 5 audio hours/month at no cost.
 * Note: Node runtime (not edge) — needed for binary audio body handling.
 */

export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Reference-Text')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION
  if (!key || !region) {
    return res.status(500).json({ error: 'AZURE_SPEECH_KEY or AZURE_SPEECH_REGION not configured' })
  }

  const referenceText = req.headers['x-reference-text']
  if (!referenceText) {
    return res.status(400).json({ error: 'X-Reference-Text header is required — the phrase the user was asked to say' })
  }

  // Collect the raw audio body (webm/opus from MediaRecorder in the browser)
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const audioBuffer = Buffer.concat(chunks)

  if (audioBuffer.length === 0) {
    return res.status(400).json({ error: 'No audio data received' })
  }

  // Pronunciation assessment config — base64-encoded JSON in a header,
  // per Azure's documented approach for the REST STT endpoint.
  const pronAssessmentConfig = Buffer.from(JSON.stringify({
    ReferenceText: referenceText,
    GradingSystem: 'HundredMark',
    Granularity: 'Phoneme',
    EnableMiscue: true,
  })).toString('base64')

  try {
    const azureUrl =
      `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1` +
      `?language=fr-FR&format=detailed`

    const azureResp = await fetch(azureUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/webm; codecs=opus',
        'Accept': 'application/json',
        'Pronunciation-Assessment': pronAssessmentConfig,
      },
      body: audioBuffer,
    })

    if (!azureResp.ok) {
      const errText = await azureResp.text()
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(azureResp.status).json({ error: `Azure Speech error ${azureResp.status}: ${errText}` })
    }

    const data = await azureResp.json()

    // Azure returns NBest[0] with PronunciationAssessment details when
    // format=detailed and the Pronunciation-Assessment header is set.
    const best = data?.NBest?.[0]
    if (!best) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(200).json({
        recognized: false,
        message: 'Could not recognize speech. Try speaking closer to the microphone.',
      })
    }

    const assessment = best.PronunciationAssessment || {}
    const words = (best.Words || []).map(w => ({
      word: w.Word,
      accuracyScore: w.PronunciationAssessment?.AccuracyScore ?? null,
      errorType: w.PronunciationAssessment?.ErrorType ?? 'None',
      phonemes: (w.Phonemes || []).map(p => ({
        phoneme: p.Phoneme,
        accuracyScore: p.PronunciationAssessment?.AccuracyScore ?? null,
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
