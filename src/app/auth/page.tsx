"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronLeft, Mail, Lock, User as UserIcon, Phone, MapPin, 
  Sparkles, ArrowRight, ChevronRight, Eye, EyeOff, 
  CheckCircle2, Upload, Heart, Shirt, Calendar, Star,
  Palette, Briefcase, Camera
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { coreServices } from "@/data/mockDatabase";

type AuthMode = "signin" | "signup";
type Role = "customer" | "stylist";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore(state => state.login);
  
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<Role>("customer");
  const [showPassword, setShowPassword] = useState(false);
  
  // Auth fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // Onboarding steps (after signup)
  const [onboardingStep, setOnboardingStep] = useState(0); // 0 = auth form, 1-4 = onboarding steps
  
  // Customer onboarding
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [preferredStyle, setPreferredStyle] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [budget, setBudget] = useState("");
  const [occasions, setOccasions] = useState<string[]>([]);
  const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  
  // Stylist onboarding
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "signup") setMode("signup");
    else if (m === "signin") setMode("signin");
  }, [searchParams]);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOnboardingStep(1);
    }, 800);
  };

  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: Math.random().toString(36).substring(7),
        name: "Demo User",
        email,
        role: "customer",
        avatarUrl: "https://i.pravatar.cc/150?u=demo",
        onboardingComplete: true,
      });
      router.push("/customer-dashboard");
      setIsLoading(false);
    }, 1000);
  };

  const toggleOccasion = (o: string) => {
    setOccasions(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]);
  };

  const toggleColor = (c: string) => {
    setFavoriteColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const toggleSpecialty = (s: string) => {
    setSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const finishOnboarding = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === "customer") {
        login({
          id: Math.random().toString(36).substring(7),
          name,
          email,
          phone,
          role: "customer",
          gender,
          location,
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
          onboardingComplete: true,
          stylePreferences: {
            preferredStyle,
            bodyType,
            budget,
            occasions,
            favoriteColors,
            sizes: { top: topSize, bottom: bottomSize, shoe: shoeSize },
          },
        });
        router.push("/customer-dashboard");
      } else {
        login({
          id: Math.random().toString(36).substring(7),
          name,
          email,
          phone,
          role: "stylist",
          location,
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
          onboardingComplete: true,
          bio,
          experience,
          specialties,
          selectedServices,
          languages,
        });
        router.push("/stylist-portal");
      }
      setIsLoading(false);
    }, 1000);
  };

  const totalSteps = role === "customer" ? 3 : 3;
  const progress = onboardingStep > 0 ? (onboardingStep / totalSteps) * 100 : 0;

  // Onboarding screens
  if (onboardingStep > 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Progress header */}
        <div className="sticky top-0 z-40 bg-white border-b border-border">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setOnboardingStep(prev => prev - 1)}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-muted">Step {onboardingStep} of {totalSteps}</span>
            </div>
            <button
              onClick={() => {
                if (onboardingStep < totalSteps) setOnboardingStep(prev => prev + 1);
                else finishOnboarding();
              }}
              className="text-sm font-medium text-text-muted hover:text-foreground transition-colors"
            >
              Skip
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-surface-muted">
            <div 
              className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 ease-out rounded-r-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Onboarding content */}
        <div className="flex-grow flex items-start justify-center px-6 py-10 md:py-16">
          <div className="max-w-lg w-full animate-fade-in-up">
            
            {/* CUSTOMER ONBOARDING */}
            {role === "customer" && onboardingStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-light mb-5">
                    <UserIcon className="text-accent" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Tell us about you</h1>
                  <p className="text-text-secondary">This helps us match you with the perfect stylist</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">I identify as</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Female", "Male", "Non-binary"].map(g => (
                        <button
                          key={g}
                          onClick={() => setGender(g)}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${gender === g ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your city</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi, Bangalore..."
                        className="w-full border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your budget range</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["₹1,000 - ₹3,000", "₹3,000 - ₹5,000", "₹5,000 - ₹10,000", "₹10,000+"].map(b => (
                        <button
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${budget === b ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-sm hover:shadow-md"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            )}

            {role === "customer" && onboardingStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-light mb-5">
                    <Palette className="text-purple" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your style vibe</h1>
                  <p className="text-text-secondary">Pick what resonates with you</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">What's your style?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Ethnic Traditional", emoji: "🪔" },
                        { label: "Indo-Western Fusion", emoji: "✨" },
                        { label: "Western Casual", emoji: "👕" },
                        { label: "Formal Corporate", emoji: "💼" },
                        { label: "Streetwear & Trendy", emoji: "🔥" },
                        { label: "Minimalist", emoji: "🤍" },
                      ].map(s => (
                        <button
                          key={s.label}
                          onClick={() => setPreferredStyle(s.label)}
                          className={`py-3.5 px-4 rounded-xl text-sm font-medium border transition-all text-left flex items-center gap-2 ${preferredStyle === s.label ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          <span className="text-lg">{s.emoji}</span> {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Occasions you style for</label>
                    <div className="flex flex-wrap gap-2">
                      {["Daily Wear", "Office", "Weddings", "Festivals", "Dates", "Parties", "Travel", "Interviews"].map(o => (
                        <button
                          key={o}
                          onClick={() => toggleOccasion(o)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${occasions.includes(o) ? 'border-accent bg-accent text-white' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Favorite colors</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "Black", color: "#1A1A1A" },
                        { name: "White", color: "#F5F5F5" },
                        { name: "Navy", color: "#1E3A5F" },
                        { name: "Red", color: "#E94560" },
                        { name: "Pink", color: "#FF69B4" },
                        { name: "Green", color: "#10B981" },
                        { name: "Yellow", color: "#F59E0B" },
                        { name: "Purple", color: "#8B5CF6" },
                        { name: "Maroon", color: "#800020" },
                        { name: "Beige", color: "#D4B895" },
                      ].map(c => (
                        <button
                          key={c.name}
                          onClick={() => toggleColor(c.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${favoriteColors.includes(c.name) ? 'border-accent bg-accent-light font-semibold' : 'border-border bg-white text-text-secondary'}`}
                        >
                          <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: c.color }} />
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-sm hover:shadow-md"
                >
                  Almost Done <ArrowRight size={16} />
                </button>
              </div>
            )}

            {role === "customer" && onboardingStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-light mb-5">
                    <Shirt className="text-success" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your sizes</h1>
                  <p className="text-text-secondary">So your stylist can recommend perfect fits</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Body type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Slim", "Athletic", "Average", "Curvy", "Plus Size", "Petite"].map(b => (
                        <button
                          key={b}
                          onClick={() => setBodyType(b)}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${bodyType === b ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Top size</label>
                      <select
                        value={topSize}
                        onChange={(e) => setTopSize(e.target.value)}
                        className="w-full border border-border rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-accent bg-white cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>XXL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Bottom</label>
                      <select
                        value={bottomSize}
                        onChange={(e) => setBottomSize(e.target.value)}
                        className="w-full border border-border rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-accent bg-white cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option>26</option>
                        <option>28</option>
                        <option>30</option>
                        <option>32</option>
                        <option>34</option>
                        <option>36</option>
                        <option>38</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Shoe</label>
                      <select
                        value={shoeSize}
                        onChange={(e) => setShoeSize(e.target.value)}
                        className="w-full border border-border rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-accent bg-white cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={finishOnboarding}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={16} /> Start My Style Journey
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STYLIST ONBOARDING */}
            {role === "stylist" && onboardingStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-light mb-5">
                    <Briefcase className="text-accent" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your expertise</h1>
                  <p className="text-text-secondary">Tell potential clients about yourself</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Professional bio</label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell clients about your background, specialties, and what makes your styling unique..."
                      className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white resize-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your city</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi, Bangalore..."
                        className="w-full border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Years of experience</label>
                    <div className="grid grid-cols-4 gap-3">
                      {["1-2 years", "3-5 years", "5-8 years", "8+ years"].map(e => (
                        <button
                          key={e}
                          onClick={() => setExperience(e)}
                          className={`py-3 rounded-xl text-xs font-medium border transition-all ${experience === e ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Languages you speak</label>
                    <div className="flex flex-wrap gap-2">
                      {["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi"].map(lang => (
                        <button
                          key={lang}
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${languages.includes(lang) ? 'border-accent bg-accent text-white' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-sm hover:shadow-md"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            )}

            {role === "stylist" && onboardingStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-light mb-5">
                    <Star className="text-purple" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your specialties</h1>
                  <p className="text-text-secondary">Select the styling areas you excel in</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Specialty areas</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Bridal Styling", "Corporate/Office", "Festive Wear", "Casual Everyday",
                        "Celebrity Styling", "Editorial/Fashion", "Saree Draping", "Men's Grooming",
                        "Plus Size Fashion", "Sustainable Fashion"
                      ].map(s => (
                        <button
                          key={s}
                          onClick={() => toggleSpecialty(s)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left ${specialties.includes(s) ? 'border-accent bg-accent-light text-accent shadow-sm' : 'border-border bg-white text-text-secondary hover:border-accent/30'}`}
                        >
                          {specialties.includes(s) && <CheckCircle2 size={14} className="inline mr-2" />}
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={specialties.length === 0}
                  className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            )}

            {role === "stylist" && onboardingStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-light mb-5">
                    <Calendar className="text-success" size={28} />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your services</h1>
                  <p className="text-text-secondary">Select services you want to offer clients</p>
                </div>

                <div className="space-y-4">
                  {coreServices.map(service => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full p-5 rounded-xl border transition-all text-left flex items-start gap-4 ${selectedServices.includes(service.id) ? 'border-accent bg-accent-light shadow-sm' : 'border-border bg-white hover:border-accent/30'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${selectedServices.includes(service.id) ? 'bg-accent text-white' : 'border-2 border-border bg-white'}`}>
                        {selectedServices.includes(service.id) && <CheckCircle2 size={14} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{service.icon}</span>
                          <h3 className="font-semibold text-foreground">{service.title}</h3>
                        </div>
                        <p className="text-xs text-text-secondary mt-1 leading-relaxed">{service.description}</p>
                        <p className="text-xs font-semibold text-accent mt-2">Starting from ₹{service.basePrice.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-surface-muted border border-border rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Camera className="text-accent shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">Portfolio upload</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">You can upload your portfolio photos from your dashboard after setup. This helps clients see your previous work.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={finishOnboarding}
                  disabled={isLoading || selectedServices.length === 0}
                  className="w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={16} /> Launch My Profile
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // AUTH FORM (Sign In / Sign Up)
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      
      {/* Left Pane - Visual */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-foreground overflow-hidden">
        <Image 
          src={mode === 'signin' ? "/hero.jpg" : (role === 'stylist' ? "/stylist_2.jpg" : "/service_travel.jpg")} 
          alt="Fashion Styling" 
          fill 
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-serif text-xl tracking-tight font-semibold text-white">
            Stylist<span className="text-accent">Studio</span>
          </span>
        </Link>
        
        <div className="absolute bottom-16 left-12 right-12 text-white z-10">
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-5">
            {mode === 'signin' 
              ? "Welcome back! Your style journey continues." 
              : (role === 'stylist' 
                ? "Join India's fastest growing styling platform." 
                : "Discover your personal style with expert guidance.")}
          </h2>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            {mode === 'signin'
              ? "Sign in to access your bookings, chat with your stylist, and explore new looks."
              : "Connect with professional stylists for every occasion — weddings, office, festivals, daily wear and more."}
          </p>
          
          <div className="flex items-center gap-6 mt-8 text-xs text-white/60 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-accent" /> 4,800+ happy clients</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-accent fill-accent" /> 4.8/5 avg rating</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-16 lg:px-20 py-10 relative overflow-y-auto">
        
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="font-serif text-lg tracking-tight font-semibold text-foreground">
              Stylist<span className="text-accent">Studio</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-text-muted hover:text-foreground font-medium">
            ← Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Mode tabs */}
          <div className="flex bg-surface-muted p-1 rounded-xl mb-8 border border-border">
            <button 
              onClick={() => setMode('signin')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${mode === 'signin' ? 'bg-white text-foreground shadow-sm' : 'text-text-muted hover:text-foreground'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-foreground shadow-sm' : 'text-text-muted hover:text-foreground'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl text-foreground mb-2">
              {mode === 'signin' ? "Welcome back 👋" : "Create your account"}
            </h1>
            <p className="text-sm text-text-secondary">
              {mode === 'signin' 
                ? "Sign in to continue your style journey." 
                : "Join thousands of people discovering their best look."}
            </p>
          </div>

          {/* Role toggle for signup */}
          {mode === 'signup' && (
            <div className="mb-7">
              <label className="block text-sm font-semibold text-foreground mb-3">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRole('customer')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${role === 'customer' ? 'border-accent bg-accent-light' : 'border-border bg-white hover:border-accent/30'}`}
                >
                  <span className="text-2xl mb-2 block">👤</span>
                  <span className="font-semibold text-sm text-foreground block">Find a Stylist</span>
                  <span className="text-xs text-text-secondary mt-1 block">Book styling sessions</span>
                </button>
                <button
                  onClick={() => setRole('stylist')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${role === 'stylist' ? 'border-accent bg-accent-light' : 'border-border bg-white hover:border-accent/30'}`}
                >
                  <span className="text-2xl mb-2 block">💇</span>
                  <span className="font-semibold text-sm text-foreground block">Become a Stylist</span>
                  <span className="text-xs text-text-secondary mt-1 block">Offer your services</span>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === 'signin' ? handleSigninSubmit : handleSignupSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Full name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name" 
                    className="w-full bg-white border border-border rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full bg-white border border-border rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210" 
                    className="w-full bg-white border border-border rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white border border-border rounded-xl py-3.5 pl-10 pr-11 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end">
                <a href="#" className="text-xs font-semibold text-accent hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent-hover text-white rounded-xl py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md mt-2 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? "Sign In" : "Create Account"} <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social logins */}
          <div className="mt-6">
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-border flex-grow" />
              <span className="mx-4 text-xs font-medium text-text-muted">or continue with</span>
              <div className="border-t border-border flex-grow" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-white border border-border rounded-xl py-3 text-sm font-medium hover:bg-surface-muted transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-border rounded-xl py-3 text-sm font-medium hover:bg-surface-muted transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="ml-2 text-accent font-semibold hover:underline"
              >
                {mode === 'signin' ? "Sign up free" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
