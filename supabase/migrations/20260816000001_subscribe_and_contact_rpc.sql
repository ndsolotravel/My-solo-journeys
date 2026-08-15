-- Migration: Add SECURITY DEFINER RPC functions for newsletter subscription and contact messages.
-- Rationale: anon INSERT succeeds under RLS, but INSERT ... RETURNING (used to truthfully confirm
-- the write) requires anon SELECT on the tables. Granting anon SELECT would publicly expose all
-- subscriber emails and contact messages, so we expose safe, idempotent RPCs instead.

-- Newsletter subscription: idempotent, returns the subscriber id.
create or replace function public.newsletter_subscribe(p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into public.subscribers (email)
  values (lower(trim(p_email)))
  on conflict (email) do nothing
  returning id into v_id;

  if v_id is null then
    select id into v_id from public.subscribers where email = lower(trim(p_email));
    return jsonb_build_object('id', v_id, 'created', false);
  end if;

  return jsonb_build_object('id', v_id, 'created', true);
end;
$$;

revoke all on function public.newsletter_subscribe(text) from public;
grant execute on function public.newsletter_subscribe(text) to anon, authenticated;

-- Contact message: rate-limited (max 3 per IP hash per 10 minutes), returns the message id.
create or replace function public.send_contact_message(
  p_name text,
  p_email text,
  p_subject text,
  p_message text,
  p_ip_hash text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_count int;
begin
  if p_ip_hash is not null and p_ip_hash <> '' then
    select count(*) into v_count
    from public.contact_messages
    where ip_hash = p_ip_hash
      and created_at > now() - interval '10 minutes';
    if v_count >= 3 then
      raise exception 'Too many messages. Please try again in a few minutes.';
    end if;
  end if;

  insert into public.contact_messages (name, email, subject, message, ip_hash, status)
  values (
    p_name,
    lower(trim(p_email)),
    nullif(trim(coalesce(p_subject, '')), ''),
    p_message,
    p_ip_hash,
    'new'
  )
  returning id into v_id;

  return jsonb_build_object('id', v_id);
end;
$$;

revoke all on function public.send_contact_message(text, text, text, text, text) from public;
grant execute on function public.send_contact_message(text, text, text, text, text) to anon, authenticated;

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';
