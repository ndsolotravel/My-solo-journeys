-- ============================================================================
-- Migration: Create Categories Table and Link to Posts
-- Description: Adds a normalized category management system for NDSOLOTRAVEL.
-- ============================================================================

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  display_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Add category_id foreign key column to posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'posts' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE public.posts
      ADD COLUMN category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3. Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for categories
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
CREATE POLICY "Public can view active categories"
  ON public.categories
  FOR SELECT
  USING (status = 'active' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins and editors have full access to categories" ON public.categories;
CREATE POLICY "Admins and editors have full access to categories"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('admin'::public.app_role, 'editor'::public.app_role)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('admin'::public.app_role, 'editor'::public.app_role)
    )
  );

-- 5. Pre-seed default categories
INSERT INTO public.categories (name, slug, description, image_url, display_order, status)
VALUES
  ('Solo Travel', 'solo-travel', 'Independent expeditions, solo mindset, and journeys into remote frontiers.', NULL, 1, 'active'),
  ('Motorcycle Journeys', 'motorcycle-journeys', 'Long-distance motorcycle adventures, mountain passes, and highway diaries.', NULL, 2, 'active'),
  ('Trekking', 'trekking', 'High-altitude trails, base camps, glaciers, and wilderness hiking expeditions.', NULL, 3, 'active'),
  ('Travel Guides', 'travel-guides', 'Honest, detailed route guides, logistics, permits, and preparation advice.', NULL, 4, 'active'),
  ('Destinations', 'destinations', 'Alpine valleys, base camps, and remote frontier settlements across Pakistan.', NULL, 5, 'active'),
  ('Adventure', 'adventure', 'Off-the-beaten-path expeditions and wild frontier crossings.', NULL, 6, 'active'),
  ('Photography', 'photography', 'Visual dispatches, landscape photography, and light from high altitudes.', NULL, 7, 'active'),
  ('Field Notes', 'field-notes', 'Raw observations, reflections, and thoughts recorded on the road.', NULL, 8, 'active'),
  ('Budget Travel', 'budget-travel', 'Cost breakdowns, local stays, and practical budget tips for mountain travel.', NULL, 9, 'active'),
  ('Nanga Parbat', 'nanga-parbat', 'Expeditions, base camps, and stories around the Killer Mountain.', NULL, 10, 'active'),
  ('Motorcycle Adventure Travel', 'motorcycle-adventure-travel', 'Solo motorcycle expeditions through high mountain passes.', NULL, 11, 'active')
ON CONFLICT (name) DO NOTHING;

-- 6. Backfill posts.category_id matching existing category names
UPDATE public.posts p
SET category_id = c.id
FROM public.categories c
WHERE LOWER(TRIM(p.category)) = LOWER(TRIM(c.name))
  AND p.category_id IS NULL;
