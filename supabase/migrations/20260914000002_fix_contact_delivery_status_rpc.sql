-- Migration: 20260914000002_fix_contact_delivery_status_rpc.sql
-- Description: Provide a safe SECURITY DEFINER RPC to record email delivery status
-- on contact messages submitted by visitors without requiring direct UPDATE table permissions.

CREATE OR REPLACE FUNCTION public.update_message_delivery_status(
  p_message_id uuid,
  p_status text,
  p_error text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Validate status
  IF p_status NOT IN ('pending', 'sent', 'failed') THEN
    RAISE EXCEPTION 'Invalid delivery status: %', p_status;
  END IF;

  UPDATE public.messages
  SET
    email_delivery_status = p_status,
    email_delivery_error = p_error,
    updated_at = now()
  WHERE id = p_message_id;
END;
$$;

-- Revoke from public, grant execute to anon, authenticated, and service_role
REVOKE ALL ON FUNCTION public.update_message_delivery_status(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_message_delivery_status(uuid, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.update_message_delivery_status(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_message_delivery_status(uuid, text, text) TO service_role;
