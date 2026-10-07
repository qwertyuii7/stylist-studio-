// src/components/stylist/BookingCalendar.tsx
"use client";

import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  Sparkles,
  Tag,
  ArrowRight,
} from "lucide-react";
import { reserveBookingSlot } from "@/actions/booking";
import CheckoutFlow from "@/components/payment/CheckoutFlow";

export interface BookingSlotItem {
  id: string;
  serviceTitle: string;
  startTime: Date | string;
  endTime: Date | string;
  priceAmount: number;
  mode?: string;
  status?: string;
}

export interface OfferItem {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  description: string;
}

export default function BookingCalendar({
  stylistId,
  stylistName,
  initialSlots = [],
  promotionalOffers = [],
  userId,
}: {
  stylistId: string;
  stylistName: string;
  initialSlots?: BookingSlotItem[];
  promotionalOffers?: OfferItem[];
  userId?: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<BookingSlotItem | null>(null);
  const [bookingMode, setBookingMode] = useState<"video" | "in-person">("video");
  const [appliedOffer, setAppliedOffer] = useState<OfferItem | null>(null);
  const [notes, setNotes] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);

  // Generate next 14 calendar days for quick horizontal selection
  const days = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  // Fallback realistic time slots for the selected date if initialSlots is empty
  const defaultTimes = [
    { time: "10:00 AM", duration: "60 min", price: 1499 },
    { time: "12:00 PM", duration: "60 min", price: 1499 },
    { time: "03:00 PM", duration: "90 min", price: 2499 },
    { time: "05:30 PM", duration: "60 min", price: 1499 },
    { time: "07:00 PM", duration: "120 min", price: 3499 },
  ];

  const slotsForSelectedDate = initialSlots.filter((slot) =>
    isSameDay(new Date(slot.startTime), selectedDate)
  );

  const displayedSlots =
    slotsForSelectedDate.length > 0
      ? slotsForSelectedDate
      : defaultTimes.map((t, idx) => ({
          id: `virtual-slot-${format(selectedDate, "yyyy-MM-dd")}-${idx}`,
          serviceTitle: "Personal Styling Session",
          startTime: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            10 + idx * 2,
            0
          ),
          endTime: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            11 + idx * 2,
            0
          ),
          priceAmount: t.price,
          mode: bookingMode,
        }));

  // Calculate pricing with applied discounts in INR (₹)
  const basePrice = selectedSlot ? selectedSlot.priceAmount : 1499;
  const discountAmount = appliedOffer
    ? Math.round((basePrice * appliedOffer.discountPercent) / 100)
    : 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-1">
            <CalendarIcon size={14} /> Schedule an Appointment
          </div>
          <h3 className="font-serif text-2xl text-foreground">
            Book a Session with {stylistName}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Select an available time slot and consultation mode.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-surface-muted p-1 rounded-2xl self-start">
          <button
            onClick={() => setBookingMode("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              bookingMode === "video"
                ? "bg-accent text-white shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            <Video size={14} /> Video Call
          </button>
          <button
            onClick={() => setBookingMode("in-person")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              bookingMode === "in-person"
                ? "bg-accent text-white shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            <MapPin size={14} /> In-Person
          </button>
        </div>
      </div>

      {bookingCompleted ? (
        <div className="py-12 text-center animate-fade-in">
          <div className="w-16 h-16 bg-success-light text-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h4 className="font-serif text-2xl text-foreground mb-2">
            Session Confirmed! 🎉
          </h4>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
            Your booking with {stylistName} on{" "}
            <span className="font-semibold text-foreground">
              {format(selectedDate, "MMMM d, yyyy")}
            </span>{" "}
            has been successfully scheduled.
          </p>
          <button
            onClick={() => {
              setBookingCompleted(false);
              setSelectedSlot(null);
            }}
            className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Book Another Slot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Left Column: Date & Slot Picker */}
          <div className="lg:col-span-7 space-y-6">
            {/* Horizontal Date Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-3">
                1. Select Date
              </label>
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {days.map((d, index) => {
                  const isSelected = isSameDay(d, selectedDate);
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(d);
                        setSelectedSlot(null);
                      }}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-3.5 px-2 rounded-2xl border transition-all ${
                        isSelected
                          ? "border-accent bg-accent text-white shadow-md scale-105"
                          : "border-border bg-white text-text-secondary hover:border-accent/40"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-semibold uppercase ${
                          isSelected ? "text-white/80" : "text-text-muted"
                        }`}
                      >
                        {format(d, "EEE")}
                      </span>
                      <span className="text-lg font-bold my-0.5">
                        {format(d, "d")}
                      </span>
                      <span
                        className={`text-[9px] ${
                          isSelected ? "text-white/70" : "text-text-muted"
                        }`}
                      >
                        {format(d, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-3 flex items-center justify-between">
                <span>
                  2. Select Time ({format(selectedDate, "EEEE, MMM d")})
                </span>
                <span className="text-accent text-[11px] font-medium lowercase">
                  all times in IST (UTC+5:30)
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {displayedSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const timeLabel = format(new Date(slot.startTime), "h:mm a");

                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? "border-accent bg-accent-light/40 ring-2 ring-accent shadow-sm"
                          : "border-border bg-white hover:border-accent/40 hover:bg-surface-muted"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <Clock size={13} className="text-accent" />
                        {timeLabel}
                      </div>
                      <div className="text-[11px] text-text-muted mt-1">
                        {slot.serviceTitle}
                      </div>
                      <div className="text-xs font-semibold text-accent mt-2">
                        ₹{slot.priceAmount.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests / Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-2">
                3. Notes for the Stylist (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention specific outfits, occasions, or preferences..."
                className="w-full border border-border rounded-xl p-3 text-xs focus:outline-none focus:border-accent bg-white resize-none"
              />
            </div>
          </div>

          {/* Right Column: Summary & Payment */}
          <div className="lg:col-span-5 bg-surface-muted border border-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={16} className="text-accent" /> Booking Summary
              </h4>

              <div className="bg-white border border-border rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Stylist:</span>
                  <span className="font-semibold text-foreground">
                    {stylistName}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Date:</span>
                  <span className="font-semibold text-foreground">
                    {format(selectedDate, "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Time:</span>
                  <span className="font-semibold text-foreground">
                    {selectedSlot
                      ? format(new Date(selectedSlot.startTime), "h:mm a")
                      : "Not selected yet"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Mode:</span>
                  <span className="font-semibold text-foreground capitalize">
                    {bookingMode === "video" ? "📹 Video Call" : "📍 In-Person"}
                  </span>
                </div>
              </div>

              {/* Promotional / Festive Offers */}
              {promotionalOffers.length > 0 && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-text-muted mb-2 flex items-center gap-1">
                    <Tag size={12} className="text-accent" /> Available Festive
                    Offers
                  </label>
                  <div className="space-y-2">
                    {promotionalOffers.map((offer) => {
                      const isApplied = appliedOffer?.id === offer.id;
                      return (
                        <div
                          key={offer.id}
                          onClick={() =>
                            setAppliedOffer(isApplied ? null : offer)
                          }
                          className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                            isApplied
                              ? "border-accent bg-accent-light text-accent font-semibold"
                              : "border-dashed border-accent/40 bg-white hover:bg-accent-light/30"
                          }`}
                        >
                          <div>
                            <span className="font-bold">{offer.code}</span> (
                            {offer.discountPercent}% OFF)
                            <p className="text-[10px] text-text-secondary font-normal">
                              {offer.title}
                            </p>
                          </div>
                          <span className="text-[11px] underline">
                            {isApplied ? "Remove" : "Apply"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-border space-y-2 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Session Fee</span>
                  <span>₹{basePrice.toLocaleString()}</span>
                </div>
                {appliedOffer && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Discount ({appliedOffer.code})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border-light">
                  <span>Total Amount</span>
                  <span>₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              {selectedSlot ? (
                <CheckoutFlow
                  amount={finalPrice}
                  planId={`booking_${selectedSlot.id}`}
                  stylistId={stylistId}
                  userId={userId || "guest_user"}
                  buttonText={`Pay ₹${finalPrice.toLocaleString()} & Book Slot`}
                  onSuccess={() => setBookingCompleted(true)}
                />
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-surface-muted text-text-muted border border-border text-xs font-semibold cursor-not-allowed text-center"
                >
                  Select a time slot to continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
