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
 */

export const config = { runtime: 'edge' }

// Denise is a warm, natural French (France) neural voice.
// For Quebec French later: fr-CA-SylvieNeural or fr-CA-JeanNeural
const DEFAULT_VOICE = 'fr-FR-DeniseNeural'

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION
  if (!key || !region) {
    return new Response(
      JSON.stringify({ error: 'AZURE_SPEECH_KEY or AZURE_SPEECH_REGION not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { text, voice } = body
  if (!text || typeof text !== 'string') {
    return new Response(JSON.stringify({ error: 'text is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
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
      return new Response(JSON.stringify({ error: `Azure TTS error ${ttsResp.status}: ${errText}` }), {
        status: ttsResp.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const audioBuffer = await ttsResp.arrayBuffer()
    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: `Proxy error: ${err.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
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
