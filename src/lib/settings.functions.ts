import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const DEFAULT_BLOG_AUTHOR = "Hussain";

async function assertEditor(userId: string, client?: any) {
  let roles: string[] = [];

  if (client && typeof client.from === "function") {
    const { data } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r: { role: string }) => r.role);
    }
  }

  if (roles.length === 0) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    roles = (rows ?? []).map((r: { role: string }) => r.role);
  }

  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden: Editor or admin access required");
  }
  return roles;
}

// ---------------- Public Functions ----------------

export const getBlogAuthorName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "blog_author_name")
      .maybeSingle();

    if (error || !data?.value) {
      return DEFAULT_BLOG_AUTHOR;
    }
    return data.value.trim() || DEFAULT_BLOG_AUTHOR;
  } catch {
    return DEFAULT_BLOG_AUTHOR;
  }
});

export const getPublicSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value, description");

    if (error || !data) {
      return { blog_author_name: DEFAULT_BLOG_AUTHOR };
    }

    const settingsMap: Record<string, string> = { blog_author_name: DEFAULT_BLOG_AUTHOR };
    for (const item of data) {
      settingsMap[item.key] = item.value;
    }
    return settingsMap;
  } catch {
    return { blog_author_name: DEFAULT_BLOG_AUTHOR };
  }
});

// ---------------- Admin Functions ----------------

export const adminGetSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const { data, error } = await client
      .from("site_settings")
      .select("key, value, description, updated_at")
      .order("key", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        key: z.string().min(1),
        value: z.string(),
        description: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertEditor(context.userId, context.supabase);
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const now = new Date().toISOString();
    const payload: { key: string; value: string; updated_at: string; description?: string } = {
      key: data.key,
      value: data.value.trim(),
      updated_at: now,
    };
    if (data.description !== undefined) {
      payload.description = data.description;
    }

    const { data: updated, error } = await client
      .from("site_settings")
      .upsert(payload, { onConflict: "key" })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return updated;
  });
