import { createClient } from '@supabase/supabase-js'

// Filename starts with `_` — a shared module, not its own route (see
// verifyCaller.js for the same convention).
//
// IP-based rate limiting for anonymous "glimpse" callers of the Azure
// proxy endpoints. Signed-in callers (verifyCaller returned a userId) are
// never subject to this — a real Clerk session is already strong
// per-user identity; this exists purely to stop naive scraping/abuse of
// the anonymous, unauthenticated path where Origin/Referer is the only
// (spoofable) check.
//
// Reuses the same Supabase project as the app's own data — via the anon
// key, through one narrow SECURITY DEFINER function
// (frenchfry_check_rate_limit, see supabase_migration_v5.sql) so this
// route can never read or touch any other table. No new env vars, no new
// service to run or pay for.

let cachedClient = null
function getClient() {
  if (cachedClient) return cachedClient
  const url = process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  cachedClient = createClient(url, anonKey)
  return cachedClient
}

/**
 * Real client IP behind Vercel's proxy. Vercel documents x-forwarded-for
 * as a comma-separated list with the actual client IP first (values
 * after it are proxies Vercel itself saw the request through) — so this
 * is not client-spoofable the way a bare header the client sets herself
 * would be, since Vercel's edge sets/prepends this value itself.
 */
export function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

/**
 * @param {string} ip
 * @param {{windowMinutes: number, limit: number}} opts
 * @returns {Promise<{ok: true} | {ok: false, status: 429, error: string}>}
 *
 * Fails OPEN (returns ok:true) if the DB call itself errors — a rate
 * limiter that goes down should not take the whole anonymous glimpse
 * feature down with it. It only fails CLOSED (blocks) on an actual over-
 * limit count.
 */
export async function checkRateLimit(ip, { windowMinutes, limit }) {
  const client = getClient()
  if (!client) return { ok: true } // not configured — don't block on it

  try {
    const { data, error } = await client.rpc('frenchfry_check_rate_limit', {
      p_ip: ip,
      p_window_minutes: windowMinutes,
      p_limit: limit,
    })
    if (error) {
      console.error('[rateLimit] rpc error, failing open:', error.message)
      return { ok: true }
    }
    if (typeof data === 'number' && data > limit) {
      return { ok: false, status: 429, error: 'Too many requests — please slow down and try again shortly.' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[rateLimit] unexpected error, failing open:', err.message)
    return { ok: true }
  }
}
