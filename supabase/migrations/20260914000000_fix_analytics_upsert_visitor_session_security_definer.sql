-- Migration: 20260914000000_fix_analytics_upsert_visitor_session_security_definer.sql
-- Description: Fix upsert_visitor_session to SECURITY DEFINER, secure visitor_sessions RLS, and eliminate permission denied errors

-- ============================================================================
-- 1. SECURE & STANDARDIZE upsert_visitor_session RPC
-- ============================================================================
-- Must execute as SECURITY DEFINER owned by postgres with search_path = public, pg_temp.
-- Validates input, sanitizes string lengths, and ensures safe atomic upsert.
-- Does not expose unnecessary visitor data.

CREATE OR REPLACE FUNCTION public.upsert_visitor_session(
  p_session_id text,
  p_path text DEFAULT '/'::text,
  p_device_type text DEFAULT 'desktop'::text,
  p_browser text DEFAULT 'Unknown'::text,
  p_os text DEFAULT 'Unknown'::text,
  p_country text DEFAULT 'Unknown'::text,
  p_country_code text DEFAULT 'XX'::text,
  p_referrer_source text DEFAULT 'Direct'::text,
  p_is_new_page_view boolean DEFAULT false,
  p_title text DEFAULT ''::text,
  p_referrer text DEFAULT ''::text,
  p_subscriber_email text DEFAULT NULL::text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_clean_session_id text;
  v_clean_path text;
  v_clean_device text;
  v_clean_browser text;
  v_clean_os text;
  v_clean_country text;
  v_clean_country_code text;
  v_clean_source text;
  v_clean_title text;
  v_clean_referrer text;
  v_clean_email text;
BEGIN
  -- 1. Validate session_id
  IF p_session_id IS NULL THEN
    RETURN;
  END IF;

  v_clean_session_id := trim(p_session_id);
  IF length(v_clean_session_id) = 0 OR length(v_clean_session_id) > 128 THEN
    RETURN;
  END IF;

  -- 2. Sanitize and bound string parameters (prevent unbounded memory/storage)
  v_clean_path := COALESCE(NULLIF(trim(p_path), ''), '/');
  IF length(v_clean_path) > 2048 THEN
    v_clean_path := substr(v_clean_path, 1, 2048);
  END IF;

  v_clean_device := lower(trim(COALESCE(p_device_type, 'desktop')));
  IF v_clean_device NOT IN ('desktop', 'mobile', 'tablet') THEN
    v_clean_device := 'desktop';
  END IF;

  v_clean_browser := substr(trim(COALESCE(p_browser, 'Unknown')), 1, 100);
  v_clean_os := substr(trim(COALESCE(p_os, 'Unknown')), 1, 100);
  v_clean_country := substr(trim(COALESCE(p_country, 'Unknown')), 1, 100);
  
  v_clean_country_code := upper(trim(COALESCE(p_country_code, 'XX')));
  IF length(v_clean_country_code) > 10 THEN
    v_clean_country_code := substr(v_clean_country_code, 1, 10);
  END IF;

  v_clean_source := substr(trim(COALESCE(p_referrer_source, 'Direct')), 1, 100);

  v_clean_title := substr(trim(COALESCE(p_title, '')), 1, 500);
  v_clean_referrer := substr(trim(COALESCE(p_referrer, '')), 1, 2048);

  IF p_subscriber_email IS NOT NULL AND length(trim(p_subscriber_email)) > 0 THEN
    v_clean_email := lower(trim(p_subscriber_email));
    IF length(v_clean_email) > 320 THEN
      v_clean_email := NULL;
    END IF;
  ELSE
    v_clean_email := NULL;
  END IF;

  -- 3. Perform atomic upsert into visitor_sessions
  INSERT INTO public.visitor_sessions (
    session_id,
    last_active_at,
    created_at,
    device_type,
    browser,
    os,
    country,
    country_code,
    referrer_source,
    entry_page,
    subscriber_email
  ) VALUES (
    v_clean_session_id,
    now(),
    now(),
    v_clean_device,
    v_clean_browser,
    v_clean_os,
    v_clean_country,
    COALESCE(NULLIF(v_clean_country_code, ''), 'XX'),
    v_clean_source,
    v_clean_path,
    v_clean_email
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_active_at = now(),
    device_type = CASE 
      WHEN EXCLUDED.device_type IS NOT NULL AND EXCLUDED.device_type <> '' 
      THEN EXCLUDED.device_type 
      ELSE public.visitor_sessions.device_type 
    END,
    browser = CASE 
      WHEN EXCLUDED.browser IS NOT NULL AND EXCLUDED.browser <> '' AND EXCLUDED.browser <> 'Unknown' 
      THEN EXCLUDED.browser 
      ELSE public.visitor_sessions.browser 
    END,
    os = CASE 
      WHEN EXCLUDED.os IS NOT NULL AND EXCLUDED.os <> '' AND EXCLUDED.os <> 'Unknown' 
      THEN EXCLUDED.os 
      ELSE public.visitor_sessions.os 
    END,
    country = CASE 
      WHEN EXCLUDED.country IS NOT NULL AND EXCLUDED.country <> '' AND EXCLUDED.country <> 'Unknown' 
      THEN EXCLUDED.country 
      ELSE public.visitor_sessions.country 
    END,
    country_code = CASE 
      WHEN EXCLUDED.country_code IS NOT NULL AND EXCLUDED.country_code <> '' AND EXCLUDED.country_code <> 'XX' 
      THEN EXCLUDED.country_code 
      ELSE public.visitor_sessions.country_code 
    END,
    subscriber_email = COALESCE(v_clean_email, public.visitor_sessions.subscriber_email);

  -- 4. Record page view if requested
  IF p_is_new_page_view THEN
    INSERT INTO public.page_views (
      session_id,
      path,
      title,
      referrer,
      created_at
    ) VALUES (
      v_clean_session_id,
      v_clean_path,
      COALESCE(NULLIF(v_clean_title, ''), v_clean_path),
      COALESCE(v_clean_referrer, ''),
      now()
    );
  END IF;
END;
$$;

ALTER FUNCTION public.upsert_visitor_session OWNER TO postgres;
REVOKE ALL ON FUNCTION public.upsert_visitor_session FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_visitor_session TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.upsert_visitor_session IS 'Safely records or updates a visitor session and optional page view under SECURITY DEFINER.';

-- ============================================================================
-- 2. HARDEN RELATED ANALYTICS FUNCTIONS
-- ============================================================================

-- A. get_live_visitor_count: Returns active count without exposing session rows
CREATE OR REPLACE FUNCTION public.get_live_visitor_count(p_timeout_seconds int DEFAULT 300)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT count(*)::bigint
  FROM public.visitor_sessions
  WHERE last_active_at >= now() - (COALESCE(p_timeout_seconds, 300) || ' seconds')::interval;
$$;

ALTER FUNCTION public.get_live_visitor_count OWNER TO postgres;
REVOKE ALL ON FUNCTION public.get_live_visitor_count(int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_live_visitor_count(int) TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.get_live_visitor_count IS 'Returns active visitor count within timeout window without granting direct table read access.';

-- B. get_public_hit_stats: Aggregate metrics without leaking visitor records
CREATE OR REPLACE FUNCTION public.get_public_hit_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_total_page_hits BIGINT;
  v_weekly_page_hits BIGINT;
  v_unique_readers BIGINT;
  v_countries BIGINT;
  v_stories_read BIGINT;
  v_avg_reading NUMERIC;
BEGIN
  SELECT count(*) INTO v_total_page_hits FROM public.page_views;

  SELECT count(*) INTO v_weekly_page_hits
  FROM public.page_views
  WHERE created_at >= now() - interval '7 days';

  SELECT count(*) INTO v_unique_readers FROM public.visitor_sessions;

  SELECT count(DISTINCT country) INTO v_countries
  FROM public.visitor_sessions
  WHERE country IS NOT NULL AND country <> 'Unknown';

  SELECT COALESCE(sum(views), 0) INTO v_stories_read
  FROM public.posts
  WHERE published = true;

  SELECT COALESCE(avg(reading_minutes), 0) INTO v_avg_reading
  FROM public.posts
  WHERE published = true;

  RETURN jsonb_build_object(
    'totalPageHits', v_total_page_hits,
    'weeklyPageHits', v_weekly_page_hits,
    'uniqueReaders', v_unique_readers,
    'countries', v_countries,
    'storiesRead', v_stories_read,
    'avgReadingMinutes', round(v_avg_reading::numeric, 1)
  );
END;
$$;

ALTER FUNCTION public.get_public_hit_stats OWNER TO postgres;
REVOKE ALL ON FUNCTION public.get_public_hit_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_hit_stats() TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.get_public_hit_stats IS 'Calculates public aggregate reader and hit metrics securely under SECURITY DEFINER.';

-- C. cleanup_stale_visitor_sessions: Periodic cleanup of sessions > 365 days
CREATE OR REPLACE FUNCTION public.cleanup_stale_visitor_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  DELETE FROM public.visitor_sessions
  WHERE last_active_at < now() - interval '365 days';
END;
$$;

ALTER FUNCTION public.cleanup_stale_visitor_sessions OWNER TO postgres;
REVOKE ALL ON FUNCTION public.cleanup_stale_visitor_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_stale_visitor_sessions() TO anon, authenticated, service_role;

-- ============================================================================
-- 3. SECURE TABLE RLS POLICIES ON visitor_sessions
-- ============================================================================
-- Ensure RLS is enabled.
-- Prevent anonymous or public users from reading visitor_sessions (prevents harvesting subscriber_email or IP metadata).
-- Allow admins and editors to read sessions for the analytics dashboard and Recent Visitors log.

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Clean up obsolete / overly broad policies
DROP POLICY IF EXISTS "visitor_sessions_select" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_select_all" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_upsert" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_update" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_insert_all" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_update_all" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Anonymous visitors can create sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Users can update their own visitor session" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Users can update their own visitor sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Users can insert their own visitor sessions" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_admin_select" ON public.visitor_sessions;
DROP POLICY IF EXISTS "visitor_sessions_own_select" ON public.visitor_sessions;

-- Restricted SELECT for authenticated Admins and Editors only
CREATE POLICY "visitor_sessions_admin_select"
  ON public.visitor_sessions FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  );

-- Authenticated users may read their own session record if user_id matches
CREATE POLICY "visitor_sessions_own_select"
  ON public.visitor_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. TABLE GRANTS ON visitor_sessions
-- ============================================================================
-- Anon should not have direct table write access (all writes must go through the secured RPC).
-- Anon should not have direct table read access (read via aggregate RPCs).
-- Authenticated users have SELECT governed by RLS.
-- service_role and postgres retain administrative privileges.

REVOKE ALL ON public.visitor_sessions FROM PUBLIC;
REVOKE ALL ON public.visitor_sessions FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.visitor_sessions FROM authenticated;
GRANT SELECT ON public.visitor_sessions TO authenticated;
GRANT ALL ON public.visitor_sessions TO service_role;
GRANT ALL ON public.visitor_sessions TO postgres;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
