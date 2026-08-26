-- Migration: Unify messages table schema, columns, constraints, triggers, indexes, and RLS policies
-- Target: public.messages
-- Fields:
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   subject text,
--   message text not null,
--   status text not null default 'new' (check: 'new', 'read', 'replied'),
--   is_read boolean not null default false,
--   created_at timestamptz not null default now(),
--   updated_at timestamptz not null default now()

-- 1. Ensure public.messages table exists with all standard columns
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Safely add missing columns to public.messages if table already existed
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 3. Check constraint for valid status values ('new', 'read', 'replied')
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'messages_status_check'
  ) THEN
    ALTER TABLE public.messages
      ADD CONSTRAINT messages_status_check CHECK (status IN ('new', 'read', 'replied'));
  END IF;
END $$;

-- 4. Automatic field synchronizer & timestamp trigger
CREATE OR REPLACE FUNCTION public.sync_messages_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Synchronize is_read with status
  IF NEW.status IS NOT NULL THEN
    IF NEW.status IN ('read', 'replied') THEN
      NEW.is_read := true;
    ELSE
      NEW.is_read := false;
    END IF;
  ELSIF NEW.is_read IS NOT NULL THEN
    IF NEW.is_read THEN
      NEW.status := 'read';
    ELSE
      NEW.status := 'new';
    END IF;
  END IF;

  -- Ensure timestamp updates
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_messages_fields ON public.messages;
CREATE TRIGGER trg_sync_messages_fields
  BEFORE INSERT OR UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_messages_fields();

-- 5. Data Preservation: Safely backfill any records from contact_messages into messages
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'contact_messages'
  ) THEN
    INSERT INTO public.messages (id, name, email, subject, message, status, is_read, created_at, updated_at)
    SELECT 
      cm.id,
      cm.name,
      cm.email,
      cm.subject,
      cm.message,
      CASE 
        WHEN cm.status IN ('new', 'read', 'replied') THEN cm.status
        ELSE 'new'
      END,
      CASE 
        WHEN cm.status IN ('read', 'replied') THEN true 
        ELSE false 
      END,
      COALESCE(cm.created_at, now()),
      COALESCE(cm.created_at, now())
    FROM public.contact_messages cm
    WHERE NOT EXISTS (
      SELECT 1 FROM public.messages m 
      WHERE m.id = cm.id
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- 6. Update existing messages rows to ensure consistent status and updated_at
UPDATE public.messages
SET 
  status = CASE WHEN is_read THEN 'read' ELSE 'new' END,
  updated_at = COALESCE(updated_at, created_at, now())
WHERE status IS NULL OR status NOT IN ('new', 'read', 'replied');

-- 7. Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 8. Grant Table Permissions
GRANT INSERT ON public.messages TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

-- 9. Strict RLS Policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.messages;
DROP POLICY IF EXISTS "Public insert messages" ON public.messages;
DROP POLICY IF EXISTS "Admins view messages" ON public.messages;
DROP POLICY IF EXISTS "Admins update messages" ON public.messages;
DROP POLICY IF EXISTS "Admins delete messages" ON public.messages;

-- Policy 1: Public visitor -> INSERT new contact message (anon and authenticated)
CREATE POLICY "Anyone can submit contact messages"
  ON public.messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(message)) > 0
  );

-- Policy 2: Authorized admin -> SELECT messages
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

-- Policy 3: Authorized admin -> UPDATE messages (e.g. status)
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

-- Policy 4: Authorized admin -> DELETE messages
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

-- 10. Performance Indexes
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON public.messages (created_at DESC);
CREATE INDEX IF NOT EXISTS messages_status_idx ON public.messages (status);
CREATE INDEX IF NOT EXISTS messages_is_read_idx ON public.messages (is_read);
CREATE INDEX IF NOT EXISTS messages_email_idx ON public.messages (email);

-- 11. Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
