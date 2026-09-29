"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, Sparkles, Navigation, LayoutGrid, Heart, ShieldCheck, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StylistCard from "@/components/StylistCard";
import { mockStylists, coreServices } from "@/data/mockDatabase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-accent/20">
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section with Prominent Segmented Search Console (Stitch Inspired) */}
        <section className="relative pt-12 md:pt-20 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
          
          <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
            <h1 className="font-serif text-5xl md:text-7xl leading-tight text-foreground tracking-tight">
              Curated Styling for Wherever Life Takes You.
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mt-4">
              Connect with world-class personal stylists, wardrobe curators, and fashion directors tailored to your destination, aesthetic, and calendar.
            </p>
          </div>

          {/* District/MakeMyTrip Style Floating Booking Console */}
          <div className="bg-white border border-border rounded-2xl md:rounded-full p-2 shadow-xl max-w-5xl mx-auto relative z-10 mt-8">
            <form className="flex flex-col md:flex-row items-center w-full">
              
              {/* Segment 1: Occasion / Destination */}
              <div className="flex-1 w-full px-4 py-3 md:px-6 rounded-xl md:rounded-full hover:bg-surface-muted transition-colors duration-150 cursor-pointer flex items-center gap-4">
                <MapPin className="text-accent shrink-0" size={24} />
                <div className="flex-1 text-left">
                  <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Where or what occasion?</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Amalfi Coast, Paris Fashion Week" 
                    className="w-full bg-transparent border-0 p-0 text-foreground font-medium placeholder:text-text-muted focus:ring-0 focus:outline-none truncate text-sm"
                  />
                </div>
              </div>
              
              <div className="hidden md:block w-px h-10 bg-border shrink-0 mx-2"></div>
              
              {/* Segment 2: Vibe & Aesthetic */}
              <div className="flex-1 w-full px-4 py-3 md:px-6 rounded-xl md:rounded-full hover:bg-surface-muted transition-colors duration-150 cursor-pointer flex items-center gap-4">
                <LayoutGrid className="text-foreground shrink-0" size={24} />
                <div className="flex-1 text-left pr-4">
                  <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Vibe & Aesthetic</label>
                  <select className="w-full bg-transparent border-0 p-0 text-foreground font-medium focus:ring-0 focus:outline-none cursor-pointer text-sm truncate">
                    <option>Quiet Luxury & Tailoring</option>
                    <option>Resort Chic & Coastal</option>
                    <option>Executive Power Minimalist</option>
                    <option>Avant-Garde Architectural</option>
                    <option>Red Carpet & Black Tie</option>
                  </select>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="w-full md:w-auto p-1 md:pl-2 shrink-0">
                <Link href="/explore" className="w-full md:w-auto bg-accent hover:bg-accent-hover text-white rounded-xl md:rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 px-8 py-4 shadow-md transition-colors whitespace-nowrap">
                  <Search size={18} /> Find Stylist
                </Link>
              </div>
            </form>
          </div>

          {/* Trust Proof Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium text-text-secondary">
            <div className="flex items-center gap-2"><Sparkles className="text-accent" size={16} /> <span>4,800+ bespoke edits curated</span></div>
            <span className="hidden sm:inline text-border">•</span>
            <div className="flex items-center gap-2"><Star className="text-accent fill-accent" size={16} /> <span>Rated 4.9/5 by Vogue clients</span></div>
            <span className="hidden sm:inline text-border">•</span>
            <div className="flex items-center gap-2"><ShieldCheck className="text-foreground" size={16} /> <span>Satisfaction Guaranteed</span></div>
          </div>
        </section>

        {/* 3. Horizontal Category Pills Bar */}
        <section className="border-y border-border bg-surface-muted py-4 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max pb-1">
              {coreServices.map((service, idx) => (
                <Link 
                  href="/explore" 
                  key={service.id} 
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-colors ${
                    idx === 0 
                      ? "bg-foreground text-white border-foreground" 
                      : "bg-white border-border text-text-secondary hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 'Top Curators' Horizontal Showcase */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-accent font-bold text-xs uppercase tracking-widest">World-Class Talent</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2">Meet Our Top Curators</h2>
              <p className="text-text-secondary mt-3 max-w-xl">
                Vetted fashion directors, former luxury brand stylists, and personal shoppers with distinct aesthetic signatures.
              </p>
            </div>
            <Link href="/explore" className="font-bold text-sm text-accent hover:text-accent-hover inline-flex items-center gap-1 uppercase tracking-wider">
              Explore All Curators <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:-mx-12 md:px-12 no-scrollbar snap-x snap-mandatory">
            {mockStylists.map(stylist => (
              <div key={stylist.id} className="min-w-[300px] md:min-w-[340px] snap-start">
                <StylistCard stylist={stylist} />
              </div>
            ))}
          </div>
        </section>

        {/* 5. 'Discover by Vibe' Magazine-Style Asymmetric Bento Grid */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-surface-muted rounded-3xl border border-border mb-24">
          <div className="mb-14 text-center md:text-left">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">Editorial Lookbooks</span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2">Discover by Vibe</h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto md:mx-0">
              Curated wardrobe drops & visual moodboards engineered for specific settings, climates, and social calendars.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Big Hero Feature (Spans 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-border overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-[400px] overflow-hidden">
                <Image src="/service_travel.jpg" alt="Amalfi Vacation" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Curator Pick of the Week
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">Resort & Summer Edition</span>
                  <h3 className="font-serif text-3xl md:text-4xl mt-1">The Amalfi Vacation Edit</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <p className="text-text-secondary leading-relaxed">
                  Sun-bleached linen, relaxed silk shirting, terracotta knitwear, and Riviera footwear handpicked by top coastal stylists. Designed for effortless transitions from beach club luncheons to cliffside twilight dinners.
                </p>
                <div className="mt-8 pt-6 border-t border-border-light flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                    <span className="text-sm font-bold text-foreground">14 Essential Pieces Curated</span>
                  </div>
                  <Link href="/explore" className="px-6 py-3 rounded-full bg-foreground hover:bg-dark-hover text-white text-xs font-bold uppercase tracking-wider transition-colors">
                    Book This Vibe
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Stacked Features (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <Link href="/explore" className="bg-white rounded-2xl border border-border p-5 flex gap-5 items-center group hover:border-foreground transition-colors shadow-sm">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 relative bg-surface-muted">
                  <Image src="/stylist_2.jpg" alt="Executive Tailoring" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Corporate & High Impact</span>
                  <h4 className="font-serif text-xl text-foreground mt-1 mb-2">Executive Power Tailoring</h4>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    Precision double-breasted blazers, sharp cashmere trousers, and understated leather goods for boardroom impact.
                  </p>
                </div>
              </Link>

              <Link href="/explore" className="bg-white rounded-2xl border border-border p-5 flex gap-5 items-center group hover:border-foreground transition-colors shadow-sm">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 relative bg-surface-muted">
                  <Image src="/hero.jpg" alt="Minimalist Retreat" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Casual Capsule</span>
                  <h4 className="font-serif text-xl text-foreground mt-1 mb-2">Minimalist Weekend Retreat</h4>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    Monochromatic knitwear, raw denim, and relaxed luxury outerwear for effortless countryside ease.
                  </p>
                </div>
              </Link>

              <Link href="/explore" className="bg-white rounded-2xl border border-border p-5 flex gap-5 items-center group hover:border-foreground transition-colors shadow-sm">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 relative bg-surface-muted">
                  <Image src="/stylist_1.jpg" alt="Gala Elegance" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Black Tie & Gala</span>
                  <h4 className="font-serif text-xl text-foreground mt-1 mb-2">Gala & Evening Elegance</h4>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    Sculptural silhouettes, black-tie accents, and dramatic bespoke evening wear customized to strict event dress codes.
                  </p>
                </div>
              </Link>
              
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
