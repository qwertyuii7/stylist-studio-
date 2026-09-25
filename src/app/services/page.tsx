"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const services = [
  { title: "Personal Styling", desc: "Occasion-specific outfit curation for weddings, parties, dates, and everyday life. Receive a personalized lookbook tailored to your body type, skin tone, and lifestyle.", img: "/stylist_1.jpg" },
  { title: "Wardrobe Styling", desc: "A full audit of your existing wardrobe. We identify key gaps, build new outfit combinations, and create a shopping list for missing staple pieces.", img: "/service_wardrobe.jpg" },
  { title: "Travel Wardrobe Planning", desc: "Destination-specific capsule packing plans. Climate-appropriate sets, luggage optimization, and versatile outfits that mix and match across your trip.", img: "/service_travel.jpg" },
  { title: "Image Consulting", desc: "Elevate your executive presence with corporate dress code guidelines, color analysis, and personal branding strategy that aligns with your professional goals.", img: "/service_consulting.jpg" },
  { title: "Personal Shopper", desc: "Direct e-commerce shopping links, boutique store curation, and luxury designer purchasing guidance. We shop so you don't have to.", img: "/service_shopping.jpg" },
  { title: "Closet Organization", desc: "Virtual decluttering guidance, categorization strategies, seasonal rotation plans, and layout recommendations to keep your closet functional and beautiful.", img: "/service_wardrobe.jpg" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-12 border-b border-[#E8E8E8]">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999] mb-2">What We Offer</p>
            <h1 className="font-serif text-3xl md:text-5xl mb-4">Our Services</h1>
            <p className="text-[#777] max-w-lg leading-relaxed">
              Comprehensive styling services designed to elevate your aesthetic, optimize your time, and refine your personal brand.
            </p>
          </motion.div>
        </section>

        {/* Service List */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16 space-y-16 md:space-y-24">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fade}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#E8E8E8]" style={{ direction: 'ltr' }}>
                <Image src={s.img} alt={s.title} fill className="object-cover" />
              </div>
              <div style={{ direction: 'ltr' }}>
                <span className="text-xs text-[#BBB] uppercase tracking-[0.2em] font-medium">0{i + 1}</span>
                <h2 className="font-serif text-2xl md:text-3xl mt-2 mb-4">{s.title}</h2>
                <p className="text-[#777] text-sm md:text-base leading-relaxed mb-8 max-w-md">{s.desc}</p>
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors"
                >
                  Select Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
