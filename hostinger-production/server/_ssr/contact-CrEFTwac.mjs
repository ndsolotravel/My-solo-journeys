import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useServerFn, s as sendContact, u as useTranslator, S as SITE } from "./router-D4hdc9iv.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { g as Mail, I as Instagram, Y as Youtube, F as Facebook, a as Linkedin } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "./client-Bkj-llDP.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-CKFEJwfb.mjs";
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
function TikTokIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) });
}
function ContactPage() {
  const sendFn = useServerFn(sendContact);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const t = useTranslator(["Contact", "Say hello.", "Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.", "Name", "Email", "Subject (optional)", "Your message…", "Sending…", "Send message", "Elsewhere", "Instagram", "YouTube", "Facebook", "LinkedIn", "TikTok", "Message sent. I'll reply when I'm back from the trail.", "Could not send. Try again.", "Please enter your name.", "Please enter a valid email address.", "Please enter your message."]);
  async function onSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();
    const website = form.website.trim();
    if (!name) {
      toast.error(t("Please enter your name."));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error(t("Please enter a valid email address."));
      return;
    }
    if (!message) {
      toast.error(t("Please enter your message."));
      return;
    }
    setLoading(true);
    try {
      await sendFn({
        data: {
          name,
          email,
          subject,
          message,
          website
        }
      });
      toast.success(t("Message sent. I'll reply when I'm back from the trail."));
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: ""
      });
    } catch (err) {
      let errorMsg = t("Could not send. Try again.");
      if (err instanceof Error && err.message) {
        try {
          const parsed = JSON.parse(err.message);
          if (Array.isArray(parsed) && parsed[0]?.message) {
            errorMsg = parsed[0].message;
          } else {
            errorMsg = err.message;
          }
        } catch {
          errorMsg = err.message;
        }
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }
  const inp = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[45vh] min-h-[280px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80", alt: "Open mountain landscape", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-accent", children: t("Contact") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl", children: t("Say hello.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-sm text-white/80", children: t("Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: t("Say hello.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-[2fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-name", className: "sr-only", children: t("Name") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-name", name: "name", required: true, maxLength: 120, placeholder: t("Name"), value: form.name, onChange: (e) => setForm({
                ...form,
                name: e.target.value
              }), className: inp })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-email", className: "sr-only", children: t("Email") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-email", name: "email", required: true, type: "email", maxLength: 320, placeholder: t("Email"), value: form.email, onChange: (e) => setForm({
                ...form,
                email: e.target.value
              }), className: inp })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-subject", className: "sr-only", children: t("Subject (optional)") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-subject", name: "subject", maxLength: 200, placeholder: t("Subject (optional)"), value: form.subject, onChange: (e) => setForm({
              ...form,
              subject: e.target.value
            }), className: inp })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-message", className: "sr-only", children: t("Your message…") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "contact-message", name: "message", required: true, rows: 6, maxLength: 5e3, placeholder: t("Your message…"), value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }), className: inp })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -left-[9999px] h-0 w-0 overflow-hidden", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-website", children: "Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-website", name: "website", type: "text", tabIndex: -1, autoComplete: "off", value: form.website, onChange: (e) => setForm({
              ...form,
              website: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50", children: loading ? t("Sending…") : t("Send message") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4 rounded-3xl bg-muted/40 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: t("Elsewhere") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:contact@ndsolotravel.com", className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
            " contact@ndsolotravel.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.instagram, className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
            " ",
            t("Instagram")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.youtube, className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" }),
            " ",
            t("YouTube")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.facebook, className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }),
            " ",
            t("Facebook")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.linkedin, className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }),
            " ",
            t("LinkedIn")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.tiktok, className: "flex items-center gap-3 text-sm hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: "h-4 w-4" }),
            " ",
            t("TikTok")
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ContactPage as component
};
