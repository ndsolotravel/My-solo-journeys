/**
 * Lightweight client-side request handler for online translation fallback via Google Translate API (gtx).
 */

const GTX_URL = "https://translate.googleapis.com/translate_a/single";

export async function requestTranslations(
  texts: string[],
  targetLang: string,
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  if (!texts.length || targetLang === "en") return result;

  // Process in small parallel chunks to avoid URL limit issues
  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (text) => {
        try {
          const url = new URL(GTX_URL);
          url.searchParams.set("client", "gtx");
          url.searchParams.set("sl", "en");
          url.searchParams.set("tl", targetLang);
          url.searchParams.set("dt", "t");
          url.searchParams.set("q", text);

          const res = await fetch(url.toString());
          if (!res.ok) return;

          const data = await res.json();
          if (Array.isArray(data) && Array.isArray(data[0])) {
            const translated = data[0]
              .map((item: unknown) => (Array.isArray(item) ? item[0] : ""))
              .join("");
            if (translated) {
              result.set(text, translated);
            }
          }
        } catch {
          // Fall back gracefully to original string
        }
      }),
    );
  }

  return result;
}
