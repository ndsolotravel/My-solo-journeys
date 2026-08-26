-- Migration: Create public_popup_messages table with RLS and initial configuration
CREATE TABLE IF NOT EXISTS public.public_popup_messages (
  id TEXT PRIMARY KEY DEFAULT 'default',
  title TEXT NOT NULL DEFAULT 'Site Notice & Feedback',
  message TEXT NOT NULL DEFAULT 'This site is under construction and testing. Please suggest any UI/UX changes and report errors. Thanks for visiting ‘ndsolotravel’ Blogs.',
  enabled BOOLEAN NOT NULL DEFAULT true,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.public_popup_messages ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT SELECT ON public.public_popup_messages TO anon, authenticated;
GRANT ALL ON public.public_popup_messages TO service_role;

-- Clean up existing policies if any
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'public_popup_messages' AND policyname = 'Public can view active public message') THEN
    DROP POLICY "Public can view active public message" ON public.public_popup_messages;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'public_popup_messages' AND policyname = 'Admins can manage public message') THEN
    DROP POLICY "Admins can manage public message" ON public.public_popup_messages;
  END IF;
END $$;

-- Policy 1: Public can view active message (and admins can view any message)
CREATE POLICY "Public can view active public message"
  ON public.public_popup_messages FOR SELECT TO public
  USING (
    ((enabled = true OR is_enabled = true) AND now() >= start_at AND now() <= end_at)
    OR (
      auth.uid() IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role IN ('admin', 'editor')
      )
    )
  );

-- Policy 2: Admins and editors can insert, update, and delete
CREATE POLICY "Admins can manage public message"
  ON public.public_popup_messages FOR ALL TO authenticated
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

-- Seed initial row
INSERT INTO public.public_popup_messages (id, title, message, enabled, is_enabled, start_at, end_at)
VALUES (
  'default',
  'Site Notice & Feedback',
  'This site is under construction and testing. Please suggest any UI/UX changes and report errors. Thanks for visiting ‘ndsolotravel’ Blogs.',
  true,
  true,
  now(),
  now() + interval '30 days'
)
ON CONFLICT (id) DO NOTHING;
