-- Destination Translations for Multilingual Support
-- Enables storing translated title, description, country, region per language.

CREATE TABLE IF NOT EXISTS public.destination_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  country TEXT NOT NULL,
  region TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(destination_id, language_code)
);

CREATE INDEX IF NOT EXISTS destination_translations_destination_id_lang_idx
  ON public.destination_translations (destination_id, language_code);

GRANT SELECT ON public.destination_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destination_translations TO authenticated;
GRANT ALL ON public.destination_translations TO service_role;

ALTER TABLE public.destination_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'destination_translations' AND policyname = 'Destination translations viewable by everyone') THEN
    CREATE POLICY "Destination translations viewable by everyone" ON public.destination_translations FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'destination_translations' AND policyname = 'Editors manage destination translations') THEN
    CREATE POLICY "Editors manage destination translations" ON public.destination_translations FOR ALL TO authenticated USING (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    ) WITH CHECK (
      public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
    );
  END IF;
END $$;