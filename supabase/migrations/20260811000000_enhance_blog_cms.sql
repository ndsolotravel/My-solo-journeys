-- Migration: Enhance Blog CMS with per-post gallery, SEO fields, travel date, and destination linkage

-- 1. Add missing columns to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS travel_date DATE;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS og_image_url TEXT;

CREATE INDEX IF NOT EXISTS posts_destination_id_idx ON public.posts(destination_id);

-- 2. Create post_gallery table
CREATE TABLE IF NOT EXISTS public.post_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS post_gallery_post_id_idx ON public.post_gallery(post_id, sort_order ASC);

-- 3. Grants and RLS for post_gallery
GRANT SELECT ON public.post_gallery TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_gallery TO authenticated;
GRANT ALL ON public.post_gallery TO service_role;

ALTER TABLE public.post_gallery ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'post_gallery' AND policyname = 'Public view post_gallery'
  ) THEN
    CREATE POLICY "Public view post_gallery" ON public.post_gallery
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.posts p
          WHERE p.id = post_gallery.post_id AND p.published = true
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'post_gallery' AND policyname = 'Editors manage post_gallery'
  ) THEN
    CREATE POLICY "Editors manage post_gallery" ON public.post_gallery
      FOR ALL TO authenticated
      USING (
        public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
      )
      WITH CHECK (
        public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
      );
  END IF;
END $$;
