import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor, resolveMediaUrl } from "@/lib/admin.functions";
import { extractBlogMediaPath } from "@/lib/media";
import { slugify } from "@/lib/categories.functions";

// ---------------- Types ----------------

export type PhotoCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  photo_count: number;
};

export type ArchivePhoto = {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  location: string | null;
  captured_at: string | null;
  story: string | null;
  camera: string | null;
  alt_text: string;
  categories: { id: string; name: string; slug: string }[];
  sort_order: number;
  published: boolean;
};

export type EditorPhoto = {
  id?: string;
  slug?: string;
  title: string;
  image_url: string;
  location: string;
  captured_at: string | null;
  story: string;
  camera: string;
  alt_text: string;
  category_ids: string[];
  sort_order: number;
  published: boolean;
};

type PhotoRow = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  location: string | null;
  captured_at: string | null;
  story: string | null;
  camera: string | null;
  alt_text: string;
  width: number | null;
  height: number | null;
  published: boolean;
  sort_order: number;
};

const DEFAULT_PHOTO_SELECT =
  "id,title,slug,image_url,location,captured_at,story,camera,alt_text,width,height,published,sort_order,created_at";

// ---------------- Shared helpers ----------------

function isPublishedPhotoRow(row: PhotoRow | Record<string, unknown>): boolean {
  return row.published !== false;
}

function mapPhotoRow(row: PhotoRow, _categoriesById: Map<string, { id: string; name: string; slug: string }>, client: any): ArchivePhoto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    image_url: resolveMediaUrl(row.image_url, client),
    location: row.location,
    captured_at: row.captured_at,
    story: row.story,
    camera: row.camera,
    alt_text: row.alt_text,
    categories: [],
    sort_order: row.sort_order,
    published: row.published,
  };
}

async function loadPhotoArchiveData(client: any, opts: { category?: string; q?: string; includeUnpublished?: boolean } = {}) {
  const [categoryResult, linkResult, photoResult] = await Promise.all([
    client
      .from("photo_categories")
      .select("id,name,slug,description,image_url,display_order")
      .order("display_order", { ascending: true }),
    client.from("photo_category_links").select("photo_id,category_id"),
    client
      .from("photos")
      .select(DEFAULT_PHOTO_SELECT)
      .order("sort_order", { ascending: true })
      .limit(800),
  ]);

  const categories: PhotoCategory[] = (categoryResult.data ?? []).map((c: any) => ({
    ...c,
    image_url: c.image_url ? resolveMediaUrl(c.image_url, client) : null,
    photo_count: 0,
  }));
  const catById = new Map(categories.map((c) => [c.id, c]));

  const catLinks: { photo_id: string; category_id: string }[] = linkResult.data ?? [];
  const photosByPhotoId = new Map<string, ArchivePhoto>();

  for (const row of photoResult.data ?? []) {
    if (!opts.includeUnpublished && row.published !== true) continue;
    const photo = mapPhotoRow(row, catById, client);
    photosByPhotoId.set(photo.id, photo);
    const countSet = new Set<string>();
    for (const link of catLinks) {
      if (link.photo_id !== photo.id) continue;
      const cat = catById.get(link.category_id);
      if (!cat || countSet.has(cat.id)) continue;
      countSet.add(cat.id);
      photo.categories.push({ id: cat.id, name: cat.name, slug: cat.slug });
      cat.photo_count++;
    }
  }

  const orderedPhotos = [...photosByPhotoId.values()];

  let photos = orderedPhotos;
  if (opts.category && opts.category.trim()) {
    const want = opts.category.trim().toLowerCase();
    photos = photos.filter((p) => p.categories.some((c) => c.slug.toLowerCase() === want));
  }
  if (opts.q && opts.q.trim()) {
    const needle = opts.q.trim().toLowerCase();
    photos = photos.filter((p) =>
      [p.title, p.location, p.story, p.alt_text, p.categories.map((c) => c.name).join(" ")]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(needle)),
    );
  }

  return { photos, categories };
}

// ---------------- Public ----------------

export const listPhotoArchive = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const parsed = z
      .object({
        category: z.string().min(1).max(100).optional(),
        q: z.string().max(200).optional(),
      })
      .catch({})
      .parse(input);
    return {
      category: parsed.category || undefined,
      q: parsed.q || undefined,
    };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { photos, categories } = await loadPhotoArchiveData(supabaseAdmin, data);
    return { photos, categories };
  });

export const listPhotoArchiveCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { categories } = await loadPhotoArchiveData(supabaseAdmin);
  return categories;
});

export const getPhotoArchiveItem = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = supabaseAdmin;

    const [photoResult, categoryResult, linkResult, orderResult] = await Promise.all([
      client.from("photos").select(DEFAULT_PHOTO_SELECT).eq("slug", data.slug.toLowerCase().trim()).maybeSingle(),
      client.from("photo_categories").select("id,name,slug").order("display_order", { ascending: true }),
      client.from("photo_category_links").select("photo_id,category_id"),
      client
        .from("photos")
        .select("id,slug,title,image_url")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(800),
    ]);

    const row = photoResult.data;
    if (!row || row.published === false) {
      return { photo: null, prev: null, next: null };
    }

    const catById = new Map((categoryResult.data ?? []).map((c: any) => [c.id, c]));
    const links = linkResult.data ?? [];
    const categories = links
      .filter((l: any) => l.photo_id === row.id)
      .map((l: any) => catById.get(l.category_id))
      .filter(Boolean)
      .map((c: any) => ({ id: c.id, name: c.name, slug: c.slug }));

    const photo: ArchivePhoto = {
      id: row.id,
      slug: row.slug,
      title: row.title,
      image_url: resolveMediaUrl(row.image_url, client),
      location: row.location,
      captured_at: row.captured_at,
      story: row.story,
      camera: row.camera,
      alt_text: row.alt_text,
      categories,
      sort_order: row.sort_order,
      published: row.published,
    };

    const ordered = (orderResult.data ?? []).filter(isPublishedPhotoRow);
    const idx = ordered.findIndex((p: any) => p.id === row.id);
    const prev = idx > 0 ? ordered[idx - 1] : null;
    const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

    const toNavRef = (p: any) => ({
      slug: p.slug,
      title: p.title,
      image_url: resolveMediaUrl(p.image_url, client),
    });

    return {
      photo,
      prev: prev ? toNavRef(prev) : null,
      next: next ? toNavRef(next) : null,
    };
  });

