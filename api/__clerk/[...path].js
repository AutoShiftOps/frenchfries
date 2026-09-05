/**
 * Clerk Frontend API proxy — required because the production Clerk instance
 * lives on `*.vercel.app`, a domain Vercel owns rather than FrenchFry, so
 * Clerk can't hand out DNS records to verify it the normal way. Instead,
 * Clerk routes its own frontend traffic through this same-origin path
 * (`/__clerk/*`, rewritten to this function by vercel.json) and treats a
 * clean round trip through it as proof the domain is genuinely under this
 * app's control.
 *
 * Two different upstreams get proxied here, not one:
 *   - Clerk's actual API calls (sign-in, sessions, etc.) go to Clerk's
 *     Frontend API, per Clerk's documented proxy spec
 *     (https://clerk.com/docs/advanced-usage/using-proxies): forward
 *     unmodified, attach Clerk-Proxy-Url / Clerk-Secret-Key /
 *     X-Forwarded-For.
 *   - clerk-js itself is loaded via a <script> tag whose src is rewritten
 *     to this same proxy path, but the path it requests
 *     (/npm/@clerk/clerk-js@.../dist/clerk.browser.js) is jsDelivr's own
 *     npm-CDN URL convention — Clerk's Frontend API doesn't serve static
 *     files, only jsDelivr does. Clerk's docs don't spell this split out
 *     explicitly, but jsDelivr genuinely serves this exact path, and
 *     without this branch the script 404s and Clerk never loads at all.
 *
 * Edge runtime (not Node) because the request body must reach the target
 * unread and unparsed, and Vercel's Node runtime auto-parses common content
 * types before a handler ever sees them.
 */
export const config = { runtime: 'edge' }

const CLERK_FRONTEND_API = 'https://frontend-api.clerk.dev'
const CLERK_JS_CDN = 'https://cdn.jsdelivr.net'
const FUNCTION_PATH_PREFIX = '/api/__clerk'

export default async function handler(req) {
  const url = new URL(req.url)
  // Vercel invokes this function at /api/__clerk/... (its file path); both
  // upstreams expect the same path they'd see at their own real root, so
  // that prefix — an artifact of where this file lives, not part of either
  // upstream's actual URL shape — is stripped before forwarding.
  const clerkPath = url.pathname.startsWith(FUNCTION_PATH_PREFIX)
    ? url.pathname.slice(FUNCTION_PATH_PREFIX.length)
    : url.pathname

  const isScriptBundle = clerkPath.startsWith('/npm/')

  const forwardHeaders = new Headers(req.headers)
  forwardHeaders.delete('host')
  forwardHeaders.delete('content-length')

  let target
  if (isScriptBundle) {
    // A public CDN request — no Clerk-specific headers needed or wanted.
    target = `${CLERK_JS_CDN}${clerkPath}${url.search}`
  } else {
    const secretKey = process.env.CLERK_SECRET_KEY
    if (!secretKey) {
      return new Response('CLERK_SECRET_KEY not configured', { status: 500 })
    }
    // The public URL Clerk was given in its dashboard for this proxy. Read
    // from an env var rather than trusting this request's own Host header —
    // a value we assert as "this is genuinely our proxy" shouldn't come
    // from something a caller could try to influence.
    const proxyUrl = process.env.CLERK_PROXY_URL || `${url.protocol}//${url.host}/__clerk`
    forwardHeaders.set('Clerk-Proxy-Url', proxyUrl)
    forwardHeaders.set('Clerk-Secret-Key', secretKey)
    // Vercel's edge network already sets x-forwarded-for with the real
    // end-user IP as the first entry on every incoming request — that's
    // exactly what Clerk requires, so it's left as-is rather than
    // rewritten. x-real-ip is the fallback for the rare case it's missing.
    if (!forwardHeaders.get('x-forwarded-for')) {
      const realIp = req.headers.get('x-real-ip')
      if (realIp) forwardHeaders.set('X-Forwarded-For', realIp)
    }
    target = `${CLERK_FRONTEND_API}${clerkPath}${url.search}`
  }

  const hasBody = !['GET', 'HEAD'].includes(req.method)
  const upstreamResp = await fetch(target, {
    method: req.method,
    headers: forwardHeaders,
    body: hasBody ? req.body : undefined,
    ...(hasBody ? { duplex: 'half' } : {}),
    redirect: 'manual',
  })

  const respHeaders = new Headers(upstreamResp.headers)
  // Let the runtime recompute framing/encoding for the body we're about to
  // stream through untouched, rather than forwarding the upstream's
  // original values for headers describing its own connection to us.
  respHeaders.delete('content-encoding')
  respHeaders.delete('content-length')

  return new Response(upstreamResp.body, {
    status: upstreamResp.status,
    headers: respHeaders,
  })
}
