import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AuthorProfile = {
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export const HUSSAIN_PROFILE: AuthorProfile = {
  username: "Hussain",
  avatar_url: "/images/author-hussain.jpg",
  bio: "Solo traveler, motorcyclist, and explorer capturing the wild landscapes and hidden roads of the Himalayas, Karakoram, and beyond.",
};

export const getAuthorProfile = createServerFn({ method: "GET" })
  .validator((input) => z.object({ name: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<AuthorProfile | null> => {
    const trimmed = data.name.trim();
    const isHussain = trimmed.toLowerCase() === "hussain" || trimmed.toLowerCase() === "noman";

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      // Try exact username match first
      let { data: profile } = await (supabaseAdmin
        .from("profiles") as any)
        .select("username, avatar_url, bio")
        .ilike("username", trimmed)
        .maybeSingle();

      // Fallback: first profile (single-author site) if not found
      if (!profile && isHussain) {
        const { data: fallback } = await (supabaseAdmin
          .from("profiles") as any)
          .select("username, avatar_url, bio")
          .limit(1)
          .maybeSingle();
        profile = fallback;
      }

      if (isHussain) {
        return {
          username: profile?.username || "Hussain",
          avatar_url: "/images/author-hussain.jpg",
          bio: profile?.bio || HUSSAIN_PROFILE.bio,
        };
      }

      return (profile as AuthorProfile) ?? null;
    } catch {
      if (isHussain) {
        return HUSSAIN_PROFILE;
      }
      return null;
    }
  });
