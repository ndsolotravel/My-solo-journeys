import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { getDestinationBySlug } from "@/lib/destinations.functions";
import { useLocalizedDestinations } from "@/lib/translate/useLocalized";
import { useTranslator, useT } from "@/lib/translate/store";

const qo = (slug: string) =>
  queryOptions({
    queryKey: ["destination", slug],
    queryFn: () => getDestinationBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ params, context }) => {
    const d = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — ndsolotravel` : "Destination" },
      { name: "description", content: loaderData?.description ?? "Destination guide." },
      { property: "og:title", content: loaderData?.title ?? "Destination" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:url", content: `/destinations/${params.slug}` },
      ...(loaderData?.featured_image
        ? [{ property: "og:image", content: loaderData.featured_image }]
        : []),
    ],
    links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
  }),
  notFoundComponent: DestinationNotFound,
});

function DestinationNotFound() {
  const t = useTranslator(["Destination not found", "All destinations"]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t("Destination not found")}</h1>
      <Link to="/destinations" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> {t("All destinations")}
      </Link>
    </div>
  );
}

function DestinationPage() {
  const d = Route.useLoaderData();
  const localized = useLocalizedDestinations([d ?? ({} as never)]).at(0) ?? d;
  const t = useT;
  return (
    <article>
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {d.featured_image && (
          <img
            src={d.featured_image}
            alt={localized.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-12 text-white sm:px-6">
          <Link to="/destinations" className="text-xs text-white/80 hover:text-white">
            <ArrowLeft className="mr-1 inline h-3 w-3" /> {t("Destinations")}
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">
            {localized.country}
            {localized.region ? ` · ${localized.region}` : ""}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">{localized.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-relaxed text-muted-foreground">{localized.description}</p>
      </div>
    </article>
  );
}
