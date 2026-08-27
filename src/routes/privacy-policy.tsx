import { createFileRoute } from "@tanstack/react-router";
import { useTranslations } from "@/lib/translate/store";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ndsolotravel" },
      {
        name: "description",
        content:
          "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — ndsolotravel" },
      {
        property: "og:description",
        content:
          "Privacy Policy for ndsolotravel. Learn how we collect, use, and protect your personal information.",
      },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
            { "@type": "ListItem", position: 2, name: "Privacy Policy" },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-[30vh] min-h-[220px] w-full overflow-hidden flex flex-col justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=2000&q=80"
          alt="Mountain landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-foreground shadow-sm mb-3">
            {t("Legal")}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {t("Privacy Policy")}
          </h1>
          <div className="mt-3">
            <PageBreadcrumbs items={[{ label: "Privacy Policy" }]} />
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
              {t("1. Information We Collect")}
            </h2>
            <p>
              {t(
                "When you visit ndsolotravel.com, we may automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies. We also collect information about how you interact with our site, including pages viewed and links clicked.",
              )}
            </p>
            <p>
              {t(
                "If you subscribe to our newsletter, comment on a post, or contact us, we may collect your name, email address, and any information you voluntarily provide.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("2. How We Use Your Information")}
            </h2>
            <p>{t("We use the information we collect to:")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("Operate and maintain the ndsolotravel website")}</li>
              <li>{t("Send newsletters and updates if you have subscribed")}</li>
              <li>{t("Respond to your messages and comments")}</li>
              <li>{t("Improve our content and user experience")}</li>
              <li>{t("Monitor and analyze usage patterns and trends")}</li>
              <li>{t("Protect against unauthorized access and ensure site security")}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("3. Cookies")}
            </h2>
            <p>
              {t(
                "ndsolotravel uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our site. You can control cookies through your browser settings. Disabling cookies may affect site functionality.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("4. Third-Party Services")}
            </h2>
            <p>
              {t(
                "We may use third-party services such as analytics providers, email marketing platforms, and content delivery networks. These services may collect information about your interactions with our site. We do not sell your personal information to third parties.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("5. Data Retention")}
            </h2>
            <p>
              {t(
                "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("6. Your Rights")}
            </h2>
            <p>
              {t(
                "You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at contact@ndsolotravel.com.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("7. Changes to This Policy")}
            </h2>
            <p>
              {t(
                "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
              )}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("8. Contact Us")}
            </h2>
            <p>
              {t(
                "If you have any questions about this Privacy Policy, please contact us at",
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
