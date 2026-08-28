import { u as createSsrRpc } from "./admin.functions-67-zmleM.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { o as objectType, b as booleanType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
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
export {
  batchGeocodePosts as b,
  geocodeFromTitle as g
};
