import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const DEFAULT_BLOG_AUTHOR = "Hussain";
async function assertEditor(userId, client) {
  let roles = [];
  if (client && typeof client.from === "function") {
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
const getBlogAuthorName_createServerFn_handler = createServerRpc({
  id: "b49bb2994ba1b17ca6b1509bc3b6a6619c694352a9b138448a7ed385f0dbf5a8",
  name: "getBlogAuthorName",
  filename: "src/lib/settings.functions.ts"
}, (opts) => getBlogAuthorName.__executeServer(opts));
const getBlogAuthorName = createServerFn({
  method: "GET"
}).handler(getBlogAuthorName_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data,
      error
    } = await supabaseAdmin.from("site_settings").select("value").eq("key", "blog_author_name").maybeSingle();
    if (error || !data?.value) {
      return DEFAULT_BLOG_AUTHOR;
    }
    return data.value.trim() || DEFAULT_BLOG_AUTHOR;
  } catch {
    return DEFAULT_BLOG_AUTHOR;
  }
});
const getPublicSiteSettings_createServerFn_handler = createServerRpc({
  id: "5cc46fc601fd1ff52ffd9c8ffb0c64c4007a99684a2adb8466ae7502c456b327",
  name: "getPublicSiteSettings",
  filename: "src/lib/settings.functions.ts"
}, (opts) => getPublicSiteSettings.__executeServer(opts));
const getPublicSiteSettings = createServerFn({
  method: "GET"
}).handler(getPublicSiteSettings_createServerFn_handler, async () => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data,
      error
    } = await supabaseAdmin.from("site_settings").select("key, value, description");
    if (error || !data) {
      return {
        blog_author_name: DEFAULT_BLOG_AUTHOR
      };
    }
    const settingsMap = {
      blog_author_name: DEFAULT_BLOG_AUTHOR
    };
    for (const item of data) {
      settingsMap[item.key] = item.value;
    }
    return settingsMap;
  } catch {
    return {
      blog_author_name: DEFAULT_BLOG_AUTHOR
    };
  }
});
const adminGetSettings_createServerFn_handler = createServerRpc({
  id: "453b18f745aa96dd18df7e1f0f8568922912665dd1f16e9349f48327f9a275eb",
  name: "adminGetSettings",
  filename: "src/lib/settings.functions.ts"
}, (opts) => adminGetSettings.__executeServer(opts));
const adminGetSettings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminGetSettings_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("site_settings").select("key, value, description, updated_at").order("key", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const adminUpdateSetting_createServerFn_handler = createServerRpc({
  id: "bfe1dd602d06788487f81029ae20a9de238587c4a6d102b91961aace569a0438",
  name: "adminUpdateSetting",
  filename: "src/lib/settings.functions.ts"
}, (opts) => adminUpdateSetting.__executeServer(opts));
const adminUpdateSetting = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  key: stringType().min(1),
  value: stringType(),
  description: stringType().optional()
}).parse(input)).handler(adminUpdateSetting_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    key: data.key,
    value: data.value.trim(),
    updated_at: now
  };
  if (data.description !== void 0) {
    payload.description = data.description;
  }
  const {
    data: updated,
    error
  } = await client.from("site_settings").upsert(payload, {
    onConflict: "key"
  }).select().single();
  if (error) throw new Error(error.message);
  return updated;
});
export {
  adminGetSettings_createServerFn_handler,
  adminUpdateSetting_createServerFn_handler,
  getBlogAuthorName_createServerFn_handler,
  getPublicSiteSettings_createServerFn_handler
};
