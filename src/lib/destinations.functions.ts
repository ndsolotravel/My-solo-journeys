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
  posts?: Post[];
};

export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Fetch destinations with linked published posts
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
      created_at,
      posts:posts(id, title, slug, cover_image, category, excerpt, reading_minutes, published, published_at, created_at)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Fetch all published posts as fallback lookup for destination title/slug links
  const { data: allPosts } = await supabaseAdmin
    .from("posts")
    .select("id, title, slug, cover_image, category, excerpt, reading_minutes, destination_id, published, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  const resolved = (data ?? []).map((row: any) => {
    // 1. Find linked published posts through destination_id foreign relation
    let linkedPosts = (row.posts ?? []).filter((p: any) => p.published !== false);
    
    // Fallback: match from all published posts by destination_id or title/slug matching
    if (linkedPosts.length === 0 && allPosts) {
      linkedPosts = allPosts.filter(
        (p: any) =>
          p.destination_id === row.id ||
          (p.slug && row.slug && (p.slug.includes(row.slug) || row.slug.includes(p.slug))) ||
          (p.title && row.title && (p.title.toLowerCase().includes(row.title.toLowerCase()) || row.title.toLowerCase().includes(p.title.toLowerCase())))
      );
    }

    linkedPosts.sort((a: any, b: any) => {
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
      posts: resolvedPosts as Post[],
    } as Destination;
  });

  return resolved;
});

export const getDestinationBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("destinations")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    let { data: posts, error: postsError } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("destination_id", row.id)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (postsError) throw new Error(postsError.message);

    // Fallback: If no posts explicitly linked via destination_id, search for posts matching destination slug or title
    if (!posts || posts.length === 0) {
      const { data: allPosts } = await supabaseAdmin
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

      if (allPosts && allPosts.length > 0) {
        posts = allPosts.filter(
          (p: any) =>
            p.destination_id === row.id ||
            (p.slug && row.slug && (p.slug.includes(row.slug) || row.slug.includes(p.slug))) ||
            (p.title && row.title && (p.title.toLowerCase().includes(row.title.toLowerCase()) || row.title.toLowerCase().includes(p.title.toLowerCase())))
        );
      }
    }

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

