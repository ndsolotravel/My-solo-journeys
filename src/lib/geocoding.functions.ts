import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

interface GeocodingResult {
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

const COMMON_WORDS = [
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
  "under", "further", "then", "once", "here", "there", "if", "why",
  "story", "travel", "trip", "journey", "adventure", "guide", "tips",
  "best", "top", "ultimate", "complete", "perfect", "amazing", "incredible",
  "beautiful", "stunning", "breathtaking", "magical", "unforgettable",
  "exploring", "discover", "hidden", "secret", "remote", "wild", "epic",
  "part", "first", "second", "third", "how", "what", "where", "when",
  "experience", "escape", "road", "trek", "hike", "camp", "explore",
  "visit", "destination", "place", "spot", "location", "area", "region",
  "valley", "mountain", "lake", "river", "island", "beach", "city", "town",
  "village", "country", "national", "park", "reserve", "forest", "desert",
  "coast", "cliff", "peak", "summit", "pass", "bridge", "castle", "temple",
  "church", "mosque", "palace", "fort", "ruins", "museum", "market",
  "garden", "fall", "waterfall", "spring", "cave", "canyon", "gorge",
  "plain", "plateau", "glacier", "volcano", "oasis", "lagoon",
  "bay", "harbor", "port", "pier", "dock", "jetty", "reef", "atoll",
  "coral", "strait", "channel", "fjord", "inlet", "cove", "cape",
  "peninsula", "isthmus", "delta", "basin", "range", "ridge", "hill",
  "bluff", "mesa", "butte", "tableland", "highland", "lowland",
  "wetland", "marsh", "swamp", "bog", "fen", "moor", "heath", "meadow",
  "pasture", "prairie", "steppe", "savanna", "tundra", "taiga", "jungle",
  "rainforest", "woodland", "grove", "orchard", "vineyard", "farm",
  "ranch", "plantation", "estate", "manor", "villa", "cottage", "cabin",
  "lodge", "inn", "hotel", "resort", "hostel", "campground", "caravan",
];

function extractLocationFromTitle(title: string): string[] {
  const locations: string[] = [];
  const words = title.split(/\s+/);

  const capitalizedWords: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[^\w]/g, "");
    if (word.length > 2 && /^[A-Z]/.test(word) && !COMMON_WORDS.includes(word.toLowerCase())) {
      capitalizedWords.push(word);
    }
  }

  locations.push(title);

  if (capitalizedWords.length > 0) {
    locations.push(capitalizedWords.join(" "));
    for (let i = 0; i < capitalizedWords.length; i++) {
      for (let j = i + 1; j <= Math.min(i + 3, capitalizedWords.length); j++) {
        locations.push(capitalizedWords.slice(i, j).join(" "));
      }
    }
  }

  const cleanedTitle = title
    .replace(/\b(story|travel|trip|journey|adventure|guide|tips|best|top|ultimate|complete|perfect|amazing|incredible|beautiful|stunning|breathtaking|magical|unforgettable|exploring|discover|hidden|secret|remote|wild|epic|part|first|second|third|how|what|where|when|experience|escape|road|trek|hike|camp|explore|visit|destination|place|spot|location|area|region)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanedTitle && cleanedTitle !== title) {
    locations.push(cleanedTitle);
  }

  const unique: string[] = [];
  const seen = new Set<string>();
  for (const loc of locations) {
    const lower = loc.toLowerCase().trim();
    if (!seen.has(lower) && lower.length > 0) {
      seen.add(lower);
      unique.push(loc);
    }
  }

  return unique.slice(0, 10);
}

async function searchNominatim(query: string): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "5",
    addressdetails: "1",
    extratags: "1",
    namedetails: "1",
  });

  const response = await fetch("https://nominatim.openstreetmap.org/search?" + params.toString(), {
    headers: {
      "User-Agent": "KnowledgeHubBlog/1.0 (https://knowledgehub.com)",
    },
  });

  if (!response.ok) {
    throw new Error("Nominatim API error: " + response.status);
  }

  return response.json();
}

