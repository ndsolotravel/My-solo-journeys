import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, w as adminGetPublicMessage, x as adminUpdatePublicMessage, D as DEFAULT_PUBLIC_POPUP_MESSAGE } from "./router-BiNT3Fbu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { d as Megaphone, al as Power, b as Sparkles, am as RotateCcw, v as Calendar, p as Clock, o as CircleCheck, a8 as Eye, g as LoaderCircle, ah as Save, aj as ShieldCheck, X, e as MessageSquareCode, f as ArrowRight } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./admin.functions-CnC9mk6Y.mjs";
import "./auth-middleware-BO6ULLpK.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "./client-BaIz-VBI.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function toDateTimeLocal(isoString) {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
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
function computeStatus(isEnabled, startIso, endIso) {
  if (!isEnabled) {
    return {
      label: "Disabled",
      badgeClass: "bg-muted text-muted-foreground border-border",
      dotColor: "bg-muted-foreground",
      description: "Popup is switched OFF and will not display to any website visitor."
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
      description: "Please provide valid start and end dates."
    };
  }
  if (now < start) {
    return {
      label: "Scheduled",
      badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-500",
      description: `Scheduled to automatically activate on ${new Date(startIso).toLocaleString()}.`
    };
  }
  if (now > end) {
    return {
      label: "Expired",
      badgeClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
      dotColor: "bg-rose-500",
      description: `Expired on ${new Date(endIso).toLocaleString()}. Extend the End Date & Time to re-activate.`
    };
  }
  return {
    label: "Active",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-xs",
    dotColor: "bg-emerald-500 animate-pulse",
    description: "Currently LIVE on the website for visitors within the configured time window."
  };
}
function AdminPublicMessagePage() {
  const getFn = useServerFn(adminGetPublicMessage);
  const updateFn = useServerFn(adminUpdatePublicMessage);
  const qc = useQueryClient();
  const {
    data: config,
    isLoading
  } = useQuery({
    queryKey: ["admin-public-message"],
    queryFn: () => getFn()
  });
  const [title, setTitle] = reactExports.useState("Site Notice & Feedback");
  const [message, setMessage] = reactExports.useState(DEFAULT_PUBLIC_POPUP_MESSAGE.message);
  const [isEnabled, setIsEnabled] = reactExports.useState(true);
  const [startAt, setStartAt] = reactExports.useState("");
  const [endAt, setEndAt] = reactExports.useState("");
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [showPreviewModal, setShowPreviewModal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (config) {
      setTitle(config.title || "Site Notice & Feedback");
      setMessage(config.message || DEFAULT_PUBLIC_POPUP_MESSAGE.message);
      setIsEnabled(Boolean(config.enabled ?? config.is_enabled));
      setStartAt(toDateTimeLocal(config.start_at || (/* @__PURE__ */ new Date()).toISOString()));
      setEndAt(toDateTimeLocal(config.end_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()));
      setIsDirty(false);
    }
  }, [config]);
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      return await updateFn({
        data: {
          title: payload.title.trim(),
          message: payload.message.trim(),
          enabled: payload.enabled,
          is_enabled: payload.enabled,
          start_at: new Date(payload.start_at).toISOString(),
          end_at: new Date(payload.end_at).toISOString()
        }
      });
    },
    onSuccess: (updated) => {
      qc.invalidateQueries({
        queryKey: ["admin-public-message"]
      });
      qc.invalidateQueries({
        queryKey: ["active-public-message"]
      });
      setIsDirty(false);
      const isNowEnabled = Boolean(updated.enabled ?? updated.is_enabled);
      toast.success(isNowEnabled ? "Public message configuration saved and live!" : "Configuration saved successfully (Public message is Disabled).");
    },
    onError: (err) => {
      toast.error(`Failed to save public message: ${err.message}`);
    }
  });
  const handleSubmit = (e) => {
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
      end_at: endAt
    });
  };
  const activateNowDays = (days) => {
    const now = /* @__PURE__ */ new Date();
    const end = new Date(Date.now() + days * 24 * 60 * 60 * 1e3);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4" }),
        " Announcements & Notices"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Public Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Configure and manage the public announcement popup modal displayed to website visitors." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${status.badgeClass}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${status.dotColor}` }),
          "Status: ",
          status.label
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5 text-accent" }),
              " Public Message Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Controls the visitor announcement popup, schedule window, and display content." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-3 w-3" }),
            " Master Control"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/80 bg-muted/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 pr-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "enable-toggle", className: "text-sm font-semibold text-foreground flex items-center gap-2 cursor-pointer", children: [
              "Enable Public Message",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${isEnabled ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`, children: isEnabled ? "ON" : "OFF" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "ON means the public popup feature is enabled. OFF means the public popup is completely disabled." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", id: "enable-toggle", role: "switch", "aria-checked": isEnabled, onClick: () => {
            setIsEnabled(!isEnabled);
            setIsDirty(true);
          }, className: `relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${isEnabled ? "bg-emerald-500" : "bg-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isEnabled ? "translate-x-5" : "translate-x-0"}` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 flex flex-wrap items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground mr-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }),
            " Quick Presets:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => activateNowDays(30), className: "rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer", children: "Activate for 30 Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => activateNowDays(7), className: "rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer", children: "Activate for 7 Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: turnOffImmediately, className: "rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition cursor-pointer", children: "Turn OFF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: resetDefaultMessage, className: "rounded-lg border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted transition cursor-pointer ml-auto flex items-center gap-1 text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
            " Reset to Default"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "popup-message", className: "block text-sm font-semibold text-foreground", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
              message.length,
              " characters"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "popup-message", rows: 5, required: true, value: message, onChange: (e) => {
            setMessage(e.target.value);
            setIsDirty(true);
          }, disabled: isLoading, placeholder: "Enter the announcement message displayed to site visitors...", className: "w-full rounded-xl border border-border bg-background p-3.5 text-sm font-normal leading-relaxed outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors resize-y" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This exact text will be displayed in the modal to website visitors." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "popup-title", className: "block text-sm font-semibold text-foreground", children: "Popup Heading / Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "popup-title", type: "text", required: true, maxLength: 80, value: title, onChange: (e) => {
            setTitle(e.target.value);
            setIsDirty(true);
          }, disabled: isLoading, placeholder: "e.g. Site Notice & Feedback", className: "w-full rounded-xl border border-border bg-background py-2.5 px-3.5 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "start-at", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-accent" }),
              " Start Date & Time"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "start-at", type: "datetime-local", required: true, value: startAt, onChange: (e) => {
              setStartAt(e.target.value);
              setIsDirty(true);
            }, disabled: isLoading, className: "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "The message becomes eligible for display when the server time reaches this value." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "end-at", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-accent" }),
              " End Date & Time"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "end-at", type: "datetime-local", required: true, value: endAt, onChange: (e) => {
              setEndAt(e.target.value);
              setIsDirty(true);
            }, disabled: isLoading, className: "w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-medium outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "The message automatically stops displaying after this time passes." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/60 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: isDirty ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500 font-medium", children: "● Unsaved changes pending" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-500 font-medium flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            " All settings synchronized"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowPreviewModal(true), className: "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 text-accent" }),
              " Preview"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saveMutation.isPending || isLoading, className: "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition disabled:opacity-50 cursor-pointer", children: saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              " Saving Changes…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              " Save Changes"
            ] }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4 text-accent" }),
              " Status"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${status.badgeClass}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${status.dotColor}` }),
              status.label
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: status.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Feature Enabled:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: isEnabled ? "Yes" : "No" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start Time:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground", children: startAt ? new Date(startAt).toLocaleDateString() : "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "End Time:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground", children: endAt ? new Date(endAt).toLocaleDateString() : "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 text-accent" }),
              " Live Card Preview"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPreviewModal(true), className: "text-xs font-semibold text-accent hover:underline cursor-pointer", children: "Open Fullscreen" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/80 bg-background shadow-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-accent rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-sm font-bold text-foreground line-clamp-1", children: title.trim() || "Site Notice & Feedback" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground line-clamp-4 whitespace-pre-wrap", children: message.trim() || "Your announcement message will appear here..." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2 border-t border-border/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-lg border border-border px-2.5 py-1 text-[10px] font-medium text-foreground bg-muted/40", children: "Suggest Changes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-lg bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground", children: "Got It" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-accent" }),
            " Security & Architecture"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Server Time Clock:" }),
                " Time bounds are checked on the server, avoiding visitor clock tampering."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Single Configuration:" }),
                " Updates the existing configuration without duplicate rows."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "RLS Gated:" }),
                " Only authenticated administrators can edit settings."
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPreviewModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "dialog", "aria-modal": "true", className: "fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, onClick: () => setShowPreviewModal(false), className: "absolute inset-0 bg-black/70 backdrop-blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.92,
        y: 20
      }, animate: {
        opacity: 1,
        scale: 1,
        y: 0
      }, exit: {
        opacity: 0,
        scale: 0.92,
        y: 20
      }, transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      }, onClick: (e) => e.stopPropagation(), className: "relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-background p-6 shadow-2xl backdrop-blur-md sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent/70 to-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPreviewModal(false), className: "absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer", "aria-label": "Close preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareCode, { className: "h-3 w-3" }),
              " Preview Mode"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl", children: title.trim() || "Site Notice & Feedback" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90 sm:text-base whitespace-pre-line font-normal", children: message.trim() || "Your message will appear here..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowPreviewModal(false), className: "inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer", children: [
            "Suggest UI/UX / Report Error",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPreviewModal(false), className: "inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:opacity-90 transition cursor-pointer", children: "Got It" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminPublicMessagePage as component
};
