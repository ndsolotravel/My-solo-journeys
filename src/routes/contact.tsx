import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
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
} from "lucide-react";
import { sendContact } from "@/lib/newsletter.functions";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { useTranslations } from "@/lib/translate/store";

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

function MessageDecorativeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 5h4M1 11h5M2 17h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="8" y="2" width="20" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 5l10 7 10-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  }),
  component: ContactPage,
});

function ContactPage() {
  const t = useTranslations();
  const sendFn = useServerFn(sendContact);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent) {
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
          website,
        },
      });

      if (result && result.ok) {
        setSubmitted(true);
        if (result.emailDelivered) {
          toast.success(t("Message sent successfully. I'll reply when I'm back from the trail."));
        } else {
          console.warn(
            "[contact] Message saved but notification email failed:",
            result.emailReason,
          );
          toast.warning(
            t(
              "Your message was received and saved, but the notification email could not be sent. If it's urgent, please email contact@ndsolotravel.com directly.",
            ),
          );
        }
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        toast.error(t("Could not send message. Please try again."));
      }
    } catch (err: unknown) {
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

  const underlineInput =
    "w-full bg-transparent border-b border-[#E5D7CA] pb-2.5 pt-2 text-slate-800 placeholder:text-stone-400 placeholder:text-sm text-sm sm:text-base outline-none focus:border-black transition-colors";

  return (
    <div className="min-h-screen bg-[#08172c]">
      {/* 1. Hero Section with Mountain View & Centered Title */}
      <section className="relative h-[40vh] min-h-[280px] sm:min-h-[320px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80"
          alt="Open mountain landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            {t("Contact Us")}
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-white/85">
            <Link to="/" className="hover:text-white transition-colors">
              {t("Home")}
            </Link>
            <span className="text-[#FA8128] font-bold text-base leading-none">»</span>
            <span className="text-white font-semibold">{t("Contact Us")}</span>
          </div>
        </div>
      </section>

      {/* 2. Main Dark Navy Content Section */}
      <section className="bg-[#0B1E36] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-10 text-left">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#FA8128] uppercase">
              {t("Contact Us")}
            </p>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t("Get In Touch")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
              {t(
                "Got a destination to discover, a story to share, or an adventure in mind? Whether it’s a collaboration, a travel tip, or simply a great story from the road, the inbox is always open.",
              )}
            </p>
          </div>

          {/* Redesigned Floating Split Card */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-white">
            {/* Left Card: White Send Us A Message Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-black">
                    {t("Send Us A Message")}
                  </h3>
                  <MessageDecorativeIcon className="h-6 w-8 text-black/80 shrink-0" />
                </div>

                {submitted ? (
                  <div className="rounded-2xl bg-amber-50/70 border border-black/20 p-6 sm:p-8 text-center space-y-4 my-6 animate-in fade-in duration-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/10 text-black">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-slate-900">
                      {t("Message Sent Successfully!")}
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      {t(
                        "Thank you for reaching out. Your message has been received, and I'll get back to you as soon as I'm back from the trail.",
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                    >
                      {t("Send another message")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="sr-only">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          required
                          maxLength={120}
                          placeholder={t("Name")}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={underlineInput}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          required
                          type="email"
                          maxLength={320}
                          placeholder={t("Email Address")}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={underlineInput}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="sr-only">
                        Subject (optional)
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        maxLength={200}
                        placeholder={t("Subject (optional)")}
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={underlineInput}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        maxLength={5000}
                        placeholder={t("Message")}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${underlineInput} resize-none`}
                      />
                    </div>

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
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer rounded-full bg-black hover:bg-neutral-800 active:scale-[0.98] px-10 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>{t("Sending…")}</span>
                          </>
                        ) : (
                          t("Submit")
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Card: Black Contact Info Panel */}
            <div className="lg:col-span-5 bg-black text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
                  {t("Contact Info")}
                </h3>

                <div className="space-y-6 text-white text-sm sm:text-base">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Solo Journeys & Explorations</p>
                      <p className="text-xs text-white/85 mt-0.5">
                        My travel experience around the globe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div className="flex flex-col space-y-1">
                      <a
                        href="mailto:contact@ndsolotravel.com"
                        className="font-medium text-white hover:underline transition-all"
                      >
                        contact@ndsolotravel.com
                      </a>
                      <a
                        href="mailto:ndsolotravel@gmail.com"
                        className="font-medium text-white hover:underline transition-all"
                      >
                        ndsolotravel@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">{t("Quick Turnaround")}</p>
                      <p className="text-xs text-white/85 mt-0.5">
                        {t("Replies typically within 24-48 hours")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Row */}
              <div className="pt-8 border-t border-white/25 mt-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-3.5">
                  {t("Connect With Us")}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={SITE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <TikTokIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.socials.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:scale-105"
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
