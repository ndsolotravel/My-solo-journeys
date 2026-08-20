import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslations, a as useServerFn, s as sendContact, S as SITE } from "./router-50q_1crC.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { i as CircleCheck, b as LoaderCircle, f as MapPin, j as Mail, k as Clock, a as Linkedin, F as Facebook, T as Twitter, I as Instagram, Y as Youtube } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "./admin.functions-DwpNeojB.mjs";
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
import "./client-BqBvvzI9.mjs";
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
function MessageDecorativeIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className, viewBox: "0 0 30 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 5h4M1 11h5M2 17h4", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "8", y: "2", width: "20", height: "17", rx: "2.5", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 5l10 7 10-7", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
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
        if (result.emailDelivered) {
          toast.success(t("Message sent successfully. I'll reply when I'm back from the trail."));
        } else {
          console.warn("[contact] Message saved but notification email failed:", result.emailReason);
          toast.warning(t("Your message was received and saved, but the notification email could not be sent. If it's urgent, please email contact@ndsolotravel.com directly."));
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
  const underlineInput = "w-full bg-transparent border-b border-[#E5D7CA] pb-2.5 pt-2 text-slate-800 placeholder:text-stone-400 placeholder:text-sm text-sm sm:text-base outline-none focus:border-black transition-colors";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#08172c]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[40vh] min-h-[280px] sm:min-h-[320px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80", alt: "Open mountain landscape", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md", children: t("Contact Us") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-center gap-2 text-sm font-medium text-white/85", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: t("Home") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FA8128] font-bold text-base leading-none", children: "»" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold", children: t("Contact Us") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#0B1E36] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm font-semibold tracking-wider text-[#FA8128] uppercase", children: t("Contact Us") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1.5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight", children: t("Get In Touch") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300", children: t("Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-stone-100 pb-4 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl sm:text-2xl font-bold text-black", children: t("Send Us A Message") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageDecorativeIcon, { className: "h-6 w-8 text-black/80 shrink-0" })
          ] }),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-amber-50/70 border border-black/20 p-6 sm:p-8 text-center space-y-4 my-6 animate-in fade-in duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-xl font-bold text-slate-900", children: t("Message Sent Successfully!") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 max-w-md mx-auto", children: t("Thank you for reaching out. Your message has been received, and I'll get back to you as soon as I'm back from the trail.") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSubmitted(false), className: "inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer", children: t("Send another message") })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-name", className: "sr-only", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-name", name: "name", required: true, maxLength: 120, placeholder: t("Name"), value: form.name, onChange: (e) => setForm({
                  ...form,
                  name: e.target.value
                }), className: underlineInput })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-email", className: "sr-only", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-email", name: "email", required: true, type: "email", maxLength: 320, placeholder: t("Email Address"), value: form.email, onChange: (e) => setForm({
                  ...form,
                  email: e.target.value
                }), className: underlineInput })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-subject", className: "sr-only", children: "Subject (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-subject", name: "subject", maxLength: 200, placeholder: t("Subject (optional)"), value: form.subject, onChange: (e) => setForm({
                ...form,
                subject: e.target.value
              }), className: underlineInput })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-message", className: "sr-only", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "contact-message", name: "message", required: true, rows: 4, maxLength: 5e3, placeholder: t("Message"), value: form.message, onChange: (e) => setForm({
                ...form,
                message: e.target.value
              }), className: `${underlineInput} resize-none` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -left-[9999px] h-0 w-0 overflow-hidden", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contact-website", children: "Website" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "contact-website", name: "website", type: "text", tabIndex: -1, autoComplete: "off", value: form.website, onChange: (e) => setForm({
                ...form,
                website: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "cursor-pointer rounded-full bg-black hover:bg-neutral-800 active:scale-[0.98] px-10 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Sending…") })
            ] }) : t("Submit") }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 bg-black text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8", children: t("Contact Info") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-white text-sm sm:text-base", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-white shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: "Solo Journeys & Explorations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/85 mt-0.5", children: "My travel experience around the globe" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-white shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@ndsolotravel.com", className: "font-medium text-white hover:underline transition-all", children: "contact@ndsolotravel.com" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:ndsolotravel@gmail.com", className: "font-medium text-white hover:underline transition-all", children: "ndsolotravel@gmail.com" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-white shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: t("Quick Turnaround") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/85 mt-0.5", children: t("Replies typically within 24-48 hours") })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-white/25 mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-white/90 mb-3.5", children: t("Connect With Us") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.facebook, target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.twitter, target: "_blank", rel: "noopener noreferrer", "aria-label": "X (Twitter)", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.instagram, target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.youtube, target: "_blank", rel: "noopener noreferrer", "aria-label": "YouTube", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.tiktok, target: "_blank", rel: "noopener noreferrer", "aria-label": "TikTok", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.pinterest, target: "_blank", rel: "noopener noreferrer", "aria-label": "Pinterest", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-4 w-4" }) })
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
