-- Migration: Create site_settings table for global CMS configuration
-- Allows managing global settings like blog_author_name securely with RLS

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;

-- 1. Public SELECT Policy: Anyone can read public site settings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'site_settings' AND policyname = 'Public read site_settings'
  ) THEN
    CREATE POLICY "Public read site_settings"
      ON public.site_settings
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- 2. Admin/Editor Management Policy: Only authenticated admins/editors can modify settings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'site_settings' AND policyname = 'Admins manage site_settings'
  ) THEN
    CREATE POLICY "Admins manage site_settings"
      ON public.site_settings
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- 3. Insert default blog_author_name setting
INSERT INTO public.site_settings (key, value, description)
VALUES ('blog_author_name', 'Noman', 'Global author name displayed on blog stories and listings')
ON CONFLICT (key) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
