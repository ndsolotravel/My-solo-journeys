import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
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
  } = await supabaseAdmin.from("destinations").select("id,title,slug,country,region,description,featured_image").eq("published", true).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
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
  const {
    data: posts,
    error: postsError
  } = await supabaseAdmin.from("posts").select("*").eq("destination_id", row.id);
  if (postsError) throw new Error(postsError.message);
  return {
    ...row,
    posts: posts ?? []
  };
});
export {
  getDestinationBySlug_createServerFn_handler,
  listDestinations_createServerFn_handler
};
