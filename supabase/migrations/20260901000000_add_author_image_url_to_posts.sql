-- Migration: Add author_image_url to public.posts
-- Allows uploading and storing an author profile picture per blog post directly from the CMS
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS author_image_url TEXT NULL;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
