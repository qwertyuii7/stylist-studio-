import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Stylist, coreServices } from "@/data/mockDatabase";

interface StylistCardProps {
  stylist: Stylist;
}

export default function StylistCard({ stylist }: StylistCardProps) {
  const startingPrice = Math.min(
    ...stylist.services.map((s) => {
      if (s.customPrice) return s.customPrice;
      const base = coreServices.find(cs => cs.id === s.serviceId);
      return base?.basePrice || 1499;
    })
  );

  return (
    <Link href={`/stylist/${stylist.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl transition-all card-hover">
      <div className="relative aspect-[4/3] w-full bg-surface-muted overflow-hidden">
        <Image 
          src={stylist.imageUrl} 
          alt={stylist.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold text-foreground flex items-center gap-1">
            <CheckCircle2 size={12} className="text-success" /> Verified
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <Star size={12} className="fill-white" /> {stylist.rating}
          </span>
        </div>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-base text-foreground group-hover:text-accent transition-colors">{stylist.name}</h3>
            <p className="text-xs text-text-muted mt-0.5">{stylist.experience} experience</p>
          </div>
          <span className="text-xs text-text-muted bg-surface-muted px-2 py-0.5 rounded-full capitalize">{stylist.genderSpecialty}</span>
        </div>
        
        <p className="text-text-secondary text-sm line-clamp-2 mb-3 leading-relaxed">
          {stylist.tagline}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stylist.keywords.slice(0, 3).map((kw) => (
            <span key={kw} className="bg-surface-muted text-text-secondary px-2.5 py-1 rounded-full text-[10px] font-medium capitalize">
              {kw}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-text-muted mb-4 pt-3 border-t border-border-light">
          <div className="flex items-center gap-1">
            <MapPin size={13} />
            <span className="truncate">{stylist.destinations.slice(0, 2).join(', ')}</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span>{stylist.reviewCount} reviews</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-text-muted">From </span>
            <span className="font-semibold text-foreground">₹{startingPrice.toLocaleString()}</span>
          </div>
          <span className="text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}
