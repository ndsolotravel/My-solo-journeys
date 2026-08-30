-- ============================================================================
-- Migration: Create Photography Archive (photo gallery) for NDSOLOTRAVEL
-- Turns the gallery into a genuine photography archive with dedicated
-- tables, metadata (title, location, date, story, camera, alt text),
-- browsable categories, proper RLS, and a backfill of existing post-gallery
-- images so the public gallery remains populated.
-- ============================================================================

-- 1. Photo Categories (taxonomy)
CREATE TABLE IF NOT EXISTS public.photo_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Photos (the archive itself)
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  location TEXT,
  captured_at DATE,
  story TEXT,
  camera TEXT,
  alt_text TEXT NOT NULL DEFAULT '',
  width INTEGER,
  height INTEGER,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Photo <-> Category links (many-to-many)
CREATE TABLE IF NOT EXISTS public.photo_category_links (
  photo_id UUID NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.photo_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (photo_id, category_id)
);

CREATE INDEX IF NOT EXISTS photo_categories_display_order_idx ON public.photo_categories (display_order ASC);
CREATE INDEX IF NOT EXISTS photos_published_sort_idx ON public.photos (published, sort_order ASC);
CREATE INDEX IF NOT EXISTS photos_slug_idx ON public.photos (slug);
CREATE INDEX IF NOT EXISTS photos_captured_at_idx ON public.photos (captured_at DESC);
CREATE INDEX IF NOT EXISTS photo_category_links_category_idx ON public.photo_category_links (category_id);
CREATE INDEX IF NOT EXISTS photo_category_links_photo_idx ON public.photo_category_links (photo_id);

-- 4. updated_at triggers (reuses the shared set_updated_at() helper)
DROP TRIGGER IF EXISTS photos_updated_at ON public.photos;
CREATE TRIGGER photos_updated_at BEFORE UPDATE ON public.photos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS photo_categories_updated_at ON public.photo_categories;
CREATE TRIGGER photo_categories_updated_at BEFORE UPDATE ON public.photo_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5. Grants (expose to the Data API, mirroring repo conventions)
GRANT SELECT ON public.photo_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_categories TO authenticated;
GRANT ALL ON public.photo_categories TO service_role;

GRANT SELECT ON public.photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos TO authenticated;
GRANT ALL ON public.photos TO service_role;

GRANT SELECT ON public.photo_category_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_category_links TO authenticated;
GRANT ALL ON public.photo_category_links TO service_role;

-- 6. Row Level Security
ALTER TABLE public.photo_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_category_links ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photos' AND policyname = 'Public view photos') THEN
    CREATE POLICY "Public view photos" ON public.photos FOR SELECT USING (published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photos' AND policyname = 'Editors manage photos') THEN
    CREATE POLICY "Editors manage photos" ON public.photos FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photo_categories' AND policyname = 'Public view photo categories') THEN
    CREATE POLICY "Public view photo categories" ON public.photo_categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photo_categories' AND policyname = 'Editors manage photo categories') THEN
    CREATE POLICY "Editors manage photo categories" ON public.photo_categories FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photo_category_links' AND policyname = 'Public view photo_category_links') THEN
    CREATE POLICY "Public view photo_category_links" ON public.photo_category_links FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.photos p WHERE p.id = photo_category_links.photo_id AND p.published = true)
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photo_category_links' AND policyname = 'Editors manage photo_category_links') THEN
    CREATE POLICY "Editors manage photo_category_links" ON public.photo_category_links FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;

-- 7. Seed photo categories
INSERT INTO public.photo_categories (name, slug, description, display_order)
VALUES
  ('Mountains',   'mountains',   'Summits, massifs, and ridges shaped by altitude, weather, and time.', 1),
  ('Motorcycles', 'motorcycles', 'The machines themselves — rigs, mud-caked fenders, and roadside repairs.', 2),
  ('Roads',       'roads',       'Paved and unpaved lines through valleys, passes, and deserts.', 3),
  ('People',      'people',      'Communities, riders, porters, and faces met along the way.', 4),
  ('Villages',    'villages',    'Remote settlements, stone houses, and life above the treeline.', 5),
  ('Trekking',    'trekking',    'Trails, camps, glaciers, and crossings on foot.', 6),
  ('Karakoram',   'karakoram',   'The Karakoram Range — K2, Concordia, Nanga Parbat, and beyond.', 7),
  ('Pakistan',    'pakistan',    'The wider country — highways, valleys, cities, and frontiers.', 8)
ON CONFLICT (slug) DO NOTHING;

-- 8. Backfill the archive with existing published post-gallery photos
INSERT INTO public.photos (title, slug, image_url, location, captured_at, alt_text, sort_order, published)
SELECT
  COALESCE(NULLIF(TRIM(pg.alt_text), ''), p.title, 'Gallery photo') AS title,
  CONCAT(p.slug, '-photo-', LEFT(pg.id::text, 8)) AS slug,
  pg.image_url,
  NULLIF(TRIM(p.location_name), '') AS location,
  p.travel_date AS captured_at,
  COALESCE(NULLIF(TRIM(pg.alt_text), ''), '') AS alt_text,
  pg.sort_order,
  true AS published
FROM public.post_gallery pg
JOIN public.posts p ON p.id = pg.post_id
WHERE p.published = true;

-- 9. Assign a sensible starting category to backfilled photos
--    (editors can refine afterwards via the Gallery CMS)
INSERT INTO public.photo_category_links (photo_id, category_id)
SELECT ph.id, pc.id
FROM public.photos ph
JOIN public.post_gallery pg ON pg.image_url = ph.image_url
JOIN public.posts p ON p.id = pg.post_id
JOIN public.photo_categories pc ON pc.slug = CASE
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%motorcycle%' THEN 'motorcycles'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%trek%' THEN 'trekking'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%nanga%' OR LOWER(COALESCE(p.slug, '')) LIKE '%nanga%' THEN 'karakoram'
  WHEN LOWER(COALESCE(p.category, '')) LIKE '%karakoram%' OR LOWER(COALESCE(p.slug, '')) LIKE '%karakoram%' THEN 'karakoram'
  ELSE 'mountains'
END
ON CONFLICT (photo_id, category_id) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';