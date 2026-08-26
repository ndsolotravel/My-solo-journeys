import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Save,
  Loader2,
  Calendar,
  Clock,
  Eye,
  Power,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowRight,
  MessageSquareCode,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminGetPublicMessage,
  adminUpdatePublicMessage,
  DEFAULT_PUBLIC_POPUP_MESSAGE,
  type PublicPopupMessage,
} from "@/lib/public-message.functions";

export const Route = createFileRoute("/_authenticated/admin/public-message")({
  head: () => ({
    meta: [
      { title: "Public Message — Admin CMS" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPublicMessagePage,
});

/**
 * Format Date to HTML datetime-local input string: YYYY-MM-DDTHH:mm
 */
function toDateTimeLocal(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return "";
  }
}

/**
 * Compute the live operational status of the message
 */
function computeStatus(
  isEnabled: boolean,
  startIso: string,
  endIso: string,
): {
  label: "Disabled" | "Scheduled" | "Active" | "Expired";
  badgeClass: string;
  dotColor: string;
  description: string;
} {
  if (!isEnabled) {
    return {
      label: "Disabled",
      badgeClass: "bg-muted text-muted-foreground border-border",
      dotColor: "bg-muted-foreground",
      description: "Popup is switched OFF and will not display to any website visitor.",
    };
  }

  const now = Date.now();
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();

  if (isNaN(start) || isNaN(end)) {
    return {
      label: "Disabled",
      badgeClass: "bg-muted text-muted-foreground border-border",
      dotColor: "bg-muted-foreground",
      description: "Please provide valid start and end dates.",
    };
  }

  if (now < start) {
    return {
      label: "Scheduled",
      badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-500",
      description: `Scheduled to automatically activate on ${new Date(startIso).toLocaleString()}.`,
    };
  }

  if (now > end) {
    return {
      label: "Expired",
      badgeClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
      dotColor: "bg-rose-500",
      description: `Expired on ${new Date(endIso).toLocaleString()}. Extend the End Date & Time to re-activate.`,
    };
  }

  return {
    label: "Active",
    badgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-xs",
    dotColor: "bg-emerald-500 animate-pulse",
    description: "Currently LIVE on the website for visitors within the configured time window.",
  };
}

function AdminPublicMessagePage() {
  const getFn = useServerFn(adminGetPublicMessage);
  const updateFn = useServerFn(adminUpdatePublicMessage);
  const qc = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["admin-public-message"],
    queryFn: () => getFn(),
  });

  const [title, setTitle] = useState("Site Notice & Feedback");
  const [message, setMessage] = useState(DEFAULT_PUBLIC_POPUP_MESSAGE.message);
  const [isEnabled, setIsEnabled] = useState(true);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (config) {
      setTitle(config.title || "Site Notice & Feedback");
      setMessage(config.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message);
      setIsEnabled(Boolean(config.enabled ?? config.is_enabled));
      setStartAt(toDateTimeLocal(config.start_at || new Date().toISOString()));
      setEndAt(
        toDateTimeLocal(
          config.end_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        ),
      );
      setIsDirty(false);
    }
  }, [config]);

  const saveMutation = useMutation({
    mutationFn: async (payload: {
      title: string;
      message: string;
      enabled: boolean;
      start_at: string;
      end_at: string;
    }) => {
      return await updateFn({
        data: {
          title: payload.title.trim(),
          message: payload.message.trim(),
          enabled: payload.enabled,
          is_enabled: payload.enabled,
          start_at: new Date(payload.start_at).toISOString(),
          end_at: new Date(payload.end_at).toISOString(),
        },
      });
    },
    onSuccess: (updated: PublicPopupMessage) => {
      qc.invalidateQueries({ queryKey: ["admin-public-message"] });
      qc.invalidateQueries({ queryKey: ["active-public-message"] });
      setIsDirty(false);
      const isNowEnabled = Boolean(updated.enabled ?? updated.is_enabled);
      toast.success(
        isNowEnabled
          ? "Public message configuration saved and live!"
          : "Configuration saved successfully (Public message is Disabled).",
      );
    },
    onError: (err: Error) => {
      toast.error(`Failed to save public message: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Message text cannot be empty.");
    if (!startAt) return toast.error("Please select a Start Date & Time.");
    if (!endAt) return toast.error("Please select an End Date & Time.");

    const startMs = new Date(startAt).getTime();
    const endMs = new Date(endAt).getTime();
    if (endMs <= startMs) {
      return toast.error("End Date & Time must be after the Start Date & Time.");
    }

    saveMutation.mutate({
      title,
      message,
      enabled: isEnabled,
      start_at: startAt,
      end_at: endAt,
    });
  };

  // Quick Presets
  const activateNowDays = (days: number) => {
    const now = new Date();
    const end = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setIsEnabled(true);
    setStartAt(toDateTimeLocal(now.toISOString()));
    setEndAt(toDateTimeLocal(end.toISOString()));
    setIsDirty(true);
    toast.info(`Set to Active for ${days} days starting now. Click "Save Changes" to apply.`);
  };

  const turnOffImmediately = () => {
    setIsEnabled(false);
    setIsDirty(true);
    toast.info("Toggled OFF. Click 'Save Changes' to update the website.");
  };

  const resetDefaultMessage = () => {
    setTitle("Site Notice & Feedback");
    setMessage(DEFAULT_PUBLIC_POPUP_MESSAGE.message);
    setIsDirty(true);
    toast.info("Message restored to default testing notice.");
  };

  const status = computeStatus(isEnabled, startAt, endAt);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <Megaphone className="h-4 w-4" /> Announcements & Notices
        </div>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Public Message</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Configure and manage the public announcement popup modal displayed to website
              visitors.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${status.badgeClass}`}
            >
              <span className={`h-2 w-2 rounded-full ${status.dotColor}`} />
              Status: {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Management Controls */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-5">
              <div>
                <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-accent" /> Public Message Settings
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Controls the visitor announcement popup, schedule window, and display content.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                <Power className="h-3 w-3" /> Master Control
              </span>
            </div>

            {/* Field 1: Enable Public Message Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/20 p-4">
              <div className="space-y-0.5 pr-4">
                <label
                  htmlFor="enable-toggle"
                  className="text-sm font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                >
                  Enable Public Message
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${
                      isEnabled
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isEnabled ? "ON" : "OFF"}
                  </span>
                </label>
                <p className="text-xs text-muted-foreground">
                  ON means the public popup feature is enabled. OFF means the public popup is
                  completely disabled.
                </p>
              </div>

              <button
                type="button"
                id="enable-toggle"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => {
                  setIsEnabled(!isEnabled);
                  setIsDirty(true);
                }}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  isEnabled ? "bg-emerald-500" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Quick Action Presets */}
            <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-foreground mr-1 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Quick Presets:
              </span>
              <button
                type="button"
                onClick={() => activateNowDays(30)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer"
              >
                Activate for 30 Days
              </button>
              <button
                type="button"
                onClick={() => activateNowDays(7)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer"
              >
                Activate for 7 Days
              </button>
              <button
                type="button"
                onClick={turnOffImmediately}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
              >
                Turn OFF
              </button>
              <button
                type="button"
                onClick={resetDefaultMessage}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer ml-auto flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Reset to Default
              </button>
            </div>

            {/* Field 2: Message Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="popup-message"
                  className="block text-sm font-semibold text-foreground"
                >
                  Message
                </label>
                <span className="text-xs text-muted-foreground font-mono">
                  {message.length} characters
                </span>
              </div>
              <textarea
                id="popup-message"
                rows={5}
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setIsDirty(true);
                }}
                disabled={isLoading}
                placeholder="Enter the announcement message displayed to site visitors..."
                className="w-full rounded-xl border border-border bg-background p-3.5 text-sm font-normal leading-relaxed outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors resize-y"
              />
              <p className="text-xs text-muted-foreground">
                This exact text will be displayed in the modal to website visitors.
              </p>
            </div>

            {/* Optional Title Field */}
            <div className="space-y-2">
              <label htmlFor="popup-title" className="block text-sm font-semibold text-foreground">
                Popup Heading / Title
              </label>
              <input
                id="popup-title"
                type="text"
                required
                maxLength={80}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                disabled={isLoading}
                placeholder="e.g. Site Notice & Feedback"
                className="w-full rounded-xl border border-border bg-background py-2.5 px-3.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
              />
            </div>

            {/* Fields 3 & 4: Start Date & Time and End Date & Time */}
            <div className="grid gap-4 sm:grid-cols-2 pt-1">
              <div className="space-y-2">
                <label
                  htmlFor="start-at"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                >
                  <Calendar className="h-3.5 w-3.5 text-accent" /> Start Date & Time
                </label>
                <input
                  id="start-at"
                  type="datetime-local"
                  required
                  value={startAt}
                  onChange={(e) => {
                    setStartAt(e.target.value);
                    setIsDirty(true);
                  }}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
                />
                <p className="text-[11px] text-muted-foreground">
                  The message becomes eligible for display when the server time reaches this value.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="end-at"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                >
                  <Clock className="h-3.5 w-3.5 text-accent" /> End Date & Time
                </label>
                <input
                  id="end-at"
                  type="datetime-local"
                  required
                  value={endAt}
                  onChange={(e) => {
                    setEndAt(e.target.value);
                    setIsDirty(true);
                  }}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
                />
                <p className="text-[11px] text-muted-foreground">
                  The message automatically stops displaying after this time passes.
                </p>
              </div>
            </div>

            {/* Action Buttons: Save Changes & Preview */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/60 pt-5">
              <span className="text-xs text-muted-foreground">
                {isDirty ? (
                  <span className="text-amber-500 font-medium">● Unsaved changes pending</span>
                ) : (
                  <span className="text-emerald-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> All settings synchronized
                  </span>
                )}
              </span>

              <div className="flex items-center gap-2.5">
                {/* Preview Button */}
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                >
                  <Eye className="h-4 w-4 text-accent" /> Preview
                </button>

                {/* Save Changes Button */}
                <button
                  type="submit"
                  disabled={saveMutation.isPending || isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving Changes…
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Sidebar: Status & Live Preview Card */}
        <aside className="space-y-6">
          {/* Card: Status */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                <Power className="h-4 w-4 text-accent" /> Status
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${status.badgeClass}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                {status.label}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{status.description}</p>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Feature Enabled:</span>
                <span className="font-semibold text-foreground">{isEnabled ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Start Time:</span>
                <span className="font-mono text-[11px] text-foreground">
                  {startAt ? new Date(startAt).toLocaleDateString() : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>End Time:</span>
                <span className="font-mono text-[11px] text-foreground">
                  {endAt ? new Date(endAt).toLocaleDateString() : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Card: Live Simulation */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                <Eye className="h-4 w-4 text-accent" /> Live Card Preview
              </h3>
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Open Fullscreen
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background shadow-xl p-4 space-y-3">
              <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-accent rounded-full" />
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Megaphone className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-display text-sm font-bold text-foreground line-clamp-1">
                    {title.trim() || "Site Notice & Feedback"}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4 whitespace-pre-wrap">
                    {message.trim() || "Your announcement message will appear here..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                <span className="rounded-lg border border-border px-2.5 py-1 text-[10px] font-medium text-foreground bg-muted/40">
                  Suggest Changes
                </span>
                <span className="rounded-lg bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground">
                  Got It
                </span>
              </div>
            </div>
          </div>

          {/* Security & Rules Card */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3 text-xs text-muted-foreground">
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Security & Architecture
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Server Time Clock:</strong> Time bounds are checked on the server,
                  avoiding visitor clock tampering.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Single Configuration:</strong> Updates the existing configuration without
                  duplicate rows.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>RLS Gated:</strong> Only authenticated administrators can edit settings.
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Interactive Modal Preview */}
      <AnimatePresence>
        {showPreviewModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviewModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-background p-6 shadow-2xl backdrop-blur-md sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent/70 to-accent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-xs">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="space-y-1 pr-6">
                  <div className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent uppercase tracking-wider">
                    <MessageSquareCode className="h-3 w-3" /> Preview Mode
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {title.trim() || "Site Notice & Feedback"}
                  </h3>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base whitespace-pre-line font-normal">
                  {message.trim() || "Your message will appear here..."}
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                >
                  Suggest UI/UX / Report Error
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
