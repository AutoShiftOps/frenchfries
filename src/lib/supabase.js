import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── MVP: single-user singleton row, same pattern as command_center ──
const USER_ID = 'sajja_singleton'

export async function loadProgress() {
  const { data, error } = await supabase
    .from('frenchfry_progress')
    .select('*')
    .eq('id', USER_ID)
    .maybeSingle()

  if (error) {
    console.error('loadProgress error:', error)
    return null
  }
  return data
}

export async function saveAttempt({ chapterId, phraseId, phraseText, scores, mistakes }) {
  // 1. Log the individual attempt
  const { error: attemptError } = await supabase
    .from('frenchfry_attempts')
    .insert({
      chapter_id: chapterId,
      phrase_id: phraseId,
      phrase_text: phraseText,
      accuracy_score: scores.accuracyScore,
      fluency_score: scores.fluencyScore,
      prosody_score: scores.prosodyScore,
      pron_score: scores.pronScore,
      word_scores: scores.words || [],
    })

  if (attemptError) console.error('saveAttempt error:', attemptError)

  // 2. Update the running progress singleton
  const current = await loadProgress()
  const completedPhrases = current?.completed_phrases || {}
  completedPhrases[`${chapterId}:${phraseId}`] = true

  const mistakeLog = current?.mistake_log || []
  if (mistakes && mistakes.length > 0) {
    mistakeLog.unshift(...mistakes.map(m => ({ ...m, date: new Date().toISOString() })))
  }

  const { error: upsertError } = await supabase
    .from('frenchfry_progress')
    .upsert({
      id: USER_ID,
      completed_phrases: completedPhrases,
      mistake_log: mistakeLog.slice(0, 100),
      last_session: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

  if (upsertError) console.error('progress upsert error:', upsertError)
}
