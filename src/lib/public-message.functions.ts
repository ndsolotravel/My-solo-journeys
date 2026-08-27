import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface PublicPopupMessage {
  id: string;
  title: string;
  message: string;
  enabled: boolean;
  is_enabled: boolean;
  start_at: string;
  end_at: string;
  created_at?: string;
  updated_at: string;
  updated_by?: string | null;
}

export const DEFAULT_PUBLIC_POPUP_MESSAGE: PublicPopupMessage = {
  id: "default",
  title: "Site Notice & Feedback",
  message:
    "This site is under construction and testing. Please suggest any UI/UX changes and report errors. Thanks for visiting ‘ndsolotravel’ Blogs.",
  enabled: true,
  is_enabled: true,
  start_at: new Date().toISOString(),
  end_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
};

interface RoleQueryClient {
  from(table: string): {
    select(columns: string): {
      eq(column: string, value: string): Promise<{ data: { role: string }[] | null }>;
    };
  };
}

async function assertEditor(userId: string, client?: unknown) {
  let roles: string[] = [];

  if (
    client &&
    typeof client === "object" &&
    "from" in client &&
    typeof (client as RoleQueryClient).from === "function"
  ) {
    const { data } = await (client as RoleQueryClient)
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
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

// ---------------- Public Endpoints ----------------

/**
 * Fetch the currently active public popup message.
 * Returns null if the message is disabled or outside the configured server time window.
 */
export const getActivePublicMessage = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicPopupMessage | null> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const now = Date.now();

      // 1. Try querying public_popup_messages table
      try {
        const { data, error } = await supabaseAdmin
          .from("public_popup_messages")
          .select("id, title, message, enabled, is_enabled, start_at, end_at, updated_at")
          .eq("id", "default")
          .maybeSingle();

        if (!error && data) {
          const enabled = Boolean(data.enabled ?? data.is_enabled);
          const row: PublicPopupMessage = {
            id: data.id,
            title: data.title || "Site Notice & Feedback",
            message: data.message,
            enabled,
            is_enabled: enabled,
            start_at: data.start_at,
            end_at: data.end_at,
            updated_at: data.updated_at,
          };

          if (!enabled) return null;

          const startMs = new Date(row.start_at).getTime();
          const endMs = new Date(row.end_at).getTime();

          if (isNaN(startMs) || isNaN(endMs)) return null;
          if (now >= startMs && now <= endMs) {
            return row;
          }
          return null;
        }
      } catch {
        // fall through to site_settings
      }

      // 2. Fallback to site_settings (key: public_message_config)
      const { data: fallbackSetting } = await supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "public_message_config")
        .maybeSingle();

      if (fallbackSetting?.value) {
        try {
          const parsed = JSON.parse(fallbackSetting.value);
          const enabled = Boolean(parsed.enabled ?? parsed.is_enabled);
          const row: PublicPopupMessage = {
            id: parsed.id || "default",
            title: parsed.title || "Site Notice & Feedback",
            message: parsed.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message,
            enabled,
            is_enabled: enabled,
            start_at: parsed.start_at || new Date().toISOString(),
            end_at: parsed.end_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: parsed.updated_at || new Date().toISOString(),
          };

          if (!enabled) return null;

          const startMs = new Date(row.start_at).getTime();
          const endMs = new Date(row.end_at).getTime();

          if (now >= startMs && now <= endMs) {
            return row;
          }
        } catch {
          // ignore parse error
        }
      }

      return null;
    } catch (err) {
      console.warn("[getActivePublicMessage] Error evaluating active message:", err);
      return null;
    }
  },
);

// ---------------- Admin Endpoints ----------------

/**
 * Fetch full public message configuration for CMS editing.
 */
