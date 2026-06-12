// Centralized realistic mock data for Hellow AI Suite

export type Channel = "WhatsApp" | "Instagram" | "Facebook";

export const kpis = [
  { label: "Conversations totales", value: "2 847", delta: "+12.4%", icon: "MessageCircle", tone: "teal" },
  { label: "Commandes générées", value: "684", delta: "+8.1%", icon: "ShoppingBag", tone: "gold" },
  { label: "Leads qualifiés", value: "1 192", delta: "+15.6%", icon: "UserCheck", tone: "brown" },
  { label: "Posts générés", value: "342", delta: "+22.0%", icon: "Sparkles", tone: "teal" },
  { label: "Publications planifiées", value: "58", delta: "+4.3%", icon: "CalendarClock", tone: "gold" },
  { label: "Revenu estimé généré", value: "428 500 MAD", delta: "+18.9%", icon: "TrendingUp", tone: "brown" },
];

export const aiPerformance = [
  { label: "Taux de réponse", value: 98, suffix: "%" },
  { label: "Temps de réponse moyen", value: 12, suffix: "s" },
  { label: "Commandes converties", value: 41, suffix: "%" },
  { label: "Satisfaction client", value: 96, suffix: "%" },
];

export const activityFeed = [
  { id: 1, type: "order", channel: "WhatsApp" as Channel, text: "Nouvelle commande WhatsApp — Coffret Signature (10 pers.)", time: "il y a 3 min", customer: "Yasmine Bennani" },
  { id: 2, type: "inquiry", channel: "Instagram" as Channel, text: "Nouvelle demande Instagram — Gâteau d'anniversaire personnalisé", time: "il y a 11 min", customer: "Mehdi Alaoui" },
  { id: 3, type: "question", channel: "Facebook" as Channel, text: "Question client Facebook — Délais de livraison Rabat", time: "il y a 24 min", customer: "Salma Idrissi" },
  { id: 4, type: "content", channel: "Instagram" as Channel, text: "Nouveau contenu généré — Collection Saint-Valentin", time: "il y a 38 min", customer: "Studio IA" },
  { id: 5, type: "approval", channel: "Facebook" as Channel, text: "Publication approuvée — Coffrets corporate fin d'année", time: "il y a 52 min", customer: "Direction Marketing" },
  { id: 6, type: "order", channel: "WhatsApp" as Channel, text: "Nouvelle commande WhatsApp — Cheese Cake fruits rouges", time: "il y a 1 h", customer: "Karim Tazi" },
];

// Revenue / conversations trend (12 weeks)
export const trendData = [
  { name: "S1", conversations: 180, commandes: 42, revenu: 26 },
  { name: "S2", conversations: 210, commandes: 51, revenu: 31 },
  { name: "S3", conversations: 240, commandes: 49, revenu: 30 },
  { name: "S4", conversations: 280, commandes: 63, revenu: 39 },
  { name: "S5", conversations: 305, commandes: 71, revenu: 44 },
  { name: "S6", conversations: 290, commandes: 68, revenu: 42 },
  { name: "S7", conversations: 340, commandes: 82, revenu: 51 },
  { name: "S8", conversations: 375, commandes: 90, revenu: 58 },
];

export const ordersByChannel = [
  { name: "WhatsApp", value: 412, color: "var(--color-success)" },
  { name: "Instagram", value: 188, color: "var(--color-accent)" },
  { name: "Facebook", value: 84, color: "var(--color-gold)" },
];

export interface ConversationMsg {
  from: "customer" | "ai";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  channel: Channel;
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    status: "VIP" | "Récurrent" | "Nouveau";
    previousOrders: number;
    preferred: string[];
  };
  preview: string;
  unread: number;
  time: string;
  messages: ConversationMsg[];
}

