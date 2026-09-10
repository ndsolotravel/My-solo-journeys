-- Migration: Add primary_keyword and secondary_keywords to public.posts
-- Adds editable SEO keyword tracking fields to individual blog posts in CMS
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS primary_keyword TEXT NULL,
  ADD COLUMN IF NOT EXISTS secondary_keywords TEXT NULL;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
