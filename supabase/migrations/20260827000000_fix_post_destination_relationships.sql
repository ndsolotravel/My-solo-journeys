-- Migration: Establish strict destination relationships for existing posts
-- Ensure foreign key integrity and create helper RPC function for destination assignment

-- 1. Explicitly update existing posts with verified destination IDs
UPDATE public.posts
SET
  destination_id = '447114e9-1155-4fb5-80a4-c73f22213a15', -- Nanga Parbat Base Camp
  updated_at = now()
WHERE id = 'a4509cc7-82ff-4cb7-acfd-aa7bfa196944'
   OR title ILIKE '%Nanga Parbat%';

UPDATE public.posts
SET
  destination_id = 'e1e1c299-74f3-4a74-ab7e-20d7ec02065e', -- Phander Valley
  updated_at = now()
WHERE id = 'd281cb54-88fb-4ba4-8c97-ab771c118265'
   OR title ILIKE '%Phander Valley%';

UPDATE public.posts
SET
  destination_id = 'a30f8563-df4f-47b5-a434-5c5417881712', -- Skardu & Deosai
  updated_at = now()
WHERE id = 'b0d8841d-d77b-46fe-b7b3-5dd68bfd5dc2'
   OR title ILIKE '%K2 Base Camp%'
   OR title ILIKE '%Concordia%';

UPDATE public.posts
SET
  destination_id = '3b361ee0-86bb-432a-b12d-1c485c33c378', -- Hunza Valley (Karimabad)
  updated_at = now()
WHERE id = '9da10e0f-a5ec-4b51-a52f-5e9f37691edb'
   OR title ILIKE '%Budget Travel in the Karakoram%';

UPDATE public.posts
SET
  destination_id = NULL, -- High Himalaya, Nepal is independent from Pakistan regional destinations
  updated_at = now()
WHERE id = '0b1ee170-5858-47a0-a1ac-f94eb85627b4'
   OR title ILIKE '%Photographing the High Himalaya%';

-- 2. Create Security Definer RPC for admin destination update if direct update requires it
CREATE OR REPLACE FUNCTION public.admin_update_post_destination(
  p_post_id UUID,
  p_destination_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.posts
  SET
    destination_id = p_destination_id,
    updated_at = now()
  WHERE id = p_post_id;

  RETURN jsonb_build_object('success', true, 'post_id', p_post_id, 'destination_id', p_destination_id);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_post_destination(UUID, UUID) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_update_post_destination(UUID, UUID) TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';
