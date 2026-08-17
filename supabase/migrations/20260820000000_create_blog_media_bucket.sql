-- Migration: Create and configure blog-media storage bucket for Blog & Gallery pictures
-- This ensures the blog-media bucket exists with proper RLS policies and public visibility.
-- NOTE: Never alter ownership or structure of internal Supabase storage tables (storage.objects / storage.buckets).

-- 1. Insert/Update the bucket record in storage.buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-media',
  'blog-media',
  true,
  8388608, -- 8 MB maximum file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 8388608,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

-- 2. Public read policy for blog-media files in storage.objects
DROP POLICY IF EXISTS "Blog media publicly readable" ON storage.objects;
CREATE POLICY "Blog media publicly readable" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-media');

-- 3. Authenticated Admins and Editors upload policy for blog-media in storage.objects
DROP POLICY IF EXISTS "Editors upload blog media" ON storage.objects;
CREATE POLICY "Editors upload blog media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

-- 4. Authenticated Admins and Editors update policy for blog-media in storage.objects
DROP POLICY IF EXISTS "Editors update blog media" ON storage.objects;
CREATE POLICY "Editors update blog media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

-- 5. Authenticated Admins and Editors delete policy for blog-media in storage.objects
DROP POLICY IF EXISTS "Editors delete blog media" ON storage.objects;
CREATE POLICY "Editors delete blog media" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );
