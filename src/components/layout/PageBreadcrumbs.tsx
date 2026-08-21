import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "@/lib/translate/store";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations();
  const all = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mt-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="h-3 w-3 text-accent" />
              )}
              {isLast || !item.href ? (
                <span className="font-semibold text-white">{t(item.label)}</span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-white transition-colors"
                >
                  {t(item.label)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const baseUrl = "https://ndsolotravel.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
