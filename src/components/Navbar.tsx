"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/signature", label: "Signature" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const { isAuthenticated, user } = useAuthStore();
  
  // To avoid hydration mismatch with Zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl tracking-tight font-semibold text-foreground shrink-0">
          CURATE.
        </Link>

        {/* Search Bar - MakeMyTrip style prominent search */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search destination, style, or curator..." 
              className="w-full bg-surface-muted border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.12em] text-text-dark-muted hover:text-accent transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
          
          <Link href="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link
              href={user?.role === 'stylist' ? "/stylist-portal" : "/customer-dashboard"}
              className="ml-2 flex items-center gap-2 border border-border text-foreground text-[12px] uppercase tracking-[0.1em] font-bold px-5 py-2.5 rounded-full hover:bg-surface-muted transition-colors"
            >
              <User size={16} /> My Atelier
            </Link>
          ) : (
            <Link
              href="/auth"
              className="ml-2 bg-foreground text-white text-[12px] uppercase tracking-[0.1em] font-bold px-6 py-2.5 rounded-full hover:bg-dark-hover transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-foreground">
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-5 pb-6 pt-4 space-y-4">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-surface-muted border border-border rounded-full py-2 pl-10 pr-4 text-sm"
            />
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[15px] text-foreground py-2 border-b border-border-light"
            >
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              href={user?.role === 'stylist' ? "/stylist-portal" : "/customer-dashboard"}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-surface-muted border border-border text-foreground rounded-full text-[13px] uppercase tracking-[0.1em] font-bold px-6 py-3 mt-4"
            >
              <User size={16} /> My Atelier
            </Link>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-foreground text-white rounded-full text-[13px] uppercase tracking-[0.1em] font-bold px-6 py-3 mt-4 shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
