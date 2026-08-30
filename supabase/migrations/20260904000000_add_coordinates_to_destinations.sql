-- Migration: Add latitude and longitude to destinations table and seed Concordia coordinates
-- Date: 2026-09-04

-- 1. Add coordinates columns to public.destinations table
ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION NULL,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION NULL;

-- 2. Populate initial coordinates for existing destinations where NULL
UPDATE public.destinations
SET latitude = 36.1667, longitude = 72.9333
WHERE (slug = 'phander-valley' OR title ILIKE '%Phander%') AND latitude IS NULL;

UPDATE public.destinations
SET latitude = 35.9200, longitude = 74.3100
WHERE (slug = 'karakoram-highway' OR title ILIKE '%Karakoram Highway%') AND latitude IS NULL;

UPDATE public.destinations
SET latitude = 35.2971, longitude = 75.6333
WHERE (slug = 'skardu-autumn' OR slug = 'skardu' OR title ILIKE '%Skardu%') AND latitude IS NULL;

UPDATE public.destinations
SET latitude = 35.2375, longitude = 74.5890
WHERE (slug = 'nanga-parbat-base-camp' OR title ILIKE '%Nanga Parbat%') AND latitude IS NULL;

UPDATE public.destinations
SET latitude = 36.3167, longitude = 74.6500
WHERE (slug = 'hunza-valley' OR title ILIKE '%Hunza%') AND latitude IS NULL;

-- 3. Ensure "K2 Base Camp, Concordia" destination exists with Concordia coordinates
DO $$
DECLARE
  v_dest_id UUID;
  v_post_id UUID;
BEGIN
  SELECT id INTO v_dest_id FROM public.destinations WHERE title = 'K2 Base Camp, Concordia' LIMIT 1;
  
  IF v_dest_id IS NULL THEN
    INSERT INTO public.destinations (
      title,
      slug,
      country,
      region,
      description,
      featured_image,
      latitude,
      longitude,
      published
    ) VALUES (
      'K2 Base Camp, Concordia',
      'k2-base-camp-concordia',
      'Pakistan',
      'Gilgit-Baltistan',
      'Concordia, the throne room of the mountain gods at the confluence of the Baltoro and Godwin-Austen glaciers.',
      NULL,
      35.7444,
      76.5250,
      true
    ) RETURNING id INTO v_dest_id;
  ELSE
    UPDATE public.destinations
    SET
      latitude = COALESCE(latitude, 35.7444),
      longitude = COALESCE(longitude, 76.5250)
    WHERE id = v_dest_id;
  END IF;

  -- Link the K2 post to this destination
  SELECT id INTO v_post_id FROM public.posts WHERE slug = 'k2-base-camp-concordia' OR title ILIKE '%Concordia Diaries%' LIMIT 1;
  IF v_post_id IS NOT NULL AND v_dest_id IS NOT NULL THEN
    UPDATE public.posts
    SET destination_id = v_dest_id
    WHERE id = v_post_id;
  END IF;
END $$;

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
