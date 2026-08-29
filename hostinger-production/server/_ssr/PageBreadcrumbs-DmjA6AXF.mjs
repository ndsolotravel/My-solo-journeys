import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslations } from "./router-BATWaepB.mjs";
import { n as ChevronRight } from "../_libs/lucide-react.mjs";
function PageBreadcrumbs({ items }) {
  const t = useTranslations();
  const all = [{ label: "Home", href: "/" }, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-wrap items-center gap-1.5 text-sm text-white/80", children: all.map((item, i) => {
    const isLast = i === all.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-1.5", children: [
      i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-accent" }),
      isLast || !item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: t(item.label) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.href,
          className: "hover:text-white transition-colors",
          children: t(item.label)
        }
      )
    ] }, i);
  }) }) });
}
function BreadcrumbJsonLd({ items }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const baseUrl = "https://ndsolotravel.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : void 0
    }))
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
    }
  );
}
export {
  BreadcrumbJsonLd as B,
  PageBreadcrumbs as P
};
