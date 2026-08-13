/**
 * Server-side request handler for online translation fallback via Google Translate (gtx).
 * Runs inside a TanStack Start server function so the browser never hits gtx directly
 * (avoids CORS), with a small inter-chunk delay and a secondary endpoint fallback to
 * work around aggressive rate limiting (429/403).
 */

const GTX_URLS = [
  "https://translate.googleapis.com/translate_a/single",
  "https://translate.google.com/translate_a/t?client=webapp",
];

function extractTranslation(data: unknown): string {
  if (!Array.isArray(data) || !Array.isArray(data[0])) return "";
  return (data[0] as unknown[][])
    .map((item) => (Array.isArray(item) && item ? String(item[0] ?? "") : ""))
    .join("");
}

const FETCH_TIMEOUT_MS = 8000;

async function fetchTranslation(text: string, targetLang: string): Promise<string> {
  for (const url of GTX_URLS) {
    try {
      const params = new URLSearchParams({
        client: url.includes("webapp") ? "webapp" : "gtx",
        sl: "en",
        tl: targetLang,
        dt: "t",
        q: text,
      });
      const endpoint = new URL(url);
      endpoint.search = params.toString();

      const res = await fetch(endpoint.toString(), {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const translated = extractTranslation(data);
      if (translated) return translated;
    } catch {
      // try next endpoint
    }
  }
  return "";
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestTranslations(
  texts: string[],
  targetLang: string,
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  if (!texts.length || targetLang === "en") return result;

  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const translated = await Promise.all(
      chunk.map(async (text) => {
        if (!text || !text.trim()) return null;
        const value = await fetchTranslation(text.trim(), targetLang);
        return { text, value };
      }),
    );
    for (const entry of translated) {
      if (entry?.value) result.set(entry.text, entry.value);
    }
    if (i + chunkSize < texts.length) await delay(120);
  }

  return result;
}
