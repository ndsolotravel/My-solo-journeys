-- Add category and featured columns to destinations table
ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_destinations_category ON public.destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_featured ON public.destinations(featured) WHERE featured = true;

-- Backfill category from country/region if empty
UPDATE public.destinations
SET category = CASE
  WHEN title ILIKE '%parbat%' OR title ILIKE '%nanga%' THEN 'Mountains'
  WHEN title ILIKE '%karakoram%' OR title ILIKE '%highway%' THEN 'Motorcycle Journeys'
  WHEN title ILIKE '%hunza%' OR title ILIKE '%skardu%' OR title ILIKE '%phander%' THEN 'Trekking'
  WHEN title ILIKE '%base camp%' OR title ILIKE '%concordia%' THEN 'Adventure'
  ELSE 'Cultural Experiences'
END
WHERE category IS NULL;

-- Set featured for most prominent destination if not already set
UPDATE public.destinations
SET featured = true
WHERE (slug = 'k2-base-camp-concordia' OR title ILIKE '%Concordia%')
  AND featured = false;

-- Grant permissions
GRANT SELECT ON public.destinations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;

NOTIFY pgrst, 'reload schema';
