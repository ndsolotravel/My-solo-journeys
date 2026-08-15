-- Migration: Drop overloaded functions, ensure clean upsert_visitor_session RPC and robust RLS policies

-- 1. Drop legacy overloaded signatures to prevent RPC dispatch ambiguity
DROP FUNCTION IF EXISTS public.upsert_visitor_session(text, text, text, text, text, text, text, boolean, text, text);
DROP FUNCTION IF EXISTS public.upsert_visitor_session(text, text, text, text, text, text, text, text, boolean, text, text, text);

-- 2. Define single authoritative upsert_visitor_session RPC
CREATE OR REPLACE FUNCTION public.upsert_visitor_session(
  p_session_id TEXT,
  p_path TEXT DEFAULT '/',
  p_device_type TEXT DEFAULT 'desktop',
  p_browser TEXT DEFAULT 'Unknown',
  p_os TEXT DEFAULT 'Unknown',
  p_country TEXT DEFAULT 'Unknown',
  p_country_code TEXT DEFAULT 'XX',
  p_referrer_source TEXT DEFAULT 'Direct',
  p_is_new_page_view BOOLEAN DEFAULT false,
  p_title TEXT DEFAULT '',
  p_referrer TEXT DEFAULT '',
  p_subscriber_email TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.visitor_sessions (
    session_id, last_active_at, created_at, device_type, browser, os, country, country_code, referrer_source, entry_page, subscriber_email
  ) VALUES (
    p_session_id, now(), now(), p_device_type, p_browser, p_os, p_country, COALESCE(p_country_code, 'XX'), p_referrer_source, p_path, p_subscriber_email
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_active_at = now(),
    device_type = COALESCE(NULLIF(EXCLUDED.device_type, ''), public.visitor_sessions.device_type),
    browser = COALESCE(NULLIF(EXCLUDED.browser, 'Unknown'), public.visitor_sessions.browser),
    os = COALESCE(NULLIF(EXCLUDED.os, 'Unknown'), public.visitor_sessions.os),
    country = CASE WHEN EXCLUDED.country <> 'Unknown' AND EXCLUDED.country IS NOT NULL THEN EXCLUDED.country ELSE public.visitor_sessions.country END,
    country_code = CASE WHEN EXCLUDED.country_code <> 'XX' AND EXCLUDED.country_code IS NOT NULL THEN EXCLUDED.country_code ELSE public.visitor_sessions.country_code END,
    subscriber_email = COALESCE(EXCLUDED.subscriber_email, public.visitor_sessions.subscriber_email);

  IF p_is_new_page_view THEN
    INSERT INTO public.page_views (session_id, path, title, referrer, created_at)
    VALUES (p_session_id, p_path, COALESCE(p_title, p_path), COALESCE(p_referrer, ''), now());
  END IF;
END; $$;

-- 3. Grant RPC execution to all application roles
GRANT EXECUTE ON FUNCTION public.upsert_visitor_session TO anon, authenticated, service_role;

-- 4. Enable RLS & ensure fallback policies exist on visitor_sessions
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'visitor_sessions' AND policyname = 'visitor_sessions_select_all') THEN
    CREATE POLICY "visitor_sessions_select_all" ON public.visitor_sessions FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'visitor_sessions' AND policyname = 'visitor_sessions_insert_all') THEN
    CREATE POLICY "visitor_sessions_insert_all" ON public.visitor_sessions FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'visitor_sessions' AND policyname = 'visitor_sessions_update_all') THEN
    CREATE POLICY "visitor_sessions_update_all" ON public.visitor_sessions FOR UPDATE USING (true) WITH CHECK (true);
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE ON public.visitor_sessions TO anon, authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;

-- 5. Reload Schema Cache
NOTIFY pgrst, 'reload schema';
