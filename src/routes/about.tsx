import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import aboutPortrait from "@/assets/nd-about.jpg";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { TranslatedMarkdown } from "@/components/common/TranslatedMarkdown";
import {
  getPublicAboutPage,
  type AboutPageData,
  DEFAULT_ABOUT_PAGE,
} from "@/lib/about.functions";

const aboutPageQO = queryOptions({
  queryKey: ["public-about-page"],
  queryFn: () => getPublicAboutPage(),
});

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ndsolotravel" },
      {
        name: "description",
        content:
          "About ndsolotravel — solo adventure traveller, motorcyclist, photographer, mountain person.",
      },
      { property: "og:title", content: "About — ndsolotravel" },
      { property: "og:description", content: "About the solo traveller behind ndsolotravel." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "About" },
          ],
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(aboutPageQO),
  component: AboutPage,
});

function AboutPage() {
  const t = useTranslations();
  const { data } = useSuspenseQuery(aboutPageQO);
  const about: AboutPageData = data || DEFAULT_ABOUT_PAGE;

  const heroImage = about.hero_image || DEFAULT_ABOUT_PAGE.hero_image;
  const heroImageAlt = about.hero_image_alt || DEFAULT_ABOUT_PAGE.hero_image_alt;
  const heroLabel = about.hero_label || DEFAULT_ABOUT_PAGE.hero_label;
  const heroHeadline = about.hero_headline || DEFAULT_ABOUT_PAGE.hero_headline;

  const portraitSrc = about.profile_image || aboutPortrait;
  const profileImageAlt = about.profile_image_alt || DEFAULT_ABOUT_PAGE.profile_image_alt;

  const biographyIntro = about.biography_intro;
  const biographyContent = about.biography_content || DEFAULT_ABOUT_PAGE.biography_content;

  const philosophyTitle = about.philosophy_title || DEFAULT_ABOUT_PAGE.philosophy_title;
  const philosophyQuote = about.philosophy_quote || DEFAULT_ABOUT_PAGE.philosophy_quote;
  const philosophyDescription = about.philosophy_description || DEFAULT_ABOUT_PAGE.philosophy_description;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(heroLabel)}</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t(heroHeadline)}
            </h1>
            <PageBreadcrumbs items={[{ label: heroLabel }]} />
          </div>
        </div>
      </section>

      {/* Main Profile & Story Section */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">{t(heroHeadline)}</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={portraitSrc}
              alt={profileImageAlt}
              className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {biographyIntro ? (
              <p className="font-medium text-foreground/90 leading-relaxed">
                {t(biographyIntro)}
              </p>
            ) : null}

            <TranslatedMarkdown
              content={biographyContent}
              className="space-y-5 leading-relaxed"
            />
          </div>
        </div>

        {/* Travel Philosophy Section */}
        <section className="mt-16 rounded-3xl bg-muted/40 p-8 sm:p-10 border border-border/50 shadow-sm">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t(philosophyTitle)}
          </h2>
          <blockquote className="mt-4 text-xl italic leading-relaxed text-foreground/90 font-medium">
            &quot;{t(philosophyQuote)}&quot;
          </blockquote>
          {philosophyDescription ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t(philosophyDescription)}
            </p>
          ) : null}
        </section>
      </div>
    </>
  );
}
