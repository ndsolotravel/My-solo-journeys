-- Migration: Update Map Location, latitude, and longitude for existing blog posts
-- Non-destructive update based on verified coordinates

UPDATE public.posts
SET
  location_name = 'Nanga Parbat, Diamer',
  latitude = 35.2375,
  longitude = 74.5892,
  updated_at = now()
WHERE id = 'a4509cc7-82ff-4cb7-acfd-aa7bfa196944'
   OR title ILIKE '%Nanga Parbat%';

UPDATE public.posts
SET
  location_name = 'Phander Valley, Ghizer',
  latitude = 36.1793,
  longitude = 73.7512,
  updated_at = now()
WHERE id = 'd281cb54-88fb-4ba4-8c97-ab771c118265'
   OR title ILIKE '%Phander Valley%';

UPDATE public.posts
SET
  location_name = 'K2 Base Camp, Concordia',
  latitude = 35.8825,
  longitude = 76.5133,
  updated_at = now()
WHERE id = 'b0d8841d-d77b-46fe-b7b3-5dd68bfd5dc2'
   OR title ILIKE '%K2 Base Camp%';

UPDATE public.posts
SET
  location_name = 'High Himalaya, Nepal',
  latitude = 27.9881,
  longitude = 86.9250,
  updated_at = now()
WHERE id = '0b1ee170-5858-47a0-a1ac-f94eb85627b4'
   OR title ILIKE '%High Himalaya%';

UPDATE public.posts
SET
  location_name = 'Karakoram, Skardu',
  latitude = 35.2971,
  longitude = 75.6333,
  updated_at = now()
WHERE id = '9da10e0f-a5ec-4b51-a52f-5e9f37691edb'
   OR title ILIKE '%Budget Travel in the Karakoram%';

-- Create security definer RPC function for auto-geocoding updates
CREATE OR REPLACE FUNCTION public.admin_update_post_location(
  p_post_id UUID,
  p_location_name TEXT,
  p_latitude DOUBLE PRECISION,
  p_longitude DOUBLE PRECISION
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.posts
  SET
    location_name = p_location_name,
    latitude = p_latitude,
    longitude = p_longitude,
    updated_at = now()
  WHERE id = p_post_id;

  RETURN jsonb_build_object('success', true, 'post_id', p_post_id);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_post_location(UUID, TEXT, DOUBLE PRECISION, DOUBLE PRECISION) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_update_post_location(UUID, TEXT, DOUBLE PRECISION, DOUBLE PRECISION) TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';
