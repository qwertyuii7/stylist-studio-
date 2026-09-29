"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, MessageCircle, Calendar, Video, MapPin as Pin, X, CheckCircle2, ShieldCheck, Clock, Quote, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function StylistProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const stylist = mockStylists.find(s => s.id === id);
  const addItem = useCartStore(state => state.addItem);

  // Booking Modal State
  const [selectedService, setSelectedService] = useState<any>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<'video' | 'in-person'>('video');

  if (!stylist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1>Stylist not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedService || !date || !time) return;
    
    addItem({
      id: Math.random().toString(36).substring(7),
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      stylistId: stylist.id,
      stylistName: stylist.name,
      price: selectedService.price,
      date,
      time,
      mode
    });
    
    setSelectedService(null);
    setDate("");
    setTime("");
    setMode('video');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-accent/20">
      <Navbar />

      <main className="flex-grow">
        
        {/* BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 border-b border-border">
          <div className="text-xs font-bold uppercase tracking-widest text-text-muted flex gap-2">
            <span>Home</span> <span className="text-border">/</span> 
            <span>Curators</span> <span className="text-border">/</span> 
            <span className="text-foreground">{stylist.name}</span>
          </div>
        </div>

        {/* 1. HERO SECTION (Split Layout) */}
        <section className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Medium Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-surface-muted max-w-md mx-auto lg:mx-0 border border-border">
              <Image src={stylist.imageUrl} alt={stylist.name} fill className="object-cover" priority />
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-foreground uppercase border border-border shadow-sm flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-accent" /> Vogue Featured
              </div>
            </div>
          </div>
          
          {/* Right: Bio & Booking CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-text-secondary mb-4 uppercase tracking-widest">
              <span className="flex items-center gap-1 text-accent"><MapPin size={16}/> {stylist.destinations.join(' & ')}</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-accent text-accent" />
                {stylist.rating} ({stylist.reviewCount} Reviews)
              </span>
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-4 leading-tight">{stylist.name}</h1>
            
            <p className="font-serif text-2xl text-text-secondary italic mb-6">
              "Bridging architectural minimalism with effortless European tailoring."
            </p>

            <p className="text-base leading-relaxed text-text-secondary mb-8 max-w-2xl">
              {stylist.bio}
            </p>
            
            {/* Quick Keywords */}
            <div className="flex flex-wrap gap-2 mb-10">
              {stylist.keywords.map(kw => (
                <span key={kw} className="bg-surface-muted border border-border text-foreground px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {kw}
                </span>
              ))}
            </div>
            
            {/* Direct Booking Action Area */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-md max-w-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider mb-5">
                <Calendar size={14} /> Next open slot: Tomorrow at 3:00 PM
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-accent hover:bg-accent-hover text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm text-center"
                >
                  Book 1-on-1 Consultation
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-border hover:border-foreground text-foreground px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                  <MessageCircle size={16} /> Pre-conversation
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent"/> Complimentary 15-min intro</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-foreground"/> Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PORTFOLIO GALLERY (Editorial Bento Grid) */}
        <section className="bg-surface-muted py-24 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-accent font-bold text-xs uppercase tracking-widest">Editorial Lookbook</span>
                <h2 className="font-serif text-4xl text-foreground mt-2">Curated Style Capsules</h2>
              </div>
              <button className="hidden md:block text-xs font-bold uppercase tracking-wider border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
                View Full Lookbook (24 Edits)
              </button>
            </div>
            
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[800px] md:h-[600px]">
              {stylist.portfolioImages[0] && (
                <div className="md:col-span-8 relative rounded-2xl overflow-hidden group shadow-sm">
                  <Image src={stylist.portfolioImages[0]} alt="Portfolio 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Milan Fashion Week</span>
                    <h3 className="font-serif text-3xl mt-1">Bespoke Cashmere & Silk Transition</h3>
                    <p className="text-sm opacity-90 mt-2 flex items-center gap-2"><Sparkles size={14}/> 12-Piece Wardrobe Build</p>
                  </div>
                </div>
              )}
              <div className="md:col-span-4 flex flex-col gap-4">
                {stylist.portfolioImages[1] && (
                  <div className="flex-1 relative rounded-2xl overflow-hidden group shadow-sm">
                    <Image src={stylist.portfolioImages[1]} alt="Portfolio 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif text-xl">Lake Como Retreat</h3>
                    </div>
                  </div>
                )}
                {stylist.portfolioImages[2] && (
                  <div className="flex-1 relative rounded-2xl overflow-hidden group shadow-sm">
                    <Image src={stylist.portfolioImages[2]} alt="Portfolio 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif text-xl">Executive Minimal</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. BESPOKE SERVICES */}
        <section id="services" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">Private Styling</span>
            <h2 className="font-serif text-4xl text-foreground mt-2 mb-4">Bespoke Services</h2>
            <p className="text-text-secondary">Elevated personal curation with dedicated turnaround times and transparent pricing structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylist.services.map((s, idx) => {
              const baseService = coreServices.find(cs => cs.id === s.serviceId);
              if (!baseService) return null;
              const price = s.customPrice || baseService.basePrice;
              
              return (
                <div key={s.serviceId} className="bg-white border border-border rounded-2xl p-8 hover:border-foreground transition-colors shadow-sm flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="font-serif text-6xl text-foreground">0{idx + 1}</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl text-foreground mb-3 relative z-10">{baseService.title}</h3>
                  <p className="text-sm text-text-secondary mb-8 flex-grow relative z-10 leading-relaxed">{baseService.description}</p>
                  
                  <div className="space-y-3 mb-8 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                      <Clock size={14} className="text-accent" /> Turnaround: 3-5 Days
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                      <CheckCircle2 size={14} className="text-accent" /> 1-on-1 Virtual Audit included
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border-light relative z-10">
                    <div>
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Investment</span>
                      <span className="font-serif text-2xl text-foreground">${price}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedService({ id: baseService.id, title: baseService.title, price })}
                      className="bg-foreground hover:bg-dark-hover text-white px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Select Date
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 4. TESTIMONIALS */}
        <section className="bg-foreground text-white py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <Quote className="mx-auto text-accent mb-6" size={40} opacity={0.8} />
            <h2 className="font-serif text-3xl md:text-5xl max-w-4xl mx-auto leading-tight italic">
              "Working with {stylist.name.split(' ')[0]} redefined how I approach my travel wardrobe. It was like having a Vogue editor as my instant private concierge."
            </h2>
            <div className="mt-8">
              <p className="font-bold text-sm uppercase tracking-wider text-white">Managing Partner, Financial Times</p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-widest">London, UK</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* 5. ELEVATED BOOKING MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border">
            
            <div className="p-6 md:p-8 border-b border-border flex items-start justify-between relative bg-surface-muted">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 block">Reserve Session</span>
                <h3 className="font-serif text-2xl text-foreground">{selectedService.title}</h3>
                <p className="text-xs font-medium text-text-secondary mt-1">with {stylist.name}</p>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 bg-white rounded-full text-text-muted hover:text-foreground shadow-sm transition-colors absolute top-6 right-6">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto bg-white">
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Select Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)}
                    className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-accent bg-surface-muted transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Select Time</label>
                  <select 
                    value={time} 
                    onChange={e => setTime(e.target.value)}
                    className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-accent bg-surface-muted transition-colors cursor-pointer"
                  >
                    <option value="">Choose a time slot (Local Time)</option>
                    <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                    <option value="Afternoon (1PM - 4PM)">Afternoon (1PM - 4PM)</option>
                    <option value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Mode of Consultation</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setMode('video')}
                      className={`flex flex-col items-center justify-center p-5 border rounded-2xl gap-3 transition-all ${mode === 'video' ? 'border-accent bg-accent/5 text-accent shadow-sm' : 'border-border text-text-secondary hover:border-text-muted hover:bg-surface-muted'}`}
                    >
                      <Video size={24} />
                      <span className="text-xs font-bold uppercase tracking-wider">Video Call</span>
                    </button>
                    <button 
                      onClick={() => setMode('in-person')}
                      className={`flex flex-col items-center justify-center p-5 border rounded-2xl gap-3 transition-all ${mode === 'in-person' ? 'border-accent bg-accent/5 text-accent shadow-sm' : 'border-border text-text-secondary hover:border-text-muted hover:bg-surface-muted'}`}
                    >
                      <Pin size={24} />
                      <span className="text-xs font-bold uppercase tracking-wider">In-Person</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 border-t border-border bg-white flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Total Investment</div>
                <div className="font-serif text-3xl text-foreground">${selectedService.price}</div>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={!date || !time}
                className="bg-accent text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors shadow-md"
              >
                Confirm & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
