import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as useServerFn, w as adminGetUnreadCount } from "./router-B6m4P0F8.mjs";
import { s as supabase } from "./client-BqBvvzI9.mjs";
import "../_libs/sonner.mjs";
import "./server-7Z2Wk8DL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/ws.mjs";
import { ar as LayoutDashboard, as as ChartColumn, n as FileText, al as Radio, an as FolderTree, ap as Image, o as MapPin, at as House, U as User, au as Contact, av as Scale, aw as MessageSquare, a3 as Users, e as Mail, f as Megaphone, ax as Type, P as Palette, a2 as Settings, L as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-BLJWJFkS.mjs";
import "./auth-middleware-DFv8buKs.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./typography-DvZTlhwY.mjs";
import "../_libs/zod.mjs";
import "./colors-C0oqDCsc.mjs";
import "./posts.functions-Bt0QAIcW.mjs";
import "./server-cache-B0GOEAA-.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./categories.functions-BG32lH_N.mjs";
import "./topics-T4Y39Ysn.mjs";
import "./media-5OPpyOwL.mjs";
import "./admin.functions-CnEC2dM5.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const NAV = [{
  to: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/analytics",
  label: "Analytics",
  icon: ChartColumn
}, {
  to: "/admin/posts",
  label: "Posts",
  icon: FileText
}, {
  to: "/admin/news",
  label: "News",
  icon: Radio
}, {
  to: "/admin/categories",
  label: "Categories",
  icon: FolderTree
}, {
  to: "/admin/gallery",
  label: "Gallery",
  icon: Image
}, {
  to: "/admin/destinations",
  label: "Destinations",
  icon: MapPin
}, {
  to: "/admin/homepage",
  label: "Homepage",
  icon: House
}, {
  to: "/admin/about",
  label: "About Page",
  icon: User
}, {
  to: "/admin/contact",
  label: "Contact Page",
  icon: Contact
}, {
  to: "/admin/legal",
  label: "Legal Pages",
  icon: Scale
}, {
  to: "/admin/comments",
  label: "Comments",
  icon: MessageSquare
}, {
  to: "/admin/subscribers",
  label: "Subscribers",
  icon: Users
}, {
  to: "/admin/messages",
  label: "Messages",
  icon: Mail
}, {
  to: "/admin/public-message",
  label: "Public Message",
  icon: Megaphone
}, {
  to: "/admin/typography",
  label: "Typography",
  icon: Type
}, {
  to: "/admin/colors",
  label: "Colors",
  icon: Palette
}, {
  to: "/admin/settings",
  label: "Settings",
  icon: Settings
}];
function AdminLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const isActive = (to, exact) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  const unreadFn = useServerFn(adminGetUnreadCount);
  const {
    data: unreadCount = 0
  } = useQuery({
    queryKey: ["admin-messages-unread"],
    queryFn: async () => await unreadFn(),
    refetchInterval: 6e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-layout font-sans mx-auto grid min-h-[80vh] max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "md:sticky md:top-24 md:self-start md:max-h-[calc(100dvh-8rem)] md:overflow-y-auto md:overscroll-contain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "CMS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-0.5", children: NAV.map((n) => {
        const Icon = n.icon;
        const active = isActive(n.to, n.exact);
        const showCount = n.to === "/admin/messages" && unreadCount > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-foreground text-background" : "hover:bg-muted"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: n.label }),
          showCount && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${active ? "bg-brand text-brand-foreground" : "bg-accent text-accent-foreground"}`, children: unreadCount > 99 ? "99+" : unreadCount })
        ] }, n.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
      }, className: "mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign out"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
