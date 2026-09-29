import Link from "next/link";
import { CheckCircle2, MessageCircle, Calendar, User, Clock } from "lucide-react";

export default function ConfirmationPage() {
  // In a real app, this would come from URL params or state management
  const bookingData = {
    reference: "STYL-" + Math.floor(1000 + Math.random() * 9000),
    stylistName: "Elena Rodriguez",
    date: "Oct 12, 2026",
    time: "Afternoon (1:00 PM - 4:00 PM)",
    service: "Wardrobe Styling",
    whatsappNumber: "1234567890",
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I have booked a Personal Styling session (Ref: ${bookingData.reference}). Here are my style preferences...`
  );
  const whatsappUrl = `https://wa.me/${bookingData.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-5">
      <div className="max-w-xl w-full bg-white border border-border shadow-sm p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-600 w-20 h-20" />
        </div>
        
        <h1 className="font-serif text-3xl text-foreground mb-2 tracking-tight">Booking Confirmed</h1>
        <p className="text-text-dark-muted mb-8">Thank you! Your stylist is looking forward to your session.</p>

        <div className="bg-surface-muted border border-border p-6 rounded text-left mb-8 space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <span className="text-text-dark-muted text-sm">Reference ID</span>
            <span className="font-medium text-foreground">{bookingData.reference}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-dark-hover">
            <User size={18} className="text-text-dark-muted" />
            <span>Stylist: <strong>{bookingData.stylistName}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-dark-hover">
            <Calendar size={18} className="text-text-dark-muted" />
            <span>Date: <strong>{bookingData.date}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-dark-hover">
            <Clock size={18} className="text-text-dark-muted" />
            <span>Time: <strong>{bookingData.time}</strong></span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-4 rounded font-medium hover:bg-green-700 transition-colors mb-8 shadow-sm"
        >
          <MessageCircle size={22} />
          Connect on WhatsApp Now
        </a>

        <div className="text-left border-t border-border pt-8">
          <h3 className="font-semibold text-foreground mb-3 text-lg">Next Steps & What to Prepare</h3>
          <ul className="list-disc pl-5 text-sm text-text-dark-muted space-y-2">
            <li>Connect with your stylist on WhatsApp to kick off the styling process.</li>
            <li>Take 2-3 full-length photos in good lighting for body shape assessment.</li>
            <li>Prepare a list of your upcoming occasions or wardrobe goals.</li>
            <li>Create a Pinterest board (optional) with your style inspirations.</li>
          </ul>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/" className="text-sm text-text-dark-muted hover:text-foreground transition-colors underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
