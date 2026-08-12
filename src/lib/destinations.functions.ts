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
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    const { data: posts, error: postsError } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("destination_id", row.id);

    if (postsError) throw new Error(postsError.message);

    return { ...row, posts: (posts ?? []) as Post[] } as Destination & { posts: Post[] };
  });