export const conversations: Conversation[] = [
  {
    id: "c1",
    channel: "WhatsApp",
    customer: { name: "Yasmine Bennani", phone: "+212 6 61 23 45 67", email: "y.bennani@gmail.com", city: "Casablanca", status: "VIP", previousOrders: 7, preferred: ["Coffret Signature", "Cheese Cake"] },
    preview: "Je souhaite commander un coffret cadeau.",
    unread: 2,
    time: "09:42",
    messages: [
      { from: "customer", text: "Bonjour, avez-vous un gâteau d'anniversaire pour 10 personnes ?", time: "09:38" },
      { from: "ai", text: "Bonjour 👋 Oui, nous proposons plusieurs modèles pour 10 personnes. Souhaitez-vous un gâteau chocolat, fruits rouges ou personnalisé ?", time: "09:38" },
      { from: "customer", text: "Quels sont vos délais de livraison ?", time: "09:40" },
      { from: "ai", text: "Nous livrons généralement sous 24h à 48h selon la disponibilité des produits.", time: "09:40" },
      { from: "customer", text: "Je souhaite commander un coffret cadeau.", time: "09:42" },
      { from: "ai", text: "Très bien. Pourriez-vous préciser le nombre de personnes concernées ainsi que la date souhaitée ?", time: "09:42" },
    ],
  },
  {
    id: "c2",
    channel: "Instagram",
    customer: { name: "Mehdi Alaoui", phone: "+212 6 70 88 12 34", email: "mehdi.alaoui@outlook.com", city: "Rabat", status: "Récurrent", previousOrders: 3, preferred: ["Mignardises", "Cookies Gourmets"] },
    preview: "Vous faites des gâteaux personnalisés ?",
    unread: 0,
    time: "08:55",
    messages: [
      { from: "customer", text: "Bonjour, vous faites des gâteaux personnalisés ?", time: "08:50" },
      { from: "ai", text: "Bonjour ✨ Absolument ! Nous réalisons des créations sur-mesure. Quel est l'événement et pour combien de personnes ?", time: "08:50" },
      { from: "customer", text: "Un anniversaire pour 12 personnes, thème fleuri.", time: "08:54" },
      { from: "ai", text: "Magnifique 🌸 Je vous propose notre entremets fleur de pistache-framboise. Souhaitez-vous recevoir un visuel ?", time: "08:55" },
    ],
  },
  {
    id: "c3",
    channel: "Facebook",
    customer: { name: "Salma Idrissi", phone: "+212 6 12 99 76 50", email: "salma.idrissi@gmail.com", city: "Rabat", status: "Nouveau", previousOrders: 0, preferred: [] },
    preview: "Livrez-vous à Rabat le week-end ?",
    unread: 1,
    time: "Hier",
    messages: [
      { from: "customer", text: "Livrez-vous à Rabat le week-end ?", time: "18:20" },
      { from: "ai", text: "Bonjour 👋 Oui, nous livrons à Rabat 7j/7. Pour quelle date souhaitez-vous être livré(e) ?", time: "18:20" },
    ],
  },
  {
    id: "c4",
    channel: "WhatsApp",
    customer: { name: "Karim Tazi", phone: "+212 6 55 44 33 22", email: "k.tazi@corp.ma", city: "Casablanca", status: "VIP", previousOrders: 11, preferred: ["Coffrets corporate", "Cheese Cake"] },
    preview: "Besoin de 30 coffrets corporate.",
    unread: 0,
    time: "Hier",
    messages: [
      { from: "customer", text: "Bonjour, nous avons besoin de 30 coffrets corporate pour nos clients.", time: "14:02" },
      { from: "ai", text: "Avec plaisir 🎁 Nous proposons des coffrets corporate personnalisables avec votre logo. Souhaitez-vous notre brochure et un devis ?", time: "14:02" },
      { from: "customer", text: "Oui, et pour une livraison avant le 20.", time: "14:05" },
      { from: "ai", text: "Parfait, c'est tout à fait réalisable. Je transmets votre demande à notre équipe corporate pour un devis personnalisé.", time: "14:05" },
    ],
  },
];

