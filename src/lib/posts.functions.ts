import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PostGalleryItem = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
  author_name?: string | null;
  destination_id?: string | null;
  destinations?: { title: string; slug: string } | null;
  travel_date?: string | null;
  location_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
  gallery?: PostGalleryItem[];
  post_translations?: {
    language_code: string;
    title: string;
    excerpt: string | null;
    content: string;
    seo_title: string | null;
    seo_description: string | null;
  }[];
};

const BASE_POST_COLUMNS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,latitude,longitude";

const FULL_POST_COLUMNS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,destination_id,travel_date,location_name,latitude,longitude,seo_title,seo_description,og_image_url,author_name";

export const listPosts = createServerFn({ method: "GET" })
  .inputValidator((input) =>
    z
      .object({
        category: z.string().optional(),
        categories: z.array(z.string()).optional(),
        tag: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(50).default(24),
        offset: z.number().min(0).default(0),
        featuredOnly: z.boolean().optional(),
        sort: z.enum(["latest", "popular"]).default("latest"),
        sinceDays: z.number().min(1).max(365).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const buildQuery = (selectCols: string) => {
      let q = (supabaseAdmin
        .from("posts") as any)
        .select(selectCols, { count: "exact" })
        .eq("published", true);
      if (data.sort === "popular") q = q.order("views", { ascending: false });
      else q = q.order("published_at", { ascending: false });
      if (data.category) q = q.eq("category", data.category);
      if (data.categories && data.categories.length) q = q.in("category", data.categories);
      if (data.tag) q = q.contains("tags", [data.tag]);
      if (data.search) q = q.ilike("title", `%${data.search}%`);
      if (data.featuredOnly) q = q.eq("featured", true);
      if (data.sinceDays) {
        const since = new Date(Date.now() - data.sinceDays * 86400000).toISOString();
        q = q.gte("published_at", since);
      }
      return q.range(data.offset, data.offset + data.limit - 1);
    };

    // Try full query first with destination relation, fallback to basic columns if schema not migrated yet
    const fullRes = await buildQuery(`${FULL_POST_COLUMNS},destinations(title,slug),post_translations(language_code,title,excerpt)`);
    if (!fullRes.error && fullRes.data) {
      return { posts: fullRes.data as unknown as Post[], total: fullRes.count ?? 0 };
    }

    const baseRes = await buildQuery(BASE_POST_COLUMNS);
    if (baseRes.error) throw new Error(baseRes.error.message);
    return { posts: (baseRes.data ?? []) as unknown as Post[], total: baseRes.count ?? 0 };
  });

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let postRes = await (supabaseAdmin
      .from("posts") as any)
      .select(`${FULL_POST_COLUMNS},destinations(title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(language_code,title,excerpt,content,seo_title,seo_description)`)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();

    if (postRes.error) {
      postRes = await (supabaseAdmin
        .from("posts") as any)
        .select(BASE_POST_COLUMNS)
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
    }

    if (postRes.error) throw new Error(postRes.error.message);
    const post = postRes.data;
    if (!post) return { post: null, related: [] as Post[] };

    let gallery = ((post as Record<string, unknown>).post_gallery ?? []) as PostGalleryItem[];
    if (!Array.isArray(gallery) || gallery.length === 0) {
      // Direct query fallback for post_gallery if nested relation was empty
      const { data: directGal } = await (supabaseAdmin
        .from("post_gallery") as any)
        .select("id, image_url, alt_text, sort_order")
        .eq("post_id", (post as any).id)
        .order("sort_order", { ascending: true });
      if (Array.isArray(directGal) && directGal.length > 0) {
        gallery = directGal as PostGalleryItem[];
      }
    }

    const { resolveMediaUrl } = await import("@/lib/admin.functions");

    if (Array.isArray(gallery)) {
      gallery = gallery.map((g, idx) => ({
        id: g.id,
        image_url: resolveMediaUrl(g.image_url, supabaseAdmin),
        alt_text: g.alt_text ?? "",
        sort_order: g.sort_order ?? idx,
      }));
      gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    }

    const { data: related } = await (supabaseAdmin
      .from("posts") as any)
      .select(BASE_POST_COLUMNS)
      .eq("published", true)
      .eq("category", (post as unknown as Post).category)
      .neq("slug", data.slug)
      .order("published_at", { ascending: false })
      .limit(3);

    // fire-and-forget views increment
    await (supabaseAdmin
      .from("posts") as any)
      .update({ views: ((post as unknown as Post).views ?? 0) + 1 })
      .eq("id", (post as unknown as Post).id);

    const fullPost: Post = {
      ...(post as unknown as Post),
      cover_image: resolveMediaUrl((post as any).cover_image, supabaseAdmin),
      og_image_url: resolveMediaUrl((post as any).og_image_url, supabaseAdmin),
      gallery,
    };

    return { post: fullPost, related: (related ?? []) as Post[] };
  });

export const listAllPostSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await (supabaseAdmin
    .from("posts") as any)
    .select("slug,updated_at")
    .eq("published", true);
  if (error) throw new Error(error.message);
  return (data ?? []) as { slug: string; updated_at: string }[];
});
