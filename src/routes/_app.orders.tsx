import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader, ChannelBadge, StatusBadge } from "@/components/common";
import { orders, type Order, type OrderStatus } from "@/lib/mock-data";
import { MapPin, FileText, Package, Calendar, Eye } from "lucide-react";

export const Route = createFileRoute("/_app/orders")({
  head: () => ({ meta: [{ title: "Gestion des commandes IA — Hellow AI Suite" }] }),
  component: Orders,
});

const statuses: (OrderStatus | "Toutes")[] = ["Toutes", "Nouveau", "Confirmé", "En préparation", "Livré"];

function Orders() {
  const [filter, setFilter] = useState<OrderStatus | "Toutes">("Toutes");
  const [selected, setSelected] = useState<Order | null>(null);

  const list = filter === "Toutes" ? orders : orders.filter((o) => o.status === filter);
  const counts = (s: OrderStatus) => orders.filter((o) => o.status === s).length;

  return (
    <div>
      <PageHeader
        title="Gestion des commandes IA"
        subtitle="Qualification automatique et suivi des commandes générées par vos agents IA."
      />

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["Nouveau", "Confirmé", "En préparation", "Livré"] as OrderStatus[]).map((s) => (
          <Card key={s} className="p-4 shadow-soft">
            <p className="font-serif text-2xl font-semibold">{counts(s)}</p>
            <p className="text-sm text-muted-foreground">{s}</p>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === s ? "bg-gradient-teal text-accent-foreground shadow-soft" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">N° commande</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Qté</th>
                <th className="px-4 py-3 font-medium">Livraison</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-b border-border/60 transition hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium text-accent">{o.id}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.product}</td>
                  <td className="px-4 py-3">{o.quantity}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.deliveryDate}</td>
                  <td className="px-4 py-3"><ChannelBadge channel={o.channel} withLabel={false} /></td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelected(o)} className="gap-1.5">
                      <Eye className="h-4 w-4" /> Détail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-serif text-2xl">
                  Commande {selected.id}
                  <StatusBadge status={selected.status} />
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm font-medium">{selected.customer}</p>
                  <p className="text-xs text-muted-foreground">via {selected.channel}</p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Package className="h-3.5 w-3.5" /> Produits commandés
                  </p>
                  <div className="space-y-2">
                    {selected.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                        <span>{it.name} <span className="text-muted-foreground">× {it.qty}</span></span>
                        <span className="font-medium">{it.price * it.qty} MAD</span>
                      </div>
                    ))}
                  </div>
                </div>

                <DetailRow icon={Calendar} label="Date de livraison" value={selected.deliveryDate} />
                <DetailRow icon={MapPin} label="Adresse de livraison" value={selected.address} />
                <DetailRow icon={FileText} label="Instructions spéciales" value={selected.instructions} />

                <div className="flex items-center justify-between rounded-xl bg-gradient-gold px-4 py-3 text-gold-foreground">
                  <span className="text-sm font-medium">Prix estimé</span>
                  <span className="font-serif text-2xl font-semibold">{selected.price.toLocaleString("fr-FR")} MAD</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
