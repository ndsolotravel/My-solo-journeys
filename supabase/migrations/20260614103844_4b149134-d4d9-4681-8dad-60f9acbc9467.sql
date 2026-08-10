
ALTER TABLE public.comments ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS guest_name text;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS guest_email text;
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS rating smallint;
ALTER TABLE public.comments ADD CONSTRAINT comments_rating_range CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5));

GRANT SELECT, INSERT ON public.comments TO anon;

DROP POLICY IF EXISTS "Auth users create comments" ON public.comments;
CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (user_id IS NULL AND auth.uid() IS NULL)
    OR (auth.uid() = user_id)
  );
