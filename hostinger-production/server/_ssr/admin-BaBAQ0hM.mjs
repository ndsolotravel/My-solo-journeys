import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { supabase } from "./client-BaIz-VBI.mjs";
import "../_libs/ws.mjs";
import { ab as LayoutDashboard, ac as ChartColumn, l as FileText, a4 as Radio, a6 as FolderTree, a8 as Image, m as MapPin, ad as House, U as User, ae as Contact, af as Scale, ag as MessageSquare, ah as Users, c as Mail, d as Megaphone, ai as Settings, L as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "events";
import "https";
import "http";
import "net";
import "tls";
import "url";
import "zlib";
import "buffer";
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
  to: "/admin/settings",
  label: "Settings",
  icon: Settings
}];
function AdminLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const isActive = (to, exact) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid min-h-[80vh] max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "md:sticky md:top-24 md:self-start md:max-h-[calc(100dvh-8rem)] md:overflow-y-auto md:overscroll-contain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "CMS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-0.5", children: NAV.map((n) => {
        const Icon = n.icon;
        const active = isActive(n.to, n.exact);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-foreground text-background" : "hover:bg-muted"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          n.label
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
