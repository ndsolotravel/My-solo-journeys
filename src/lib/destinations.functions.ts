import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Post } from "./posts.functions";

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
  const { data, error } = await supabaseAdmin
    .from("destinations")
    .select("id,title,slug,country,region,description,featured_image")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Destination[];
});

export const getDestinationBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("destinations")
      .select("id,title,slug,country,region,description,featured_image")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    const POST_COLS =
      "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,destination_id";

    let posts: Post[] = [];
    const { data: linkedPosts } = await supabaseAdmin
      .from("posts")
      .select(`${POST_COLS},destinations(title,slug)`)
      .eq("published", true)
      .eq("destination_id", row.id)
      .order("published_at", { ascending: false });

    if (linkedPosts && linkedPosts.length > 0) {
      posts = linkedPosts as Post[];
    } else {
      const { data: matchingPosts } = await supabaseAdmin
        .from("posts")
        .select(`${POST_COLS},destinations(title,slug)`)
        .eq("published", true)
        .or(
          `title.ilike.%${row.title}%,category.ilike.%${row.title}%,title.ilike.%${row.country}%,category.ilike.%${row.country}%`
        )
        .order("published_at", { ascending: false })
        .limit(12);

      if (matchingPosts && matchingPosts.length > 0) {
        posts = matchingPosts as Post[];
      } else {
        const { data: recentPosts } = await supabaseAdmin
          .from("posts")
          .select(`${POST_COLS},destinations(title,slug)`)
          .eq("published", true)
          .order("published_at", { ascending: false })
          .limit(6);
        posts = (recentPosts ?? []) as Post[];
      }
    }

    return { ...row, posts } as Destination & { posts: Post[] };
  });
