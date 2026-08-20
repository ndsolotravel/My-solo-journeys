import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as resolveMediaUrl } from "./admin.functions-C2WAczeU.mjs";
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
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
const listDestinations_createServerFn_handler = createServerRpc({
  id: "1e527b6631307654bc7f81cb758bd7a871fe81f3441e69d22bb529f27b5e4965",
  name: "listDestinations",
  filename: "src/lib/destinations.functions.ts"
}, (opts) => listDestinations.__executeServer(opts));
const listDestinations = createServerFn({
  method: "GET"
}).handler(listDestinations_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("destinations").select(`
      id,
      title,
      slug,
      country,
      region,
      description,
      featured_image,
      created_at,
      posts:posts(id, title, slug, cover_image, category, excerpt, reading_minutes, published, published_at, created_at)
    `).eq("published", true).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const {
    data: allPosts
  } = await supabaseAdmin.from("posts").select("id, title, slug, cover_image, category, excerpt, reading_minutes, destination_id, published, published_at, created_at").eq("published", true).order("published_at", {
    ascending: false,
    nullsFirst: false
  });
  const resolved = (data ?? []).map((row) => {
    let linkedPosts = (row.posts ?? []).filter((p) => p.published !== false);
    if (linkedPosts.length === 0 && allPosts) {
      linkedPosts = allPosts.filter((p) => p.destination_id === row.id || p.slug && row.slug && (p.slug.includes(row.slug) || row.slug.includes(p.slug)) || p.title && row.title && (p.title.toLowerCase().includes(row.title.toLowerCase()) || row.title.toLowerCase().includes(p.title.toLowerCase())));
    }
    linkedPosts.sort((a, b) => {
      const timeA = new Date(a.published_at || a.created_at || 0).getTime();
      const timeB = new Date(b.published_at || b.created_at || 0).getTime();
      return timeB - timeA;
    });
    const postsWithCovers = linkedPosts.filter((p) => p.cover_image);
    let coverPhoto = postsWithCovers[0]?.cover_image;
    if (!coverPhoto && row.featured_image) {
      coverPhoto = row.featured_image;
    }
    const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
    const resolvedPosts = linkedPosts.map((p) => ({
      ...p,
      cover_image: resolveMediaUrl(p.cover_image, supabaseAdmin) || resolvedImage
    }));
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      country: row.country,
      region: row.region,
      description: row.description,
      featured_image: resolvedImage,
      posts: resolvedPosts
    };
  });
  return resolved;
});
const getDestinationBySlug_createServerFn_handler = createServerRpc({
  id: "42d8c5a0f2ac4a51b2ee36862863046dc42ef21708bdbe47e53e1eb60378f141",
  name: "getDestinationBySlug",
  filename: "src/lib/destinations.functions.ts"
}, (opts) => getDestinationBySlug.__executeServer(opts));
const getDestinationBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(getDestinationBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("destinations").select("*").eq("slug", data.slug).maybeSingle();
  if (error) throw new Error(error.message);
  if (!row) return null;
  let {
    data: posts,
    error: postsError
  } = await supabaseAdmin.from("posts").select("*").eq("destination_id", row.id).eq("published", true).order("published_at", {
    ascending: false,
    nullsFirst: false
  });
  if (postsError) throw new Error(postsError.message);
  if (!posts || posts.length === 0) {
    const {
      data: allPosts
    } = await supabaseAdmin.from("posts").select("*").eq("published", true).order("published_at", {
      ascending: false,
      nullsFirst: false
    });
    if (allPosts && allPosts.length > 0) {
      posts = allPosts.filter((p) => p.destination_id === row.id || p.slug && row.slug && (p.slug.includes(row.slug) || row.slug.includes(p.slug)) || p.title && row.title && (p.title.toLowerCase().includes(row.title.toLowerCase()) || row.title.toLowerCase().includes(p.title.toLowerCase())));
    }
  }
  const linkedPosts = (posts ?? []).filter((p) => p.cover_image);
  let coverPhoto = linkedPosts[0]?.cover_image;
  if (!coverPhoto && row.featured_image) {
    coverPhoto = row.featured_image;
  }
  const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80";
  const resolvedPosts = (posts ?? []).map((p) => ({
    ...p,
    cover_image: resolveMediaUrl(p.cover_image, supabaseAdmin) || resolvedImage
  }));
  return {
    ...row,
    featured_image: resolvedImage,
    posts: resolvedPosts
  };
});
export {
  getDestinationBySlug_createServerFn_handler,
  listDestinations_createServerFn_handler
};
