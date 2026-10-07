// src/app/stylist/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/stylist/PortfolioGrid";
import BookingCalendar from "@/components/stylist/BookingCalendar";
import ChatInterface from "@/components/chat/ChatInterface";
import CheckoutFlow from "@/components/payment/CheckoutFlow";
import {
  Star,
  MapPin,
  MessageCircle,
  Calendar,
  Video,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronLeft,
  ShoppingBag,
  Heart,
  Share2,
  Globe,
  Tag,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gift,
  Check,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function StylistProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const stylist = mockStylists.find((s) => s.id === id) || mockStylists[0];
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "portfolio" | "booking" | "subscriptions" | "services" | "reviews" | "about"
  >("portfolio");

  // Chat modal state
  const [showChatModal, setShowChatModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Promotional Offers for Festive Seasons
  const mockOffers = [
    {
      id: "off-1",
      title: "Festive Season Celebration Offer",
      code: "FESTIVE25",
      discountPercent: 25,
      description: "Get 25% off on complete festive & wedding styling consultations.",
    },
    {
      id: "off-2",
      title: "Wardrobe Revamp Special",
      code: "REVAMP15",
      discountPercent: 15,
      description: "15% off on personal styling & image consulting sessions.",
    },
  ];

  // Subscription Plans
  const subscriptionPlans = [
    {
      id: "sub-basic",
      name: "Monthly Wardrobe Refresh",
      price: 4999,
      interval: "month",
      description: "Continuous monthly styling consultations, lookbook curations, and shopping assistance.",
      features: [
        "2 One-on-One 60 min video consultations per month",
        "Personalized digital moodboard & shopping links",
        "Priority chat access with the stylist",
        "Seasonal wardrobe audit",
        "Free rescheduling anytime",
      ],
      recommended: false,
    },
    {
      id: "sub-vip",
      name: "Seasonal VIP Styling Club",
      price: 11999,
      interval: "quarter",
      description: "Full end-to-end personal styling management for work, events, and festive celebrations.",
      features: [
        "Unlimited direct messaging & outfit feedback",
        "4 One-on-One deep dive styling sessions",
        "Custom wedding/event styling lookbooks",
        "Exclusive designer sample sale access",
        "Dedicated emergency styling support (same-day reply)",
      ],
      recommended: true,
    },
  ];

  // Map portfolio items
  const portfolioItems = (stylist.portfolioImages || []).map((img, i) => ({
    id: `port-${i}`,
    title: i === 0 ? "Indo-Western Fusion" : i === 1 ? "Celebrity Red Carpet" : "Contemporary Festive Look",
    imageUrl: img,
    description: `Curated bespoke outfit by ${stylist.name} showcasing silhouette harmony, vibrant palette, and handcrafted accessories.`,
    tags: stylist.keywords || ["festive", "couture", "modern"],
    likesCount: 24 + i * 18,
  }));

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Navbar />

      <main className="flex-grow">
        {/* Back button & Share Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} /> Back to Directory
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-border bg-white hover:bg-surface-muted transition-all shadow-xs"
          >
            <Share2 size={14} className="text-accent" />
            {copiedLink ? "Profile Link Copied!" : "Share Portfolio Link"}
          </button>
        </div>

        {/* ===== HERO STYLIST HEADER ===== */}
        <section className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-6">
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Stylist Profile Photo */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden shrink-0 border-2 border-border shadow-md">
                <Image
                  src={stylist.imageUrl}
                  alt={stylist.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-2.5 right-2.5 bg-success text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <CheckCircle2 size={11} /> Verified
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-grow w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div>
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground font-bold tracking-tight">
                      {stylist.name}
                    </h1>
                    <p className="text-sm text-text-secondary italic mt-0.5">
                      "{stylist.tagline}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setShowChatModal(true)}
                      className="bg-accent text-white px-5 py-2.5 rounded-2xl text-xs font-semibold hover:bg-accent-hover transition-all flex items-center gap-2 shadow-sm"
                    >
                      <MessageCircle size={15} /> Chat with Stylist
                    </button>
                  </div>
                </div>

                {/* Rating & Location & Experience */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium my-3">
                  <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full border border-amber-200">
                    <Star size={14} className="fill-amber-400 text-amber-500" />
                    <span className="font-bold">{stylist.rating}</span> ({stylist.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    <MapPin size={14} className="text-accent" /> {stylist.destinations.join(", ")}
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    <Clock size={14} className="text-accent" /> {stylist.experience} Experience
                  </span>
                </div>

                {/* Aesthetic Tags & Languages */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {stylist.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="bg-accent-light text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-semibold capitalize"
                    >
                      #{kw}
                    </span>
                  ))}
                  {stylist.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-surface-muted text-text-secondary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    >
                      <Globe size={11} /> {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Festive Season Bonus Banner */}
            <div className="mt-6 pt-5 border-t border-border-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-accent-light/60 via-surface-muted to-accent-light/40 p-4 rounded-2xl border border-accent/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Gift size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Festive Season Bonus
                  </span>
                  <p className="text-xs text-foreground font-medium">
                    Use code <span className="font-bold text-accent">FESTIVE25</span> for 25% off styling packages!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("booking")}
                className="text-xs font-bold text-accent hover:text-accent-hover flex items-center gap-1 underline underline-offset-4"
              >
                Apply Offer <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* ===== TAB NAVIGATION ===== */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex gap-1 overflow-x-auto scrollbar-none">
              {[
                { key: "portfolio", label: "Portfolio Looks", icon: <Sparkles size={16} /> },
                { key: "booking", label: "Book Calendar Slot", icon: <Calendar size={16} /> },
                { key: "subscriptions", label: "Subscription Plans", icon: <Zap size={16} /> },
                { key: "services", label: "Services & Rates", icon: <ShoppingBag size={16} /> },
                { key: "reviews", label: "Client Reviews", icon: <Star size={16} /> },
                { key: "about", label: "About Bio", icon: <Clock size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "border-accent text-accent"
                      : "border-transparent text-text-muted hover:text-foreground hover:border-border"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== TAB CONTENT ===== */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          {/* 1. PORTFOLIO TAB */}
          {activeTab === "portfolio" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-bold">
                    Portfolio & Curated Looks
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Explore high-fashion editorial, wedding, and everyday looks designed by {stylist.name}.
                  </p>
                </div>
              </div>

              <PortfolioGrid items={portfolioItems} stylistName={stylist.name} />
            </div>
          )}

          {/* 2. CALENDAR SCHEDULING TAB */}
          {activeTab === "booking" && (
            <div className="animate-fade-in space-y-6">
              <BookingCalendar
                stylistId={stylist.id}
                stylistName={stylist.name}
                promotionalOffers={mockOffers}
                userId="client-1"
              />
            </div>
          )}

          {/* 3. SUBSCRIPTION-BASED BOOKING TAB */}
          {activeTab === "subscriptions" && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-accent text-xs font-bold uppercase tracking-wider">
                  Ongoing Retainer Styling
                </span>
                <h2 className="font-serif text-3xl text-foreground font-bold mt-1">
                  Styling Subscription Packages
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Subscribe for continuous monthly wardrobe refreshes, constant event styling support, and priority consultations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-3xl p-8 bg-white border flex flex-col justify-between transition-all ${
                      plan.recommended
                        ? "border-accent ring-2 ring-accent/30 shadow-xl relative"
                        : "border-border shadow-sm hover:shadow-md"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed mb-6">
                        {plan.description}
                      </p>

                      <div className="mb-6 pb-6 border-b border-border">
                        <span className="font-serif text-4xl font-bold text-foreground">
                          ₹{plan.price.toLocaleString()}
                        </span>
                        <span className="text-text-muted text-xs font-semibold ml-1">
                          / {plan.interval}
                        </span>
                      </div>

                      <div className="space-y-3 mb-8">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <CheckoutFlow
                      amount={plan.price}
                      planId={plan.id}
                      stylistId={stylist.id}
                      buttonText={`Subscribe for ₹${plan.price.toLocaleString()}/${plan.interval}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SERVICES TAB */}
          {activeTab === "services" && (
            <div className="animate-fade-in space-y-6">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-foreground font-bold">
                  Available Services & Direct Booking
                </h2>
                <p className="text-sm text-text-secondary">
                  Choose individual sessions or bundle multiple styling services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stylist.services.map((s) => {
                  const baseService = coreServices.find((cs) => cs.id === s.serviceId);
                  if (!baseService) return null;
                  const price = s.customPrice || baseService.basePrice;

                  return (
                    <div
                      key={s.serviceId}
                      className="bg-white border border-border rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="text-3xl mb-3">{baseService.icon}</div>
                        <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                          {baseService.title}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed mb-4">
                          {baseService.description}
                        </p>
                        <div className="text-xs text-text-muted flex items-center gap-2 mb-6">
                          <Clock size={13} className="text-accent" /> {baseService.duration}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="font-bold text-xl text-foreground">
                          ₹{price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => setActiveTab("booking")}
                          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="font-serif text-5xl font-bold text-foreground">
                    {stylist.rating}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} className="fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-text-muted">
                      Based on {stylist.reviewCount} verified client reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {stylist.reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-surface-muted border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={r.clientAvatar}
                            alt={r.clientName}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <span className="font-semibold text-xs text-foreground">
                              {r.clientName}
                            </span>
                            <span className="text-[10px] text-text-muted ml-2">
                              {r.service}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: r.rating }).map((_, idx) => (
                            <Star key={idx} size={12} className="fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. ABOUT TAB */}
          {activeTab === "about" && (
            <div className="animate-fade-in bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  About {stylist.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {stylist.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <span className="text-[11px] font-semibold text-text-muted uppercase">
                    Experience
                  </span>
                  <p className="text-sm font-bold text-foreground">{stylist.experience}</p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-text-muted uppercase">
                    Specialty
                  </span>
                  <p className="text-sm font-bold text-foreground capitalize">
                    {stylist.genderSpecialty} Styling
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-text-muted uppercase">
                    Availability
                  </span>
                  <p className="text-sm font-bold text-foreground">{stylist.availability}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ===== REAL-TIME CHAT MODAL ===== */}
      {showChatModal && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-surface-muted text-text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
            <ChatInterface
              currentUserId="client-user-1"
              stylistProfileId={stylist.id}
              otherPartyName={stylist.name}
              otherPartyAvatar={stylist.imageUrl}
              isStylist={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