export type OrderStatus = "Nouveau" | "Confirmé" | "En préparation" | "Livré";

export interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  status: OrderStatus;
  channel: Channel;
  address: string;
  instructions: string;
  price: number;
  items: { name: string; qty: number; price: number }[];
}

export const orders: Order[] = [
  { id: "HLW-1042", customer: "Yasmine Bennani", product: "Coffret Signature", quantity: 1, deliveryDate: "14 juin 2026", status: "Confirmé", channel: "WhatsApp", address: "12 Rue Al Massira, Casablanca", instructions: "Carte « Joyeux anniversaire Lina »", price: 420, items: [{ name: "Coffret Signature 10 pers.", qty: 1, price: 420 }] },
  { id: "HLW-1041", customer: "Mehdi Alaoui", product: "Entremets Pistache-Framboise", quantity: 1, deliveryDate: "13 juin 2026", status: "En préparation", channel: "Instagram", address: "8 Avenue Fal Ould Oumeir, Rabat", instructions: "Décor fleuri, sans fruits à coque en surface", price: 320, items: [{ name: "Entremets Pistache-Framboise 12 pers.", qty: 1, price: 320 }] },
  { id: "HLW-1040", customer: "Salma Idrissi", product: "Cheese Cake Fruits Rouges", quantity: 2, deliveryDate: "15 juin 2026", status: "Nouveau", channel: "Facebook", address: "Hay Riad, Rabat", instructions: "Livraison avant 11h", price: 240, items: [{ name: "Cheese Cake Fruits Rouges", qty: 2, price: 120 }] },
  { id: "HLW-1039", customer: "Karim Tazi", product: "Coffret Corporate", quantity: 30, deliveryDate: "19 juin 2026", status: "Confirmé", channel: "WhatsApp", address: "Casa Finance City, Casablanca", instructions: "Logo entreprise sur chaque coffret", price: 9000, items: [{ name: "Coffret Corporate personnalisé", qty: 30, price: 300 }] },
  { id: "HLW-1038", customer: "Nadia Fassi", product: "Assortiment Mignardises", quantity: 3, deliveryDate: "12 juin 2026", status: "Livré", channel: "Instagram", address: "Maârif, Casablanca", instructions: "—", price: 540, items: [{ name: "Plateau Mignardises 24 pièces", qty: 3, price: 180 }] },
  { id: "HLW-1037", customer: "Omar Cherkaoui", product: "Wedding Cake 3 étages", quantity: 1, deliveryDate: "21 juin 2026", status: "En préparation", channel: "WhatsApp", address: "Villa des Roses, Bouskoura", instructions: "Thème blanc & or, 80 parts", price: 4800, items: [{ name: "Wedding Cake 3 étages", qty: 1, price: 4800 }] },
];

export interface Product {
  id: string;
  name: string;
  category: "Gâteaux" | "Pâtisseries" | "Coffrets cadeaux" | "Wedding Cakes" | "Cadeaux corporate";
  description: string;
  price: string;
  availability: "Disponible" | "Sur commande" | "Stock limité";
  image: string;
}

export const productImages = {
  cake: "/images/product-cake.jpg",
  pastry: "/images/product-pastry.jpg",
  giftbox: "/images/product-giftbox.jpg",
  wedding: "/images/product-wedding.jpg",
  corporate: "/images/product-corporate.jpg",
  seasonal: "/images/campaign-seasonal.jpg",
};

