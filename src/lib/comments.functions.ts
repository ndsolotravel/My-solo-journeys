import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type CommentRow = {
  id: string;
  post_id: string;
  user_id: string | null;
  comment: string;
  created_at: string;
  guest_name: string | null;
  rating: number | null;
  author?: { username: string | null; avatar_url: string | null } | null;
};

export const listComments = createServerFn({ method: "GET" })
  .validator((input) => z.object({ post_id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("comments")
      .select("id,post_id,user_id,comment,created_at,guest_name,rating")
      .eq("post_id", data.post_id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    const userIds = Array.from(
      new Set((rows ?? []).map((r) => r.user_id).filter((v): v is string => !!v)),
    );
    const profiles: Record<string, { username: string | null; avatar_url: string | null }> = {};
    if (userIds.length) {
      const { data: profs } = await supabaseAdmin
        .from("profiles")
        .select("id,username,avatar_url")
        .in("id", userIds);
      for (const p of profs ?? [])
        profiles[p.id] = { username: p.username, avatar_url: p.avatar_url };
    }
    return ((rows ?? []) as Omit<CommentRow, "author">[]).map((r) => ({
      ...r,
      author: r.user_id ? profiles[r.user_id] ?? null : null,
    }));
  });

export const getPostRatingStats = createServerFn({ method: "GET" })
  .validator((input) => z.object({ post_id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("comments")
      .select("rating")
      .eq("post_id", data.post_id)
      .not("rating", "is", null);
    if (error) throw new Error(error.message);
    const ratings = (rows ?? []).map((r) => r.rating as number);
    const count = ratings.length;
    const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
    return { count, average: Math.round(avg * 10) / 10 };
  });

const recentSubmissions = new Map<string, number>();

export const postComment = createServerFn({ method: "POST" })
  .validator((input) =>
    z
      .object({
        post_id: z.string().uuid(),
        comment: z.string().trim().min(1).max(2000),
        guest_name: z.string().trim().min(1).max(80).optional(),
        guest_email: z.string().trim().email().max(255).optional().or(z.literal("")),
        rating: z.number().int().min(1).max(5).optional(),
        // honeypot — must be empty
        website: z.string().max(0).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    // Honeypot tripped → silently succeed
    if (data.website) return { ok: true };

    const { getRequestIP } = await import("@tanstack/react-start/server");
    let ip = "unknown";
    try {
      ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    } catch {
      // ignore
    }
    const key = `${ip}:${data.post_id}:${data.comment}`;
    const now = Date.now();
    // Cleanup stale entries
    for (const [k, t] of recentSubmissions) {
      if (now - t > 60_000) recentSubmissions.delete(k);
    }
    if (recentSubmissions.has(key)) {
      throw new Error("Duplicate submission. Please wait before posting again.");
    }
    recentSubmissions.set(key, now);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("comments").insert({
      post_id: data.post_id,
      user_id: null,
      comment: data.comment,
      guest_name: data.guest_name?.trim() || "Anonymous",
      guest_email: data.guest_email || null,
      rating: data.rating ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
