"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function SignatureCollection() {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      {/* Custom dark navbar */}
      <header className="sticky top-0 z-50 w-full bg-dark/95 backdrop-blur-sm border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-tight font-semibold text-white">CURATE.</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors font-medium">Services</Link>
            <Link href="/explore" className="text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors font-medium">The Roster</Link>
            <Link href="/explore" className="ml-4 bg-white text-foreground text-[13px] uppercase tracking-[0.1em] font-medium px-6 py-2.5 hover:bg-gray-200 transition-colors">Book Now</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-16 border-b border-border-dark">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">Exclusive Tier</p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">The Signature<br />Collection.</h1>
            <p className="text-white/50 max-w-lg leading-relaxed">
              An exclusive echelon of celebrity fashion influencers and master stylists.
              Magazine-featured curators who shape personal brands at the highest level.
            </p>
          </motion.div>
        </section>

        {/* Featured Stylist */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="aspect-[3/4] relative overflow-hidden bg-dark-surface"
            >
              <Image src="/stylist_2.jpg" alt="Isabella Thorne" fill className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="md:-ml-12 relative z-10 bg-foreground border border-border-dark p-8 md:p-12"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6 font-medium">Featured Curator</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-2">Isabella Thorne</h2>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-6">Vogue Featured · Milan · 300+ Sessions</p>
              <p className="text-white/60 leading-relaxed text-sm mb-8 max-w-sm">
                Known for her avant-garde approach to minimalist luxury, Isabella has curated wardrobes for red carpets and executive boards globally. Her styling philosophy: less is the ultimate statement.
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-border-dark">
                <span className="font-serif text-xl">Starts at ₹15,000</span>
                <Link
                  href="/explore"
                  className="group inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-gray-200 transition-colors"
                >
                  Inquire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 border-t border-border-dark text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Want access to more signature stylists? Request a booking and our team will match you with the perfect curator.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-gray-200 transition-colors"
            >
              Request a Booking <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Dark footer override */}
      <footer className="border-t border-border-dark py-8 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/30 text-[11px] uppercase tracking-[0.15em]">
            &copy; {new Date().getFullYear()} Curate Styling Platform
          </div>
          <div className="flex gap-6 text-white/30 text-[11px] uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/explore" className="hover:text-white/60 transition-colors">Services</Link>
            <Link href="/explore" className="hover:text-white/60 transition-colors">Roster</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
