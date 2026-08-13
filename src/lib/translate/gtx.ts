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

  // Process in parallel chunks with POST requests for large payload support
  const chunkSize = 5;
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (text) => {
        if (!text || !text.trim()) return;
        try {
          const bodyParams = new URLSearchParams({
            client: "gtx",
            sl: "en",
            tl: targetLang,
            dt: "t",
            q: text,
          });

          const res = await fetch(GTX_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: bodyParams.toString(),
          });

          if (!res.ok) {
            // Fallback to GET if POST receives unexpected non-200
            const url = new URL(GTX_URL);
            url.searchParams.set("client", "gtx");
            url.searchParams.set("sl", "en");
            url.searchParams.set("tl", targetLang);
            url.searchParams.set("dt", "t");
            url.searchParams.set("q", text);
            const getRes = await fetch(url.toString());
            if (!getRes.ok) return;
            const data = await getRes.json();
            if (Array.isArray(data) && Array.isArray(data[0])) {
              const translated = data[0]
                .map((item: unknown) => (Array.isArray(item) && item ? item[0] : ""))
                .join("");
              if (translated) result.set(text, translated);
            }
            return;
          }

          const data = await res.json();
          if (Array.isArray(data) && Array.isArray(data[0])) {
            const translated = data[0]
              .map((item: unknown) => (Array.isArray(item) && item ? item[0] : ""))
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
