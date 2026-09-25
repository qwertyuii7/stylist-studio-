"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canProceedStep1 = name.trim() && phone.trim();
  const canProceedStep2 = occasion && budget;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h1 className="font-serif text-3xl mb-3">Booking Confirmed</h1>
            <p className="text-[#777] text-sm leading-relaxed mb-8">
              Your intake details have been received. You will get a WhatsApp message shortly to finalize your styling session.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-7 py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-5">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step >= s ? 'bg-[#1A1A1A] text-white' : 'bg-[#E8E8E8] text-[#999]'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-px transition-colors ${step > s ? 'bg-[#1A1A1A]' : 'bg-[#E8E8E8]'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="font-serif text-2xl mb-1">Your Details</h2>
                <p className="text-[#999] text-sm mb-8">We'll use this to connect you with your stylist.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#999] mb-2">Full Name</label>
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#999] mb-2">WhatsApp Number</label>
                    <input
                      type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full border border-[#E8E8E8] bg-white px-4 py-3 text-sm outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full mt-10 bg-[#1A1A1A] text-white py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="font-serif text-2xl mb-1">Style Preferences</h2>
                <p className="text-[#999] text-sm mb-8">This helps us match you with the right stylist.</p>
                <div className="space-y-8">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#999] mb-4">Primary Occasion</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Everyday Casual", "Corporate", "Event / Wedding", "Travel"].map((opt) => (
                        <button
                          key={opt} type="button" onClick={() => setOccasion(opt)}
                          className={`border px-4 py-3 text-sm text-left transition-all ${
                            occasion === opt
                              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                              : 'border-[#E8E8E8] bg-white text-[#555] hover:border-[#CCC]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#999] mb-4">Budget Comfort</label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { label: "₹1,000 – ₹3,000", sub: "Emerging talent" },
                        { label: "₹3,500 – ₹6,000", sub: "Established stylists" },
                        { label: "₹10,000+", sub: "Signature collection" },
                      ].map((opt) => (
                        <button
                          key={opt.label} type="button" onClick={() => setBudget(opt.label)}
                          className={`border px-4 py-3 text-left transition-all flex justify-between items-center ${
                            budget === opt.label
                              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                              : 'border-[#E8E8E8] bg-white text-[#555] hover:border-[#CCC]'
                          }`}
                        >
                          <span className="text-sm font-medium">{opt.label}</span>
                          <span className={`text-xs ${budget === opt.label ? 'text-white/60' : 'text-[#BBB]'}`}>{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-10">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#E8E8E8] py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#F5F5F5] transition-colors">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex-1 bg-[#1A1A1A] text-white py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="font-serif text-2xl mb-1">Confirm Booking</h2>
                <p className="text-[#999] text-sm mb-8">Review your details before proceeding to payment.</p>

                <div className="bg-white border border-[#E8E8E8] divide-y divide-[#F0F0F0]">
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#999]">Name</span>
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#999]">WhatsApp</span>
                    <span className="text-sm font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#999]">Occasion</span>
                    <span className="text-sm font-medium">{occasion}</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-xs uppercase tracking-[0.1em] text-[#999]">Budget</span>
                    <span className="text-sm font-medium">{budget}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-10">
                  <button onClick={() => setStep(2)} className="flex-1 border border-[#E8E8E8] py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#F5F5F5] transition-colors">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-[#1A1A1A] text-white py-3.5 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Processing..." : "Confirm & Pay"} {!isSubmitting && <ArrowRight size={16} />}
                  </button>
                </div>
                <p className="text-center text-[11px] text-[#BBB] mt-6 uppercase tracking-[0.1em]">
                  Payments securely processed via Razorpay
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
