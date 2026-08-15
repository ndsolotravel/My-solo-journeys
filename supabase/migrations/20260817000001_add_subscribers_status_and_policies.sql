-- Migration: Add status column and Admin RLS policies to public.subscribers

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';

CREATE INDEX IF NOT EXISTS subscribers_email_idx ON public.subscribers (email);
CREATE INDEX IF NOT EXISTS subscribers_subscribed_at_idx ON public.subscribers (subscribed_at DESC);
CREATE INDEX IF NOT EXISTS subscribers_status_idx ON public.subscribers (status);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscribers' AND policyname = 'Admins view subscribers') THEN
    CREATE POLICY "Admins view subscribers" ON public.subscribers
      FOR SELECT TO authenticated
      USING (
        public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'editor'::public.app_role)
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscribers' AND policyname = 'Admins update subscribers') THEN
    CREATE POLICY "Admins update subscribers" ON public.subscribers
      FOR UPDATE TO authenticated
      USING (
        public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'editor'::public.app_role)
      )
      WITH CHECK (
        public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'editor'::public.app_role)
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscribers' AND policyname = 'Admins delete subscribers') THEN
    CREATE POLICY "Admins delete subscribers" ON public.subscribers
      FOR DELETE TO authenticated
      USING (
        public.is_admin(auth.uid()) OR public.has_role(auth.uid(), 'editor'::public.app_role)
      );
  END IF;
END $$;

GRANT SELECT, UPDATE, DELETE ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;
