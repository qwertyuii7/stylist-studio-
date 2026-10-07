// src/app/custom-request/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockStylists } from "@/data/mockDatabase";
import {
  Scissors,
  Sparkles,
  PlusCircle,
  MessageSquare,
  Ruler,
  Palette,
  Upload,
  CheckCircle2,
  DollarSign,
  Tag,
  Eye,
  Filter,
  ArrowRight,
  Clock,
  User,
  ShieldCheck,
  Send,
  X,
  Star,
} from "lucide-react";
import CheckoutFlow from "@/components/payment/CheckoutFlow";

interface StylistOffer {
  id: string;
  stylistId: string;
  stylistName: string;
  stylistAvatar: string;
  stylistRating: number;
  offeredPrice: number;
  estimatedDelivery: string;
  proposal: string;
  createdAt: string;
}

interface CustomPost {
  id: string;
  title: string;
  customerName: string;
  customerAvatar: string;
  occasion: string;
  budget: number;
  heightCm: number;
  weightKg: number;
  fitPreference: string;
  colors: string[];
  imageUrl?: string;
  description: string;
  status: "OPEN_FOR_OFFERS" | "ASSIGNED" | "COMPLETED";
  targetStylistId?: string | null;
  targetStylistName?: string | null;
  createdAt: string;
  offers: StylistOffer[];
}

