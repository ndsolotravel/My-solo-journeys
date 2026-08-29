import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, b as useServerFn, s as sendContact, S as SITE } from "./router-4rQzLbsf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PageBreadcrumbs } from "./PageBreadcrumbs-C55J_EOl.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { c as Mail, p as CircleCheck, h as LoaderCircle, m as MapPin, q as Clock, I as Instagram, Y as Youtube, T as Twitter, F as Facebook, a as Linkedin } from "../_libs/lucide-react.mjs";
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
import "./admin.functions-67-zmleM.mjs";
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
import "./media-fm7scLsn.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function TikTokIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) });
}
function PinterestIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" }) });
}
function ContactPage() {
  const t = useTranslations();
  const sendFn = useServerFn(sendContact);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
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
      const result = await sendFn({
        data: {
          name,
          email,
          subject,
          message,
          website
        }
      });
      if (result && result.ok) {
        setSubmitted(true);
        if (result.emailDelivered === false) {
          toast.warning(t("Your message was received and saved, but the email notification could not be delivered."));
        } else {
          toast.success(t("Message sent successfully. I'll reply when I'm back from the trail."));
        }
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: ""
        });
      } else {
        toast.error(t("Could not send message. Please try again."));
      }
    } catch (err) {
      let errorMsg = "Could not send message. Please try again.";
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
  const inputClasses = "w-full rounded-xl border border-border bg-background/80 dark:bg-muted/30 px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-200 hover:border-brand/40 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:bg-background";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground w-full min-w-0 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "banner-hover relative h-[38vh] min-h-[260px] sm:min-h-[300px] w-full overflow-hidden flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80", alt: "Open mountain landscape", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-foreground shadow-sm mb-3", children: t("Direct Dispatch") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md", children: t("Contact Us") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageBreadcrumbs, { items: [{
          label: "Contact Us"
        }] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl w-full min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 sm:mb-12 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand", children: t("Get In Touch") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground", children: t("Send a Message") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground", children: t("Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xl shadow-black/5 dark:shadow-black/30 grid grid-cols-1 lg:grid-cols-12 w-full min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 bg-card p-6 sm:p-10 lg:p-12 flex flex-col justify-between w-full min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-5 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl sm:text-2xl font-bold text-foreground", children: t("Send Us A Message") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-1", children: t("Fill in the form below and I'll respond as soon as possible.") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand shrink-0 ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" }) })
          ] }),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 p-6 sm:p-8 text-center space-y-4 my-6 animate-in fade-in duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-xl font-bold text-foreground", children: t("Message Sent Successfully!") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: t("Thank you for reaching out. Your message has been received, and I'll get back to you as soon as I'm back from the trail.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSubmitted(false), className: "cursor-pointer inline-flex items-center justify-center rounded-full bg-brand hover:bg-brand/90 px-6 py-2.5 text-xs font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-all hover:scale-[1.02] active:scale-[0.98]", children: t("Send another message") })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "contact-name", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: [
                  t("Your Name"),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-name", name: "name", required: true, maxLength: 120, placeholder: t("John Doe"), value: form.name, onChange: (e) => setForm({
                  ...form,
                  name: e.target.value
                }), className: inputClasses })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "contact-email", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: [
                  t("Email Address"),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-email", name: "email", required: true, type: "email", maxLength: 320, placeholder: t("john@example.com"), value: form.email, onChange: (e) => setForm({
                  ...form,
                  email: e.target.value
                }), className: inputClasses })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "contact-subject", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: [
                t("Subject"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60 text-[10px]", children: [
                  "(",
                  t("Optional"),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-subject", name: "subject", maxLength: 200, placeholder: t("Collaboration, query, or trail notes..."), value: form.subject, onChange: (e) => setForm({
                ...form,
                subject: e.target.value
              }), className: inputClasses })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "contact-message", className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: [
                t("Your Message"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "contact-message", name: "message", required: true, rows: 5, maxLength: 5e3, placeholder: t("Write your message here..."), value: form.message, onChange: (e) => setForm({
                ...form,
                message: e.target.value
              }), className: `${inputClasses} resize-none` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -left-[9999px] h-0 w-0 overflow-hidden", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-website", children: "Website" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-website", name: "website", type: "text", tabIndex: -1, autoComplete: "off", value: form.website, onChange: (e) => setForm({
                ...form,
                website: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand/90 active:scale-[0.98] px-9 py-3.5 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Sending…") })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Send Message") }) }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 bg-secondary text-secondary-foreground p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border w-full min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-brand/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand", children: t("Direct Channels") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-2xl sm:text-3xl font-bold text-secondary-foreground tracking-tight", children: t("Contact Info") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs sm:text-sm text-secondary-foreground/75 leading-relaxed", children: t("Reach out directly through email or connect on social media.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-secondary-foreground text-sm sm:text-base", children: t("Solo Journeys & Explorations") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-secondary-foreground/70 mt-0.5", children: t("Documenting remote destinations & stories around the globe") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@ndsolotravel.com", className: "text-sm sm:text-base font-medium text-secondary-foreground hover:text-brand transition-colors truncate", children: "contact@ndsolotravel.com" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:ndsolotravel@gmail.com", className: "text-xs sm:text-sm text-secondary-foreground/75 hover:text-brand transition-colors truncate", children: "ndsolotravel@gmail.com" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-secondary-foreground text-sm sm:text-base", children: t("Quick Turnaround") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-secondary-foreground/70 mt-0.5", children: t("Replies typically within 24-48 hours") })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-secondary-foreground/15 mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-secondary-foreground/80 mb-3.5", children: t("Connect With Us") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.instagram, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", style: {
                background: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.tiktok, target: "_blank", rel: "noopener noreferrer", "aria-label": "TikTok", className: "flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.youtube, target: "_blank", rel: "noopener noreferrer", "aria-label": "YouTube", className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.twitter, target: "_blank", rel: "noopener noreferrer", "aria-label": "X (Twitter)", className: "flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.facebook, target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.pinterest, target: "_blank", rel: "noopener noreferrer", "aria-label": "Pinterest", className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
