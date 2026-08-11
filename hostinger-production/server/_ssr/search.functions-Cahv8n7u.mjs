import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const searchSite_createServerFn_handler = createServerRpc({
  id: "a6fe99b6c5dcc70449cba6ff172f26fdfca262543e0dcc863e3d4993fb3c4e61",
  name: "searchSite",
  filename: "src/lib/search.functions.ts"
}, (opts) => searchSite.__executeServer(opts));
const searchSite = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  q: stringType().min(1).max(120),
  limit: numberType().min(1).max(20).default(8)
}).parse(input)).handler(searchSite_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CAtMrQFk.mjs");
  const term = `%${data.q.replace(/[%_]/g, "")}%`;
  const [posts, dests] = await Promise.all([supabaseAdmin.from("posts").select("id,title,slug,excerpt,category,tags").eq("published", true).or(`title.ilike.${term},excerpt.ilike.${term},content.ilike.${term},category.ilike.${term}`).limit(data.limit), supabaseAdmin.from("destinations").select("id,title,slug,country,region,description").eq("published", true).or(`title.ilike.${term},country.ilike.${term},region.ilike.${term},description.ilike.${term}`).limit(data.limit)]);
  const postResults = (posts.data ?? []).map((p) => ({
    kind: "post",
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category
  }));
  const destResults = (dests.data ?? []).map((d) => ({
    kind: "destination",
    id: d.id,
    title: d.title,
    slug: d.slug,
    country: d.country,
    region: d.region
  }));
  return {
    results: [...postResults, ...destResults]
  };
});
export {
  searchSite_createServerFn_handler
};
