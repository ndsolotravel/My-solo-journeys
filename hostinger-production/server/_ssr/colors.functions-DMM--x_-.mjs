import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import { assertEditor } from "./admin.functions-CnEC2dM5.mjs";
import { D as DEFAULT_COLOR_CONFIG, p as parseColorConfig, c as colorSchema } from "./colors-C0oqDCsc.mjs";
import { fetchWithCache, invalidateServerCache } from "./server-cache-B0GOEAA-.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
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
import "./createSsrRpc-BLJWJFkS.mjs";
import "./media-5OPpyOwL.mjs";
import "../_libs/zod.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const getPublicColorSettings_createServerFn_handler = createServerRpc({
  id: "2656a3599a0f7560da3cec588da0997d758e39f9fc491063f6057b9b013fc673",
  name: "getPublicColorSettings",
  filename: "src/lib/colors.functions.ts"
}, (opts) => getPublicColorSettings.__executeServer(opts));
const getPublicColorSettings = createServerFn({
  method: "GET"
}).handler(getPublicColorSettings_createServerFn_handler, async () => {
  return fetchWithCache("public_color_settings", 6e4, async () => {
    try {
      const {
        supabaseAdmin
      } = await import("./client.server-CVdEp4yu.mjs");
      const {
        data,
        error
      } = await supabaseAdmin.from("site_settings").select("value").eq("key", "color_settings").maybeSingle();
      if (error || !data?.value) {
        return DEFAULT_COLOR_CONFIG;
      }
      return parseColorConfig(data.value);
    } catch {
      return DEFAULT_COLOR_CONFIG;
    }
  });
});
const adminGetColorSettings_createServerFn_handler = createServerRpc({
  id: "ccc7c3d537e10d68201a0ae34111af4ec329d1b7e2375a119ad7e1a306f690eb",
  name: "adminGetColorSettings",
  filename: "src/lib/colors.functions.ts"
}, (opts) => adminGetColorSettings.__executeServer(opts));
const adminGetColorSettings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminGetColorSettings_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("site_settings").select("value").eq("key", "color_settings").maybeSingle();
  if (error) throw new Error(error.message);
  return parseColorConfig(data?.value);
});
const adminSaveColorSettings_createServerFn_handler = createServerRpc({
  id: "a7640198db25ad7bdc75b56c81ef2336b8dfead0a677f39cb446016df2d021d2",
  name: "adminSaveColorSettings",
  filename: "src/lib/colors.functions.ts"
}, (opts) => adminSaveColorSettings.__executeServer(opts));
const adminSaveColorSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => colorSchema.parse(input)).handler(adminSaveColorSettings_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    key: "color_settings",
    value: JSON.stringify(data),
    description: "Global color palette and theme variables configuration for CMS",
    updated_at: now
  };
  const {
    data: updated,
    error
  } = await client.from("site_settings").upsert(payload, {
    onConflict: "key"
  }).select().single();
  if (error) throw new Error(error.message);
  invalidateServerCache("public_color_settings");
  return parseColorConfig(updated?.value);
});
export {
  adminGetColorSettings_createServerFn_handler,
  adminSaveColorSettings_createServerFn_handler,
  getPublicColorSettings_createServerFn_handler
};
