import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
};

const POST_COLUMNS =
  "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at";

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
    let q = supabaseAdmin
      .from("posts")
      .select(POST_COLUMNS, { count: "exact" })
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
    q = q.range(data.offset, data.offset + data.limit - 1);
    const { data: rows, count, error } = await q;
    if (error) throw new Error(error.message);
    return { posts: (rows ?? []) as Post[], total: count ?? 0 };
  });

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .select(POST_COLUMNS)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) return { post: null, related: [] as Post[] };
    const { data: related } = await supabaseAdmin
      .from("posts")
      .select(POST_COLUMNS)
      .eq("published", true)
      .eq("category", (post as Post).category)
      .neq("slug", data.slug)
      .order("published_at", { ascending: false })
      .limit(3);
    // fire-and-forget views increment
    await supabaseAdmin
      .from("posts")
      .update({ views: ((post as Post).views ?? 0) + 1 })
      .eq("id", (post as Post).id);
    return { post: post as Post, related: (related ?? []) as Post[] };
  });

export const listAllPostSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("slug,updated_at")
    .eq("published", true);
  if (error) throw new Error(error.message);
  return (data ?? []) as { slug: string; updated_at: string }[];
});
