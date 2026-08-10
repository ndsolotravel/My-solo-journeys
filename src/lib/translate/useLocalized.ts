import { useEffect, useMemo } from "react";
import { useTranslationStore } from "./store";
import type { Post } from "@/lib/posts.functions";
import type { Destination } from "@/lib/destinations.functions";
import type { GalleryItem } from "@/lib/gallery.functions";

function contentParagraphs(content: string): string[] {
  return content.split(/\n\s*\n/).filter(Boolean);
}

function localizePost(
  post: Post,
  lang: string,
  get: (text: string) => string,
  includeContent = false,
): Post {
  if (lang === "en") return post;
  const paragraphs = includeContent ? contentParagraphs(post.content) : [];
  return {
    ...post,
    title: get(post.title) || post.title,
    excerpt: post.excerpt ? get(post.excerpt) || post.excerpt : null,
    category: get(post.category) || post.category,
    tags: post.tags.map((t) => get(t) || t),
    content: paragraphs.map((p) => get(p) || p).join("\n\n") || post.content,
  };
}

function collectPostTexts(posts: Post[], includeContent = false): string[] {
  const out: string[] = [];
  for (const p of posts) {
    out.push(p.title, p.category);
    if (p.excerpt) out.push(p.excerpt);
    if (p.tags) out.push(...p.tags);
    if (includeContent) out.push(...contentParagraphs(p.content));
  }
  return out;
}

/**
 * Translate blog post fields (title, excerpt, category, tags, optional content body).
 * Content paragraphs (the long article body) are only translated when
 * `includeContent` is true (blog detail page) to keep card/list pages fast.
 */
export function useLocalizedPosts(posts: Post[], options?: { includeContent?: boolean }): Post[] {
  const store = useTranslationStore();
  const lang = store.lang;
  const includeContent = options?.includeContent ?? false;
  const texts = useMemo(() => collectPostTexts(posts, includeContent), [posts, includeContent]);

  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }

  useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);

  return useMemo(() => {
    if (lang === "en") return posts;
    const get = (t: string) => store.get(lang, t) ?? t;
    return posts.map((p) => localizePost(p, lang, get, includeContent));
  }, [posts, lang, store, includeContent]);
}

function localizeDestination(d: Destination, get: (text: string) => string): Destination {
  return {
    ...d,
    title: get(d.title) || d.title,
    country: get(d.country) || d.country,
    region: d.region ? get(d.region) || d.region : null,
    description: d.description ? get(d.description) || d.description : null,
  };
}

function collectDestinationTexts(list: Destination[]): string[] {
  const out: string[] = [];
  for (const d of list) {
    out.push(d.title, d.country);
    if (d.region) out.push(d.region);
    if (d.description) out.push(d.description);
  }
  return out;
}

/** Translate destination fields (title, country, region, description). */
export function useLocalizedDestinations(list: Destination[]): Destination[] {
  const store = useTranslationStore();
  const lang = store.lang;
  const texts = useMemo(() => collectDestinationTexts(list), [list]);

  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }

  useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);

  return useMemo(() => {
    if (lang === "en") return list;
    const get = (t: string) => store.get(lang, t) ?? t;
    return list.map((d) => localizeDestination(d, get));
  }, [list, lang, store]);
}

function collectGalleryTexts(items: GalleryItem[]): string[] {
  const out: string[] = [];
  for (const g of items) {
    if (g.caption) out.push(g.caption);
    if (g.category) out.push(g.category);
  }
  return out;
}

/** Translate gallery captions/categories. */
export function useLocalizedGallery(items: GalleryItem[]): GalleryItem[] {
  const store = useTranslationStore();
  const lang = store.lang;
  const texts = useMemo(() => collectGalleryTexts(items), [items]);

  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }

  useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);

  return useMemo(() => {
    if (lang === "en") return items;
    const get = (t: string) => store.get(lang, t) ?? t;
    return items.map((g) => ({
      ...g,
      caption: g.caption ? get(g.caption) || g.caption : null,
      category: g.category ? get(g.category) || g.category : null,
    }));
  }, [items, lang, store]);
}

/**
 * Translate one dynamic string (e.g. a photo caption) reactively.
 * Falls back to the original text when no translation is available yet.
 */
export function useLocalizedText(text: string | null): string {
  const store = useTranslationStore();
  const lang = store.lang;
  const value = text ?? "";

  if (lang !== "en" && value) {
    store.register(lang, [value]);
  }

  useEffect(() => {
    if (value) store.register(lang, [value]);
  }, [store, lang, value]);

  return value ? (store.get(lang, value) ?? value) : "";
}
