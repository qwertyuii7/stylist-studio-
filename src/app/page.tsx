"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, Sparkles, ChevronRight, ShieldCheck, Clock, Users, Heart, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StylistCard from "@/components/StylistCard";
import { mockStylists, coreServices, testimonials } from "@/data/mockDatabase";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <main className="flex-grow">
        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-6 md:px-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/4" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/10 rounded-full px-4 py-2 text-sm font-medium text-accent animate-fade-in-up">
                <Sparkles size={16} /> Trusted by 4,800+ Indians for styling
              </div>
              
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-foreground tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Your Personal Stylist,
                <br />
                <span className="text-gradient">Just a Click Away</span>
              </h1>
              
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Book expert stylists for weddings, festivals, office wear, or everyday fashion. 
                Get styled for any occasion — all online, starting at just <span className="font-semibold text-foreground">₹1,499</span>.
              </p>
            </div>

            {/* Search Console */}
            <div className="bg-white border border-border rounded-2xl md:rounded-full p-2 shadow-xl max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row items-center w-full">
                {/* City */}
                <div className="flex-1 w-full px-4 py-3 md:px-5 rounded-xl md:rounded-full hover:bg-surface-muted transition-colors cursor-pointer flex items-center gap-3">
                  <MapPin className="text-accent shrink-0" size={20} />
                  <div className="flex-1 text-left">
                    <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Your City</label>
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 text-foreground font-medium focus:ring-0 focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="">All Cities</option>
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                      <option>Hyderabad</option>
                      <option>Chennai</option>
                      <option>Pune</option>
                      <option>Kolkata</option>
                      <option>Ahmedabad</option>
                      <option>Jaipur</option>
                      <option>Kochi</option>
                    </select>
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-10 bg-border shrink-0" />
                
                {/* What do you need */}
                <div className="flex-1 w-full px-4 py-3 md:px-5 rounded-xl md:rounded-full hover:bg-surface-muted transition-colors cursor-pointer flex items-center gap-3">
                  <Search className="text-text-muted shrink-0" size={20} />
                  <div className="flex-1 text-left">
                    <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Looking for</label>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Wedding stylist, office wardrobe, festive look..." 
                      className="w-full bg-transparent border-0 p-0 text-foreground font-medium placeholder:text-text-muted focus:ring-0 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full md:w-auto p-1 shrink-0">
                  <Link href="/explore" className="w-full md:w-auto bg-accent hover:bg-accent-hover text-white rounded-xl md:rounded-full font-semibold text-sm flex items-center justify-center gap-2 px-7 py-3.5 shadow-md transition-all hover:shadow-lg whitespace-nowrap">
                    <Search size={17} /> Find Stylist
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <Star className="text-amber-400 fill-amber-400" size={16} /> 
                <span>4.8/5 Average Rating</span>
              </div>
              <span className="hidden sm:inline text-border">•</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-success" size={16} /> 
                <span>Verified Stylists</span>
              </div>
              <span className="hidden sm:inline text-border">•</span>
              <div className="flex items-center gap-2">
                <Clock className="text-accent" size={16} /> 
                <span>Book in 2 Minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-20 px-6 md:px-12 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Simple & Easy</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-3">How It Works</h2>
              <p className="text-text-secondary max-w-lg mx-auto">Get styled in 3 simple steps. No complexity, no hassle.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "01", icon: <Search size={24} />, title: "Browse & Choose", desc: "Explore verified stylists, check their portfolio, reviews, and pricing. Filter by your occasion, budget, or city." },
                { step: "02", icon: <Clock size={24} />, title: "Book a Session", desc: "Pick a service, choose your preferred date & time, and book instantly. Video call or in-person — your choice." },
                { step: "03", icon: <Sparkles size={24} />, title: "Get Styled!", desc: "Connect with your stylist, share your preferences, and receive personalized styling recommendations." },
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-light mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-accent">{item.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-accent font-semibold text-xs uppercase tracking-widest">Our Services</span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-2">Styling for Every Occasion</h2>
                <p className="text-text-secondary max-w-lg">From daily wear to wedding glam — find the perfect styling service for you.</p>
              </div>
              <Link href="/explore" className="text-sm font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors">
                View All Services <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreServices.map((service, idx) => (
                <Link
                  href="/explore"
                  key={service.id}
                  className="group bg-white border border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg transition-all card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{service.icon}</span>
                    <span className="text-xs font-semibold text-text-muted bg-surface-muted px-3 py-1 rounded-full">{service.duration}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border-light">
                    <span className="font-semibold text-foreground">From ₹{service.basePrice.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Book Now <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TOP STYLISTS ===== */}
        <section className="py-20 px-6 md:px-12 bg-surface-muted border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-accent font-semibold text-xs uppercase tracking-widest">Top Rated</span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-2">Popular Stylists</h2>
                <p className="text-text-secondary max-w-lg">Handpicked stylists with amazing reviews and proven expertise.</p>
              </div>
              <Link href="/explore" className="text-sm font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors">
                See All Stylists <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStylists.map(stylist => (
                <StylistCard key={stylist.id} stylist={stylist} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Happy Clients</span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-3">What People Say</h2>
              <p className="text-text-secondary max-w-lg mx-auto">Real reviews from real people who found their style.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="bg-white border border-border rounded-2xl p-6 card-hover">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">"{t.comment}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.location} • {t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-20 px-6 md:px-12 bg-foreground text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-accent font-semibold text-xs uppercase tracking-widest">Why Stylist Studio</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white mt-3 mb-3">Built for the Modern Indian</h2>
              <p className="text-white/60 max-w-lg mx-auto">Fashion that respects your culture, budget, and personal taste.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <ShieldCheck size={24} />, title: "Verified Experts", desc: "Every stylist is vetted and reviewed. Only the best make it to our platform." },
                { icon: <Heart size={24} />, title: "Indian Fashion Focus", desc: "Stylists who understand Indian occasions — from Diwali to board meetings." },
                { icon: <Users size={24} />, title: "All Budgets Welcome", desc: "Starting at ₹1,499. Premium styling doesn't have to break the bank." },
                { icon: <Clock size={24} />, title: "Quick & Convenient", desc: "Book in minutes. Get styled via video call from the comfort of your home." },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="text-accent mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-accent/5 via-accent-secondary/5 to-purple/5 border border-border rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/4" />
              <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple/10 rounded-full blur-3xl -z-0 -translate-x-1/3 translate-y-1/4" />
              
              <div className="relative z-10">
                <Sparkles className="mx-auto text-accent mb-5" size={32} />
                <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
                  Ready to Look Your Best?
                </h2>
                <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
                  Join thousands of Indians who have discovered their personal style. Your transformation starts here.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/explore"
                    className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Search size={17} /> Find My Stylist
                  </Link>
                  <Link
                    href="/auth?mode=signup"
                    className="bg-white border border-border text-foreground px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-surface-muted transition-all"
                  >
                    Create Free Account <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BECOME A STYLIST CTA ===== */}
        <section className="py-16 px-6 md:px-12 bg-surface-muted border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">Are you a stylist?</h3>
              <p className="text-text-secondary max-w-lg">Join our platform and connect with thousands of clients. Set your own prices, manage your schedule, and grow your business.</p>
            </div>
            <Link
              href="/auth?mode=signup"
              className="bg-foreground hover:bg-dark-hover text-white px-8 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap shadow-sm"
            >
              Join as Stylist <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
