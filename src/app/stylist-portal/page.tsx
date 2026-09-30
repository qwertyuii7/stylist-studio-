"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coreServices } from "@/data/mockDatabase";
import { useAuthStore } from "@/store/authStore";
import { 
  Upload, CheckCircle2, ChevronRight, MessageCircle, Settings, 
  LayoutDashboard, TrendingUp, Calendar, Wallet, Star, ChevronLeft, 
  Sparkles, Users, Clock, Eye, Bell, PlusCircle, BarChart3,
  ArrowRight, Edit3, MapPin, Globe, Phone, Mail
} from "lucide-react";

type DashTab = 'overview' | 'bookings' | 'messages' | 'settings';

export default function StylistPortalPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser, completeOnboarding } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<DashTab>('overview');
  
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [step, setStep] = useState(1);
  
  // Onboarding Form State
  const [formData, setFormData] = useState({
    bio: "",
    genderSpecialty: "unisex",
    services: [] as string[],
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth?mode=signin');
    }
    // Check if user already completed onboarding
    if (user?.onboardingComplete || user?.selectedServices?.length) {
      setIsOnboarded(true);
    }
  }, [isAuthenticated, router, user]);

  if (!mounted || !isAuthenticated || !user) return null;

  const handleServiceToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(id) 
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
  };

  // Mock dashboard data
  const mockBookings = [
    {
      id: "b1",
      clientName: "Sneha Iyer",
      clientAvatar: "https://i.pravatar.cc/150?u=sneha",
      service: "Wedding & Event Styling",
      date: "Oct 15, 2026",
      time: "10AM-12PM",
      mode: "video" as const,
      status: "pending" as const,
      price: 4999,
    },
    {
      id: "b2",
      clientName: "Vikram Joshi",
      clientAvatar: "https://i.pravatar.cc/150?u=vikram",
      service: "Personal Styling",
      date: "Oct 18, 2026",
      time: "1PM-4PM",
      mode: "in-person" as const,
      status: "confirmed" as const,
      price: 1999,
    },
    {
      id: "b3",
      clientName: "Aisha Khan",
      clientAvatar: "https://i.pravatar.cc/150?u=aisha",
      service: "Image Consulting",
      date: "Oct 22, 2026",
      time: "5PM-8PM",
      mode: "video" as const,
      status: "confirmed" as const,
      price: 2499,
    },
  ];

  const mockMessages = [
    {
      id: "m1",
      clientName: "Sneha Iyer",
      avatar: "https://i.pravatar.cc/150?u=sneha",
      lastMessage: "Hi! I wanted to confirm the outfit preferences for my cousin's wedding. Can we discuss?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "m2",
      clientName: "Vikram Joshi",
      avatar: "https://i.pravatar.cc/150?u=vikram",
      lastMessage: "Thanks for the recommendations! Can you also suggest shoes?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "m3",
      clientName: "Priya Singh",
      avatar: "https://i.pravatar.cc/150?u=priya",
      lastMessage: "Looking forward to our session next week!",
      time: "2 days ago",
      unread: false,
    },
  ];

  // DASHBOARD VIEW
  if (isOnboarded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-white lg:border-r border-b lg:border-b-0 border-border flex flex-col shrink-0">
            {/* Profile summary */}
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
                  <div className="text-[11px] font-medium text-success flex items-center gap-1">
                    <CheckCircle2 size={10} /> Active Stylist
                  </div>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible flex-grow">
              {[
                { key: 'overview', icon: <LayoutDashboard size={18} />, label: "Dashboard" },
                { key: 'bookings', icon: <Calendar size={18} />, label: "Bookings", badge: "3" },
                { key: 'messages', icon: <MessageCircle size={18} />, label: "Messages", badge: "1" },
                { key: 'settings', icon: <Settings size={18} />, label: "Settings" },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as DashTab)}
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
                className="text-xs font-medium text-text-muted hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow p-6 lg:p-8 overflow-y-auto">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in space-y-8">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-1">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                  <p className="text-sm text-text-secondary">Here's what's happening with your profile today.</p>
                </div>
                
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <Calendar size={18} />, label: "Active Bookings", value: "3", color: "text-accent", bg: "bg-accent-light" },
                    { icon: <Clock size={18} />, label: "Pending", value: "1", color: "text-amber-600", bg: "bg-amber-50" },
                    { icon: <Wallet size={18} />, label: "This Month", value: "₹9,497", color: "text-success", bg: "bg-success-light" },
                    { icon: <Star size={18} />, label: "Rating", value: "4.9", color: "text-purple", bg: "bg-purple-light" },
                  ].map((kpi, idx) => (
                    <div key={idx} className="bg-white border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow">
                      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${kpi.bg} ${kpi.color} mb-3`}>
                        {kpi.icon}
                      </div>
                      <div className="font-bold text-2xl text-foreground mb-0.5">{kpi.value}</div>
                      <div className="text-xs font-medium text-text-muted">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 hover:border-accent/30 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">View Bookings</p>
                      <p className="text-xs text-text-muted">Manage your schedule</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 hover:border-accent/30 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-light flex items-center justify-center text-purple">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Messages</p>
                      <p className="text-xs text-text-muted">1 unread message</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 hover:border-accent/30 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center text-success">
                      <Edit3 size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Edit Profile</p>
                      <p className="text-xs text-text-muted">Update your services</p>
                    </div>
                  </button>
                </div>

                {/* Recent Bookings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg text-foreground">Recent Bookings</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs font-semibold text-accent hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {mockBookings.slice(0, 2).map(booking => (
                      <div key={booking.id} className="bg-white border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Image src={booking.clientAvatar} alt={booking.clientName} width={40} height={40} className="rounded-full" />
                          <div>
                            <p className="font-semibold text-sm text-foreground">{booking.clientName}</p>
                            <p className="text-xs text-text-muted">{booking.service} • {booking.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                            booking.status === 'pending' 
                              ? 'bg-amber-50 text-amber-600' 
                              : 'bg-success-light text-success'
                          }`}>
                            {booking.status === 'pending' ? '⏳ Pending' : '✅ Confirmed'}
                          </span>
                          <span className="font-semibold text-sm">₹{booking.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-serif text-2xl text-foreground mb-1">Bookings</h1>
                    <p className="text-sm text-text-secondary">Manage your client appointments</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="bg-white border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Image src={booking.clientAvatar} alt={booking.clientName} width={48} height={48} className="rounded-full" />
                          <div>
                            <p className="font-semibold text-foreground">{booking.clientName}</p>
                            <p className="text-sm text-text-muted mb-2">{booking.service}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                                <Calendar size={12} /> {booking.date}
                              </span>
                              <span className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                                <Clock size={12} /> {booking.time}
                              </span>
                              <span className="bg-surface-muted px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1.5">
                                {booking.mode === 'video' ? '📹' : '📍'} {booking.mode}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                            booking.status === 'pending' 
                              ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                              : 'bg-success-light text-success border border-success/20'
                          }`}>
                            {booking.status === 'pending' ? '⏳ Pending' : '✅ Confirmed'}
                          </span>
                          <span className="font-bold text-lg">₹{booking.price.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-border-light">
                          <button className="flex-1 bg-accent text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all">
                            Accept
                          </button>
                          <button className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-all">
                            Decline
                          </button>
                          <button className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-all">
                            Message
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h1 className="font-serif text-2xl text-foreground mb-1">Messages</h1>
                  <p className="text-sm text-text-secondary">Chat with your clients</p>
                </div>
                
                <div className="space-y-2">
                  {mockMessages.map(msg => (
                    <button
                      key={msg.id}
                      className={`w-full bg-white border rounded-xl p-4 flex items-start gap-4 text-left hover:shadow-sm transition-all ${
                        msg.unread ? 'border-accent/30 bg-accent-light/20' : 'border-border'
                      }`}
                    >
                      <div className="relative">
                        <Image src={msg.avatar} alt={msg.clientName} width={44} height={44} className="rounded-full" />
                        {msg.unread && (
                          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm ${msg.unread ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>{msg.clientName}</p>
                          <span className="text-[11px] text-text-muted shrink-0">{msg.time}</span>
                        </div>
                        <p className={`text-sm truncate ${msg.unread ? 'text-foreground font-medium' : 'text-text-muted'}`}>{msg.lastMessage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="animate-fade-in space-y-8 max-w-2xl">
                <div>
                  <h1 className="font-serif text-2xl text-foreground mb-1">Profile Settings</h1>
                  <p className="text-sm text-text-secondary">Update your profile information and preferences</p>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
                  <h3 className="font-semibold text-lg text-foreground">Personal Info</h3>
                  
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
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Bio</label>
                    <textarea rows={4} defaultValue={user.bio || ""} placeholder="Tell clients about yourself..." className="w-full border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-accent bg-white resize-none" />
                  </div>

                  <button className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all">
                    Save Changes
                  </button>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Portfolio</h3>
                  <p className="text-sm text-text-secondary">Upload photos of your previous work to attract clients.</p>
                  <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent/30 hover:bg-surface-muted transition-all cursor-pointer group">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-muted mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={24} className="text-text-muted" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">Upload portfolio images</p>
                    <p className="text-xs text-text-muted">JPEG, PNG up to 5MB each</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-sm text-red-700 mb-2">Danger Zone</h3>
                  <p className="text-xs text-red-600 mb-4">Sign out from your account or deactivate your profile.</p>
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

  // ===== ONBOARDING FLOW =====
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        
        <div className="max-w-lg w-full">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all ${step >= s ? 'bg-accent' : 'bg-border'}`} />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-border bg-surface-muted">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-light mb-4">
                <Sparkles className="text-accent" size={24} />
              </div>
              <h1 className="font-serif text-2xl text-foreground mb-1">Set Up Your Profile</h1>
              <p className="text-sm text-text-secondary">Step {step} of 3 — {step === 1 ? "About You" : step === 2 ? "Your Services" : "Portfolio"}</p>
            </div>

            <div className="p-6">
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Professional Bio</label>
                    <textarea 
                      rows={4} 
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-accent bg-white resize-none transition-all" 
                      placeholder="Tell clients about your background and styling expertise..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Specialty</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "unisex", label: "All Genders" },
                        { value: "women", label: "Women" },
                        { value: "men", label: "Men" },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setFormData({...formData, genderSpecialty: opt.value})}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                            formData.genderSpecialty === opt.value ? 'border-accent bg-accent-light text-accent' : 'border-border bg-white text-text-secondary hover:border-accent/30'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setStep(2)} 
                    className="w-full bg-accent text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm text-text-secondary mb-2">Select the services you want to offer:</p>
                  
                  <div className="space-y-3">
                    {coreServices.map(service => (
                      <button 
                        key={service.id} 
                        onClick={() => handleServiceToggle(service.id)}
                        className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 text-left ${
                          formData.services.includes(service.id) ? 'border-accent bg-accent-light' : 'border-border bg-white hover:border-accent/30'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          formData.services.includes(service.id) ? 'bg-accent text-white' : 'border-2 border-border bg-white'
                        }`}>
                          {formData.services.includes(service.id) && <CheckCircle2 size={14} />}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-foreground flex items-center gap-2">{service.icon} {service.title}</span>
                          <span className="text-xs text-text-muted mt-0.5 block">From ₹{service.basePrice.toLocaleString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-5 py-3.5 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-all">
                      Back
                    </button>
                    <button 
                      onClick={() => setStep(3)} 
                      disabled={formData.services.length === 0}
                      className="flex-1 bg-accent text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover transition-all disabled:opacity-50"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent/30 hover:bg-surface-muted transition-all cursor-pointer group">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-muted mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={24} className="text-text-muted" />
                    </div>
                    <p className="font-medium text-sm text-foreground mb-1">Upload Portfolio Images</p>
                    <p className="text-xs text-text-muted">Drag & drop or click to upload (JPEG, PNG)</p>
                  </div>

                  <div className="bg-surface-muted border border-border rounded-xl p-4">
                    <p className="text-xs text-text-secondary leading-relaxed">💡 Tip: Upload 3-5 photos of your best styling work. This helps clients see your aesthetic and style before booking.</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="px-5 py-3.5 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-all">
                      Back
                    </button>
                    <button 
                      onClick={() => {
                        completeOnboarding();
                        setIsOnboarded(true);
                      }} 
                      className="flex-1 bg-gradient-to-r from-accent to-accent-secondary text-white py-3.5 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 hover:opacity-90 transition-all shadow-lg"
                    >
                      <Sparkles size={16}/> Launch My Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
