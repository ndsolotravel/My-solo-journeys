-- Migration: Add ip_hash, subject, status columns and permissions to public.contact_messages

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Add status check constraint safely if it does not already exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_messages_status_check'
  ) THEN
    ALTER TABLE public.contact_messages
      ADD CONSTRAINT contact_messages_status_check
      CHECK (status IN ('new','read','replied'));
  END IF;
END $$;

-- Ensure table permissions for anon, authenticated, and service_role
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

-- Ensure RLS is enabled and "Anyone can send a message" policy exists
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Anyone can send a message') THEN
    CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Create index on ip_hash and created_at for fast rate-limiting queries
CREATE INDEX IF NOT EXISTS contact_messages_ip_hash_created_at_idx ON public.contact_messages (ip_hash, created_at DESC);

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
