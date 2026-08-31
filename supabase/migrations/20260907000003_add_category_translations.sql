-- Category Translations for Multilingual Support
-- Enables storing translated category name per language.

CREATE TABLE IF NOT EXISTS public.category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(category_id, language_code)
);

CREATE INDEX IF NOT EXISTS category_translations_category_id_lang_idx
  ON public.category_translations (category_id, language_code);

GRANT SELECT ON public.category_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_translations TO authenticated;
GRANT ALL ON public.category_translations TO service_role;

ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'category_translations' AND policyname = 'Category translations viewable by everyone') THEN
    CREATE POLICY "Category translations viewable by everyone" ON public.category_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'category_translations' AND policyname = 'Editors manage category translations') THEN
    CREATE POLICY "Editors manage category translations" ON public.category_translations FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;