// ---------------- Admin ----------------

const editorPhotoSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1, "Photo title is required"),
  image_url: z.string().min(1),
  location: z.string().max(300).nullable().optional(),
  captured_at: z.string().max(20).nullable().optional(),
  story: z.string().max(5000).nullable().optional(),
  camera: z.string().max(200).nullable().optional(),
  alt_text: z.string().min(1, "Alt text is required for every photograph"),
  category_ids: z.array(z.string().uuid()).default([]),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const adminListPhotoArchiveEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ photos: EditorPhoto[]; categories: PhotoCategory[] }> => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    const { photos, categories } = await loadPhotoArchiveData(client, { includeUnpublished: true });

    const editorPhotos: EditorPhoto[] = photos.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      image_url: p.image_url,
      location: p.location ?? "",
      captured_at: p.captured_at,
      story: p.story ?? "",
      camera: p.camera ?? "",
      alt_text: p.alt_text,
      category_ids: p.categories.map((c) => c.id),
      sort_order: p.sort_order,
      published: p.published,
    }));

    return { photos: editorPhotos, categories };
  });

export const adminSavePhotoArchive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        photos: z.array(editorPhotoSchema),
        deletedIds: z.array(z.string().uuid()).default([]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }): Promise<{ ok: true; photos: { id: string; slug: string }[] }> => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data: existingRows } = await client.from("photos").select("id,slug,image_url");
    const existing = new Map((existingRows ?? []).map((r: any) => [r.id, r]));
    const usedSlugs = new Set((existingRows ?? []).map((r: any) => r.slug));

    const finalizeSlug = (title: string, preferred?: string) => {
      let base = preferred && preferred.trim() ? slugify(preferred) : slugify(title);
      if (!base) base = "photo";
      let candidate = base;
      let n = 2;
      while (usedSlugs.has(candidate)) candidate = `${base}-${n++}`;
      usedSlugs.add(candidate);
      return candidate;
    };

    const removeStorageIfNeeded = async (oldUrl?: string | null, keepUrl?: string) => {
      if (!oldUrl || oldUrl === keepUrl) return;
      const path = extractBlogMediaPath(oldUrl);
      if (!path) return;
      try {
        await client.storage.from("blog-media").remove([path]);
      } catch (err) {
        console.warn("[adminSavePhotoArchive] Storage cleanup error:", err);
      }
    };

    const results: { id: string; slug: string }[] = [];

    for (const photo of data.photos) {
      if (photo.id) {
        const prev = existing.get(photo.id);
        const nextSlug = photo.slug && photo.slug.trim() ? photo.slug.trim() : prev?.slug ?? finalizeSlug(photo.title);
        const { error: updateError } = await client.from("photos").update({
          title: photo.title,
          slug: nextSlug,
          image_url: photo.image_url,
          location: photo.location || null,
          captured_at: photo.captured_at || null,
          story: photo.story || null,
          camera: photo.camera || null,
          alt_text: photo.alt_text,
          published: photo.published,
          sort_order: photo.sort_order,
        }).eq("id", photo.id);
        if (updateError) throw new Error(updateError.message);

        await removeStorageIfNeeded(prev?.image_url, photo.image_url);
        results.push({ id: photo.id, slug: nextSlug });
      } else {
        const slug = finalizeSlug(photo.title);
        const { data: inserted, error: insertError } = await client
          .from("photos")
          .insert({
            title: photo.title,
            slug,
            image_url: photo.image_url,
            location: photo.location || null,
            captured_at: photo.captured_at || null,
            story: photo.story || null,
            camera: photo.camera || null,
            alt_text: photo.alt_text,
            published: photo.published,
            sort_order: photo.sort_order,
          })
          .select("id,slug")
          .single();
        if (insertError) throw new Error(insertError.message);
        results.push({ id: inserted.id, slug: inserted.slug });
      }

      const savedId = photo.id ?? results[results.length - 1].id;
      await client.from("photo_category_links").delete().eq("photo_id", savedId);
      if (photo.category_ids.length > 0) {
        const { error: linkError } = await client.from("photo_category_links").insert(
          photo.category_ids.map((category_id) => ({ photo_id: savedId, category_id })),
        );
        if (linkError) throw new Error(linkError.message);
      }

      // Keep explicit sort_order applied in the loop above coherent with the
      // submitted order by NOT re-bumping here; order is set at insert/update.
    }

    for (const id of data.deletedIds) {
      const row = existing.get(id);
      await client.from("photos").delete().eq("id", id);
      await removeStorageIfNeeded(row?.image_url);
    }

    return { ok: true, photos: results };
  });