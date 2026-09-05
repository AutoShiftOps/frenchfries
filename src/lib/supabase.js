import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Auth now lives in Clerk, not Supabase — this client only ever talks to
// Supabase's DATABASE (progress/attempts tables), authenticated by Clerk's
// session token via Supabase's "third-party auth" support. `accessToken`
// is called on every request; Clerk attaches itself to `window.Clerk` once
// loaded, so reading it here (rather than importing a React hook into a
// plain module) is the supported way to bridge the two outside a component.
// RLS policies read the Clerk user id out of the token as `auth.jwt()->>'sub'`
// — see supabase_migration_v4.sql.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  accessToken: async () => {
    try {
      return (await window.Clerk?.session?.getToken()) ?? null
    } catch {
      return null
    }
  },
})

// ── Anonymous "glimpse" progress ─────────────────────────────────────
// Visitors who haven't signed in yet get one chapter per module, held in
// localStorage, silently merged into their account the moment they sign in
// (see migrateAnonProgressToAccount below). Real sign-in/sign-up is Clerk's
// job now — see components/auth/SignInCard.jsx.

const ANON_KEY = 'ff_anon_progress'

function readAnon() {
  try {
    const raw = localStorage.getItem(ANON_KEY)
    return raw ? JSON.parse(raw) : { completed_phrases: {}, chapters_started: {}, mistake_log: [] }
  } catch {
    return { completed_phrases: {}, chapters_started: {}, mistake_log: [] }
  }
}

function writeAnon(data) {
  try { localStorage.setItem(ANON_KEY, JSON.stringify(data)) } catch { /* storage unavailable — glimpse just won't persist across reloads */ }
}

function clearAnon() {
  try { localStorage.removeItem(ANON_KEY) } catch { /* noop */ }
}

/**
 * Anonymous "glimpse" rule: one chapter per module. Signed-in users are
 * never gated. Returns true if the learner may open `chapterId` in `module`
 * (either it's the chapter already in progress for that module, or none
 * has been picked yet).
 */
export function canStartChapter(session, module, chapterId) {
  if (session) return true
  const anon = readAnon()
  const started = anon.chapters_started[module]
  return !started || started === chapterId
}

export function recordChapterStart(session, module, chapterId) {
  if (session) return
  const anon = readAnon()
  if (!anon.chapters_started[module]) {
    anon.chapters_started[module] = chapterId
    writeAnon(anon)
  }
}

/**
 * Merges local anonymous progress into the newly signed-in user's row,
 * then clears the local copy. Call once, right after a SIGNED_IN event.
 */
export async function migrateAnonProgressToAccount(userId) {
  const anon = readAnon()
  const hasAnything = Object.keys(anon.completed_phrases || {}).length > 0
  if (!hasAnything) { clearAnon(); return }

  const { data: existing } = await supabase
    .from('frenchfry_progress')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  const mergedPhrases = { ...(anon.completed_phrases || {}), ...(existing?.completed_phrases || {}) }
  const mergedMistakes = [...(existing?.mistake_log || []), ...(anon.mistake_log || [])].slice(0, 100)

  await supabase.from('frenchfry_progress').upsert({
    id: userId,
    completed_phrases: mergedPhrases,
    mistake_log: mergedMistakes,
    last_session: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  clearAnon()
}

// ── Progress ──────────────────────────────────────────────────────────

export async function loadProgress(session) {
  if (!session) return readAnon()

  const { data, error } = await supabase
    .from('frenchfry_progress')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle()

  if (error) {
    console.error('loadProgress error:', error)
    return null
  }
  return data
}

/**
 * @param {string} module - 'speaking' | 'reading' | 'listening' | 'writing'
 *   Namespaced into completed_phrases as `${module}:${chapterId}:${phraseId}`
 *   so all four modules share one progress row without colliding.
 */
export async function saveAttempt({ session, module = 'speaking', chapterId, phraseId, phraseText, scores, mistakes }) {
  if (!session) {
    // Anonymous: keep it local only — no DB write, nothing to leak or clean up.
    const anon = readAnon()
    anon.completed_phrases[`${module}:${chapterId}:${phraseId}`] = true
    if (mistakes && mistakes.length > 0) {
      anon.mistake_log.unshift(...mistakes.map(m => ({ ...m, module, date: new Date().toISOString() })))
      anon.mistake_log = anon.mistake_log.slice(0, 100)
    }
    writeAnon(anon)
    return
  }

  const userId = session.user.id

  // 1. Log the individual attempt
  const { error: attemptError } = await supabase
    .from('frenchfry_attempts')
    .insert({
      user_id: userId,
      module,
      chapter_id: chapterId,
      phrase_id: phraseId,
      phrase_text: phraseText,
      accuracy_score: scores?.accuracyScore ?? null,
      fluency_score: scores?.fluencyScore ?? null,
      prosody_score: scores?.prosodyScore ?? null,
      pron_score: scores?.pronScore ?? null,
      word_scores: scores?.words || [],
    })

  if (attemptError) console.error('saveAttempt error:', attemptError)

  // 2. Update the running progress row for this user
  const current = await loadProgress(session)
  const completedPhrases = current?.completed_phrases || {}
  completedPhrases[`${module}:${chapterId}:${phraseId}`] = true

  const mistakeLog = current?.mistake_log || []
  if (mistakes && mistakes.length > 0) {
    mistakeLog.unshift(...mistakes.map(m => ({ ...m, module, date: new Date().toISOString() })))
  }

  const { error: upsertError } = await supabase
    .from('frenchfry_progress')
    .upsert({
      id: userId,
      completed_phrases: completedPhrases,
      mistake_log: mistakeLog.slice(0, 100),
      last_session: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

  if (upsertError) console.error('progress upsert error:', upsertError)
}

/**
 * Reads completion for one module out of the shared, namespaced
 * completed_phrases map — pass to ChapterList as `completedPhrases`.
 */
export function completedForModule(progress, module) {
  const all = progress?.completed_phrases || {}
  const prefix = `${module}:`
  const out = {}
  for (const key in all) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = all[key]
  }
  return out
}
