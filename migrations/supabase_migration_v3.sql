-- FrenchFry migration v3 — real auth (Supabase magic-link) replacing the
-- hardcoded 'sajja_singleton' row.
--
-- Run this in the Supabase SQL editor AFTER migration v2. It:
--   1. Adds a nullable user_id column to frenchfry_attempts (frenchfry_progress
--      already uses `id` as its primary key, which now holds either the old
--      singleton string or a real auth.users UUID — both are valid text/uuid
--      values under the existing `id` column if it's typed as text/uuid).
--   2. Enables Row Level Security so each signed-in user only ever sees their
--      own rows. Anonymous learners never touch these tables — their
--      progress lives in the browser's localStorage until they sign in, at
--      which point the app merges it in as this user's account.
--   3. Leaves the old 'sajja_singleton' row alone (you're still signed in
--      as yourself for now) — migrate it manually to your real auth uid
--      once you've signed in once, using the UPDATE at the bottom.

-- 1. user_id on attempts (progress already keys by `id`, reused as user id)
ALTER TABLE frenchfry_attempts ADD COLUMN IF NOT EXISTS user_id uuid;

-- 2. Row Level Security
ALTER TABLE frenchfry_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE frenchfry_attempts ENABLE ROW LEVEL SECURITY;

-- frenchfry_progress.id must be able to hold a real auth uid going forward.
-- If it's currently `text`, a uuid value ('11111111-...') still stores fine
-- as text — no type change required for the app to work. Skip this cast if
-- you'd rather keep it as text.

DROP POLICY IF EXISTS "own progress" ON frenchfry_progress;
CREATE POLICY "own progress" ON frenchfry_progress
  FOR ALL
  USING (id::text = auth.uid()::text)
  WITH CHECK (id::text = auth.uid()::text);

DROP POLICY IF EXISTS "own attempts" ON frenchfry_attempts;
CREATE POLICY "own attempts" ON frenchfry_attempts
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 3. One-time manual step (run once you've signed in with your own email
--    and can see your new auth.users uuid in Authentication → Users):
--
--    UPDATE frenchfry_progress SET id = '<your-new-auth-uuid>'
--      WHERE id = 'sajja_singleton';
--    UPDATE frenchfry_attempts SET user_id = '<your-new-auth-uuid>'
--      WHERE user_id IS NULL;
--
-- Until you run that, your old singleton progress simply won't show up
-- under your new signed-in account — it's not deleted, just orphaned.