export const products: Product[] = [
  { id: "p1", name: "Entremets Pistache-Framboise", category: "Gâteaux", description: "Biscuit moelleux à la pistache, insert framboise et mousse légère. Indice glycémique bas.", price: "320 MAD", availability: "Disponible", image: productImages.cake },
  { id: "p2", name: "Cheese Cake Fruits Rouges", category: "Pâtisseries", description: "Cheese cake onctueux sur base sablée, coulis de fruits rouges maison.", price: "120 MAD", availability: "Disponible", image: productImages.pastry },
  { id: "p3", name: "Coffret Signature", category: "Coffrets cadeaux", description: "Assortiment de mignardises, cookies gourmets et petites douceurs dans un écrin Hellow.", price: "420 MAD", availability: "Disponible", image: productImages.giftbox },
  { id: "p4", name: "Wedding Cake 3 étages", category: "Wedding Cakes", description: "Pièce montée élégante personnalisable, jusqu'à 100 parts. Décor floral sur-mesure.", price: "à partir de 4 800 MAD", availability: "Sur commande", image: productImages.wedding },
  { id: "p5", name: "Coffret Corporate personnalisé", category: "Cadeaux corporate", description: "Coffrets premium personnalisables avec logo entreprise pour vos clients et collaborateurs.", price: "à partir de 300 MAD", availability: "Sur commande", image: productImages.corporate },
  { id: "p6", name: "Plateau Mignardises", category: "Pâtisseries", description: "24 pièces variées : tartelettes, choux, financiers. Idéal pour vos événements.", price: "180 MAD", availability: "Disponible", image: productImages.pastry },
  { id: "p7", name: "Coffret Saint-Valentin", category: "Coffrets cadeaux", description: "Édition limitée, sélection chocolatée et cœurs fondants pour la saison des amoureux.", price: "350 MAD", availability: "Stock limité", image: productImages.seasonal },
  { id: "p8", name: "Layer Cake Chocolat Noir", category: "Gâteaux", description: "Gâteau d'anniversaire chocolat intense, ganache montée. 10 à 14 parts.", price: "380 MAD", availability: "Disponible", image: productImages.cake },
];

export interface GeneratedContent {
  id: string;
  type: "Post Instagram" | "Post Facebook" | "Story" | "Concept Reel";
  title: string;
  caption: string;
  hashtags: string[];
  image: string;
  status: "Brouillon" | "En validation" | "Approuvé" | "Planifié" | "Publié";
}

export const generatedContent: GeneratedContent[] = [
  { id: "g1", type: "Post Instagram", title: "Collection artisanale", caption: "Découvrez notre nouvelle collection de pâtisseries artisanales ✨ Préparées avec amour et un indice glycémique bas, pour se faire plaisir sans culpabiliser. 🍰", hashtags: ["#HellowPatisserie", "#DouceurDeVivre", "#Casablanca", "#PatisserieArtisanale"], image: productImages.cake, status: "En validation" },
  { id: "g2", type: "Post Facebook", title: "Cadeau professionnel", caption: "Le cadeau parfait pour vos événements professionnels. 🎁 Offrez l'élégance Hellow à vos clients et collaborateurs.", hashtags: ["#CadeauCorporate", "#Hellow", "#Rabat", "#GiftBox"], image: productImages.corporate, status: "Approuvé" },
  { id: "g3", type: "Story", title: "Coffret Saint-Valentin", caption: "💕 Édition limitée Saint-Valentin — commandez avant le 12 février ! Swipe up pour craquer.", hashtags: ["#SaintValentin", "#Hellow", "#EditionLimitee"], image: productImages.seasonal, status: "Planifié" },
  { id: "g4", type: "Concept Reel", title: "Making-of Wedding Cake", caption: "Dans les coulisses de votre wedding cake de rêve 👰 Chaque étage raconte votre histoire.", hashtags: ["#WeddingCake", "#Mariage", "#Hellow", "#BehindTheScenes"], image: productImages.wedding, status: "Brouillon" },
  { id: "g5", type: "Post Instagram", title: "Cheese Cake du moment", caption: "Onctueux, fruité, irrésistible 😍 Notre Cheese Cake fruits rouges fait l'unanimité ! Lequel choisirez-vous cette semaine ?", hashtags: ["#CheeseCake", "#Gourmandise", "#Hellow", "#FruitsRouges"], image: productImages.pastry, status: "Publié" },
  { id: "g6", type: "Post Instagram", title: "Coffret Signature", caption: "L'écrin de toutes les douceurs 🎀 Notre Coffret Signature réunit nos best-sellers en une seule boîte élégante.", hashtags: ["#CoffretSignature", "#Hellow", "#GiftIdeas"], image: productImages.giftbox, status: "Brouillon" },
];

