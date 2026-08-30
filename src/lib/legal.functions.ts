import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LegalPage = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  hero_image: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export const DEFAULT_LEGAL_PAGES: Record<string, LegalPage> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `*Last updated: August 2026*

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
If you have any questions about this Privacy Policy, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Privacy Policy — ndsolotravel",
    seo_description: "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.",
    hero_image: "",
    published: true,
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    content: `*Last updated: August 2026*

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
If you have any questions about this Disclaimer, please contact us at [contact@ndsolotravel.com](mailto:contact@ndsolotravel.com).`,
    seo_title: "Disclaimer — ndsolotravel",
    seo_description: "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.",
    hero_image: "",
    published: true,
  },
};

async function assertEditor(userId: string, client?: any) {
  let roles: string[] = [];

  if (client && typeof client.from === "function") {
    const { data } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r: { role: string }) => r.role);
    }
  }

  if (roles.length === 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    roles = (rows ?? []).map((r: { role: string }) => r.role);
  }

  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden: Editor or admin access required");
  }
  return roles;
}

// ---------------- Public Server Functions ----------------

export const getLegalPageBySlug = createServerFn({ method: "GET" })
  .validator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<{ legalPage: LegalPage | null }> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: page, error } = await (supabaseAdmin.from("legal_pages") as any)
        .select("*")
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();

      if (page && !error) {
        return { legalPage: page as LegalPage };
      }

      const fallback = DEFAULT_LEGAL_PAGES[data.slug];
      return { legalPage: fallback ?? null };
    } catch {
      const fallback = DEFAULT_LEGAL_PAGES[data.slug];
      return { legalPage: fallback ?? null };
    }
  });

// ---------------- Admin Server Functions ----------------

export const adminListLegalPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LegalPage[]> => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await (client.from("legal_pages") as any)
      .select("*")
      .order("title", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as LegalPage[];
  });

export const adminGetLegalPage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ context, data }): Promise<LegalPage | null> => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: page, error } = await (client.from("legal_pages") as any)
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!page) {
      return DEFAULT_LEGAL_PAGES[data.slug] ?? null;
    }
    return page as LegalPage;
  });

export const adminUpsertLegalPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) =>
    z
      .object({
        slug: z.string().min(1),
        title: z.string().min(1),
        content: z.string(),
        seo_title: z.string().nullable().optional(),
        seo_description: z.string().nullable().optional(),
        hero_image: z.string().nullable().optional(),
        published: z.boolean().default(true),
      })
      .parse(input),
  )
  .handler(async ({ context, data }): Promise<LegalPage> => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const payload = {
      slug: data.slug.trim(),
      title: data.title.trim(),
      content: data.content,
      seo_title: data.seo_title?.trim() || null,
      seo_description: data.seo_description?.trim() || null,
      hero_image: data.hero_image?.trim() || null,
      published: data.published,
      updated_at: now,
    };

    const { data: updated, error } = await (client.from("legal_pages") as any)
      .upsert(payload, { onConflict: "slug" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return updated as LegalPage;
  });
