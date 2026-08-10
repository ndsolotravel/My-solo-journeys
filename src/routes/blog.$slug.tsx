import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Clock, Share2, ArrowLeft, Star, MapPin, Calendar, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { getPostBySlug } from "@/lib/posts.functions";
import { listComments, postComment, getPostRatingStats } from "@/lib/comments.functions";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { useLocalizedPosts } from "@/lib/translate/useLocalized";
import { useTranslator } from "@/lib/translate/store";
import { toast } from "sonner";

const postQO = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(postQO(params.slug));
    if (!data.post) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.post;
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
                "@type": "Article",
                headline: p.title,
                description: desc,
                image: image ?? undefined,
                datePublished: p.published_at ?? p.created_at,
                articleSection: p.category,
                keywords: p.tags?.join(", "),
                author: { "@type": "Person", name: "ndsolotravel" },
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
  const t = useTranslator([
    "Story not found",
    "This trail has been moved or doesn't exist.",
    "Back to all stories",
  ]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t("Story not found")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("This trail has been moved or doesn't exist.")}
      </p>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="h-4 w-4" /> {t("Back to all stories")}
      </Link>
    </div>
  );
}

function PostPage() {
  const { post, related } = Route.useLoaderData();

  const localizedPost = useLocalizedPosts(post ? [post] : [], { includeContent: true })[0] ?? post;
  const localizedRelated = useLocalizedPosts(related);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const t = useTranslator([
    "Stories",
    "min read",
    "Keep reading",
    "Story not found",
    "This trail has been moved or doesn't exist.",
    "Back to all stories",
    "Reviews & Comments",
    "rating",
    "ratings",
    "Your rating",
    "Name (optional)",
    "Email (optional, not shown)",
    "Share your thoughts…",
    "No account needed. Email is private.",
    "Post review",
    "Posting…",
    "Be the first to leave a review.",
    "Could not post review",
    "Please write a review",
    "Share",
    "Facebook",
    "LinkedIn",
    "Copy link",
    "Link copied",
    "Reviews & Comments",
    "Your rating",
    "Rating",
    "Review posted",
    "Traveller",
    "Photo Gallery",
    "Traveled on",
    "Destination",
  ]);

  if (!post) return null;

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

  const dest = post.destinations as { title: string; slug: string } | null;
  const gallery = post.gallery ?? [];

  return (
    <article className="pb-24">
      <ReadingProgress />

      {/* Cover */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={localizedPost.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-12 text-white sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" /> {t("Stories")}
            </Link>
            {dest && (
              <Link
                to="/destinations/$slug"
                params={{ slug: dest.slug }}
                className="inline-flex items-center gap-1 rounded-full bg-accent/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-amber-300 hover:bg-accent/30 transition-colors"
              >
                <MapPin className="h-3 w-3" /> {dest.title}
              </Link>
            )}
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">
            {localizedPost.category}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
            {localizedPost.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/80">
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
        {post.excerpt && (
          <p className="font-display text-xl leading-relaxed text-muted-foreground">
            {localizedPost.excerpt}
          </p>
        )}
        <div className="prose-blog mt-8">
          <ReactMarkdown>{localizedPost.content}</ReactMarkdown>
        </div>

        {/* Multi-Photo Gallery Grid */}
        {gallery.length > 0 && (
          <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold flex items-center gap-2 mb-4">
              <ImageIcon className="h-5 w-5 text-accent" /> {t("Photo Gallery")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveImage(item.image_url)}
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
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs"
            onClick={() => setActiveImage(null)}
          >
            <img
              src={activeImage}
              alt="Zoomed photo"
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
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
                #{t(tag)}
              </Link>
            ))}
          </div>
        )}

        <ShareBar title={localizedPost.title} t={t} />

        <CommentsSection postId={post.id} t={t} />
      </div>

      {/* Related */}
      {localizedRelated.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold">{t("Keep reading")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {localizedRelated.map((p, i: number) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ShareBar({ title, t }: { title: string; t: (text: string) => string }) {
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
        {t("Facebook")}
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs hover:text-accent"
      >
        {t("LinkedIn")}
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
            className={`h-7 w-7 transition-colors ${
              i <= active ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}

function CommentsSection({ postId, t }: { postId: string; t: (text: string) => string }) {
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
      toast.success(t("Review posted"));
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
          const displayName = c.guest_name || c.author?.username || t("Traveller");
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
          <p className="text-sm text-muted-foreground">{t("Be the first to leave a review.")}</p>
        )}
      </div>
    </section>
  );
}
