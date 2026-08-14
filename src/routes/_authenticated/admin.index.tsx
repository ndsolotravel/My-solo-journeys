import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Eye, MessageSquare, Mail, Users, BarChart3, Activity, ArrowRight } from "lucide-react";
import { adminAnalytics } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const fn = useServerFn(adminAnalytics);
  const { data, isLoading } = useQuery<any>({ queryKey: ["admin-analytics"], queryFn: async () => await fn() });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overview of your content and audience.</p>
        </div>
        <Link
          to="/admin/analytics"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground hover:opacity-90 transition shadow-xs"
        >
          <BarChart3 className="h-4 w-4" /> Live Analytics Dashboard <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={FileText} label="Posts" value={data?.posts} sub={`${data?.published ?? 0} published`} loading={isLoading} />
        <Stat icon={Eye} label="Total views" value={data?.totalViews} loading={isLoading} />
        <Stat icon={MessageSquare} label="Comments" value={data?.comments} sub={data?.avgRating ? `★ ${data.avgRating} avg` : undefined} loading={isLoading} />
        <Stat icon={Users} label="Subscribers" value={data?.subscribers} loading={isLoading} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <SmallStat label="Drafts" value={data?.drafts} />
        <SmallStat label="Scheduled" value={data?.scheduled} />
        <SmallStat label="Messages" value={data?.messages} icon={Mail} />
      </div>

      <div className="mt-10 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Most viewed</h2>
          <Link to="/admin/posts" className="text-xs text-accent hover:underline">All posts →</Link>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {(data?.topPosts ?? []).map((p: any) => (
            <li key={p.id} className="flex items-center justify-between py-3 text-sm">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-accent line-clamp-1">{p.title}</Link>
              <span className="text-muted-foreground inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views}</span>
            </li>
          ))}
          {data?.topPosts.length === 0 && <p className="py-6 text-sm text-muted-foreground">No published posts yet.</p>}
        </ul>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub, loading }: { icon: React.ElementType; label: string; value?: number; sub?: string; loading?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-2 font-display text-3xl font-bold">{loading ? "—" : (value ?? 0).toLocaleString()}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
function SmallStat({ label, value, icon: Icon }: { label: string; value?: number; icon?: React.ElementType }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">{Icon && <Icon className="h-3.5 w-3.5" />} {label}</p>
      <p className="mt-1 text-2xl font-semibold">{(value ?? 0).toLocaleString()}</p>
    </div>
  );
}
