-- Migration: Public Hit Counter stats RPC (real numbers for the home page cards).
--
-- SECURITY DEFINER + granted to anon so the public homepage can read real
-- aggregates without exposing rows or needing a service-role key. The function
-- only returns aggregate counts (no PII / no row data).

CREATE OR REPLACE FUNCTION public.get_public_hit_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
END; $$;

GRANT EXECUTE ON FUNCTION public.get_public_hit_stats() TO anon, authenticated;
