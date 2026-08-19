import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface GeocodingResult {
  locationName: string;
  latitude: number;
  longitude: number;
  displayName: string;
  confidence: "high" | "medium" | "low";
}

interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  importance: number;
  namedetails?: {
    name?: string;
    name_en?: string;
  };
}

interface KnownLocationEntry {
  patterns: RegExp[];
  locationName: string;
  latitude: number;
  longitude: number;
  displayName: string;
}

/**
 * Curated high-precision registry of solo travel destinations, mountains,
 * valleys, base camps, passes, and regions with verified coordinates.
 */
const KNOWN_DESTINATIONS: KnownLocationEntry[] = [
  {
    patterns: [
      /\bk[- ]?2\s*(base\s*camp|concordia)?\b/i,
      /\bconcordia\s*(diaries|camp|glacier)?\b/i,
      /\bgodwin[- ]austen\b/i,
    ],
    locationName: "K2 Base Camp, Concordia",
    latitude: 35.8825,
    longitude: 76.5133,
    displayName: "K2 Base Camp, Concordia, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bnanga\s*parbat\b/i,
      /\bkiller\s*mountain\b/i,
      /\bdiamer\b/i,
      /\braikot\b/i,
      /\brupal\s*face\b/i,
    ],
    locationName: "Nanga Parbat, Diamer",
    latitude: 35.2375,
    longitude: 74.5892,
    displayName: "Nanga Parbat, Diamer, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bphander\s*(valley|lake)?\b/i,
      /\bphandar\b/i,
    ],
    locationName: "Phander Valley, Ghizer",
    latitude: 36.1793,
    longitude: 73.7512,
    displayName: "Phander Valley, Ghizer, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\b(high\s*)?himalayas?\b/i,
      /\bnepal\b/i,
      /\bannapurna\b/i,
      /\beverest\b/i,
      /\bkhumbu\b/i,
    ],
    locationName: "High Himalaya, Nepal",
    latitude: 27.9881,
    longitude: 86.925,
    displayName: "High Himalaya, Nepal",
  },
  {
    patterns: [
      /\bkarakoram(\s*highway|\s*range)?\b/i,
      /\bkkh\b/i,
      /\bskardu\b/i,
      /\bbaltistan\b/i,
    ],
    locationName: "Karakoram, Skardu",
    latitude: 35.2971,
    longitude: 75.6333,
    displayName: "Karakoram, Skardu, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bfairy\s*meadows?\b/i,
      /\bjhel\b/i,
      /\bbeyal\s*camp\b/i,
    ],
    locationName: "Fairy Meadows, Diamer",
    latitude: 35.385,
    longitude: 74.5778,
    displayName: "Fairy Meadows, Diamer, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bhunza(\s*valley)?\b/i,
      /\bkarimabad\b/i,
      /\baltit(\s*fort)?\b/i,
      /\bbaltit(\s*fort)?\b/i,
      /\bduikar\b/i,
      /\beagle['’]?s\s*nest\b/i,
    ],
    locationName: "Hunza Valley, Gilgit-Baltistan",
    latitude: 36.3167,
    longitude: 74.65,
    displayName: "Hunza Valley, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bdeosai(\s*plains?|\s*national\s*park)?\b/i,
      /\bsheosar(\s*lake)?\b/i,
      /\bland\s*of\s*giants\b/i,
    ],
    locationName: "Deosai Plains, Skardu",
    latitude: 35.0306,
    longitude: 75.4414,
    displayName: "Deosai National Park, Skardu, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bpassu(\s*cones?|\s*cathedrals?|\s*glacier)?\b/i,
      /\bupper\s*hunza\b/i,
      /\bgojal\b/i,
      /\bhussaini(\s*suspension)?\s*bridge\b/i,
    ],
    locationName: "Passu Cones, Gojal",
    latitude: 36.474,
    longitude: 74.887,
    displayName: "Passu, Gojal, Upper Hunza, Pakistan",
  },
  {
    patterns: [
      /\battabad(\s*lake)?\b/i,
    ],
    locationName: "Attabad Lake, Hunza",
    latitude: 36.3389,
    longitude: 74.8694,
    displayName: "Attabad Lake, Gojal, Hunza, Pakistan",
  },
  {
    patterns: [
      /\bkhunjerab(\s*pass)?\b/i,
      /\bpak[- ]china\s*border\b/i,
    ],
    locationName: "Khunjerab Pass, Karakoram Highway",
    latitude: 36.8497,
    longitude: 75.4244,
    displayName: "Khunjerab Pass, Pakistan-China Border, Pakistan",
  },
  {
    patterns: [
      /\brakaposhi(\s*base\s*camp|\s*view\s*point)?\b/i,
      /\bnagar(\s*valley)?\b/i,
      /\bminapin\b/i,
    ],
    locationName: "Rakaposhi Base Camp, Nagar",
    latitude: 36.1408,
    longitude: 74.4908,
    displayName: "Rakaposhi, Nagar Valley, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bbaltoro(\s*glacier)?\b/i,
      /\bpaiju\b/i,
      /\burdukas\b/i,
      /\bgoro\s*ii\b/i,
    ],
    locationName: "Baltoro Glacier, Karakoram",
    latitude: 35.7333,
    longitude: 76.4,
    displayName: "Baltoro Glacier, Karakoram, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bshimshal(\s*valley|\s*pass)?\b/i,
      /\bminglik\s*sar\b/i,
    ],
    locationName: "Shimshal Valley, Hunza",
    latitude: 36.4389,
    longitude: 75.3194,
    displayName: "Shimshal Valley, Upper Hunza, Pakistan",
  },
  {
    patterns: [
      /\bghizer(\s*valley)?\b/i,
      /\bgupis\b/i,
      /\bkhalti\s*lake\b/i,
    ],
    locationName: "Ghizer Valley, Gilgit-Baltistan",
    latitude: 36.2167,
    longitude: 73.6667,
    displayName: "Ghizer Valley, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\byasin(\s*valley)?\b/i,
      /\bdarkot\b/i,
    ],
    locationName: "Yasin Valley, Ghizer",
    latitude: 36.3667,
    longitude: 73.35,
    displayName: "Yasin Valley, Ghizer, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bbroghil(\s*valley|\s*national\s*park)?\b/i,
      /\bkarambar\s*lake\b/i,
    ],
    locationName: "Broghil Valley, Upper Chitral",
    latitude: 36.8333,
    longitude: 73.4167,
    displayName: "Broghil Valley, Upper Chitral, Pakistan",
  },
  {
    patterns: [
      /\bkalash(\s*valleys?|\s*people)?\b/i,
      /\bbumburet\b/i,
      /\brumbur\b/i,
      /\bbirir\b/i,
      /\bchitral\b/i,
    ],
    locationName: "Kalash Valley, Chitral",
    latitude: 35.7,
    longitude: 71.6833,
    displayName: "Kalash Valley, Chitral, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    patterns: [
      /\bswat(\s*valley)?\b/i,
      /\bkalam\b/i,
      /\bmalam\s*jabba\b/i,
      /\bmahudand\s*lake\b/i,
      /\bumanr\b/i,
    ],
    locationName: "Swat Valley, Khyber Pakhtunkhwa",
    latitude: 35.2227,
    longitude: 72.4258,
    displayName: "Swat Valley, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    patterns: [
      /\bkumrat(\s*valley)?\b/i,
      /\bthal\b/i,
      /\bjandrai\b/i,
      /\bkatora\s*lake\b/i,
    ],
    locationName: "Kumrat Valley, Upper Dir",
    latitude: 35.5333,
    longitude: 72.2167,
    displayName: "Kumrat Valley, Upper Dir, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    patterns: [
      /\bbabusar(\s*pass|\s*top)?\b/i,
      /\bkaghan(\s*valley)?\b/i,
      /\bnaran\b/i,
      /\bsaif[- ]ul[- ]mal[ou]{2}k\b/i,
      /\blulusar\b/i,
    ],
    locationName: "Babusar Pass, Kaghan Valley",
    latitude: 35.1481,
    longitude: 74.0489,
    displayName: "Babusar Pass, Kaghan Valley, Pakistan",
  },
  {
    patterns: [
      /\bneelum(\s*valley)?\b/i,
      /\barang\s*kel\b/i,
      /\bratti\s*gali(\s*lake)?\b/i,
      /\bsharda\b/i,
      /\bkeran\b/i,
    ],
    locationName: "Neelum Valley, Azad Kashmir",
    latitude: 34.5889,
    longitude: 73.9056,
    displayName: "Neelum Valley, Azad Kashmir, Pakistan",
  },
  {
    patterns: [
      /\brush\s*lake\b/i,
      /\brush\s*peak\b/i,
    ],
    locationName: "Rush Lake, Nagar",
    latitude: 36.15,
    longitude: 74.9167,
    displayName: "Rush Lake, Nagar Valley, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bkatpana(\s*desert|\s*cold\s*desert)?\b/i,
      /\bshangrila(\s*resort)?\b/i,
      /\blower\s*kachura\b/i,
      /\bupper\s*kachura\b/i,
    ],
    locationName: "Skardu, Katpana Cold Desert",
    latitude: 35.3208,
    longitude: 75.5947,
    displayName: "Katpana Desert, Skardu, Gilgit-Baltistan, Pakistan",
  },
  {
    patterns: [
      /\bastola\s*island\b/i,
      /\bhingol(\s*national\s*park)?\b/i,
      /\bprincess\s*of\s*hope\b/i,
      /\bkund\s*malir\b/i,
    ],
    locationName: "Hingol, Balochistan",
    latitude: 25.52,
    longitude: 65.52,
    displayName: "Hingol National Park, Balochistan, Pakistan",
  },
  {
    patterns: [
      /\bgorakh\s*hill\b/i,
    ],
    locationName: "Gorakh Hill Station, Sindh",
    latitude: 26.8667,
    longitude: 67.15,
    displayName: "Gorakh Hill Station, Dadu, Sindh, Pakistan",
  },
  {
    patterns: [
      /\bmargalla(\s*hills)?\b/i,
      /\bislamabad\b/i,
    ],
    locationName: "Margalla Hills, Islamabad",
    latitude: 33.7439,
    longitude: 73.0239,
    displayName: "Margalla Hills, Islamabad, Pakistan",
  },
  {
    patterns: [
      /\blahore\b/i,
      /\bbadshahi\s*mosque\b/i,
    ],
    locationName: "Lahore, Punjab",
    latitude: 31.5204,
    longitude: 74.3587,
    displayName: "Lahore, Punjab, Pakistan",
  },
  {
    patterns: [
      /\bkarachi\b/i,
      /\bclifton\s*beach\b/i,
    ],
    locationName: "Karachi, Sindh",
    latitude: 24.8607,
    longitude: 67.0011,
    displayName: "Karachi, Sindh, Pakistan",
  },
];

