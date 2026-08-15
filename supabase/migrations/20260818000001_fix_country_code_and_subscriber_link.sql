-- Migration: Fix Country Code and Subscriber Link on visitor_sessions

ALTER TABLE public.visitor_sessions
  ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'XX',
  ADD COLUMN IF NOT EXISTS subscriber_email TEXT;

CREATE INDEX IF NOT EXISTS visitor_sessions_country_code_idx ON public.visitor_sessions (country_code);
CREATE INDEX IF NOT EXISTS visitor_sessions_subscriber_email_idx ON public.visitor_sessions (subscriber_email);

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

GRANT EXECUTE ON FUNCTION public.upsert_visitor_session(text, text, text, text, text, text, text, text, boolean, text, text, text) TO anon, authenticated;

-- Reload schema cache
NOTIFY pgrst, 'reload schema';
