"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, LogIn, UserPlus, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { href: "/explore", label: "Find Stylists" },
  { href: "/signature", label: "Collections" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const { isAuthenticated, user, logout } = useAuthStore();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [userMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-background/95 backdrop-blur-sm'} border-b border-border`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-serif text-xl tracking-tight font-semibold text-foreground">
            Stylist<span className="text-accent">Studio</span>
          </span>
        </Link>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
            <input 
              type="text" 
              placeholder="Search stylists, services, occasions..." 
              className="w-full bg-surface-muted border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 shrink-0">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-text-secondary hover:text-foreground px-3 py-2 rounded-lg hover:bg-surface-muted transition-all font-medium"
            >
              {l.label}
            </Link>
          ))}
          
          {/* Cart */}
          <Link href="/cart" className="relative p-2.5 text-foreground hover:text-accent hover:bg-accent-light rounded-full transition-all ml-1">
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-glow">
                {items.length}
              </span>
            )}
          </Link>

          {/* Auth buttons */}
          {mounted && isAuthenticated && user ? (
            <div className="relative ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                className="flex items-center gap-2 border border-border text-foreground text-sm font-medium px-3 py-2 rounded-full hover:bg-surface-muted transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <span className="hidden lg:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
              
              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-border rounded-xl shadow-lg py-2 w-56 animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{user.email}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                      {user.role === 'stylist' ? '💇 Stylist' : '👤 Customer'}
                    </span>
                  </div>
                  <Link
                    href={user.role === 'stylist' ? "/stylist-portal" : "/customer-dashboard"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-muted hover:text-foreground transition-colors"
                  >
                    <User size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-muted hover:text-foreground transition-colors"
                  >
                    <ShoppingBag size={16} /> My Cart {mounted && items.length > 0 && <span className="ml-auto text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">{items.length}</span>}
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogIn size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : mounted ? (
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/auth?mode=signin"
                className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-foreground px-4 py-2.5 rounded-full hover:bg-surface-muted transition-all"
              >
                <LogIn size={16} /> Sign In
              </Link>
              <Link
                href="/auth?mode=signup"
                className="flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent-hover transition-all shadow-sm hover:shadow-md"
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </div>
          ) : null}
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/cart" className="relative p-2 text-foreground">
            <ShoppingBag size={20} />
            {mounted && items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground rounded-lg hover:bg-surface-muted transition-colors">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-5 pb-6 pt-4 space-y-3 animate-fade-in">
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search stylists, services..." 
              className="w-full bg-surface-muted border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-foreground font-medium py-3 px-3 rounded-lg hover:bg-surface-muted transition-colors"
            >
              {l.label}
            </Link>
          ))}
          
          <div className="border-t border-border pt-4 mt-4">
            {mounted && isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-text-muted">{user.role === 'stylist' ? 'Stylist' : 'Customer'}</p>
                  </div>
                </div>
                <Link
                  href={user.role === 'stylist' ? "/stylist-portal" : "/customer-dashboard"}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-foreground font-medium py-3 px-3 rounded-lg hover:bg-surface-muted"
                >
                  🏠 Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="block w-full text-left text-sm text-red-500 font-medium py-3 px-3 rounded-lg hover:bg-red-50"
                >
                  🚪 Sign Out
                </button>
              </div>
            ) : mounted ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth?mode=signin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 border border-border text-foreground rounded-full text-sm font-semibold px-6 py-3"
                >
                  <LogIn size={16} /> Sign In
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-accent text-white rounded-full text-sm font-semibold px-6 py-3 shadow-sm"
                >
                  <UserPlus size={16} /> Sign Up Free
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
