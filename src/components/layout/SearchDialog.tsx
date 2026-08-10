import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, FileText, MapPin, Loader2 } from "lucide-react";
import { searchSite, type SearchResult } from "@/lib/search.functions";
import { useTranslator } from "@/lib/translate/store";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const staticTexts = useMemo(
    () => [
      "Search stories, trails and destinations",
      "Search",
      "Close search",
      "Search across articles, destinations, categories and tags.",
      `No matches for "${q}".`,
    ],
    [q],
  );
  const t = useTranslator(staticTexts);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else {
      setQ("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchSite({ data: { q: q.trim(), limit: 8 } });
        setResults(res.results);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);

  const resultTitles = results.map((r) => r.title);
  const rt = useTranslator(resultTitles);

  if (!open) return null;

  const go = (r: SearchResult) => {
    onClose();
    if (r.kind === "post") navigate({ to: "/blog/$slug", params: { slug: r.slug } });
    else navigate({ to: "/destinations/$slug", params: { slug: r.slug } });
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-20 sm:pt-32"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("Search")}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search stories, trails and destinations")}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <button
            onClick={onClose}
            aria-label={t("Close search")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {q.trim() && !loading && results.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t(`No matches for "${q}".`)}
            </p>
          )}
          {!q.trim() && (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t("Search across articles, destinations, categories and tags.")}
            </p>
          )}
          {results.length > 0 && (
            <ul className="py-2">
              {results.map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <button
                    onClick={() => go(r)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted transition-colors"
                  >
                    {r.kind === "post" ? (
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{rt(r.title)}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.kind === "post"
                          ? rt(r.category) + (r.excerpt ? ` · ${rt(r.excerpt)}` : "")
                          : `${rt(r.country)}${r.region ? ` · ${rt(r.region)}` : ""}`}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
