-- Migration: Set default author_name to 'Hussain' and update any legacy 'Noman' references
ALTER TABLE public.posts ALTER COLUMN author_name SET DEFAULT 'Hussain';

-- Update any posts that have NULL or 'Noman' author_name
UPDATE public.posts
SET author_name = 'Hussain'
WHERE author_name IS NULL OR author_name ILIKE 'noman';

-- Ensure site_settings default blog_author_name is 'Hussain'
UPDATE public.site_settings
SET value = 'Hussain'
WHERE key = 'blog_author_name' AND (value IS NULL OR value ILIKE 'noman');

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
