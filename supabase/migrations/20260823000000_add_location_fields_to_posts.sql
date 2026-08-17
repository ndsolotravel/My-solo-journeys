-- Migration: Add location_name, latitude, longitude to public.posts
-- Enables saving map location data for blog stories non-destructively

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS location_name TEXT NULL,
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION NULL,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION NULL;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
