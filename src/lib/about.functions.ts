import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";
import { resolveMediaUrl } from "@/lib/media";

// ---------------------------------------------------------------------------
// About Page Data Interface & Defaults (matching https://ndsolotravel.com/about)
// ---------------------------------------------------------------------------

export interface AboutPageData {
  hero_label: string;
  hero_headline: string;
  hero_image: string;
  hero_image_alt: string;
  profile_image: string;
  profile_image_alt: string;
  biography_title: string;
  biography_intro: string;
  biography_content: string;
  philosophy_title: string;
  philosophy_quote: string;
  philosophy_description: string;
  seo_title: string;
  seo_description: string;
  og_image: string;
  og_title: string;
  og_description: string;
  published: boolean;
  updated_at?: string | null;
}

export const DEFAULT_ABOUT_PAGE: AboutPageData = {
  hero_label: "About",
  hero_headline: "Solo, slow, and almost always uphill.",
  hero_image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
  hero_image_alt: "Traveller on a mountain ridge",
  profile_image: "/nd-about.jpg",
  profile_image_alt: "ndsolotravel portrait",
  biography_title: "From Engineering to Exploration",
  biography_intro:
    "Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.",
  biography_content: `I am a solo traveler and an Engineer by profession. While engineering has shaped the way I think, solve problems, and plan, traveling has taught me to be curious, adaptable, independent, and open to the unexpected.

For me, solo travel is more than simply visiting new destinations. It is about getting away from the familiar, riding unfamiliar roads, hiking through remote landscapes, meeting people from different backgrounds, and creating experiences that stay with you long after the journey ends.

Through NDSOLOTRAVEL, I share my journeys, motorcycle adventures, hiking experiences, destinations, travel stories, photographs, and the lessons I discover along the way.

I believe you do not always need a group, a perfect plan, or a luxury itinerary to explore the world. Sometimes, all you need is the courage to start, an open mind, and the willingness to take the road less travelled.

Travel is my way of discovering the world, challenging myself, and continuing to learn beyond the boundaries of everyday life.`,
  philosophy_title: "Travel philosophy",
  philosophy_quote: "Solo travel is where the journey becomes the destination",
  philosophy_description:
    "Cinematic stories from solo journeys across Pakistan, the Karakoram, Nanga Parbat, and beyond. Trekking guides, motorcycle adventures, and travel photography.",
  seo_title: "About — ndsolotravel",
  seo_description:
    "About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person.",
  og_image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80",
  og_title: "About — ndsolotravel",
  og_description: "About the solo traveller behind ndsolotravel.",
  published: true,
  updated_at: null,
};

const ABOUT_SETTINGS_PREFIX = "about_";

const ABOUT_FIELDS = [
  "hero_label",
  "hero_headline",
  "hero_image",
  "hero_image_alt",
  "profile_image",
  "profile_image_alt",
  "biography_title",
  "biography_intro",
  "biography_content",
  "philosophy_title",
  "philosophy_quote",
  "philosophy_description",
  "seo_title",
  "seo_description",
  "og_image",
  "og_title",
  "og_description",
  "published",
] as const;

// ---------------------------------------------------------------------------
// Helper: Fetch from about_pages table or site_settings
// ---------------------------------------------------------------------------