const COMMON_NOISE_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "was", "are", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "need", "dare",
  "ought", "used", "my", "your", "his", "her", "its", "our", "their",
  "this", "that", "these", "those", "i", "you", "he", "she", "it",
  "we", "they", "me", "him", "her", "us", "them", "what", "which",
  "who", "whom", "whose", "when", "where", "why", "how", "all", "each",
  "every", "both", "few", "more", "most", "other", "some", "such", "no",
  "not", "only", "own", "same", "so", "than", "too", "very", "just",
  "about", "above", "after", "again", "against", "as", "because", "before",
  "below", "between", "into", "through", "during", "out", "off", "over",
  "under", "further", "then", "once", "here", "there", "if",
  "story", "stories", "travel", "travelling", "traveller", "solo", "trip",
  "journey", "adventure", "guide", "tips", "best", "top", "ultimate",
  "complete", "perfect", "amazing", "incredible", "beautiful", "stunning",
  "breathtaking", "magical", "unforgettable", "exploring", "explore",
  "discover", "discovering", "hidden", "secret", "remote", "wild", "epic",
  "part", "first", "second", "third", "experience", "escape", "road",
  "trek", "trekking", "hike", "hiking", "camp", "camping", "visit",
  "destination", "spot", "budget", "day", "days", "week", "weeks", "month",
  "months", "year", "years", "diaries", "diary", "photographing", "photography",
  "photos", "light", "cold", "patience", "killer", "mountain", "three",
  "chasing", "autumn", "summer", "winter", "spring",
]);

