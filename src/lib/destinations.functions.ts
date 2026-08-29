import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Post } from "./posts.functions";
import { resolveMediaUrl } from "./admin.functions";

export type Destination = {
  id: string;
  title: string;
  slug: string;
  country: string;
  region: string | null;
  description: string | null;
  featured_image: string | null;
  latitude?: number | null;
  longitude?: number | null;
  posts?: Post[];
};

export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Fetch destinations with linked published posts strictly matching destination_id foreign key
  const { data, error } = await supabaseAdmin
    .from("destinations")
    .select(`
      id,
      title,
      slug,
      country,
      region,
      description,
      featured_image,
      latitude,
      longitude,
      created_at,
      posts:posts(id, title, slug, cover_image, category, excerpt, reading_minutes, destination_id, published, published_at, created_at)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const resolved = (data ?? []).map((row: any) => {
    // Strictly filter published posts that belong to this destination
    const linkedPosts = (row.posts ?? [])
      .filter((p: any) => p.published !== false && p.destination_id === row.id)
      .sort((a: any, b: any) => {
        const timeA = new Date(a.published_at || a.created_at || 0).getTime();
        const timeB = new Date(b.published_at || b.created_at || 0).getTime();
        return timeB - timeA;
      });

    const postsWithCovers = linkedPosts.filter((p: any) => p.cover_image);
    let coverPhoto = postsWithCovers[0]?.cover_image;

    // Fallback to destination's own featured_image
    if (!coverPhoto && row.featured_image) {
      coverPhoto = row.featured_image;
    }

    const resolvedImage = coverPhoto
      ? resolveMediaUrl(coverPhoto, supabaseAdmin)
      : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";

    const resolvedPosts = linkedPosts.map((p: any) => ({
      ...p,
      cover_image: resolveMediaUrl(p.cover_image, supabaseAdmin) || resolvedImage,
    }));

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      country: row.country,
      region: row.region,
      description: row.description,
      featured_image: resolvedImage,
      latitude: typeof row.latitude === "number" && !isNaN(row.latitude) ? row.latitude : null,
      longitude: typeof row.longitude === "number" && !isNaN(row.longitude) ? row.longitude : null,
      posts: resolvedPosts as Post[],
    } as Destination;
  });

  return resolved;
});

export const getDestinationBySlug = createServerFn({ method: "GET" })
  .validator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("destinations")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    // Query posts belonging strictly to this destination by destination_id
    const { data: posts, error: postsError } = await supabaseAdmin
      .from("posts")
      .select("id, title, slug, excerpt, content, cover_image, category, tags, featured, views, reading_minutes, published_at, created_at, destination_id, travel_date, location_name, latitude, longitude, seo_title, seo_description, og_image_url, author_name, destinations(id,title,slug)")
      .eq("destination_id", row.id)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (postsError) throw new Error(postsError.message);

    const linkedPosts = (posts ?? []).filter((p: any) => p.cover_image);
    let coverPhoto = linkedPosts[0]?.cover_image;
    if (!coverPhoto && row.featured_image) {
      coverPhoto = row.featured_image;
    }

    const resolvedImage = coverPhoto
      ? resolveMediaUrl(coverPhoto, supabaseAdmin)
      : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";

    const resolvedPosts = (posts ?? []).map((p: any) => ({
      ...p,
      cover_image: resolveMediaUrl(p.cover_image, supabaseAdmin) || resolvedImage,
    }));

    return {
      ...row,
      featured_image: resolvedImage,
      posts: resolvedPosts as Post[],
    } as Destination & { posts: Post[] };
  });

