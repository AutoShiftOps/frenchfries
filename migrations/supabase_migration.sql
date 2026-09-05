-- ═══════════════════════════════════════════════════════════════
-- FRENCHFRY MVP — Supabase migration
-- Run in whichever Supabase project you're using for FrenchFry
-- ═══════════════════════════════════════════════════════════════

-- Running progress singleton (mirrors command_center pattern)
CREATE TABLE IF NOT EXISTS frenchfry_progress (
  id                  text        PRIMARY KEY DEFAULT 'sajja_singleton',
  completed_phrases   jsonb       NOT NULL DEFAULT '{}',
  mistake_log         jsonb       NOT NULL DEFAULT '[]',
  streak              integer     NOT NULL DEFAULT 0,
  last_session        timestamptz,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Individual attempt log — every phrase attempt, every score
CREATE TABLE IF NOT EXISTS frenchfry_attempts (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id        text        NOT NULL,
  phrase_id         text        NOT NULL,
  phrase_text       text        NOT NULL,
  accuracy_score    numeric,
  fluency_score     numeric,
  prosody_score     numeric,
  pron_score        numeric,
  word_scores       jsonb       NOT NULL DEFAULT '[]',
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- No auth in MVP — disable RLS
ALTER TABLE frenchfry_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE frenchfry_attempts DISABLE ROW LEVEL SECURITY;

-- Verify
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('frenchfry_progress', 'frenchfry_attempts')
ORDER BY table_name, ordinal_position;
