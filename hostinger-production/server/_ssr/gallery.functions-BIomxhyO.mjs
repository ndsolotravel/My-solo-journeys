import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as resolveMediaUrl } from "./admin.functions-CnC9mk6Y.mjs";
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
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
function extractMarkdownImages(markdown) {
  if (!markdown || typeof markdown !== "string") return [];
  const results = [];
  const mdRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+|\/[^\s)]+|blog-media\/[^\s)]+)\)/g;
  let match;
  while ((match = mdRegex.exec(markdown)) !== null) {
    if (match[2]) {
      results.push({
        alt: match[1] || "",
        url: match[2]
      });
    }
  }
  return results;
}
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
  const {
    data: settings
  } = await supabaseAdmin.from("site_settings").select("key, value").in("key", ["about_image_url", "blog_author_name"]);
  const aboutSetting = settings?.find((s) => s.key === "about_image_url");
  const authorSetting = settings?.find((s) => s.key === "blog_author_name");
  const authorName = authorSetting?.value?.trim() || "Hussain";
  const rawAboutUrl = aboutSetting?.value?.trim();
  const aboutImageUrl = rawAboutUrl ? resolveMediaUrl(rawAboutUrl, supabaseAdmin) : null;
  const {
    data: posts,
    error: postsError
  } = await supabaseAdmin.from("posts").select("id, title, slug, content, cover_image, category, created_at, published_at, post_gallery(id, image_url, alt_text, sort_order, created_at)").eq("published", true).order("published_at", {
    ascending: false
  });
  if (postsError) {
    console.warn("[listGallery] Error fetching posts gallery:", postsError);
  }
  const items = [];
  const seenUrls = /* @__PURE__ */ new Set();
  const addItem = (item, rawUrl) => {
    if (!rawUrl || typeof rawUrl !== "string") return;
    const cleanKey = rawUrl.trim().toLowerCase();
    if (seenUrls.has(cleanKey)) return;
    seenUrls.add(cleanKey);
    items.push(item);
  };
  if (aboutImageUrl) {
    addItem({
      id: "about-portrait",
      image_url: aboutImageUrl,
      caption: `${authorName} — ndsolotravel`,
      category: "About",
      width: 1200,
      height: 1600
    }, rawAboutUrl);
  }
  if (posts && Array.isArray(posts)) {
    for (const post of posts) {
      const postGalleryItems = post.post_gallery;
      if (Array.isArray(postGalleryItems)) {
        const sorted = [...postGalleryItems].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        for (const pg of sorted) {
          if (pg.image_url && typeof pg.image_url === "string" && pg.image_url.trim()) {
            const resolved = resolveMediaUrl(pg.image_url, supabaseAdmin);
            if (resolved) {
              addItem({
                id: `post-gal-${pg.id}`,
                image_url: resolved,
                caption: pg.alt_text || post.title || null,
                category: post.category || "Mountains",
                width: 1600,
                height: 1067,
                post_id: post.id
              }, pg.image_url);
            }
          }
        }
      }
      if (post.cover_image && typeof post.cover_image === "string" && post.cover_image.trim()) {
        const resolved = resolveMediaUrl(post.cover_image, supabaseAdmin);
        if (resolved) {
          addItem({
            id: `post-cover-${post.id}`,
            image_url: resolved,
            caption: post.title || null,
            category: post.category || "Mountains",
            width: 1600,
            height: 1067,
            post_id: post.id
          }, post.cover_image);
        }
      }
      const contentImages = extractMarkdownImages(post.content);
      for (let i = 0; i < contentImages.length; i++) {
        const ci = contentImages[i];
        const resolved = resolveMediaUrl(ci.url, supabaseAdmin);
        if (resolved) {
          addItem({
            id: `post-content-${post.id}-${i}`,
            image_url: resolved,
            caption: ci.alt || post.title || null,
            category: post.category || "Mountains",
            width: 1600,
            height: 1067,
            post_id: post.id
          }, ci.url);
        }
      }
    }
  }
  return items;
});
export {
  listGallery_createServerFn_handler
};
