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
const BASE_POST_COLUMNS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,author_name,location_name,latitude,longitude";
const FULL_POST_COLUMNS = "id,title,slug,excerpt,content,cover_image,category,tags,featured,views,reading_minutes,published_at,created_at,destination_id,travel_date,location_name,latitude,longitude,seo_title,seo_description,og_image_url,author_name";
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
  } = await import("./client.server-Dg1wI_zl.mjs");
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
  const {
    resolveMediaUrl
  } = await import("./admin.functions-C2WAczeU.mjs").then((n) => n.w);
  const mapPostMedia = (postsList) => postsList.map((p) => ({
    ...p,
    cover_image: p.cover_image ? resolveMediaUrl(p.cover_image, supabaseAdmin) : p.cover_image,
    og_image_url: p.og_image_url ? resolveMediaUrl(p.og_image_url, supabaseAdmin) : p.og_image_url
  }));
  const fullRes = await buildQuery(`${FULL_POST_COLUMNS},destinations(title,slug),post_translations(language_code,title,excerpt)`);
  if (!fullRes.error && fullRes.data) {
    return {
      posts: mapPostMedia(fullRes.data),
      total: fullRes.count ?? 0
    };
  }
  const baseRes = await buildQuery(BASE_POST_COLUMNS);
  if (baseRes.error) throw new Error(baseRes.error.message);
  return {
    posts: mapPostMedia(baseRes.data ?? []),
    total: baseRes.count ?? 0
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
  } = await import("./client.server-Dg1wI_zl.mjs");
  let postRes = await supabaseAdmin.from("posts").select(`${FULL_POST_COLUMNS},destinations(title,slug),post_gallery(id,image_url,alt_text,sort_order),post_translations(language_code,title,excerpt,content,seo_title,seo_description)`).eq("slug", data.slug).eq("published", true).maybeSingle();
  if (postRes.error) {
    postRes = await supabaseAdmin.from("posts").select(BASE_POST_COLUMNS).eq("slug", data.slug).eq("published", true).maybeSingle();
  }
  if (postRes.error) throw new Error(postRes.error.message);
  const post = postRes.data;
  if (!post) return {
    post: null,
    related: []
  };
  let gallery = post.post_gallery ?? [];
  if (!Array.isArray(gallery) || gallery.length === 0) {
    const {
      data: directGal
    } = await supabaseAdmin.from("post_gallery").select("id, image_url, alt_text, sort_order").eq("post_id", post.id).order("sort_order", {
      ascending: true
    });
    if (Array.isArray(directGal) && directGal.length > 0) {
      gallery = directGal;
    }
  }
  const {
    resolveMediaUrl
  } = await import("./admin.functions-C2WAczeU.mjs").then((n) => n.w);
  if (Array.isArray(gallery)) {
    gallery = gallery.map((g, idx) => ({
      id: g.id,
      image_url: resolveMediaUrl(g.image_url, supabaseAdmin),
      alt_text: g.alt_text ?? "",
      sort_order: g.sort_order ?? idx
    }));
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
    cover_image: resolveMediaUrl(post.cover_image, supabaseAdmin),
    og_image_url: resolveMediaUrl(post.og_image_url, supabaseAdmin),
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
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("posts").select("slug,updated_at").eq("published", true);
  if (error) throw new Error(error.message);
  return data ?? [];
});
const KNOWN_COUNTRY_HINTS = {
  // Countries
  pakistan: "Pakistan",
  nepal: "Nepal",
  india: "India",
  japan: "Japan",
  indonesia: "Indonesia",
  thailand: "Thailand",
  vietnam: "Vietnam",
  iceland: "Iceland",
  italy: "Italy",
  switzerland: "Switzerland",
  norway: "Norway",
  turkey: "Turkey",
  turkiye: "Turkey",
  greece: "Greece",
  spain: "Spain",
  portugal: "Portugal",
  france: "France",
  austria: "Austria",
  germany: "Germany",
  chile: "Chile",
  argentina: "Argentina",
  peru: "Peru",
  bolivia: "Bolivia",
  canada: "Canada",
  usa: "United States",
  "united states": "United States",
  uk: "United Kingdom",
  "united kingdom": "United Kingdom",
  scotland: "United Kingdom",
  georgia: "Georgia",
  kyrgyzstan: "Kyrgyzstan",
  tajikistan: "Tajikistan",
  uzbekistan: "Uzbekistan",
  kazakhstan: "Kazakhstan",
  mongolia: "Mongolia",
  morocco: "Morocco",
  egypt: "Egypt",
  jordan: "Jordan",
  oman: "Oman",
  uae: "United Arab Emirates",
  // Pakistan regions, districts, mountains & valleys
  "gilgit-baltistan": "Pakistan",
  "gilgit baltistan": "Pakistan",
  gilgit: "Pakistan",
  ghizer: "Pakistan",
  phander: "Pakistan",
  diamer: "Pakistan",
  skardu: "Pakistan",
  hunza: "Pakistan",
  karakoram: "Pakistan",
  chitral: "Pakistan",
  swat: "Pakistan",
  kashmir: "Pakistan",
  punjab: "Pakistan",
  sindh: "Pakistan",
  balochistan: "Pakistan",
  "khyber pakhtunkhwa": "Pakistan",
  kpk: "Pakistan",
  k2: "Pakistan",
  concordia: "Pakistan",
  baltoro: "Pakistan",
  "nanga parbat": "Pakistan",
  "fairy meadows": "Pakistan",
  deosai: "Pakistan",
  passu: "Pakistan",
  rakaposhi: "Pakistan",
  babusar: "Pakistan",
  shandur: "Pakistan",
  khunjerab: "Pakistan",
  shimshal: "Pakistan",
  gojal: "Pakistan",
  askole: "Pakistan",
  hushe: "Pakistan",
  nagar: "Pakistan",
  astore: "Pakistan",
  shigar: "Pakistan",
  khaplu: "Pakistan",
  attabad: "Pakistan",
  kalash: "Pakistan",
  kumrat: "Pakistan",
  dir: "Pakistan",
  kaghan: "Pakistan",
  naran: "Pakistan",
  // Nepal
  himalaya: "Nepal",
  himalayas: "Nepal",
  everest: "Nepal",
  annapurna: "Nepal",
  kathmandu: "Nepal",
  pokhara: "Nepal",
  mustang: "Nepal",
  manang: "Nepal",
  langtang: "Nepal",
  solukhumbu: "Nepal",
  // India
  ladakh: "India",
  leh: "India",
  spiti: "India",
  manali: "India",
  rishikesh: "India",
  sikkim: "India",
  // Global travel spots
  bali: "Indonesia",
  ubud: "Indonesia",
  lombok: "Indonesia",
  kyoto: "Japan",
  tokyo: "Japan",
  osaka: "Japan",
  fuji: "Japan",
  hokkaido: "Japan",
  dolomites: "Italy",
  alps: "Switzerland",
  zermatt: "Switzerland",
  patagonia: "Chile",
  banff: "Canada",
  tromso: "Norway",
  lofotens: "Norway",
  lofoten: "Norway",
  cappadocia: "Turkey",
  santorini: "Greece"
};
function extractCountryFromLocation(locationName) {
  if (!locationName || typeof locationName !== "string") return null;
  const cleaned = locationName.trim();
  if (!cleaned) return null;
  const segments = cleaned.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i];
    if (KNOWN_COUNTRY_HINTS[seg]) {
      return KNOWN_COUNTRY_HINTS[seg];
    }
  }
  const words = cleaned.toLowerCase().split(/\s+/).map((w) => w.replace(/[^\w-]/g, ""));
  for (const w of words) {
    if (KNOWN_COUNTRY_HINTS[w]) {
      return KNOWN_COUNTRY_HINTS[w];
    }
  }
  if (segments.length > 1) {
    const lastSeg = segments[segments.length - 1];
    return lastSeg.charAt(0).toUpperCase() + lastSeg.slice(1);
  }
  return null;
}
const getJourneyStats_createServerFn_handler = createServerRpc({
  id: "71d8fdf30ae9e2f9106b2721993bf34184ed8f34872c023de76a2613f0644775",
  name: "getJourneyStats",
  filename: "src/lib/posts.functions.ts"
}, (opts) => getJourneyStats.__executeServer(opts));
const getJourneyStats = createServerFn({
  method: "GET"
}).handler(getJourneyStats_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-Dg1wI_zl.mjs");
  const {
    data: posts
  } = await supabaseAdmin.from("posts").select("id, title, location_name, destination_id, destinations(country)").eq("published", true);
  const countrySet = /* @__PURE__ */ new Set();
  if (posts && Array.isArray(posts)) {
    for (const p of posts) {
      const country = extractCountryFromLocation(p.location_name);
      if (country) {
        countrySet.add(country.toLowerCase());
        continue;
      }
      const destCountry = p.destinations?.country;
      if (destCountry && typeof destCountry === "string" && destCountry.trim()) {
        countrySet.add(destCountry.trim().toLowerCase());
      }
    }
  }
  return {
    countriesCount: Math.max(countrySet.size, 1),
    countriesList: Array.from(countrySet)
  };
});
export {
  getJourneyStats_createServerFn_handler,
  getPostBySlug_createServerFn_handler,
  listAllPostSlugs_createServerFn_handler,
  listPosts_createServerFn_handler
};
