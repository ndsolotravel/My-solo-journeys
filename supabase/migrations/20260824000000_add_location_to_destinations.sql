-- Migration: Add location column to public.destinations
-- Keeps full backward compatibility with country and region columns

ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS location TEXT NULL;

-- Ensure country is optional or defaulted for future flexibility
DO $$
BEGIN
  ALTER TABLE public.destinations ALTER COLUMN country DROP NOT NULL;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
