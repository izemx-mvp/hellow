import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Mot de passe oublié — Hellow AI Suite" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Lien de réinitialisation envoyé (démo).");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-cream px-6 py-12">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="mb-8"><Logo /></div>
        {!sent ? (
          <>
            <h2 className="font-serif text-3xl font-semibold">Mot de passe oublié</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Saisissez votre e-mail, nous vous enverrons un lien de réinitialisation.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" placeholder="admin@hellow.ma" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-teal text-accent-foreground hover:opacity-90" size="lg">
                Envoyer le lien
              </Button>
            </form>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-semibold">E-mail envoyé</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Si un compte existe pour <span className="font-medium text-foreground">{email}</span>, vous recevrez un lien sous peu.
            </p>
          </div>
        )}
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
          <ArrowLeft className="h-4 w-4" /> Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
