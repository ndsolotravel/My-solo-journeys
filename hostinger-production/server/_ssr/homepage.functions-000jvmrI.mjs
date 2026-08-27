import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { a as assertEditor, r as resolveMediaUrl } from "./admin.functions-DGJYtjjS.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, r as recordType, s as stringType } from "../_libs/zod.mjs";
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
const HOMEPAGE_KEYS = [
  // Hero Banner
  "homepage_hero_mode",
  "homepage_hero_post_id",
  "homepage_hero_image",
  "homepage_hero_badge",
  "homepage_hero_title",
  "homepage_hero_title_highlight",
  "homepage_hero_description",
  "homepage_hero_button_text",
  "homepage_hero_button_link",
  "homepage_hero_secondary_button_text",
  "homepage_hero_secondary_button_link",
  // Journey in Numbers
  "homepage_stat_countries_mode",
  "homepage_stat_countries",
  "homepage_stat_trips",
  "homepage_stat_photos",
  "homepage_stat_photos_suffix",
  "homepage_stat_kilometres",
  "homepage_stat_kilometres_suffix",
  "homepage_stat_days",
  // Featured / Latest Blog Post
  "homepage_featured_mode",
  "homepage_featured_post_id"
];
const HOMEPAGE_DEFAULTS = {
  homepage_hero_mode: "auto",
  homepage_hero_post_id: "",
  homepage_hero_image: "",
  homepage_hero_badge: "Solo · Slow · Cinematic",
  homepage_hero_title: "Stories from the high places",
  homepage_hero_title_highlight: "Most people only fly over.",
  homepage_hero_description: "Solo expeditions, motorcycle journeys and trekking diaries from Pakistan, the Karakoram and the world's wildest borders.",
  homepage_hero_button_text: "Read the stories",
  homepage_hero_button_link: "/blog",
  homepage_hero_secondary_button_text: "Explore destinations",
  homepage_hero_secondary_button_link: "/destinations",
  homepage_stat_countries_mode: "auto",
  homepage_stat_countries: "",
  homepage_stat_trips: "102",
  homepage_stat_photos: "200",
  homepage_stat_photos_suffix: "K+",
  homepage_stat_kilometres: "18420",
  homepage_stat_kilometres_suffix: " km",
  homepage_stat_days: "142",
  homepage_featured_mode: "auto",
  homepage_featured_post_id: ""
};
async function fetchHomepageRows(client) {
  const {
    data,
    error
  } = await client.from("site_settings").select("key, value").in("key", [...HOMEPAGE_KEYS]);
  const map = /* @__PURE__ */ new Map();
  if (!error && Array.isArray(data)) {
    for (const row of data) {
      map.set(row.key, row.value);
    }
  }
  return map;
}
function mergeDefaults(rows) {
  const settings = {
    ...HOMEPAGE_DEFAULTS
  };
  for (const key of HOMEPAGE_KEYS) {
    const value = rows.get(key);
    if (value !== void 0 && value.trim() !== "") {
      settings[key] = value;
    }
  }
  return settings;
}
const POST_COLS = "id,title,slug,excerpt,cover_image,category,reading_minutes";
async function resolvePostById(id, client) {
  if (!id) return null;
  const {
    data,
    error
  } = await client.from("posts").select(POST_COLS).eq("id", id).eq("published", true).maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null
  };
}
async function resolveLatestPost(client) {
  const {
    data,
    error
  } = await client.from("posts").select(POST_COLS).eq("published", true).order("published_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null
  };
}
async function resolveLatestFeatured(client) {
  const {
    data,
    error
  } = await client.from("posts").select(POST_COLS).eq("published", true).eq("featured", true).order("published_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error || !data) return null;
  return {
    ...data,
    cover_image: data.cover_image ? resolveMediaUrl(data.cover_image, client) : null
  };
}
const getHomepageConfig_createServerFn_handler = createServerRpc({
  id: "ed839ac608e04e2b639d981cb6f852fa1aeb890692636d81932865c4d88aa08c",
  name: "getHomepageConfig",
  filename: "src/lib/homepage.functions.ts"
}, (opts) => getHomepageConfig.__executeServer(opts));
const getHomepageConfig = createServerFn({
  method: "GET"
}).handler(getHomepageConfig_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const rows = await fetchHomepageRows(supabaseAdmin);
  const settings = mergeDefaults(rows);
  const heroMode = settings.homepage_hero_mode === "manual" ? "manual" : "auto";
  let heroPost = null;
  if (heroMode === "manual") {
    heroPost = await resolvePostById(settings.homepage_hero_post_id, supabaseAdmin);
    if (!heroPost) heroPost = await resolveLatestPost(supabaseAdmin);
  } else {
    heroPost = await resolveLatestPost(supabaseAdmin);
  }
  const featuredMode = settings.homepage_featured_mode === "manual" ? "manual" : "auto";
  let featuredPost = null;
  if (featuredMode === "manual") {
    featuredPost = await resolvePostById(settings.homepage_featured_post_id, supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestFeatured(supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestPost(supabaseAdmin);
  } else {
    featuredPost = await resolveLatestFeatured(supabaseAdmin);
    if (!featuredPost) featuredPost = await resolveLatestPost(supabaseAdmin);
  }
  return {
    settings,
    heroPost,
    featuredPost
  };
});
const adminGetHomepageEditor_createServerFn_handler = createServerRpc({
  id: "2c83b3f1c75595fb9433f21f8203d59a19d372de43711193f4d2661393212e46",
  name: "adminGetHomepageEditor",
  filename: "src/lib/homepage.functions.ts"
}, (opts) => adminGetHomepageEditor.__executeServer(opts));
const adminGetHomepageEditor = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminGetHomepageEditor_createServerFn_handler, async ({
  context
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const rows = await fetchHomepageRows(client);
  const settings = mergeDefaults(rows);
  const {
    data: posts,
    error
  } = await client.from("posts").select("id,title,slug,featured,published,scheduled_at,published_at,created_at").order("published_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    settings,
    posts: posts ?? []
  };
});
const adminSaveHomepageSettings_createServerFn_handler = createServerRpc({
  id: "3e97ad3a62fc506fb723a5239d751961bd75cff65bde1dcc51d7ac0d10a99c0c",
  name: "adminSaveHomepageSettings",
  filename: "src/lib/homepage.functions.ts"
}, (opts) => adminSaveHomepageSettings.__executeServer(opts));
const adminSaveHomepageSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  const raw = input ?? {};
  const settings = {};
  for (const key of HOMEPAGE_KEYS) {
    const value = raw[key];
    if (typeof value === "string") settings[key] = value;
  }
  const flat = typeof raw.settings === "object" ? raw.settings : settings;
  return objectType({
    settings: recordType(stringType())
  }).parse({
    settings: flat
  });
}).handler(adminSaveHomepageSettings_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-Dg1wI_zl.mjs")).supabaseAdmin;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const rows = HOMEPAGE_KEYS.map((key) => ({
    key,
    value: data.settings[key] !== void 0 ? data.settings[key].trim() : HOMEPAGE_DEFAULTS[key],
    updated_at: now
  }));
  const {
    error
  } = await client.from("site_settings").upsert(rows, {
    onConflict: "key"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminGetHomepageEditor_createServerFn_handler,
  adminSaveHomepageSettings_createServerFn_handler,
  getHomepageConfig_createServerFn_handler
};