async function getAboutDataFromDb(client: any): Promise<{ data: AboutPageData; source: string }> {
  // 1. First attempt to query public.about_pages
  try {
    const { data, error } = await client
      .from("about_pages")
      .select("*")
      .eq("slug", "about")
      .maybeSingle();

    if (!error && data) {
      return {
        source: "about_pages",
        data: {
          hero_label: data.hero_label || DEFAULT_ABOUT_PAGE.hero_label,
          hero_headline: data.hero_headline || DEFAULT_ABOUT_PAGE.hero_headline,
          hero_image: resolveMediaUrl(data.hero_image, client) || DEFAULT_ABOUT_PAGE.hero_image,
          hero_image_alt: data.hero_image_alt || DEFAULT_ABOUT_PAGE.hero_image_alt,
          profile_image: resolveMediaUrl(data.profile_image, client) || DEFAULT_ABOUT_PAGE.profile_image,
          profile_image_alt: data.profile_image_alt || DEFAULT_ABOUT_PAGE.profile_image_alt,
          biography_title: data.biography_title || DEFAULT_ABOUT_PAGE.biography_title,
          biography_intro: data.biography_intro || DEFAULT_ABOUT_PAGE.biography_intro,
          biography_content: data.biography_content || DEFAULT_ABOUT_PAGE.biography_content,
          philosophy_title: data.philosophy_title || DEFAULT_ABOUT_PAGE.philosophy_title,
          philosophy_quote: data.philosophy_quote || DEFAULT_ABOUT_PAGE.philosophy_quote,
          philosophy_description:
            data.philosophy_description !== undefined
              ? data.philosophy_description
              : DEFAULT_ABOUT_PAGE.philosophy_description,
          seo_title: data.seo_title || DEFAULT_ABOUT_PAGE.seo_title,
          seo_description: data.seo_description || DEFAULT_ABOUT_PAGE.seo_description,
          og_image: resolveMediaUrl(data.og_image, client) || DEFAULT_ABOUT_PAGE.og_image,
          og_title: data.og_title || DEFAULT_ABOUT_PAGE.og_title,
          og_description: data.og_description || DEFAULT_ABOUT_PAGE.og_description,
          published: data.published ?? true,
          updated_at: data.updated_at || null,
        },
      };
    }
  } catch (err) {
    // about_pages table not yet migrated or schema cache warming
  }

  // 2. Dual persistence fallback: read from site_settings
  try {
    const keys = ABOUT_FIELDS.map((f) => `${ABOUT_SETTINGS_PREFIX}${f}`);
    const { data: rows, error: settingsErr } = await client
      .from("site_settings")
      .select("key, value, updated_at")
      .in("key", keys);

    if (!settingsErr && Array.isArray(rows) && rows.length > 0) {
      const map = new Map<string, string>();
      let maxUpdatedAt: string | null = null;
      for (const r of rows) {
        map.set(r.key, r.value);
        if (r.updated_at && (!maxUpdatedAt || r.updated_at > maxUpdatedAt)) {
          maxUpdatedAt = r.updated_at;
        }
      }

      const getVal = (key: string, fallback: string) => {
        const v = map.get(`${ABOUT_SETTINGS_PREFIX}${key}`);
        return v !== undefined && v !== null && v !== "" ? v : fallback;
      };

      const publishedStr = map.get(`${ABOUT_SETTINGS_PREFIX}published`);
      const published = publishedStr !== undefined ? publishedStr === "true" : true;

      const rawHeroImg = getVal("hero_image", DEFAULT_ABOUT_PAGE.hero_image);
      const rawProfileImg = getVal("profile_image", DEFAULT_ABOUT_PAGE.profile_image);
      const rawOgImg = getVal("og_image", DEFAULT_ABOUT_PAGE.og_image);

      return {
        source: "site_settings",
        data: {
          hero_label: getVal("hero_label", DEFAULT_ABOUT_PAGE.hero_label),
          hero_headline: getVal("hero_headline", DEFAULT_ABOUT_PAGE.hero_headline),
          hero_image: resolveMediaUrl(rawHeroImg, client) || rawHeroImg,
          hero_image_alt: getVal("hero_image_alt", DEFAULT_ABOUT_PAGE.hero_image_alt),
          profile_image: resolveMediaUrl(rawProfileImg, client) || rawProfileImg,
          profile_image_alt: getVal("profile_image_alt", DEFAULT_ABOUT_PAGE.profile_image_alt),
          biography_title: getVal("biography_title", DEFAULT_ABOUT_PAGE.biography_title),
          biography_intro: getVal("biography_intro", DEFAULT_ABOUT_PAGE.biography_intro),
          biography_content: getVal("biography_content", DEFAULT_ABOUT_PAGE.biography_content),
          philosophy_title: getVal("philosophy_title", DEFAULT_ABOUT_PAGE.philosophy_title),
          philosophy_quote: getVal("philosophy_quote", DEFAULT_ABOUT_PAGE.philosophy_quote),
          philosophy_description: getVal("philosophy_description", DEFAULT_ABOUT_PAGE.philosophy_description),
          seo_title: getVal("seo_title", DEFAULT_ABOUT_PAGE.seo_title),
          seo_description: getVal("seo_description", DEFAULT_ABOUT_PAGE.seo_description),
          og_image: resolveMediaUrl(rawOgImg, client) || rawOgImg,
          og_title: getVal("og_title", DEFAULT_ABOUT_PAGE.og_title),
          og_description: getVal("og_description", DEFAULT_ABOUT_PAGE.og_description),
          published,
          updated_at: maxUpdatedAt,
        },
      };
    }
  } catch (err) {
    // site_settings query error
  }

  // 3. Return defaults matching live website
  return {
    source: "default",
    data: { ...DEFAULT_ABOUT_PAGE },
  };
}

