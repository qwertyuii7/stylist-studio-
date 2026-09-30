"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Calendar, Clock, Video, MapPin, CheckCircle2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Cart, 2: Checkout, 3: Success

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-5">
          <div className="bg-white border border-border p-10 rounded-2xl max-w-md w-full text-center shadow-lg animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={36} className="text-success" />
            </div>
            <h2 className="font-serif text-3xl mb-3">Booking Confirmed! 🎉</h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Thank you, {formData.name}! We've sent a confirmation to {formData.email}. Your stylist will reach out shortly.
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href="/customer-dashboard"
                className="bg-accent text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight size={16} />
              </Link>
              <Link 
                href="/explore"
                className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
              >
                Continue Exploring
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Your Cart</h1>
        <p className="text-text-secondary mb-8">Review your selected services and proceed to checkout.</p>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <ShoppingBag className="text-text-muted mx-auto mb-4" size={36} />
            <h3 className="font-serif text-2xl mb-2">Your cart is empty</h3>
            <p className="text-text-secondary mb-6 max-w-sm mx-auto">Browse our amazing stylists and book your first session!</p>
            <Link 
              href="/explore"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all"
            >
              Find Stylists <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-4">
              {step === 1 ? (
                // CART ITEMS
                items.map(item => (
                  <div key={item.id} className="bg-white border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{item.serviceTitle}</h3>
                        <p className="text-sm text-text-muted mt-0.5">by <span className="text-foreground font-medium">{item.stylistName}</span></p>
                      </div>
                      <span className="font-bold text-lg text-foreground">₹{item.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-surface-muted px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                        <Calendar size={13} className="text-text-muted" /> {item.date}
                      </span>
                      <span className="bg-surface-muted px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                        <Clock size={13} className="text-text-muted" /> {item.time}
                      </span>
                      <span className="bg-surface-muted px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 capitalize">
                        {item.mode === 'video' ? <Video size={13} className="text-text-muted" /> : <MapPin size={13} className="text-text-muted" />} {item.mode}
                      </span>
                    </div>
                    
                    <div className="pt-3 border-t border-border-light flex justify-end">
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // CHECKOUT FORM
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg text-foreground mb-5">Your Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="you@example.com"
                        className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Notes for your stylist (optional)</label>
                      <textarea 
                        rows={3}
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                        placeholder="Any preferences, body type details, or outfit ideas..."
                        className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
                <h3 className="font-semibold text-lg mb-5">Order Summary</h3>
                
                <div className="space-y-4 mb-5 pb-5 border-b border-border-light">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="text-foreground font-medium">{item.serviceTitle}</span>
                        <span className="text-text-muted block text-xs mt-0.5">by {item.stylistName}</span>
                      </div>
                      <span className="font-medium shrink-0">₹{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-foreground">₹{getTotalPrice().toLocaleString()}</span>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-3 text-xs text-text-muted mb-6 pb-5 border-b border-border-light">
                  <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-success" /> Secure Payment</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-success" /> Free Rescheduling</span>
                </div>

                {step === 1 ? (
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if(formData.name && formData.email) {
                        setStep(3);
                        clearCart();
                      } else {
                        alert("Please fill in your name and email.");
                      }
                    }}
                    className="w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} /> Confirm & Pay ₹{getTotalPrice().toLocaleString()}
                  </button>
                )}
                
                {step === 2 && (
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full text-center mt-3 text-xs font-medium text-text-muted hover:text-foreground transition-colors"
                  >
                    ← Back to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
