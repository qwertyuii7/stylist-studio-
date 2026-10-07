// src/app/signature/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockStylists } from "@/data/mockDatabase";
import {
  Sparkles,
  Heart,
  Share2,
  Tag,
  ArrowRight,
  Filter,
  Eye,
  CheckCircle2,
  Scissors,
  Calendar,
  X,
  Star,
} from "lucide-react";

interface InfluencerLook {
  id: string;
  title: string;
  celebrityName: string;
  celebrityAvatar: string;
  category: "Red Carpet" | "Royal Wedding" | "Indo-Western" | "Airport Chic" | "Couture Gala";
  event: string;
  imageUrl: string;
  designer: string;
  fabrics: string[];
  colorPalette: string[];
  description: string;
  recreationCostEstimate: number; // In INR (₹)
  matchedStylist: (typeof mockStylists)[0];
  likes: number;
}

export default function SignatureCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeLook, setActiveLook] = useState<InfluencerLook | null>(null);
  const [likedLooks, setLikedLooks] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  const curatedLooks: InfluencerLook[] = [
    {
      id: "cur-1",
      title: "Royal Emerald Velvet & Zardozi Banarasi Ensemble",
      celebrityName: "Deepika Padukone Inspiration",
      celebrityAvatar: "https://i.pravatar.cc/150?u=deepika",
      category: "Red Carpet",
      event: "Cannes Film Festival & Heritage Gala",
      imageUrl: "/service_wardrobe.jpg",
      designer: "Sabyasachi Heritage Couture",
      fabrics: ["Pure Banarasi Silk", "Micro-Velvet", "Real Zari"],
      colorPalette: ["Emerald Green", "Antique Gold", "Midnight Black"],
      description: "A show-stopping regal silhouette featuring structured velvet drape over hand-woven Banarasi zari weave, completed with vintage polki choker coordination.",
      recreationCostEstimate: 45000,
      matchedStylist: mockStylists[0], // Priya Sharma
      likes: 1420,
    },
    {
      id: "cur-2",
      title: "Pastel Ombre Organza Sangeet Lehenga with Swarovski Pearls",
      celebrityName: "Kiara Advani Wedding Edit",
      celebrityAvatar: "https://i.pravatar.cc/150?u=kiara",
      category: "Royal Wedding",
      event: "Jaisalmer Palace Wedding Ceremony",
      imageUrl: "/hero.jpg",
      designer: "Manish Malhotra Bridal",
      fabrics: ["Hand-dyed Organza", "French Tulle", "Swarovski Pearls"],
      colorPalette: ["Dusty Rose", "Champagne Gold", "Blush Pink"],
      description: "Ethereal pastel tones with ultra-lightweight organza layers, featuring over 10,000 hand-sewn micro crystals and an unlined translucent dupatta.",
      recreationCostEstimate: 55000,
      matchedStylist: mockStylists[3], // Ritika Menon
      likes: 2190,
    },
    {
      id: "cur-3",
      title: "Avant-Garde Blazer Saree with Metallic Corset Cinching",
      celebrityName: "Komal Pandey Aesthetic",
      celebrityAvatar: "https://i.pravatar.cc/150?u=komal",
      category: "Indo-Western",
      event: "High Fashion Week & Creator Awards",
      imageUrl: "/service_travel.jpg",
      designer: "Contemporary Indo-Western Lab",
      fabrics: ["Structured Wool Blend", "Satin Georgette", "Metallic Bonded Leather"],
      colorPalette: ["Monochrome Jet Black", "Molten Gold", "Ivory"],
      description: "Bold power tailoring seamlessly fused with traditional saree pallu pleating. Accented with sharp shoulders and a modern corset belt.",
      recreationCostEstimate: 22000,
      matchedStylist: mockStylists[1], // Arjun Kapoor
      likes: 1850,
    },
    {
      id: "cur-4",
      title: "Bohemian Mirror-Work Haldi Co-ord Set with Cape",
      celebrityName: "Tara Sutaria Festive Look",
      celebrityAvatar: "https://i.pravatar.cc/150?u=tara",
      category: "Royal Wedding",
      event: "Sunset Beach Mehendi & Haldi Soiree",
      imageUrl: "/stylist_1.jpg",
      designer: "Arpita Mehta Signature",
      fabrics: ["Georgette Crepe", "Authentic Kutch Mirrors", "Raw Silk"],
      colorPalette: ["Marigold Yellow", "Terracotta", "Turquoise Accents"],
      description: "Fun, effortless, and dance-ready festive silhouette with a flowing floor-length sheer cape and intricate mirror-work bralette.",
      recreationCostEstimate: 28000,
      matchedStylist: mockStylists[2], // Nisha Patel
      likes: 980,
    },
    {
      id: "cur-5",
      title: "Maximalist Royal Velvet Bandhgala with Tonal Breeches",
      celebrityName: "Ranveer Singh Statement",
      celebrityAvatar: "https://i.pravatar.cc/150?u=ranveer",
      category: "Red Carpet",
      event: "Bollywood Film Awards & Royal Reception",
      imageUrl: "/service_consulting.jpg",
      designer: "Rohit Bal Couture",
      fabrics: ["Heavy Velvet", "Embossed Brocade", "Italian Wool"],
      colorPalette: ["Deep Wine", "Burnt Burgundy", "Gold"],
      description: "Opulent regal menswear look featuring intricate floral resham threadwork across the collar and cuffs, paired with custom bespoke footwear.",
      recreationCostEstimate: 38000,
      matchedStylist: mockStylists[1], // Arjun Kapoor
      likes: 1340,
    },
    {
      id: "cur-6",
      title: "Parisian Streetwear Raw Silk Kurta with Trench Overcoat",
      celebrityName: "Masoom Minawala Global Style",
      celebrityAvatar: "https://i.pravatar.cc/150?u=masoom",
      category: "Airport Chic",
      event: "Paris Fashion Week Streetstyle",
      imageUrl: "/service_shopping.jpg",
      designer: "Global Desi Fusion",
      fabrics: ["Mulberry Silk", "Waterproof Gabardine", "Pure Cotton"],
      colorPalette: ["Camel Beige", "Oatmeal", "Forest Green"],
      description: "Modern travel couture combining Indian handloom silhouettes with clean European outerwear lines for effortless global chic.",
      recreationCostEstimate: 19500,
      matchedStylist: mockStylists[0], // Priya Sharma
      likes: 1120,
    },
  ];

  const categories = [
    { key: "all", label: "All Curated Looks" },
    { key: "Red Carpet", label: "Celebrity Red Carpet 🏆" },
    { key: "Royal Wedding", label: "Royal Bollywood Weddings 💍" },
    { key: "Indo-Western", label: "Indo-Western Fusion ⚡" },
    { key: "Airport Chic", label: "Airport & Global Chic ✈️" },
  ];

  const filteredLooks =
    selectedCategory === "all"
      ? curatedLooks
      : curatedLooks.filter((l) => l.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedLooks((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleShare = (look: InfluencerLook, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-10 space-y-10">
        {/* Luxury Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-accent-light text-accent text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles size={14} /> Influential Celebrity & Creator Collections
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            The Signature Collection
          </h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            Get inspired by iconic celebrity moments, red-carpet ensembles, and viral creator aesthetics. Match directly with the platform stylists who can recreate, tailor, or customize these exact looks for your upcoming events.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? "bg-accent text-white shadow-md scale-105"
                  : "bg-surface-muted text-text-secondary border border-border hover:bg-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Curations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLooks.map((look) => {
            const totalLikes = look.likes + (likedLooks[look.id] || 0);

            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveLook(look)}
                className="bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Image with gradient overlay */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={look.imageUrl}
                      alt={look.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-5 text-white">
                      <div className="flex justify-between items-center">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {look.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleShare(look, e)}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                          >
                            <Share2 size={14} />
                          </button>
                          <button
                            onClick={(e) => handleLike(look.id, e)}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors flex items-center gap-1 text-xs"
                          >
                            <Heart
                              size={14}
                              className={
                                likedLooks[look.id]
                                  ? "fill-red-500 text-red-500"
                                  : "text-white"
                              }
                            />
                            <span>{totalLikes}</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Image
                            src={look.celebrityAvatar}
                            alt={look.celebrityName}
                            width={22}
                            height={22}
                            className="rounded-full border border-white/40"
                          />
                          <span className="text-xs font-bold text-white/90">
                            {look.celebrityName}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold leading-snug">
                          {look.title}
                        </h3>
                        <p className="text-[11px] text-white/70 mt-1 truncate">
                          {look.event} • {look.designer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fabrics & Styling Badges */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {look.fabrics.map((f) => (
                        <span
                          key={f}
                          className="bg-surface-muted text-text-secondary text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {look.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Matched Stylist & Actions */}
                <div className="p-5 pt-3 border-t border-border-light bg-surface-muted/40 flex items-center justify-between gap-3">
                  <Link
                    href={`/stylist/${look.matchedStylist.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2.5 min-w-0 group/sty"
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border shrink-0">
                      <Image
                        src={look.matchedStylist.imageUrl}
                        alt={look.matchedStylist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-foreground group-hover/sty:text-accent truncate">
                        {look.matchedStylist.name}
                      </div>
                      <div className="text-[10px] text-text-muted flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400 text-amber-400" />
                        <span>{look.matchedStylist.rating} Verified Stylist</span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={`/custom-request`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-accent text-white hover:bg-accent-hover px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0"
                  >
                    <Scissors size={13} /> Recreate Look
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== LOOK DETAILS & RECREATION MODAL ===== */}
        <AnimatePresence>
          {activeLook && (
            <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]"
              >
                <button
                  onClick={() => setActiveLook(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Left: Look Media */}
                <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto min-h-[350px]">
                  <Image
                    src={activeLook.imageUrl}
                    alt={activeLook.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {activeLook.category}
                  </div>
                </div>

                {/* Right: Breakdown & Stylist Booking */}
                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2 overflow-y-auto space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={activeLook.celebrityAvatar}
                        alt={activeLook.celebrityName}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <span className="text-xs font-bold text-accent">
                        {activeLook.celebrityName}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
                      {activeLook.title}
                    </h2>
                    <p className="text-xs text-text-muted mb-4">
                      {activeLook.event} • Designed by {activeLook.designer}
                    </p>

                    <p className="text-xs text-text-secondary leading-relaxed mb-5">
                      {activeLook.description}
                    </p>

                    {/* Fabrics & Colors Breakdown */}
                    <div className="space-y-3 bg-surface-muted p-4 rounded-2xl border border-border">
                      <div>
                        <span className="text-[10px] font-bold text-text-muted uppercase block mb-1">
                          Craft & Fabric Breakdown
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeLook.fabrics.map((f) => (
                            <span
                              key={f}
                              className="bg-white text-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-border"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-text-muted uppercase block mb-1">
                          Curated Palette
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeLook.colorPalette.map((c) => (
                            <span
                              key={c}
                              className="bg-accent-light text-accent text-[10px] font-bold px-2.5 py-0.5 rounded-lg"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stylist Match & Action */}
                  <div className="pt-4 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src={activeLook.matchedStylist.imageUrl}
                          alt={activeLook.matchedStylist.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-xs font-bold text-foreground">
                            {activeLook.matchedStylist.name}
                          </div>
                          <div className="text-[10px] text-text-muted">
                            Master Stylist for this Aesthetic
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-text-muted">
                          Recreation Est.
                        </div>
                        <div className="font-serif text-lg font-bold text-accent">
                          ₹{activeLook.recreationCostEstimate.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/stylist/${activeLook.matchedStylist.id}`}
                        className="border border-border text-foreground hover:bg-surface-muted py-3 rounded-xl text-xs font-bold text-center transition-colors"
                      >
                        Book Consultation
                      </Link>

                      <Link
                        href={`/custom-request`}
                        className="bg-accent hover:bg-accent-hover text-white py-3 rounded-xl text-xs font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Scissors size={14} /> Recreate for Me
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
