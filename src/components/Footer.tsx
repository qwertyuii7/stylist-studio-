import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16 border-b border-white/10">
        <div className="max-w-xl">
          <h3 className="font-serif text-2xl md:text-3xl mb-3">Stay Stylish</h3>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            Get styling tips, seasonal fashion advice, and exclusive offers straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/15 text-white placeholder:text-white/40 px-4 py-3 rounded-xl text-sm outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-serif text-lg tracking-tight font-semibold">
                Stylist<span className="text-accent">Studio</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              India's trusted platform for personal styling. Connect with verified stylists for every occasion.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/60 mb-5">For Clients</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/explore" className="hover:text-white transition-colors">Find Stylists</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
              <li><Link href="/auth?mode=signup" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/customer-dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/60 mb-5">For Stylists</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/auth?mode=signup" className="hover:text-white transition-colors">Join as Stylist</Link></li>
              <li><Link href="/stylist-portal" className="hover:text-white transition-colors">Stylist Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/60 mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <div className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} Stylist Studio. Made with <Heart size={12} className="text-accent fill-accent inline" /> in India.
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
