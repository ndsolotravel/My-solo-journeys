import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState, Fragment, isValidElement, cloneElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Clock, Share2, ArrowLeft, Star, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight, User, List, ArrowRight as ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPostBySlug, type Post } from "@/lib/posts.functions";
import { getBlogAuthorName } from "@/lib/settings.functions";
import { listComments, postComment, getPostRatingStats } from "@/lib/comments.functions";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPostMap } from "@/components/blog/BlogPostMap";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { AuthorProfile } from "@/components/blog/AuthorProfile";
import { PageBreadcrumbs, BreadcrumbJsonLd } from "@/components/layout/PageBreadcrumbs";
import { toast } from "sonner";
import { useTranslations, useLanguage } from "@/lib/translate/store";

const postQO = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

const authorNameQO = queryOptions({
  queryKey: ["blog-author-name"],
  queryFn: () => getBlogAuthorName(),
});

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const [data, authorName] = await Promise.all([
      context.queryClient.ensureQueryData(postQO(params.slug)),
      context.queryClient.ensureQueryData(authorNameQO),
    ]);
    if (!data.post) throw notFound();
    return { ...data, authorName: authorName || "Hussain" };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
    const authorName = p?.author_name || loaderData?.authorName || "Hussain";
    const title = p?.seo_title || (p ? `${p.title} — ndsolotravel` : "Story — ndsolotravel");
    const desc = p?.seo_description || p?.excerpt || "A solo travel story from ndsolotravel.";
    const image = p?.og_image_url || p?.cover_image;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        ...(image ? [{ property: "og:image", content: image }] : []),
        ...(image ? [{ name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: p
        ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://ndsolotravel.com" },
                { "@type": "ListItem", position: 2, name: "Stories", item: "https://ndsolotravel.com/blog" },
                { "@type": "ListItem", position: 3, name: p.title },
              ],
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: p.title,
              description: desc,
              image: image ?? undefined,
              datePublished: p.published_at ?? p.created_at,
              articleSection: p.category,
              keywords: p.tags?.join(", "),
              author: { "@type": "Person", name: authorName },
            }),
          },
        ]
        : [],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
});

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Story not found</h1>
      <p className="mt-2 text-muted-foreground">
        This trail has been moved or doesn't exist.
      </p>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to all stories
      </Link>
    </div>
  );
}

const pageTurnVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 70 : -70,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -70 : 70,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  }),
};

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node && (node as any).props?.children) {
    return extractText((node as any).props.children);
  }
  return "";
}

function translateMarkdownChildren(
  node: ReactNode,
  t: (text: string) => string,
  isDbTranslated: boolean,
): ReactNode {
  if (isDbTranslated || node == null || typeof node === "boolean") return node;
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;
    // Skip strings that are purely punctuation or numbers
    if (/^[0-9\s.,/#!$%^&*;:{}=\-_`~()]+$/.test(trimmed)) return node;
    return t(node);
  }
  if (typeof node === "number") return node;
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <Fragment key={i}>
        {translateMarkdownChildren(child, t, isDbTranslated)}
      </Fragment>
    ));
  }
  if (typeof node === "object" && isValidElement(node)) {
    const el = node as React.ReactElement<any>;
    if (el.type === "code" || el.type === "pre") return el;
    if (el.props && "children" in el.props) {
      return cloneElement(el, {
        ...el.props,
        children: translateMarkdownChildren(el.props.children, t, isDbTranslated),
      });
    }
  }
  return node;
}

