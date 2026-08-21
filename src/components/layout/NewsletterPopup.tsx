import { useState, useEffect, useCallback, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, Sparkles } from "lucide-react";
import { subscribe } from "@/lib/newsletter.functions";
import { getVisitorSessionId } from "@/hooks/use-page-analytics";
import { useTranslations } from "@/lib/translate/store";

const STORAGE_KEY = "ndsolotravel_newsletter_popup";
const SUPPRESS_HOURS = 168; // 7 days
const TRIGGER_DELAY_MS = 10_000;
const SCROLL_THRESHOLD = 0.5;

function getSuppressedUntil(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const ts = parseInt(raw, 10);
    return isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
}

function suppress() {
  try {
    const until = Date.now() + SUPPRESS_HOURS * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(until));
  } catch {}
}

function isSuppressed(): boolean {
  const until = getSuppressedUntil();
  return until !== null && Date.now() < until;
}

export function NewsletterPopup() {
  const t = useTranslations();
  const subscribeFn = useServerFn(subscribe);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "already" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dismissedThisSession = useRef(false);
  const triggered = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    dismiss();
  }, []);

  const dismiss = useCallback(() => {
    dismissedThisSession.current = true;
    suppress();
  }, []);

  // Smart trigger: after delay OR 50% scroll (whichever first)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSuppressed()) return;

    const show = () => {
      if (triggered.current || dismissedThisSession.current) return;
      triggered.current = true;
      setOpen(true);
    };

    const timer = setTimeout(show, TRIGGER_DELAY_MS);

    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        show();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const sessionId = getVisitorSessionId() ?? "";
      const res = await subscribeFn({ data: { email, sessionId } });
      if (res && (res.created === false || res.alreadySubscribed)) {
        setResult("already");
      } else {
        setResult("success");
      }
      suppress();
    } catch (err: any) {
      let msg = "Could not subscribe. Try again.";
      if (err instanceof Error && err.message) msg = err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Decorative top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-accent" />

            <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
              {result === "success" || result === "already" ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle className="h-12 w-12 text-success" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {result === "success" ? t("Welcome Aboard!") : t("You're Already Subscribed")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {result === "success"
                      ? t("You'll receive solo travel stories, motorcycle adventures, and trekking diaries in your inbox.")
                      : t("You're already on the journey with us. Keep exploring!")}
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition cursor-pointer"
                  >
                    {t("Close")}
                  </button>
                </div>
              ) : (
                <>
                  {/* Icon + heading */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("Join the Journey")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(
                      "Get new solo travel stories, motorcycle adventures, trekking diaries, and travel updates delivered to your inbox."
                    )}
                  </p>

                  {/* Form */}
                  <form onSubmit={onSubmit} className="mt-5 space-y-3">
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        placeholder={t("Enter your email")}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        className="w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent/30"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-destructive">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                          {t("Subscribing...")}
                        </span>
                      ) : (
                        t("Join the Journey")
                      )}
                    </button>
                  </form>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground/60">
                    {t("No spam. Unsubscribe anytime.")}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
