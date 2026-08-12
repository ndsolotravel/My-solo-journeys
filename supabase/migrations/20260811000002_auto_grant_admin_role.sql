-- 1. Ensure existing admin account(s) have the admin role in user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email IN ('ndsolotravel@gmail.com', 'admin@ndsolotravel.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Update handle_new_user trigger function to ONLY create profile (no auto admin grant)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END; $$;

