-- Migration: Ensure public.messages table, strict RLS policies, permissions, and indexes
-- Table schema matches exact specification:
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   subject text,
--   message text not null,
--   created_at timestamptz not null default now(),
--   is_read boolean not null default false

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_read boolean NOT NULL DEFAULT false
);

-- Ensure correct columns exist
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Grant table-level permissions to anon, authenticated, and service_role
GRANT INSERT ON public.messages TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

-- 1. Public INSERT policy: Anyone (anon and authenticated) can submit contact messages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Anyone can submit contact messages'
  ) THEN
    CREATE POLICY "Anyone can submit contact messages"
      ON public.messages
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (
        name IS NOT NULL
        AND email IS NOT NULL
        AND message IS NOT NULL
      );
  END IF;
END $$;

-- 2. Admin SELECT policy: Only authenticated admin/editor users can read contact messages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Admins view messages'
  ) THEN
    CREATE POLICY "Admins view messages"
      ON public.messages
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

-- 3. Admin UPDATE policy: Only authenticated admin/editor users can update messages (e.g. mark as read/unread)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Admins update messages'
  ) THEN
    CREATE POLICY "Admins update messages"
      ON public.messages
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
    WHERE tablename = 'messages' AND policyname = 'Admins delete messages'
  ) THEN
    CREATE POLICY "Admins delete messages"
      ON public.messages
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON public.messages (created_at DESC);
CREATE INDEX IF NOT EXISTS messages_is_read_idx ON public.messages (is_read);

-- Reload schema cache
NOTIFY pgrst, 'reload schema';
