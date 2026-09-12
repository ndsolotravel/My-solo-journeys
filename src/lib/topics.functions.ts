import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { TOPIC_CLUSTERS, getTopicBySlug, type TopicCluster } from "@/lib/topics";
import { extractCountryFromLocation, type Post } from "@/lib/posts.functions";

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

      // Fetch all published posts with destination relationships
      const { data: postsData, error: postErr } = await (supabaseAdmin.from("posts") as any)
        .select("id,title,slug,cover_image,category,tags,destination_id,location_name,published_at,created_at,destinations(id,title,slug,country,region)")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

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
        location_name: string | null;
        destinations: {
          id: string;
          title: string;
          slug: string;
          country: string | null;
          region: string | null;
        } | null;
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
        const topicCountry = (topic.country || "").trim().toLowerCase();

        // 1. Filter matching posts strictly enforcing country boundaries
        const matchingPosts = posts.filter((p) => {
          const postCountry = (
            p.destinations?.country ||
            extractCountryFromLocation(p.location_name) ||
            ""
          )
            .trim()
            .toLowerCase();

          // If topic is tied to a country, reject posts explicitly from a different country
          if (topicCountry && postCountry && postCountry !== topicCountry) {
            return false;
          }

          // Direct destination slug link match
          if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
            const dSlug = p.destinations?.slug;
            if (dSlug && topic.destinationSlugs.some((ds) => ds.toLowerCase() === dSlug.toLowerCase())) {
              return true;
            }
          }

          // Category and Tag matching
          const postCat = (p.category || "").trim().toLowerCase();
          const matchCat = topic.categories.some((c) => c.toLowerCase() === postCat);

          const postTags = Array.isArray(p.tags)
            ? p.tags.map((t) => String(t).trim().toLowerCase())
            : [];
          const matchTag = topic.tags.some((t) => postTags.includes(t.toLowerCase()));

          if (!matchCat && !matchTag) return false;

          // If post country could not be derived, check if location_name contains country
          if (topicCountry && !postCountry) {
            const loc = (p.location_name || "").toLowerCase();
            if (!loc.includes(topicCountry)) return false;
          }

          return true;
        });

        // 2. Filter matching destinations strictly enforcing country boundaries
        const matchingDests = destinations.filter((d) => {
          const destCountry = (d.country || "").trim().toLowerCase();
          if (topicCountry && destCountry && destCountry !== topicCountry) {
            return false;
          }

          if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
            if (
              topic.destinationSlugs.some(
                (ds) => ds.toLowerCase() === (d.slug || "").toLowerCase(),
              )
            ) {
              return true;
            }
          }

          const title = (d.title || "").toLowerCase();
          const region = (d.region || "").toLowerCase();
          return topic.tags.some((t) => {
            const lowTag = t.toLowerCase();
            return title.includes(lowTag) || region.includes(lowTag);
          });
        });

        const postCount = matchingPosts.length;
        const destinationCount = matchingDests.length;

        // ONLY keep topics that have existing published content (posts > 0 or destinations > 0)
        if (postCount > 0 || destinationCount > 0) {
          // Resolve hero image: curated topic.heroImage first, then verified post/destination
          let previewImage = "";
          if (topic.heroImage && topic.heroImage.trim()) {
            previewImage = resolveMediaUrl(topic.heroImage, supabaseAdmin);
          } else if (matchingPosts[0]?.cover_image) {
            previewImage = resolveMediaUrl(matchingPosts[0].cover_image, supabaseAdmin);
          } else if (matchingDests[0]?.featured_image) {
            previewImage = resolveMediaUrl(matchingDests[0].featured_image, supabaseAdmin);
          }

          activeTopics.push({
            ...topic,
            postCount,
            destinationCount,
            previewImage: previewImage || "",
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
      const topicCountry = (topic.country || "").trim().toLowerCase();

      // Fetch published posts with full destination details
      const query = (supabaseAdmin.from("posts") as any)
        .select(
          "id,title,slug,excerpt,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,seo_title,seo_description,og_image_url,destination_id,destinations(id,title,slug,country,region)",
        )
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

      const { data: posts, error } = await query;

      if (error) {
        console.error("[getTopicCluster] Query error:", error.message);
        return { ...topic, posts: [] };
      }

      const allPosts = (posts ?? []) as any[];

      // Filter posts belonging strictly to this topic with country boundaries enforced
      const matchingPosts = allPosts.filter((p) => {
        const postCountry = (
          p.destinations?.country ||
          extractCountryFromLocation(p.location_name) ||
          ""
        )
          .trim()
          .toLowerCase();

        // Reject posts from a different country
        if (topicCountry && postCountry && postCountry !== topicCountry) {
          return false;
        }

        // Direct destination slug link match
        if (topic.destinationSlugs && topic.destinationSlugs.length > 0) {
          const dSlug = p.destinations?.slug;
          if (dSlug && topic.destinationSlugs.some((ds) => ds.toLowerCase() === dSlug.toLowerCase())) {
            return true;
          }
        }

        // Category and Tag matching
        const postCat = (p.category || "").trim().toLowerCase();
        const matchCat = topic.categories.some((c) => c.toLowerCase() === postCat);

        const postTags = Array.isArray(p.tags)
          ? p.tags.map((t: string) => String(t).trim().toLowerCase())
          : [];
        const matchTag = topic.tags.some((t) => postTags.includes(t.toLowerCase()));

        if (!matchCat && !matchTag) return false;

        // If post country could not be derived, check if location_name contains country
        if (topicCountry && !postCountry) {
          const loc = (p.location_name || "").toLowerCase();
          if (!loc.includes(topicCountry)) return false;
        }

        return true;
      });

      const resolved = matchingPosts.map((p: Record<string, unknown>) => ({
        ...p,
        cover_image: p.cover_image ? resolveMediaUrl(p.cover_image as string, supabaseAdmin) : null,
        og_image_url: p.og_image_url ? resolveMediaUrl(p.og_image_url as string, supabaseAdmin) : null,
      })) as Post[];

      let heroImg = topic.heroImage ? resolveMediaUrl(topic.heroImage, supabaseAdmin) : "";
      if (!heroImg && resolved[0]?.cover_image) {
        heroImg = resolved[0].cover_image;
      }

      return {
        ...topic,
        heroImage: heroImg,
        posts: resolved,
      };
    } catch (err) {
      console.error("[getTopicCluster] Error:", err);
      return { ...topic, posts: [] };
    }
  });
