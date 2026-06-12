import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader, StatusBadge } from "@/components/common";
import { generatedContent, visualConcepts } from "@/lib/mock-data";
import { Sparkles, Wand2, Copy, RefreshCw, Image as ImageIcon, Hash } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/social")({
  head: () => ({ meta: [{ title: "Social Media IA — Hellow AI Suite" }] }),
  component: Social,
});

const contentTypes = ["Post Instagram", "Post Facebook", "Story", "Concept Reel"];
const samples = [
  "Découvrez notre nouvelle collection de pâtisseries artisanales ✨ Préparées avec amour et un indice glycémique bas. 🍰 Quelle douceur choisirez-vous aujourd'hui ?\n\n#HellowPatisserie #DouceurDeVivre #Casablanca #PatisserieArtisanale",
  "Le cadeau parfait pour vos événements professionnels. 🎁 Offrez l'élégance Hellow à vos clients et collaborateurs.\n\n#CadeauCorporate #Hellow #Rabat #GiftBox",
];

function Social() {
  const [type, setType] = useState(contentTypes[0]);
  const [brief, setBrief] = useState("Lancement de notre collection printanière de pâtisseries à indice glycémique bas.");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setOutput("");
    setTimeout(() => {
      setOutput(samples[Math.floor(Math.random() * samples.length)]);
      setLoading(false);
      toast.success("Contenu généré par l'IA ✨");
    }, 900);
  };

  return (
    <div>
      <PageHeader
        title="Social Media IA"
        subtitle="Générez posts, captions et concepts visuels alignés sur l'univers premium de Hellow."
      />

      <Tabs defaultValue="generator">
        <TabsList className="mb-5">
          <TabsTrigger value="generator">Générateur de contenu</TabsTrigger>
          <TabsTrigger value="visuals">Visuels IA</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque</TabsTrigger>
        </TabsList>

        {/* Generator */}
        <TabsContent value="generator">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                <Wand2 className="h-5 w-5 text-accent" /> Brief créatif
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">L'IA rédige caption, emojis, hashtags et CTA.</p>

              <p className="mb-2 text-sm font-medium">Type de contenu</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {contentTypes.map((t) => (
                  <button key={t} onClick={() => setType(t)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      type === t ? "bg-gradient-teal text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>

              <p className="mb-2 text-sm font-medium">Sujet / objectif</p>
              <Textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} className="mb-4" />

              <Button onClick={generate} disabled={loading} className="w-full bg-gradient-teal text-accent-foreground hover:opacity-90">
                {loading ? <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Génération…</> : <><Sparkles className="mr-2 h-4 w-4" /> Générer avec l'IA</>}
              </Button>
            </Card>

            <Card className="flex flex-col p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold">Résultat — {type}</h3>
                {output && (
                  <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => { navigator.clipboard?.writeText(output); toast.success("Copié !"); }}>
                    <Copy className="h-4 w-4" /> Copier
                  </Button>
                )}
              </div>
              <div className="flex-1 rounded-xl border border-dashed border-border bg-gradient-cream/40 p-4">
                {loading && (
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                  </div>
                )}
                {!loading && output && <p className="whitespace-pre-line text-sm leading-relaxed">{output}</p>}
                {!loading && !output && (
                  <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                    <div>
                      <Sparkles className="mx-auto mb-2 h-8 w-8 text-accent/50" />
                      Le contenu généré apparaîtra ici.
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Visuals */}
        <TabsContent value="visuals">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visualConcepts.map((v, i) => (
              <Card key={v.id} className="group overflow-hidden p-0 shadow-soft transition hover:shadow-elegant animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.title} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur">{v.tag}</span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/90 px-2 py-1 text-[10px] font-medium text-accent-foreground">
                    <Sparkles className="h-3 w-3" /> IA
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <p className="font-medium">{v.title}</p>
                  <Button variant="ghost" size="icon" className="rounded-full"><ImageIcon className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Library */}
        <TabsContent value="library">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {generatedContent.map((c) => (
              <Card key={c.id} className="flex gap-4 p-4 shadow-soft">
                <img src={c.image} alt={c.title} width={800} height={600} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-accent">{c.type}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm">{c.caption}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.hashtags.slice(0, 3).map((h) => (
                      <span key={h} className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground"><Hash className="h-2.5 w-2.5" />{h.replace("#", "")}</span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
