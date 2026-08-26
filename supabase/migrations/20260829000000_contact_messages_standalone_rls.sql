-- Migration: Ensure contact_messages table, strict RLS policies, permissions, and indexes
-- Table schema:
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   subject text,
--   message text not null,
--   ip_hash text,
--   status text not null default 'new',
--   created_at timestamptz not null default now()

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  ip_hash text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ensure all required columns exist safely
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Grant table-level permissions
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

-- 1. Public INSERT policy: Anyone (anon and authenticated) can insert contact messages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Anyone can send a contact message'
  ) THEN
    CREATE POLICY "Anyone can send a contact message"
      ON public.contact_messages
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
        length(trim(name)) > 0
        AND length(trim(email)) > 0
        AND length(trim(message)) > 0
      );
  END IF;
END $$;

-- 2. Admin SELECT policy: Only authenticated admin/editor users can read contact messages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Admins view contact messages'
  ) THEN
    CREATE POLICY "Admins view contact messages"
      ON public.contact_messages
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- 3. Admin UPDATE policy: Only authenticated admin/editor users can update message status
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Admins update contact messages'
  ) THEN
    CREATE POLICY "Admins update contact messages"
      ON public.contact_messages
      FOR UPDATE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- 4. Admin DELETE policy: Only authenticated admin/editor users can delete messages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Admins delete contact messages'
  ) THEN
    CREATE POLICY "Admins delete contact messages"
      ON public.contact_messages
      FOR DELETE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- Indexes for efficient queries and filtering
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS contact_messages_ip_hash_created_at_idx ON public.contact_messages (ip_hash, created_at DESC);

-- Reload schema cache
NOTIFY pgrst, 'reload schema';
