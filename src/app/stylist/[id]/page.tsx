"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Star, MapPin, MessageCircle, Calendar, Video, MapPin as Pin, X, 
  CheckCircle2, ShieldCheck, Clock, Sparkles, ChevronLeft, 
  ShoppingBag, Plus, Minus, Heart, Share2, Globe, Phone, ArrowRight
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function StylistProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const stylist = mockStylists.find(s => s.id === id);
  const addItem = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);

  // Booking State
  const [selectedService, setSelectedService] = useState<any>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<'video' | 'in-person'>('video');
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');

  if (!stylist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-3">Stylist not found</h1>
          <Link href="/explore" className="text-accent font-medium hover:underline">← Back to Explore</Link>
        </div>
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
    
    setAddedToCart(true);
    setTimeout(() => {
      setSelectedService(null);
      setAddedToCart(false);
      setDate("");
      setTime("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Navbar />

      <main className="flex-grow">
        
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            <ChevronLeft size={18} /> Back
          </button>
        </div>

        {/* ===== STYLIST HEADER ===== */}
        <section className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-8">
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Profile Photo */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 border border-border">
                <Image src={stylist.imageUrl} alt={stylist.name} fill className="object-cover" priority />
                <div className="absolute bottom-2 right-2 bg-success text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={10} /> Verified
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-1">{stylist.name}</h1>
                    <p className="text-sm text-text-secondary italic mb-3">"{stylist.tagline}"</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <button className="p-2.5 border border-border rounded-xl hover:bg-surface-muted transition-colors">
                      <Heart size={18} className="text-text-muted" />
                    </button>
                    <button className="p-2.5 border border-border rounded-xl hover:bg-surface-muted transition-colors">
                      <Share2 size={18} className="text-text-muted" />
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                    <Star size={14} className="fill-amber-400 text-amber-400" /> {stylist.rating} ({stylist.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <MapPin size={14} /> {stylist.destinations.join(', ')}
                  </span>
                  <span className="flex items-center gap-1.5 text-text-secondary">
                    <Clock size={14} /> {stylist.experience}
                  </span>
                </div>

                {/* Quick info pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {stylist.languages.map(lang => (
                    <span key={lang} className="bg-surface-muted text-text-secondary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Globe size={12} /> {lang}
                    </span>
                  ))}
                  <span className="bg-surface-muted text-text-secondary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Calendar size={12} /> {stylist.availability}
                  </span>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {stylist.keywords.map(kw => (
                    <span key={kw} className="bg-accent/5 text-accent border border-accent/10 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TAB NAVIGATION ===== */}
        <div className="sticky top-16 z-30 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex gap-0">
              {[
                { key: 'services', label: 'Services & Pricing', icon: <ShoppingBag size={16} /> },
                { key: 'reviews', label: 'Reviews', icon: <Star size={16} /> },
                { key: 'about', label: 'About', icon: <MessageCircle size={16} /> },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.key 
                      ? 'border-accent text-accent' 
                      : 'border-transparent text-text-muted hover:text-foreground hover:border-border'
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
          
          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-foreground mb-2">Select a Service</h2>
                <p className="text-sm text-text-secondary">Choose the service you need, then pick a date and time to book.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {stylist.services.map((s) => {
                  const baseService = coreServices.find(cs => cs.id === s.serviceId);
                  if (!baseService) return null;
                  const price = s.customPrice || baseService.basePrice;
                  
                  const isInCart = cartItems.some(
                    item => item.serviceId === baseService.id && item.stylistId === stylist.id
                  );
                  
                  return (
                    <div 
                      key={s.serviceId} 
                      className={`bg-white border rounded-2xl p-6 transition-all flex flex-col ${
                        isInCart 
                          ? 'border-success/30 bg-success-light/30' 
                          : 'border-border hover:border-accent/30 hover:shadow-md card-hover'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{baseService.icon}</span>
                        {isInCart && (
                          <span className="text-[10px] font-semibold text-success bg-success-light px-2.5 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} /> In Cart
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg text-foreground mb-2">{baseService.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">{baseService.description}</p>
                      
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <Clock size={13} className="text-accent" /> Duration: {baseService.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <Video size={13} className="text-accent" /> Video call or in-person
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                          <CheckCircle2 size={13} className="text-accent" /> Free rescheduling
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border-light flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xl text-foreground">₹{price.toLocaleString()}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedService({ id: baseService.id, title: baseService.title, price, icon: baseService.icon, duration: baseService.duration })}
                          disabled={isInCart}
                          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            isInCart
                              ? 'bg-surface-muted text-text-muted cursor-not-allowed'
                              : 'bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md'
                          }`}
                        >
                          {isInCart ? (
                            <>Added</>
                          ) : (
                            <><Plus size={15} /> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart summary bar */}
              {cartItems.filter(i => i.stylistId === stylist.id).length > 0 && (
                <div className="mt-8 bg-foreground text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {cartItems.filter(i => i.stylistId === stylist.id).length} service(s) in your cart
                      </p>
                      <p className="text-xs text-white/60">
                        Total: ₹{cartItems.filter(i => i.stylistId === stylist.id).reduce((sum, i) => sum + i.price, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Link 
                    href="/cart"
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
                  >
                    View Cart <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-foreground mb-2">Client Reviews</h2>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-foreground">{stylist.rating}</span>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < Math.round(stylist.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                      ))}
                    </div>
                    <p className="text-sm text-text-muted">{stylist.reviewCount} reviews</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                {stylist.reviews.map(review => (
                  <div key={review.id} className="bg-white border border-border rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={review.clientAvatar}
                          alt={review.clientName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm text-foreground">{review.clientName}</p>
                          <p className="text-xs text-text-muted">{review.service} • {new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="animate-fade-in max-w-3xl">
              <h2 className="font-serif text-2xl text-foreground mb-4">About {stylist.name}</h2>
              <p className="text-text-secondary leading-relaxed mb-8">{stylist.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Experience</h4>
                  <p className="text-sm text-text-secondary">{stylist.experience} in professional styling</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Languages</h4>
                  <p className="text-sm text-text-secondary">{stylist.languages.join(', ')}</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Available in</h4>
                  <p className="text-sm text-text-secondary">{stylist.destinations.join(', ')}</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Availability</h4>
                  <p className="text-sm text-text-secondary">{stylist.availability}</p>
                </div>
              </div>

              {/* Portfolio */}
              <h3 className="font-serif text-xl text-foreground mb-4">Portfolio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stylist.portfolioImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image src={img} alt={`Portfolio ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ===== BOOKING MODAL ===== */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-border flex items-start justify-between bg-surface-muted">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedService.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedService.title}</h3>
                  <p className="text-xs text-text-muted">with {stylist.name} • {selectedService.duration}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedService(null); setAddedToCart(false); }} className="p-2 rounded-full hover:bg-white text-text-muted hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {/* Success state */}
            {addedToCart ? (
              <div className="p-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-success" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-2">Added to Cart! 🎉</h3>
                <p className="text-sm text-text-secondary mb-6">Your booking has been added to cart.</p>
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all"
                >
                  <ShoppingBag size={16} /> Go to Cart
                </Link>
              </div>
            ) : (
              <>
                <div className="p-6 overflow-y-auto space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Select Date</label>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-border rounded-xl p-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Morning", time: "10AM-12PM", emoji: "🌅" },
                        { label: "Afternoon", time: "1PM-4PM", emoji: "☀️" },
                        { label: "Evening", time: "5PM-8PM", emoji: "🌆" },
                      ].map(slot => (
                        <button
                          key={slot.time}
                          onClick={() => setTime(slot.time)}
                          className={`py-3 px-2 rounded-xl text-center border transition-all ${
                            time === slot.time 
                              ? 'border-accent bg-accent-light text-accent shadow-sm' 
                              : 'border-border bg-white text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          <span className="text-lg block mb-1">{slot.emoji}</span>
                          <span className="text-[11px] font-semibold block">{slot.label}</span>
                          <span className="text-[10px] text-text-muted block">{slot.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setMode('video')}
                        className={`flex items-center justify-center gap-2 p-3.5 border rounded-xl transition-all ${
                          mode === 'video' ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        <Video size={18} />
                        <span className="text-sm font-medium">Video Call</span>
                      </button>
                      <button 
                        onClick={() => setMode('in-person')}
                        className={`flex items-center justify-center gap-2 p-3.5 border rounded-xl transition-all ${
                          mode === 'in-person' ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        <Pin size={18} />
                        <span className="text-sm font-medium">In-Person</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-border bg-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-0.5">Total</div>
                    <div className="font-bold text-2xl text-foreground">₹{selectedService.price.toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={!date || !time}
                    className="bg-accent text-white px-6 py-3.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-hover transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