/**
 * Extract candidate location phrases from the title by splitting on colons,
 * dashes, quotes, and filtering out common travel filler words.
 */
function extractLocationCandidates(title: string): string[] {
  const candidates: string[] = [];

  // Check direct segments if title contains separators like `:` or `-` or `|`
  const segments = title.split(/[:|\-–—]/).map((s) => s.trim()).filter(Boolean);
  for (const seg of segments) {
    const cleaned = cleanPhrase(seg);
    if (cleaned && cleaned.length >= 3) {
      candidates.push(cleaned);
    }
  }

  // Check full title cleaned
  const cleanedFull = cleanPhrase(title);
  if (cleanedFull && !candidates.includes(cleanedFull)) {
    candidates.push(cleanedFull);
  }

  // Capitalized word groups
  const words = title.split(/\s+/);
  const capitalized: string[] = [];
  for (const rawWord of words) {
    const clean = rawWord.replace(/[^\w]/g, "");
    if (clean.length > 2 && /^[A-Z]/.test(clean) && !COMMON_NOISE_WORDS.has(clean.toLowerCase())) {
      capitalized.push(clean);
    }
  }

  if (capitalized.length > 0) {
    const joinedCap = capitalized.join(" ");
    if (!candidates.includes(joinedCap)) candidates.push(joinedCap);

    for (let i = 0; i < capitalized.length; i++) {
      for (let j = i + 1; j <= Math.min(i + 3, capitalized.length); j++) {
        const sub = capitalized.slice(i, j).join(" ");
        if (!candidates.includes(sub) && sub.length >= 3) {
          candidates.push(sub);
        }
      }
    }
  }

  return Array.from(new Set(candidates)).filter(Boolean);
}

