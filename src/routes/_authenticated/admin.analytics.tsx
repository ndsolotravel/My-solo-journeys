import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Eye,
  Calendar,
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  Share2,
  RefreshCw,
  TrendingUp,
  FileText,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getAdminAnalyticsDetails, PeriodOption } from "@/lib/analytics.functions";

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Hit Counter — Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminAnalyticsPage,
});

function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<PeriodOption>("30d");
  const fn = useServerFn(getAdminAnalyticsDetails);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<any>({
    queryKey: ["admin-analytics-details", period],
    queryFn: async () => await fn({ data: { period } }),
    refetchInterval: 10_000, // auto refresh live stats every 10s
  });

  // Client-side mounted state for Recharts SSR safety
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight">Live Analytics</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Real-time Active
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Audience statistics, traffic sources, popular pages, and live active session tracking.
          </p>
        </div>

        {/* Time Period Filter & Refresh */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border border-border bg-background p-1 text-xs">
            {(["7d", "30d", "90d", "all"] as PeriodOption[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  period === p
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "All Time"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition disabled:opacity-50"
            title="Refresh analytics"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Live Now */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Now
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Activity className="h-4 w-4 animate-pulse" />
            </div>
          </div>
          <p className="mt-3 font-display text-4xl font-extrabold text-foreground">
            {isLoading ? "—" : (data?.liveNow ?? 0)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Active within last 5 minutes
          </p>
        </div>

        {/* Total Visitors */}
        <StatCard
          icon={Users}
          label="Total Visitors"
          value={data?.totalVisitors}
          sub="Unique session IDs tracked"
          loading={isLoading}
        />

        {/* Total Page Views */}
        <StatCard
          icon={Eye}
          label="Total Page Views"
          value={data?.totalPageViews}
          sub="Overall page views recorded"
          loading={isLoading}
        />

        {/* Today's Visitors */}
        <StatCard
          icon={Calendar}
          label="Today's Visitors"
          value={data?.todayVisitors}
          sub={data ? `${data.yesterdayVisitors ?? 0} visitors yesterday` : undefined}
          loading={isLoading}
        />

        {/* Today's Page Views */}
        <StatCard
          icon={TrendingUp}
          label="Today's Page Views"
          value={data?.todayPageViews}
          sub="Views recorded today"
          loading={isLoading}
        />
      </div>

      {/* Error state */}
      {isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-center text-sm text-destructive">
          Failed to load analytics data. Please check your database connection or try again.
          <button
            onClick={() => void refetch()}
            className="ml-3 font-semibold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Traffic Over Time Chart */}
      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Traffic Trends
            </h2>
            <p className="text-xs text-muted-foreground">
              Daily breakdown of unique visitors and page views over time.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <span className="h-3 w-3 rounded-full bg-accent inline-block"></span> Unique Visitors
            </span>
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <span className="h-3 w-3 rounded-full bg-indigo-500 inline-block"></span> Page Views
            </span>
          </div>
        </div>

        <div className="mt-6 h-[300px] w-full">
          {isLoading || !mounted ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading chart data...
            </div>
          ) : (data?.trafficOverTime ?? []).length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No traffic recorded for this period yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.trafficOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#pageViewsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Unique Visitors"
                  stroke="#FF7A00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#visitorsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Row 3: Popular Pages & Top Blog Posts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Popular Pages */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              Popular Pages
            </h2>
            <span className="text-xs text-muted-foreground">Most Visited Paths</span>
          </div>

          <div className="mt-4 divide-y divide-border">
            {isLoading ? (
              <p className="py-8 text-center text-xs text-muted-foreground">Loading popular pages...</p>
            ) : (data?.popularPages ?? []).length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">No page views recorded yet.</p>
            ) : (
              data?.popularPages.map((page: any) => (
                <div key={page.path} className="py-3 space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-xs text-foreground font-semibold truncate max-w-[70%]">
                      {page.path}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {page.views.toLocaleString()} views ({page.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, page.percentage))}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Blog Posts */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Top Blog Posts
            </h2>
            <Link to="/admin/posts" className="text-xs text-accent hover:underline flex items-center gap-1">
              Manage Posts <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {isLoading ? (
              <p className="py-8 text-center text-xs text-muted-foreground">Loading top blog posts...</p>
            ) : (data?.topPosts ?? []).length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">No blog posts available.</p>
            ) : (
              data?.topPosts.map((post: any) => (
                <div key={post.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="font-medium text-sm text-foreground hover:text-accent truncate block"
                      >
                        {post.title}
                      </Link>
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground bg-muted px-2.5 py-1 rounded-md">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Row 4: Device Statistics & Traffic Sources */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Device Statistics */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 pb-4 border-b border-border">
            <Laptop className="h-5 w-5 text-accent" />
            Device Breakdown
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <DeviceCard
              icon={Laptop}
              label="Desktop"
              percentage={data?.deviceStats.desktop ?? 0}
              count={data?.deviceStats.counts.desktop ?? 0}
            />
            <DeviceCard
              icon={Smartphone}
              label="Mobile"
              percentage={data?.deviceStats.mobile ?? 0}
              count={data?.deviceStats.counts.mobile ?? 0}
            />
            <DeviceCard
              icon={Tablet}
              label="Tablet"
              percentage={data?.deviceStats.tablet ?? 0}
              count={data?.deviceStats.counts.tablet ?? 0}
            />
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="bg-accent transition-all duration-500"
                style={{ width: `${data?.deviceStats.desktop ?? 0}%` }}
                title={`Desktop: ${data?.deviceStats.desktop}%`}
              ></div>
              <div
                className="bg-indigo-500 transition-all duration-500"
                style={{ width: `${data?.deviceStats.mobile ?? 0}%` }}
                title={`Mobile: ${data?.deviceStats.mobile}%`}
              ></div>
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${data?.deviceStats.tablet ?? 0}%` }}
                title={`Tablet: ${data?.deviceStats.tablet}%`}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-accent"></span> Desktop ({data?.deviceStats.desktop}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Mobile ({data?.deviceStats.mobile}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Tablet ({data?.deviceStats.tablet}%)
              </span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 pb-4 border-b border-border">
            <Share2 className="h-5 w-5 text-accent" />
            Traffic Sources
          </h2>

          <div className="mt-4 space-y-4">
            {isLoading ? (
              <p className="py-8 text-center text-xs text-muted-foreground">Loading traffic sources...</p>
            ) : (
              (data?.trafficSources ?? []).map((src: any) => (
                <div key={src.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{src.name}</span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {src.count.toLocaleString()} visits ({src.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${Math.max(3, src.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Row 5: Recent Visitors Log */}
      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Recent Visitors Log
            </h2>
            <p className="text-xs text-muted-foreground">
              Anonymous active visitor sessions with country and device metadata.
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase tracking-wider">
                <th className="pb-3 font-semibold">Session ID</th>
                <th className="pb-3 font-semibold">Country</th>
                <th className="pb-3 font-semibold">Device & Environment</th>
                <th className="pb-3 font-semibold">Entry Page</th>
                <th className="pb-3 font-semibold text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    Loading recent visitor sessions...
                  </td>
                </tr>
              ) : (data?.recentVisitors ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No active visitor sessions recorded yet.
                  </td>
                </tr>
              ) : (
                data?.recentVisitors.map((v: any, i: number) => (
                  <tr key={i} className="hover:bg-muted/50 transition">
                    <td className="py-3 font-mono font-medium text-foreground">{v.sessionId}</td>
                    <td className="py-3 text-foreground font-medium flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      {v.country}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      <span className="capitalize font-medium text-foreground">{v.deviceType}</span> · {v.browser} on {v.os}
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">{v.entryPage}</td>
                    <td className="py-3 text-right text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(v.lastActiveAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value?: number;
  sub?: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-3 font-display text-3xl font-bold">
        {loading ? "—" : (value ?? 0).toLocaleString()}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function DeviceCard({
  icon: Icon,
  label,
  percentage,
  count,
}: {
  icon: React.ElementType;
  label: string;
  percentage: number;
  count: number;
}) {
  return (
    <div className="rounded-xl border border-border p-4 bg-muted/20">
      <div className="flex justify-center text-muted-foreground mb-2">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{percentage}%</p>
      <p className="text-[10px] text-muted-foreground">{count.toLocaleString()} sessions</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-background/95 backdrop-blur p-3 shadow-lg text-xs space-y-1">
        <p className="font-semibold text-foreground">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function formatRelativeTime(iso: string): string {
  if (!iso) return "Unknown";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
