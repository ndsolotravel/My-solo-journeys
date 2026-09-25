import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import { assertEditor } from "./admin.functions-CnEC2dM5.mjs";
import { p as parseTypographyConfig, t as typographySchema, D as DEFAULT_TYPOGRAPHY_CONFIG } from "./typography-DvZTlhwY.mjs";
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
const getPublicTypographySettings_createServerFn_handler = createServerRpc({
  id: "0b193185e4ff1b02df215e79ad0fd986070178a32fd1e27a1cbb1b60d9ad8a92",
  name: "getPublicTypographySettings",
  filename: "src/lib/typography.functions.ts"
}, (opts) => getPublicTypographySettings.__executeServer(opts));
const getPublicTypographySettings = createServerFn({
  method: "GET"
}).handler(getPublicTypographySettings_createServerFn_handler, async () => {
  return fetchWithCache("public_typography_settings", 6e4, async () => {
    try {
      const {
        supabaseAdmin
      } = await import("./client.server-CVdEp4yu.mjs");
      const {
        data,
        error
      } = await supabaseAdmin.from("site_settings").select("value").eq("key", "typography_settings").maybeSingle();
      if (error || !data?.value) {
        return DEFAULT_TYPOGRAPHY_CONFIG;
      }
      return parseTypographyConfig(data.value);
    } catch {
      return DEFAULT_TYPOGRAPHY_CONFIG;
    }
  });
});
const adminGetTypographySettings_createServerFn_handler = createServerRpc({
  id: "29736422405c248acaf3540810d657d74f087ed9149798d0f00057965d04fef1",
  name: "adminGetTypographySettings",
  filename: "src/lib/typography.functions.ts"
}, (opts) => adminGetTypographySettings.__executeServer(opts));
const adminGetTypographySettings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminGetTypographySettings_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const {
    data,
    error
  } = await client.from("site_settings").select("value").eq("key", "typography_settings").maybeSingle();
  if (error) throw new Error(error.message);
  return parseTypographyConfig(data?.value);
});
const adminSaveTypographySettings_createServerFn_handler = createServerRpc({
  id: "0743a608bde2392c84a9defad0d939258dce8b06cca5275ba5e00024eb3f2fc8",
  name: "adminSaveTypographySettings",
  filename: "src/lib/typography.functions.ts"
}, (opts) => adminSaveTypographySettings.__executeServer(opts));
const adminSaveTypographySettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => typographySchema.parse(input)).handler(adminSaveTypographySettings_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payload = {
    key: "typography_settings",
    value: JSON.stringify(data),
    description: "Global typography configuration for CMS",
    updated_at: now
  };
  const {
    data: updated,
    error
  } = await client.from("site_settings").upsert(payload, {
    onConflict: "key"
  }).select().single();
  if (error) throw new Error(error.message);
  invalidateServerCache("public_typography_settings");
  return parseTypographyConfig(updated?.value);
});
export {
  adminGetTypographySettings_createServerFn_handler,
  adminSaveTypographySettings_createServerFn_handler,
  getPublicTypographySettings_createServerFn_handler
};
