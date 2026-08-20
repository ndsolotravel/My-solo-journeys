-- Migration: Seed homepage management settings into site_settings
-- Reuses the existing site_settings key/value table (no new tables created).
-- Defaults mirror the currently hardcoded homepage content so nothing changes
-- on the public homepage until an admin edits it in the CMS.

INSERT INTO public.site_settings (key, value, description)
VALUES
  -- Hero Banner
  ('homepage_hero_mode', 'auto', 'Hero banner source: "auto" = latest published blog post, "manual" = selected post'),
  ('homepage_hero_post_id', '', 'Selected blog post id used when homepage_hero_mode = "manual"'),
  ('homepage_hero_image', '', 'Hero banner background image URL (Supabase storage path or full URL)'),
  ('homepage_hero_badge', 'Solo · Slow · Cinematic', 'Hero badge text'),
  ('homepage_hero_title', 'Stories from the high places', 'Hero main title'),
  ('homepage_hero_title_highlight', 'most people only fly over.', 'Hero title accent highlight'),
  ('homepage_hero_description', 'Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world''s wildest borders.', 'Hero description text'),
  ('homepage_hero_button_text', 'Read the stories', 'Primary hero button text'),
  ('homepage_hero_button_link', '/blog', 'Primary hero button link (internal route or URL)'),
  ('homepage_hero_secondary_button_text', 'Explore destinations', 'Secondary hero button text'),
  ('homepage_hero_secondary_button_link', '/destinations', 'Secondary hero button link (internal route or URL)'),

  -- Journey in Numbers
  ('homepage_stat_countries_mode', 'auto', 'Countries visited source: "auto" = computed from posts, "manual" = fixed number'),
  ('homepage_stat_countries', '', 'Manual countries number used when homepage_stat_countries_mode = "manual"'),
  ('homepage_stat_trips', '102', 'Solo motorcycle trips count'),
  ('homepage_stat_photos', '200', 'Photos captured count'),
  ('homepage_stat_photos_suffix', 'K+', 'Photos captured suffix'),
  ('homepage_stat_kilometres', '18420', 'Kilometres travelled'),
  ('homepage_stat_kilometres_suffix', ' km', 'Kilometres travelled suffix'),
  ('homepage_stat_days', '142', 'Days on the road'),

  -- Featured / Latest Blog Post
  ('homepage_featured_mode', 'auto', 'Featured post source: "auto" = latest featured blog post, "manual" = selected post'),
  ('homepage_featured_post_id', '', 'Selected blog post id used when homepage_featured_mode = "manual"')
ON CONFLICT (key) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';