import { useRouterState } from "@tanstack/react-router";
import { useLanguage, LANGUAGES } from "@/lib/translate/store";
import { useEffect } from "react";

const BASE_URL = "https://ndsolotravel.com";

function getAlternateHref(pathname: string, lang: string): string {
  if (lang === "en") {
    return `${BASE_URL}${pathname}`;
  }
  return `${BASE_URL}/${lang}${pathname}`;
}

export function LanguageAlternates() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach((link) => link.remove());

    const head = document.head;
    const isAdmin = pathname.startsWith("/admin");
    if (isAdmin) return;

    LANGUAGES.forEach((l) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", l.code);
      link.href = getAlternateHref(pathname, l.code);
      head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.href = getAlternateHref(pathname, "en");
    head.appendChild(xDefault);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", getAlternateHref(pathname, lang));
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = ["fa", "ar", "ur"].includes(lang) ? "rtl" : "ltr";
  }, [pathname, lang]);

  return null;
}

export function getAlternateLinks(pathname: string) {
  const links: { rel: string; hrefLang: string; href: string }[] = [];
  LANGUAGES.forEach((l) => {
    links.push({
      rel: "alternate",
      hrefLang: l.code,
      href: getAlternateHref(pathname, l.code),
    });
  });
  links.push({ rel: "alternate", hrefLang: "x-default", href: getAlternateHref(pathname, "en") });
  return links;
}
