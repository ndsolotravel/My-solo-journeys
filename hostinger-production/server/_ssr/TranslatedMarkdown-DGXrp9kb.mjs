import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTranslations, d as useLanguage } from "./router-oW7Y7AUy.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { r as rehypeRaw } from "../_libs/rehype-raw.mjs";
function extractText(node) {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (reactExports.isValidElement(node) && node.props && typeof node.props === "object" && "children" in node.props) {
    return extractText(node.props.children);
  }
  return "";
}
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}
function translateMarkdownChildren(node, t) {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;
    if (/^[0-9\s.,/#!$%^&*;:{}=\-_`~()]+$/.test(trimmed)) return node;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || /^https?:\/\//.test(trimmed)) {
      return node;
    }
    const translated = t(trimmed);
    const leading = node.match(/^\s*/)?.[0] || "";
    const trailing = node.match(/\s*$/)?.[0] || "";
    return leading + translated + trailing;
  }
  if (typeof node === "number") return node;
  if (Array.isArray(node)) {
    return node.map((child, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: translateMarkdownChildren(child, t) }, i));
  }
  if (typeof node === "object" && reactExports.isValidElement(node)) {
    const el = node;
    if (el.type === "code" || el.type === "pre") return el;
    if (el.props && "children" in el.props) {
      return reactExports.cloneElement(el, {
        ...el.props,
        children: translateMarkdownChildren(el.props.children, t)
      });
    }
  }
  return node;
}
function TranslatedMarkdown({
  content,
  className,
  isDbTranslated = false
}) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const components = reactExports.useMemo(() => {
    if (lang === "en" || isDbTranslated) {
      return {};
    }
    return {
      h1: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { ...props, children: translateMarkdownChildren(children, t) }),
      h2: ({ children, ...props }) => {
        const id = slugify(extractText(children));
        return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id, ...props, children: translateMarkdownChildren(children, t) });
      },
      h3: ({ children, ...props }) => {
        const id = slugify(extractText(children));
        return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id, ...props, children: translateMarkdownChildren(children, t) });
      },
      h4: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { ...props, children: translateMarkdownChildren(children, t) }),
      h5: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { ...props, children: translateMarkdownChildren(children, t) }),
      h6: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { ...props, children: translateMarkdownChildren(children, t) }),
      p: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ...props, children: translateMarkdownChildren(children, t) }),
      li: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ...props, children: translateMarkdownChildren(children, t) }),
      blockquote: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { ...props, children: translateMarkdownChildren(children, t) }),
      strong: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { ...props, children: translateMarkdownChildren(children, t) }),
      em: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("em", { ...props, children: translateMarkdownChildren(children, t) }),
      a: ({ children, href, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, ...props, children: translateMarkdownChildren(children, t) }),
      td: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props, children: translateMarkdownChildren(children, t) }),
      th: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { ...props, children: translateMarkdownChildren(children, t) }),
      figcaption: ({ children, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { ...props, children: translateMarkdownChildren(children, t) })
    };
  }, [lang, isDbTranslated, t]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], components, children: content }) });
}
export {
  TranslatedMarkdown as T
};
