// src/components/services/SpecialOccasionStyling.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Tag,
  CheckCircle2,
  Copy,
  Check,
  Flame,
  Gift,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function SpecialOccasionStyling() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("FESTIVE25");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-surface-muted/60 via-white to-surface-muted/40 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-3">
              <Flame size={14} className="text-accent animate-pulse" />
              <span>Limited Festive & Occasion Edition</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold">
              Navratri, Festive & Event Special Styling
            </h2>
            <p className="text-text-secondary max-w-2xl mt-2 text-sm md:text-base leading-relaxed">
              Step into the celebrations with confidence. From vibrant 9-night Garba ensembles to regal wedding couture, explore curated styling services tailored for Indian celebrations.
            </p>
          </div>

          {/* Coupon Code Pill */}
          <div className="bg-white border-2 border-dashed border-accent/40 rounded-2xl p-3 md:p-4 shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent shrink-0">
              <Gift size={20} />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                Festival Bonus • 25% Off
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono font-bold text-accent text-sm md:text-base">
                  FESTIVE25
                </span>
                <button
                  onClick={handleCopyCode}
                  className="bg-accent/10 hover:bg-accent text-accent hover:text-white px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all"
                  title="Copy coupon code"
                >
                  {copiedCode ? (
                    <>
                      <Check size={12} className="text-success" />
                      <span className="text-success font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Special Occasion Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Navratri & Festive Styling Special */}
          <div className="relative bg-gradient-to-br from-amber-500/[0.07] via-rose-500/[0.04] to-white border border-amber-500/25 rounded-3xl p-7 md:p-9 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Top decorative badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-rose-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-xs">
              9 Nights of Glam
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl p-2.5 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  🪔
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    Navratri & Garba Season
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-foreground mt-1">
                    Navratri & Festive Celebration Styling
                  </h3>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Light up the dance floor with dance-proof Chaniya Cholis, mirror-work jackets, vibrant Kediyu, and contemporary Garba Indo-Western fusion looks customized for each night.
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-7 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-500/15">
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">9-Day Auspicious Color Coordination:</strong> Outfit curation aligned with each Navratri color ritual.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Dance-Ready & Breathable Drapes:</strong> Lightweight fabrics engineered for non-stop Dandiya & Garba.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Oxidized Jewelry & Accessories:</strong> Complete mapping of jhumkas, waistbands, and footwear.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Express 24-Hour Delivery:</strong> Rush lookbooks delivered in time for upcoming festival nights.
                  </span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-5 border-t border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-text-muted line-through">₹3,499</span>
                  <span className="font-bold text-2xl text-foreground">From ₹2,499</span>
                </div>
                <div className="text-[11px] text-text-secondary flex items-center gap-1.5 mt-0.5">
                  <Clock size={12} className="text-amber-600" /> 90 min session • Custom Lookbook
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href="/explore?tab=influencers&filter=festive"
                  className="px-4 py-2.5 rounded-xl border border-amber-500/30 text-amber-800 hover:bg-amber-500/10 text-xs font-bold transition-all text-center flex-1 sm:flex-none"
                >
                  View Lookbooks
                </Link>
                <Link
                  href="/explore?service=s6&occasion=navratri"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 flex-1 sm:flex-none group-hover:translate-x-0.5"
                >
                  Book Navratri Stylist <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Wedding & Event Special Styling */}
          <div className="relative bg-gradient-to-br from-purple-500/[0.07] via-accent/[0.04] to-white border border-purple-500/25 rounded-3xl p-7 md:p-9 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Top decorative badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-accent text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-xs">
              Royal Occasion Edition
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl p-2.5 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  💍
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                    Weddings & Special Events
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-foreground mt-1">
                    Wedding & Milestone Event Styling
                  </h3>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Turn heads with custom couture for Weddings, Sangeet parties, Mehendi brunches, Receptions, and Gala events. End-to-end guidance from moodboards to final trials.
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-7 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-purple-500/15">
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Multi-Event Wardrobe Blueprint:</strong> Synchronized outfits across Haldi, Mehendi, Sangeet & Reception.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Couple & Bridal Party Harmony:</strong> Flawless color palettes balancing your partner and family.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Designer & Boutique Matchmaking:</strong> Verified designer sourcing with discounts on lehengas & sherwanis.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">1-on-1 Trial & Drape Sessions:</strong> Virtual or in-person trials with India's top celebrity stylists.
                  </span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-5 border-t border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-text-muted line-through">₹5,499</span>
                  <span className="font-bold text-2xl text-foreground">From ₹3,999</span>
                </div>
                <div className="text-[11px] text-text-secondary flex items-center gap-1.5 mt-0.5">
                  <Clock size={12} className="text-purple-600" /> 120 min session • Swatch & Sourcing Guide
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href="/explore?tab=influencers&filter=bridal"
                  className="px-4 py-2.5 rounded-xl border border-purple-500/30 text-purple-800 hover:bg-purple-500/10 text-xs font-bold transition-all text-center flex-1 sm:flex-none"
                >
                  View Lookbooks
                </Link>
                <Link
                  href="/explore?service=s3&occasion=wedding"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 flex-1 sm:flex-none group-hover:translate-x-0.5"
                >
                  Book Event Stylist <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Festive Guarantee & Value-Add Banner */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Express 24H Turnaround
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Receive personalized digital lookbook within 24 hours of booking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Tag size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Promo Code FESTIVE25
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Flat 25% discount applied at checkout for all festive packages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Verified Designers
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Direct store links and exclusive discounts with top fashion houses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                  Free 1-Time Drape Review
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  Free 15-min pre-event video call to ensure your outfit fits perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
