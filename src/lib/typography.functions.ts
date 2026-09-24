import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertEditor } from "@/lib/admin.functions";
import {
  parseTypographyConfig,
  typographySchema,
  DEFAULT_TYPOGRAPHY_CONFIG,
  type TypographyConfig,
} from "./typography";

/**
 * Public server function to get active published typography configuration.
 * Safe for all visitors, cached and fast.
 */
export const getPublicTypographySettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<TypographyConfig> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "typography_settings")
        .maybeSingle();

      if (error || !data?.value) {
        return DEFAULT_TYPOGRAPHY_CONFIG;
      }

      return parseTypographyConfig(data.value);
    } catch {
      return DEFAULT_TYPOGRAPHY_CONFIG;
    }
  },
);

/**
 * Admin server function to fetch typography settings for CMS.
 */
export const adminGetTypographySettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TypographyConfig> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("site_settings")
      .select("value")
      .eq("key", "typography_settings")
      .maybeSingle();

    if (error) throw new Error(error.message);
    return parseTypographyConfig(data?.value);
  });

/**
 * Admin server function to save & publish typography configuration live to Supabase.
 */
export const adminSaveTypographySettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input) => typographySchema.parse(input))
  .handler(async ({ context, data }): Promise<TypographyConfig> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const payload = {
      key: "typography_settings",
      value: JSON.stringify(data),
      description: "Global typography configuration for CMS",
      updated_at: now,
    };

    const { data: updated, error } = await client
      .from("site_settings")
      .upsert(payload, { onConflict: "key" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return parseTypographyConfig(updated?.value);
  });
