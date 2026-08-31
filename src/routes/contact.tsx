import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  submitContactMessage,
  getPublicContactSettings,
  type ContactFormConfig,
} from "@/lib/contact.functions";
import { getPageHeroConfig } from "@/lib/page-hero.functions";
import { SITE } from "@/lib/site";
import { useTranslations, useLanguage } from "@/lib/translate/store";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { useContentTranslation } from "@/lib/translate/contentTranslation";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}

// Public Turnstile site key — safe to expose publicly (it is a public key)
const TURNSTILE_SITE_KEY =
  (typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.VITE_TURNSTILE_SITE_KEY
    : undefined) ||
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : undefined) ||
  "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: string;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const heroQO = queryOptions({
  queryKey: ["page-hero", "contact"],
  queryFn: () => getPageHeroConfig({ data: "contact" }),
});

const settingsQO = queryOptions({
  queryKey: ["public-contact-settings"],
  queryFn: () => getPublicContactSettings(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ndsolotravel" },
      {
        name: "description",
        content: "Get in touch with ndsolotravel for collaborations, questions, or just to say hi.",
      },
      { property: "og:title", content: "Contact — ndsolotravel" },
      { property: "og:description", content: "Get in touch with ndsolotravel." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "Contact" },
          ],
        }),
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(heroQO),
      context.queryClient.ensureQueryData(settingsQO),
    ]);
  },
  component: ContactPage,
});

// ────────────────────────────────────────────────────────────────────────────
// Type-only use of ContactFormConfig to keep the client bundle lean
// ────────────────────────────────────────────────────────────────────────────

type FieldState = {
  value: string;
  error: string | null;
};

