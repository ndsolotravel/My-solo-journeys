import { useState, useEffect, useCallback } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useTranslations } from "@/lib/translate/store";
import {
  getCookieConsent,
  isConsentDismissedThisSession,
  acceptCookies,
  rejectCookies,
  dismissCookieForSession,
} from "@/lib/cookie-consent";

export function CookieConsentPopup() {
  const t = useTranslations();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");

  const [isOpen, setIsOpen] = useState(false);

  // Check consent status on mount
  useEffect(() => {
    if (typeof window === "undefined" || isAdminRoute) {
      setIsOpen(false);
      return;
    }

    const existingConsent = getCookieConsent();
    const isDismissed = isConsentDismissedThisSession();

    // Only show if the user has neither accepted/rejected persistently nor dismissed for this session
    if (!existingConsent && !isDismissed) {
      // Subtle delay so primary content loads smoothly first without impacting Core Web Vitals
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isAdminRoute]);

  // Support reopening the popup on-demand (e.g. from footer "Cookie Preferences" link)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("open_cookie_consent", handleOpen);
    return () => window.removeEventListener("open_cookie_consent", handleOpen);
  }, []);

  const handleAccept = useCallback(() => {
    acceptCookies();
    setIsOpen(false);
  }, []);

  const handleReject = useCallback(() => {
    rejectCookies();
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    dismissCookieForSession();
    setIsOpen(false);
  }, []);

  // Keyboard accessibility: Close for current session on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <aside
          role="region"
          aria-label={t("Cookie consent")}
          aria-describedby="cookie-consent-description"
          className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-xl md:max-w-2xl z-[95] pb-[max(0.25rem,env(safe-area-inset-bottom))]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-colors"
          >
            {/* Top signature brand accent ribbon */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-amber-500 to-brand/40" />

            {/* Quick close 'X' button (dismisses for session) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={t("Close cookie consent for this session")}
              title={t("Close without saving preference (dismiss for session)")}
              className="absolute right-3.5 top-3.5 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header & Description */}
            <div className="flex items-start gap-3 sm:gap-3.5 pr-8">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-xs dark:bg-brand/15">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-foreground">
                  {t("We value your privacy")}
                </h3>
                <p
                  id="cookie-consent-description"
                  className="text-xs sm:text-sm leading-relaxed text-muted-foreground"
                >
                  {t(
                    "We use cookies to improve user experience, website functionality, analytics, and performance. You can accept all cookies, reject non-essential cookies, or close this notice to decide later."
                  )}{" "}
                  <Link
                    to="/privacy-policy"
                    className="inline-block text-brand font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                  >
                    {t("Privacy Policy")}
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions Bar: Accept, Reject, Close */}
            <div className="mt-4 flex flex-wrap items-center justify-between sm:justify-end gap-2 pt-2 border-t border-border/50">
              <button
                type="button"
                onClick={handleClose}
                title={t("Close without choosing (dismiss for this session)")}
                className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
              >
                {t("Close")}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReject}
                  title={t("Reject non-essential cookies and remember choice")}
                  className="rounded-full border border-border bg-background hover:bg-muted text-foreground px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer shadow-xs"
                >
                  {t("Reject")}
                </button>

                <button
                  type="button"
                  onClick={handleAccept}
                  title={t("Accept all cookies and remember choice")}
                  className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 px-4.5 py-1.5 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer shadow-sm hover:shadow"
                >
                  {t("Accept")}
                </button>
              </div>
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
