"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Calendar, Clock, Video, MapPin, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Cart, 2: Checkout, 3: Success

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-5">
          <div className="bg-white border border-border p-10 rounded-2xl max-w-md w-full text-center shadow-xl">
            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4">Booking Confirmed!</h2>
            <p className="text-text-secondary mb-8">
              Thank you, {formData.name}. We've sent a confirmation email to {formData.email}. Your stylists will be in touch shortly.
            </p>
            <Link 
              href="/explore"
              className="inline-block bg-accent text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors"
            >
              Back to Explore
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-10 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-10">Your Selection</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-surface-muted rounded-2xl border border-border border-dashed">
            <p className="text-text-secondary mb-6 text-lg">Your cart is empty.</p>
            <Link 
              href="/explore"
              className="bg-accent text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors"
            >
              Discover Stylists
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              {step === 1 ? (
                // CART ITEMS
                items.map(item => (
                  <div key={item.id} className="bg-white border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-5 shadow-sm">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl">{item.serviceTitle}</h3>
                        <span className="font-medium text-lg">${item.price}</span>
                      </div>
                      <p className="text-text-secondary text-sm mb-4">Curated by <span className="font-medium text-foreground">{item.stylistName}</span></p>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5"><Calendar size={14}/> {item.date}</div>
                        <div className="flex items-center gap-1.5"><Clock size={14}/> {item.time}</div>
                        <div className="flex items-center gap-1.5 capitalize">
                          {item.mode === 'video' ? <Video size={14}/> : <MapPin size={14}/>} {item.mode}
                        </div>
                      </div>
                    </div>
                    <div className="sm:border-l sm:border-border sm:pl-5 flex items-center justify-end sm:justify-center shrink-0">
                      <button onClick={() => removeItem(item.id)} className="text-text-muted hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // CHECKOUT FORM
                <div className="bg-white border border-border rounded-xl p-8 shadow-sm">
                  <h3 className="font-serif text-2xl mb-6">Personal Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Notes or Body Type Preferences (Optional)</label>
                      <textarea 
                        rows={4}
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                        className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-surface-muted border border-border rounded-xl p-6 md:p-8 sticky top-24">
                <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 border-b border-border-light pb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{item.serviceTitle} <span className="text-text-muted block text-xs">by {item.stylistName}</span></span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-serif text-2xl">${getTotalPrice()}</span>
                </div>

                {step === 1 ? (
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-accent text-white py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-md"
                  >
                    Proceed to Checkout
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
                    className="w-full bg-foreground text-white py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-dark-hover transition-colors shadow-md"
                  >
                    Pay & Confirm
                  </button>
                )}
                
                {step === 2 && (
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full text-center mt-4 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-foreground"
                  >
                    &larr; Back to Cart
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
