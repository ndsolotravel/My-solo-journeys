
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS ip_hash text;

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_status_check;
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_status_check
  CHECK (status IN ('new','read','replied'));

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON public.contact_messages (status);

DROP POLICY IF EXISTS "Admins update contact messages" ON public.contact_messages;
CREATE POLICY "Admins update contact messages" ON public.contact_messages
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));
