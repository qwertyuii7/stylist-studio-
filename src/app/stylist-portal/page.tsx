"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coreServices } from "@/data/mockDatabase";
import { useAuthStore } from "@/store/authStore";
import { 
  Upload, CheckCircle2, ChevronRight, MessageCircle, Settings, 
  LayoutDashboard, TrendingUp, Calendar, Wallet, Star, ChevronLeft, Sparkles
} from "lucide-react";

export default function StylistPortalPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [step, setStep] = useState(1);
  
  // Onboarding Form State
  const [formData, setFormData] = useState({
    bio: "",
    genderSpecialty: "unisex",
    services: [] as string[],
    portfolioFiles: null as any
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  const handleServiceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id) 
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
  };

  if (isOnboarded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/20">
        <Navbar />
        <div className="flex-grow flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full border-x border-border">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-surface-muted lg:border-r border-border flex flex-col p-6 lg:p-8 shrink-0">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-border relative">
                <Image src={user.avatarUrl || "https://i.pravatar.cc/150"} alt={user.name} fill className="object-cover" />
              </div>
              <div>
                <div className="font-serif text-lg leading-tight">{user.name}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent mt-0.5">Verified Curator</div>
              </div>
            </div>

            <nav className="space-y-3 flex-grow">
              <button className="w-full flex items-center gap-3 bg-white border border-border shadow-sm text-foreground px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider">
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button className="w-full flex items-center gap-3 text-text-secondary hover:bg-white hover:border hover:border-border px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                <Calendar size={18} /> Calendar & Bookings
              </button>
              <button className="w-full flex items-center gap-3 text-text-secondary hover:bg-white hover:border hover:border-border px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                <MessageCircle size={18} /> Client Messages
              </button>
              <button className="w-full flex items-center gap-3 text-text-secondary hover:bg-white hover:border hover:border-border px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                <Settings size={18} /> Atelier Settings
              </button>
            </nav>

            <button 
              onClick={() => { logout(); router.push('/'); }}
              className="mt-12 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors text-left"
            >
              Sign Out
            </button>
          </div>
          
          {/* Main Dashboard */}
          <div className="flex-grow p-6 lg:p-12 bg-white">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Partner Dashboard</span>
                <h1 className="font-serif text-3xl md:text-4xl mt-2 text-foreground">Welcome to your Atelier</h1>
              </div>
              <button className="hidden md:flex items-center gap-2 bg-foreground text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-dark-hover transition-colors shadow-sm">
                View Public Profile <ChevronRight size={14} />
              </button>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-surface-muted p-6 rounded-2xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
                  <Calendar size={14} className="text-foreground" /> Active Bookings
                </div>
                <div className="font-serif text-5xl text-foreground">12</div>
              </div>
              <div className="bg-surface-muted p-6 rounded-2xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
                  <Star size={14} className="text-accent" /> Pending Requests
                </div>
                <div className="font-serif text-5xl text-accent">5</div>
              </div>
              <div className="bg-surface-muted p-6 rounded-2xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">
                  <Wallet size={14} className="text-foreground" /> Monthly Revenue
                </div>
                <div className="font-serif text-5xl text-foreground">$8,450</div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-12">
              <div className="p-8 border-b border-border flex justify-between items-center bg-surface-muted">
                <h3 className="font-serif text-2xl text-foreground">Recent Booking Requests</h3>
                <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="divide-y divide-border">
                {[1, 2].map(i => (
                  <div key={i} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-muted/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">New</span>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Oct 14, 2026</span>
                      </div>
                      <div className="font-serif text-xl mb-1 text-foreground">Wardrobe Styling & Audit</div>
                      <div className="text-sm text-text-secondary flex items-center gap-2">
                        <span className="font-medium text-foreground">Client:</span> Jane Doe <span className="text-border">•</span> Video Call
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button className="px-6 py-3 bg-white border border-border text-foreground rounded-full text-xs font-bold uppercase tracking-wider hover:bg-surface-muted transition-colors shadow-sm">
                        Review
                      </button>
                      <button className="px-6 py-3 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-sm">
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ONBOARDING FLOW
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/20">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        
        <div className="max-w-2xl w-full bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-border bg-surface-muted text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <Sparkles className="mx-auto text-accent mb-4" size={32} />
            <h1 className="font-serif text-3xl md:text-4xl mb-2 text-foreground relative z-10">Curator Application</h1>
            <p className="text-sm text-text-secondary relative z-10">Complete your Atelier Curate partner profile.</p>
          </div>

          {/* Progress bar */}
          <div className="flex border-b border-border bg-white">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 text-center py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${step === s ? 'bg-foreground text-white' : (step > s ? 'bg-surface-muted text-foreground' : 'text-text-muted')}`}>
                Step {s}
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 bg-white">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h2 className="font-serif text-2xl mb-1 text-foreground">Style Philosophy</h2>
                  <p className="text-xs text-text-secondary mb-6">Tell clients about your aesthetic and background.</p>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Professional Bio</label>
                  <textarea 
                    rows={5} 
                    value={formData.bio} 
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-surface-muted border border-border rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors" 
                    placeholder="e.g. Former Vogue Editor specializing in minimalist capsules..."
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Primary Specialty</label>
                  <select 
                    value={formData.genderSpecialty} 
                    onChange={e => setFormData({...formData, genderSpecialty: e.target.value})}
                    className="w-full bg-surface-muted border border-border rounded-xl p-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors cursor-pointer"
                  >
                    <option value="unisex">Gender Neutral / Versatile</option>
                    <option value="women">Womenswear & Haute Couture</option>
                    <option value="men">Menswear & Tailoring</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => setStep(2)} 
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-dark-hover transition-colors shadow-sm mt-4"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h2 className="font-serif text-2xl mb-1 text-foreground">Service Offerings</h2>
                  <p className="text-xs text-text-secondary mb-6">Select the styling services you wish to provide.</p>
                </div>
                
                <div className="grid gap-4">
                  {coreServices.map(service => (
                    <div 
                      key={service.id} 
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all flex items-center gap-5 border ${formData.services.includes(service.id) ? 'border-accent bg-accent/5 shadow-sm' : 'border-border hover:border-foreground hover:bg-surface-muted'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.services.includes(service.id) ? 'bg-accent text-white' : 'border border-border bg-white'}`}>
                        {formData.services.includes(service.id) && <CheckCircle2 size={14} />}
                      </div>
                      <div>
                        <div className="font-serif text-lg text-foreground mb-1">{service.title}</div>
                        <div className="text-xs text-text-secondary line-clamp-2">{service.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-white border border-border rounded-full text-xs font-bold uppercase tracking-wider hover:bg-surface-muted transition-colors text-text-secondary flex items-center gap-2">
                    <ChevronLeft size={16}/> Back
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={formData.services.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-foreground text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-dark-hover transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h2 className="font-serif text-2xl mb-1 text-foreground">Lookbook Portfolio</h2>
                  <p className="text-xs text-text-secondary mb-6">Upload curation examples to attract clientele.</p>
                </div>

                <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all bg-surface-muted group">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={24} className="text-accent" />
                  </div>
                  <div className="font-bold text-sm text-foreground mb-1 uppercase tracking-wider">Upload Lookbook Pages</div>
                  <div className="text-xs text-text-secondary">Drag & drop high-res images (JPEG, PNG up to 5MB)</div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-4 mt-8">Profile Architecture</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-accent rounded-xl p-5 text-center bg-accent/5 cursor-pointer relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-accent"><CheckCircle2 size={16}/></div>
                      <div className="h-24 bg-white border border-border rounded-lg mb-3 shadow-sm" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Editorial Layout</span>
                    </div>
                    <div className="border border-border rounded-xl p-5 text-center hover:border-foreground cursor-pointer bg-surface-muted transition-colors">
                      <div className="h-24 bg-white border border-border rounded-lg mb-3 shadow-sm opacity-50" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Standard Layout</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                  <button onClick={() => setStep(2)} className="px-6 py-4 bg-white border border-border rounded-full text-xs font-bold uppercase tracking-wider hover:bg-surface-muted transition-colors text-text-secondary flex items-center gap-2">
                    <ChevronLeft size={16}/> Back
                  </button>
                  <button onClick={() => setIsOnboarded(true)} className="flex-1 flex justify-center items-center gap-2 bg-accent text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-md">
                    <Sparkles size={16}/> Launch Atelier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
