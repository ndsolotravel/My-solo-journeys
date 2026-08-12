-- Migration: Fix contact_messages RLS policies and public insert access
-- Grants public and anonymous visitors permission to insert contact messages

-- 1. Ensure columns exist safely
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- 2. Grant table permissions to anon, authenticated, and service_role
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

-- 3. Enable RLS and add public INSERT policy
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Anyone can send a message'
  ) THEN
    CREATE POLICY "Anyone can send a message" 
      ON public.contact_messages 
      FOR INSERT 
      WITH CHECK (true);
  END IF;
END $$;

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
