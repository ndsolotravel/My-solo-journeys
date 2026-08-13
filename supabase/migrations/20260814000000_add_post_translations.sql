-- Database Structure for Multilingual Blog Posts in NDSOLOTRAVEL
-- Enables storing translated titles, excerpts, body content, and SEO metadata per language.

CREATE TABLE IF NOT EXISTS public.post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, language_code)
);

CREATE INDEX IF NOT EXISTS post_translations_post_id_lang_idx 
  ON public.post_translations (post_id, language_code);

-- Grant permissions
GRANT SELECT ON public.post_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_translations TO authenticated;
GRANT ALL ON public.post_translations TO service_role;

-- Row Level Security
ALTER TABLE public.post_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'post_translations' AND policyname = 'Post translations viewable by everyone') THEN
    CREATE POLICY "Post translations viewable by everyone" ON public.post_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'post_translations' AND policyname = 'Editors manage post translations') THEN
    CREATE POLICY "Editors manage post translations" ON public.post_translations FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;
