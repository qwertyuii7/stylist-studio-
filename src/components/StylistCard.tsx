import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Stylist } from "@/data/mockDatabase";

interface StylistCardProps {
  stylist: Stylist;
}

export default function StylistCard({ stylist }: StylistCardProps) {
  // Determine starting price from their services
  const startingPrice = Math.min(
    ...stylist.services.map((s) => s.customPrice || 150) // Assuming 150 is the lowest base price if missing
  );

  return (
    <Link href={`/stylist/${stylist.id}`} className="group block bg-white rounded-xl overflow-hidden border border-border hover:border-accent hover:shadow-lg transition-all">
      <div className="relative aspect-square w-full bg-surface-muted overflow-hidden">
        <Image 
          src={stylist.imageUrl} 
          alt={stylist.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-foreground">
          {stylist.genderSpecialty}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          {stylist.keywords.slice(0, 2).map((kw) => (
            <span key={kw} className="bg-black/70 backdrop-blur text-white px-2 py-1 rounded text-[10px] uppercase tracking-wider">
              {kw}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-medium text-foreground">{stylist.name}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star size={14} className="fill-accent text-accent" />
            <span>{stylist.rating}</span>
            <span className="text-text-muted text-xs">({stylist.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-text-secondary text-sm line-clamp-2 mb-4 leading-relaxed">
          {stylist.bio}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-text-muted mb-4 border-t border-border-light pt-4">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate">{stylist.destinations.slice(0, 2).join(', ')}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            <span className="text-text-muted">From</span> ${startingPrice}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent group-hover:text-accent-hover">
            View Profile &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
