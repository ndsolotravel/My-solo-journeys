-- Migration: Create about_pages table for dedicated About Page CMS Management
-- Supports public reading of published About page and authorized admin/editor modifications.

CREATE TABLE IF NOT EXISTS public.about_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL DEFAULT 'about',
  hero_label TEXT NOT NULL DEFAULT 'About',
  hero_headline TEXT NOT NULL DEFAULT 'Solo, slow, and almost always uphill.',
  hero_image TEXT DEFAULT 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80',
  hero_image_alt TEXT DEFAULT 'Traveller on a mountain ridge',
  profile_image TEXT DEFAULT '/nd-about.jpg',
  profile_image_alt TEXT DEFAULT 'ndsolotravel portrait',
  biography_intro TEXT DEFAULT 'Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.',
  biography_content TEXT NOT NULL DEFAULT '',
  philosophy_title TEXT NOT NULL DEFAULT 'Travel philosophy',
  philosophy_quote TEXT NOT NULL DEFAULT 'Solo travel is where the journey becomes the destination',
  philosophy_description TEXT DEFAULT 'Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond. Trekking guides, motorcycle adventures, and travel photography.',
  seo_title TEXT DEFAULT 'About — ndsolotravel',
  seo_description TEXT DEFAULT 'About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person.',
  og_image TEXT DEFAULT 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80',
  og_title TEXT DEFAULT 'About — ndsolotravel',
  og_description TEXT DEFAULT 'About the solo traveller behind ndsolotravel.',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.about_pages ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT ON public.about_pages TO anon, authenticated;
GRANT ALL ON public.about_pages TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.about_pages TO authenticated;

-- Public SELECT Policy: Anyone can read published about page
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'about_pages' AND policyname = 'Public read published about_pages'
  ) THEN
    CREATE POLICY "Public read published about_pages"
      ON public.about_pages
      FOR SELECT
      TO anon, authenticated
      USING (published = true);
  END IF;
END $$;

-- Admin/Editor Management Policy: Only authenticated admins/editors can modify
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'about_pages' AND policyname = 'Admins manage about_pages'
  ) THEN
    CREATE POLICY "Admins manage about_pages"
      ON public.about_pages
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- Seed default published row if not already present
INSERT INTO public.about_pages (
  slug,
  hero_label,
  hero_headline,
  hero_image,
  hero_image_alt,
  profile_image,
  profile_image_alt,
  biography_intro,
  biography_content,
  philosophy_title,
  philosophy_quote,
  philosophy_description,
  seo_title,
  seo_description,
  published
) VALUES (
  'about',
  'About',
  'Solo, slow, and almost always uphill.',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80',
  'Traveller on a mountain ridge',
  '/nd-about.jpg',
  'ndsolotravel portrait',
  'Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.',
  E'I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected.\n\nFor me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends.\n\nThrough NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way.\n\nI believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled.\n\nTravel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life.',
  'Travel philosophy',
  'Solo travel is where the journey becomes the destination',
  'Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond. Trekking guides, motorcycle adventures, and travel photography.',
  'About — ndsolotravel',
  'About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person.',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