function determineConfidence(
  result: NominatimResult,
  originalQuery: string
): "high" | "medium" | "low" {
  const queryWords = originalQuery.toLowerCase().split(/\s+/);

  const highPriorityTypes = [
    "city", "town", "village", "hamlet", "municipality",
    "county", "state", "province", "region", "country",
    "mountain", "peak", "hill", "valley", "lake", "river",
    "island", "beach", "park", "reserve", "forest",
  ];

  if (highPriorityTypes.includes(result.type) && result.importance > 0.5) {
    return "high";
  }

  const matchCount = queryWords.filter((word) =>
    result.display_name.toLowerCase().includes(word)
  ).length;

  if (matchCount >= queryWords.length * 0.7) {
    return "medium";
  }

  return "low";
}

export const geocodeFromTitle = createServerFn({ method: "POST" })
  .inputValidator((i) =>
    z
      .object({
        title: z.string().min(1),
        existingLocation: z.string().optional(),
      })
      .parse(i)
  )
  .handler(async ({ data }) => {
    const { title, existingLocation } = data;

    if (existingLocation && existingLocation.trim()) {
      return {
        success: false,
        message: "Location already exists. Use 'Auto Detect' to override.",
        result: null,
      };
    }

    const searchQueries = extractLocationFromTitle(title);
    let bestResult: GeocodingResult | null = null;
    let bestConfidence: "high" | "medium" | "low" = "low";

    for (const query of searchQueries) {
      try {
        const results = await searchNominatim(query);

        if (results.length > 0) {
          for (const result of results) {
            const confidence = determineConfidence(result, title);

            const priority: Record<string, number> = { high: 3, medium: 2, low: 1 };
            if (priority[confidence] > priority[bestConfidence]) {
              bestConfidence = confidence;
              bestResult = {
                locationName: result.namedetails?.name || result.display_name.split(",")[0],
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon),
                displayName: result.display_name,
                confidence,
              };
            }
          }

          if (bestConfidence === "high") break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn("[geocoding] Error searching for " + query + ":", error);
      }
    }

    if (bestResult) {
      return {
        success: true,
        message: "Location detected with " + bestConfidence + " confidence",
        result: bestResult,
      };
    }

    return {
      success: false,
      message: "Could not determine location from title. Please enter manually.",
      result: null,
    };
  });

export const batchGeocodePosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) =>
    z
      .object({
        postIds: z.array(z.string().uuid()).optional(),
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
    } else {
      query = query.or("location_name.is.null,location_name.eq.");
    }

    const { data: posts, error } = await query;

    if (error) throw new Error(error.message);
    if (!posts || posts.length === 0) {
      return { updated: 0, flagged: 0, posts: [] };
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

    for (const post of posts) {
      if (post.location_name && post.latitude && post.longitude) {
        results.push({
          id: post.id,
          title: post.title,
          oldLocation: post.location_name,
          newLocation: post.location_name,
          latitude: post.latitude,
          longitude: post.longitude,
          status: "skipped",
        });
        continue;
      }

      try {
        const searchQueries = extractLocationFromTitle(post.title);
        let bestResult: GeocodingResult | null = null;

        for (const query of searchQueries) {
          try {
            const nominatimResults = await searchNominatim(query);

            if (nominatimResults.length > 0) {
              const result = nominatimResults[0];
              bestResult = {
                locationName: result.namedetails?.name || result.display_name.split(",")[0],
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon),
                displayName: result.display_name,
                confidence: determineConfidence(result, post.title),
              };
              break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
          } catch (error) {
            console.warn("[batchGeocode] Error searching for " + query + ":", error);
          }
        }

        if (bestResult && bestResult.confidence !== "low") {
          if (!data.dryRun) {
            const { error: updateError } = await client
              .from("posts")
              .update({
                location_name: bestResult.locationName,
                latitude: bestResult.latitude,
                longitude: bestResult.longitude,
                updated_at: new Date().toISOString(),
              })
              .eq("id", post.id);

            if (updateError) {
              console.warn("[batchGeocode] Error updating post " + post.id + ":", updateError);
            }
          }

          results.push({
            id: post.id,
            title: post.title,
            oldLocation: post.location_name,
            newLocation: bestResult.locationName,
            latitude: bestResult.latitude,
            longitude: bestResult.longitude,
            status: "updated",
          });
          updatedCount++;
        } else {
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
      } catch (error) {
        console.warn("[batchGeocode] Error processing post " + post.id + ":", error);
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
      posts: results,
    };
  });
