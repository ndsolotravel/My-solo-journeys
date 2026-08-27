-- Migration: Create legal_pages table for dynamic Privacy Policy and Disclaimer management
CREATE TABLE IF NOT EXISTS public.legal_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  seo_title TEXT,
  seo_description TEXT,
  hero_image TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT ON public.legal_pages TO anon, authenticated;
GRANT ALL ON public.legal_pages TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.legal_pages TO authenticated;

-- Public read published legal pages
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'legal_pages' AND policyname = 'Public read published legal_pages'
  ) THEN
    CREATE POLICY "Public read published legal_pages"
      ON public.legal_pages
      FOR SELECT
      TO anon, authenticated
      USING (published = true);
  END IF;
END $$;

-- Admin/editor full management policy
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'legal_pages' AND policyname = 'Admins manage legal_pages'
  ) THEN
    CREATE POLICY "Admins manage legal_pages"
      ON public.legal_pages
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
            AND user_roles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

-- Seed existing Privacy Policy content
INSERT INTO public.legal_pages (slug, title, content, seo_title, seo_description, hero_image, published)
VALUES (
  'privacy-policy',
  'Privacy Policy',
  '*Last updated: August 2026*

## 1. Information We Collect
When you visit ndsolotravel.com, we may automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies. We also collect information about how you interact with our site, including pages viewed and links clicked.

If you subscribe to our newsletter, comment on a post, or contact us, we may collect your name, email address, and any information you voluntarily provide.

## 2. How We Use Your Information
We use the information we collect to:
- Operate and maintain the ndsolotravel website
- Send newsletters and updates if you have subscribed
- Respond to your messages and comments
- Improve our content and user experience
- Monitor and analyze usage patterns and trends
- Protect against unauthorized access and ensure site security

## 3. Cookies
ndsolotravel uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookies through your browser settings. Disabling cookies may affect site functionality.

## 4. Third-Party Services
We may use third-party services such as analytics providers, email marketing platforms, and content delivery networks. These services may collect information about your interactions with our site. We do not sell your personal information to third parties.

## 5. Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.

## 6. Your Rights
You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).

## 7. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.

## 8. Contact Us
If you have any questions about this Privacy Policy, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).',
  'Privacy Policy — ndsolotravel',
  'Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed existing Disclaimer content
INSERT INTO public.legal_pages (slug, title, content, seo_title, seo_description, hero_image, published)
VALUES (
  'disclaimer',
  'Disclaimer',
  '*Last updated: August 2026*

## General Information
The information provided on ndsolotravel.com is for general informational and educational purposes only. All content is published in good faith and for general information purposes. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or suitability of this information.

## Travel Advice
Travel involves inherent risks. The travel stories, guides, tips, and recommendations shared on ndsolotravel are based on personal experiences and are intended for informational purposes only. Travel conditions, regulations, weather, and safety situations can change rapidly and without notice.

Always conduct your own research and exercise personal judgment before undertaking any travel. We recommend consulting official travel advisories, local authorities, and qualified professionals for the most current information regarding safety, health, and entry requirements for any destination.

## External Links
ndsolotravel may contain links to external websites that are not operated or maintained by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

## Professional Advice
Content on ndsolotravel should not be construed as professional advice of any kind, including but not limited to medical, legal, or financial advice. Always seek the guidance of qualified professionals with any questions you may have regarding travel safety, health precautions, or other matters.

## Photos and Media
All photographs and media content on ndsolotravel are the property of ndsolotravel unless otherwise noted. Unauthorized use, reproduction, or distribution without written permission is prohibited.

## Consent
By using our website, you hereby consent to our disclaimer and agree to its terms. If you do not agree with any part of this disclaimer, please discontinue use of our website.

## Contact Us
If you have any questions about this Disclaimer, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).',
  'Disclaimer — ndsolotravel',
  'Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
