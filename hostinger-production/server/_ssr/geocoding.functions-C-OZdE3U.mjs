import { c as createSsrRpc } from "./createSsrRpc-BLJWJFkS.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, b as booleanType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
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
const geocodeFromTitle = createServerFn({
  method: "POST"
}).validator((i) => objectType({
  title: stringType().min(1),
  existingLocation: stringType().optional(),
  override: booleanType().default(false)
}).parse(i)).handler(createSsrRpc("da53071c043974edb87b45468eb1066dcad45591f0fb1880a2e95813077c29f6"));
const batchGeocodePosts = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  postIds: arrayType(stringType().uuid()).optional(),
  forceAll: booleanType().default(false),
  dryRun: booleanType().default(false)
}).parse(i)).handler(createSsrRpc("70249fd9edc70eb0216923df688219c195e96caa63793da4ffd57748f5ccbdb3"));
const adminFetchCountryCoordinates = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  country: stringType().trim().min(1, "Country name is required")
}).parse(i)).handler(createSsrRpc("fd6783061b98e7254f39ebe01dfafcc99df7989c00c755ec4770fab1c9cebd92"));
export {
  adminFetchCountryCoordinates,
  batchGeocodePosts,
  geocodeFromTitle
};
