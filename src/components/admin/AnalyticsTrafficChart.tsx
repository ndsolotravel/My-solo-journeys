import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type TrafficPoint = {
  date: string;
  fullDate: string;
  visitors: number;
  pageViews: number;
};

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

export default function AnalyticsTrafficChart({
  data,
}: {
  data: TrafficPoint[] | undefined;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4085FF" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#4085FF" stopOpacity={0.0} />
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
          stroke="#4085FF"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#visitorsGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
