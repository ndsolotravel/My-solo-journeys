-- Fix is_admin, has_role, and RLS policies across posts, destinations, post_gallery, and storage

-- 1. FIRST drop all policies that depend on public.is_admin()
DROP POLICY IF EXISTS "admin_full_access_posts" ON public.posts;
DROP POLICY IF EXISTS "public_read_published_posts" ON public.posts;
DROP POLICY IF EXISTS "Published posts are public" ON public.posts;
DROP POLICY IF EXISTS "Authors/admins/editors see all" ON public.posts;
DROP POLICY IF EXISTS "Editors/admins manage posts" ON public.posts;

DROP POLICY IF EXISTS "admin_full_access_destinations" ON public.destinations;
DROP POLICY IF EXISTS "public_read_destinations" ON public.destinations;
DROP POLICY IF EXISTS "Destinations public" ON public.destinations;
DROP POLICY IF EXISTS "Editors manage destinations" ON public.destinations;

DROP POLICY IF EXISTS "admin_full_access_gallery" ON public.post_gallery;
DROP POLICY IF EXISTS "public_read_gallery_of_published_posts" ON public.post_gallery;
DROP POLICY IF EXISTS "Public view post_gallery" ON public.post_gallery;
DROP POLICY IF EXISTS "Editors manage post_gallery" ON public.post_gallery;

DROP POLICY IF EXISTS "admin_write_post_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_update_post_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_delete_post_images" ON storage.objects;
DROP POLICY IF EXISTS "public_read_post_images" ON storage.objects;

-- 2. NOW drop the ambiguous 0-argument is_admin function cleanly
DROP FUNCTION IF EXISTS public.is_admin();

-- 3. Recreate canonical has_role with SECURITY DEFINER and explicit search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Recreate canonical is_admin with default parameter, SECURITY DEFINER and search_path
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = COALESCE(_user_id, auth.uid()) AND role = 'admin'::public.app_role
  );
$$;

-- Grant execute to authenticated and anon so RLS evaluation never throws 42501
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated, anon;

-- Restore execute privileges for public-facing RPC functions
GRANT EXECUTE ON FUNCTION public.newsletter_subscribe(TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_public_hit_stats() TO authenticated, anon;

-- Ensure trigger functions have SECURITY DEFINER and immutable search_path
ALTER FUNCTION public.sync_post_to_photos() SECURITY DEFINER SET search_path = public;
ALTER FUNCTION public.sync_destination_to_photos() SECURITY DEFINER SET search_path = public;

-- 5. Restore strict, clean RLS policies on public.posts
CREATE POLICY "Published posts are public"
  ON public.posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authors/admins/editors see all"
  ON public.posts FOR SELECT
  TO authenticated
  USING (
    auth.uid() = author_id OR
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  );

CREATE POLICY "Editors/admins manage posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  );

-- 6. Restore strict, clean RLS policies on public.destinations
CREATE POLICY "Destinations public"
  ON public.destinations FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Editors manage destinations"
  ON public.destinations FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  );

-- 7. Restore strict, clean RLS policies on public.post_gallery
CREATE POLICY "Public view post_gallery"
  ON public.post_gallery FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.posts
      WHERE posts.id = post_gallery.post_id AND posts.published = true
    )
  );

CREATE POLICY "Editors manage post_gallery"
  ON public.post_gallery FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role) OR
    public.has_role(auth.uid(), 'editor'::public.app_role)
  );

-- 8. Clean up storage.objects policies to restrict modifications strictly to authenticated editors/admins
CREATE POLICY "public_read_post_images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'post-images');

CREATE POLICY "admin_write_post_images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-images' AND (
      public.has_role(auth.uid(), 'admin'::public.app_role) OR
      public.has_role(auth.uid(), 'editor'::public.app_role)
    )
  );

CREATE POLICY "admin_update_post_images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND (
      public.has_role(auth.uid(), 'admin'::public.app_role) OR
      public.has_role(auth.uid(), 'editor'::public.app_role)
    )
  );

CREATE POLICY "admin_delete_post_images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND (
      public.has_role(auth.uid(), 'admin'::public.app_role) OR
      public.has_role(auth.uid(), 'editor'::public.app_role)
    )
  );
