import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor, resolveMediaUrl } from "./admin.functions";

export type PageId = "destinations" | "gallery" | "contact";

export const PAGE_HERO_KEYS: Record<PageId, { mode: string; image: string }> = {
  destinations: { mode: "destinations_hero_mode", image: "destinations_hero_image" },
  gallery: { mode: "gallery_hero_mode", image: "gallery_hero_image" },
  contact: { mode: "contact_hero_mode", image: "contact_hero_image" },
};

export type PageHeroConfig = {
  mode: "auto" | "manual";
  image: string;
  autoImage: string;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  overlay?: string;
  buttonText?: string;
};

export const GALLERY_HERO_DEFAULTS = {
  badge: "Visual Archive · High Frontiers",
  title: "Moments Frozen in the Wild",
  titleHighlight: "High passes, silent valleys, raw frontiers.",
  description:
    "An intimate visual log of solo expeditions across Pakistan, the Karakoram, and high-altitude Himalayan trails.",
  overlay: "cinematic",
  buttonText: "Explore Photographs",
};

const PAGE_ID_SCHEMA = z.enum(["destinations", "gallery", "contact"]);

type AnyClient = any;

/**
 * Picks a suitable hero image from existing CMS content, mirroring the image
 * selection precedence used on each public page.
 */
async function loadAutoHeroImage(page: PageId, client: AnyClient): Promise<string> {
  if (page === "destinations") {
    const { data, error } = await client
      .from("destinations")
      .select(
        `
        id,
        title,
        featured_image,
        created_at,
        posts:posts(id, title, slug, cover_image, category, published, destination_id, published_at, created_at)
      `,
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) return "";

    for (const row of data ?? []) {
      const linkedPosts = (row.posts ?? [])
        .filter((p: any) => p.published !== false && p.destination_id === row.id)
        .sort((a: any, b: any) => {
          const timeA = new Date(a.published_at || a.created_at || 0).getTime();
          const timeB = new Date(b.published_at || b.created_at || 0).getTime();
          return timeB - timeA;
        });

      const coverPhoto = linkedPosts.find((p: any) => p.cover_image)?.cover_image;
      const raw = coverPhoto || row.featured_image;
      const resolved = resolveMediaUrl(raw, client);
      if (resolved) return resolved;
    }

    return "";
  }

  // Gallery and Contact pages reuse the site's photography archive first,
  // then fall back to post galleries and covers for older saved content.
  const { data: photos, error: photosError } = await client
    .from("photos")
    .select("id, image_url, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .limit(20);

  for (const p of photos ?? []) {
    if (typeof p.image_url === "string" && p.image_url.trim()) {
      const resolved = resolveMediaUrl(p.image_url, client);
      if (resolved) return resolved;
    }
  }
  if (photosError) return "";

  const { data: posts, error: postsError } = await (client.from("posts") as any)
    .select(
      "id, title, content, cover_image, published_at, post_gallery(id, image_url, alt_text, sort_order, created_at)",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (postsError) return "";

  for (const post of posts ?? []) {
    const pgItems = Array.isArray(post.post_gallery)
      ? [...post.post_gallery].sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      : [];

    for (const pg of pgItems) {
      if (typeof pg.image_url === "string" && pg.image_url.trim()) {
        const resolved = resolveMediaUrl(pg.image_url, client);
        if (resolved) return resolved;
      }
    }

    const coverResolved = resolveMediaUrl(post.cover_image, client);
    if (coverResolved) return coverResolved;
  }

  return "";
}

async function readHeroEditorValues(page: PageId, client: AnyClient) {
  const keys = PAGE_HERO_KEYS[page];
  const settingKeys = [
    keys.mode,
    keys.image,
    `${page}_hero_badge`,
    `${page}_hero_title`,
    `${page}_hero_title_highlight`,
    `${page}_hero_description`,
    `${page}_hero_overlay`,
    `${page}_hero_button_text`,
  ];
  const { data, error } = await client
    .from("site_settings")
    .select("key, value")
    .in("key", settingKeys);

  const defaults = page === "gallery" ? GALLERY_HERO_DEFAULTS : ({} as Record<string, string>);

  if (error) {
    return {
      mode: "auto" as const,
      image: "",
      badge: defaults.badge || "",
      title: defaults.title || "",
      titleHighlight: defaults.titleHighlight || "",
      description: defaults.description || "",
      overlay: defaults.overlay || "cinematic",
      buttonText: defaults.buttonText || "",
    };
  }

  const findVal = (k: string) => data?.find((r: any) => r.key === k)?.value?.trim();

  const modeRaw = findVal(keys.mode);
  const savedImage = findVal(keys.image) || "";
  const badge = findVal(`${page}_hero_badge`) ?? defaults.badge ?? "";
  const title = findVal(`${page}_hero_title`) ?? defaults.title ?? "";
  const titleHighlight = findVal(`${page}_hero_title_highlight`) ?? defaults.titleHighlight ?? "";
  const description = findVal(`${page}_hero_description`) ?? defaults.description ?? "";
  const overlay = findVal(`${page}_hero_overlay`) ?? defaults.overlay ?? "cinematic";
  const buttonText = findVal(`${page}_hero_button_text`) ?? defaults.buttonText ?? "";

  return {
    mode: modeRaw === "manual" ? ("manual" as const) : ("auto" as const),
    image: savedImage,
    badge,
    title,
    titleHighlight,
    description,
    overlay,
    buttonText,
  };
}

// ---------------- Public ----------------

export const getPageHeroConfig = createServerFn({ method: "GET" })
  .validator((page: unknown) => PAGE_ID_SCHEMA.parse(page))
  .handler(async ({ data: page }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const saved = await readHeroEditorValues(page, supabaseAdmin);

    let image = "";
    if (saved.mode === "manual") {
      image = saved.image ? resolveMediaUrl(saved.image, supabaseAdmin) : "";
    } else {
      image = await loadAutoHeroImage(page, supabaseAdmin);
    }

    const autoImage = saved.mode === "auto" ? image : await loadAutoHeroImage(page, supabaseAdmin);

    return {
      mode: saved.mode,
      image,
      autoImage,
      badge: saved.badge,
      title: saved.title,
      titleHighlight: saved.titleHighlight,
      description: saved.description,
      overlay: saved.overlay,
      buttonText: saved.buttonText,
    } satisfies PageHeroConfig;
  });

// ---------------- Admin ----------------

export const adminGetPageHeroEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((page: unknown) => PAGE_ID_SCHEMA.parse(page))
  .handler(async ({ context, data: page }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const saved = await readHeroEditorValues(page, client);
    const autoImage = await loadAutoHeroImage(page, client);

    return {
      mode: saved.mode,
      image: saved.image,
      autoImage,
      badge: saved.badge,
      title: saved.title,
      titleHighlight: saved.titleHighlight,
      description: saved.description,
      overlay: saved.overlay,
      buttonText: saved.buttonText,
    } satisfies PageHeroConfig;
  });
