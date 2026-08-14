-- Migration: Add Hit Counter & Live Analytics schema (page_views, enhanced visitor_sessions)

-- 1. Upgrade public.visitor_sessions with analytics metadata columns
ALTER TABLE public.visitor_sessions
  ADD COLUMN IF NOT EXISTS device_type TEXT DEFAULT 'desktop',
  ADD COLUMN IF NOT EXISTS browser TEXT DEFAULT 'Unknown',
  ADD COLUMN IF NOT EXISTS os TEXT DEFAULT 'Unknown',
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Unknown',
  ADD COLUMN IF NOT EXISTS referrer_source TEXT DEFAULT 'Direct',
  ADD COLUMN IF NOT EXISTS entry_page TEXT DEFAULT '/';

CREATE INDEX IF NOT EXISTS visitor_sessions_created_at_idx ON public.visitor_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS visitor_sessions_last_active_idx ON public.visitor_sessions (last_active_at DESC);

-- 2. Create public.page_views table for recording individual page view events
CREATE TABLE IF NOT EXISTS public.page_views (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE,
  path TEXT NOT NULL DEFAULT '/',
  title TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON public.page_views (path);
CREATE INDEX IF NOT EXISTS page_views_session_id_idx ON public.page_views (session_id);

-- 3. Atomic PostgreSQL RPC for tracking visitor sessions and recording page views
CREATE OR REPLACE FUNCTION public.upsert_visitor_session(
  p_session_id TEXT,
  p_path TEXT DEFAULT '/',
  p_device_type TEXT DEFAULT 'desktop',
  p_browser TEXT DEFAULT 'Unknown',
  p_os TEXT DEFAULT 'Unknown',
  p_country TEXT DEFAULT 'Unknown',
  p_referrer_source TEXT DEFAULT 'Direct',
  p_is_new_page_view BOOLEAN DEFAULT false,
  p_title TEXT DEFAULT '',
  p_referrer TEXT DEFAULT ''
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.visitor_sessions (
    session_id, last_active_at, created_at, device_type, browser, os, country, referrer_source, entry_page
  ) VALUES (
    p_session_id, now(), now(), p_device_type, p_browser, p_os, p_country, p_referrer_source, p_path
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_active_at = now(),
    device_type = COALESCE(NULLIF(EXCLUDED.device_type, ''), public.visitor_sessions.device_type),
    browser = COALESCE(NULLIF(EXCLUDED.browser, 'Unknown'), public.visitor_sessions.browser),
    os = COALESCE(NULLIF(EXCLUDED.os, 'Unknown'), public.visitor_sessions.os),
    country = COALESCE(NULLIF(EXCLUDED.country, 'Unknown'), public.visitor_sessions.country);

  IF p_is_new_page_view THEN
    INSERT INTO public.page_views (session_id, path, title, referrer, created_at)
    VALUES (p_session_id, p_path, COALESCE(p_title, p_path), COALESCE(p_referrer, ''), now());
  END IF;
END; $$;

GRANT EXECUTE ON FUNCTION public.upsert_visitor_session TO anon, authenticated;

-- 4. Update cleanup_stale_visitor_sessions so historical analytics data is preserved.
-- Only purge sessions inactive for more than 365 days.
CREATE OR REPLACE FUNCTION public.cleanup_stale_visitor_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.visitor_sessions
  WHERE last_active_at < now() - interval '365 days';
$$;

-- Grant EXECUTE to anon and authenticated
GRANT EXECUTE ON FUNCTION public.cleanup_stale_visitor_sessions() TO anon, authenticated;

-- 5. Enable Row Level Security and setup policies on page_views
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'page_views' AND policyname = 'page_views_insert_public') THEN
    CREATE POLICY "page_views_insert_public" ON public.page_views
      FOR INSERT TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'page_views' AND policyname = 'page_views_select_admin') THEN
    CREATE POLICY "page_views_select_admin" ON public.page_views
      FOR SELECT TO authenticated
      USING (
        public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'editor'::public.app_role)
      );
  END IF;
END $$;

GRANT SELECT, INSERT ON public.page_views TO anon, authenticated;
GRANT ALL ON public.page_views TO service_role;
