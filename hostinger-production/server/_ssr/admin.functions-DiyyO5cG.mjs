import { T as TSS_SERVER_FUNCTION, b as getServerFnById, c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BO6ULLpK.mjs";
import { r as resolveMediaUrl, e as extractBlogMediaPath } from "./media-DUkNwMwq.mjs";
import { o as objectType, b as booleanType, s as stringType, e as enumType, a as arrayType, n as numberType, l as literalType } from "../_libs/zod.mjs";
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
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/react.mjs";
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
import "../_libs/ws.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function assertEditor(userId, client) {
  let roles = [];
  if (client && typeof client.from === "function") {
    const {
      data
    } = await client.from("user_roles").select("role").eq("user_id", userId);
    if (data && data.length > 0) {
      roles = data.map((r) => r.role);
    }
  }
  if (roles.length === 0) {
    const {
      supabaseAdmin
    } = await import("./client.server-Dg1wI_zl.mjs");
    const {
      data: rows
    } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    roles = (rows ?? []).map((r) => r.role);
  }
  if (!roles.includes("admin") && !roles.includes("editor")) {
    throw new Error("Forbidden");
  }
  return roles;
}
const getMyRoles = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bc043367e3258bc0750efadc2962d5983ded7a90f892e25e8da034f07aee469d"));
const adminListPosts = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c36083dfd2f49d453c7629b8a868d6b2b5a7c9fc0ff160379cfd2d3adcba24b4"));
const adminGetPost = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("39cc3b2fa50fed380c22addea0464b62e9c7ba06bba85ecf08a5487be7b1b408"));
const adminUpsertPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid().optional(),
  title: stringType().min(1),
  slug: stringType().optional(),
  excerpt: stringType().optional(),
  content: stringType().optional(),
  cover_image: stringType().nullable().optional(),
  category: stringType().min(1),
  tags: arrayType(stringType()).default([]),
  featured: booleanType().default(false),
  published: booleanType().default(false),
  author_name: stringType().nullable().optional(),
  author_image_url: stringType().nullable().optional(),
  location_name: stringType().nullable().optional(),
  latitude: numberType().min(-90).max(90).nullable().optional(),
  longitude: numberType().min(-180).max(180).nullable().optional(),
  scheduled_at: stringType().nullable().optional(),
  destination_id: stringType().nullable().optional().transform((v) => v && v.trim() !== "" ? v.trim() : null),
  travel_date: stringType().nullable().optional(),
  seo_title: stringType().nullable().optional(),
  seo_description: stringType().nullable().optional(),
  og_image_url: stringType().nullable().optional(),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().nullable().optional(),
    sort_order: numberType().int().nonnegative().optional()
  })).optional()
}).parse(i)).handler(createSsrRpc("ad25067aac02edfbbef739e707988bc188b8eedd0ff973f2468774a4919f719f"));
const adminDeleteGalleryImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  postId: stringType().uuid().optional(),
  galleryId: stringType().optional(),
  imageUrl: stringType().min(1)
}).parse(i)).handler(createSsrRpc("35a26a0d373d3402f12b62248b04295a44839f563a7aadf486bfec03bb13a626"));
const adminListGalleries = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("4b7fc69aa39af6873d95485ed4e6c306bbd8d0d452062d731076390369fe6b59"));
const adminSavePostGallery = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  postId: stringType().uuid(),
  gallery: arrayType(objectType({
    id: stringType().optional(),
    image_url: stringType().min(1),
    alt_text: stringType().nullable().optional(),
    sort_order: numberType().int().nonnegative().optional()
  }))
}).parse(i)).handler(createSsrRpc("b0b73bd3a4810feefc0ceeb115307173606c2d95a2b18e268b2844b70c5bacef"));
const adminDeletePost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("706974d253749a4b207ea9f45681167b7d9acb69ae04a29b711b2519d6b957f5"));
const adminTogglePublish = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  published: booleanType()
}).parse(i)).handler(createSsrRpc("4587620b23cd42114286fc00c107bde8089ec278c221ff7eebee1dec6af9875c"));
const destInputSchema = objectType({
  id: stringType().uuid().optional(),
  title: stringType().trim().min(1).max(200),
  slug: stringType().trim().min(1).max(200).optional(),
  country: stringType().min(1).max(120),
  region: stringType().max(120).optional().nullable(),
  description: stringType().max(4e3).optional().nullable(),
  featured_image: stringType().url().optional().nullable().or(literalType("")),
  published: booleanType().default(true),
  latitude: numberType().min(-90).max(90).nullable().optional(),
  longitude: numberType().min(-180).max(180).nullable().optional()
});
const adminListDestinations = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c8d7c18700bbea254b71d38c25a5baae5134ab94d54a719f78ce477f129a7854"));
const adminUpsertDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => destInputSchema.parse(i)).handler(createSsrRpc("7d4026e9578e6fdf78470f8c8447b5536226df925c9d7afda40f0c5417bd2f77"));
const adminDeleteDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("22dbf5a0bd1aa4105a7bf3eff794bd8738e2b5fef5f61aec5d79f152ea65a351"));
const adminUpdateDestinationCoordinates = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  latitude: numberType().min(-90).max(90),
  longitude: numberType().min(-180).max(180)
}).parse(i)).handler(createSsrRpc("4037c4fa29b33ee2d3d1feacec22fd0de3eded8bdb36fc0638b5eab1a997adbd"));
const adminUpdatePostCoordinates = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  latitude: numberType().min(-90).max(90),
  longitude: numberType().min(-180).max(180),
  location_name: stringType().optional().nullable()
}).parse(i)).handler(createSsrRpc("b99fcd4d4a84f8e2f7edaaf7b978a348d2c99f98ed8abcb4ad716b549cb9d742"));
const adminListComments = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("041edda5bad3e8b83429c688f7fbe59e6c6dbe398445ee4624099f4b361b1a74"));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118"));
const adminListMessages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a93dcca664db7845b2d7a9b6c8f0b0f7cb52a62972f962422ce68f8dd2e3fd1e"));
const adminUpdateMessageStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid(),
  status: enumType(["new", "read", "replied"]).optional(),
  is_read: booleanType().optional()
}).parse(i)).handler(createSsrRpc("373fbb90a7481a50b31f610c285b9e222e7b94cde4e0f85bb3942716793b8ca6"));
const adminDeleteMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("8eec2cf3796c533b3105ae32ffff41f9d081738ea9252d35057f78d72160727a"));
const adminAnalytics = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ad0c092d9068302d584e4ee6c929270ef251348f837bd3ea129892db963c741d"));
const adminUploadImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  filename: stringType().min(1).max(200),
  contentType: stringType().min(1).max(100),
  base64: stringType().min(1)
}).parse(i)).handler(createSsrRpc("72eaf964ab7ce14d623874daf7be210de5431691ecf47076df88fef9c15ca3d3"));
const adminCreateAdminUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((input) => {
  const raw = input && typeof input === "object" && "data" in input ? input.data : input;
  return objectType({
    email: stringType().trim().email("Please enter a valid email address."),
    password: stringType().min(6, "Password must be at least 6 characters."),
    role: enumType(["admin", "editor"]).default("admin")
  }).parse(raw);
}).handler(createSsrRpc("ffadc0811b3c311e38a0c7f23a5dfb1b1778216f1639c80b541652ff3643bed2"));
const adminListStaffUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("93b11c49e51b9e7b809eeaf78d25b25dc2804f4931c5d974ae247b05eeacb608"));
const admin_functions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adminAnalytics,
  adminCreateAdminUser,
  adminDeleteComment,
  adminDeleteDestination,
  adminDeleteGalleryImage,
  adminDeleteMessage,
  adminDeletePost,
  adminGetPost,
  adminListComments,
  adminListDestinations,
  adminListGalleries,
  adminListMessages,
  adminListPosts,
  adminListStaffUsers,
  adminSavePostGallery,
  adminTogglePublish,
  adminUpdateDestinationCoordinates,
  adminUpdateMessageStatus,
  adminUpdatePostCoordinates,
  adminUploadImage,
  adminUpsertDestination,
  adminUpsertPost,
  assertEditor,
  extractBlogMediaPath,
  getMyRoles,
  resolveMediaUrl
}, Symbol.toStringTag, { value: "Module" }));
export {
  assertEditor as a,
  adminAnalytics as b,
  adminUploadImage as c,
  adminCreateAdminUser as d,
  adminListStaffUsers as e,
  adminListMessages as f,
  getMyRoles as g,
  adminUpdateMessageStatus as h,
  adminDeleteMessage as i,
  adminListGalleries as j,
  adminSavePostGallery as k,
  adminDeleteGalleryImage as l,
  adminListDestinations as m,
  adminUpsertDestination as n,
  adminUpdateDestinationCoordinates as o,
  adminDeleteDestination as p,
  adminListComments as q,
  adminDeleteComment as r,
  adminListPosts as s,
  adminTogglePublish as t,
  adminDeletePost as u,
  createSsrRpc as v,
  adminGetPost as w,
  adminUpsertPost as x,
  adminUpdatePostCoordinates as y,
  admin_functions as z
};
