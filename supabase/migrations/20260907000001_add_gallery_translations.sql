-- Gallery Translations for Multilingual Support
-- Enables storing translated title, story, caption, category, location per language.

CREATE TABLE IF NOT EXISTS public.gallery_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES public.gallery(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT,
  story TEXT,
  caption TEXT,
  category TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(gallery_id, language_code)
);

CREATE INDEX IF NOT EXISTS gallery_translations_gallery_id_lang_idx
  ON public.gallery_translations (gallery_id, language_code);

GRANT SELECT ON public.gallery_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_translations TO authenticated;
GRANT ALL ON public.gallery_translations TO service_role;

ALTER TABLE public.gallery_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_translations' AND policyname = 'Gallery translations viewable by everyone') THEN
    CREATE POLICY "Gallery translations viewable by everyone" ON public.gallery_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_translations' AND policyname = 'Editors manage gallery translations') THEN
    CREATE POLICY "Editors manage gallery translations" ON public.gallery_translations FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;