import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as resolveMediaUrl } from "./media-DUkNwMwq.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
      latitude,
      longitude,
      created_at,
      posts:posts(id, title, slug, cover_image, category, excerpt, reading_minutes, destination_id, published, published_at, created_at)
    `).eq("published", true).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const resolved = (data ?? []).map((row) => {
    const linkedPosts = (row.posts ?? []).filter((p) => p.published !== false && p.destination_id === row.id).sort((a, b) => {
      const timeA = new Date(a.published_at || a.created_at || 0).getTime();
      const timeB = new Date(b.published_at || b.created_at || 0).getTime();
      return timeB - timeA;
    });
    const postsWithCovers = linkedPosts.filter((p) => p.cover_image);
    let coverPhoto = postsWithCovers[0]?.cover_image;
    if (!coverPhoto && row.featured_image) {
      coverPhoto = row.featured_image;
    }
    const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "";
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
      latitude: typeof row.latitude === "number" && !isNaN(row.latitude) ? row.latitude : null,
      longitude: typeof row.longitude === "number" && !isNaN(row.longitude) ? row.longitude : null,
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
}).validator((input) => objectType({
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
  const {
    data: posts,
    error: postsError
  } = await supabaseAdmin.from("posts").select("id, title, slug, excerpt, content, cover_image, category, tags, featured, views, reading_minutes, published_at, created_at, destination_id, travel_date, location_name, latitude, longitude, seo_title, seo_description, og_image_url, author_name, destinations(id,title,slug)").eq("destination_id", row.id).eq("published", true).order("published_at", {
    ascending: false,
    nullsFirst: false
  });
  if (postsError) throw new Error(postsError.message);
  const linkedPosts = (posts ?? []).filter((p) => p.cover_image);
  let coverPhoto = linkedPosts[0]?.cover_image;
  if (!coverPhoto && row.featured_image) {
    coverPhoto = row.featured_image;
  }
  const resolvedImage = coverPhoto ? resolveMediaUrl(coverPhoto, supabaseAdmin) : "";
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
