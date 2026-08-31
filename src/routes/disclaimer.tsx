import { createFileRoute } from "@tanstack/react-router";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { TranslatedMarkdown } from "@/components/common/TranslatedMarkdown";
import { getLegalPageBySlug } from "@/lib/legal.functions";
import { resolveMediaUrl } from "@/lib/media";
import { useContentTranslation } from "@/lib/translate/contentTranslation";
import { useLanguage } from "@/lib/translate/store";

export const Route = createFileRoute("/disclaimer")({
  loader: async () => {
    return await getLegalPageBySlug({ data: { slug: "disclaimer" } });
  },
  head: ({ loaderData }) => {
    const page = loaderData?.legalPage;
    const title =
      page?.seo_title ||
      (page?.title ? `${page.title} — ndsolotravel` : "Disclaimer — ndsolotravel");
    const description =
      page?.seo_description ||
      "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "/disclaimer" },
      ],
      links: [
        { rel: "canonical", href: "/disclaimer" },
        ...["id", "ms"].map((l) => ({
          rel: "alternate",
          hrefLang: l,
          href: `https://ndsolotravel.com/${l}/disclaimer`,
        })),
        { rel: "alternate", hrefLang: "x-default", href: "https://ndsolotravel.com/disclaimer" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
              { "@type": "ListItem", position: 2, name: page?.title || "Disclaimer" },
            ],
          }),
        },
      ],
    };
  },
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const { legalPage } = Route.useLoaderData();

  const localizedPage = useContentTranslation({
    contentType: "legal",
    contentId: legalPage?.id ?? "disclaimer",
    englishFields: {
      title: legalPage?.title ?? "Disclaimer",
      content: legalPage?.content ?? "",
      seo_title: legalPage?.seo_title ?? "",
      seo_description: legalPage?.seo_description ?? "",
    },
    targetLang: lang,
  });

  const heroImage = legalPage?.hero_image ? resolveMediaUrl(legalPage.hero_image) : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section className="banner-hover relative h-[30vh] min-h-[220px] w-full overflow-hidden flex flex-col justify-center items-center">
        {heroImage ? (
          <img
            src={heroImage}
            alt={localizedPage.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-foreground shadow-sm mb-3">
            {t("Legal")}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {localizedPage.title}
          </h1>
          <div className="mt-3">
            <PageBreadcrumbs items={[{ label: localizedPage.title }]} />
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="prose prose-gray dark:prose-invert max-w-none text-base leading-relaxed text-muted-foreground prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-a:text-brand hover:prose-a:underline prose-strong:text-foreground prose-ul:list-disc prose-ol:list-decimal space-y-6">
          <TranslatedMarkdown content={localizedPage.content} />
        </article>
      </div>
    </div>
  );
}