export default function CustomRequestPage() {
  const [viewTab, setViewTab] = useState<"marketplace" | "create">("marketplace");
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<string>("all");
  const [activePostForOffer, setActivePostForOffer] = useState<CustomPost | null>(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState<CustomPost | null>(null);

  // Stylist Offer Submission State
  const [offerPrice, setOfferPrice] = useState(14999);
  const [offerDelivery, setOfferDelivery] = useState("5-7 Days");
  const [offerProposal, setOfferProposal] = useState("");
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  // New Post Creation State
  const [postTitle, setPostTitle] = useState("");
  const [postOccasion, setPostOccasion] = useState("Festive Sangeet");
  const [postBudget, setPostBudget] = useState(18000);
  const [postHeight, setPostHeight] = useState(168);
  const [postWeight, setPostWeight] = useState(62);
  const [postFit, setPostFit] = useState("Tailored Slim");
  const [postColors, setPostColors] = useState(["Emerald Green", "Gold", "Ivory"]);
  const [postDescription, setPostDescription] = useState("");
  const [assignmentType, setAssignmentType] = useState<"open" | "specific">("open");
  const [selectedStylistId, setSelectedStylistId] = useState(mockStylists[0].id);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Public Community Design Posts
  const [posts, setPosts] = useState<CustomPost[]>([
    {
      id: "post-1",
      title: "Bespoke Royal Sangeet Sherwani with Draped Dupatta",
      customerName: "Aman Varma",
      customerAvatar: "https://i.pravatar.cc/150?u=aman",
      occasion: "Festive Sangeet",
      budget: 25000,
      heightCm: 180,
      weightKg: 75,
      fitPreference: "Structured Tailored",
      colors: ["Royal Navy", "Metallic Gold", "Ivory"],
      imageUrl: "/hero.jpg",
      description: "Looking for an Indo-Western fusion sherwani for my brother's wedding. Need asymmetric hemline with subtle hand zardozi work and a pre-pleated tonal dupatta.",
      status: "OPEN_FOR_OFFERS",
      createdAt: "2 hours ago",
      offers: [
        {
          id: "off-101",
          stylistId: "sty-1",
          stylistName: "Priya Sharma",
          stylistAvatar: "/stylist_1.jpg",
          stylistRating: 4.9,
          offeredPrice: 22500,
          estimatedDelivery: "7 Days",
          proposal: "I have direct connections with master karigars in Jaipur. I will curate 3 digital sketches, fabric samples of raw silk, and oversee tailoring with 2 virtual fittings.",
          createdAt: "1 hour ago",
        },
      ],
    },
    {
      id: "post-2",
      title: "Pastel Organza Lehenga with Pearl Embellished Blouse",
      customerName: "Rhea Kapoor",
      customerAvatar: "https://i.pravatar.cc/150?u=rhea",
      occasion: "Day Wedding",
      budget: 35000,
      heightCm: 165,
      weightKg: 56,
      fitPreference: "Flowy & High-Waisted",
      colors: ["Blush Pink", "Sage Green", "Silver"],
      imageUrl: "/service_wardrobe.jpg",
      description: "Need a breathable, lightweight pastel organza lehenga for a morning Anand Karaj ceremony in Delhi. Focus on delicate pearl borders and a contemporary sweetheart neckline.",
      status: "OPEN_FOR_OFFERS",
      createdAt: "5 hours ago",
      offers: [
        {
          id: "off-102",
          stylistId: "sty-4",
          stylistName: "Ritika Menon",
          stylistAvatar: "/service_travel.jpg",
          stylistRating: 4.9,
          offeredPrice: 32000,
          estimatedDelivery: "10 Days",
          proposal: "As a bridal specialist with 500+ styled weddings, I'll source pure Banarasi organza with handcrafted pearl moti borders and provide complete jewelry coordination.",
          createdAt: "3 hours ago",
        },
      ],
    },
    {
      id: "post-3",
      title: "Power Corporate Wardrobe: 4 Capsule Fusion Outfits",
      customerName: "Devansh Nair",
      customerAvatar: "https://i.pravatar.cc/150?u=devansh",
      occasion: "Executive Styling",
      budget: 20000,
      heightCm: 176,
      weightKg: 72,
      fitPreference: "Slim Classic",
      colors: ["Charcoal Grey", "Olive Green", "Deep Navy"],
      imageUrl: "/service_consulting.jpg",
      description: "Need a modern wardrobe revamp for international board meetings. Looking for linen bandhgalas, tailored trousers, and smart-casual blazers.",
      status: "ASSIGNED",
      targetStylistId: "sty-2",
      targetStylistName: "Arjun Kapoor",
      createdAt: "1 day ago",
      offers: [],
    },
  ]);

  const filteredPosts =
    selectedOccasionFilter === "all"
      ? posts
      : posts.filter((p) => p.occasion === selectedOccasionFilter);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postDescription) return;

    const chosenStylist =
      assignmentType === "specific"
        ? mockStylists.find((s) => s.id === selectedStylistId)
        : null;

    const newPost: CustomPost = {
      id: `post-${Date.now()}`,
      title: postTitle,
      customerName: "Sneha Iyer",
      customerAvatar: "https://i.pravatar.cc/150?u=sneha",
      occasion: postOccasion,
      budget: Number(postBudget),
      heightCm: Number(postHeight),
      weightKg: Number(postWeight),
      fitPreference: postFit,
      colors: postColors,
      imageUrl: "/service_shopping.jpg",
      description: postDescription,
      status: assignmentType === "specific" ? "ASSIGNED" : "OPEN_FOR_OFFERS",
      targetStylistId: chosenStylist ? chosenStylist.id : null,
      targetStylistName: chosenStylist ? chosenStylist.name : null,
      createdAt: "Just now",
      offers: [],
    };

    setPosts([newPost, ...posts]);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setViewTab("marketplace");
    }, 2000);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePostForOffer || !offerProposal) return;

    const currentStylist = mockStylists[0]; // Priya Sharma as active stylist
    const newOffer: StylistOffer = {
      id: `off-${Date.now()}`,
      stylistId: currentStylist.id,
      stylistName: currentStylist.name,
      stylistAvatar: currentStylist.imageUrl,
      stylistRating: currentStylist.rating,
      offeredPrice: Number(offerPrice),
      estimatedDelivery: offerDelivery,
      proposal: offerProposal,
      createdAt: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === activePostForOffer.id
          ? { ...p, offers: [newOffer, ...p.offers] }
          : p
      )
    );

    setOfferSubmitted(true);
    setTimeout(() => {
      setOfferSubmitted(false);
      setActivePostForOffer(null);
      setOfferProposal("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-accent via-accent-secondary to-accent text-white rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Scissors size={14} /> Custom Design Marketplace
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
              Build Your Own Look & Receive Stylist Offers
            </h1>
            <p className="text-white/80 text-xs md:text-sm mt-2 leading-relaxed">
              Publish your custom outfit requirements, metric measurements, and budget. Verified stylists can view your public design board and send competitive styling offers or direct proposals!
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => setViewTab("create")}
              className="bg-white text-foreground hover:bg-white/90 px-6 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <PlusCircle size={16} className="text-accent" /> Publish My Design Request
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex bg-surface-muted p-1 rounded-2xl self-start">
            <button
              onClick={() => setViewTab("marketplace")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewTab === "marketplace"
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <Eye size={15} /> Public Design Board ({posts.length})
            </button>
            <button
              onClick={() => setViewTab("create")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewTab === "create"
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <PlusCircle size={15} /> Post New Outfit Request
            </button>
          </div>

          {viewTab === "marketplace" && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                <Filter size={13} /> Occasion:
              </span>
              {[
                "all",
                "Festive Sangeet",
                "Day Wedding",
                "Executive Styling",
              ].map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasionFilter(occ)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedOccasionFilter === occ
                      ? "bg-accent text-white"
                      : "bg-surface-muted text-text-secondary hover:bg-border"
                  }`}
                >
                  {occ === "all" ? "All Posts" : occ}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== VIEW 1: PUBLIC DESIGN MARKETPLACE ===== */}
        {viewTab === "marketplace" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-border rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Customer Info & Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.customerAvatar}
                          alt={post.customerName}
                          width={44}
                          height={44}
                          className="rounded-full border border-border"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-foreground">
                            {post.customerName}
                          </h4>
                          <span className="text-[11px] text-text-muted">
                            Posted {post.createdAt} • {post.occasion}
                          </span>
                        </div>
                      </div>

                      <div>
                        {post.status === "OPEN_FOR_OFFERS" ? (
                          <span className="bg-success-light text-success border border-success/20 px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                            <Sparkles size={11} /> Open for Stylist Bids
                          </span>
                        ) : (
                          <span className="bg-purple-light text-purple border border-purple/20 px-3 py-1 rounded-full text-[11px] font-bold">
                            Direct to {post.targetStylistName || "Stylist"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Title & Description */}
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      {post.description}
                    </p>

                    {/* Metric Measurements Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-surface-muted p-3.5 rounded-2xl text-xs">
                      <div>
                        <span className="text-[10px] text-text-muted block uppercase">
                          Height / Weight
                        </span>
                        <span className="font-bold text-foreground">
                          {post.heightCm} cm • {post.weightKg} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block uppercase">
                          Silhouette
                        </span>
                        <span className="font-bold text-foreground">
                          {post.fitPreference}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block uppercase">
                          Target Budget
                        </span>
                        <span className="font-bold text-accent">
                          ₹{post.budget.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block uppercase">
                          Stylist Offers
                        </span>
                        <span className="font-bold text-foreground">
                          {post.offers.length} Received
                        </span>
                      </div>
                    </div>

                    {/* Colors & Palette */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-5">
                      <span className="text-xs text-text-muted mr-1">Colors:</span>
                      {post.colors.map((c) => (
                        <span
                          key={c}
                          className="bg-accent-light text-accent text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Existing Stylist Offers List Preview */}
                    {post.offers.length > 0 && (
                      <div className="mb-5 pt-4 border-t border-border-light space-y-2">
                        <span className="text-xs font-bold uppercase text-text-muted flex items-center gap-1">
                          <Tag size={12} className="text-accent" /> Stylist Proposals ({post.offers.length})
                        </span>
                        {post.offers.map((off) => (
                          <div
                            key={off.id}
                            className="bg-accent-light/30 border border-accent/20 rounded-2xl p-3.5 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={off.stylistAvatar}
                                  alt={off.stylistName}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                                <span className="font-bold text-foreground">
                                  {off.stylistName}
                                </span>
                                <span className="text-amber-500 font-bold">
                                  ★ {off.stylistRating}
                                </span>
                              </div>
                              <span className="font-serif font-bold text-accent text-sm">
                                ₹{off.offeredPrice.toLocaleString()} ({off.estimatedDelivery})
                              </span>
                            </div>
                            <p className="text-text-secondary text-[11px]">
                              "{off.proposal}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons on Card */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedPostDetails(post)}
                      className="text-xs font-bold text-text-secondary hover:text-foreground flex items-center gap-1"
                    >
                      View Full Details <ArrowRight size={13} />
                    </button>

                    {post.status === "OPEN_FOR_OFFERS" && (
                      <button
                        onClick={() => {
                          setActivePostForOffer(post);
                          setOfferPrice(post.budget);
                        }}
                        className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <Scissors size={14} /> Send Stylist Offer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== VIEW 2: POST NEW DESIGN REQUEST WIZARD ===== */}
        {viewTab === "create" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-10 shadow-sm max-w-3xl mx-auto animate-fade-in space-y-6">
            <div>
              <span className="bg-accent-light text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                <PlusCircle size={13} /> Publish to Public Design Board
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Submit Your Custom Outfit Vision
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Stylists across India will review your measurements and propose custom design concepts.
              </p>
            </div>

            {createdSuccess ? (
              <div className="text-center py-10 space-y-3 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-success-light text-success flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Published to Public Design Board! 🎉
                </h3>
                <p className="text-xs text-text-secondary max-w-sm mx-auto">
                  Stylists can now review your parameters and submit their offers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                    Design Request Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g., Royal Banarasi Silk Anarkali for Mehendi"
                    className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Occasion
                    </label>
                    <select
                      value={postOccasion}
                      onChange={(e) => setPostOccasion(e.target.value)}
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                    >
                      <option value="Festive Sangeet">Festive Sangeet / Mehendi</option>
                      <option value="Day Wedding">Day Wedding / Anand Karaj</option>
                      <option value="Cocktail Evening">Cocktail Gala / Reception</option>
                      <option value="Executive Styling">Executive / Boardroom Revamp</option>
                      <option value="Everyday Capsule">Everyday Capsule Wardrobe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Target Budget (INR ₹)
                    </label>
                    <input
                      type="number"
                      value={postBudget}
                      onChange={(e) => setPostBudget(Number(e.target.value))}
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                </div>

                {/* Metric Measurements */}
                <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-3">
                  <span className="text-xs font-bold uppercase text-text-muted flex items-center gap-1.5">
                    <Ruler size={14} className="text-accent" /> Your Metric Measurements
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-text-muted uppercase block">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={postHeight}
                        onChange={(e) => setPostHeight(Number(e.target.value))}
                        className="w-full border border-border rounded-xl p-2.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-text-muted uppercase block">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={postWeight}
                        onChange={(e) => setPostWeight(Number(e.target.value))}
                        className="w-full border border-border rounded-xl p-2.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-text-muted uppercase block">
                        Fit Preference
                      </label>
                      <select
                        value={postFit}
                        onChange={(e) => setPostFit(e.target.value)}
                        className="w-full border border-border rounded-xl p-2.5 text-xs bg-white"
                      >
                        <option value="Tailored Slim">Tailored Slim</option>
                        <option value="Flowy Classic">Flowy Classic</option>
                        <option value="Relaxed Fit">Relaxed Fit</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                    Outfit Concept & Styling Boundaries
                  </label>
                  <textarea
                    rows={4}
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    placeholder="Describe specific motifs, embroidery styles, dupatta draping preferences, or inspirations..."
                    className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent resize-none"
                    required
                  />
                </div>

                {/* Assignment Target */}
                <div>
                  <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                    Who should receive this request?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAssignmentType("open")}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                        assignmentType === "open"
                          ? "border-accent bg-accent-light text-accent ring-2 ring-accent"
                          : "border-border bg-surface-muted text-text-secondary"
                      }`}
                    >
                      🌟 Open Marketplace (All Stylists Can Bid)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssignmentType("specific")}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                        assignmentType === "specific"
                          ? "border-accent bg-accent-light text-accent ring-2 ring-accent"
                          : "border-border bg-surface-muted text-text-secondary"
                      }`}
                    >
                      🎯 Target a Specific Stylist
                    </button>
                  </div>
                </div>

                {assignmentType === "specific" && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2">
                      Choose Stylist
                    </label>
                    <select
                      value={selectedStylistId}
                      onChange={(e) => setSelectedStylistId(e.target.value)}
                      className="w-full border border-border rounded-2xl p-3.5 text-xs bg-surface-muted focus:bg-white focus:outline-none focus:border-accent"
                    >
                      {mockStylists.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.experience} • {s.tagline})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={15} /> Publish Outfit Request to Board
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      {/* ===== STYLIST SUBMIT OFFER MODAL ===== */}
      {activePostForOffer && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setActivePostForOffer(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-muted text-text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                Submit Stylist Proposal
              </span>
              <h3 className="font-serif text-xl font-bold text-foreground mt-0.5">
                {activePostForOffer.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Client Budget: <span className="font-bold text-accent">₹{activePostForOffer.budget.toLocaleString()}</span>
              </p>
            </div>

            {offerSubmitted ? (
              <div className="text-center py-6 space-y-2 animate-fade-in">
                <CheckCircle2 size={36} className="text-success mx-auto" />
                <h4 className="font-serif font-bold text-lg">Offer Submitted!</h4>
                <p className="text-xs text-text-secondary">
                  The client will review your offer and can accept or start a chat session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-muted mb-1.5">
                      Your Price Offer (₹)
                    </label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full border border-border rounded-xl p-3 text-xs bg-surface-muted focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-muted mb-1.5">
                      Estimated Turnaround
                    </label>
                    <input
                      type="text"
                      value={offerDelivery}
                      onChange={(e) => setOfferDelivery(e.target.value)}
                      placeholder="e.g. 5-7 Days"
                      className="w-full border border-border rounded-xl p-3 text-xs bg-surface-muted focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-text-muted mb-1.5">
                    Styling Proposal & Value Add
                  </label>
                  <textarea
                    rows={4}
                    value={offerProposal}
                    onChange={(e) => setOfferProposal(e.target.value)}
                    placeholder="Describe how you will source, style, or oversee tailoring for this client..."
                    className="w-full border border-border rounded-xl p-3 text-xs bg-surface-muted focus:bg-white resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Send Proposal to Client
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===== POST DETAIL & ACCEPT OFFER MODAL ===== */}
      {selectedPostDetails && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPostDetails(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-muted text-text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-accent uppercase">
                {selectedPostDetails.occasion}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground mt-1">
                {selectedPostDetails.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Requested by {selectedPostDetails.customerName} • Target Budget ₹{selectedPostDetails.budget.toLocaleString()}
              </p>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed bg-surface-muted p-4 rounded-2xl mb-5">
              {selectedPostDetails.description}
            </p>

            <h4 className="font-serif font-bold text-base mb-3">
              Received Stylist Proposals ({selectedPostDetails.offers.length})
            </h4>

            {selectedPostDetails.offers.length > 0 ? (
              <div className="space-y-3">
                {selectedPostDetails.offers.map((off) => (
                  <div
                    key={off.id}
                    className="border border-border rounded-2xl p-4 space-y-3 bg-white hover:border-accent transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src={off.stylistAvatar}
                          alt={off.stylistName}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-bold text-xs">{off.stylistName}</div>
                          <div className="text-[10px] text-amber-500 font-bold">
                            ★ {off.stylistRating} Stylist
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-accent text-base">
                          ₹{off.offeredPrice.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-text-muted">
                          {off.estimatedDelivery}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary">"{off.proposal}"</p>

                    <div className="pt-2 flex gap-2">
                      <CheckoutFlow
                        amount={off.offeredPrice}
                        planId={`custom_offer_${off.id}`}
                        stylistId={off.stylistId}
                        buttonText={`Accept & Pay ₹${off.offeredPrice.toLocaleString()}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted py-4 text-center">
                No proposals submitted yet. Stylists are reviewing your design request.
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
