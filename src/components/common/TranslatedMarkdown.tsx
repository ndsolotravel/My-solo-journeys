import React, {
  Fragment,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactNode,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useLanguage, useTranslations } from "@/lib/translate/store";

export interface TranslatedMarkdownProps {
  content: string;
  className?: string;
  isDbTranslated?: boolean;
}

export function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node) && node.props && typeof node.props === "object" && "children" in node.props) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export function translateMarkdownChildren(
  node: ReactNode,
  t: (text: string) => string,
): ReactNode {
  if (node == null || typeof node === "boolean") return node;

  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed) return node;
    // Skip purely numeric or punctuation strings
    if (/^[0-9\s.,/#!$%^&*;:{}=\-_`~()]+$/.test(trimmed)) return node;
    // Skip email addresses and raw URLs
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
    return node.map((child, i) => (
      <Fragment key={i}>
        {translateMarkdownChildren(child, t)}
      </Fragment>
    ));
  }

  if (typeof node === "object" && isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    // Do not translate code blocks
    if (el.type === "code" || el.type === "pre") return el;
    if (el.props && "children" in el.props) {
      return cloneElement(el, {
        ...el.props,
        children: translateMarkdownChildren(el.props.children, t),
      });
    }
  }

  return node;
}

export function TranslatedMarkdown({
  content,
  className,
  isDbTranslated = false,
}: TranslatedMarkdownProps) {
  const t = useTranslations();
  const { lang } = useLanguage();

  const components = useMemo<Components>(() => {
    if (lang === "en" || isDbTranslated) {
      return {};
    }

    return {
      h1: ({ children, ...props }) => (
        <h1 {...props}>{translateMarkdownChildren(children, t)}</h1>
      ),
      h2: ({ children, ...props }) => {
        const id = slugify(extractText(children));
        return (
          <h2 id={id} {...props}>
            {translateMarkdownChildren(children, t)}
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const id = slugify(extractText(children));
        return (
          <h3 id={id} {...props}>
            {translateMarkdownChildren(children, t)}
          </h3>
        );
      },
      h4: ({ children, ...props }) => (
        <h4 {...props}>{translateMarkdownChildren(children, t)}</h4>
      ),
      h5: ({ children, ...props }) => (
        <h5 {...props}>{translateMarkdownChildren(children, t)}</h5>
      ),
      h6: ({ children, ...props }) => (
        <h6 {...props}>{translateMarkdownChildren(children, t)}</h6>
      ),
      p: ({ children, ...props }) => (
        <p {...props}>{translateMarkdownChildren(children, t)}</p>
      ),
      li: ({ children, ...props }) => (
        <li {...props}>{translateMarkdownChildren(children, t)}</li>
      ),
      blockquote: ({ children, ...props }) => (
        <blockquote {...props}>{translateMarkdownChildren(children, t)}</blockquote>
      ),
      strong: ({ children, ...props }) => (
        <strong {...props}>{translateMarkdownChildren(children, t)}</strong>
      ),
      em: ({ children, ...props }) => (
        <em {...props}>{translateMarkdownChildren(children, t)}</em>
      ),
      a: ({ children, href, ...props }) => (
        <a href={href} {...props}>
          {translateMarkdownChildren(children, t)}
        </a>
      ),
      td: ({ children, ...props }) => (
        <td {...props}>{translateMarkdownChildren(children, t)}</td>
      ),
      th: ({ children, ...props }) => (
        <th {...props}>{translateMarkdownChildren(children, t)}</th>
      ),
      figcaption: ({ children, ...props }) => (
        <figcaption {...props}>{translateMarkdownChildren(children, t)}</figcaption>
      ),
    };
  }, [lang, isDbTranslated, t]);

  return (
    <div className={className}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
