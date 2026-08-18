import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Post } from "./posts.functions";

export type Destination = {
  id: string;
  title: string;
  slug: string;
  country: string;
  region: string | null;
  location?: string | null;
  description: string | null;
  featured_image: string | null;
  published?: boolean;
  posts?: Post[];
};

export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { resolveMediaUrl } = await import("./admin.functions");
  const { data, error } = await (supabaseAdmin
    .from("destinations") as any)
    .select("id,title,slug,country,region,location,description,featured_image,published")
    .eq("published", true)
    .order("created_at", { ascending: false });

  let rows = data;
  if (error) {
    const { data: fallback, error: fbErr } = await (supabaseAdmin
      .from("destinations") as any)
      .select("id,title,slug,country,region,description,featured_image,published")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (fbErr) throw new Error(fbErr.message);
    rows = fallback;
  }

  return (rows ?? []).map((d: any) => ({
    ...d,
    featured_image: resolveMediaUrl(d.featured_image, supabaseAdmin),
    location: d.location || (d.region ? `${d.region}, ${d.country}` : d.country || ""),
  })) as Destination[];
});

export const getDestinationBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { resolveMediaUrl } = await import("./admin.functions");
    const { data: row, error } = await (supabaseAdmin
      .from("destinations") as any)
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;

    const { data: posts, error: postsError } = await (supabaseAdmin
      .from("posts") as any)
      .select("*")
      .eq("destination_id", row.id)
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (postsError) throw new Error(postsError.message);

    const formatted = {
      ...row,
      featured_image: resolveMediaUrl(row.featured_image, supabaseAdmin),
      location: row.location || (row.region ? `${row.region}, ${row.country}` : row.country || ""),
      posts: (posts ?? []).map((p: any) => ({
        ...p,
        cover_image: resolveMediaUrl(p.cover_image, supabaseAdmin),
      })) as Post[],
    };

    return formatted as Destination & { posts: Post[] };
  });

