import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * Lazy-loadable markdown renderer.
 *
 * `react-markdown` + `rehype-raw` are a large dependency that is only needed
 * once a page actually renders markdown, so consumers import this module
 * lazily (`React.lazy(() => import("./LazyMarkdown"))`) instead of importing
 * `react-markdown` directly.
 *
 * The important detail: `rehypeRaw` is a unified *plugin function*, not a
 * React component. It therefore cannot be produced by `React.lazy` — it has to
 * be imported statically inside this module, so that `rehypePlugins` receives
 * the real plugin.
 */
export default function LazyMarkdown({
  children,
  components,
}: {
  children: string;
  components?: Components;
}) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
