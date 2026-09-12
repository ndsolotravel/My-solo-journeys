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
  category: string | null;
  featured: boolean;
  latitude?: number | null;
  longitude?: number | null;
  posts?: Post[];
};

export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  let { data, error } = await supabaseAdmin
    .from("destinations")
    .select(
      `
      id,
      title,
      slug,
      country,
      region,
      description,
      featured_image,
      category,
      featured,
      latitude,
      longitude,
      created_at,
      posts:posts(id, title, slug, cover_image, category, excerpt, reading_minutes, destination_id, published, published_at, created_at)
    `,
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  let rows: any[] | null = data;
  // Graceful fallback if category or featured columns are missing in remote DB
  if (error && (error.message?.includes("category") || error.message?.includes("featured"))) {
    const fallback = await supabaseAdmin
      .from("destinations")
      .select(
        `
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
      `,
      )
      .eq("published", true)
      .order("created_at", { ascending: false });
    rows = fallback.data;
    error = fallback.error;
  }

  if (error) throw new Error(error.message);

  const resolved = (rows ?? []).map((row: any) => {
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

    const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "";

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
      category: row.category ?? null,
      featured: row.featured === true,
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
    const rawSlug = data.slug.trim();
    let decodedSlug = rawSlug;
    try {
      decodedSlug = decodeURIComponent(rawSlug);
    } catch {
      // fallback to raw
    }

    let { data: row, error } = await supabaseAdmin
      .from("destinations")
      .select("*")
      .eq("slug", rawSlug)
      .maybeSingle();

    if (!row && decodedSlug !== rawSlug) {
      const fallbackRes = await supabaseAdmin
        .from("destinations")
        .select("*")
        .eq("slug", decodedSlug)
        .maybeSingle();
      if (!error && fallbackRes.data) {
        row = fallbackRes.data;
      }
    }

    if (error) throw new Error(error.message);
    if (!row) return null;

    // Query posts belonging strictly to this destination by destination_id
    const { data: posts, error: postsError } = await supabaseAdmin
      .from("posts")
      .select(
        "id, title, slug, excerpt, content, cover_image, category, tags, featured, views, reading_minutes, published_at, created_at, destination_id, travel_date, location_name, latitude, longitude, seo_title, seo_description, og_image_url, author_name, destinations(id,title,slug)",
      )
      .eq("destination_id", row.id)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (postsError) throw new Error(postsError.message);

    const linkedPosts = (posts ?? []).filter((p: any) => p.cover_image);
    let coverPhoto = linkedPosts[0]?.cover_image;
    if (!coverPhoto && row.featured_image) {
      coverPhoto = row.featured_image;
    }

    const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "";

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
