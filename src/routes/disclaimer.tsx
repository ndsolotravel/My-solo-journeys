import { createFileRoute } from "@tanstack/react-router";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — ndsolotravel" },
      {
        name: "description",
        content:
          "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.",
      },
      { property: "og:title", content: "Disclaimer — ndsolotravel" },
      {
        property: "og:description",
        content:
          "Disclaimer for ndsolotravel. Read about the terms and conditions for using our travel content and resources.",
      },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "Disclaimer" },
          ],
        }),
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-[30vh] min-h-[220px] w-full overflow-hidden flex flex-col justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=80"
          alt="Mountain landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-foreground shadow-sm mb-3">
            {t("Legal")}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {t("Disclaimer")}
          </h1>
          <div className="mt-3">
            <PageBreadcrumbs items={[{ label: "Disclaimer" }]} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-base leading-relaxed text-muted-foreground">
          <p className="text-sm text-muted-foreground/70">
            {t("Last updated: August 2026")}
          </p>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("General Information")}
            </h2>
            <p>
              {t(
                "The information provided on ndsolotravel.com is for general informational and educational purposes only. All content is published in good faith and for general information purposes. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or suitability of this information.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Travel Advice")}
            </h2>
            <p>
              {t(
                "Travel involves inherent risks. The travel stories, guides, tips, and recommendations shared on ndsolotravel are based on personal experiences and are intended for informational purposes only. Travel conditions, regulations, weather, and safety situations can change rapidly and without notice.",
              )}
            </p>
            <p>
              {t(
                "Always conduct your own research and exercise personal judgment before undertaking any travel. We recommend consulting official travel advisories, local authorities, and qualified professionals for the most current information regarding safety, health, and entry requirements for any destination.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("External Links")}
            </h2>
            <p>
              {t(
                "ndsolotravel may contain links to external websites that are not operated or maintained by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Professional Advice")}
            </h2>
            <p>
              {t(
                "Content on ndsolotravel should not be construed as professional advice of any kind, including but not limited to medical, legal, or financial advice. Always seek the guidance of qualified professionals with any questions you may have regarding travel safety, health precautions, or other matters.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Photos and Media")}
            </h2>
            <p>
              {t(
                "All photographs and media content on ndsolotravel are the property of ndsolotravel unless otherwise noted. Unauthorized use, reproduction, or distribution without written permission is prohibited.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Consent")}
            </h2>
            <p>
              {t(
                "By using our website, you hereby consent to our disclaimer and agree to its terms. If you do not agree with any part of this disclaimer, please discontinue use of our website.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("Contact Us")}
            </h2>
            <p>
              {t(
                "If you have any questions about this Disclaimer, please contact us at",
              )}{" "}
              <a
                href="mailto:contact@ndsolotravel.com"
                className="text-brand hover:underline"
              >
                contact@ndsolotravel.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
