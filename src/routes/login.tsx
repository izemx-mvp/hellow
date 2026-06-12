import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — Hellow AI Suite" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@hellow.ma");
  const [password, setPassword] = useState("123456");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ready && isAuthenticated) navigate({ to: "/dashboard" });
  }, [ready, isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) {
      toast.success("Bienvenue chez Hellow AI Suite ✨");
      navigate({ to: "/dashboard" });
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <Logo dark />
        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-sidebar-accent px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Centre d'opérations IA
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight">
            L'intelligence artificielle au service de la <span className="text-gold">douceur de vivre</span>.
          </h1>
          <p className="mt-4 text-sidebar-foreground/70">
            Automatisez vos conversations, qualifiez vos commandes et pilotez votre social media
            depuis une seule plateforme premium pensée pour Hellow Pâtisserie.
          </p>
        </div>
        <div className="relative flex gap-8 text-sm">
          <div><p className="font-serif text-2xl text-gold">98%</p><p className="text-sidebar-foreground/60">Taux de réponse</p></div>
          <div><p className="font-serif text-2xl text-gold">12s</p><p className="text-sidebar-foreground/60">Réponse moyenne</p></div>
          <div><p className="font-serif text-2xl text-gold">+18%</p><p className="text-sidebar-foreground/60">Revenu généré</p></div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-gradient-cream px-6 py-12">
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h2 className="font-serif text-3xl font-semibold">Connexion</h2>
          <p className="mt-1 text-sm text-muted-foreground">Accédez à votre tableau de bord IA.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" placeholder="admin@hellow.ma" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/forgot-password" className="text-xs font-medium text-accent hover:underline">Mot de passe oublié ?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 pr-9" placeholder="••••••" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-teal text-accent-foreground hover:opacity-90" size="lg">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-dashed border-border bg-card/60 p-3 text-center text-xs text-muted-foreground">
            Démo · <span className="font-medium text-foreground">admin@hellow.ma</span> / <span className="font-medium text-foreground">123456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
