"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/curators", label: "The Roster" },
  { href: "/signature", label: "Signature" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight font-semibold text-[#1A1A1A]">
          CURATE.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.12em] text-[#666] hover:text-[#1A1A1A] transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="ml-4 bg-[#1A1A1A] text-white text-[13px] uppercase tracking-[0.1em] font-medium px-6 py-2.5 hover:bg-[#333] transition-colors"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[#1A1A1A]">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E8E8E8] bg-[#FAFAFA] px-5 pb-6 pt-4 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-[15px] text-[#1A1A1A] py-2 border-b border-[#F0F0F0]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-[#1A1A1A] text-white text-[13px] uppercase tracking-[0.1em] font-medium px-6 py-3 mt-4"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
