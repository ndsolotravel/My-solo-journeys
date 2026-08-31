-- Legal Pages Translations for Multilingual Support
-- Enables storing translated title, content, SEO metadata per language.

CREATE TABLE IF NOT EXISTS public.legal_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_page_id UUID NOT NULL REFERENCES public.legal_pages(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(legal_page_id, language_code)
);

CREATE INDEX IF NOT EXISTS legal_translations_legal_page_id_lang_idx
  ON public.legal_translations (legal_page_id, language_code);

GRANT SELECT ON public.legal_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_translations TO authenticated;
GRANT ALL ON public.legal_translations TO service_role;

ALTER TABLE public.legal_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'legal_translations' AND policyname = 'Legal translations viewable by everyone') THEN
    CREATE POLICY "Legal translations viewable by everyone" ON public.legal_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'legal_translations' AND policyname = 'Editors manage legal translations') THEN
    CREATE POLICY "Editors manage legal translations" ON public.legal_translations FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;