export const adminGetPublicMessage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PublicPopupMessage> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    // 1. Try public_popup_messages table
    try {
      const { data, error } = await client
        .from("public_popup_messages")
        .select("*")
        .eq("id", "default")
        .maybeSingle();

      if (!error && data) {
        const enabled = Boolean(data.enabled ?? data.is_enabled);
        return {
          id: data.id,
          title: data.title || "Site Notice & Feedback",
          message: data.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message,
          enabled,
          is_enabled: enabled,
          start_at: data.start_at,
          end_at: data.end_at,
          created_at: data.created_at,
          updated_at: data.updated_at,
          updated_by: data.updated_by,
        };
      }
    } catch {
      // ignore
    }

    // 2. Try fallback from site_settings
    try {
      const { data: fallbackSetting } = await client
        .from("site_settings")
        .select("value")
        .eq("key", "public_message_config")
        .maybeSingle();

      if (fallbackSetting?.value) {
        const parsed = JSON.parse(fallbackSetting.value);
        const enabled = Boolean(parsed.enabled ?? parsed.is_enabled);
        return {
          id: parsed.id || "default",
          title: parsed.title || "Site Notice & Feedback",
          message: parsed.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message,
          enabled,
          is_enabled: enabled,
          start_at: parsed.start_at,
          end_at: parsed.end_at,
          created_at: parsed.created_at,
          updated_at: parsed.updated_at,
        };
      }
    } catch {
      // ignore
    }

    return DEFAULT_PUBLIC_POPUP_MESSAGE;
  });

/**
 * Update the public message configuration.
 */
export const adminUpdatePublicMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => {
    const raw =
      input && typeof input === "object" && "data" in input
        ? (input as { data: unknown }).data
        : input;
    return z
      .object({
        title: z.string().trim().default("Site Notice & Feedback"),
        message: z.string().trim().min(1, "Message text cannot be empty"),
        enabled: z.boolean().optional(),
        is_enabled: z.boolean().optional(),
        start_at: z.string().min(1, "Start Date/Time is required"),
        end_at: z.string().min(1, "End Date/Time is required"),
      })
      .parse(raw);
  })
  .handler(async ({ context, data }): Promise<PublicPopupMessage> => {
    await assertEditor(context.userId, context.supabase);
    const client =
      context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    const enabled = Boolean(data.enabled ?? data.is_enabled ?? true);
    const now = new Date().toISOString();

    const payload: PublicPopupMessage = {
      id: "default",
      title: data.title.trim() || "Site Notice & Feedback",
      message: data.message.trim(),
      enabled,
      is_enabled: enabled,
      start_at: new Date(data.start_at).toISOString(),
      end_at: new Date(data.end_at).toISOString(),
      updated_at: now,
      updated_by: context.userId,
    };

    // 1. Try upserting to public_popup_messages
    try {
      const { data: updated, error } = await client
        .from("public_popup_messages")
        .upsert(
          {
            id: payload.id,
            title: payload.title,
            message: payload.message,
            enabled: payload.enabled,
            is_enabled: payload.is_enabled,
            start_at: payload.start_at,
            end_at: payload.end_at,
            updated_at: payload.updated_at,
            updated_by: payload.updated_by,
          },
          { onConflict: "id" },
        )
        .select()
        .single();

      if (!error && updated) {
        // Also keep site_settings synchronized
        try {
          await client.from("site_settings").upsert(
            {
              key: "public_message_config",
              value: JSON.stringify(payload),
              description: "Public message popup configuration",
              updated_at: now,
            },
            { onConflict: "key" },
          );
        } catch {
          // non-critical fallback
        }

        return {
          ...payload,
          created_at: updated.created_at,
        };
      }
    } catch (err) {
      console.warn("[adminUpdatePublicMessage] Direct table upsert error, syncing fallback:", err);
    }

    // 2. Persist to site_settings (key: public_message_config)
    await client.from("site_settings").upsert(
      {
        key: "public_message_config",
        value: JSON.stringify(payload),
        description: "Public message popup configuration",
        updated_at: now,
      },
      { onConflict: "key" },
    );

    return payload;
  });
