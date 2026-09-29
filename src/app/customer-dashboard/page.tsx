"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Clock, Video, ChevronRight, Settings, Heart, ShoppingBag, Sparkles } from "lucide-react";

export default function CustomerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const items = useCartStore(state => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-accent/20">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 border-b border-border pb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border shadow-sm">
              <Image src={user.avatarUrl || "https://i.pravatar.cc/150"} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="font-serif text-3xl text-foreground mb-1">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-sm font-medium text-text-secondary">Client Since {new Date().getFullYear()}</p>
            </div>
          </div>
          
          <button 
            onClick={() => { logout(); router.push('/'); }}
            className="text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar / Quick Actions */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Your Atelier</div>
            
            <button className="w-full flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl text-sm font-bold text-foreground">
              <span className="flex items-center gap-3"><Calendar size={18} className="text-accent" /> Upcoming Sessions</span>
              <ChevronRight size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-muted rounded-xl text-sm font-bold text-text-secondary hover:text-foreground transition-colors">
              <span className="flex items-center gap-3"><Heart size={18} /> Saved Curators</span>
              <ChevronRight size={16} />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-muted rounded-xl text-sm font-bold text-text-secondary hover:text-foreground transition-colors">
              <span className="flex items-center gap-3"><ShoppingBag size={18} /> Order History</span>
              <ChevronRight size={16} />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-muted rounded-xl text-sm font-bold text-text-secondary hover:text-foreground transition-colors mt-6">
              <span className="flex items-center gap-3"><Settings size={18} /> Style Preferences</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* Active Bookings (from Cart/Store) */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-6">Active Curations</h2>
              
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Confirmed</div>
                        <h3 className="font-serif text-xl text-foreground mb-1">{item.serviceTitle}</h3>
                        <p className="text-sm font-medium text-text-secondary">Curator: {item.stylistName}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-surface-muted px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold text-foreground">
                          <Calendar size={14} className="text-text-muted" /> {item.date}
                        </div>
                        <div className="bg-surface-muted px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold text-foreground">
                          <Clock size={14} className="text-text-muted" /> {item.time.split(' ')[0]}
                        </div>
                        <div className="bg-surface-muted px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold text-foreground">
                          {item.mode === 'video' ? <Video size={14} className="text-text-muted" /> : <MapPin size={14} className="text-text-muted" />} 
                          {item.mode}
                        </div>
                      </div>
                      
                      <button className="text-xs font-bold uppercase tracking-wider text-accent border-b border-accent pb-0.5 hover:text-accent-hover">
                        Join Room
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-muted border border-border border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                  <Sparkles className="text-text-muted mb-4" size={32} />
                  <h3 className="font-serif text-xl text-foreground mb-2">No Active Curations</h3>
                  <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                    You haven't booked any styling sessions yet. Discover our world-class curators to elevate your wardrobe.
                  </p>
                  <Link href="/explore" className="bg-foreground text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-dark-hover transition-colors shadow-sm">
                    Explore Curators
                  </Link>
                </div>
              )}
            </section>
            
            {/* Style Profile Snippet */}
            <section className="bg-surface-muted border border-border rounded-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-1">Style Profile</h2>
                  <p className="text-sm text-text-secondary">Your sizing and aesthetic preferences</p>
                </div>
                <button className="text-xs font-bold uppercase tracking-wider text-accent">Edit</button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Primary Vibe</div>
                  <div className="text-sm font-bold text-foreground">Quiet Luxury</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Top Size</div>
                  <div className="text-sm font-bold text-foreground">Medium / 48</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Bottom Size</div>
                  <div className="text-sm font-bold text-foreground">32 / 48</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Shoe Size</div>
                  <div className="text-sm font-bold text-foreground">EU 43</div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
