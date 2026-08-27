import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { TOPIC_CLUSTERS, getTopicBySlug, type TopicCluster } from "@/lib/topics";
import type { Post } from "@/lib/posts.functions";

export type ActiveTopic = TopicCluster & {
  postCount: number;
  destinationCount: number;
  previewImage: string;
};

export type TopicWithPosts = TopicCluster & { posts: Post[] };

export const listActiveTopics = createServerFn({ method: "GET" })
  .handler(async (): Promise<ActiveTopic[]> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { resolveMediaUrl } = await import("@/lib/admin.functions");

      // Fetch all published posts
      const { data: postsData, error: postErr } = await (supabaseAdmin.from("posts") as any)
        .select("id,title,slug,cover_image,category,tags,destination_id")
        .eq("published", true);

      if (postErr) {
        console.error("[listActiveTopics] Posts query error:", postErr.message);
      }

      // Fetch all destinations
      const { data: destsData, error: destErr } = await (supabaseAdmin.from("destinations") as any)
        .select("id,title,slug,featured_image,country,region");

      if (destErr) {
        console.error("[listActiveTopics] Destinations query error:", destErr.message);
      }

      const posts = (postsData ?? []) as {
        id: string;
        title: string;
        slug: string;
        cover_image: string | null;
        category: string | null;
        tags: string[] | null;
        destination_id: string | null;
      }[];

      const destinations = (destsData ?? []) as {
        id: string;
        title: string;
        slug: string;
        featured_image: string | null;
        country: string | null;
        region: string | null;
      }[];

      const activeTopics: ActiveTopic[] = [];

      for (const topic of TOPIC_CLUSTERS) {
        // Find matching posts (case-insensitive for categories and tags)
        const matchingPosts = posts.filter((p) => {
          const postCat = (p.category || "").trim().toLowerCase();
          const matchCat = topic.categories.some((c) => c.toLowerCase() === postCat);

          const postTags = Array.isArray(p.tags)
            ? p.tags.map((t) => String(t).trim().toLowerCase())
            : [];
          const matchTag = topic.tags.some((t) => postTags.includes(t.toLowerCase()));

          return matchCat || matchTag;
        });

        // Find matching destinations
        const matchingDests = destinations.filter((d) => {
          const title = (d.title || "").toLowerCase();
          const region = (d.region || "").toLowerCase();
          const country = (d.country || "").toLowerCase();

          return topic.tags.some((t) => {
            const lowTag = t.toLowerCase();
            return title.includes(lowTag) || region.includes(lowTag) || country.includes(lowTag);
          });
        });

        const postCount = matchingPosts.length;
        const destinationCount = matchingDests.length;

        // ONLY keep topics that have existing published content (posts > 0 or destinations > 0)
        if (postCount > 0 || destinationCount > 0) {
          // Resolve hero image or first matching post/destination cover image
          let previewImage = topic.heroImage;
          if (matchingPosts[0]?.cover_image) {
            previewImage = resolveMediaUrl(matchingPosts[0].cover_image, supabaseAdmin);
          } else if (matchingDests[0]?.featured_image) {
            previewImage = resolveMediaUrl(matchingDests[0].featured_image, supabaseAdmin);
          }

          activeTopics.push({
            ...topic,
            postCount,
            destinationCount,
            previewImage: previewImage || topic.heroImage,
          });
        }
      }

      return activeTopics;
    } catch (err) {
      console.error("[listActiveTopics] Error:", err);
      return [];
    }
  });

export const getTopicCluster = createServerFn({ method: "GET" })
  .validator((input) => z.object({ slug: z.string().min(1) }).parse(input))
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

      // Build OR filter: match tags OR categories with case-variants
      const tagFilters = topic.tags.flatMap((tag) => [
        `tags.cs.{${tag}}`,
        `tags.cs.{${tag.toLowerCase()}}`,
        `tags.cs.{${tag.charAt(0).toUpperCase() + tag.slice(1)}}`,
      ]);
      const catFilters = topic.categories.flatMap((cat) => [
        `category.eq.${cat}`,
        `category.eq.${cat.toLowerCase()}`,
        `category.eq.${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
      ]);
      const uniqueFilters = Array.from(new Set([...tagFilters, ...catFilters]));
      const orFilter = uniqueFilters.join(",");

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
