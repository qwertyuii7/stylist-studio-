// src/app/explore/page.tsx
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StylistCard from "@/components/StylistCard";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Star,
  X,
  Sparkles,
  Users,
  Heart,
  Tag,
  ArrowRight,
  Eye,
} from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();

  const initialService = searchParams.get("service") || "all";
  const initialTab = searchParams.get("tab") === "influencers" ? "influencers" : "stylists";
  const initialSearch = searchParams.get("q") || searchParams.get("search") || searchParams.get("occasion") || searchParams.get("filter") || "";

  const [activeTab, setActiveTab] = useState<"stylists" | "influencers">(initialTab);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  useEffect(() => {
    const s = searchParams.get("service");
    if (s && coreServices.some((cs) => cs.id === s)) {
      setSelectedService(s);
    }
    const t = searchParams.get("tab");
    if (t === "influencers" || t === "stylists") {
      setActiveTab(t);
    }
    const q = searchParams.get("q") || searchParams.get("search") || searchParams.get("occasion") || searchParams.get("filter");
    if (q) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Influencer Lookbook Feed Data
  const influencerLooks = [
    {
      id: "look-1",
      title: "Royal Emerald Velvet Sangeet Ensemble",
      influencerName: "Tara Sutaria Style Inspiration",
      imageUrl: "/service_wardrobe.jpg",
      styledBy: mockStylists[0],
      occasion: "Festive / Sangeet",
      tags: ["velvet", "emerald", "festive", "bridal"],
      likes: 342,
    },
    {
      id: "look-2",
      title: "Monochrome Power Suiting & Minimalist Silk",
      influencerName: "Komal Pandey Aesthetic",
      imageUrl: "/service_consulting.jpg",
      styledBy: mockStylists[1],
      occasion: "Editorial / Corporate",
      tags: ["power-suit", "formal", "menswear", "fusion"],
      likes: 512,
    },
    {
      id: "look-3",
      title: "Indo-Western Pastel Organza Draped Saree",
      influencerName: "Masoom Minawala Global Look",
      imageUrl: "/service_travel.jpg",
      styledBy: mockStylists[3],
      occasion: "Day Wedding / High Tea",
      tags: ["organza", "pastel", "saree", "handcrafted"],
      likes: 890,
    },
    {
      id: "look-4",
      title: "Contemporary Linen Kurta with Trench Overlayer",
      influencerName: "Urban Desi Trendsetters",
      imageUrl: "/service_shopping.jpg",
      styledBy: mockStylists[1],
      occasion: "Casual Fusion",
      tags: ["linen", "streetwear", "modern", "kurta"],
      likes: 275,
    },
    {
      id: "look-5",
      title: "Intricate Zardozi Banarasi Heritage Look",
      influencerName: "Diwali Celebrity Gala Edition",
      imageUrl: "/hero.jpg",
      styledBy: mockStylists[0],
      occasion: "Heritage Bridal",
      tags: ["banarasi", "heritage", "zardozi", "gold"],
      likes: 1204,
    },
    {
      id: "look-6",
      title: "Bohemian Sunset Mehendi Silhouette",
      influencerName: "Festival Season Edit",
      imageUrl: "/stylist_1.jpg",
      styledBy: mockStylists[2],
      occasion: "Mehendi / Haldi",
      tags: ["boho", "yellow", "mirror-work", "festive"],
      likes: 419,
    },
  ];

  const allCities = useMemo(() => {
    const cities = new Set<string>();
    mockStylists.forEach((s) => s.destinations.forEach((d) => cities.add(d)));
    return Array.from(cities).sort();
  }, []);

  const filteredStylists = useMemo(() => {
    let results = mockStylists.filter((stylist) => {
      const matchesSearch =
        searchTerm === "" ||
        stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.keywords.some((kw) =>
          kw.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        stylist.destinations.some((d) =>
          d.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesGender =
        selectedGender === "all" || stylist.genderSpecialty === selectedGender;

      const matchesService =
        selectedService === "all" ||
        stylist.services.some((s) => s.serviceId === selectedService);

      const matchesCity =
        selectedCity === "all" ||
        stylist.destinations.some(
          (d) => d.toLowerCase() === selectedCity.toLowerCase()
        );

      return matchesSearch && matchesGender && matchesService && matchesCity;
    });

    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      results.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === "price-low") {
      results.sort((a, b) => {
        const minA = Math.min(
          ...a.services.map(
            (s) =>
              s.customPrice ||
              coreServices.find((cs) => cs.id === s.serviceId)?.basePrice ||
              9999
          )
        );
        const minB = Math.min(
          ...b.services.map(
            (s) =>
              s.customPrice ||
              coreServices.find((cs) => cs.id === s.serviceId)?.basePrice ||
              9999
          )
        );
        return minA - minB;
      });
    }

    return results;
  }, [searchTerm, selectedGender, selectedService, selectedCity, sortBy]);

  const hasActiveFilters =
    searchTerm ||
    selectedGender !== "all" ||
    selectedService !== "all" ||
    selectedCity !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGender("all");
    setSelectedService("all");
    setSelectedCity("all");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Explore Style & Talent
            </h1>
            <p className="text-text-secondary max-w-lg text-sm">
              Discover verified fashion stylists or get inspired by Pinterest-style influencer looks with direct stylist booking.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-surface-muted p-1.5 rounded-2xl border border-border self-start">
            <button
              onClick={() => setActiveTab("stylists")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "stylists"
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <Users size={15} /> Stylist Directory ({mockStylists.length})
            </button>
            <button
              onClick={() => setActiveTab("influencers")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "influencers"
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <Sparkles size={15} /> Influencer Looks Hub
            </button>
          </div>
        </div>

        {/* ===== TAB 1: STYLIST DIRECTORY ===== */}
        {activeTab === "stylists" && (
          <div className="space-y-8 animate-fade-in">
            {/* Filters Bar */}
            <div className="bg-white border border-border rounded-3xl p-5 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-grow">
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                    size={17}
                  />
                  <input
                    type="text"
                    placeholder="Search stylists by aesthetic, specialty, city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface-muted border border-border rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>

                {/* City */}
                <div className="relative shrink-0">
                  <MapPin
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={15}
                  />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="appearance-none pl-9 pr-9 py-3 bg-surface-muted border border-border rounded-2xl text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    {allCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={15}
                  />
                </div>

                {/* Gender */}
                <div className="relative shrink-0">
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-3 bg-surface-muted border border-border rounded-2xl text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Specialties</option>
                    <option value="women">Women's Styling</option>
                    <option value="men">Men's Styling</option>
                    <option value="unisex">Unisex</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={15}
                  />
                </div>

                {/* Service */}
                <div className="relative shrink-0">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-3 bg-surface-muted border border-border rounded-2xl text-xs font-semibold focus:outline-none cursor-pointer max-w-[190px] truncate"
                  >
                    <option value="all">All Services</option>
                    {coreServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={15}
                  />
                </div>

                {/* Sort */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-9 py-3 bg-surface-muted border border-border rounded-2xl text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviewed</option>
                    <option value="price-low">Price: Low to High</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={15}
                  />
                </div>
              </div>

              {/* Active Filters Row */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-light text-xs">
                  <span className="text-text-muted">Active Filters:</span>
                  {searchTerm && (
                    <span className="bg-accent-light text-accent px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                      "{searchTerm}"{" "}
                      <button onClick={() => setSearchTerm("")}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedCity !== "all" && (
                    <span className="bg-accent-light text-accent px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                      {selectedCity}{" "}
                      <button onClick={() => setSelectedCity("all")}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-accent hover:underline ml-2"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Stylists Grid */}
            {filteredStylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStylists.map((stylist) => (
                  <StylistCard key={stylist.id} stylist={stylist} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-border">
                <Search className="text-text-muted mx-auto mb-3" size={32} />
                <h3 className="font-serif text-xl font-bold mb-1">
                  No stylists matched your filters
                </h3>
                <p className="text-xs text-text-secondary mb-4">
                  Try clearing some filters to explore more talented stylists.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent-hover transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== TAB 2: INFLUENCER LOOKS HUB (PINTEREST STYLE) ===== */}
        {activeTab === "influencers" && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-accent-light via-surface-muted to-accent-light p-6 md:p-8 rounded-3xl border border-accent/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Trending Influencer Styling
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-1">
                  Get Inspired & Book the Look
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Click any look to view the stylist who conceptualized it and book a consultation to recreate it for your event.
                </p>
              </div>

              <Link
                href="/custom-request"
                className="bg-accent text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-accent-hover transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <Sparkles size={14} /> Request Custom Outfit
              </Link>
            </div>

            {/* Masonry Inspiration Feed */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {influencerLooks.map((look) => (
                <div
                  key={look.id}
                  className="break-inside-avoid bg-white rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={look.imageUrl}
                      alt={look.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                      <div className="flex justify-between items-center">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold">
                          {look.occasion}
                        </span>
                        <div className="flex items-center gap-1 text-xs">
                          <Heart size={14} className="fill-red-500 text-red-500" />
                          <span>{look.likes}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-bold mb-1">
                          {look.title}
                        </h4>
                        <p className="text-xs text-white/80 mb-3">
                          {look.influencerName}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {look.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stylist Tag Link & Action */}
                  <div className="p-4 bg-white flex items-center justify-between border-t border-border-light">
                    <Link
                      href={`/stylist/${look.styledBy.id}`}
                      className="flex items-center gap-2.5 group/sty min-w-0"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                        <Image
                          src={look.styledBy.imageUrl}
                          alt={look.styledBy.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-foreground group-hover/sty:text-accent truncate">
                          {look.styledBy.name}
                        </div>
                        <div className="text-[10px] text-text-muted">
                          ★ {look.styledBy.rating} Stylist
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/stylist/${look.styledBy.id}`}
                      className="bg-accent-light text-accent hover:bg-accent hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    >
                      Book Look <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}

