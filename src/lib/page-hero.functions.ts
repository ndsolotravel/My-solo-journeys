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

  // Gallery and Contact pages reuse the site's available photos (post galleries, covers).
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
  const { data, error } = await client
    .from("site_settings")
    .select("key, value")
    .in("key", [keys.mode, keys.image]);

  if (error) return { mode: "auto" as const, image: "" };

  const modeRaw = data?.find((r: any) => r.key === keys.mode)?.value?.trim();
  const savedImage = data?.find((r: any) => r.key === keys.image)?.value?.trim() || "";
  return {
    mode: modeRaw === "manual" ? ("manual" as const) : ("auto" as const),
    image: savedImage,
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

    return { mode: saved.mode, image, autoImage } satisfies PageHeroConfig;
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
    } satisfies PageHeroConfig;
  });
