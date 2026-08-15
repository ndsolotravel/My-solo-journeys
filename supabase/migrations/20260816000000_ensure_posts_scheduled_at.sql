-- Migration: Ensure posts.scheduled_at exists
-- The earlier 20260614154541 migration is recorded as applied but the live
-- posts table does not have the scheduled_at column. Guarantee it idempotently.

ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;
CREATE INDEX IF NOT EXISTS posts_scheduled_at_idx ON public.posts(scheduled_at) WHERE published = false AND scheduled_at IS NOT NULL;

NOTIFY pgrst, 'reload schema';
