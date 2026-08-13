import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, Linkedin, Facebook } from "lucide-react";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslations } from "@/lib/translate/store";
import logoPath from "@/assets/ndsolo-travel-logo.png";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="group inline-flex items-center gap-2">
              <img
                src={logoPath}
                alt="ndsolotravel"
                className="h-8 w-auto brightness-0 invert transition-[filter] duration-300 ease-in-out group-hover:[filter:none]"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-secondary-foreground/70">
              {t(SITE.description)}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.socials.instagram}
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110"
                style={{
                  background:
                    "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.youtube}
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.twitter}
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.facebook}
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.linkedin}
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.tiktok}
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6">
              <LanguageSelector />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">{t("Explore")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <Link to="/blog" className="hover:text-accent">
                  {t("Stories")}
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-accent">
                  {t("Destinations")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent">
                  {t("Gallery")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  {t("About")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  {t("Contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">{t("Newsletter")}</h4>
            <p className="mt-3 text-sm text-secondary-foreground/70">
              {t("Stories from the road. No spam, ever.")}
            </p>
            <div className="mt-4">
              <NewsletterForm dark />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. {t("All stories made on the move.")}</p>
          <p>{t("Built for solo travellers, by a solo traveller.")}</p>
        </div>
      </div>
    </footer>
  );
}

