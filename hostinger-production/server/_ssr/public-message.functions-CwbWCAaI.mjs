import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const DEFAULT_PUBLIC_POPUP_MESSAGE = {
  id: "default",
  title: "Site Notice & Feedback",
  message: "This site is under construction and testing. Please suggest any UI/UX changes and report errors. Thanks for visiting ‘ndsolotravel’ Blogs.",
  enabled: true,
  is_enabled: true,
  start_at: (/* @__PURE__ */ new Date()).toISOString(),
  end_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString(),
  updated_at: (/* @__PURE__ */ new Date()).toISOString()
};
async function assertEditor(userId, client) {
  let roles = [];
  if (client && typeof client === "object" && "from" in client && typeof client.from === "function") {
    const {
      data
    } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
    }
  }
  if (roles.length === 0) {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data: rows
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden: Editor or admin access required");
  }
  return roles;
}
const getActivePublicMessage_createServerFn_handler = createServerRpc({
  id: "c55211b61bcd27379d4eb12c629034b1d51bbac438d76fce5c618527be342262",
  name: "getActivePublicMessage",
  filename: "src/lib/public-message.functions.ts"
}, (opts) => getActivePublicMessage.__executeServer(opts));
const getActivePublicMessage = createServerFn({
  method: "GET"
}).handler(getActivePublicMessage_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const now = Date.now();
    try {
      const {
        data,
        error
      } = await supabaseAdmin.from("public_popup_messages").select("id, title, message, enabled, is_enabled, start_at, end_at, updated_at").eq("id", "default").maybeSingle();
      if (!error && data) {
        const enabled = Boolean(data.enabled ?? data.is_enabled);
        const row = {
          id: data.id,
          title: data.title || "Site Notice & Feedback",
          message: data.message,
          enabled,
          is_enabled: enabled,
          start_at: data.start_at,
          end_at: data.end_at,
          updated_at: data.updated_at
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
    }
    const {
      data: fallbackSetting
    } = await supabaseAdmin.from("site_settings").select("value").eq("key", "public_message_config").maybeSingle();
    if (fallbackSetting?.value) {
      try {
        const parsed = JSON.parse(fallbackSetting.value);
        const enabled = Boolean(parsed.enabled ?? parsed.is_enabled);
        const row = {
          id: parsed.id || "default",
          title: parsed.title || "Site Notice & Feedback",
          message: parsed.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message,
          enabled,
          is_enabled: enabled,
          start_at: parsed.start_at || (/* @__PURE__ */ new Date()).toISOString(),
          end_at: parsed.end_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString(),
          updated_at: parsed.updated_at || (/* @__PURE__ */ new Date()).toISOString()
        };
        if (!enabled) return null;
        const startMs = new Date(row.start_at).getTime();
        const endMs = new Date(row.end_at).getTime();
        if (now >= startMs && now <= endMs) {
          return row;
        }
      } catch {
      }
    }
    return null;
  } catch (err) {
    console.warn("[getActivePublicMessage] Error evaluating active message:", err);
    return null;
  }
});
const adminGetPublicMessage_createServerFn_handler = createServerRpc({
  id: "0ac3c0c7e3bd6449b88bf9e9bf78bba822626bc00b1d55fcd99d9ac232885844",
  name: "adminGetPublicMessage",
  filename: "src/lib/public-message.functions.ts"
}, (opts) => adminGetPublicMessage.__executeServer(opts));
const adminGetPublicMessage = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminGetPublicMessage_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  try {
    const {
      data,
      error
    } = await client.from("public_popup_messages").select("*").eq("id", "default").maybeSingle();
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
        updated_by: data.updated_by
      };
    }
  } catch {
  }
  try {
    const {
      data: fallbackSetting
    } = await client.from("site_settings").select("value").eq("key", "public_message_config").maybeSingle();
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
        updated_at: parsed.updated_at
      };
    }
  } catch {
  }
  return DEFAULT_PUBLIC_POPUP_MESSAGE;
});
const adminUpdatePublicMessage_createServerFn_handler = createServerRpc({
  id: "b9bc4347398f7d94f2ecaa1859fac61574c8fc3b649c4ea3041ec6b57262cf08",
  name: "adminUpdatePublicMessage",
  filename: "src/lib/public-message.functions.ts"
}, (opts) => adminUpdatePublicMessage.__executeServer(opts));
const adminUpdatePublicMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    title: stringType().trim().default("Site Notice & Feedback"),
    message: stringType().trim().min(1, "Message text cannot be empty"),
    enabled: booleanType().optional(),
    is_enabled: booleanType().optional(),
    start_at: stringType().min(1, "Start Date/Time is required"),
    end_at: stringType().min(1, "End Date/Time is required")
  }).parse(raw);
}).handler(adminUpdatePublicMessage_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const enabled = Boolean(data.enabled ?? data.is_enabled ?? true);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    id: "default",
    title: data.title.trim() || "Site Notice & Feedback",
    message: data.message.trim(),
    enabled,
    is_enabled: enabled,
    start_at: new Date(data.start_at).toISOString(),
    end_at: new Date(data.end_at).toISOString(),
    updated_at: now,
    updated_by: context.userId
  };
  try {
    const {
      data: updated,
      error
    } = await client.from("public_popup_messages").upsert({
      id: payload.id,
      title: payload.title,
      message: payload.message,
      enabled: payload.enabled,
      is_enabled: payload.is_enabled,
      start_at: payload.start_at,
      end_at: payload.end_at,
      updated_at: payload.updated_at,
      updated_by: payload.updated_by
    }, {
      onConflict: "id"
    }).select().single();
    if (!error && updated) {
      try {
        await client.from("site_settings").upsert({
          key: "public_message_config",
          value: JSON.stringify(payload),
          description: "Public message popup configuration",
          updated_at: now
        }, {
          onConflict: "key"
        });
      } catch {
      }
      return {
        ...payload,
        created_at: updated.created_at
      };
    }
  } catch (err) {
    console.warn("[adminUpdatePublicMessage] Direct table upsert error, syncing fallback:", err);
  }
  await client.from("site_settings").upsert({
    key: "public_message_config",
    value: JSON.stringify(payload),
    description: "Public message popup configuration",
    updated_at: now
  }, {
    onConflict: "key"
  });
  return payload;
});
export {
  adminGetPublicMessage_createServerFn_handler,
  adminUpdatePublicMessage_createServerFn_handler,
  getActivePublicMessage_createServerFn_handler
};
