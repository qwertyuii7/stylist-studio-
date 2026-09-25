"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Sparkles, CalendarCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const services = [
  { title: "Personal Styling", img: "/stylist_1.jpg" },
  { title: "Wardrobe Styling", img: "/service_wardrobe.jpg" },
  { title: "Travel Wardrobe", img: "/service_travel.jpg" },
  { title: "Image Consulting", img: "/service_consulting.jpg" },
  { title: "Personal Shopper", img: "/service_shopping.jpg" },
  { title: "Closet Organization", img: "/service_wardrobe.jpg" },
];

const stats = [
  { icon: Star, value: "150+", label: "Expert Stylists" },
  { icon: Sparkles, value: "10K+", label: "Looks Curated" },
  { icon: CalendarCheck, value: "24hr", label: "Avg. Turnaround" },
  { icon: ShieldCheck, value: "100%", label: "Satisfaction" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO ─── */}
        <section className="relative h-[92vh] min-h-[520px] max-h-[860px] flex items-center overflow-hidden bg-[#111]">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src="/hero.jpg" alt="Fashion editorial" fill className="object-cover" priority />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
            <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
              <motion.p variants={fade} className="text-white/60 text-sm uppercase tracking-[0.2em] mb-4">
                Personal Styling Platform
              </motion.p>
              <motion.h1 variants={fade} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Your Wardrobe,
                <br />
                Reimagined.
              </motion.h1>
              <motion.p variants={fade} className="text-white/70 text-base md:text-lg max-w-md mb-10 leading-relaxed">
                Connect with expert stylists for personal styling, wardrobe audits, travel packing, and luxury shopping — all in one platform.
              </motion.p>
              <motion.div variants={fade} className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-gray-100 transition-colors"
                >
                  Book a Stylist <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-white/10 transition-colors"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="bg-white border-b border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F3F0] flex items-center justify-center shrink-0">
                  <s.icon size={18} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <div className="text-xl font-semibold leading-tight">{s.value}</div>
                  <div className="text-xs text-[#999] uppercase tracking-[0.1em]">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fade}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#999] mb-2">What We Offer</p>
              <h2 className="font-serif text-3xl md:text-4xl">Our Services</h2>
            </div>
            <Link
              href="/services"
              className="group text-[13px] uppercase tracking-[0.1em] font-medium text-[#1A1A1A] flex items-center gap-2"
            >
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {services.map((s, i) => (
              <motion.div key={i} variants={fade}>
                <Link href="/services" className="group block relative aspect-[4/5] overflow-hidden bg-[#E8E8E8]">
                  <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white font-serif text-lg md:text-xl">{s.title}</h3>
                    <span className="text-white/60 text-xs uppercase tracking-[0.1em] flex items-center gap-1 mt-1 group-hover:text-white/90 transition-colors">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="bg-[#F5F3F0] py-20 md:py-28 px-5 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-[#999] mb-2">Simple & Seamless</p>
              <h2 className="font-serif text-3xl md:text-4xl">How It Works</h2>
            </motion.div>
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
              {[
                { step: "01", title: "Tell Us About You", desc: "Complete a quick intake — your occasion, style preferences, and budget comfort." },
                { step: "02", title: "Get Matched", desc: "We pair you with the right stylist from our curated roster based on your needs." },
                { step: "03", title: "Get Styled", desc: "Receive personalized recommendations via WhatsApp. Book recurring sessions to save time." },
              ].map((item, i) => (
                <motion.div key={i} variants={fade} className="bg-white p-8 md:p-10 border border-[#E8E8E8]">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#BBB] font-medium">{item.step}</span>
                  <h3 className="font-serif text-xl mt-3 mb-3">{item.title}</h3>
                  <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mt-12">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors"
              >
                Start Your Journey <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── SIGNATURE COLLECTION TEASER ─── */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] relative overflow-hidden bg-[#E8E8E8]"
            >
              <Image src="/stylist_2.jpg" alt="Signature Collection" fill className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#999] mb-2">Exclusive Tier</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-snug">The Signature Collection</h2>
              <p className="text-[#777] leading-relaxed mb-8 max-w-md">
                Access our top-tier network of celebrity stylists and influencers. Magazine-featured curators who shape personal brands at the highest level.
              </p>
              <Link
                href="/signature"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors"
              >
                Enter Collection <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── SUBSCRIPTION CTA ─── */}
        <section className="bg-[#1A1A1A] text-white py-20 md:py-24 px-5 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Recurring Styling</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-snug">Plan Your Week, <br className="hidden md:block" /> Every Week.</h2>
              <p className="text-white/50 leading-relaxed max-w-md mb-8">
                Subscribe to periodic bookings — a Personal Shopper booked every Friday, or a full weekly wardrobe plan every Sunday. Reduced stress, cost savings, and more calm.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-gray-200 transition-colors"
              >
                Book Recurring <ArrowRight size={16} />
              </Link>
            </div>
            <div className="aspect-[4/3] relative overflow-hidden bg-[#333]">
              <Image src="/service_consulting.jpg" alt="Recurring Styling" fill className="object-cover opacity-80" />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
