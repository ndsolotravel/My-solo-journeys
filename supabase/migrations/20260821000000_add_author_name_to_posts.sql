-- Migration: Add author_name to posts table
-- Allows editing the post author directly from the CMS while defaulting to 'Noman' for existing and new posts.

ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Noman';

-- Backfill existing posts that have NULL author_name
UPDATE public.posts SET author_name = 'Noman' WHERE author_name IS NULL;
