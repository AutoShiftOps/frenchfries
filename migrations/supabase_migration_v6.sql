-- FrenchFry migration v6 — leaderboard + practice exam results.
--
-- Two new tables, same ownership pattern as frenchfry_progress/attempts
-- (RLS scoped to the Clerk user id via auth.jwt()->>'sub'), with one
-- deliberate difference: the leaderboard is publicly READABLE (everyone
-- sees everyone's rank), while writes stay owner-only. It only ever
-- stores a first name + a completed-phrase count — no email, no raw
-- progress detail — so that public-read is a narrow, considered
-- exception, not a general precedent.

-- ── Leaderboard ──────────────────────────────────────────────────────
-- One row per learner: their display name (first name only — see
-- App.jsx) and total completed phrases across every module/level,
-- upserted by the client itself right after each attempt (see
-- upsertLeaderboardEntry in src/lib/supabase.js). Denormalized on
-- purpose — a live cross-user aggregate query isn't something a
-- per-user-scoped RLS client can do anyway, and this is cheap to read.
CREATE TABLE IF NOT EXISTS frenchfry_leaderboard (
  user_id         text PRIMARY KEY,
  display_name    text NOT NULL,
  total_completed integer NOT NULL DEFAULT 0,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE frenchfry_leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leaderboard is public to read" ON frenchfry_leaderboard
  FOR SELECT
  USING (true);

CREATE POLICY "own leaderboard row" ON frenchfry_leaderboard
  FOR INSERT
  WITH CHECK (user_id = (select auth.jwt()->>'sub'));

CREATE POLICY "update own leaderboard row" ON frenchfry_leaderboard
  FOR UPDATE
  USING (user_id = (select auth.jwt()->>'sub'))
  WITH CHECK (user_id = (select auth.jwt()->>'sub'));

-- ── Practice exam results ────────────────────────────────────────────
-- Best score per (user, exam set) — private, same as progress/attempts.
CREATE TABLE IF NOT EXISTS frenchfry_exam_results (
  user_id    text NOT NULL,
  exam_id    text NOT NULL,
  score_pct  integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam_id)
);

ALTER TABLE frenchfry_exam_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own exam results" ON frenchfry_exam_results
  FOR ALL
  USING (user_id = (select auth.jwt()->>'sub'))
  WITH CHECK (user_id = (select auth.jwt()->>'sub'));

-- Verify
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('frenchfry_leaderboard', 'frenchfry_exam_results')
ORDER BY table_name, ordinal_position;
