-- ═══════════════════════════════════════════════════════════════
-- FRENCHFRY — v2 migration: adds `module` to attempts so Reading,
-- Listening, and Writing can log alongside Speaking.
-- Run in the same Supabase project as supabase_migration.sql.
-- Safe to re-run (IF NOT EXISTS / default backfills existing rows).
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE frenchfry_attempts
  ADD COLUMN IF NOT EXISTS module text NOT NULL DEFAULT 'speaking';

-- Verify
SELECT module, count(*) FROM frenchfry_attempts GROUP BY module;