function cleanPhrase(text: string): string {
  return text
    .replace(/[«»""''‘’“”]/g, "")
    .replace(/\$\d+(\s*(a|per)\s*day)?/gi, "")
    .replace(/\b(solo\s+to|chasing\s+autumn\s+in|trekking|budget\s+travel\s+in|photographing\s+the|a\s+week\s+in|three\s+weeks\s+at|guide\s+to|exploring|road\s+trip\s+to|the\s+killer\s+mountain|the\s+concordia\s+diaries|light,\s*cold,\s*and\s*patience)\b/gi, " ")
    .replace(/\b(the|a|an|in|at|on|to|for|of|with|by|from|part\s*\d+|part\s*(one|two|three))\b/gi, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match a title or phrase against our verified curated registry.
 */
function matchKnownDestination(title: string): GeocodingResult | null {
  for (const entry of KNOWN_DESTINATIONS) {
    for (const pattern of entry.patterns) {
      if (pattern.test(title)) {
        return {
          locationName: entry.locationName,
          latitude: entry.latitude,
          longitude: entry.longitude,
          displayName: entry.displayName,
          confidence: "high",
        };
      }
    }
  }
  return null;
}

/**
 * Fallback to OpenStreetMap Nominatim for unlisted global destinations.
 */
async function searchNominatim(query: string): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "5",
    addressdetails: "1",
    extratags: "1",
    namedetails: "1",
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
    headers: {
      "User-Agent": "NDSoloTravelKnowledgeHub/2.0 (contact@ndsolotravel.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim API error: ${response.status}`);
  }

  return response.json();
}

function determineConfidence(
  result: NominatimResult,
  originalQuery: string
): "high" | "medium" | "low" {
  const queryWords = originalQuery.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const displayNameLower = result.display_name.toLowerCase();

  const highPriorityTypes = [
    "city", "town", "village", "hamlet", "municipality",
    "county", "state", "province", "region", "country",
    "mountain", "peak", "hill", "valley", "lake", "river",
    "island", "beach", "national_park", "park", "reserve", "forest", "glacier",
  ];

  const hasMatchingWords = queryWords.some((word) => displayNameLower.includes(word));
  if (!hasMatchingWords) return "low";

  if (highPriorityTypes.includes(result.type) && result.importance > 0.4) {
    return "high";
  }

  const matchCount = queryWords.filter((word) => displayNameLower.includes(word)).length;
  if (matchCount >= Math.max(1, queryWords.length * 0.5)) {
    return "medium";
  }

  return "low";
}

/**
 * Detect location and coordinates from post title.
 */
export const geocodeFromTitle = createServerFn({ method: "POST" })
  .validator((i: unknown) =>
    z
      .object({
        title: z.string().min(1),
        existingLocation: z.string().optional(),
        override: z.boolean().default(false),
      })
      .parse(i)
  )
  .handler(async ({ data }) => {
    const { title, existingLocation, override } = data;

    if (!override && existingLocation && existingLocation.trim()) {
      return {
        success: false,
        message: "Location already exists. Use 'Auto Detect' to override.",
        result: null,
      };
    }

    // 1. Check curated high-precision destination knowledge base
    const knownMatch = matchKnownDestination(title);
    if (knownMatch) {
      return {
        success: true,
        message: `Detected: ${knownMatch.displayName}`,
        result: knownMatch,
      };
    }

    // 2. Query candidates against Nominatim
    const candidates = extractLocationCandidates(title);
    let bestResult: GeocodingResult | null = null;
    let bestConfidence: "high" | "medium" | "low" = "low";

    for (const query of candidates) {
      if (query.length < 3) continue;

      // Check sub-phrases in known destinations
      const subKnown = matchKnownDestination(query);
      if (subKnown) {
        return {
          success: true,
          message: `Detected: ${subKnown.displayName}`,
          result: subKnown,
        };
      }

      try {
        const results = await searchNominatim(query);
        if (results.length > 0) {
          for (const result of results) {
            const conf = determineConfidence(result, query);
            const priority: Record<string, number> = { high: 3, medium: 2, low: 1 };

            if (priority[conf] > priority[bestConfidence]) {
              bestConfidence = conf;
              bestResult = {
                locationName: result.namedetails?.name || result.display_name.split(",")[0].trim(),
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon),
                displayName: result.display_name,
                confidence: conf,
              };
            }
          }

          if (bestConfidence === "high") break;
        }

        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (err) {
        console.warn(`[geocoding] Error searching Nominatim for '${query}':`, err);
      }
    }

    // Only accept if confidence is reliable (do NOT guess false coordinates)
    if (bestResult && bestConfidence !== "low") {
      return {
        success: true,
        message: `Detected: ${bestResult.displayName}`,
        result: bestResult,
      };
    }

    return {
      success: false,
      message: "Could not reliably determine location. Please enter manually.",
      result: null,
    };
  });

/**
 * Batch geocode all or specified posts in Supabase and update coordinates.
 */
export const batchGeocodePosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((i: unknown) =>
    z
      .object({
        postIds: z.array(z.string().uuid()).optional(),
        forceAll: z.boolean().default(false),
        dryRun: z.boolean().default(false),
      })
      .parse(i)
  )
  .handler(async ({ context, data }) => {
    const client = context.supabase ?? (await import("@/integrations/supabase/client.server")).supabaseAdmin;

    let query = client
      .from("posts")
      .select("id, title, location_name, latitude, longitude");

    if (data.postIds && data.postIds.length > 0) {
      query = query.in("id", data.postIds);
    }

    const { data: posts, error } = await query;

    if (error) throw new Error(error.message);
    if (!posts || posts.length === 0) {
      return { updated: 0, flagged: 0, skipped: 0, posts: [] };
    }

    const results: Array<{
      id: string;
      title: string;
      oldLocation: string | null;
      newLocation: string | null;
      latitude: number | null;
      longitude: number | null;
      status: "updated" | "flagged" | "skipped";
    }> = [];

    let updatedCount = 0;
    let flaggedCount = 0;
    let skippedCount = 0;

    for (const post of posts) {
      // If already has valid coordinates and not forced, preserve verified data
      if (
        !data.forceAll &&
        post.location_name &&
        typeof post.latitude === "number" &&
        !isNaN(post.latitude) &&
        typeof post.longitude === "number" &&
        !isNaN(post.longitude)
      ) {
        results.push({
          id: post.id,
          title: post.title,
          oldLocation: post.location_name,
          newLocation: post.location_name,
          latitude: post.latitude,
          longitude: post.longitude,
          status: "skipped",
        });
        skippedCount++;
        continue;
      }

      // Check known dictionary first
      let detected = matchKnownDestination(post.title);

      // If not in known dictionary, try title candidates
      if (!detected) {
        const candidates = extractLocationCandidates(post.title);
        for (const candidate of candidates) {
          detected = matchKnownDestination(candidate);
          if (detected) break;

          try {
            const nomResults = await searchNominatim(candidate);
            if (nomResults.length > 0) {
              const r = nomResults[0];
              const conf = determineConfidence(r, candidate);
              if (conf !== "low") {
                detected = {
                  locationName: r.namedetails?.name || r.display_name.split(",")[0].trim(),
                  latitude: parseFloat(r.lat),
                  longitude: parseFloat(r.lon),
                  displayName: r.display_name,
                  confidence: conf,
                };
                break;
              }
            }
            await new Promise((res) => setTimeout(res, 800));
          } catch (e) {
            console.warn(`[batchGeocode] Error on candidate '${candidate}':`, e);
          }
        }
      }

      if (detected) {
        if (!data.dryRun) {
          const { error: directErr } = await client
            .from("posts")
            .update({
              location_name: detected.locationName,
              latitude: detected.latitude,
              longitude: detected.longitude,
              updated_at: new Date().toISOString(),
            })
            .eq("id", post.id);

          if (directErr) {
            try {
              await client.rpc("admin_update_post_location", {
                p_post_id: post.id,
                p_location_name: detected.locationName,
                p_latitude: detected.latitude,
                p_longitude: detected.longitude,
              });
            } catch (rpcErr) {
              console.warn(`[batchGeocode] Update failed for post ${post.id}:`, directErr || rpcErr);
            }
          }
        }

        results.push({
          id: post.id,
          title: post.title,
          oldLocation: post.location_name,
          newLocation: detected.locationName,
          latitude: detected.latitude,
          longitude: detected.longitude,
          status: "updated",
        });
        updatedCount++;
      } else {
        // Flag for manual review if location cannot be reliably determined
        results.push({
          id: post.id,
          title: post.title,
          oldLocation: post.location_name,
          newLocation: null,
          latitude: null,
          longitude: null,
          status: "flagged",
        });
        flaggedCount++;
      }
    }

    return {
      updated: updatedCount,
      flagged: flaggedCount,
      skipped: skippedCount,
      posts: results,
    };
  });
