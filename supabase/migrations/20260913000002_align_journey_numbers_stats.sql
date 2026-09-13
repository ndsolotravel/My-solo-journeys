-- Migration: Align "Journey in Numbers" stats so the CMS and the homepage
-- stay synchronized with a single authoritative source of truth (public.site_settings).

INSERT INTO public.site_settings (key, value, description, updated_at)
VALUES
  ('homepage_stat_countries_mode', 'manual', 'Countries Covered in Blogs source: "auto" = computed from published story locations, "manual" = fixed number set by the admin', now()),
  ('homepage_stat_countries', '27', 'Manual Countries Covered in Blogs number used when homepage_stat_countries_mode = "manual"', now()),
  ('homepage_stat_trips', '102', 'Solo motorcycle trips count', now()),
  ('homepage_stat_trips_suffix', '+', 'Solo motorcycle trips suffix', now()),
  ('homepage_stat_photos', '200', 'Photos captured count', now()),
  ('homepage_stat_photos_suffix', 'K+', 'Photos captured suffix', now()),
  ('homepage_stat_kilometres', '18420', 'Kilometres travelled count', now()),
  ('homepage_stat_kilometres_suffix', 'km', 'Kilometres travelled suffix', now()),
  ('homepage_stat_days', '142', 'Days on the road count', now()),
  ('homepage_stat_days_suffix', '+', 'Days on the road suffix', now())
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    description = EXCLUDED.description,
    updated_at = EXCLUDED.updated_at;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';