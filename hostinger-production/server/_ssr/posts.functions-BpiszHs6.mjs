import { c as createSsrRpc } from "./createSsrRpc-BLJWJFkS.mjs";
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
const listPosts = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  category: stringType().optional(),
  categories: arrayType(stringType()).optional(),
  tag: stringType().optional(),
  destination: stringType().optional(),
  search: stringType().optional(),
  limit: numberType().min(1).max(50).default(24),
  offset: numberType().min(0).default(0),
  featuredOnly: booleanType().optional(),
  sort: enumType(["latest", "popular"]).default("latest"),
  sinceDays: numberType().min(1).max(365).optional()
}).parse(input ?? {})).handler(createSsrRpc("11a3e5221d8be21b9fdddebef660f538b92679319c39b4d5a1df7f1408533287"));
const getPostBySlug = createServerFn({
  method: "GET"
}).validator((input) => objectType({
  slug: stringType().min(1)
}).parse(input)).handler(createSsrRpc("9c8084edff95c284c741e3785ab938a71693bfe26e2c07e4c0272b47d311afc2"));
const listAllPostSlugs = createServerFn({
  method: "GET"
}).handler(createSsrRpc("98f1f07821f4ca35a777ae3a9c3739bd15d263f1786ca97572dcb7a9cd5f9183"));
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
  // Seychelles & Islands
  seychelles: "Seychelles",
  mahe: "Seychelles",
  "mahé": "Seychelles",
  praslin: "Seychelles",
  "la digue": "Seychelles",
  victoria: "Seychelles"
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
async function computeJourneyCountries(client) {
  const {
    data: posts
  } = await client.from("posts").select("id, title, location_name, destination_id, destinations(country)").eq("published", true);
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
}
export {
  KNOWN_COUNTRY_HINTS,
  computeJourneyCountries,
  extractCountryFromLocation,
  getPostBySlug,
  listAllPostSlugs,
  listPosts
};
