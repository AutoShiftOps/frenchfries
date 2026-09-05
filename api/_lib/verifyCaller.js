import { verifyToken } from '@clerk/backend'

// Filename starts with `_` so Vercel treats this as a shared module, not
// its own route (its documented convention for excluding files from
// becoming API endpoints).

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:5173']

function allowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
  return [...DEFAULT_ALLOWED_ORIGINS, ...fromEnv]
}

/**
 * Two-tier check for the Azure-proxy endpoints (tts.js, pronunciation-
 * assess.js), which intentionally serve both signed-in and anonymous
 * learners (the anonymous "glimpse" — one free chapter per module):
 *
 *  - A Bearer token present → verify it's a real Clerk session token
 *    (cryptographic signature check against Clerk's public keys, via
 *    CLERK_SECRET_KEY). This is REAL protection — it can't be produced by
 *    copying a header value, only by actually holding a live Clerk session.
 *  - No token (anonymous glimpse) → require Origin/Referer to match this
 *    app's own domain(s). Be honest about what this is: NOT strong
 *    protection. Any header can be spoofed by a determined caller with
 *    curl or a script. It only filters out the most naive direct-hit
 *    scraping of the URL. Real anonymous-abuse protection would need
 *    IP-based rate limiting (a separate, bigger addition — e.g. Vercel
 *    Firewall rules or a Redis-backed limiter — not done here).
 *
 * Returns { ok: true, userId: string|null, originHeader } or
 * { ok: false, status, error }.
 */
export async function verifyCaller({ authHeader, originHeader, refererHeader }) {
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length)
    try {
      const secretKey = process.env.CLERK_SECRET_KEY
      if (!secretKey) throw new Error('CLERK_SECRET_KEY not configured')
      const payload = await verifyToken(token, { secretKey })
      return { ok: true, userId: payload.sub, originHeader }
    } catch {
      return { ok: false, status: 401, error: 'Invalid or expired session token' }
    }
  }

  const origin = originHeader || refererHeader
  if (!origin) {
    return { ok: false, status: 403, error: 'Missing Origin — direct API access is not supported' }
  }
  const allowed = allowedOrigins().some(o => origin.startsWith(o))
  if (!allowed) {
    return { ok: false, status: 403, error: 'Origin not allowed' }
  }
  return { ok: true, userId: null, originHeader: origin }
}
