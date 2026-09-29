import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 border-b border-dark-hover">
        <div className="max-w-xl">
          <h3 className="font-serif text-2xl md:text-3xl mb-3">Join the Inner Circle</h3>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Curated style edits, seasonal wardrobe advice, and exclusive access to new stylists — delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-sm outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-foreground px-6 py-3 text-[13px] uppercase tracking-[0.1em] font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <div className="font-serif text-xl tracking-tight font-semibold mb-4">CURATE.</div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Redefining personal styling. We connect you with top-tier wardrobe consultants.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">Platform</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Stylists</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
              <li><Link href="/signature" className="hover:text-white transition-colors">Signature Collection</Link></li>
              <li><Link href="/stylist-portal" className="hover:text-white transition-colors">Become a Curator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">Social</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter / X</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-hover py-6 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[11px] uppercase tracking-[0.15em]">
          <div>&copy; {new Date().getFullYear()} Curate Styling Platform. All rights reserved.</div>
          <Link href="/admin" className="hover:text-white transition-colors">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
