/**
 * High-speed server-side translation engine.
 * Features:
 * 1. Global in-memory cache to answer repeat translations in 0ms.
 * 2. Multi-line newline batching to translate up to 15 strings per single HTTP request.
 * 3. Parallel chunk execution via Promise.all.
 * 4. High-reliability fallback cascade (dict-chrome-ex -> gtx -> MyMemory).
 */

const serverCache = new Map<string, string>(); // "lang:text" -> translated

const BATCH_SIZE = 15;
const FETCH_TIMEOUT_MS = 3500;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function extractTranslation(data: unknown): string {
  if (!Array.isArray(data) || !Array.isArray(data[0])) return "";
  return (data[0] as unknown[][])
    .map((item) => (Array.isArray(item) && item ? String(item[0] ?? "") : ""))
    .join("");
}

async function fetchSingleFromGoogle(text: string, targetLang: string): Promise<string> {
  const clients = ["dict-chrome-ex", "gtx"];
  for (const client of clients) {
    try {
      const params = new URLSearchParams({
        client,
        sl: "en",
        tl: targetLang,
        dt: "t",
        q: text,
      });
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const translated = extractTranslation(data);
      if (translated && translated.trim()) return translated.trim();
    } catch {
      // try next client
    }
  }

  // Tertiary fallback: MyMemory API
  try {
    const u = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(u, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (res.ok) {
      const data = (await res.json()) as { responseData?: { translatedText?: string } };
      const val = data.responseData?.translatedText;
      if (val && !val.includes("MYMEMORY WARNING")) return val.trim();
    }
  } catch {
    // Ignore fallback errors
  }

  return "";
}

async function translateBatch(
  batch: string[],
  targetLang: string,
): Promise<Map<string, string>> {
  const batchResult = new Map<string, string>();
  if (!batch.length) return batchResult;

  // Single string batch: direct fetch
  if (batch.length === 1) {
    const single = batch[0];
    const trans = await fetchSingleFromGoogle(single, targetLang);
    if (trans) batchResult.set(single, trans);
    return batchResult;
  }

  // Multi-string batch: join by newline \n for single HTTP request
  const joined = batch.join("\n");
  let batchSuccess = false;

  try {
    const params = new URLSearchParams({
      client: "dict-chrome-ex",
      sl: "en",
      tl: targetLang,
      dt: "t",
      q: joined,
    });
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (res.ok) {
      const data = await res.json();
      const raw = extractTranslation(data);
      const splitLines = raw.split("\n");

      if (splitLines.length === batch.length) {
        batch.forEach((orig, idx) => {
          const trans = splitLines[idx]?.trim();
          if (trans) {
            batchResult.set(orig, trans);
          }
        });
        batchSuccess = true;
      }
    }
  } catch {
    // Batch request failed or timed out; will fall back to individual parallel fetches
  }

  // If newline batch failed or line counts mismatched, fallback to parallel individual items
  if (!batchSuccess) {
    const individual = await Promise.all(
      batch.map(async (text) => {
        const trans = await fetchSingleFromGoogle(text, targetLang);
        return { text, trans };
      }),
    );
    for (const item of individual) {
      if (item.trans) batchResult.set(item.text, item.trans);
    }
  }

  return batchResult;
}

export async function requestTranslations(
  texts: string[],
  targetLang: string,
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  if (!texts.length || targetLang === "en") return result;

  const uncached: string[] = [];

  // Check server cache first
  for (const text of texts) {
    if (!text || !text.trim()) continue;
    const cleanText = text.trim();
    const cacheKey = `${targetLang}:${cleanText}`;
    if (serverCache.has(cacheKey)) {
      result.set(text, serverCache.get(cacheKey)!);
    } else {
      uncached.push(cleanText);
    }
  }

  if (!uncached.length) return result;

  // Split uncached into batches of BATCH_SIZE
  const chunks: string[][] = [];
  for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
    chunks.push(uncached.slice(i, i + BATCH_SIZE));
  }

  // Execute all batches in parallel
  const chunkResults = await Promise.all(
    chunks.map((chunk) => translateBatch(chunk, targetLang)),
  );

  // Merge results and populate server cache
  for (const map of chunkResults) {
    map.forEach((val, key) => {
      if (val) {
        result.set(key, val);
        serverCache.set(`${targetLang}:${key}`, val);
      }
    });
  }

  return result;
}
