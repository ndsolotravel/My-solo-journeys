import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
const __vite_import_meta_env__ = {};
function getFormatSizeClasses(format) {
  switch (format) {
    case "horizontal":
      return "min-h-[100px] sm:min-h-[90px] max-w-[320px] sm:max-w-[728px] lg:max-w-[970px]";
    case "rectangle":
      return "min-h-[250px] max-w-[300px] sm:max-w-[336px]";
    case "in-feed":
      return "min-h-[120px] sm:min-h-[140px] max-w-full";
    case "auto":
    default:
      return "min-h-[100px] sm:min-h-[90px] max-w-full";
  }
}
function AdSlot({
  label = "Advertisement",
  slotId,
  clientId,
  format = "horizontal",
  fullWidthResponsive = true,
  className = "",
  heightClass
}) {
  const adRef = reactExports.useRef(null);
  const resolvedClientId = clientId || typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_ADSENSE_CLIENT_ID || "";
  const isAdSenseActive = typeof window !== "undefined" && Boolean(window.adsbygoogle && resolvedClientId && slotId);
  reactExports.useEffect(() => {
    if (isAdSenseActive && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
      }
    }
  }, [isAdSenseActive, slotId]);
  const sizeClasses = heightClass || getFormatSizeClasses(format);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "presentation",
      "aria-hidden": "true",
      "data-ad-format": format,
      "data-ad-slot": slotId,
      className: `ad-container relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/60 bg-muted/20 text-center transition-colors dark:bg-card/20 ${sizeClasses} ${className}`,
      children: isAdSenseActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "ins",
        {
          ref: adRef,
          className: "adsbygoogle block w-full text-center",
          style: { display: "block" },
          "data-ad-client": resolvedClientId,
          "data-ad-slot": slotId,
          "data-ad-format": format === "auto" ? "auto" : void 0,
          "data-full-width-responsive": fullWidthResponsive ? "true" : "false"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col items-center justify-center p-3 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60", children: label }) })
    }
  );
}
export {
  AdSlot as A
};
