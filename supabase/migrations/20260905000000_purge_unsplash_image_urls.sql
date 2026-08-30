-- ============================================================================
-- Migration: Purge Unsplash image URLs from existing CMS data
-- Description: Removes all Unsplash-hosted image references from stored rows
-- so no Unsplash image can ever be served by the site. Values are emptied to
-- NULL (or "" inside stored settings JSON) — the UI already renders a dark
-- placeholder when an image is missing, and the central resolveMediaUrl()
-- filter in src/lib/media.ts blocks any future Unsplash URL.
-- ============================================================================

-- 1. Destinations
UPDATE public.destinations
SET featured_image = NULL
WHERE featured_image ILIKE '%unsplash%';

-- 2. Posts (cover, og, author)
UPDATE public.posts
SET cover_image = NULL
WHERE cover_image ILIKE '%unsplash%';

UPDATE public.posts
SET og_image_url = NULL
WHERE og_image_url ILIKE '%unsplash%';

UPDATE public.posts
SET author_image_url = NULL
WHERE author_image_url ILIKE '%unsplash%';

-- 3. Post gallery (delete entries with unsplash images since image_url is NOT NULL)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'post_gallery'
  ) THEN
    DELETE FROM public.post_gallery
    WHERE image_url ILIKE '%unsplash%';
  END IF;
END $$;

-- 4. Gallery (delete legacy mock rows since image_url is NOT NULL)
DELETE FROM public.gallery
WHERE image_url ILIKE '%unsplash%';

-- 5. News
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'news'
  ) THEN
    UPDATE public.news
    SET image_url = NULL
    WHERE image_url ILIKE '%unsplash%';
  END IF;
END $$;

-- 6. Categories
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'categories'
  ) THEN
    UPDATE public.categories
    SET image_url = NULL
    WHERE image_url ILIKE '%unsplash%';
  END IF;
END $$;

-- 7. Legal pages
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'legal_pages'
  ) THEN
    UPDATE public.legal_pages
    SET hero_image = NULL
    WHERE hero_image ILIKE '%unsplash%';
  END IF;
END $$;

-- 8. Profiles (avatar)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) THEN
    UPDATE public.profiles
    SET avatar_url = NULL
    WHERE avatar_url ILIKE '%unsplash%';
  END IF;
END $$;

-- 9. Site settings (plain TEXT values, or JSON text such as homepage hero
--    slide objects with a "src" key). The regex removes the full Unsplash URL
--    (including surrounding JSON quotes where present), leaving "" / empty.
UPDATE public.site_settings
SET value = regexp_replace(
      value,
      'https://(?:images\.)?unsplash(?:-photos)?\.com/[^"'']+',
      '',
      'g'
    )
WHERE value ILIKE '%unsplash%';

-- 10. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';