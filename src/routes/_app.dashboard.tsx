import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  MessageCircle, ShoppingBag, UserCheck, Sparkles, CalendarClock, TrendingUp,
  ArrowUpRight, Instagram, Facebook, FileText, CheckCircle2, ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader, ChannelBadge } from "@/components/common";
import { kpis, aiPerformance, activityFeed, trendData, ordersByChannel } from "@/lib/mock-data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord — Hellow AI Suite" }] }),
  component: Dashboard,
});

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, ShoppingBag, UserCheck, Sparkles, CalendarClock, TrendingUp,
};
const toneMap: Record<string, string> = {
  teal: "bg-accent/12 text-accent",
  gold: "bg-gold/20 text-gold-foreground",
  brown: "bg-primary/12 text-primary",
};
const feedIcon: Record<string, React.ElementType> = {
  order: ShoppingBag, inquiry: Instagram, question: Facebook, content: FileText, approval: CheckCircle2,
};

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Tableau de bord exécutif"
        subtitle="Vue d'ensemble en temps réel de votre centre d'opérations IA Hellow Pâtisserie."
        action={
          <Link to="/inbox" className="inline-flex items-center gap-2 rounded-full bg-gradient-teal px-4 py-2 text-sm font-medium text-accent-foreground shadow-soft transition hover:opacity-90">
            Ouvrir l'inbox <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[kpi.icon];
          return (
            <Card key={kpi.label} className="animate-fade-in-up border-border/70 p-5 shadow-soft transition hover:shadow-elegant" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${toneMap[kpi.tone]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-1 text-xs font-medium text-success">
                  <ArrowUpRight className="h-3 w-3" />{kpi.delta}
                </span>
              </div>
              <p className="mt-4 font-serif text-3xl font-semibold tracking-tight">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold">Activité & revenu</h3>
              <p className="text-sm text-muted-foreground">Conversations, commandes et revenu (k MAD)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ left: -18, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
              <Area type="monotone" dataKey="conversations" stroke="var(--color-accent)" strokeWidth={2} fill="url(#gConv)" />
              <Area type="monotone" dataKey="revenu" stroke="var(--color-gold)" strokeWidth={2} fill="url(#gRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 shadow-soft">
          <h3 className="font-serif text-xl font-semibold">Commandes par canal</h3>
          <p className="text-sm text-muted-foreground">Répartition des conversions</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={ordersByChannel} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {ordersByChannel.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Legend iconType="circle" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Activity + AI performance */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 shadow-soft lg:col-span-2">
          <h3 className="font-serif text-xl font-semibold">Flux d'activité</h3>
          <p className="text-sm text-muted-foreground">Dernières actions de vos agents IA</p>
          <div className="mt-4 space-y-1">
            {activityFeed.map((a) => {
              const Icon = feedIcon[a.type] ?? MessageCircle;
              return (
                <div key={a.id} className="flex items-start gap-3 rounded-xl px-2 py-3 transition hover:bg-muted/60">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{a.text}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <ChannelBadge channel={a.channel} withLabel={false} />
                      <span className="text-xs text-muted-foreground">{a.customer} · {a.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 shadow-soft">
          <h3 className="font-serif text-xl font-semibold">Performance IA</h3>
          <p className="text-sm text-muted-foreground">Indicateurs clés des agents</p>
          <div className="mt-5 space-y-5">
            {aiPerformance.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-serif text-lg font-semibold">
                    {m.value}{m.suffix}
                  </span>
                </div>
                <Progress value={m.suffix === "s" ? 100 - m.value * 3 : m.value} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
