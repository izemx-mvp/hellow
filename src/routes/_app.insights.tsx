import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHeader, ChannelBadge } from "@/components/common";
import { insights, ordersByChannel } from "@/lib/mock-data";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, MessageCircleQuestion, Trophy } from "lucide-react";

export const Route = createFileRoute("/_app/insights")({
  head: () => ({ meta: [{ title: "Marketing Insights — Hellow AI Suite" }] }),
  component: Insights,
});

function Insights() {
  return (
    <div>
      <PageHeader
        title="Marketing Insights IA"
        subtitle="Analyse de la performance contenu, produits, questions clients et engagement social."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Best content */}
        <Card className="p-5 shadow-soft">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <Trophy className="h-5 w-5 text-gold" /> Contenus les plus performants
          </h3>
          <div className="mt-4 space-y-2">
            {insights.bestContent.map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-gold text-sm font-semibold text-gold-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <ChannelBadge channel={c.channel as any} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{c.engagement}</p>
                  <p className="text-xs text-success">{c.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top products */}
        <Card className="p-5 shadow-soft">
          <h3 className="font-serif text-xl font-semibold">Produits les plus demandés</h3>
          <p className="text-sm text-muted-foreground">Mentions & commandes via les agents IA</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={insights.topProducts} layout="vertical" margin={{ left: 20, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} width={130} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="value" fill="var(--color-accent)" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Engagement */}
        <Card className="p-5 shadow-soft">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <TrendingUp className="h-5 w-5 text-accent" /> Engagement social estimé
          </h3>
          <p className="text-sm text-muted-foreground">Interactions hebdomadaires</p>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={insights.engagement} margin={{ left: -18, right: 6, top: 8 }}>
              <defs>
                <linearGradient id="gEng" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-gold)" strokeWidth={2} fill="url(#gEng)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders by channel */}
        <Card className="p-5 shadow-soft">
          <h3 className="font-serif text-xl font-semibold">Commandes générées par canal</h3>
          <p className="text-sm text-muted-foreground">Performance des agents conversationnels</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={ordersByChannel} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {ordersByChannel.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Legend iconType="circle" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top questions */}
      <Card className="mt-4 p-5 shadow-soft">
        <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <MessageCircleQuestion className="h-5 w-5 text-accent" /> Questions clients les plus fréquentes
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {insights.topQuestions.map((q, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
              <span className="text-sm">{q.q}</span>
              <span className="ml-3 shrink-0 rounded-full bg-accent/12 px-2.5 py-1 text-xs font-semibold text-accent">{q.count}×</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
