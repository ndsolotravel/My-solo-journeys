import { r as reactExports } from "../_libs/react.mjs";
import { d as useTranslationStore } from "./router-Dk8gz-sr.mjs";
function contentParagraphs(content) {
  return content.split(/\n\s*\n/).filter(Boolean);
}
function localizePost(post, lang, get, includeContent = false) {
  if (lang === "en") return post;
  const paragraphs = includeContent ? contentParagraphs(post.content) : [];
  return {
    ...post,
    title: get(post.title) || post.title,
    excerpt: post.excerpt ? get(post.excerpt) || post.excerpt : null,
    category: get(post.category) || post.category,
    tags: post.tags.map((t) => get(t) || t),
    content: paragraphs.map((p) => get(p) || p).join("\n\n") || post.content
  };
}
function collectPostTexts(posts, includeContent = false) {
  const out = [];
  for (const p of posts) {
    out.push(p.title, p.category);
    if (p.excerpt) out.push(p.excerpt);
    if (p.tags) out.push(...p.tags);
    if (includeContent) out.push(...contentParagraphs(p.content));
  }
  return out;
}
function useLocalizedPosts(posts, options) {
  const store = useTranslationStore();
  const lang = store.lang;
  const includeContent = options?.includeContent ?? false;
  const texts = reactExports.useMemo(() => collectPostTexts(posts, includeContent), [posts, includeContent]);
  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }
  reactExports.useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);
  return reactExports.useMemo(() => {
    if (lang === "en") return posts;
    const get = (t) => store.get(lang, t) ?? t;
    return posts.map((p) => localizePost(p, lang, get, includeContent));
  }, [posts, lang, store, includeContent]);
}
function localizeDestination(d, get) {
  return {
    ...d,
    title: get(d.title) || d.title,
    country: get(d.country) || d.country,
    region: d.region ? get(d.region) || d.region : null,
    description: d.description ? get(d.description) || d.description : null
  };
}
function collectDestinationTexts(list) {
  const out = [];
  for (const d of list) {
    out.push(d.title, d.country);
    if (d.region) out.push(d.region);
    if (d.description) out.push(d.description);
  }
  return out;
}
function useLocalizedDestinations(list) {
  const store = useTranslationStore();
  const lang = store.lang;
  const texts = reactExports.useMemo(() => collectDestinationTexts(list), [list]);
  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }
  reactExports.useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);
  return reactExports.useMemo(() => {
    if (lang === "en") return list;
    const get = (t) => store.get(lang, t) ?? t;
    return list.map((d) => localizeDestination(d, get));
  }, [list, lang, store]);
}
function collectGalleryTexts(items) {
  const out = [];
  for (const g of items) {
    if (g.caption) out.push(g.caption);
    if (g.category) out.push(g.category);
  }
  return out;
}
function useLocalizedGallery(items) {
  const store = useTranslationStore();
  const lang = store.lang;
  const texts = reactExports.useMemo(() => collectGalleryTexts(items), [items]);
  if (lang !== "en" && texts.length) {
    store.register(lang, texts);
  }
  reactExports.useEffect(() => {
    store.register(lang, texts);
  }, [store, lang, texts]);
  return reactExports.useMemo(() => {
    if (lang === "en") return items;
    const get = (t) => store.get(lang, t) ?? t;
    return items.map((g) => ({
      ...g,
      caption: g.caption ? get(g.caption) || g.caption : null,
      category: g.category ? get(g.category) || g.category : null
    }));
  }, [items, lang, store]);
}
function useLocalizedText(text) {
  const store = useTranslationStore();
  const lang = store.lang;
  const value = text ?? "";
  if (lang !== "en" && value) {
    store.register(lang, [value]);
  }
  reactExports.useEffect(() => {
    if (value) store.register(lang, [value]);
  }, [store, lang, value]);
  return value ? store.get(lang, value) ?? value : "";
}
export {
  useLocalizedPosts as a,
  useLocalizedDestinations as b,
  useLocalizedText as c,
  useLocalizedGallery as u
};
