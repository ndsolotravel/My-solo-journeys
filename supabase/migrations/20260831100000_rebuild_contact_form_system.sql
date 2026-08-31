-- Migration: Rebuild Contact Form System
-- Extends messages table, drops legacy contact_messages, updates RLS and triggers

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. EXTEND public.messages TABLE
-- ═══════════════════════════════════════════════════════════════════════════

-- Ensure ip_hash column exists (rate limiting / visitor identification, hashed for privacy)
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS ip_hash text;

-- Add new columns for contact form rebuild
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS read_at timestamptz,
  ADD COLUMN IF NOT EXISTS replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS email_delivery_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_delivery_error text,
  ADD COLUMN IF NOT EXISTS spam_status text NOT NULL DEFAULT 'clean',
  ADD COLUMN IF NOT EXISTS spam_score numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS country text;

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. UPDATE STATUS CHECK CONSTRAINT
-- ═══════════════════════════════════════════════════════════════════════════

-- Drop old constraint and create new one with 'archived' status
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'messages_status_check'
  ) THEN
    ALTER TABLE public.messages DROP CONSTRAINT messages_status_check;
  END IF;
END $$;

ALTER TABLE public.messages
  ADD CONSTRAINT messages_status_check CHECK (status IN ('new', 'read', 'replied', 'archived'));

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. UPDATE SYNC TRIGGER
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.sync_messages_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Synchronize is_read with status
  IF NEW.status IS NOT NULL THEN
    IF NEW.status IN ('read', 'replied', 'archived') THEN
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

  -- Set timestamps on status transitions
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status = 'read' AND OLD.status = 'new' AND NEW.read_at IS NULL THEN
      NEW.read_at := now();
    ELSIF NEW.status = 'replied' AND OLD.status != 'replied' AND NEW.replied_at IS NULL THEN
      NEW.replied_at := now();
    ELSIF NEW.status = 'archived' AND OLD.status != 'archived' AND NEW.archived_at IS NULL THEN
      NEW.archived_at := now();
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

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. UPDATE INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS messages_email_delivery_status_idx ON public.messages (email_delivery_status);
CREATE INDEX IF NOT EXISTS messages_spam_status_idx ON public.messages (spam_status);

-- Ensure rate-limiting indexes exist on ip_hash
CREATE INDEX IF NOT EXISTS messages_ip_hash_idx ON public.messages (ip_hash);
CREATE INDEX IF NOT EXISTS messages_ip_hash_created_at_idx ON public.messages (ip_hash, created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. UPDATE RLS POLICIES
-- ═══════════════════════════════════════════════════════════════════════════

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.messages;
DROP POLICY IF EXISTS "Public insert messages" ON public.messages;
DROP POLICY IF EXISTS "Admins view messages" ON public.messages;
DROP POLICY IF EXISTS "Admins update messages" ON public.messages;
DROP POLICY IF EXISTS "Admins delete messages" ON public.messages;

-- Policy 1: Public visitor can INSERT new contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON public.messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(message)) > 0
  );

-- Policy 2: Admin/editor can SELECT all messages
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

-- Policy 3: Admin/editor can UPDATE messages
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

-- Policy 4: Admin/editor can DELETE messages
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

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. CLEANUP LEGACY TABLES
-- ═══════════════════════════════════════════════════════════════════════════

-- Drop legacy contact_messages table (data was already backfilled in previous migration)
DROP TABLE IF EXISTS public.contact_messages CASCADE;

-- Drop legacy send_contact_message RPC (no longer used; app uses direct insert)
DROP FUNCTION IF EXISTS public.send_contact_message(text, text, text, text, text);

-- ═══════════════════════════════════════════════════════════════════════════
-- 7. REFRESH SCHEMA CACHE
-- ═══════════════════════════════════════════════════════════════════════════

NOTIFY pgrst, 'reload schema';
