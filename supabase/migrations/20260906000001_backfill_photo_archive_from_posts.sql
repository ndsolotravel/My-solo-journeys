-- ============================================================================
-- Migration: Backfill Photography Archive from Post Covers & Content Images
-- Follow-up to 20260906000000_create_photo_archive.sql. The live gallery also
-- derives images from each published post's cover_image and the images inline
-- in post markdown content, so we backfill those into the archive too (with
-- slug + URL de-duplication) to keep the public gallery populated until the
-- admin curates the archive.
-- ============================================================================

-- 1. Backfill post cover images
INSERT INTO public.photos (title, slug, image_url, location, captured_at, alt_text, sort_order, published)
SELECT
  CONCAT(NULLIF(TRIM(p.title), ''), ' — cover') AS title,
  CONCAT(p.slug, '-cover') AS slug,
  p.cover_image,
  NULLIF(TRIM(p.location_name), '') AS location,
  p.travel_date AS captured_at,
  NULLIF(TRIM(p.title), '') AS alt_text,
  (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos) AS sort_order,
  true AS published
FROM public.posts p
WHERE p.published = true
  AND p.cover_image IS NOT NULL
  AND NULLIF(TRIM(p.cover_image), '') IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.photos ph
    WHERE ph.image_url = p.cover_image
  );

-- 2. Backfill images inlined in post markdown content
INSERT INTO public.photos (title, slug, image_url, location, captured_at, alt_text, sort_order, published)
SELECT
  COALESCE(NULLIF(TRIM(md.alt), ''), p.title) AS title,
  CONCAT(p.slug, '-md-', md.rn) AS slug,
  md.url,
  NULLIF(TRIM(p.location_name), '') AS location,
  p.travel_date AS captured_at,
  COALESCE(NULLIF(TRIM(md.alt), ''), '') AS alt_text,
  (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos) + md.rn AS sort_order,
  true AS published
FROM public.posts p
CROSS JOIN LATERAL (
  SELECT
    row_number() OVER () AS rn,
    match[1] AS alt,
    match[2] AS url
  FROM regexp_matches(p.content, '!\[([^\]]*)\]\(([^\)\s]+)\)', 'g') AS match
) md
WHERE p.published = true
  AND NOT EXISTS (
    SELECT 1 FROM public.photos ph
    WHERE ph.image_url = md.url
  );

-- 3. Assign starting categories to backfilled photos (based on post category),
--    skipping photographs that were already categorised by the main migration
INSERT INTO public.photo_category_links (photo_id, category_id)
SELECT DISTINCT ph.id, pc.id
FROM public.photos ph
JOIN public.posts p ON (
  ph.image_url = p.cover_image
  OR p.content LIKE '%' || ph.image_url || '%'
)
JOIN public.photo_categories pc ON pc.slug = CASE
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%motorcycle%' THEN 'motorcycles'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%trek%' THEN 'trekking'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%nanga%' OR LOWER(COALESCE(p.slug, '')) LIKE '%nanga%' THEN 'karakoram'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%karakoram%' OR LOWER(COALESCE(p.slug, '')) LIKE '%karakoram%' THEN 'karakoram'
  ELSE 'mountains'
END
WHERE NOT EXISTS (
  SELECT 1 FROM public.photo_category_links l WHERE l.photo_id = ph.id
)
ON CONFLICT (photo_id, category_id) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';