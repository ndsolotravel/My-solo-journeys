import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import { assertEditor } from "./admin.functions-CnEC2dM5.mjs";
import { r as resolveMediaUrl } from "./media-5OPpyOwL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { e as enumType } from "../_libs/zod.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const PAGE_HERO_KEYS = {
  destinations: {
    mode: "destinations_hero_mode",
    image: "destinations_hero_image"
  },
  gallery: {
    mode: "gallery_hero_mode",
    image: "gallery_hero_image"
  },
  contact: {
    mode: "contact_hero_mode",
    image: "contact_hero_image"
  }
};
const GALLERY_HERO_DEFAULTS = {
  badge: "Visual Archive · High Frontiers",
  title: "Moments Frozen in the Wild",
  titleHighlight: "High passes, silent valleys, raw frontiers.",
  description: "An intimate visual log of solo expeditions across Pakistan, the Karakoram, and high-altitude Himalayan trails.",
  overlay: "cinematic",
  buttonText: "Explore Photographs"
};
const PAGE_ID_SCHEMA = enumType(["destinations", "gallery", "contact"]);
async function loadAutoHeroImage(page, client) {
  if (page === "destinations") {
    const {
      data,
      error
    } = await client.from("destinations").select(`
        id,
        title,
        featured_image,
        created_at,
        posts:posts(id, title, slug, cover_image, category, published, destination_id, published_at, created_at)
      `).eq("published", true).order("created_at", {
      ascending: false
    });
    if (error) return "";
    for (const row of data ?? []) {
      const linkedPosts = (row.posts ?? []).filter((p) => p.published !== false && p.destination_id === row.id).sort((a, b) => {
        const timeA = new Date(a.published_at || a.created_at || 0).getTime();
        const timeB = new Date(b.published_at || b.created_at || 0).getTime();
        return timeB - timeA;
      });
      const coverPhoto = linkedPosts.find((p) => p.cover_image)?.cover_image;
      const raw = coverPhoto || row.featured_image;
      const resolved = resolveMediaUrl(raw, client);
      if (resolved) return resolved;
    }
    return "";
  }
  const {
    data: photos,
    error: photosError
  } = await client.from("photos").select("id, image_url, sort_order").eq("published", true).order("sort_order", {
    ascending: true
  }).limit(20);
  for (const p of photos ?? []) {
    if (typeof p.image_url === "string" && p.image_url.trim()) {
      const resolved = resolveMediaUrl(p.image_url, client);
      if (resolved) return resolved;
    }
  }
  if (photosError) return "";
  const {
    data: posts,
    error: postsError
  } = await client.from("posts").select("id, title, content, cover_image, published_at, post_gallery(id, image_url, alt_text, sort_order, created_at)").eq("published", true).order("published_at", {
    ascending: false
  });
  if (postsError) return "";
  for (const post of posts ?? []) {
    const pgItems = Array.isArray(post.post_gallery) ? [...post.post_gallery].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : [];
    for (const pg of pgItems) {
      if (typeof pg.image_url === "string" && pg.image_url.trim()) {
        const resolved = resolveMediaUrl(pg.image_url, client);
        if (resolved) return resolved;
      }
    }
    const coverResolved = resolveMediaUrl(post.cover_image, client);
    if (coverResolved) return coverResolved;
  }
  return "";
}
async function readHeroEditorValues(page, client) {
  const keys = PAGE_HERO_KEYS[page];
  const settingKeys = [keys.mode, keys.image, `${page}_hero_badge`, `${page}_hero_title`, `${page}_hero_title_highlight`, `${page}_hero_description`, `${page}_hero_overlay`, `${page}_hero_button_text`];
  const {
    data,
    error
  } = await client.from("site_settings").select("key, value").in("key", settingKeys);
  const defaults = page === "gallery" ? GALLERY_HERO_DEFAULTS : {};
  if (error) {
    return {
      mode: "auto",
      image: "",
      badge: defaults.badge || "",
      title: defaults.title || "",
      titleHighlight: defaults.titleHighlight || "",
      description: defaults.description || "",
      overlay: defaults.overlay || "cinematic",
      buttonText: defaults.buttonText || ""
    };
  }
  const findVal = (k) => data?.find((r) => r.key === k)?.value?.trim();
  const modeRaw = findVal(keys.mode);
  const savedImage = findVal(keys.image) || "";
  const badge = findVal(`${page}_hero_badge`) ?? defaults.badge ?? "";
  const title = findVal(`${page}_hero_title`) ?? defaults.title ?? "";
  const titleHighlight = findVal(`${page}_hero_title_highlight`) ?? defaults.titleHighlight ?? "";
  const description = findVal(`${page}_hero_description`) ?? defaults.description ?? "";
  const overlay = findVal(`${page}_hero_overlay`) ?? defaults.overlay ?? "cinematic";
  const buttonText = findVal(`${page}_hero_button_text`) ?? defaults.buttonText ?? "";
  return {
    mode: modeRaw === "manual" ? "manual" : "auto",
    image: savedImage,
    badge,
    title,
    titleHighlight,
    description,
    overlay,
    buttonText
  };
}
const getPageHeroConfig_createServerFn_handler = createServerRpc({
  id: "d326ed6af5ded4b20d49d5103a78c1fbbdc07d078e944e8a44916233aa0d8d66",
  name: "getPageHeroConfig",
  filename: "src/lib/page-hero.functions.ts"
}, (opts) => getPageHeroConfig.__executeServer(opts));
const getPageHeroConfig = createServerFn({
  method: "GET"
}).validator((page) => PAGE_ID_SCHEMA.parse(page)).handler(getPageHeroConfig_createServerFn_handler, async ({
  data: page
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CVdEp4yu.mjs");
  const saved = await readHeroEditorValues(page, supabaseAdmin);
  let image = "";
  if (saved.mode === "manual") {
    image = saved.image ? resolveMediaUrl(saved.image, supabaseAdmin) : "";
  } else {
    image = await loadAutoHeroImage(page, supabaseAdmin);
  }
  const autoImage = saved.mode === "auto" ? image : await loadAutoHeroImage(page, supabaseAdmin);
  return {
    mode: saved.mode,
    image,
    autoImage,
    badge: saved.badge,
    title: saved.title,
    titleHighlight: saved.titleHighlight,
    description: saved.description,
    overlay: saved.overlay,
    buttonText: saved.buttonText
  };
});
const adminGetPageHeroEditor_createServerFn_handler = createServerRpc({
  id: "3426d3531642293d8adc031e9829de87a494839e6704bb9bdb109c78b66e2c6e",
  name: "adminGetPageHeroEditor",
  filename: "src/lib/page-hero.functions.ts"
}, (opts) => adminGetPageHeroEditor.__executeServer(opts));
const adminGetPageHeroEditor = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((page) => PAGE_ID_SCHEMA.parse(page)).handler(adminGetPageHeroEditor_createServerFn_handler, async ({
  context,
  data: page
}) => {
  await assertEditor(context.userId, context.supabase);
  const client = context.supabase ?? (await import("./client.server-CVdEp4yu.mjs")).supabaseAdmin;
  const saved = await readHeroEditorValues(page, client);
  const autoImage = await loadAutoHeroImage(page, client);
  return {
    mode: saved.mode,
    image: saved.image,
    autoImage,
    badge: saved.badge,
    title: saved.title,
    titleHighlight: saved.titleHighlight,
    description: saved.description,
    overlay: saved.overlay,
    buttonText: saved.buttonText
  };
});
export {
  adminGetPageHeroEditor_createServerFn_handler,
  getPageHeroConfig_createServerFn_handler
};
