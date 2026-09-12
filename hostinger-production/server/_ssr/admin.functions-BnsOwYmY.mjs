import { c as createSsrRpc } from "./createSsrRpc-BLJWJFkS.mjs";
import { c as createServerFn } from "./server-7Z2Wk8DL.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DFv8buKs.mjs";
import { r as resolveMediaUrl } from "./media-DKXRUyGU.mjs";
import { e } from "./media-DKXRUyGU.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/ws.mjs";
import { o as objectType, b as booleanType, s as stringType, e as enumType, n as numberType, a as arrayType, c as nullType, l as literalType } from "../_libs/zod.mjs";
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
    } = await import("./client.server-CVdEp4yu.mjs");
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
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function normalizeKey(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}
async function resolveOrAssignDestination(client, params) {
  const mode = params.destination_mode || "auto";
  const {
    extractCountryFromLocation,
    KNOWN_COUNTRY_HINTS
  } = await import("./posts.functions-BXjHMmZB.mjs");
  if (mode === "manual") {
    if (params.destination_id && params.destination_id.trim()) {
      const {
        data: manualDest
      } = await client.from("destinations").select("id, title, slug, country, region, latitude, longitude, featured_image").eq("id", params.destination_id.trim()).maybeSingle();
      if (manualDest) {
        const detectedPostCountry = extractCountryFromLocation(params.location_name) || extractCountryFromLocation(params.title);
        if (detectedPostCountry && manualDest.country && detectedPostCountry.toLowerCase() !== manualDest.country.toLowerCase()) {
          throw new Error(`Destination country mismatch: The selected destination "${manualDest.title}" is in ${manualDest.country}, but this story is from ${detectedPostCountry}. Please choose a matching destination.`);
        }
        return {
          destination_id: manualDest.id,
          destination: manualDest,
          status: "manual_attached",
          detected_name: manualDest.title,
          detected_country: manualDest.country
        };
      }
    }
    return {
      destination_id: null,
      destination: null,
      status: "none"
    };
  }
  const {
    data: allDests,
    error: destsErr
  } = await client.from("destinations").select("id, title, slug, country, region, latitude, longitude, featured_image");
  if (destsErr) {
    console.warn("[resolveOrAssignDestination] Warning fetching destinations:", destsErr);
  }
  const destinations = allDests || [];
  let detectedCountry = extractCountryFromLocation(params.location_name) || extractCountryFromLocation(params.title);
  if (!detectedCountry && params.content) {
    const contentSnippet = params.content.slice(0, 1e3).toLowerCase();
    for (const [kw, cName] of Object.entries(KNOWN_COUNTRY_HINTS)) {
      if (contentSnippet.includes(kw)) {
        detectedCountry = cName;
        break;
      }
    }
  }
  if (params.destination_id && params.destination_id.trim()) {
    const existingExplicit = destinations.find((d) => d.id === params.destination_id.trim());
    if (existingExplicit) {
      return {
        destination_id: existingExplicit.id,
        destination: existingExplicit,
        status: "existing_found",
        detected_name: existingExplicit.title,
        detected_country: existingExplicit.country
      };
    }
  }
  const cleanLoc = (params.location_name || "").trim();
  let candidatePlace = "";
  if (cleanLoc) {
    const segments = cleanLoc.split(",").map((s) => s.trim()).filter(Boolean);
    candidatePlace = segments[0] || cleanLoc;
    const normLoc = normalizeKey(cleanLoc);
    const normPrimary = normalizeKey(candidatePlace);
    for (const d of destinations) {
      const normTitle = normalizeKey(d.title);
      const normSlug = normalizeKey(d.slug);
      const countryMatches = !detectedCountry || !d.country || d.country.toLowerCase() === detectedCountry.toLowerCase();
      if (!countryMatches) continue;
      if (normTitle === normPrimary || normSlug === normalizeKey(slugify(candidatePlace)) || normLoc.includes(normTitle) || normTitle.includes(normPrimary)) {
        return {
          destination_id: d.id,
          destination: d,
          status: "existing_found",
          detected_name: d.title,
          detected_country: d.country
        };
      }
    }
  }
  if (typeof params.latitude === "number" && !isNaN(params.latitude) && typeof params.longitude === "number" && !isNaN(params.longitude)) {
    for (const d of destinations) {
      if (typeof d.latitude === "number" && typeof d.longitude === "number") {
        const countryMatches = !detectedCountry || !d.country || d.country.toLowerCase() === detectedCountry.toLowerCase();
        if (countryMatches) {
          const dist = getDistanceKm(params.latitude, params.longitude, d.latitude, d.longitude);
          if (dist <= 25) {
            return {
              destination_id: d.id,
              destination: d,
              status: "existing_found",
              detected_name: d.title,
              detected_country: d.country
            };
          }
        }
      }
    }
  }
  if (params.title) {
    const normTitle = normalizeKey(params.title);
    for (const d of destinations) {
      const countryMatches = !detectedCountry || !d.country || d.country.toLowerCase() === detectedCountry.toLowerCase();
      if (countryMatches && normTitle.includes(normalizeKey(d.title))) {
        return {
          destination_id: d.id,
          destination: d,
          status: "existing_found",
          detected_name: d.title,
          detected_country: d.country
        };
      }
    }
  }
  let newTitle = candidatePlace || (params.title || "").trim();
  if (newTitle.length > 60 && newTitle.includes(",")) {
    newTitle = newTitle.split(",")[0].trim();
  }
  if (!newTitle) {
    return {
      destination_id: null,
      destination: null,
      status: "none"
    };
  }
  const finalCountry = detectedCountry || "Pakistan";
  let newSlug = slugify(newTitle);
  if (!newSlug) newSlug = slugify(`${finalCountry}-adventure`);
  const slugMatch = destinations.find((d) => d.slug.toLowerCase() === newSlug.toLowerCase());
  if (slugMatch) {
    return {
      destination_id: slugMatch.id,
      destination: slugMatch,
      status: "existing_found",
      detected_name: slugMatch.title,
      detected_country: slugMatch.country
    };
  }
  if (params.dryRun) {
    return {
      destination_id: null,
      destination: null,
      status: "new_created",
      detected_name: newTitle,
      detected_country: finalCountry
    };
  }
  let finalLat = params.latitude;
  let finalLng = params.longitude;
  if ((finalLat == null || isNaN(finalLat) || finalLng == null || isNaN(finalLng)) && (cleanLoc || newTitle)) {
    try {
      const {
        geocodeFromTitle
      } = await import("./geocoding.functions-C-OZdE3U.mjs");
      const geo = await geocodeFromTitle({
        data: {
          title: `${cleanLoc || newTitle}, ${finalCountry}`
        }
      });
      if (typeof geo?.latitude === "number" && typeof geo?.longitude === "number") {
        finalLat = geo.latitude;
        finalLng = geo.longitude;
      }
    } catch (e2) {
    }
  }
  const newDestRecord = {
    title: newTitle,
    slug: newSlug,
    country: finalCountry,
    region: cleanLoc.includes(",") ? cleanLoc.split(",")[1].trim() : null,
    description: params.excerpt || `Explore ${newTitle}, ${finalCountry}. Motorcycle routes, hiking trails, and honest solo travel dispatches.`,
    featured_image: params.cover_image || null,
    // from post, no external unsplash
    featured: false,
    published: true,
    latitude: typeof finalLat === "number" && !isNaN(finalLat) ? finalLat : null,
    longitude: typeof finalLng === "number" && !isNaN(finalLng) ? finalLng : null,
    category: "Auto-Assigned"
  };
  const {
    data: created,
    error: insErr
  } = await client.from("destinations").insert(newDestRecord).select("*").single();
  if (insErr) {
    console.error("[resolveOrAssignDestination] Error auto-creating destination:", insErr);
    return {
      destination_id: null,
      destination: null,
      status: "none"
    };
  }
  return {
    destination_id: created.id,
    destination: created,
    status: "new_created",
    detected_name: created.title,
    detected_country: created.country
  };
}
const adminDetectDestination = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((i) => objectType({
  destination_mode: enumType(["auto", "manual"]).optional().default("auto"),
  destination_id: stringType().nullable().optional(),
  location_name: stringType().nullable().optional(),
  latitude: numberType().min(-90).max(90).nullable().optional(),
  longitude: numberType().min(-180).max(180).nullable().optional(),
  title: stringType().nullable().optional(),
  content: stringType().nullable().optional(),
  excerpt: stringType().nullable().optional()
}).parse(i)).handler(createSsrRpc("ee69daccd8f1283c990ab90c551dbf1cb33c40952f9e283ce796a3fadca4ffc9"));
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
  destination_mode: enumType(["auto", "manual"]).optional().default("auto"),
  destination_id: stringType().nullable().optional().transform((v) => v && v.trim() !== "" ? v.trim() : null),
  travel_date: stringType().nullable().optional(),
  seo_title: stringType().nullable().optional(),
  seo_description: stringType().nullable().optional(),
  og_image_url: stringType().nullable().optional(),
  primary_keyword: stringType().nullable().optional(),
  secondary_keywords: stringType().nullable().optional(),
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
  category: stringType().optional().nullable(),
  featured: booleanType().or(nullType()).transform((v) => Boolean(v)).default(false),
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
export {
  adminAnalytics,
  adminCreateAdminUser,
  adminDeleteComment,
  adminDeleteDestination,
  adminDeleteGalleryImage,
  adminDeletePost,
  adminDetectDestination,
  adminGetPost,
  adminListComments,
  adminListDestinations,
  adminListGalleries,
  adminListPosts,
  adminListStaffUsers,
  adminSavePostGallery,
  adminTogglePublish,
  adminUpdateDestinationCoordinates,
  adminUpdatePostCoordinates,
  adminUploadImage,
  adminUpsertDestination,
  adminUpsertPost,
  assertEditor,
  e as extractBlogMediaPath,
  getMyRoles,
  resolveMediaUrl,
  resolveOrAssignDestination
};
