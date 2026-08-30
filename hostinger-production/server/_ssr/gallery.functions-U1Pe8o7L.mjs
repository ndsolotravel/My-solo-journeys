import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const listGallery_createServerFn_handler = createServerRpc({
  id: "9af9309080664fa919d9f0ccc1d1b1233ba78f5ec575fcd3aaab715c0a8a455b",
  name: "listGallery",
  filename: "src/lib/gallery.functions.ts"
}, (opts) => listGallery.__executeServer(opts));
const listGallery = createServerFn({
  method: "GET"
}).handler(listGallery_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const [photoResult, linkResult, categoryResult] = await Promise.all([supabaseAdmin.from("photos").select("id,title,slug,image_url,alt_text,sort_order").eq("published", true).order("sort_order", {
    ascending: true
  }).limit(800), supabaseAdmin.from("photo_category_links").select("photo_id,category_id"), supabaseAdmin.from("photo_categories").select("id,name,slug")]);
  const linkByPhoto = /* @__PURE__ */ new Map();
  for (const l of linkResult.data ?? []) {
    const arr = linkByPhoto.get(l.photo_id) ?? [];
    arr.push(l.category_id);
    linkByPhoto.set(l.photo_id, arr);
  }
  const catById = new Map((categoryResult.data ?? []).map((c) => [c.id, c]));
  return (photoResult.data ?? []).map((p) => {
    const firstCategory = linkByPhoto.get(p.id)?.[0];
    return {
      id: p.id,
      image_url: resolveMediaUrl(p.image_url, supabaseAdmin),
      caption: p.title || p.alt_text || null,
      category: firstCategory ? catById.get(firstCategory)?.name ?? null : null
    };
  });
});
export {
  listGallery_createServerFn_handler
};
