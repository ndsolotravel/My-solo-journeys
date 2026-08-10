
-- 1. Add scheduling to posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;
CREATE INDEX IF NOT EXISTS posts_scheduled_at_idx ON public.posts(scheduled_at) WHERE published = false AND scheduled_at IS NOT NULL;

-- 2. Admin/editor visibility on contact_messages & subscribers (for dashboard)
CREATE POLICY "Admins view contact messages" ON public.contact_messages
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins delete contact messages" ON public.contact_messages
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins view subscribers" ON public.subscribers
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- 3. Admin moderation of comments
CREATE POLICY "Admins delete any comment" ON public.comments
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- 4. Auto-publish scheduled posts function (called by pg_cron)
CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected integer;
BEGIN
  UPDATE public.posts
  SET published = true,
      published_at = COALESCE(published_at, scheduled_at, now()),
      updated_at = now()
  WHERE published = false
    AND scheduled_at IS NOT NULL
    AND scheduled_at <= now();
  GET DIAGNOSTICS affected = ROW_COUNT;
  RETURN affected;
END;
$$;

-- 5. Schedule it every minute via pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'publish-scheduled-posts') THEN
    PERFORM cron.unschedule('publish-scheduled-posts');
  END IF;
  PERFORM cron.schedule('publish-scheduled-posts', '* * * * *', $cron$SELECT public.publish_scheduled_posts();$cron$);
END $$;
