-- Migration: Create and configure blog-media storage bucket for Blog & Gallery pictures
-- This ensures blog-media bucket exists with proper RLS policies and public visibility for web viewing

-- 1. Create the bucket in storage.buckets if missing
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

-- 2. Allow authenticated admins to manage storage.buckets if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'buckets' 
      AND schemaname = 'storage' 
      AND policyname = 'Admins manage buckets'
  ) THEN
    CREATE POLICY "Admins manage buckets" ON storage.buckets
      FOR ALL TO authenticated
      USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
      WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
  END IF;
END $$;

-- 3. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Public can view/read images from blog-media bucket
DROP POLICY IF EXISTS "Blog media publicly readable" ON storage.objects;
CREATE POLICY "Blog media publicly readable" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-media');

-- 5. Authenticated Admins and Editors can upload to blog-media bucket
DROP POLICY IF EXISTS "Editors upload blog media" ON storage.objects;
CREATE POLICY "Editors upload blog media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

-- 6. Authenticated Admins and Editors can update blog-media files
DROP POLICY IF EXISTS "Editors update blog media" ON storage.objects;
CREATE POLICY "Editors update blog media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

-- 7. Authenticated Admins and Editors can delete blog-media files
DROP POLICY IF EXISTS "Editors delete blog media" ON storage.objects;
CREATE POLICY "Editors delete blog media" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );
