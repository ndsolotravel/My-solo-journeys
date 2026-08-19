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

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
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
                target="_blank"
                rel="noopener noreferrer"
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
                href={SITE.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-200 hover:scale-110"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-200 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white transition-transform duration-200 hover:scale-110"
              >
                <PinterestIcon className="h-4 w-4" />
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