function PostPage() {
  const loaderData = Route.useLoaderData();
  const { post, related } = loaderData;
  const { data: globalAuthor } = useQuery({
    ...authorNameQO,
    initialData: loaderData?.authorName,
  });
  const authorName = globalAuthor || loaderData?.authorName || "Hussain";
  const postAuthor = post?.author_name || authorName || "Hussain";
  const { lang } = useLanguage();
  const t = useTranslations();

  const dbTrans = useMemo(() => {
    if (!post || lang === "en") return null;
    return post.post_translations?.find((x: any) => x.language_code === lang) ?? null;
  }, [post, lang]);

  const isDbTranslated = !!dbTrans;

  const localizedPost = useMemo(() => {
    if (!post) return null;
    if (lang === "en") return post;
    if (dbTrans) {
      return {
        ...post,
        title: dbTrans.title || post.title,
        excerpt: dbTrans.excerpt || post.excerpt,
        content: dbTrans.content || post.content,
        category: dbTrans.category || post.category,
        seo_title: dbTrans.seo_title || post.seo_title,
        seo_description: dbTrans.seo_description || post.seo_description,
      };
    }
    return {
      ...post,
      title: t(post.title),
      excerpt: post.excerpt ? t(post.excerpt) : post.excerpt,
      content: post.content,
      category: t(post.category),
      seo_title: post.seo_title ? t(post.seo_title) : post.seo_title,
      seo_description: post.seo_description ? t(post.seo_description) : post.seo_description,
    };
  }, [post, lang, dbTrans, t]);

  const localizedRelated = related;

  // Auto-generate Table of Contents from H2 & H3 headings
  const toc = useMemo(() => {
    if (!localizedPost?.content) return [];
    const lines = localizedPost.content.split("\n");
    const items: { id: string; text: string; level: number }[] = [];
    lines.forEach((line: string) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim().replace(/[*_~`]/g, "");
        const id = rawText.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        const text = isDbTranslated ? rawText : t(rawText);
        items.push({ id, text, level });
      }
    });
    return items;
  }, [localizedPost, isDbTranslated, t]);

  const [[activeImageIndex, direction], setActiveImageState] = useState<[number | null, number]>([null, 0]);

  const gallery = post?.gallery ?? [];
  const activeItem = activeImageIndex !== null ? gallery[activeImageIndex] : null;

  const handlePrevImage = () => {
    if (activeImageIndex === null || gallery.length === 0) return;
    setActiveImageState(([curr]) => (curr === null ? [null, 0] : [(curr - 1 + gallery.length) % gallery.length, -1]));
  };

  const handleNextImage = () => {
    if (activeImageIndex === null || gallery.length === 0) return;
    setActiveImageState(([curr]) => (curr === null ? [null, 0] : [(curr + 1) % gallery.length, 1]));
  };

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setActiveImageState([null, 0]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, gallery.length]);

  if (!post || !localizedPost) return null;

  const date = new Date(post.published_at ?? post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTravelDate = post.travel_date
    ? new Date(post.travel_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : null;

  const prevStory = localizedRelated[0] ?? null;
  const nextStory = localizedRelated[1] ?? null;

  return (
    <article className="pb-24">
      <ReadingProgress />

      {/* Cover */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={localizedPost.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-12 text-white sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <PageBreadcrumbs
              items={[
                { label: "Stories", href: "/blog" },
                { label: localizedPost.title },
              ]}
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">
            {t(localizedPost.category)}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            {localizedPost.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <User className="h-3.5 w-3.5 text-accent" /> By {postAuthor} · ndsolotravel
            </span>
            <span aria-hidden>·</span>
            <span>{date}</span>
            {formattedTravelDate && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1 text-amber-200">
                  <Calendar className="h-3 w-3" /> {t("Traveled on")} {formattedTravelDate}
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.reading_minutes} {t("min read")}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        {localizedPost.excerpt && (
          <p className="font-display text-xl leading-relaxed text-muted-foreground border-l-2 border-accent pl-4 py-1 italic">
            {localizedPost.excerpt}
          </p>
        )}

        {/* Table of Contents sidebar/box for long articles */}
        {toc.length > 2 && (
          <nav aria-label={t("Table of Contents")} className="my-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground mb-3">
              <List className="h-4 w-4 text-accent" />
              <span>{t("Expedition Contents")}</span>
            </div>
            <ul className="space-y-2 text-xs">
              {toc.map((item) => (
                <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1.25rem" : "0" }}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent/60" />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="prose-blog mt-8">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => {
                const raw = extractText(children);
                const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                  <h1 id={id} className="scroll-mt-24 font-display text-3xl font-bold mt-10 mb-4 text-foreground">
                    {translateMarkdownChildren(children, t, isDbTranslated)}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const raw = extractText(children);
                const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                  <h2 id={id} className="scroll-mt-24 font-display text-2xl font-bold mt-10 mb-4 text-foreground">
                    {translateMarkdownChildren(children, t, isDbTranslated)}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const raw = extractText(children);
                const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                  <h3 id={id} className="scroll-mt-24 font-display text-xl font-semibold mt-8 mb-3 text-foreground">
                    {translateMarkdownChildren(children, t, isDbTranslated)}
                  </h3>
                );
              },
              h4: ({ children }) => {
                const raw = extractText(children);
                const id = raw.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                return (
                  <h4 id={id} className="scroll-mt-24 font-display text-lg font-semibold mt-6 mb-2 text-foreground">
                    {translateMarkdownChildren(children, t, isDbTranslated)}
                  </h4>
                );
              },
              p: ({ children }) => (
                <p className="leading-relaxed mb-5 text-foreground">
                  {translateMarkdownChildren(children, t, isDbTranslated)}
                </p>
              ),
              li: ({ children }) => (
                <li className="mb-2 leading-relaxed text-foreground">
                  {translateMarkdownChildren(children, t, isDbTranslated)}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-4 border-accent bg-muted/40 py-3.5 px-5 italic rounded-r-xl text-base text-foreground shadow-sm">
                  {translateMarkdownChildren(children, t, isDbTranslated)}
                </blockquote>
              ),
              figcaption: ({ children }) => (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
                  {translateMarkdownChildren(children, t, isDbTranslated)}
                </figcaption>
              ),
              img: ({ src, alt, ...props }) => (
                <img
                  src={src}
                  alt={alt && !isDbTranslated ? t(alt) : alt}
                  referrerPolicy="no-referrer"
                  className="my-6 rounded-2xl w-full object-cover"
                  {...props}
                />
              ),
            }}
          >
            {localizedPost.content}
          </ReactMarkdown>

          {/* Interactive Map Location */}
          {post.latitude != null && post.longitude != null && (
            <BlogPostMap
              locationName={post.location_name}
              latitude={post.latitude}
              longitude={post.longitude}
              title={localizedPost.title}
            />
          )}
        </div>

        {/* Multi-Photo Gallery Grid */}
        {gallery.length > 0 && (
          <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold flex items-center gap-2 mb-4">
              <ImageIcon className="h-5 w-5 text-accent" /> {t("Photo Gallery")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item: any, idx: number) => (
                <motion.div
                  key={item.id || idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveImageState([idx, 0])}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-muted/30 aspect-4/3"
                >
                  <img
                    src={item.image_url}
                    alt={item.alt_text || `${localizedPost.title} photo ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.alt_text && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 line-clamp-2">
                      {item.alt_text}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Modal Lightbox */}
        {activeItem && activeImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md transition-all duration-300"
            onClick={() => setActiveImageState([null, 0])}
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-[52]">
              <span className="rounded-full bg-black/75 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg">
                {activeImageIndex + 1} / {gallery.length}
              </span>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageState([null, 0]);
              }}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-[52] flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md hover:bg-black/95 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Active Image Container with Overlay Arrow Buttons and 3D Page Turn Animation */}
            <div
              className="relative flex max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 [perspective:1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={activeItem.id || activeImageIndex}
                  src={activeItem.image_url}
                  alt={activeItem.alt_text || "Zoomed photo"}
                  custom={direction}
                  variants={pageTurnVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] rounded-2xl object-contain select-none shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                />
              </AnimatePresence>

              {/* Left Arrow Button - OVER THE IMAGE */}
              {gallery.length > 1 && (
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent"
                >
                  <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md" />
                </button>
              )}

              {/* Right Arrow Button - OVER THE IMAGE */}
              {gallery.length > 1 && (
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white border-2 border-white/40 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent"
                >
                  <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-md" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            {activeItem.alt_text && (
              <div
                className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[52] max-w-lg w-[90vw] text-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="inline-block rounded-2xl bg-black/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-white border border-white/20 backdrop-blur-md shadow-xl">
                  {activeItem.alt_text}
                </p>
              </div>
            )}
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                to="/blog"
                search={{ tag }}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <AuthorProfile authorName={postAuthor} postTitle={localizedPost.title} />

        <ShareBar title={localizedPost.title} />

        {/* Previous / Next Story Navigation */}
        {(prevStory || nextStory) && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 border-t border-border pt-8">
            {prevStory ? (
              <Link
                to="/blog/$slug"
                params={{ slug: prevStory.slug }}
                className="group flex flex-col p-4 rounded-2xl border border-border hover:border-accent/50 transition-colors"
              >
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> {t("Previous Story")}
                </span>
                <span className="mt-2 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {t(prevStory.title)}
                </span>
              </Link>
            ) : <div />}
            {nextStory ? (
              <Link
                to="/blog/$slug"
                params={{ slug: nextStory.slug }}
                className="group flex flex-col p-4 rounded-2xl border border-border hover:border-accent/50 transition-colors text-right"
              >
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-end gap-1">
                  {t("Next Story")} <ArrowRightIcon className="h-3 w-3" />
                </span>
                <span className="mt-2 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {t(nextStory.title)}
                </span>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Article Bottom Newsletter Dispatch CTA */}
        <section className="mt-14 rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 text-center shadow-xs">
          <h3 className="font-display text-2xl font-bold">{t("Enjoyed this dispatch?")}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            {t("Get an email when a new expedition story drops. No spam, no algorithm noise.")}
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </section>

        <CommentsSection postId={post.id} />
      </div>

      {/* Related */}
      {localizedRelated.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold">{t("Keep reading")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {localizedRelated.map((p: Post, i: number) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ShareBar({ title }: { title: string }) {
  const t = useTranslations();
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent(url);
  const tt = encodeURIComponent(title);
  return (
    <div className="mt-10 flex items-center gap-3 border-y border-border py-4">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{t("Share")}</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${enc}&text=${tt}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs hover:text-accent"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs hover:text-accent"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs hover:text-accent"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success(t("Link copied"));
        }}
        className="ml-auto text-xs text-muted-foreground hover:text-accent"
      >
        {t("Copy link")}
      </button>
    </div>
  );
}

function StarDisplay({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  return (
    <div className="inline-flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.15 }}
          className="rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Star
            className={`h-7 w-7 transition-colors ${i <= active ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
              }`}
          />
        </motion.button>
      ))}
    </div>
  );
}

function CommentsSection({ postId }: { postId: string }) {
  const t = useTranslations();
  const listFn = useServerFn(listComments);
  const postFn = useServerFn(postComment);
  const statsFn = useServerFn(getPostRatingStats);
  const qc = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => listFn({ data: { post_id: postId } }),
  });
  const { data: stats } = useQuery({
    queryKey: ["rating-stats", postId],
    queryFn: () => statsFn({ data: { post_id: postId } }),
  });

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [website, setWebsite] = useState(""); // honeypot
  const [submittedAt, setSubmittedAt] = useState(0);

  const mut = useMutation({
    mutationFn: () =>
      postFn({
        data: {
          post_id: postId,
          comment: text,
          guest_name: name.trim() || undefined,
          guest_email: email.trim() || undefined,
          rating: rating || undefined,
          website,
        },
      }),
    onSuccess: () => {
      setText("");
      setRating(0);
      toast.success(t("Post review"));
      qc.invalidateQueries({ queryKey: ["comments", postId] });
      qc.invalidateQueries({ queryKey: ["rating-stats", postId] });
    },
    onError: (e: Error) => toast.error(e.message || t("Could not post review")),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return toast.error(t("Please write a review"));
    const now = Date.now();
    if (now - submittedAt < 4000) return;
    setSubmittedAt(now);
    mut.mutate();
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-2xl font-bold">{t("Reviews & Comments")}</h3>
        {stats && stats.count > 0 && (
          <div className="flex items-center gap-3">
            <StarDisplay value={stats.average} size={18} />
            <span className="text-sm text-muted-foreground">
              {stats.average.toFixed(1)} · {stats.count}{" "}
              {stats.count === 1 ? t("rating") : t("ratings")}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium">{t("Your rating")}</label>
          <StarPicker value={rating} onChange={setRating} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Name (optional)")}
            maxLength={80}
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email (optional, not shown)")}
            maxLength={255}
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder={t("Share your thoughts…")}
          className="mt-3 w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-accent"
          required
        />
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto h-0 w-0 opacity-0"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {t("No account needed. Email is private.")}
          </p>
          <button
            type="submit"
            disabled={mut.isPending || !text.trim()}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {mut.isPending ? "…" : t("Post review")}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-6">
        {(comments ?? []).map((c, i) => {
          const displayName = c.guest_name || c.author?.username || "Traveller";
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.2) }}
              className="border-b border-border pb-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold uppercase">
                    {displayName.slice(0, 1)}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{displayName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {c.rating ? <StarDisplay value={c.rating} /> : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{c.comment}</p>
            </motion.div>
          );
        })}
        {comments && comments.length === 0 && (
          <p className="text-sm text-muted-foreground">Be the first to leave a review.</p>
        )}
      </div>
    </section>
  );
}
