-- Migration: 20260913000001_harden_security_definer_and_permissions.sql
-- Description: Harden SECURITY DEFINER functions, prevent IDOR/role probing, and restrict RPC execution privileges

-- ============================================================================
-- 1. FUNCTION public.has_role
-- ============================================================================
-- Anchors role check strictly to auth.uid() to prevent arbitrary UUID probing.
-- Retains SECURITY DEFINER with fixed search_path to read public.user_roles safely.
-- Revokes public/anon access while keeping authenticated access for RLS policies.

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND (_user_id IS NULL OR _user_id = (SELECT auth.uid()))
      AND role = _role
  );
$$;

COMMENT ON FUNCTION public.has_role(uuid, public.app_role) IS 'Checks if the currently authenticated user has the specified app role. Prevents probing other users.';

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- ============================================================================
-- 2. FUNCTION public.is_admin
-- ============================================================================
-- Anchors admin check strictly to auth.uid() to prevent arbitrary UUID probing.
-- Retains SECURITY DEFINER with fixed search_path to read public.user_roles safely.
-- Revokes public/anon access while keeping authenticated access for RLS policies.

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND (_user_id IS NULL OR _user_id = (SELECT auth.uid()))
      AND role = 'admin'::public.app_role
  );
$$;

COMMENT ON FUNCTION public.is_admin(uuid) IS 'Checks if the currently authenticated user has the admin role. Prevents probing other users.';

REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;

-- ============================================================================
-- 3. FUNCTION public.newsletter_subscribe
-- ============================================================================
-- Validates input, sanitizes email, enforces format constraints, and prevents data exposure.
-- Executed strictly by the server-side action (supabaseAdmin with service_role).
-- Revokes public, anon, and authenticated execution to eliminate public REST RPC attack surface.

CREATE OR REPLACE FUNCTION public.newsletter_subscribe(p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_clean_email text;
  v_id uuid;
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
  INSERT INTO public.subscribers (email, status)
  VALUES (v_clean_email, 'active')
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO v_id;

  -- 5. Safe return value (id is returned for TanStack Start server action contract)
  IF v_id IS NULL THEN
    SELECT id INTO v_id FROM public.subscribers WHERE email = v_clean_email;
    RETURN jsonb_build_object('id', v_id, 'created', false);
  END IF;

  RETURN jsonb_build_object('id', v_id, 'created', true);
END;
$$;

COMMENT ON FUNCTION public.newsletter_subscribe(text) IS 'Server-side procedure to subscribe an email to the newsletter. Only callable by service_role.';

REVOKE ALL ON FUNCTION public.newsletter_subscribe(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.newsletter_subscribe(text) FROM anon;
REVOKE ALL ON FUNCTION public.newsletter_subscribe(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.newsletter_subscribe(text) TO service_role;
