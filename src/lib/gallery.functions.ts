import { createServerFn } from "@tanstack/react-start";
import { resolveMediaUrl } from "@/lib/admin.functions";

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
};

/**
 * Public gallery source for hero banner pickers and the homepage preview.
 * Reads the dedicated photography archive (photos table) so the gallery,
 * homepage preview and hero "auto" image all agree on the same curated set.
 */
export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const [photoResult, linkResult, categoryResult] = await Promise.all([
    supabaseAdmin
      .from("photos")
      .select("id,title,slug,image_url,alt_text,sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(800),
    supabaseAdmin.from("photo_category_links").select("photo_id,category_id"),
    supabaseAdmin.from("photo_categories").select("id,name,slug"),
  ]);

  const linkByPhoto = new Map<string, string[]>();
  for (const l of linkResult.data ?? []) {
    const arr = linkByPhoto.get(l.photo_id) ?? [];
    arr.push(l.category_id);
    linkByPhoto.set(l.photo_id, arr);
  }
  const catById = new Map((categoryResult.data ?? []).map((c) => [c.id, c]));

  return (photoResult.data ?? []).map((p) => {
    const firstCategory = linkByPhoto.get(p.id)?.[0];
    return {
      id: p.id,
      image_url: resolveMediaUrl(p.image_url, supabaseAdmin),
      caption: p.title || p.alt_text || null,
      category: firstCategory ? (catById.get(firstCategory)?.name ?? null) : null,
    } satisfies GalleryItem;
  });
});