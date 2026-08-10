
CREATE POLICY "Blog media publicly readable" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-media');

CREATE POLICY "Editors upload blog media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Editors update blog media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Editors delete blog media" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'blog-media'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );
