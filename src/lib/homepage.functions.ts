import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor, resolveMediaUrl } from "@/lib/admin.functions";

// ---------------------------------------------------------------------------
// Homepage settings keys and defaults (mirror the original hardcoded homepage)
// ---------------------------------------------------------------------------

const HOMEPAGE_KEYS = [
  // Hero Banner
  "homepage_hero_mode",
  "homepage_hero_post_id",
  "homepage_hero_image",
  "homepage_hero_badge",
  "homepage_hero_title",
  "homepage_hero_title_highlight",
  "homepage_hero_description",
  "homepage_hero_button_text",
  "homepage_hero_button_link",
  "homepage_hero_secondary_button_text",
  "homepage_hero_secondary_button_link",
  // Journey in Numbers
  "homepage_stat_countries_mode",
  "homepage_stat_countries",
  "homepage_stat_trips",
  "homepage_stat_photos",
  "homepage_stat_photos_suffix",
  "homepage_stat_kilometres",
  "homepage_stat_kilometres_suffix",
  "homepage_stat_days",
  // Featured / Latest Blog Post
  "homepage_featured_mode",
  "homepage_featured_post_id",
] as const;

const HOMEPAGE_DEFAULTS: Record<string, string> = {
  homepage_hero_mode: "auto",
  homepage_hero_post_id: "",
  homepage_hero_image: "",
  homepage_hero_badge: "Solo · Slow · Cinematic",
  homepage_hero_title: "Stories from the high places",
  homepage_hero_title_highlight: "most people only fly over.",
  homepage_hero_description:
    "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.",
  homepage_hero_button_text: "Read the stories",
  homepage_hero_button_link: "/blog",
  homepage_hero_secondary_button_text: "Explore destinations",
  homepage_hero_secondary_button_link: "/destinations",
  homepage_stat_countries_mode: "auto",
  homepage_stat_countries: "",
  homepage_stat_trips: "102",
  homepage_stat_photos: "200",
  homepage_stat_photos_suffix: "K+",
  homepage_stat_kilometres: "18420",
  homepage_stat_kilometres_suffix: " km",
  homepage_stat_days: "142",
  homepage_featured_mode: "auto",
  homepage_featured_post_id: "",
};

export type HomepagePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  reading_minutes: number;
};

export type HomepageConfig = {
  settings: Record<string, string>;
  heroPost: HomepagePost | null;
  featuredPost: HomepagePost | null;
};

type SupabaseRow = {
  key: string;
  value: string;
};

async function fetchHomepageRows(client: any): Promise<Map<string, string>> {
  const { data, error } = await client
    .from("site_settings")
    .select("key, value")
    .in("key", [...HOMEPAGE_KEYS]);

  const map = new Map<string, string>();
  if (!error && Array.isArray(data)) {
    for (const row of data as SupabaseRow[]) {
      map.set(row.key, row.value);
    }
  }
  return map;
}

function mergeDefaults(rows: Map<string, string>): Record<string, string> {
  const settings: Record<string, string> = { ...HOMEPAGE_DEFAULTS };
  for (const key of HOMEPAGE_KEYS) {
    const value = rows.get(key);
    if (value !== undefined && value.trim() !== "") {
      settings[key] = value;
    }
  }
  return settings;
}

const POST_COLS = "id,title,slug,excerpt,cover_image,category,reading_minutes";

async function resolvePostById(
  id: string | null | undefined,
  client: any,
): Promise<HomepagePost | null> {
  if (!id) return null;
  const { data, error } = await (client.from("posts") as any)
    .select(POST_COLS)
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null,
  };
}

async function resolveLatestPost(client: any): Promise<HomepagePost | null> {
  const { data, error } = await (client.from("posts") as any)
    .select(POST_COLS)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null,
  };
}

async function resolveLatestFeatured(client: any): Promise<HomepagePost | null> {
  const { data, error } = await (client.from("posts") as any)
    .select(POST_COLS)
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null,
  };
}

// ------------------------- Public function -------------------------

export const getHomepageConfig = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const rows = await fetchHomepageRows(supabaseAdmin);
  const settings = mergeDefaults(rows);

  // Resolve hero post based on mode
  const heroMode = settings.homepage_hero_mode === "manual" ? "manual" : "auto";
  let heroPost: HomepagePost | null = null;
  if (heroMode === "manual") {
    heroPost = await resolvePostById(settings.homepage_hero_post_id, supabaseAdmin);
    if (!heroPost) heroPost = await resolveLatestPost(supabaseAdmin);
  } else {
    heroPost = await resolveLatestPost(supabaseAdmin);
  }

  // Resolve featured post based on mode
  const featuredMode = settings.homepage_featured_mode === "manual" ? "manual" : "auto";
  let featuredPost: HomepagePost | null = null;
  if (featuredMode === "manual") {
    featuredPost = await resolvePostById(settings.homepage_featured_post_id, supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestFeatured(supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestPost(supabaseAdmin);
  } else {
    featuredPost = await resolveLatestFeatured(supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestPost(supabaseAdmin);
  }

  return { settings, heroPost, featuredPost } satisfies HomepageConfig;
});

// ------------------------- Admin functions -------------------------

export const adminGetHomepageEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const rows = await fetchHomepageRows(client);
    const settings = mergeDefaults(rows);

    const { data: posts, error } = await (client.from("posts") as any)
      .select("id,title,slug,featured,published,scheduled_at,published_at,created_at")
      .order("published_at", { ascending: false });

    if (error) throw new Error(error.message);

    return {
      settings,
      posts: (posts ?? []) as Array<{
        id: string;
        title: string;
        slug: string;
        featured: boolean;
        published: boolean;
        published_at: string | null;
      }>,
    };
  });

export const adminSaveHomepageSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => {
    const raw = input ?? {};
    const settings: Record<string, string> = {};
    for (const key of HOMEPAGE_KEYS) {
      const value = (raw as Record<string, unknown>)[key];
      if (typeof value === "string") settings[key] = value;
    }
    // Accept either { settings: {...} } (client wrapper) or the flat map
    const flat =
      typeof (raw as Record<string, unknown>).settings === "object"
        ? (raw as Record<string, unknown>).settings
        : settings;
    return z
      .object({
        settings: z.record(z.string()),
      })
      .parse({ settings: flat });
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const rows = HOMEPAGE_KEYS.map((key) => ({
      key,
      value: data.settings[key] !== undefined ? data.settings[key].trim() : HOMEPAGE_DEFAULTS[key],
      updated_at: now,
    }));

    const { error } = await client.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) throw new Error(error.message);

    return { ok: true };
  });
