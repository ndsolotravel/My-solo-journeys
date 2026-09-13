import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, a1 as adminGetContactSettings, a2 as adminSaveContactSettings } from "./router-Jb-EBDhz.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { H as HeroBannerManager } from "./HeroBannerManager-BtZyqEWw.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { c as Mail, E as ExternalLink, R as RotateCcw, h as LoaderCircle, ax as Save, am as MessageSquare, G as Globe, aY as BellRing, aZ as Settings2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./client-BqBvvzI9.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "./posts.functions-S458rgU7.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-DKXRUyGU.mjs";
import "./admin.functions-MvZQXaGD.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const SETTING_KEYS = ["contact_form_enabled", "contact_title", "contact_description", "contact_name_label", "contact_name_placeholder", "contact_name_required", "contact_email_label", "contact_email_placeholder", "contact_email_required", "contact_subject_label", "contact_subject_placeholder", "contact_subject_required", "contact_message_label", "contact_message_placeholder", "contact_message_required", "contact_submit_button_text", "contact_success_message", "contact_error_message", "contact_notification_email_enabled", "contact_confirmation_email_enabled"];
const DEFAULTS = {
  contact_form_enabled: "true",
  contact_title: "Send a Message",
  contact_description: "Got a destination to discover, a story to share, or an adventure in mind? Whether it's a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
  contact_name_label: "Your Name",
  contact_name_placeholder: "John Doe",
  contact_name_required: "true",
  contact_email_label: "Email Address",
  contact_email_placeholder: "john@example.com",
  contact_email_required: "true",
  contact_subject_label: "Subject",
  contact_subject_placeholder: "Collaboration, query, or trail notes...",
  contact_subject_required: "false",
  contact_message_label: "Your Message",
  contact_message_placeholder: "Write your message here...",
  contact_message_required: "true",
  contact_submit_button_text: "Send Message",
  contact_success_message: "Message sent successfully. I'll reply when I'm back from the trail.",
  contact_error_message: "Your message could not be sent. Please try again.",
  contact_notification_email_enabled: "true",
  contact_confirmation_email_enabled: "false"
};
function AdminContactPage() {
  const getFn = useServerFn(adminGetContactSettings);
  const saveFn = useServerFn(adminSaveContactSettings);
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-contact-settings"],
    queryFn: () => getFn()
  });
  const [values, setValues] = reactExports.useState({
    ...DEFAULTS
  });
  const [original, setOriginal] = reactExports.useState({
    ...DEFAULTS
  });
  const [isDirty, setIsDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (data && typeof data === "object") {
      const merged = {
        ...DEFAULTS
      };
      for (const key of SETTING_KEYS) {
        const v = data[key];
        if (v !== void 0 && v !== null) merged[key] = String(v);
      }
      setValues(merged);
      setOriginal(merged);
      setIsDirty(false);
    }
  }, [data]);
  const setField = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value
    }));
    setIsDirty(true);
  };
  const saveMutation = useMutation({
    mutationFn: () => saveFn({
      data: {
        settings: values
      }
    }),
    onSuccess: () => {
      setOriginal(values);
      setIsDirty(false);
      qc.invalidateQueries({
        queryKey: ["admin-contact-settings"]
      });
      qc.invalidateQueries({
        queryKey: ["public-contact-settings"]
      });
      toast.success("Contact settings saved successfully!", {
        description: "The public contact form will use these new settings immediately."
      });
    },
    onError: (err) => {
      toast.error(`Failed to save contact settings: ${err.message}`, {
        description: "Your changes were not saved. Please try again."
      });
    }
  });
  const handleReset = () => {
    setValues(original);
    setIsDirty(false);
    toast.info("Changes discarded.");
  };
  const isSaving = saveMutation.isPending;
  const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50";
  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2";
  const boolVal = (key) => values[key] === "true" || values[key] === "1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-16 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-md pb-4 pt-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-2xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-6 w-6 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Contact Page Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage the contact form fields, email notifications, and hero banner." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", target: "_blank", className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer shadow-2xs shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Contact Page" })
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleReset, disabled: isSaving, className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => saveMutation.mutate(), disabled: !isDirty || isSaving || isLoading, className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand/90 disabled:opacity-50 transition-all cursor-pointer", children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isDirty ? "Save Changes" : "Saved" })
        ] }) })
      ] })
    ] }),
    isDirty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-xs font-medium text-brand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand animate-pulse" }),
      'You have unsaved changes. Click "Save Changes" to apply them.'
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
      " Loading contact settings..."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border/60 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Contact Form Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Configure the labels, placeholders, validation and messages used by the public contact form." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
            " Publicly Visible"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Enable Contact Form" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Turn the public contact form on or off." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", role: "switch", "aria-checked": boolVal("contact_form_enabled"), "aria-label": "Enable contact form", onClick: () => setField("contact_form_enabled", boolVal("contact_form_enabled") ? "false" : "true"), className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${boolVal("contact_form_enabled") ? "bg-brand" : "bg-muted-foreground/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${boolVal("contact_form_enabled") ? "translate-x-6" : "translate-x-1"}` }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Form Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: values.contact_title, maxLength: 120, onChange: (e) => setField("contact_title", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Submit Button Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: values.contact_submit_button_text, maxLength: 60, onChange: (e) => setField("contact_submit_button_text", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Form Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${inputCls} resize-none`, rows: 3, value: values.contact_description, maxLength: 1e3, onChange: (e) => setField("contact_description", e.target.value) })
          ] })
        ] }),
        ["name", "email", "subject", "message"].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/70 bg-muted/20 p-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-foreground", children: field === "name" ? "Name Field" : field === "email" ? "Email Field" : field === "subject" ? "Subject Field" : "Message Field" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: values[`contact_${field}_label`], maxLength: 80, onChange: (e) => setField(`contact_${field}_label`, e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Placeholder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputCls, value: values[`contact_${field}_placeholder`], maxLength: 120, onChange: (e) => setField(`contact_${field}_placeholder`, e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Required / Optional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: inputCls, value: values[`contact_${field}_required`] === "true" ? "true" : "false", onChange: (e) => setField(`contact_${field}_required`, e.target.value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "true", children: "Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "false", children: "Optional" })
              ] })
            ] })
          ] })
        ] }, field)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Success Message (shown after submission)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${inputCls} resize-none`, rows: 3, value: values.contact_success_message, maxLength: 500, onChange: (e) => setField("contact_success_message", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Error Message (shown on failure)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: `${inputCls} resize-none`, rows: 3, value: values.contact_error_message, maxLength: 500, onChange: (e) => setField("contact_error_message", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-b border-border/60 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-brand/10 text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "h-5 w-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Email Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Control when email notifications are sent for new contact messages." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5 text-muted-foreground shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Admin Notification Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Send an email to the admin inbox when a new message arrives." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", role: "switch", "aria-checked": boolVal("contact_notification_email_enabled"), "aria-label": "Admin notification email", onClick: () => setField("contact_notification_email_enabled", boolVal("contact_notification_email_enabled") ? "false" : "true"), className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${boolVal("contact_notification_email_enabled") ? "bg-brand" : "bg-muted-foreground/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${boolVal("contact_notification_email_enabled") ? "translate-x-6" : "translate-x-1"}` }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Visitor Confirmation Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Send a thank-you confirmation to the visitor after a successful submission." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", role: "switch", "aria-checked": boolVal("contact_confirmation_email_enabled"), "aria-label": "Visitor confirmation email", onClick: () => setField("contact_confirmation_email_enabled", boolVal("contact_confirmation_email_enabled") ? "false" : "true"), className: `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${boolVal("contact_confirmation_email_enabled") ? "bg-brand" : "bg-muted-foreground/30"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${boolVal("contact_confirmation_email_enabled") ? "translate-x-6" : "translate-x-1"}` }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-400", children: "Email credentials (SMTP password, API keys, service role key, Turnstile secret) are stored exclusively in server environment variables and are never exposed here." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 border-b border-border/60 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Contact Hero Banner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Control the banner image at the top of the public contact page." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBannerManager, { page: "contact", autoHint: "Automatically uses a suitable image from the site's available photo content.", manualHint: "Pick an image from the site's available photos below, upload one, or paste a URL.", optionsLabel: "Available Site Images" })
      ] })
    ] })
  ] });
}
export {
  AdminContactPage as component
};
