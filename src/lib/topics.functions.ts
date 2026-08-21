import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getTopicBySlug, type TopicCluster } from "@/lib/topics";
import type { Post } from "@/lib/posts.functions";

export type TopicWithPosts = TopicCluster & { posts: Post[] };

export const getTopicCluster = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<TopicWithPosts | null> => {
    const topic = getTopicBySlug(data.slug);
    if (!topic) return null;

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { resolveMediaUrl } = await import("@/lib/admin.functions");

      // Fetch posts matching any of the topic's tags or categories
      let query = (supabaseAdmin.from("posts") as any)
        .select("id,title,slug,excerpt,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,seo_title,seo_description,og_image_url,destinations(title,slug)")
        .eq("published", true);

      // Build OR filter: match tags OR categories
      const tagFilters = topic.tags.map((tag) => `tags.cs.{${tag}}`);
      const catFilters = topic.categories.map((cat) => `category.eq.${cat}`);
      const orFilter = [...tagFilters, ...catFilters].join(",");

      query = query.or(orFilter);
      query = query.order("published_at", { ascending: false });
      query = query.limit(20);

      const { data: posts, error } = await query;

      if (error) {
        console.error("[getTopicCluster] Query error:", error.message);
        return { ...topic, posts: [] };
      }

      const resolved = (posts ?? []).map((p: Record<string, unknown>) => ({
        ...p,
        cover_image: p.cover_image ? resolveMediaUrl(p.cover_image as string, supabaseAdmin) : null,
        og_image_url: p.og_image_url ? resolveMediaUrl(p.og_image_url as string, supabaseAdmin) : null,
      })) as Post[];

      return { ...topic, posts: resolved };
    } catch (err) {
      console.error("[getTopicCluster] Error:", err);
      return { ...topic, posts: [] };
    }
  });
