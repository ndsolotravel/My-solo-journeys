import { c as createServerRpc } from "./createServerRpc-JqS14xvu.mjs";
import { h as createServerFn } from "./server-L180zLid.mjs";

import "../_libs/seroval.mjs";
import "../_libs/react.mjs";

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
  } = await import("./client.server-D0LtTSQy.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("gallery").select("id,image_url,caption,category,width,height").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  listGallery_createServerFn_handler
};
