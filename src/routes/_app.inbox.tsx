import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, ChannelBadge, StatusBadge } from "@/components/common";
import { conversations, type Conversation } from "@/lib/mock-data";
import { Send, Phone, Mail, MapPin, ShoppingBag, Heart, Bot, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/inbox")({
  head: () => ({ meta: [{ title: "Agent Client IA — Hellow AI Suite" }] }),
  component: Inbox,
});

function Inbox() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const active = conversations.find((c) => c.id === activeId) as Conversation;

  return (
    <div>
      <PageHeader
        title="Agent Client IA"
        subtitle="Boîte de réception unifiée — WhatsApp, Instagram et Facebook Messenger, gérés par l'IA."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr_300px]">
        {/* Conversation list */}
        <Card className="overflow-hidden p-0 shadow-soft">
          <div className="border-b border-border px-4 py-3">
            <h3 className="font-serif text-lg font-semibold">Conversations</h3>
            <p className="text-xs text-muted-foreground">{conversations.length} fils actifs</p>
          </div>
          <div className="max-h-[560px] overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition hover:bg-muted/60 ${
                  activeId === c.id ? "bg-muted" : ""
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-teal text-sm font-semibold text-accent-foreground">
                  {c.customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{c.customer.name}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.preview}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <ChannelBadge channel={c.channel} withLabel={false} />
                    {c.unread > 0 && (
                      <span className="grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-gold-foreground">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Thread */}
        <Card className="flex max-h-[620px] flex-col p-0 shadow-soft">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-teal text-sm font-semibold text-accent-foreground">
                {active.customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-medium">{active.customer.name}</p>
                <ChannelBadge channel={active.channel} />
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 text-xs font-medium text-accent">
              <Bot className="h-3.5 w-3.5" /> Réponses IA automatiques
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-cream/40 px-5 py-5">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "ai" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                  m.from === "ai"
                    ? "rounded-br-md bg-gradient-teal text-accent-foreground"
                    : "rounded-bl-md bg-card text-card-foreground"
                }`}>
                  {m.from === "ai" && (
                    <span className="mb-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide opacity-80">
                      <Sparkles className="h-3 w-3" /> Agent IA Hellow
                    </span>
                  )}
                  <p>{m.text}</p>
                  <span className={`mt-1 block text-[10px] ${m.from === "ai" ? "text-accent-foreground/70" : "text-muted-foreground"}`}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <Input placeholder="L'IA répond automatiquement — intervenez si besoin…" className="rounded-full" />
            <Button size="icon" className="shrink-0 rounded-full bg-gradient-teal text-accent-foreground hover:opacity-90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Customer profile */}
        <Card className="space-y-5 p-5 shadow-soft">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-gold text-xl font-semibold text-gold-foreground">
              {active.customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <h3 className="mt-3 font-serif text-xl font-semibold">{active.customer.name}</h3>
            <div className="mt-2 flex justify-center"><StatusBadge status={active.customer.status} /></div>
          </div>

          <div className="space-y-3 text-sm">
            <Detail icon={Phone} label="Téléphone" value={active.customer.phone} />
            <Detail icon={Mail} label="E-mail" value={active.customer.email} />
            <Detail icon={MapPin} label="Ville" value={active.customer.city} />
            <Detail icon={ShoppingBag} label="Commandes précédentes" value={`${active.customer.previousOrders}`} />
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Heart className="h-3.5 w-3.5" /> Produits préférés
            </p>
            <div className="flex flex-wrap gap-2">
              {active.customer.preferred.length ? active.customer.preferred.map((p) => (
                <span key={p} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">{p}</span>
              )) : <span className="text-xs text-muted-foreground">Aucun historique</span>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}
