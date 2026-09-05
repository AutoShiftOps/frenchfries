-- FrenchFry migration v4 — auth moves from Supabase (magic-link) to Clerk.
--
-- Prerequisite (do this in the dashboards BEFORE running this file):
--   1. Clerk: Configure → Integrations → enable "Supabase", copy the
--      Clerk domain it gives you.
--   2. Supabase: Authentication → Sign In / Providers → Third Party Auth →
--      Add provider → Clerk → paste that domain.
-- Once that's wired, Supabase trusts Clerk-issued JWTs directly and
-- decodes them via auth.jwt() — there's no shared secret to manage.
--
-- Clerk user ids look like "user_2abc..." — NOT uuids — so:
--   - frenchfry_progress.id is already `text`, so it just works.
--   - frenchfry_attempts.user_id was added as `uuid` in v3 and must widen
--     to `text` (this file does that).
--   - RLS policies below compare against `(select auth.jwt()->>'sub')`
--     (Clerk's user id, straight out of the token) instead of
--     `auth.uid()` (which tries to cast the token subject to uuid and
--     would error on Clerk's non-uuid ids).
--
-- Existing rows keyed to old Supabase-auth uuids are NOT migrated to a
-- Clerk id automatically — there's no reliable way to map one to the
-- other. Since this project is pre-launch, that's an acceptable one-time
-- loss; if you'd rather keep that data, note the old uuid(s) before
-- running this and re-key them manually once you know your Clerk user id
-- (Clerk dashboard → Users, or `sub` claim after your first real sign-in).
--
-- NOTE (v4 fix): Postgres refuses to ALTER a column's type while a policy
-- still references it (error 0A000: "cannot alter type of a column used
-- in a policy definition"). So the policies have to be dropped BEFORE the
-- ALTER, not after — this version reorders the original v4 for that
-- reason. If you already hit that error, nothing from this file committed
-- (the SQL editor runs the whole paste as one transaction), so it's safe
-- to just run this corrected version from the top.

-- 1. Drop both policies first — "own attempts" is the one that depends on
--    frenchfry_attempts.user_id, but both are dropped together for a clean
--    re-run either way.
DROP POLICY IF EXISTS "own progress" ON frenchfry_progress;
DROP POLICY IF EXISTS "own attempts" ON frenchfry_attempts;

-- 2. Now the column is free to retype — widen user_id to text so it can
--    hold a Clerk id.
ALTER TABLE frenchfry_attempts ALTER COLUMN user_id TYPE text USING user_id::text;

-- 3. Re-point RLS at Clerk's claim instead of Supabase's auth.uid().
CREATE POLICY "own progress" ON frenchfry_progress
  FOR ALL
  USING (id = (select auth.jwt()->>'sub'))
  WITH CHECK (id = (select auth.jwt()->>'sub'));

CREATE POLICY "own attempts" ON frenchfry_attempts
  FOR ALL
  USING (user_id = (select auth.jwt()->>'sub'))
  WITH CHECK (user_id = (select auth.jwt()->>'sub'));

-- Verify
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('frenchfry_progress', 'frenchfry_attempts')
ORDER BY table_name, ordinal_position;
