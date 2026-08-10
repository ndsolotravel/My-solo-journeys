-- Live visitor tracking for the "Live Now" counter (public home page).
--
-- Model:
--   * One row per visitor session. session_id is a UUID generated on the
--     CLIENT and stored in localStorage, so multiple tabs of the same browser
--     share the SAME session_id -> a single visitor is never double counted.
--   * last_active_at is heart-beated client-side while the tab is open; rows
--     whose last_active_at is older than the ACTIVITY_TIMEOUT are excluded
--     from the live count (and cleaned up lazily).
--   * The table exposes only opaque session ids + timestamps (no PII), so a
--     public SELECT policy is acceptable for the live count query.

CREATE TABLE public.visitor_sessions (
  session_id TEXT PRIMARY KEY,
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX visitor_sessions_active_idx ON public.visitor_sessions (last_active_at DESC);

-- Anyone may read (only opaque session ids / timestamps) and upsert their own
-- heartbeat row. Row count is derived in SQL; no direct enumeration concerns.
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visitor_sessions_select" ON public.visitor_sessions
  FOR SELECT USING (true);

CREATE POLICY "visitor_sessions_upsert" ON public.visitor_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "visitor_sessions_update" ON public.visitor_sessions
  FOR UPDATE USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO anon;
GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;

-- Lazy cleanup: drop sessions that went stale more than 1 day ago so the table
-- stays tiny. Uses the active_idx; runs on the count query path (cheap).
CREATE OR REPLACE FUNCTION public.cleanup_stale_visitor_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.visitor_sessions
  WHERE last_active_at < now() - interval '1 day';
$$;

GRANT EXECUTE ON FUNCTION public.cleanup_stale_visitor_sessions() TO anon, authenticated;