// ---------------------------------------------------------------------------
// Public Server Function: Get Published About Page Data
// ---------------------------------------------------------------------------

export const getPublicAboutPage = createServerFn({ method: "GET" }).handler(async () => {
  const { supabase: client } = await import("@/integrations/supabase/client");
  const { data } = await getAboutDataFromDb(client);
  return data;
});

// ---------------------------------------------------------------------------
// Admin Server Function: Get Complete About Page Editor Data
// ---------------------------------------------------------------------------

export const adminGetAboutPageEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const res = await getAboutDataFromDb(client);
    return res.data;
  });

// ---------------------------------------------------------------------------
// Admin Server Function: Save About Page Data
// ---------------------------------------------------------------------------

export const aboutPageSchema = z.object({
  hero_label: z.string().min(1, "Hero label is required"),
  hero_headline: z.string().min(1, "Hero headline is required"),
  hero_image: z.string().default(""),
  hero_image_alt: z.string().default(""),
  profile_image: z.string().default(""),
  profile_image_alt: z.string().default(""),
  biography_title: z.string().default(""),
  biography_intro: z.string().default(""),
  biography_content: z.string().default(""),
  philosophy_title: z.string().min(1, "Travel philosophy title is required"),
  philosophy_quote: z.string().min(1, "Travel philosophy quote is required"),
  philosophy_description: z.string().default(""),
  seo_title: z.string().default(""),
  seo_description: z.string().default(""),
  og_image: z.string().default(""),
  og_title: z.string().default(""),
  og_description: z.string().default(""),
  published: z.boolean().default(true),
});

export const adminSaveAboutPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d) => aboutPageSchema.parse(d))
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();

    // 1. Attempt to upsert into public.about_pages
    let aboutPagesSaved = false;
    try {
      const { error: tableErr } = await client.from("about_pages").upsert(
        {
          slug: "about",
          hero_label: data.hero_label,
          hero_headline: data.hero_headline,
          hero_image: data.hero_image || null,
          hero_image_alt: data.hero_image_alt || null,
          profile_image: data.profile_image || null,
          profile_image_alt: data.profile_image_alt || null,
          biography_title: data.biography_title || null,
          biography_intro: data.biography_intro || null,
          biography_content: data.biography_content,
          philosophy_title: data.philosophy_title,
          philosophy_quote: data.philosophy_quote,
          philosophy_description: data.philosophy_description || null,
          seo_title: data.seo_title || null,
          seo_description: data.seo_description || null,
          og_image: data.og_image || null,
          og_title: data.og_title || null,
          og_description: data.og_description || null,
          published: data.published,
          updated_at: now,
        },
        { onConflict: "slug" }
      );
      if (!tableErr) {
        aboutPagesSaved = true;
      }
    } catch (e) {
      // Table doesn't exist yet, continue to site_settings
    }

    // 2. Dual persistence: always write to site_settings under about_* namespace
    const settingsRows = [
      { key: "about_hero_label", value: data.hero_label },
      { key: "about_hero_headline", value: data.hero_headline },
      { key: "about_hero_image", value: data.hero_image || "" },
      { key: "about_hero_image_alt", value: data.hero_image_alt || "" },
      { key: "about_profile_image", value: data.profile_image || "" },
      { key: "about_profile_image_alt", value: data.profile_image_alt || "" },
      { key: "about_biography_title", value: data.biography_title || "" },
      { key: "about_biography_intro", value: data.biography_intro || "" },
      { key: "about_biography_content", value: data.biography_content || "" },
      { key: "about_philosophy_title", value: data.philosophy_title },
      { key: "about_philosophy_quote", value: data.philosophy_quote },
      { key: "about_philosophy_description", value: data.philosophy_description || "" },
      { key: "about_seo_title", value: data.seo_title || "" },
      { key: "about_seo_description", value: data.seo_description || "" },
      { key: "about_og_image", value: data.og_image || "" },
      { key: "about_og_title", value: data.og_title || "" },
      { key: "about_og_description", value: data.og_description || "" },
      { key: "about_published", value: String(data.published) },
    ].map((r) => ({
      ...r,
      description: "About page CMS content setting",
      updated_at: now,
    }));

    const { error: settingsError } = await client
      .from("site_settings")
      .upsert(settingsRows, { onConflict: "key" });

    if (settingsError && !aboutPagesSaved) {
      throw new Error(`Failed to save about page settings: ${settingsError.message}`);
    }

    return {
      success: true,
      updated_at: now,
      aboutPagesSaved,
    };
  });
