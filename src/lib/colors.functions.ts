import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";
import {
  parseColorConfig,
  colorSchema,
  DEFAULT_COLOR_CONFIG,
  type ColorConfig,
} from "./colors";

import { fetchWithCache, invalidateServerCache } from "./server-cache";

/**
 * Public server function to get active published color palette configuration.
 * Safe for all visitors, cached in memory (60s) for instant response.
 */
export const getPublicColorSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<ColorConfig> => {
    return fetchWithCache("public_color_settings", 60_000, async () => {
      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("site_settings")
          .select("value")
          .eq("key", "color_settings")
          .maybeSingle();

        if (error || !data?.value) {
          return DEFAULT_COLOR_CONFIG;
        }

        return parseColorConfig(data.value);
      } catch {
        return DEFAULT_COLOR_CONFIG;
      }
    });
  },
);

/**
 * Admin server function to fetch color settings for CMS.
 */
export const adminGetColorSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ColorConfig> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("site_settings")
      .select("value")
      .eq("key", "color_settings")
      .maybeSingle();

    if (error) throw new Error(error.message);
    return parseColorConfig(data?.value);
  });

/**
 * Admin server function to save & publish global color palette configuration to Supabase.
 */
export const adminSaveColorSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => colorSchema.parse(input))
  .handler(async ({ context, data }): Promise<ColorConfig> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const payload = {
      key: "color_settings",
      value: JSON.stringify(data),
      description: "Global color palette and theme variables configuration for CMS",
      updated_at: now,
    };

    const { data: updated, error } = await client
      .from("site_settings")
      .upsert(payload, { onConflict: "key" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    invalidateServerCache("public_color_settings");
    return parseColorConfig(updated?.value);
  });
