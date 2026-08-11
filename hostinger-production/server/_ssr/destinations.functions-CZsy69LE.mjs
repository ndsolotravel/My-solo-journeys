import { c as createServerRpc } from "./createServerRpc-JqS14xvu.mjs";
import { h as createServerFn } from "./server-L180zLid.mjs";

import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";

import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";


import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";





import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
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
  } = await import("./client.server-D0LtTSQy.mjs");
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
  } = await import("./client.server-D0LtTSQy.mjs");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("destinations").select("id,title,slug,country,region,description,featured_image").eq("slug", data.slug).maybeSingle();
  if (error) throw new Error(error.message);
  return row ?? null;
});
export {
  getDestinationBySlug_createServerFn_handler,
  listDestinations_createServerFn_handler
};
