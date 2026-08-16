import { useEffect, useRef, useState } from "react";
import { Globe, Loader2, AlertCircle } from "lucide-react";
import { LANGUAGES, useLanguage, useSetLanguage } from "@/lib/translate/store";

export function LanguageSelector({ className }: { className?: string }) {
  const { lang, error, activeRequests } = useLanguage();
  const setLang = useSetLanguage();
  const translating = activeRequests > 0;
  const [dismissedError, setDismissedError] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setDismissedError(true), 8000);
    return () => clearTimeout(t);
  }, [error]);

  const handleChange = (value: string) => {
    setDismissedError(false);
    setMenuOpen(false);
    setLang(value);
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div
      className={`relative flex items-center notranslate ${className ?? ""}`}
      translate="no"
      ref={menuRef}
    >
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={`Language: ${current.nativeName}`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-transparent px-3 text-xs font-medium text-white hover:bg-muted/60 transition-colors"
      >
        <Globe className="h-3.5 w-3.5 text-white" />
        <span className="text-white">{current.nativeName}</span>
      </button>
      {menuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 w-52 overflow-hidden rounded-xl border border-border bg-background shadow-xl rtl:right-auto rtl:left-0"
        >
          <div className="border-b border-border px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Language / زبان / 语言
          </div>
          <ul className="py-1 max-h-80 overflow-y-auto">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  role="menuitemradio"
                  aria-checked={l.code === lang}
                  onClick={() => handleChange(l.code)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted ${
                    l.code === lang ? "text-accent font-medium bg-muted/40" : "text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.nativeName}</span>
                    {l.nativeName !== l.label && (
                      <span className="text-xs text-muted-foreground">({l.label})</span>
                    )}
                  </span>
                  {l.code === lang && <span className="h-2 w-2 rounded-full bg-accent" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {translating && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur"
        >
          <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden="true" />
          <span>Translating…</span>
        </div>
      )}

      {error && !dismissedError && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed left-1/2 top-4 z-[9999] -translate-x-1/2 flex items-center gap-2 rounded-full border border-destructive/30 bg-background/95 px-4 py-2 text-xs font-medium text-destructive shadow-lg backdrop-blur"
        >
          <AlertCircle className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
