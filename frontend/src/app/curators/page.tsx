"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const curators = [
  { name: "Elena Rostova", specialty: "Event & Corporate", rate: "₹3,500", img: "/stylist_1.jpg", sessions: "120+", city: "Mumbai" },
  { name: "Julian Vance", specialty: "Casual & Dates", rate: "₹1,500", img: "/stylist_male.jpg", sessions: "45", city: "Delhi" },
  { name: "Sarah Jenkins", specialty: "Weddings & Travel", rate: "₹4,200", img: "/service_consulting.jpg", sessions: "200+", city: "Bangalore" },
  { name: "Marcus Chen", specialty: "Closet Audit & Casual", rate: "₹1,800", img: "/stylist_male.jpg", sessions: "78", city: "Mumbai" },
  { name: "Priya Sharma", specialty: "Executive Presence", rate: "₹3,000", img: "/stylist_1.jpg", sessions: "90+", city: "Hyderabad" },
  { name: "Nina Kapoor", specialty: "Personal Shopper", rate: "₹5,500", img: "/service_consulting.jpg", sessions: "150+", city: "Delhi" },
];

export default function CuratorsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 border-b border-[#E8E8E8]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs uppercase tracking-[0.2em] text-[#999] mb-2">Browse Stylists</motion.p>
            <motion.h1 variants={fade} className="font-serif text-3xl md:text-5xl mb-4">The Roster</motion.h1>
            <motion.p variants={fade} className="text-[#777] max-w-lg leading-relaxed">
              Our curated network of personal stylists. Every curator is vetted for quality and expertise.
            </motion.p>
          </motion.div>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {curators.map((c, i) => (
              <motion.div key={i} variants={fade}>
                <Link href="/book" className="group block bg-white border border-[#E8E8E8] hover:border-[#CCC] transition-colors overflow-hidden">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={c.img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif text-xl mb-0.5">{c.name}</h3>
                        <p className="text-xs text-[#999] uppercase tracking-[0.1em]">{c.specialty}</p>
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap">{c.rate}<span className="text-xs text-[#999] font-normal"> /session</span></span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#999] mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} /> {c.sessions} sessions</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {c.city}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
                      <span className="text-[13px] uppercase tracking-[0.1em] font-medium text-[#1A1A1A] group-hover:text-[#555] transition-colors flex items-center gap-2">
                        Book Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
