import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AuthorProfile = {
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export const getAuthorProfile = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ name: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<AuthorProfile | null> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      // Try exact username match first
      let { data: profile } = await (supabaseAdmin
        .from("profiles") as any)
        .select("username, avatar_url, bio")
        .ilike("username", data.name)
        .maybeSingle();

      // Fallback: first profile (single-author site)
      if (!profile) {
        const { data: fallback } = await (supabaseAdmin
          .from("profiles") as any)
          .select("username, avatar_url, bio")
          .limit(1)
          .maybeSingle();
        profile = fallback;
      }

      return (profile as AuthorProfile) ?? null;
    } catch {
      return null;
    }
  });
