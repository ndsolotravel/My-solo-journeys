-- Migration: Fix user_roles schema, RLS policies, security definer functions, and admin role assignment

-- 1. Ensure public.app_role ENUM exists idempotently
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'reader');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Ensure public.user_roles table exists
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_roles_user_id_role_key UNIQUE(user_id, role)
);

-- Ensure table permissions
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Revert/Fix handle_new_user() trigger so it NEVER auto-grants admin role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END; $$;

-- 4. Define security functions with explicit search_path and EXECUTE privileges
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = COALESCE(_user_id, auth.uid()) AND role = 'admin'::public.app_role
  );
$$;

-- Grant EXECUTE to authenticated users so RLS policy evaluation succeeds
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

-- 5. RLS Policies on public.user_roles
-- Clean up existing policies for idempotent execution
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Users can view own roles') THEN
    DROP POLICY "Users can view own roles" ON public.user_roles;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Users can view own roles or admins view all') THEN
    DROP POLICY "Users can view own roles or admins view all" ON public.user_roles;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Admins insert user_roles') THEN
    DROP POLICY "Admins insert user_roles" ON public.user_roles;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Admins update user_roles') THEN
    DROP POLICY "Admins update user_roles" ON public.user_roles;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Admins delete user_roles') THEN
    DROP POLICY "Admins delete user_roles" ON public.user_roles;
  END IF;
END $$;

-- Authenticated users can view their own roles; admins can view all roles
CREATE POLICY "Users can view own roles or admins view all"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::public.app_role));

-- ONLY admins can insert new roles (normal users CANNOT assign roles to themselves or others)
CREATE POLICY "Admins insert user_roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ONLY admins can update roles
CREATE POLICY "Admins update user_roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ONLY admins can delete roles
CREATE POLICY "Admins delete user_roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 6. Assign admin role to existing admin user account(s) in auth.users
-- This queries auth.users dynamically and idempotently without guessing UUIDs
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email IN ('ndsolotravel@gmail.com', 'admin@ndsolotravel.com')
ON CONFLICT (user_id, role) DO NOTHING;
