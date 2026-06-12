import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock-data";
import { BookOpen, Bot, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/catalog")({
  head: () => ({ meta: [{ title: "Base de connaissances produits — Hellow AI Suite" }] }),
  component: Catalog,
});

const categories = ["Tous", "Gâteaux", "Pâtisseries", "Coffrets cadeaux", "Wedding Cakes", "Cadeaux corporate"];
const availStyle: Record<string, string> = {
  "Disponible": "bg-success/15 text-success",
  "Sur commande": "bg-accent/15 text-accent",
  "Stock limité": "bg-warning/25 text-warning-foreground",
};

function Catalog() {
  const [cat, setCat] = useState("Tous");
  const list = cat === "Tous" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <PageHeader
        title="Base de connaissances produits"
        subtitle="Le catalogue utilisé par vos agents IA pour répondre, conseiller et qualifier les commandes."
      />

      <Card className="mb-5 flex items-center gap-3 border-accent/30 bg-accent/8 p-4 shadow-soft">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
          <Bot className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Connecté aux agents IA.</span> Chaque réponse client s'appuie automatiquement sur les descriptions, prix et disponibilités de ce catalogue.
        </p>
        <Badge variant="outline" className="ml-auto hidden border-success/40 bg-success/10 text-success sm:flex">
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Synchronisé
        </Badge>
      </Card>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              cat === c ? "bg-gradient-teal text-accent-foreground shadow-soft" : "bg-card text-muted-foreground hover:bg-muted"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Card key={p.id} className="group overflow-hidden p-0 shadow-soft transition hover:shadow-elegant animate-fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold leading-tight">{p.name}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${availStyle[p.availability]}`}>{p.availability}</span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.category}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-3 font-serif text-xl font-semibold text-primary">{p.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
