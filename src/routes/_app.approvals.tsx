import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/common";
import { generatedContent, type GeneratedContent } from "@/lib/mock-data";
import { Check, X, Pencil, CalendarClock, Hash, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/approvals")({
  head: () => ({ meta: [{ title: "Validation — Hellow AI Suite" }] }),
  component: Approvals,
});

const flow = ["IA", "Validation", "Planification", "Publication"];

function Approvals() {
  const [items, setItems] = useState<GeneratedContent[]>(
    generatedContent.filter((c) => c.status === "En validation" || c.status === "Brouillon" || c.status === "Approuvé")
  );

  const update = (id: string, status: GeneratedContent["status"], msg: string) => {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success(msg);
  };

  return (
    <div>
      <PageHeader
        title="Centre de validation"
        subtitle="Validez les contenus générés par l'IA avant planification et publication."
      />

      {/* Workflow */}
      <Card className="mb-6 p-5 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                i === 0 ? "bg-accent/15 text-accent" : "bg-secondary text-secondary-foreground"
              }`}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-background text-xs">{i + 1}</span>
                {step}
              </span>
              {i < flow.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0 shadow-soft">
            <div className="flex gap-4 p-4">
              <img src={c.image} alt={c.title} width={800} height={600} loading="lazy" className="h-28 w-28 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-accent">{c.type}</span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-1 font-medium">{c.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.caption}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {c.hashtags.slice(0, 4).map((h) => (
                    <span key={h} className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground"><Hash className="h-2.5 w-2.5" />{h.replace("#", "")}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/30 px-4 py-3">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.info("Édition (démo)")}>
                <Pencil className="h-4 w-4" /> Éditer
              </Button>
              <Button size="sm" className="gap-1.5 bg-success text-success-foreground hover:opacity-90" onClick={() => update(c.id, "Approuvé", "Contenu approuvé ✓")}>
                <Check className="h-4 w-4" /> Approuver
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:bg-destructive/10" onClick={() => update(c.id, "Brouillon", "Contenu rejeté")}>
                <X className="h-4 w-4" /> Rejeter
              </Button>
              <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-accent" onClick={() => update(c.id, "Planifié", "Publication planifiée 🗓️")}>
                <CalendarClock className="h-4 w-4" /> Planifier
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
