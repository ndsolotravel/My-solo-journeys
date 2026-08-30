-- Migration: Add ip_hash column to public.messages for server-side rate limiting
-- This column stores a SHA-256 hash of the submitter's IP address (salted),
-- enabling per-IP submission throttling without storing raw IP addresses.

ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS ip_hash text;

-- Index for efficient rate-limit lookups (hash + recent time window)
CREATE INDEX IF NOT EXISTS messages_ip_hash_idx ON public.messages (ip_hash);
CREATE INDEX IF NOT EXISTS messages_ip_hash_created_at_idx ON public.messages (ip_hash, created_at DESC);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
