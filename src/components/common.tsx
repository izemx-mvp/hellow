import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import type { Channel } from "@/lib/mock-data";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up">
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const channelStyles: Record<Channel, { icon: React.ElementType; cls: string }> = {
  WhatsApp: { icon: MessageCircle, cls: "bg-success/15 text-success" },
  Instagram: { icon: Instagram, cls: "bg-accent/15 text-accent" },
  Facebook: { icon: Facebook, cls: "bg-gold/20 text-gold-foreground" },
};

export function ChannelBadge({ channel, withLabel = true }: { channel: Channel; withLabel?: boolean }) {
  const { icon: Icon, cls } = channelStyles[channel];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {withLabel && channel}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  // orders
  Nouveau: "bg-accent/15 text-accent",
  "Confirmé": "bg-gold/20 text-gold-foreground",
  "En préparation": "bg-warning/25 text-warning-foreground",
  "Livré": "bg-success/15 text-success",
  // content
  Brouillon: "bg-muted text-muted-foreground",
  "En validation": "bg-warning/25 text-warning-foreground",
  "Approuvé": "bg-success/15 text-success",
  "Planifié": "bg-accent/15 text-accent",
  "Publié": "bg-primary/15 text-primary",
  // customer
  VIP: "bg-gold/20 text-gold-foreground",
  "Récurrent": "bg-accent/15 text-accent",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${statusStyles[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </Badge>
  );
}