function ContactPage() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const { data: hero } = useSuspenseQuery(heroQO);
  const { data: cfg } = useSuspenseQuery(settingsQO);
  const sendFn = useServerFn(submitContactMessage);

  const config: ContactFormConfig =
    cfg && typeof cfg === "object" && "name_label" in cfg
      ? (cfg as ContactFormConfig)
      : {
          enabled: true,
          title: "Send a Message",
          description:
            "Got a destination to discover, a story to share, or an adventure in mind? The inbox is always open.",
          name_label: "Your Name",
          name_placeholder: "John Doe",
          name_required: true,
          email_label: "Email Address",
          email_placeholder: "john@example.com",
          email_required: true,
          subject_label: "Subject",
          subject_placeholder: "Collaboration, query, or trail notes...",
          subject_required: false,
          message_label: "Your Message",
          message_placeholder: "Write your message here...",
          message_required: true,
          submit_button_text: "Send Message",
          success_message: "Message sent successfully.",
          error_message: "Your message could not be sent. Please try again.",
          notification_email_enabled: true,
          confirmation_email_enabled: false,
          notification_email: "ndsolotravel@gmail.com",
          max_name: 120,
          max_email: 320,
          max_subject: 200,
          max_message: 5000,
        };

  const localizedConfig = useContentTranslation({
    contentType: "category",
    contentId: "contact-form",
    englishFields: {
      title: config.title,
      description: config.description,
      name_label: config.name_label,
      name_placeholder: config.name_placeholder,
      email_label: config.email_label,
      email_placeholder: config.email_placeholder,
      subject_label: config.subject_label,
      subject_placeholder: config.subject_placeholder,
      message_label: config.message_label,
      message_placeholder: config.message_placeholder,
      submit_button_text: config.submit_button_text,
      success_message: config.success_message,
      error_message: config.error_message,
    },
    targetLang: lang,
  });

  const mergedConfig = { ...config, ...localizedConfig };

  const [name, setName] = useState<FieldState>({ value: "", error: null });
  const [email, setEmail] = useState<FieldState>({ value: "", error: null });
  const [subject, setSubject] = useState<FieldState>({ value: "", error: null });
  const [message, setMessage] = useState<FieldState>({ value: "", error: null });
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const [submitPhase, setSubmitPhase] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<string | null>(null);
  const lastErrorRef = useRef<HTMLDivElement>(null);

  const canUseTurnstile = Boolean(TURNSTILE_SITE_KEY);

  // ── Load Turnstile script when enabled & provider is available ─────────
  useEffect(() => {
    if (!canUseTurnstile) return;
    const existing = document.getElementById("turnstile-script");
    const renderWidget = () => {
      if (!window.turnstile || !formRef.current) return;
      const container = document.getElementById("contact-turnstile");
      if (!container) return;
      if (turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
        return;
      }
      turnstileRef.current = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }
    if (existing) {
      existing.addEventListener("load", renderWidget);
      return;
    }
    const s = document.createElement("script");
    s.id = "turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.addEventListener("load", renderWidget);
    document.head.appendChild(s);
    return () => {
      s.removeEventListener("load", renderWidget);
    };
  }, [canUseTurnstile]);

  // ── Reset wireframe & store user info for a fresh submission ───────────
  const resetValidation = useCallback(() => {
    setName((f) => ({ ...f, error: null }));
    setEmail((f) => ({ ...f, error: null }));
    setSubject((f) => ({ ...f, error: null }));
    setMessage((f) => ({ ...f, error: null }));
    setSubmitError(null);
    setEmailWarning(null);
  }, []);

  function validateField(
    label: string,
    value: string,
    required: boolean,
    max: number,
    type: "text" | "email" = "text",
  ): string | null {
    const trimmed = value.trim();
    if (required && !trimmed) return `Please enter your ${label.toLowerCase()}.`;
    if (required && trimmed && !/[\S]/.test(value))
      return `Please enter your ${label.toLowerCase()}.`;
    if (trimmed.length > max) return `${label} must be ${max} characters or fewer.`;
    if (type === "email" && required && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    if (
      type === "email" &&
      !required &&
      trimmed &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
    ) {
      return "Please enter a valid email address.";
    }
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetValidation();

    const nameError = validateField("name", name.value, config.name_required, config.max_name);
    const emailError = validateField(
      "email",
      email.value,
      config.email_required,
      config.max_email,
      "email",
    );
    const subjectError = validateField(
      "subject",
      subject.value,
      config.subject_required,
      config.max_subject,
    );
    const messageError = validateField(
      "message",
      message.value,
      config.message_required,
      config.max_message,
    );

    setName((f) => ({ ...f, error: nameError }));
    setEmail((f) => ({ ...f, error: emailError }));
    setSubject((f) => ({ ...f, error: subjectError }));
    setMessage((f) => ({ ...f, error: messageError }));

    if (nameError || emailError || subjectError || messageError) {
      setSubmitPhase("error");
      setSubmitError("Please correct the highlighted fields and try again.");
      requestAnimationFrame(() =>
        lastErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return;
    }

    if (canUseTurnstile && !turnstileToken) {
      setSubmitPhase("error");
      setSubmitError("Please complete the security check below.");
      requestAnimationFrame(() =>
        lastErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return;
    }

    setSubmitPhase("loading");
    setSubmitError(null);
    setEmailWarning(null);

    sendFn({
      data: {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        website: website.trim(),
        turnstileToken,
      },
    })
      .then((result) => {
        if (result && result.ok) {
          setSubmitPhase("success");
          // Clear the form
          setName({ value: "", error: null });
          setEmail({ value: "", error: null });
          setSubject({ value: "", error: null });
          setMessage({ value: "", error: null });
          setWebsite("");
          setTurnstileToken("");
          setEmailWarning(null);
          if (result.emailDelivered === false) {
            setEmailWarning(
              "Your message was received and saved, but the email notification could not be delivered.",
            );
          }
        } else {
          setSubmitPhase("error");
          setSubmitError(result && result.message ? result.message : config.error_message);
        }
      })
      .catch((err: unknown) => {
        setSubmitPhase("error");
        let msg = mergedConfig.error_message;
        if (err instanceof Error && err.message) {
          try {
            const parsed = JSON.parse(err.message);
            if (Array.isArray(parsed) && parsed[0]?.message) msg = parsed[0].message;
            else msg = err.message;
          } catch {
            msg = err.message;
          }
        }
        setSubmitError(msg);
      });
  }

  const isSubmitting = submitPhase === "loading";
  const didSucceed = submitPhase === "success";

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-200 focus:ring-2 bg-background/80 dark:bg-muted/30 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-border hover:border-brand/40 focus:border-brand focus:ring-brand/20 focus:bg-background"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground w-full min-w-0 overflow-x-hidden">
      {/* 1. Hero Section with Cinematic Mountain View & Centered Title */}
      <section className="banner-hover relative h-[38vh] min-h-[260px] sm:min-h-[300px] w-full overflow-hidden flex flex-col justify-center items-center">
        {hero?.image ? (
          <img
            src={hero.image}
            alt="Reach out to the ndsolotravel team."
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-foreground shadow-sm mb-3">
            {t("Direct Dispatch")}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            {t("Contact Us")}
          </h1>
          <div className="mt-3">
            <PageBreadcrumbs items={[{ label: "Contact Us" }]} />
          </div>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl w-full min-w-0">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              {t("Get In Touch")}
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {mergedConfig.title || t("Send a Message")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              {mergedConfig.description ||
                t(
                  "Got a destination to discover, a story to share, or an adventure in mind? The inbox is always open.",
                )}
            </p>
          </div>

          {/* Floating Split Card */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xl shadow-black/5 dark:shadow-black/30 grid grid-cols-1 lg:grid-cols-12 w-full min-w-0">
            {/* Left Column: Form Container */}
            <div className="lg:col-span-7 bg-card p-6 sm:p-10 lg:p-12 flex flex-col justify-between w-full min-w-0">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-5 mb-8">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                      {mergedConfig.title || t("Send Us A Message")}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {t("Fill in the form below and I'll respond as soon as possible.")}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand shrink-0 ml-3">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>

                {didSucceed ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 p-6 sm:p-8 text-center space-y-4 my-6 animate-in fade-in duration-300"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-foreground">
                      {t("Message Sent Successfully!")}
                    </h4>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      {mergedConfig.success_message ||
                        t(
                          "Thank you for reaching out. Your message has been received, and I'll get back to you as soon as I'm back from the trail.",
                        )}
                    </p>
                    {emailWarning && (
                      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-600 dark:text-amber-400">
                        {emailWarning}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitPhase("idle");
                        if (canUseTurnstile) setTurnstileToken("");
                      }}
                      className="cursor-pointer inline-flex items-center justify-center rounded-full bg-brand hover:bg-brand/90 px-6 py-2.5 text-xs font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t("Send another message")}
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          {mergedConfig.name_label || t("Your Name")}{" "}
                          {config.name_required && <span className="text-brand">*</span>}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          maxLength={config.max_name}
                          placeholder={mergedConfig.name_placeholder || t("John Doe")}
                          value={name.value}
                          onChange={(e) => setName({ value: e.target.value, error: null })}
                          aria-invalid={Boolean(name.error)}
                          aria-describedby={name.error ? "contact-name-error" : undefined}
                          className={inputClasses(Boolean(name.error))}
                        />
                        {name.error && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {name.error}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          {mergedConfig.email_label || t("Email Address")}{" "}
                          {config.email_required && <span className="text-brand">*</span>}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          maxLength={config.max_email}
                          placeholder={mergedConfig.email_placeholder || t("john@example.com")}
                          value={email.value}
                          onChange={(e) => setEmail({ value: e.target.value, error: null })}
                          aria-invalid={Boolean(email.error)}
                          aria-describedby={email.error ? "contact-email-error" : undefined}
                          className={inputClasses(Boolean(email.error))}
                        />
                        {email.error && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {email.error}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                      >
                        {mergedConfig.subject_label || t("Subject")}{" "}
                        {config.subject_required ? (
                          <span className="text-brand">*</span>
                        ) : (
                          <span className="text-muted-foreground/60 text-[10px]">
                            ({t("Optional")})
                          </span>
                        )}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        maxLength={config.max_subject}
                        placeholder={
                          mergedConfig.subject_placeholder ||
                          t("Collaboration, query, or trail notes...")
                        }
                        value={subject.value}
                        onChange={(e) => setSubject({ value: e.target.value, error: null })}
                        aria-invalid={Boolean(subject.error)}
                        aria-describedby={subject.error ? "contact-subject-error" : undefined}
                        className={inputClasses(Boolean(subject.error))}
                      />
                      {subject.error && (
                        <p
                          id="contact-subject-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {subject.error}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                        >
                          {mergedConfig.message_label || t("Your Message")}{" "}
                          {config.message_required && <span className="text-brand">*</span>}
                        </label>
                        <span className="text-[10px] text-muted-foreground/70">
                          {message.value.length}/{config.max_message}
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        required={config.message_required}
                        rows={5}
                        maxLength={config.max_message}
                        placeholder={
                          mergedConfig.message_placeholder || t("Write your message here...")
                        }
                        value={message.value}
                        onChange={(e) => setMessage({ value: e.target.value, error: null })}
                        aria-invalid={Boolean(message.error)}
                        aria-describedby={message.error ? "contact-message-error" : undefined}
                        className={`${inputClasses(Boolean(message.error))} resize-none`}
                      />
                      {message.error && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {message.error}
                        </p>
                      )}
                    </div>

                    {/* Turnstile widget */}
                    {canUseTurnstile && (
                      <div>
                        <div id="contact-turnstile" className="min-h-[65px]" />
                        {turnstileToken === "" && submitPhase === "error" && (
                          <p
                            className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                            role="alert"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> Please complete the
                            security check.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Honeypot — hidden from humans, bots fill it */}
                    <div
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    {/* Global error message */}
                    {submitPhase === "error" && submitError && (
                      <div
                        ref={lastErrorRef}
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand/90 active:scale-[0.98] px-9 py-3.5 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            <span aria-live="polite">{t("Sending…")}</span>
                          </>
                        ) : (
                          <span>{mergedConfig.submit_button_text || t("Send Message")}</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Contact Info & Social Panel (unchanged) */}
            <div className="lg:col-span-5 bg-secondary text-secondary-foreground p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border w-full min-w-0">
              <div>
                <span className="inline-flex items-center rounded-full bg-brand/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                  {t("Direct Channels")}
                </span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-secondary-foreground tracking-tight">
                  {t("Contact Info")}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-secondary-foreground/75 leading-relaxed">
                  {t("Reach out directly through email or connect on social media.")}
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-secondary-foreground text-sm sm:text-base">
                        {t("Solo Journeys & Explorations")}
                      </p>
                      <p className="text-xs text-secondary-foreground/70 mt-0.5">
                        {t("Documenting remote destinations & stories around the globe")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col min-w-0 gap-1.5">
                      <a
                        href="mailto:contact@ndsolotravel.com"
                        className="block w-full text-sm sm:text-base font-medium text-secondary-foreground hover:text-brand transition-colors break-all leading-snug"
                      >
                        contact@ndsolotravel.com
                      </a>
                      <a
                        href="mailto:ndsolotravel@gmail.com"
                        className="block w-full text-xs sm:text-sm text-secondary-foreground/75 hover:text-brand transition-colors break-all leading-snug"
                      >
                        ndsolotravel@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-secondary-foreground text-sm sm:text-base">
                        {t("Quick Turnaround")}
                      </p>
                      <p className="text-xs text-secondary-foreground/70 mt-0.5">
                        {t("Replies typically within 24-48 hours")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-8 border-t border-secondary-foreground/15 mt-10">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/80 mb-3.5">
                  {t("Connect With Us")}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={SITE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                    }}
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <TikTokIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-all duration-200 hover:scale-110 shadow-sm shrink-0"
                  >
                    <PinterestIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
