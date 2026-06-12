import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/common";
import { MessageCircle, Instagram, Facebook, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Paramètres IA — Hellow AI Suite" }] }),
  component: Settings,
});

const tones = [
  { id: "Elegant", label: "Élégant", desc: "Raffiné, soigné, premium" },
  { id: "Friendly", label: "Amical", desc: "Chaleureux, accessible, proche" },
  { id: "Luxury", label: "Luxe", desc: "Exclusif, prestige, sur-mesure" },
  { id: "Corporate", label: "Corporate", desc: "Professionnel, structuré, B2B" },
];

function Settings() {
  const [channels, setChannels] = useState({ WhatsApp: true, Instagram: true, Facebook: false });
  const [selectedTones, setSelectedTones] = useState<string[]>(["Elegant", "Friendly"]);

  const toggleTone = (id: string) =>
    setSelectedTones((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const save = () => toast.success("Paramètres IA enregistrés ✨");

  return (
    <div>
      <PageHeader
        title="Paramètres IA"
        subtitle="Configurez vos canaux et la personnalité de vos agents conversationnels."
        action={<Button onClick={save} className="bg-gradient-teal text-accent-foreground hover:opacity-90">Enregistrer</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChannelCard icon={MessageCircle} name="WhatsApp" desc="Numéro Business connecté" detail="+212 6 44 44 43 42"
          enabled={channels.WhatsApp} onToggle={() => setChannels((c) => ({ ...c, WhatsApp: !c.WhatsApp }))} placeholder="Token WhatsApp Business API" />
        <ChannelCard icon={Instagram} name="Instagram" desc="Compte professionnel" detail="@hellowbakery"
          enabled={channels.Instagram} onToggle={() => setChannels((c) => ({ ...c, Instagram: !c.Instagram }))} placeholder="ID compte Instagram" />
        <ChannelCard icon={Facebook} name="Facebook Messenger" desc="Page Facebook" detail="Hellow Pâtisserie"
          enabled={channels.Facebook} onToggle={() => setChannels((c) => ({ ...c, Facebook: !c.Facebook }))} placeholder="Token de page Facebook" />

        {/* Tone of voice */}
        <Card className="p-5 shadow-soft lg:col-span-2">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-gold" /> Ton de voix de l'IA
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Choisissez la personnalité de vos agents. Par défaut : <span className="font-medium text-foreground">Élégant + Amical</span>.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tones.map((t) => {
              const active = selectedTones.includes(t.id);
              return (
                <button key={t.id} onClick={() => toggleTone(t.id)}
                  className={`relative rounded-2xl border p-4 text-left transition ${
                    active ? "border-accent bg-accent/8 shadow-soft" : "border-border bg-card hover:bg-muted/50"
                  }`}>
                  {active && (
                    <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                  <p className="font-serif text-lg font-semibold">{t.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl bg-gradient-cream/50 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Aperçu du ton</p>
            <p className="text-sm italic">
              « Bonjour 👋 Quel plaisir de vous accueillir chez Hellow ✨ Souhaitez-vous découvrir notre sélection de douceurs artisanales du moment ? »
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ChannelCard({ icon: Icon, name, desc, detail, enabled, onToggle, placeholder }: {
  icon: React.ElementType; name: string; desc: string; detail: string; enabled: boolean; onToggle: () => void; placeholder: string;
}) {
  return (
    <Card className="p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold">{name}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>
      <div className="mt-4 space-y-2">
        <Label className="text-xs text-muted-foreground">Identifiant connecté</Label>
        <Input defaultValue={detail} className="bg-muted/40" />
        <Input placeholder={placeholder} type="password" />
      </div>
      <p className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${enabled ? "text-success" : "text-muted-foreground"}`}>
        <span className={`h-2 w-2 rounded-full ${enabled ? "bg-success" : "bg-muted-foreground"}`} />
        {enabled ? "Connecté & actif" : "Désactivé"}
      </p>
    </Card>
  );
}
