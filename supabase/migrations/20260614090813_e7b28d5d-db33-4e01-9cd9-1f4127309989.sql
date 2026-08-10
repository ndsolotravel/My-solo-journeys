
-- Restrict SECURITY DEFINER execution
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Tighten newsletter insert
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe" ON public.subscribers
  FOR INSERT WITH CHECK (
    char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- Tighten contact insert
DROP POLICY IF EXISTS "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a message" ON public.contact_messages
  FOR INSERT WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(message) BETWEEN 1 AND 5000
  );
