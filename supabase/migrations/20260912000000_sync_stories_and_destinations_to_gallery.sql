-- ============================================================================
-- Migration: Automatic Gallery Synchronization for Stories & Destinations
-- ============================================================================

-- 1. Add foreign keys and source tracking to public.photos
ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS source_type TEXT NOT NULL DEFAULT 'manual';

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'photos_source_type_check'
  ) THEN
    ALTER TABLE public.photos
      ADD CONSTRAINT photos_source_type_check
      CHECK (source_type IN ('story', 'destination', 'manual'));
  END IF;
END $$;

-- 2. Partial unique indexes to prevent duplicate photo rows per post or destination
CREATE UNIQUE INDEX IF NOT EXISTS photos_post_id_idx
  ON public.photos (post_id)
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS photos_destination_id_idx
  ON public.photos (destination_id)
  WHERE destination_id IS NOT NULL;

-- 3. Link the existing photos to their respective posts where matching
UPDATE public.photos ph
SET post_id = p.id,
    source_type = 'story'
FROM public.posts p
WHERE ph.post_id IS NULL
  AND (
    ph.slug = CONCAT(p.slug, '-cover')
    OR ph.image_url = p.cover_image
    OR ph.title = p.title
  );

-- 4. Backfill any published posts with cover_image not yet in photos
DO $$
DECLARE
  r RECORD;
  new_slug TEXT;
  new_photo_id UUID;
  default_cat_id UUID;
