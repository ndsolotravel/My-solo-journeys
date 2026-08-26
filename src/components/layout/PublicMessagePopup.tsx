import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, ArrowRight, MessageSquareCode } from "lucide-react";
import { getActivePublicMessage } from "@/lib/public-message.functions";

export function PublicMessagePopup() {
  const getActiveFn = useServerFn(getActivePublicMessage);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Only query on public visitor pages (skip if actively in the admin CMS to avoid interference while managing)
  const isAdminRoute = pathname.startsWith("/admin");

  const { data: messageData } = useQuery({
    queryKey: ["active-public-message"],
    queryFn: () => getActiveFn(),
    staleTime: 1000 * 60 * 3, // 3 minutes cache
    enabled: !isAdminRoute,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !messageData || isAdminRoute) {
      setIsOpen(false);
      return;
    }

    // Dismissal key incorporating message id and updated_at timestamp.
    // If admin changes the message or time in the CMS, the key changes and visitors see the updated notice.
    const storageKey = `ndsolo_popup_dismissed_${messageData.id}_${messageData.updated_at || messageData.message.slice(0, 20)}`;

    try {
      const alreadyDismissed = sessionStorage.getItem(storageKey);
      if (alreadyDismissed === "1") {
        setIsOpen(false);
        return;
      }
    } catch {
      // ignore storage access restrictions
    }

    // Natural brief entrance delay so page content renders smoothly first
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [messageData, isAdminRoute]);

  const handleClose = useCallback(() => {
    if (messageData) {
      const storageKey = `ndsolo_popup_dismissed_${messageData.id}_${messageData.updated_at || messageData.message.slice(0, 20)}`;
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // ignore
      }
    }
    setIsOpen(false);
  }, [messageData]);

  // Keyboard accessibility: Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!messageData || isAdminRoute) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="public-message-title"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-md sm:p-8"
          >
            {/* Top Accent Gradient Ribbon */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent/70 to-accent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close message"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content Header */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-xs">
                <Megaphone className="h-5 w-5" />
              </div>
              <div className="space-y-1 pr-6">
                <div className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent uppercase tracking-wider">
                  <MessageSquareCode className="h-3 w-3" /> Site Notice & Feedback
                </div>
                <h3
                  id="public-message-title"
                  className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {messageData.title || "Welcome to ndsolotravel"}
                </h3>
              </div>
            </div>

            {/* Message Body */}
            <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-foreground/90 sm:text-base whitespace-pre-line font-normal">
                {messageData.message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <Link
                to="/contact"
                search={{ subject: "UI/UX Feedback & Error Report" }}
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
              >
                Suggest UI/UX / Report Error
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
