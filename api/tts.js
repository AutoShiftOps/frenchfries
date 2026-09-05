/**
 * /api/tts — Vercel serverless proxy for Azure Neural Text-to-Speech
 *
 * Keeps AZURE_SPEECH_KEY server-side only.
 * Called by the frontend to generate Camille's spoken audio.
 *
 * Body:    { text: string, voice?: string }
 * Returns: audio/mpeg binary stream
 *
 * Free tier (F0): 500,000 characters/month at no cost.
 *
 * Node runtime (not edge) — @clerk/backend's verifyToken() (used by
 * verifyCaller below) pulls in a crypto implementation that Vercel's Edge
 * bundler can't resolve ("unsupported modules: @clerk: #crypto"), so this
 * runs on Node instead, same as pronunciation-assess.js.
 */

export const config = { runtime: 'nodejs' }

import { verifyCaller } from './_lib/verifyCaller.js'
import { checkRateLimit, clientIp } from './_lib/rateLimit.js'

// Anonymous "glimpse" callers only (verified Clerk sessions are exempt —
// see rateLimit.js). Generous enough for real practice use, tight enough
// to stop scripted scraping of the free Azure TTS quota.
const ANON_RATE_LIMIT = { windowMinutes: 15, limit: 40 }

// Denise is a warm, natural French (France) neural voice.
// For Quebec French later: fr-CA-SylvieNeural or fr-CA-JeanNeural
const DEFAULT_VOICE = 'fr-FR-DeniseNeural'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
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

  // Vercel's Node runtime auto-parses a JSON content-type body onto
  // req.body already; fall back to reading the stream ourselves for any
  // runtime/config that leaves it unparsed.
  let body = req.body
  if (!body || typeof body !== 'object') {
    try {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  const { text, voice } = body || {}
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' })
  }

  const selectedVoice = voice || DEFAULT_VOICE
  const ssml = `<speak version='1.0' xml:lang='fr-FR'>
    <voice name='${selectedVoice}'>${escapeXml(text)}</voice>
  </speak>`

  try {
    const ttsResp = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-64kbitrate-mono-mp3',
        },
        body: ssml,
      }
    )

    if (!ttsResp.ok) {
      const errText = await ttsResp.text()
      res.setHeader('Access-Control-Allow-Origin', '*')
      return res.status(ttsResp.status).json({ error: `Azure TTS error ${ttsResp.status}: ${errText}` })
    }

    const audioBuffer = Buffer.from(await ttsResp.arrayBuffer())
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).send(audioBuffer)
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(500).json({ error: `Proxy error: ${err.message}` })
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
