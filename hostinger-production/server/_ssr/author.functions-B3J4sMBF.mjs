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
const getAuthorProfile_createServerFn_handler = createServerRpc({
  id: "14ab03ae1250075d926f835d8ad6f723f4c041147b45e9f7c6606a8a82741e17",
  name: "getAuthorProfile",
  filename: "src/lib/author.functions.ts"
}, (opts) => getAuthorProfile.__executeServer(opts));
const getAuthorProfile = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  name: stringType().min(1)
}).parse(input)).handler(getAuthorProfile_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    let {
      data: profile
    } = await supabaseAdmin.from("profiles").select("username, avatar_url, bio").ilike("username", data.name).maybeSingle();
    if (!profile) {
      const {
        data: fallback
      } = await supabaseAdmin.from("profiles").select("username, avatar_url, bio").limit(1).maybeSingle();
      profile = fallback;
    }
    return profile ?? null;
  } catch {
    return null;
  }
});
export {
  getAuthorProfile_createServerFn_handler
};
