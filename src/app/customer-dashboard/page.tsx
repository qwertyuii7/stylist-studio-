"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  MapPin, Calendar, Clock, Video, ChevronRight, Settings, Heart, 
  ShoppingBag, Sparkles, User, Edit3, Star, Bell, Search,
  CheckCircle2, ArrowRight, Palette, Shirt, LogOut
} from "lucide-react";

type Tab = 'overview' | 'bookings' | 'profile' | 'preferences';

export default function CustomerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const items = useCartStore(state => state.items);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // Edit mode for preferences
  const [editingPrefs, setEditingPrefs] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth?mode=signin');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  const prefs = user.stylePreferences;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white lg:border-r border-b lg:border-b-0 border-border flex flex-col shrink-0">
          {/* Profile header */}
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden border border-border">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} width={44} height={44} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-accent font-bold">{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">{user.name}</div>
                <div className="text-[11px] font-medium text-text-muted">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible flex-grow">
            {[
              { key: 'overview', icon: <User size={18} />, label: "Overview" },
              { key: 'bookings', icon: <Calendar size={18} />, label: "My Bookings", badge: items.length > 0 ? String(items.length) : undefined },
              { key: 'preferences', icon: <Palette size={18} />, label: "Style Preferences" },
              { key: 'profile', icon: <Settings size={18} />, label: "Profile Settings" },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as Tab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === item.key 
                    ? 'bg-accent-light text-accent' 
                    : 'text-text-secondary hover:bg-surface-muted hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Sign out */}
          <div className="hidden lg:block p-4 border-t border-border">
            <button 
              onClick={() => { logout(); router.push('/'); }}
              className="text-xs font-medium text-text-muted hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow p-6 lg:p-8 overflow-y-auto">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
                  Hi, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm text-text-secondary">Welcome to your style dashboard.</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-border rounded-2xl p-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-accent-light text-accent mb-3">
                    <Calendar size={18} />
                  </div>
                  <div className="font-bold text-2xl text-foreground mb-0.5">{items.length}</div>
                  <div className="text-xs font-medium text-text-muted">Active Bookings</div>
                </div>
                <div className="bg-white border border-border rounded-2xl p-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-purple-light text-purple mb-3">
                    <Heart size={18} />
                  </div>
                  <div className="font-bold text-2xl text-foreground mb-0.5">3</div>
                  <div className="text-xs font-medium text-text-muted">Saved Stylists</div>
                </div>
                <div className="bg-white border border-border rounded-2xl p-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-success-light text-success mb-3">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="font-bold text-2xl text-foreground mb-0.5">2</div>
                  <div className="text-xs font-medium text-text-muted">Sessions Done</div>
                </div>
                <div className="bg-white border border-border rounded-2xl p-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 text-amber-600 mb-3">
                    <Star size={18} />
                  </div>
                  <div className="font-bold text-2xl text-foreground mb-0.5">5.0</div>
                  <div className="text-xs font-medium text-text-muted">Avg Rating Given</div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/explore" className="bg-white border border-border rounded-xl p-5 flex items-center gap-4 hover:border-accent/30 hover:shadow-sm transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Search size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Find a Stylist</p>
                    <p className="text-xs text-text-muted">Browse and book styling sessions</p>
                  </div>
                  <ChevronRight size={18} className="text-text-muted ml-auto" />
                </Link>
                <button onClick={() => setActiveTab('preferences')} className="bg-white border border-border rounded-xl p-5 flex items-center gap-4 hover:border-accent/30 hover:shadow-sm transition-all text-left group">
                  <div className="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center text-purple group-hover:scale-110 transition-transform">
                    <Palette size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Update Style Profile</p>
                    <p className="text-xs text-text-muted">Help stylists know your taste</p>
                  </div>
                  <ChevronRight size={18} className="text-text-muted ml-auto" />
                </button>
              </div>

              {/* Active bookings preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-foreground">Active Bookings</h2>
                  {items.length > 0 && (
                    <button onClick={() => setActiveTab('bookings')} className="text-xs font-semibold text-accent hover:underline">View All</button>
                  )}
                </div>
                
                {items.length > 0 ? (
                  <div className="space-y-3">
                    {items.slice(0, 2).map(item => (
                      <div key={item.id} className="bg-white border border-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <span className="text-[10px] font-semibold text-success bg-success-light px-2 py-0.5 rounded-full">Confirmed</span>
                          <h3 className="font-semibold text-foreground mt-2">{item.serviceTitle}</h3>
                          <p className="text-xs text-text-muted mt-0.5">by {item.stylistName}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                            <Calendar size={12} /> {item.date}
                          </span>
                          <span className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                            <Clock size={12} /> {item.time.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface-muted border border-border border-dashed rounded-2xl p-10 text-center">
                    <Sparkles className="text-text-muted mb-3 mx-auto" size={28} />
                    <h3 className="font-semibold text-foreground mb-2">No bookings yet</h3>
                    <p className="text-sm text-text-secondary mb-5 max-w-sm mx-auto">
                      Start your style journey by exploring our amazing stylists.
                    </p>
                    <Link href="/explore" className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all">
                      <Search size={16} /> Find Stylists
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-serif text-2xl text-foreground mb-1">My Bookings</h1>
                <p className="text-sm text-text-secondary">All your styling sessions in one place</p>
              </div>
              
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="bg-white border border-border rounded-2xl p-6 hover:shadow-sm transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-[10px] font-semibold text-success bg-success-light px-2.5 py-1 rounded-full">✅ Confirmed</span>
                          <h3 className="font-semibold text-lg text-foreground mt-2">{item.serviceTitle}</h3>
                          <p className="text-sm text-text-muted mt-0.5">Stylist: <span className="text-foreground font-medium">{item.stylistName}</span></p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-surface-muted px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium">
                            <Calendar size={13} className="text-text-muted" /> {item.date}
                          </span>
                          <span className="bg-surface-muted px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium">
                            <Clock size={13} className="text-text-muted" /> {item.time}
                          </span>
                          <span className="bg-surface-muted px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium capitalize">
                            {item.mode === 'video' ? <Video size={13} className="text-text-muted" /> : <MapPin size={13} className="text-text-muted" />} 
                            {item.mode}
                          </span>
                          <span className="bg-accent-light px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-accent">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4 pt-4 border-t border-border-light">
                        <button className="bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all flex items-center gap-2">
                          {item.mode === 'video' ? <Video size={15} /> : <MapPin size={15} />} Join Session
                        </button>
                        <button className="border border-border px-5 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-all">
                          Message Stylist
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-muted border border-border border-dashed rounded-2xl p-12 text-center">
                  <Calendar className="text-text-muted mb-4 mx-auto" size={32} />
                  <h3 className="font-semibold text-xl text-foreground mb-2">No bookings yet</h3>
                  <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                    Explore our stylists and book your first session!
                  </p>
                  <Link href="/explore" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all">
                    Explore Stylists <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* STYLE PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="animate-fade-in space-y-8 max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl text-foreground mb-1">Style Preferences</h1>
                  <p className="text-sm text-text-secondary">Your sizing and style info helps stylists serve you better</p>
                </div>
                <button 
                  onClick={() => setEditingPrefs(!editingPrefs)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  <Edit3 size={14} /> {editingPrefs ? "Done" : "Edit"}
                </button>
              </div>

              {/* Style vibe */}
              <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Palette size={18} className="text-accent" /> Style & Vibe
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-1">Preferred Style</div>
                    <div className="text-sm font-semibold text-foreground">{prefs?.preferredStyle || "Not set"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-1">Body Type</div>
                    <div className="text-sm font-semibold text-foreground">{prefs?.bodyType || "Not set"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-1">Budget Range</div>
                    <div className="text-sm font-semibold text-foreground">{prefs?.budget || "Not set"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-1">Occasions</div>
                    <div className="text-sm font-semibold text-foreground">
                      {prefs?.occasions?.length ? prefs.occasions.join(', ') : "Not set"}
                    </div>
                  </div>
                </div>
                {prefs?.favoriteColors && prefs.favoriteColors.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-text-muted mb-2">Favorite Colors</div>
                    <div className="flex flex-wrap gap-2">
                      {prefs.favoriteColors.map(c => (
                        <span key={c} className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium text-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Shirt size={18} className="text-purple" /> Sizes
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-surface-muted rounded-xl p-4">
                    <div className="text-xs font-medium text-text-muted mb-1">Top Size</div>
                    <div className="text-lg font-bold text-foreground">{prefs?.sizes?.top || "—"}</div>
                  </div>
                  <div className="text-center bg-surface-muted rounded-xl p-4">
                    <div className="text-xs font-medium text-text-muted mb-1">Bottom</div>
                    <div className="text-lg font-bold text-foreground">{prefs?.sizes?.bottom || "—"}</div>
                  </div>
                  <div className="text-center bg-surface-muted rounded-xl p-4">
                    <div className="text-xs font-medium text-text-muted mb-1">Shoe</div>
                    <div className="text-lg font-bold text-foreground">{prefs?.sizes?.shoe || "—"}</div>
                  </div>
                </div>
              </div>

              {/* Update CTA */}
              <div className="bg-accent-light/50 border border-accent/10 rounded-2xl p-6 flex items-center gap-4">
                <Sparkles className="text-accent shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-sm text-foreground mb-0.5">Keep your preferences updated</p>
                  <p className="text-xs text-text-secondary">The more your stylist knows about you, the better your style recommendations will be!</p>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in space-y-8 max-w-2xl">
              <div>
                <h1 className="font-serif text-2xl text-foreground mb-1">Profile Settings</h1>
                <p className="text-sm text-text-secondary">Manage your account details</p>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-border overflow-hidden">
                    {user.avatarUrl ? (
                      <Image src={user.avatarUrl} alt={user.name} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-text-muted">{user.email}</p>
                    <button className="text-xs font-semibold text-accent hover:underline mt-1">Change Photo</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                    <input type="email" defaultValue={user.email} className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Phone</label>
                    <input type="tel" defaultValue={user.phone || ""} placeholder="+91 98765 43210" className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">City</label>
                    <input type="text" defaultValue={user.location || ""} placeholder="Mumbai" className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Gender</label>
                    <select defaultValue={user.gender || ""} className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white cursor-pointer">
                      <option value="">Select</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                    </select>
                  </div>
                </div>

                <button className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all">
                  Save Changes
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="font-semibold text-sm text-red-700 mb-2">Sign Out</h3>
                <p className="text-xs text-red-600 mb-4">Sign out from your account on this device.</p>
                <button 
                  onClick={() => { logout(); router.push('/'); }}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
