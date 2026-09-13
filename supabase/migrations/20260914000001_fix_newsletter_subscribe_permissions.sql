-- ============================================================================
-- Migration: 20260914000001_fix_newsletter_subscribe_permissions.sql
-- Description: Fix newsletter subscription execution permissions for anonymous visitors.
-- Recreate public.newsletter_subscribe as a hardened SECURITY DEFINER procedure.
-- Grant EXECUTE to anon, authenticated, and service_role.
-- Ensure RLS on public.subscribers protects subscriber privacy from public reads.
-- ============================================================================

-- 1. Hardened SECURITY DEFINER function for newsletter subscriptions
CREATE OR REPLACE FUNCTION public.newsletter_subscribe(p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_clean_email text;
  v_id uuid;
  v_is_new boolean := true;
BEGIN
  -- 1. Input presence check
  IF p_email IS NULL THEN
    RAISE EXCEPTION 'Email is required' USING ERRCODE = '22023';
  END IF;

  v_clean_email := lower(trim(p_email));

  -- 2. Length validation (RFC 5321 max is 320 characters)
  IF length(v_clean_email) < 3 OR length(v_clean_email) > 320 THEN
    RAISE EXCEPTION 'Invalid email length' USING ERRCODE = '22023';
  END IF;

  -- 3. Format validation using standard regex
  IF v_clean_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email address format' USING ERRCODE = '22023';
  END IF;

  -- 4. Safe insert with conflict handling
  -- If already exists and unsubscribed, re-activate the subscription.
  -- If already active, DO NOTHING and return existing id with created = false.
  INSERT INTO public.subscribers (email, status)
  VALUES (v_clean_email, 'active')
  ON CONFLICT (email) DO UPDATE
    SET status = 'active'
    WHERE public.subscribers.status = 'unsubscribed'
  RETURNING id INTO v_id;

  -- 5. Safe return value (id is returned for TanStack Start server action contract)
  IF v_id IS NULL THEN
    SELECT id INTO v_id FROM public.subscribers WHERE email = v_clean_email;
    RETURN jsonb_build_object('id', v_id, 'created', false);
  END IF;

  RETURN jsonb_build_object('id', v_id, 'created', true);
END;
$$;

COMMENT ON FUNCTION public.newsletter_subscribe(text) IS 'Secure public entrypoint for newsletter subscriptions. Validates, handles duplicates, and manages subscriber records under SECURITY DEFINER.';

-- 2. Function Execution Permissions
-- Revoke all from PUBLIC to clear defaults, then grant explicitly to intended roles
REVOKE ALL ON FUNCTION public.newsletter_subscribe(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.newsletter_subscribe(text) TO anon, authenticated, service_role;

-- 3. Table Security & RLS on public.subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Ensure table privileges:
-- Anonymous and authenticated roles need INSERT (and USAGE on schema public)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT INSERT ON public.subscribers TO anon, authenticated, service_role;

-- Strictly REVOKE direct SELECT/UPDATE/DELETE from anon and PUBLIC
REVOKE SELECT, UPDATE, DELETE, TRUNCATE ON public.subscribers FROM anon;
REVOKE ALL ON public.subscribers FROM PUBLIC;

-- Drop any conflicting or overly permissive policies if they exist
DROP POLICY IF EXISTS "Public users can submit valid subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "Authenticated users can subscribe" ON public.subscribers;

-- Recreate strict INSERT policies for direct table fallback
CREATE POLICY "Public users can submit valid subscriptions"
  ON public.subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL AND
    length(trim(email)) >= 3 AND
    length(trim(email)) <= 320 AND
    email = lower(trim(email)) AND
    status = 'active'
  );

CREATE POLICY "Authenticated users can subscribe"
  ON public.subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    email IS NOT NULL AND
    length(trim(email)) >= 3 AND
    length(trim(email)) <= 320 AND
    email = lower(trim(email)) AND
    status = 'active'
  );
