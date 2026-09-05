-- FrenchFry migration v5 — real IP-based rate limiting for anonymous
-- "glimpse" callers of the Azure proxy endpoints (/api/tts,
-- /api/pronunciation-assess). Replaces the honesty-note in
-- verifyCaller.js ("real anonymous-abuse protection would need IP-based
-- rate limiting... not done here") with an actual limiter.
--
-- Design:
--   - A small table keyed by (ip, window_start) holds a per-window count.
--   - All access goes through one SECURITY DEFINER function
--     (frenchfry_check_rate_limit) — the table itself grants NOTHING to
--     anon/authenticated, so there's no way to read or tamper with other
--     callers' counts directly, only to atomically bump your own via the
--     function. This is the same "narrow RPC, no direct table grants"
--     pattern as the rest of this app's RLS.
--   - Windows are fixed-size buckets (not a sliding log), which is
--     intentionally simple: cheap to store, cheap to query, and precise
--     enough for abuse protection (as opposed to precise quota billing).
--   - Old rows are opportunistically swept on every call so the table
--     never grows unbounded — no separate cron job needed at this scale.

CREATE TABLE IF NOT EXISTS frenchfry_rate_limits (
  ip           text NOT NULL,
  window_start timestamptz NOT NULL,
  count        integer NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, window_start)
);

ALTER TABLE frenchfry_rate_limits ENABLE ROW LEVEL SECURITY;
-- Deliberately no policies: nobody (anon, authenticated, or otherwise)
-- can SELECT/INSERT/UPDATE/DELETE this table directly. All access is
-- through the function below, which runs as its owner (SECURITY DEFINER)
-- and bypasses RLS by design — that's the only door in.

CREATE OR REPLACE FUNCTION frenchfry_check_rate_limit(
  p_ip             text,
  p_window_minutes integer,
  p_limit          integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start timestamptz;
  v_count        integer;
BEGIN
  IF p_ip IS NULL OR p_ip = '' THEN
    p_ip := 'unknown';
  END IF;

  -- Bucket "now" into a fixed p_window_minutes-wide slot.
  v_window_start := date_trunc('hour', now())
    + (floor(date_part('minute', now()) / p_window_minutes) * p_window_minutes) * interval '1 minute';

  INSERT INTO frenchfry_rate_limits (ip, window_start, count)
  VALUES (p_ip, v_window_start, 1)
  ON CONFLICT (ip, window_start)
  DO UPDATE SET count = frenchfry_rate_limits.count + 1
  RETURNING count INTO v_count;

  -- Opportunistic cleanup — cheap, keeps the table from growing forever.
  -- Runs on ~1% of calls so it doesn't add latency to every request.
  IF random() < 0.01 THEN
    DELETE FROM frenchfry_rate_limits WHERE window_start < now() - interval '1 day';
  END IF;

  RETURN v_count;
END;
$$;

-- Only this narrow function is reachable by unauthenticated/authenticated
-- callers — never the table itself.
GRANT EXECUTE ON FUNCTION frenchfry_check_rate_limit(text, integer, integer) TO anon, authenticated;

-- Verify
SELECT proname, prosecdef FROM pg_proc WHERE proname = 'frenchfry_check_rate_limit';
