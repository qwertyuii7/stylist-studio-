"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Search, Filter, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";

const DUMMY_BOOKINGS = [
  { id: "STYL-8492", customer: "Alice Johnson", service: "Personal Styling", stylist: "Elena Rodriguez", status: "Paid", date: "Oct 12, 2026" },
  { id: "STYL-1123", customer: "Mark Smith", service: "Wardrobe Styling", stylist: "James Chen", status: "Confirmed", date: "Oct 14, 2026" },
  { id: "STYL-4451", customer: "Sarah Williams", service: "Image Consulting", stylist: "Sophia Patel", status: "Completed", date: "Sep 28, 2026" },
];

const DUMMY_STYLISTS = [
  { id: 1, name: "Elena Rodriguez", tier: "Budget / Starter", status: "Active", rate: "₹1,500" },
  { id: 2, name: "James Chen", tier: "Mid-Range", status: "Active", rate: "₹3,000" },
  { id: 3, name: "Sophia Patel", tier: "Premium / Luxury", status: "Inactive", rate: "₹7,500" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "stylists">("bookings");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple dummy auth for UI demonstration
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Try 'admin123'");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-surface-muted px-5">
        <div className="max-w-md w-full bg-white p-8 border border-border shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
              <Lock className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-serif text-center text-foreground mb-2">Admin Portal</h1>
          <p className="text-center text-sm text-text-dark-muted mb-8">Sign in to manage bookings and stylists.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-text-dark-muted mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border px-4 py-3 outline-none focus:border-foreground transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-foreground text-white py-3 text-sm font-medium uppercase tracking-wider hover:bg-dark-hover transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-dark-muted hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted pb-20">
      <div className="bg-foreground text-white px-5 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif text-xl">Admin Dashboard</div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-8">
          <button 
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 px-2 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === "bookings" ? "border-b-2 border-foreground text-foreground" : "text-text-dark-muted hover:text-foreground"
            }`}
          >
            Bookings
          </button>
          <button 
            onClick={() => setActiveTab("stylists")}
            className={`pb-3 px-2 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === "stylists" ? "border-b-2 border-foreground text-foreground" : "text-text-dark-muted hover:text-foreground"
            }`}
          >
            Stylists
          </button>
        </div>

        {/* Bookings View */}
        {activeTab === "bookings" && (
          <div className="bg-white border border-border shadow-sm">
            <div className="p-5 border-b border-border flex justify-between items-center bg-background">
              <h2 className="font-semibold text-foreground">Recent Bookings</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-border text-sm outline-none w-48 focus:border-foreground" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-text-dark-muted hover:bg-surface-muted">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-background text-text-dark-muted uppercase text-[11px] tracking-wider border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Ref ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Service & Stylist</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_BOOKINGS.map((b) => (
                    <tr key={b.id} className="border-b border-border-light hover:bg-background transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{b.id}</td>
                      <td className="px-6 py-4 text-dark-hover">{b.customer}</td>
                      <td className="px-6 py-4">
                        <div className="text-foreground">{b.service}</div>
                        <div className="text-xs text-text-dark-muted">{b.stylist}</div>
                      </td>
                      <td className="px-6 py-4 text-text-dark-muted">{b.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                          b.status === "Paid" ? "bg-blue-100 text-blue-700" :
                          b.status === "Confirmed" ? "bg-amber-100 text-amber-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm text-blue-600 hover:underline">View Intake</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stylists View */}
        {activeTab === "stylists" && (
          <div className="bg-white border border-border shadow-sm">
            <div className="p-5 border-b border-border flex justify-between items-center bg-background">
              <h2 className="font-semibold text-foreground">Stylist Directory</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-white text-sm font-medium hover:bg-dark-hover">
                <Plus size={16} /> Add Stylist
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-background text-text-dark-muted uppercase text-[11px] tracking-wider border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Tier</th>
                    <th className="px-6 py-4 font-medium">Base Rate</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_STYLISTS.map((s) => (
                    <tr key={s.id} className="border-b border-border-light hover:bg-background transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                      <td className="px-6 py-4 text-text-dark-muted">{s.tier}</td>
                      <td className="px-6 py-4 text-text-dark-muted">{s.rate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                          s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-text-dark-muted hover:text-blue-600"><Edit2 size={16} /></button>
                          <button className="text-text-dark-muted hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
