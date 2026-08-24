-- ============================================================================
-- Migration: Create News Table and Row Level Security
-- Description: Adds a comprehensive News & Breaking News management system for NDSOLOTRAVEL.
-- ============================================================================

-- 1. Create news table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_breaking BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Indexes for performance and filtering
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
CREATE INDEX IF NOT EXISTS idx_news_is_breaking ON public.news(is_breaking);
CREATE INDEX IF NOT EXISTS idx_news_is_active ON public.news(is_active);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_expires_at ON public.news(expires_at);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_display_order ON public.news(display_order ASC);

-- Composite partial index for rapid public homepage breaking news queries
CREATE INDEX IF NOT EXISTS idx_news_breaking_public 
  ON public.news (display_order ASC, published_at DESC) 
  WHERE status = 'published' AND is_active = true AND is_breaking = true;

-- 3. Automatic updated_at trigger
DROP TRIGGER IF EXISTS on_news_updated_at ON public.news;
CREATE TRIGGER on_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 5. Permissions
GRANT SELECT ON public.news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;

-- 6. RLS Policies
-- Public SELECT: only active, published news whose publication date has arrived and has not expired
DROP POLICY IF EXISTS "Public can view active published news" ON public.news;
CREATE POLICY "Public can view active published news"
  ON public.news
  FOR SELECT
  USING (
    (status = 'published' AND is_active = true AND published_at <= now() AND (expires_at IS NULL OR expires_at >= now()))
    OR
    (EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('admin'::public.app_role, 'editor'::public.app_role)
    ))
  );

-- Admins and editors full CRUD access
DROP POLICY IF EXISTS "Admins and editors manage news" ON public.news;
CREATE POLICY "Admins and editors manage news"
  ON public.news
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('admin'::public.app_role, 'editor'::public.app_role)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('admin'::public.app_role, 'editor'::public.app_role)
    )
  );