export const visualConcepts = [
  { id: "v1", title: "Promotion gâteau", image: productImages.cake, tag: "Campagne" },
  { id: "v2", title: "Promotion coffret cadeau", image: productImages.giftbox, tag: "Cadeau" },
  { id: "v3", title: "Campagne saisonnière", image: productImages.seasonal, tag: "Saison" },
  { id: "v4", title: "Collection mariage", image: productImages.wedding, tag: "Wedding" },
  { id: "v5", title: "Cadeaux corporate", image: productImages.corporate, tag: "Corporate" },
];

// Editorial calendar — June 2026
export interface CalendarPost {
  day: number;
  title: string;
  channel: Channel;
  status: "Brouillon" | "Approuvé" | "Planifié" | "Publié";
}
export const calendarPosts: CalendarPost[] = [
  { day: 2, title: "Cheese Cake du moment", channel: "Instagram", status: "Publié" },
  { day: 4, title: "FAQ livraison", channel: "Facebook", status: "Publié" },
  { day: 7, title: "Collection artisanale", channel: "Instagram", status: "Planifié" },
  { day: 9, title: "Coffret corporate", channel: "Facebook", status: "Approuvé" },
  { day: 12, title: "Story coulisses", channel: "Instagram", status: "Planifié" },
  { day: 14, title: "Wedding showcase", channel: "Instagram", status: "Brouillon" },
  { day: 18, title: "Promo week-end", channel: "Facebook", status: "Approuvé" },
  { day: 21, title: "Concept Reel making-of", channel: "Instagram", status: "Brouillon" },
  { day: 25, title: "Coffret Signature", channel: "Instagram", status: "Brouillon" },
  { day: 28, title: "Témoignage client", channel: "Facebook", status: "Planifié" },
];

export const insights = {
  bestContent: [
    { name: "Cheese Cake du moment", channel: "Instagram", engagement: "8 420", rate: "12.4%" },
    { name: "Coffret Signature", channel: "Instagram", engagement: "6 180", rate: "9.8%" },
    { name: "Collection artisanale", channel: "Instagram", engagement: "5 540", rate: "8.1%" },
    { name: "Cadeau corporate", channel: "Facebook", engagement: "3 210", rate: "6.2%" },
  ],
  topProducts: [
    { name: "Coffret Signature", value: 184 },
    { name: "Cheese Cake Fruits Rouges", value: 152 },
    { name: "Entremets Pistache-Framboise", value: 121 },
    { name: "Plateau Mignardises", value: 98 },
    { name: "Wedding Cake", value: 44 },
  ],
  topQuestions: [
    { q: "Quels sont vos délais de livraison ?", count: 312 },
    { q: "Faites-vous des gâteaux personnalisés ?", count: 268 },
    { q: "Livrez-vous à Rabat / Casablanca ?", count: 241 },
    { q: "Avez-vous des options à indice glycémique bas ?", count: 187 },
    { q: "Proposez-vous des coffrets corporate ?", count: 134 },
  ],
  engagement: [
    { name: "Lun", value: 1240 },
    { name: "Mar", value: 1480 },
    { name: "Mer", value: 1320 },
    { name: "Jeu", value: 1680 },
    { name: "Ven", value: 2100 },
    { name: "Sam", value: 2480 },
    { name: "Dim", value: 1920 },
  ],
};