BEGIN
  -- Default category for general stories: Mountains or Pakistan
  SELECT id INTO default_cat_id FROM public.photo_categories WHERE slug = 'pakistan' LIMIT 1;
  IF default_cat_id IS NULL THEN
    SELECT id INTO default_cat_id FROM public.photo_categories LIMIT 1;
  END IF;

  FOR r IN
    SELECT p.id, p.title, p.slug, p.cover_image, p.location_name, p.travel_date, p.excerpt, p.category
    FROM public.posts p
    WHERE p.published = true
      AND p.cover_image IS NOT NULL
      AND TRIM(p.cover_image) != ''
      AND NOT EXISTS (
        SELECT 1 FROM public.photos ph WHERE ph.post_id = p.id OR ph.image_url = p.cover_image
      )
  LOOP
    new_slug := CONCAT(r.slug, '-cover');
    -- Guarantee unique slug
    IF EXISTS (SELECT 1 FROM public.photos WHERE slug = new_slug) THEN
      new_slug := CONCAT(r.slug, '-cover-', SUBSTRING(gen_random_uuid()::text, 1, 6));
    END IF;

    INSERT INTO public.photos (
      post_id,
      source_type,
      title,
      slug,
      image_url,
      location,
      captured_at,
      story,
      alt_text,
      published,
      sort_order
    ) VALUES (
      r.id,
      'story',
      COALESCE(NULLIF(TRIM(r.title), ''), 'Expedition Story'),
      new_slug,
      TRIM(r.cover_image),
      NULLIF(TRIM(r.location_name), ''),
      r.travel_date,
      NULLIF(TRIM(r.excerpt), ''),
      COALESCE(NULLIF(TRIM(r.title), ''), 'Story Cover Photo'),
      true,
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos)
    ) RETURNING id INTO new_photo_id;

    -- Link category if available
    IF default_cat_id IS NOT NULL AND new_photo_id IS NOT NULL THEN
      INSERT INTO public.photo_category_links (photo_id, category_id)
      VALUES (new_photo_id, default_cat_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- 5. Backfill any published destinations with featured_image not yet in photos
DO $$
DECLARE
  d RECORD;
  dest_slug TEXT;
  dest_photo_id UUID;
  dest_cat_id UUID;
  loc_str TEXT;
BEGIN
  -- Default category for destinations
  SELECT id INTO dest_cat_id FROM public.photo_categories WHERE slug = 'pakistan' LIMIT 1;
  IF dest_cat_id IS NULL THEN
    SELECT id INTO dest_cat_id FROM public.photo_categories LIMIT 1;
  END IF;

  FOR d IN
    SELECT ds.id, ds.title, ds.slug, ds.featured_image, ds.country, ds.description
    FROM public.destinations ds
    WHERE ds.published = true
      AND ds.featured_image IS NOT NULL
      AND TRIM(ds.featured_image) != ''
      AND NOT EXISTS (
        SELECT 1 FROM public.photos ph WHERE ph.destination_id = ds.id OR ph.image_url = ds.featured_image
      )
  LOOP
    dest_slug := CONCAT('destination-', LOWER(REGEXP_REPLACE(d.slug, '[^a-zA-Z0-9]+', '-', 'g')));
    IF EXISTS (SELECT 1 FROM public.photos WHERE slug = dest_slug) THEN
      dest_slug := CONCAT(dest_slug, '-', SUBSTRING(gen_random_uuid()::text, 1, 6));
    END IF;

    loc_str := TRIM(d.title);
    IF d.country IS NOT NULL AND TRIM(d.country) != '' THEN
      IF NOT (loc_str ILIKE CONCAT('%', TRIM(d.country), '%')) THEN
        loc_str := CONCAT(loc_str, ', ', TRIM(d.country));
      END IF;
    END IF;

    INSERT INTO public.photos (
      destination_id,
      source_type,
      title,
      slug,
      image_url,
      location,
      story,
      alt_text,
      published,
      sort_order
    ) VALUES (
      d.id,
      'destination',
      COALESCE(NULLIF(TRIM(d.title), ''), 'Destination Photo'),
      dest_slug,
      TRIM(d.featured_image),
      NULLIF(loc_str, ''),
      NULLIF(TRIM(d.description), ''),
      COALESCE(NULLIF(TRIM(d.title), ''), 'Destination photo'),
      true,
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos)
    ) RETURNING id INTO dest_photo_id;

    IF dest_cat_id IS NOT NULL AND dest_photo_id IS NOT NULL THEN
      INSERT INTO public.photo_category_links (photo_id, category_id)
      VALUES (dest_photo_id, dest_cat_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- 6. Trigger Function: Sync Post changes to Photos table
CREATE OR REPLACE FUNCTION public.sync_post_to_photos()
RETURNS TRIGGER AS $$
DECLARE
  v_slug TEXT;
  v_photo_id UUID;
  v_default_cat_id UUID;
BEGIN
  -- If post deleted, ON DELETE CASCADE handles photos deletion automatically.
  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;

  -- If post has no cover image or is unpublished
  IF NEW.cover_image IS NULL OR TRIM(NEW.cover_image) = '' THEN
    -- If photo already existed for this post, unpublish or delete it
    UPDATE public.photos
    SET published = false,
        updated_at = now()
    WHERE post_id = NEW.id;
    RETURN NEW;
  END IF;

  -- Check if photo already exists for this post
  SELECT id INTO v_photo_id
  FROM public.photos
  WHERE post_id = NEW.id;

  IF v_photo_id IS NOT NULL THEN
    -- Update existing photo record
    UPDATE public.photos
    SET image_url = TRIM(NEW.cover_image),
        title = CASE
          WHEN title = '' OR title = OLD.title THEN COALESCE(NULLIF(TRIM(NEW.title), ''), title)
          ELSE title
        END,
        location = CASE
          WHEN location IS NULL OR location = OLD.location_name THEN NULLIF(TRIM(NEW.location_name), '')
          ELSE location
        END,
        captured_at = COALESCE(NEW.travel_date, captured_at),
        story = CASE
          WHEN story IS NULL OR story = OLD.excerpt THEN NULLIF(TRIM(NEW.excerpt), '')
          ELSE story
        END,
        alt_text = CASE
          WHEN alt_text = '' OR alt_text = OLD.title THEN COALESCE(NULLIF(TRIM(NEW.title), ''), alt_text)
          ELSE alt_text
        END,
        published = NEW.published,
        updated_at = now()
    WHERE id = v_photo_id;
  ELSE
    -- Insert new photo if published or has picture
    v_slug := CONCAT(NEW.slug, '-cover');
    IF EXISTS (SELECT 1 FROM public.photos WHERE slug = v_slug) THEN
      v_slug := CONCAT(NEW.slug, '-cover-', SUBSTRING(gen_random_uuid()::text, 1, 6));
    END IF;

    INSERT INTO public.photos (
      post_id,
      source_type,
      title,
      slug,
      image_url,
      location,
      captured_at,
      story,
      alt_text,
      published,
      sort_order
    ) VALUES (
      NEW.id,
      'story',
      COALESCE(NULLIF(TRIM(NEW.title), ''), 'Expedition Story'),
      v_slug,
      TRIM(NEW.cover_image),
      NULLIF(TRIM(NEW.location_name), ''),
      NEW.travel_date,
      NULLIF(TRIM(NEW.excerpt), ''),
      COALESCE(NULLIF(TRIM(NEW.title), ''), 'Story Cover Photo'),
      NEW.published,
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos)
    ) RETURNING id INTO v_photo_id;

    -- Assign default category link
    SELECT id INTO v_default_cat_id FROM public.photo_categories WHERE slug = 'pakistan' LIMIT 1;
    IF v_default_cat_id IS NULL THEN
      SELECT id INTO v_default_cat_id FROM public.photo_categories LIMIT 1;
    END IF;
    IF v_default_cat_id IS NOT NULL AND v_photo_id IS NOT NULL THEN
      INSERT INTO public.photo_category_links (photo_id, category_id)
      VALUES (v_photo_id, v_default_cat_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_sync_post_to_photos ON public.posts;
CREATE TRIGGER trg_sync_post_to_photos
AFTER INSERT OR UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.sync_post_to_photos();


-- 7. Trigger Function: Sync Destination changes to Photos table
CREATE OR REPLACE FUNCTION public.sync_destination_to_photos()
RETURNS TRIGGER AS $$
DECLARE
  v_slug TEXT;
  v_photo_id UUID;
  v_dest_cat_id UUID;
  v_loc_str TEXT;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;

  IF NEW.featured_image IS NULL OR TRIM(NEW.featured_image) = '' THEN
    UPDATE public.photos
    SET published = false,
        updated_at = now()
    WHERE destination_id = NEW.id;
    RETURN NEW;
  END IF;

  v_loc_str := TRIM(NEW.title);
  IF NEW.country IS NOT NULL AND TRIM(NEW.country) != '' THEN
    IF NOT (v_loc_str ILIKE CONCAT('%', TRIM(NEW.country), '%')) THEN
      v_loc_str := CONCAT(v_loc_str, ', ', TRIM(NEW.country));
    END IF;
  END IF;

  SELECT id INTO v_photo_id
  FROM public.photos
  WHERE destination_id = NEW.id;

  IF v_photo_id IS NOT NULL THEN
    UPDATE public.photos
    SET image_url = TRIM(NEW.featured_image),
        title = CASE
          WHEN title = '' OR title = OLD.title THEN COALESCE(NULLIF(TRIM(NEW.title), ''), title)
          ELSE title
        END,
        location = CASE
          WHEN location IS NULL OR location = OLD.title THEN NULLIF(v_loc_str, '')
          ELSE location
        END,
        story = CASE
          WHEN story IS NULL OR story = OLD.description THEN NULLIF(TRIM(NEW.description), '')
          ELSE story
        END,
        alt_text = CASE
          WHEN alt_text = '' OR alt_text = OLD.title THEN COALESCE(NULLIF(TRIM(NEW.title), ''), alt_text)
          ELSE alt_text
        END,
        published = NEW.published,
        updated_at = now()
    WHERE id = v_photo_id;
  ELSE
    v_slug := CONCAT('destination-', LOWER(REGEXP_REPLACE(NEW.slug, '[^a-zA-Z0-9]+', '-', 'g')));
    IF EXISTS (SELECT 1 FROM public.photos WHERE slug = v_slug) THEN
      v_slug := CONCAT(v_slug, '-', SUBSTRING(gen_random_uuid()::text, 1, 6));
    END IF;

    INSERT INTO public.photos (
      destination_id,
      source_type,
      title,
      slug,
      image_url,
      location,
      story,
      alt_text,
      published,
      sort_order
    ) VALUES (
      NEW.id,
      'destination',
      COALESCE(NULLIF(TRIM(NEW.title), ''), 'Destination Photo'),
      v_slug,
      TRIM(NEW.featured_image),
      NULLIF(v_loc_str, ''),
      NULLIF(TRIM(NEW.description), ''),
      COALESCE(NULLIF(TRIM(NEW.title), ''), 'Destination photo'),
      NEW.published,
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM public.photos)
    ) RETURNING id INTO v_photo_id;

    SELECT id INTO v_dest_cat_id FROM public.photo_categories WHERE slug = 'pakistan' LIMIT 1;
    IF v_dest_cat_id IS NULL THEN
      SELECT id INTO v_dest_cat_id FROM public.photo_categories LIMIT 1;
    END IF;
    IF v_dest_cat_id IS NOT NULL AND v_photo_id IS NOT NULL THEN
      INSERT INTO public.photo_category_links (photo_id, category_id)
      VALUES (v_photo_id, v_dest_cat_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_sync_destination_to_photos ON public.destinations;
CREATE TRIGGER trg_sync_destination_to_photos
AFTER INSERT OR UPDATE ON public.destinations
FOR EACH ROW
EXECUTE FUNCTION public.sync_destination_to_photos();
