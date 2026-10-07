// src/app/stylist-portal/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { coreServices, mockStylists } from "@/data/mockDatabase";
import { useAuthStore } from "@/store/authStore";
import ChatInterface from "@/components/chat/ChatInterface";
import {
  Upload,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Settings,
  LayoutDashboard,
  TrendingUp,
  Calendar as CalendarIcon,
  Wallet,
  Star,
  Sparkles,
  Users,
  Clock,
  Eye,
  PlusCircle,
  ArrowRight,
  Edit3,
  MapPin,
  Globe,
  Tag,
  Gift,
  Share2,
  DollarSign,
  Check,
  Percent,
} from "lucide-react";

type DashTab = "overview" | "earnings" | "bookings" | "messages" | "offers" | "portfolio" | "settings";

export default function StylistPortalPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const [copiedLink, setCopiedLink] = useState(false);

  // New Offer Form State
  const [offerTitle, setOfferTitle] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(20);
  const [offerCreated, setOfferCreated] = useState(false);

  // Active Promotional Offers
  const [offers, setOffers] = useState([
    {
      id: "off-1",
      title: "Diwali & Festive Celebration Special",
      code: "FESTIVE25",
      discountPercent: 25,
      active: true,
      validUntil: "Oct 31, 2026",
    },
    {
      id: "off-2",
      title: "New Client Welcome Bonus",
      code: "STYLE10",
      discountPercent: 10,
      active: true,
      validUntil: "Nov 15, 2026",
    },
  ]);

  // Active Portfolio Items
  const [portfolioList, setPortfolioList] = useState([
    {
      id: "p1",
      title: "Traditional Sangeet Lehenga Styling",
      imageUrl: "/service_wardrobe.jpg",
      tags: ["bridal", "lehenga", "festive"],
      likes: 42,
    },
    {
      id: "p2",
      title: "Modern Power Suiting & Indo-Western",
      imageUrl: "/service_travel.jpg",
      tags: ["editorial", "corporate", "fusion"],
      likes: 67,
    },
  ]);

  const [newLookTitle, setNewLookTitle] = useState("");
  const [newLookTags, setNewLookTags] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Stylist Info
  const stylistProfile = mockStylists[0];
  const publicPortfolioUrl = typeof window !== "undefined" ? `${window.location.origin}/stylist/${stylistProfile.id}` : `/stylist/${stylistProfile.id}`;

  const handleCopyPortfolioLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicPortfolioUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerCode || !offerTitle) return;

    setOffers((prev) => [
      ...prev,
      {
        id: `off-${Date.now()}`,
        title: offerTitle,
        code: offerCode.toUpperCase(),
        discountPercent,
        active: true,
        validUntil: "Nov 30, 2026",
      },
    ]);

    setOfferCreated(true);
    setOfferTitle("");
    setOfferCode("");
    setTimeout(() => setOfferCreated(false), 3000);
  };

  const handleAddPortfolioLook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLookTitle) return;

    setPortfolioList((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        title: newLookTitle,
        imageUrl: "/stylist_1.jpg",
        tags: newLookTags.split(",").map((t) => t.trim()).filter(Boolean),
        likes: 0,
      },
    ]);

    setNewLookTitle("");
    setNewLookTags("");
  };

  // Mock Bookings
  const mockBookings = [
    {
      id: "b1",
      clientName: "Sneha Iyer",
      clientAvatar: "https://i.pravatar.cc/150?u=sneha",
      service: "Festive Season Package",
      date: "Oct 15, 2026",
      time: "10:00 AM - 11:30 AM",
      mode: "video",
      status: "confirmed",
      price: 3749,
    },
    {
      id: "b2",
      clientName: "Vikram Joshi",
      clientAvatar: "https://i.pravatar.cc/150?u=vikram",
      service: "Monthly VIP Wardrobe Retainer",
      date: "Oct 18, 2026",
      time: "01:00 PM - 02:00 PM",
      mode: "in-person",
      status: "confirmed",
      price: 4999,
    },
    {
      id: "b3",
      clientName: "Aisha Khan",
      clientAvatar: "https://i.pravatar.cc/150?u=aisha",
      service: "Image & Color Palette Consultation",
      date: "Oct 22, 2026",
      time: "05:00 PM - 06:00 PM",
      mode: "video",
      status: "pending",
      price: 2499,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-72 bg-white lg:border-r border-b lg:border-b-0 border-border flex flex-col shrink-0">
          {/* Profile Card */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shrink-0 relative">
                <Image
                  src={stylistProfile.imageUrl}
                  alt={stylistProfile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-foreground truncate">
                  {stylistProfile.name}
                </div>
                <div className="text-[11px] font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 size={11} /> Verified Stylist
                </div>
              </div>
            </div>

            {/* Share Public Portfolio Link Button */}
            <button
              onClick={handleCopyPortfolioLink}
              className="w-full mt-2 py-2 px-3 bg-accent-light text-accent rounded-xl text-xs font-semibold hover:bg-accent/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Share2 size={13} />
              {copiedLink ? "Link Copied to Clipboard!" : "Share Portfolio Link"}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible flex-grow scrollbar-none">
            {[
              { key: "overview", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
              { key: "earnings", icon: <Wallet size={18} />, label: "Earnings & Payouts", badge: "₹48,940" },
              { key: "bookings", icon: <CalendarIcon size={18} />, label: "Bookings", badge: "3" },
              { key: "messages", icon: <MessageCircle size={18} />, label: "Client Chats", badge: "1" },
              { key: "offers", icon: <Gift size={18} />, label: "Offers & Bonuses" },
              { key: "portfolio", icon: <Sparkles size={18} />, label: "Manage Portfolio" },
              { key: "settings", icon: <Settings size={18} />, label: "Profile Settings" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as DashTab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === item.key
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === item.key
                        ? "bg-white/25 text-white"
                        : "bg-surface-muted text-accent"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block p-4 border-t border-border">
            <Link
              href={`/stylist/${stylistProfile.id}`}
              className="text-xs font-semibold text-text-secondary hover:text-accent flex items-center gap-1.5 transition-colors"
            >
              <Eye size={14} /> View Public Profile
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow p-6 lg:p-10 overflow-y-auto">
          {/* ===== 1. OVERVIEW TAB ===== */}
          {activeTab === "overview" && (
            <div className="animate-fade-in space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-foreground font-bold">
                    Stylist Workspace 🌟
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Welcome back! Here is your earnings summary, bookings, and inquiries.
                  </p>
                </div>

                <Link
                  href={`/stylist/${stylistProfile.id}`}
                  className="bg-accent text-white px-5 py-2.5 rounded-2xl text-xs font-semibold hover:bg-accent-hover transition-all flex items-center gap-1.5 self-start shadow-sm"
                >
                  <Eye size={14} /> View Live Portfolio
                </Link>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-border rounded-3xl p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-success-light text-success flex items-center justify-center mb-3">
                    <Wallet size={20} />
                  </div>
                  <div className="font-serif text-2xl font-bold text-foreground">
                    ₹48,940
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    This Month's Revenue
                  </div>
                </div>

                <div className="bg-white border border-border rounded-3xl p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-accent-light text-accent flex items-center justify-center mb-3">
                    <TrendingUp size={20} />
                  </div>
                  <div className="font-serif text-2xl font-bold text-foreground">
                    ₹41,599
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    Pending Payout (85%)
                  </div>
                </div>

                <div className="bg-white border border-border rounded-3xl p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-purple-light text-purple flex items-center justify-center mb-3">
                    <CalendarIcon size={20} />
                  </div>
                  <div className="font-serif text-2xl font-bold text-foreground">
                    3 Active
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    Upcoming Sessions
                  </div>
                </div>

                <div className="bg-white border border-border rounded-3xl p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                    <Star size={20} />
                  </div>
                  <div className="font-serif text-2xl font-bold text-foreground">
                    4.9 ★
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    248 Client Reviews
                  </div>
                </div>
              </div>

              {/* Quick Hub Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab("earnings")}
                  className="bg-white border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-foreground">
                      Earnings & Subscriptions
                    </span>
                    <ArrowRight size={15} className="text-accent" />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    View active subscription retainers, completed payouts, and commission breakdowns.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab("offers")}
                  className="bg-white border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-foreground">
                      Festive Season Offers
                    </span>
                    <ArrowRight size={15} className="text-accent" />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Create voucher codes and seasonal package deals to attract clients.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab("portfolio")}
                  className="bg-white border border-border rounded-2xl p-5 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-foreground">
                      Portfolio Showcase
                    </span>
                    <ArrowRight size={15} className="text-accent" />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Upload your latest looks with style tags for marketing and social sharing.
                  </p>
                </div>
              </div>

              {/* Recent Bookings Section */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Upcoming Client Sessions
                  </h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-bold text-accent hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {mockBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-surface-muted border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <Image
                          src={b.clientAvatar}
                          alt={b.clientName}
                          width={42}
                          height={42}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {b.clientName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {b.service} • {b.date} ({b.time})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-foreground">
                          ₹{b.price.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            b.status === "confirmed"
                              ? "bg-success-light text-success"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {b.status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== 2. EARNINGS DASHBOARD ===== */}
          {activeTab === "earnings" && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Stylist Earnings & Payouts 💰
                </h1>
                <p className="text-sm text-text-secondary">
                  Transparent earnings analytics, active subscription retainers, and payout timeline.
                </p>
              </div>

              {/* Earnings Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-border rounded-3xl p-6">
                  <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                    Total Gross Revenue
                  </div>
                  <div className="font-serif text-3xl font-bold text-foreground">
                    ₹48,940
                  </div>
                  <div className="text-xs text-success mt-2 font-medium">
                    +18% from last month
                  </div>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6">
                  <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                    Net Payout Ready (85%)
                  </div>
                  <div className="font-serif text-3xl font-bold text-accent">
                    ₹41,599
                  </div>
                  <div className="text-xs text-text-muted mt-2">
                    Auto-transfers every Monday to your bank
                  </div>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6">
                  <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                    Active Subscriptions
                  </div>
                  <div className="font-serif text-3xl font-bold text-foreground">
                    4 Retainers
                  </div>
                  <div className="text-xs text-purple mt-2 font-medium">
                    ₹19,996 recurring monthly
                  </div>
                </div>
              </div>

              {/* Visual Revenue Breakdown Chart Simulation */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Monthly Revenue Breakdown (2026)
                  </h3>
                  <span className="text-xs text-text-muted">Strictly in INR (₹)</span>
                </div>

                <div className="space-y-4">
                  {[
                    { month: "October (Current)", amount: 48940, progress: "90%" },
                    { month: "September", amount: 41200, progress: "78%" },
                    { month: "August", amount: 36500, progress: "68%" },
                    { month: "July", amount: 29800, progress: "55%" },
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{row.month}</span>
                        <span>₹{row.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-surface-muted h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-accent h-full rounded-full transition-all duration-700"
                          style={{ width: row.progress }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment History Table */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Recent Transaction Log
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-text-muted uppercase">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Service / Package</th>
                        <th className="pb-3">Gross</th>
                        <th className="pb-3">Stylist Payout (85%)</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                      <tr>
                        <td className="py-3">Oct 07, 2026</td>
                        <td className="py-3 font-semibold">Sneha Iyer</td>
                        <td className="py-3">Festive Season Offer</td>
                        <td className="py-3">₹3,749</td>
                        <td className="py-3 font-bold text-accent">₹3,186</td>
                        <td className="py-3 text-success font-semibold">Settled</td>
                      </tr>
                      <tr>
                        <td className="py-3">Oct 05, 2026</td>
                        <td className="py-3 font-semibold">Vikram Joshi</td>
                        <td className="py-3">Monthly VIP Subscription</td>
                        <td className="py-3">₹4,999</td>
                        <td className="py-3 font-bold text-accent">₹4,249</td>
                        <td className="py-3 text-success font-semibold">Settled</td>
                      </tr>
                      <tr>
                        <td className="py-3">Oct 02, 2026</td>
                        <td className="py-3 font-semibold">Deepa Nair</td>
                        <td className="py-3">Wedding Event Styling</td>
                        <td className="py-3">₹5,999</td>
                        <td className="py-3 font-bold text-accent">₹5,099</td>
                        <td className="py-3 text-success font-semibold">Settled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== 3. CLIENT CHATS & INQUIRIES ===== */}
          {activeTab === "messages" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Stylist Inquiries & Messages 💬
                </h1>
                <p className="text-sm text-text-secondary">
                  Gated chat request approval flow and direct client messaging.
                </p>
              </div>

              <ChatInterface
                currentUserId="stylist-owner-id"
                stylistProfileId={stylistProfile.id}
                otherPartyName="Sneha Iyer (Client)"
                otherPartyAvatar="https://i.pravatar.cc/150?u=sneha"
                isStylist={true}
              />
            </div>
          )}

          {/* ===== 4. OFFERS & FESTIVE PACKAGES ===== */}
          {activeTab === "offers" && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Promotional Offers & Festive Bonus Deals 🎁
                </h1>
                <p className="text-sm text-text-secondary">
                  Create limited-time coupon codes and festive season discounts attached directly to your public portfolio.
                </p>
              </div>

              {/* Create Offer Form */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Create New Promotional Offer
                </h3>

                <form onSubmit={handleCreateOffer} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Offer Title
                    </label>
                    <input
                      type="text"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      placeholder="e.g., Diwali Bridal Festive Special"
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value)}
                      placeholder="e.g., DIWALI20"
                      className="w-full border border-border rounded-2xl p-3.5 text-xs uppercase font-bold bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="70"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Gift size={16} /> Publish Offer to Portfolio
                    </button>
                  </div>
                </form>

                {offerCreated && (
                  <div className="p-3 bg-success-light text-success text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 size={16} /> Offer published to your public portfolio!
                  </div>
                )}
              </div>

              {/* Active Offers List */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Active Offers on Your Profile
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offers.map((off) => (
                    <div
                      key={off.id}
                      className="p-5 rounded-3xl bg-white border border-border flex items-start justify-between gap-4 shadow-xs"
                    >
                      <div>
                        <span className="bg-accent-light text-accent text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                          {off.code} • {off.discountPercent}% OFF
                        </span>
                        <h4 className="font-bold text-sm text-foreground mt-2">
                          {off.title}
                        </h4>
                        <p className="text-xs text-text-muted mt-1">
                          Valid until {off.validUntil}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold text-success bg-success-light px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== 5. MANAGE PORTFOLIO ===== */}
          {activeTab === "portfolio" && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Manage Portfolio & Marketing 📸
                </h1>
                <p className="text-sm text-text-secondary">
                  Add photos of your styling work, categorize them with tags, and share your public portfolio.
                </p>
              </div>

              {/* Add New Look Form */}
              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-5">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Upload New Look to Portfolio
                </h3>

                <form onSubmit={handleAddPortfolioLook} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Look Title
                    </label>
                    <input
                      type="text"
                      value={newLookTitle}
                      onChange={(e) => setNewLookTitle(e.target.value)}
                      placeholder="e.g., Royal Rajasthani Bridal Draping"
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Style Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newLookTags}
                      onChange={(e) => setNewLookTags(e.target.value)}
                      placeholder="bridal, royal, lehenga, saree"
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center bg-surface-muted hover:bg-white transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto text-accent mb-2" />
                    <p className="text-xs font-bold text-foreground">
                      Click to select photos or drag & drop
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      PNG, JPG up to 10MB
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-hover text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
                  >
                    Add Look to Portfolio
                  </button>
                </form>
              </div>

              {/* Current Portfolio Grid */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Published Portfolio Looks ({portfolioList.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {portfolioList.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl overflow-hidden bg-white border border-border shadow-xs"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-xs text-foreground truncate">
                          {item.title}
                        </h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-surface-muted text-text-secondary px-2 py-0.5 rounded-full"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== 6. BOOKINGS TAB ===== */}
          {activeTab === "bookings" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Client Appointments 📅
                </h1>
                <p className="text-sm text-text-secondary">
                  Manage your consultation schedule and video call links.
                </p>
              </div>

              <div className="space-y-4">
                {mockBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white border border-border rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={b.clientAvatar}
                        alt={b.clientName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-foreground">{b.clientName}</h4>
                        <p className="text-xs text-text-secondary">{b.service}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                          <span>📅 {b.date}</span>
                          <span>⏰ {b.time}</span>
                          <span className="capitalize">
                            {b.mode === "video" ? "📹 Video Call" : "📍 In-Person"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-foreground">
                        ₹{b.price.toLocaleString()}
                      </span>
                      <button className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-accent-hover transition-colors">
                        Launch Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== 7. SETTINGS TAB ===== */}
          {activeTab === "settings" && (
            <div className="animate-fade-in space-y-6 max-w-2xl">
              <div>
                <h1 className="font-serif text-3xl text-foreground font-bold mb-1">
                  Profile Settings ⚙️
                </h1>
                <p className="text-sm text-text-secondary">
                  Update your bio, destinations, hourly rates, and account details.
                </p>
              </div>

              <div className="bg-white border border-border rounded-3xl p-6 md:p-8 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                    Hourly Consultation Rate (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue={stylistProfile.hourlyRate || 1499}
                    className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={stylistProfile.bio}
                    className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <button className="bg-accent text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-accent-hover transition-all">
                  Save Changes
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
