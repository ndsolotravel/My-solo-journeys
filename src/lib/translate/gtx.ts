/**
 * Keyless Google Translate HTTP client (translate.googleapis.com/translate_a/single).
 * No API key, no credentials, no client-side secrets — the endpoint is a public,
 * CORS-enabled machine translation service. Swap this client for a paid/proxied API
 * later without touching UI code (same `requestTranslations` signature).
 */

const ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const TIMEOUT_MS = 20000;
const MAX_LINES_PER_REQUEST = 90;
const MAX_CHARS_PER_REQUEST = 11000;
const MAX_CONCURRENT_REQUESTS = 6;
const MAX_RETRIES = 2;
const NL_MARKER = " __NL__ ";

export class TranslationRequestError extends Error {
  failedTexts: string[];
  constructor(message: string, failedTexts: string[]) {
    super(message);
    this.name = "TranslationRequestError";
    this.failedTexts = failedTexts;
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

/** Translate single text item safely as fallback */
async function fetchSingle(text: string, targetLang: string): Promise<string> {
  if (!text) return "";
  const sanitized = text.replace(/\n/g, NL_MARKER);
  const q = encodeURIComponent(sanitized);
  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;
  try {
    const res = await fetchWithTimeout(url, TIMEOUT_MS);
    if (!res.ok) return text;
    const json: unknown = await res.json();
    const segments = Array.isArray(json) && Array.isArray(json[0]) ? (json[0] as unknown[]) : null;
    if (!segments) return text;
    const out: string[] = [];
    for (const seg of segments) {
      if (Array.isArray(seg) && typeof seg[0] === "string") out.push(seg[0]);
    }
    const translated = out.join("").replace(/\s*__NL__\s*/g, "\n").trim();
    return translated || text;
  } catch {
    return text;
  }
}

/** Translate `lines` in a single request. Returns one string per input line. */
async function fetchChunk(lines: string[], targetLang: string): Promise<string[]> {
  if (lines.length === 1) {
    const res = await fetchSingle(lines[0], targetLang);
    return [res];
  }

  const sanitized = lines.map((l) => l.replace(/\n/g, NL_MARKER));
  const joined = sanitized.join("\n");
  const q = encodeURIComponent(joined);
  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${q}`;
  const res = await fetchWithTimeout(url, TIMEOUT_MS);

  if (res.status === 429 || res.status >= 500) {
    throw new TranslationRequestError(`Translation service busy (${res.status})`, lines);
  }
  if (!res.ok) {
    throw new TranslationRequestError(`Translation request failed (${res.status})`, lines);
  }

  const json: unknown = await res.json();
  const segments = Array.isArray(json) && Array.isArray(json[0]) ? (json[0] as unknown[]) : null;
  if (!segments) {
    throw new TranslationRequestError("Unexpected translation response", lines);
  }

  const out: string[] = [];
  for (const seg of segments) {
    if (Array.isArray(seg) && typeof seg[0] === "string") out.push(seg[0]);
  }

  const body = out.join("");
  const parts = body.split("\n");

  if (parts.length === lines.length) {
    return parts.map((p) => p.replace(/\s*__NL__\s*/g, "\n").replace(/\n+$/, ""));
  }

  // Graceful fallback: If line counts mismatch, fetch lines individually
  return Promise.all(lines.map((l) => fetchSingle(l, targetLang)));
}

function chunkLines(lines: string[]): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let chars = 0;
  for (const line of lines) {
    if (current.length >= MAX_LINES_PER_REQUEST || chars + line.length > MAX_CHARS_PER_REQUEST) {
      chunks.push(current);
      current = [];
      chars = 0;
    }
    current.push(line);
    chars += line.length;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

async function workerPool<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx]);
    }
  });
  await Promise.all(workers);
}

/**
 * Translate an arbitrary list of unique strings. Resolves to a Map<source, translated>.
 */
export async function requestTranslations(
  lines: string[],
  targetLang: string,
  onProgress?: (done: number, total: number) => void,
): Promise<Map<string, string>> {
  const chunks = chunkLines(lines);
  const result = new Map<string, string>();
  const failed: string[] = [];
  let done = 0;

  await workerPool(chunks, MAX_CONCURRENT_REQUESTS, async (chunk) => {
    let lastErr: Error | null = null;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        const delay = Math.min(200 * Math.pow(1.5, attempt - 1), 600);
        await new Promise((r) => setTimeout(r, delay));
      }
      try {
        const translated = await fetchChunk(chunk, targetLang);
        chunk.forEach((line, i) => result.set(line, translated[i]));
        lastErr = null;
        break;
      } catch (e) {
        const err = e instanceof Error ? e : new Error("Translation failed");
        if (err instanceof TranslationRequestError) {
          if (
            err.message.startsWith("Translation service busy") ||
            err.message.startsWith("Translation request failed (5")
          ) {
            lastErr = err;
            continue;
          }
          // Non-retryable error -> try itemized fallback
          try {
            const fallbacks = await Promise.all(chunk.map((l) => fetchSingle(l, targetLang)));
            chunk.forEach((line, i) => result.set(line, fallbacks[i]));
            lastErr = null;
            break;
          } catch {
            failed.push(...chunk);
            lastErr = null;
            break;
          }
        }
        lastErr = err;
      }
    }
    if (lastErr) {
      // Final attempt failed -> fallback item by item
      try {
        const fallbacks = await Promise.all(chunk.map((l) => fetchSingle(l, targetLang)));
        chunk.forEach((line, i) => result.set(line, fallbacks[i]));
      } catch {
        failed.push(...chunk);
      }
    }
    done += chunk.length;
    onProgress?.(done, lines.length);
  });

  if (failed.length) {
    throw new TranslationRequestError(
      `Translation unavailable for ${failed.length} text fragment(s)`,
      failed,
    );
  }
  return result;
}

