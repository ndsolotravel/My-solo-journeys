-- Migration: Seed typography_settings in site_settings
INSERT INTO public.site_settings (key, value, description)
VALUES (
  'typography_settings',
  '{"headingFont":"Playfair Display","bodyFont":"Roboto","navigationFont":"Roboto","buttonFont":"Roboto","headingWeight":"700","bodyWeight":"400","bodySize":{"desktop":17,"tablet":16,"mobile":15},"lineHeight":{"desktop":1.7,"tablet":1.65,"mobile":1.6},"letterSpacing":{"desktop":0,"tablet":0,"mobile":0},"headingLetterSpacing":-0.02}',
  'Global typography configuration for CMS'
)
ON CONFLICT (key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
