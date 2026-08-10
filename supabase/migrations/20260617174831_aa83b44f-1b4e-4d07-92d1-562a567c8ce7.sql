
-- 1. Hide guest_email on comments from public/authenticated; service_role (server) still reads it
REVOKE SELECT (guest_email) ON public.comments FROM anon, authenticated;

-- 2. Lock down user_roles writes to admins only (defense in depth)
CREATE POLICY "Admins insert user_roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update user_roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete user_roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Add explicit admin/owner UPDATE policy on comments
CREATE POLICY "Owners or admins update comments" ON public.comments
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated.
-- has_role is called from RLS policies which run as the function owner; revoking
-- EXECUTE from client roles does NOT break inline policy use.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.publish_scheduled_posts() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;
