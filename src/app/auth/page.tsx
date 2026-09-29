"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mail, Lock, User as UserIcon, Briefcase, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

type AuthMode = "signin" | "signup";
type Role = "customer" | "stylist";

export default function AuthPage() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<Role>("customer");
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      login({
        id: Math.random().toString(36).substring(7),
        name: name || (mode === 'signin' ? "Alex Thompson" : "New User"),
        email,
        role: mode === 'signin' ? "customer" : role, // Simplify for mockup
        avatarUrl: "https://i.pravatar.cc/150?u=alex",
      });
      
      // Redirect based on role
      if (mode === 'signup' && role === 'stylist') {
        router.push("/stylist-portal");
      } else {
        router.push("/customer-dashboard");
      }
      
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row selection:bg-accent/20">
      
      {/* Left Pane - Editorial Image */}
      <div className="hidden md:flex md:w-1/2 relative bg-surface-muted overflow-hidden">
        <Image 
          src={mode === 'signin' ? "/hero.jpg" : (role === 'stylist' ? "/stylist_2.jpg" : "/service_travel.jpg")} 
          alt="Editorial Fashion" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
        
        <Link href="/" className="absolute top-8 left-8 text-white flex items-center gap-2 font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-opacity">
          <ChevronLeft size={16} /> Back to Atelier
        </Link>
        
        <div className="absolute bottom-16 left-12 right-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-accent" size={20} />
            <span className="font-bold text-[10px] uppercase tracking-widest text-accent">Private Curation</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-4">
            {mode === 'signin' 
              ? "Welcome back to your private wardrobe atelier." 
              : (role === 'stylist' 
                ? "Join the world's most exclusive styling network." 
                : "Curate your wardrobe with elite fashion directors.")}
          </h2>
          <p className="text-sm opacity-90 max-w-md leading-relaxed">
            Experience effortless luxury with bespoke edits tailored to your exact aesthetic, climate, and calendar.
          </p>
        </div>
      </div>

      {/* Right Pane - Auth Forms */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative overflow-y-auto">
        
        {/* Mobile Back Button */}
        <Link href="/" className="md:hidden flex items-center gap-2 text-text-muted font-bold text-[10px] uppercase tracking-widest mb-10 hover:text-foreground">
          <ChevronLeft size={16} /> Back
        </Link>

        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              {mode === 'signin' ? "Sign In" : "Create an Account"}
            </h1>
            <p className="text-sm text-text-secondary">
              {mode === 'signin' 
                ? "Enter your credentials to access your curations." 
                : "Select your account type to begin."}
            </p>
          </div>

          {/* Mode Toggle (if creating account) */}
          {mode === 'signup' && (
            <div className="flex bg-surface-muted p-1 rounded-xl mb-8 border border-border">
              <button 
                onClick={() => setRole('customer')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${role === 'customer' ? 'bg-white text-foreground shadow-sm' : 'text-text-muted hover:text-foreground'}`}
              >
                Client
              </button>
              <button 
                onClick={() => setRole('stylist')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${role === 'stylist' ? 'bg-white text-foreground shadow-sm' : 'text-text-muted hover:text-foreground'}`}
              >
                Stylist Partner
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'stylist' ? "Elena Rostova" : "Jane Doe"} 
                    className="w-full bg-surface-muted border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-surface-muted border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-surface-muted border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors"
                />
              </div>
            </div>

            {mode === 'signup' && role === 'stylist' && (
              <div>
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Primary City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Milan, Paris, NYC" 
                    className="w-full bg-surface-muted border border-border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <div className="flex justify-end">
                <a href="#" className="text-xs font-bold text-accent hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-foreground hover:bg-dark-hover text-white rounded-xl py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-4 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {mode === 'signin' ? "Secure Sign In" : "Create Account"} <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="ml-2 text-foreground font-bold hover:text-accent transition-colors underline underline-offset-4"
              >
                {mode === 'signin' ? "Create one here" : "Sign in here"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
