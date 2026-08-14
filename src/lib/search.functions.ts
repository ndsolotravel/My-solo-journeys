import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type SearchResult =
  | { kind: "post"; id: string; title: string; slug: string; excerpt: string | null; category: string }
  | { kind: "destination"; id: string; title: string; slug: string; country: string; region: string | null };

export const searchSite = createServerFn({ method: "GET" })
  .inputValidator((input) =>
    z.object({ q: z.string().min(1).max(120), limit: z.number().min(1).max(20).default(8) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const term = `%${data.q.replace(/[%_]/g, "")}%`;
    const [posts, dests] = await Promise.all([
      (supabaseAdmin
        .from("posts") as any)
        .select("id,title,slug,excerpt,category,tags")
        .eq("published", true)
        .or(
          `title.ilike.${term},excerpt.ilike.${term},content.ilike.${term},category.ilike.${term}`,
        )
        .limit(data.limit),
      (supabaseAdmin
        .from("destinations") as any)
        .select("id,title,slug,country,region,description")
        .eq("published", true)
        .or(
          `title.ilike.${term},country.ilike.${term},region.ilike.${term},description.ilike.${term}`,
        )
        .limit(data.limit),
    ]);

    const postResults: SearchResult[] =
      (posts.data ?? []).map((p: any) => ({
        kind: "post" as const,
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        category: p.category,
      }));
    const destResults: SearchResult[] =
      (dests.data ?? []).map((d: any) => ({
        kind: "destination" as const,
        id: d.id,
        title: d.title,
        slug: d.slug,
        country: d.country,
        region: d.region,
      }));

    return { results: [...postResults, ...destResults] };
  });
