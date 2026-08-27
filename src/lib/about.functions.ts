import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";

// ---------------------------------------------------------------------------
// About Page settings keys and defaults (matching the redesigned About Page)
// ---------------------------------------------------------------------------

export const ABOUT_KEYS = [
  "about_hero_label",
  "about_hero_headline",
  "about_hero_image",
  "about_hero_image_alt",
  "about_profile_image",
  "about_profile_image_alt",
  "about_biography_title",
  "about_biography_intro",
  "about_philosophy_title",
  "about_philosophy_quote",
  "about_philosophy_description",
] as const;

export const ABOUT_DEFAULTS: Record<string, string> = {
  about_hero_label: "The Story Behind NDSOLOTRAVEL",
  about_hero_headline: "Solo, slow, and almost always uphill.",
  about_hero_image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&auto=format",
  about_hero_image_alt: "Karakoram mountain pass and solo road",
  about_profile_image: "",
  about_profile_image_alt: "Hussain — Solo explorer behind NDSOLOTRAVEL",
  about_biography_title: "From Engineering Problem-Solving to the Freedom of the Open Road",
  about_biography_intro: "Welcome to NDSOLOTRAVEL, a space created from a passion for exploring the world, discovering new places, and experiencing the freedom of traveling solo.",
  about_philosophy_title: "Travel Philosophy",
  about_philosophy_quote: "Solo travel is where the journey becomes the destination.",
  about_philosophy_description: "You do not need a tour operator, a large budget, or a 100-page itinerary to discover the world. You simply need the curiosity to listen, the humility to respect local cultures, and the bravery to take that first solo step.",
};

type SupabaseRow = {
  key: string;
  value: string;
};

// ---------------------------------------------------------------------------
// Admin Server Function: Load About Page Settings for Editor
// ---------------------------------------------------------------------------

export const adminGetAboutEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("site_settings")
      .select("key, value")
      .in("key", [...ABOUT_KEYS]);

    if (error) throw new Error(error.message);

    const settings: Record<string, string> = { ...ABOUT_DEFAULTS };
    if (Array.isArray(data)) {
      for (const row of data as SupabaseRow[]) {
        if (row.value !== undefined && row.value !== null && row.value.trim() !== "") {
          settings[row.key] = row.value;
        }
      }
    }

    return { settings };
  });

// ---------------------------------------------------------------------------
// Admin Server Function: Save About Page Settings
// ---------------------------------------------------------------------------

export const adminSaveAboutSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => {
    const raw = input ?? {};
    const settings: Record<string, string> = {};
    for (const key of ABOUT_KEYS) {
      const value = (raw as Record<string, unknown>)[key];
      if (typeof value === "string") settings[key] = value;
    }
    const flat =
      typeof (raw as Record<string, unknown>).settings === "object"
        ? (raw as Record<string, unknown>).settings
        : settings;
    return z
      .object({
        settings: z.record(z.string()),
      })
      .parse({ settings: flat });
  })
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const rows = ABOUT_KEYS.map((key) => ({
      key,
      value: data.settings[key] !== undefined ? data.settings[key].trim() : (ABOUT_DEFAULTS[key] || ""),
      updated_at: now,
    }));

    const { error } = await client.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) throw new Error(error.message);

    return { ok: true };
  });
