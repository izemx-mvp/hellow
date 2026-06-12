import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHeader, ChannelBadge, StatusBadge } from "@/components/common";
import { calendarPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({ meta: [{ title: "Calendrier éditorial — Hellow AI Suite" }] }),
  component: CalendarPage,
});

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
// June 2026 starts on Monday (1 June 2026 = Monday)
const daysInMonth = 30;
const startOffset = 0;

const statusDot: Record<string, string> = {
  "Brouillon": "bg-muted-foreground",
  "Approuvé": "bg-success",
  "Planifié": "bg-accent",
  "Publié": "bg-primary",
};

function CalendarPage() {
  const cells = Array.from({ length: startOffset + daysInMonth }, (_, i) => i - startOffset + 1);
  const postsByDay = (d: number) => calendarPosts.filter((p) => p.day === d);

  const legend = ["Brouillon", "Approuvé", "Planifié", "Publié"];

  return (
    <div>
      <PageHeader
        title="Calendrier éditorial"
        subtitle="Juin 2026 — planification des publications brouillons, approuvées, planifiées et publiées."
        action={
          <div className="flex flex-wrap gap-3">
            {legend.map((l) => (
              <span key={l} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDot[l]}`} /> {l}
              </span>
            ))}
          </div>
        }
      />

      <Card className="p-4 shadow-soft sm:p-6">
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map((d) => (
            <div key={d} className="pb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">{d}</div>
          ))}
          {cells.map((d, idx) => {
            const valid = d >= 1;
            const posts = valid ? postsByDay(d) : [];
            return (
              <div key={idx} className={`min-h-[92px] rounded-xl border p-2 ${valid ? "border-border bg-card" : "border-transparent"}`}>
                {valid && (
                  <>
                    <span className="text-xs font-medium text-muted-foreground">{d}</span>
                    <div className="mt-1 space-y-1">
                      {posts.map((p, i) => (
                        <div key={i} className="rounded-lg bg-muted/60 px-1.5 py-1">
                          <div className="flex items-center gap-1">
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[p.status]}`} />
                            <span className="truncate text-[11px] font-medium">{p.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6">
        <h3 className="mb-3 font-serif text-xl font-semibold">Prochaines publications</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...calendarPosts].sort((a, b) => a.day - b.day).map((p, i) => (
            <Card key={i} className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-center">
                  <span className="font-serif text-lg font-semibold leading-none">{p.day}</span>
                  <span className="text-[9px] uppercase text-muted-foreground">Juin</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <div className="mt-1"><ChannelBadge channel={p.channel} /></div>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
