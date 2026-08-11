import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, e as enumType, b as booleanType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
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
const BASE_POST_COLUMNS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at";
const FULL_POST_COLUMNS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,destination_id,travel_date,seo_title,seo_description,og_image_url";
const listPosts_createServerFn_handler = createServerRpc({
  id: "11a3e5221d8be21b9fdddebef660f538b92679319c39b4d5a1df7f1408533287",
  name: "listPosts",
  filename: "src/lib/posts.functions.ts"
}, (opts) => listPosts.__executeServer(opts));
const listPosts = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  category: stringType().optional(),
  categories: arrayType(stringType()).optional(),
  tag: stringType().optional(),
  search: stringType().optional(),
  limit: numberType().min(1).max(50).default(24),
  offset: numberType().min(0).default(0),
  featuredOnly: booleanType().optional(),
  sort: enumType(["latest", "popular"]).default("latest"),
  sinceDays: numberType().min(1).max(365).optional()
}).parse(input ?? {})).handler(listPosts_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const buildQuery = (selectCols) => {
    let q = supabaseAdmin.from("posts").select(selectCols, {
      count: "exact"
    }).eq("published", true);
    if (data.sort === "popular") q = q.order("views", {
      ascending: false
    });
    else q = q.order("published_at", {
      ascending: false
    });
    if (data.category) q = q.eq("category", data.category);
    if (data.categories && data.categories.length) q = q.in("category", data.categories);
    if (data.tag) q = q.contains("tags", [data.tag]);
    if (data.search) q = q.ilike("title", `%${data.search}%`);
    if (data.featuredOnly) q = q.eq("featured", true);
    if (data.sinceDays) {
      const since = new Date(Date.now() - data.sinceDays * 864e5).toISOString();
      q = q.gte("published_at", since);
    }
    return q.range(data.offset, data.offset + data.limit - 1);
  };
  let res = await buildQuery(`${FULL_POST_COLUMNS},destinations(title,slug)`);
  if (res.error) {
    res = await buildQuery(BASE_POST_COLUMNS);
  }
  if (res.error) throw new Error(res.error.message);
  return {
    posts: res.data ?? [],
    total: res.count ?? 0
  };
});
const getPostBySlug_createServerFn_handler = createServerRpc({
  id: "9c8084edff95c284c741e3785ab938a71693bfe26e2c07e4c0272b47d311afc2",
  name: "getPostBySlug",
  filename: "src/lib/posts.functions.ts"
}, (opts) => getPostBySlug.__executeServer(opts));
const getPostBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(getPostBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  let postRes = await supabaseAdmin.from("posts").select(`${FULL_POST_COLUMNS},destinations(title,slug),post_gallery(id,image_url,alt_text,sort_order)`).eq("slug", data.slug).eq("published", true).maybeSingle();
  if (postRes.error) {
    postRes = await supabaseAdmin.from("posts").select(BASE_POST_COLUMNS).eq("slug", data.slug).eq("published", true).maybeSingle();
  }
  if (postRes.error) throw new Error(postRes.error.message);
  const post = postRes.data;
  if (!post) return {
    post: null,
    related: []
  };
  const gallery = post.post_gallery ?? [];
  if (Array.isArray(gallery)) {
    gallery.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }
  const {
    data: related
  } = await supabaseAdmin.from("posts").select(BASE_POST_COLUMNS).eq("published", true).eq("category", post.category).neq("slug", data.slug).order("published_at", {
    ascending: false
  }).limit(3);
  await supabaseAdmin.from("posts").update({
    views: (post.views ?? 0) + 1
  }).eq("id", post.id);
  const fullPost = {
    ...post,
    gallery
  };
  return {
    post: fullPost,
    related: related ?? []
  };
});
const listAllPostSlugs_createServerFn_handler = createServerRpc({
  id: "98f1f07821f4ca35a777ae3a9c3739bd15d263f1786ca97572dcb7a9cd5f9183",
  name: "listAllPostSlugs",
  filename: "src/lib/posts.functions.ts"
}, (opts) => listAllPostSlugs.__executeServer(opts));
const listAllPostSlugs = createServerFn({
  method: "GET"
}).handler(listAllPostSlugs_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("posts").select("slug,updated_at").eq("published", true);
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  getPostBySlug_createServerFn_handler,
  listAllPostSlugs_createServerFn_handler,
  listPosts_createServerFn_handler
};
