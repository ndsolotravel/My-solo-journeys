import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  MessageSquare,
  Mail,
  LogOut,
  BarChart3,
  Users,
  Image as ImageIcon,
  Settings,
  Home,
} from "lucide-react";
import { getMyRoles } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    let roles: string[] = [];
    try {
      roles = await getMyRoles();
    } catch {
      throw redirect({
        to: "/auth",
        search: { redirect: "/admin" },
      });
    }

    if (!roles.includes("admin") && !roles.includes("editor")) {
      throw redirect({
        to: "/auth",
        search: { redirect: "/admin", error: "unauthorized_admin" },
      });
    }

    return { roles };
  },
  head: () => ({
    meta: [{ title: "Admin — ndsolotravel" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminLayout,
});

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/homepage", label: "Homepage", icon: Home },
  { to: "/admin/comments", label: "Comments", icon: MessageSquare },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8">
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="rounded-2xl border border-border bg-background p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            CMS
          </p>
          <nav className="flex flex-col gap-0.5">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = isActive(n.to, n.exact);
              return (
                <Link
                  key={n.to}
                  to={n.to as "/admin"}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active ? "bg-foreground text-background" : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
