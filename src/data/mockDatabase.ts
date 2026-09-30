export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  duration: string;
  icon: string;
}

export interface StylistService {
  serviceId: string;
  customPrice?: number;
}

export interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  tagline: string;
  genderSpecialty: 'women' | 'men' | 'unisex';
  destinations: string[];
  keywords: string[];
  services: StylistService[];
  imageUrl: string;
  portfolioImages: string[];
  rating: number;
  reviewCount: number;
  experience: string;
  languages: string[];
  availability: string;
  reviews: Review[];
}

export const coreServices: Service[] = [
  {
    id: "s1",
    title: "Personal Styling",
    description: "One-on-one styling session to revamp your everyday look with outfits that match your personality.",
    basePrice: 1499,
    duration: "60 min",
    icon: "✨",
  },
  {
    id: "s2",
    title: "Wardrobe Makeover",
    description: "Complete audit and reorganization of your wardrobe. Keep what works, upgrade what doesn't.",
    basePrice: 2999,
    duration: "90 min",
    icon: "👗",
  },
  {
    id: "s3",
    title: "Wedding & Event Styling",
    description: "Look your absolute best for weddings, sangeet, mehendi, receptions and special occasions.",
    basePrice: 3999,
    duration: "120 min",
    icon: "💍",
  },
  {
    id: "s4",
    title: "Image Consulting",
    description: "Strategic advice on colors, silhouettes, and personal branding for professionals.",
    basePrice: 2499,
    duration: "75 min",
    icon: "🎯",
  },
  {
    id: "s5",
    title: "Personal Shopping",
    description: "Your stylist shops with you or for you — online or in-store, within your budget.",
    basePrice: 1999,
    duration: "120 min",
    icon: "🛍️",
  },
  {
    id: "s6",
    title: "Festive & Traditional Styling",
    description: "Perfect styling for Diwali, Navratri, Eid, Pongal and all festive celebrations.",
    basePrice: 2499,
    duration: "90 min",
    icon: "🪔",
  },
];

export const mockStylists: Stylist[] = [
  {
    id: "sty-1",
    name: "Priya Sharma",
    bio: "Celebrity stylist with 8+ years of experience in Bollywood and fashion editorial. Specializes in blending traditional Indian elegance with contemporary global trends. Has styled for major fashion weeks and leading magazines.",
    tagline: "Where tradition meets modern elegance",
    genderSpecialty: "women",
    destinations: ["Mumbai", "Delhi", "Jaipur"],
    keywords: ["bridal", "indo-western", "bollywood", "festive", "editorial"],
    services: [
      { serviceId: "s1", customPrice: 1999 },
      { serviceId: "s3", customPrice: 4999 },
      { serviceId: "s5", customPrice: 2499 },
      { serviceId: "s6", customPrice: 2999 },
    ],
    imageUrl: "/stylist_1.jpg",
    portfolioImages: ["/service_wardrobe.jpg", "/service_travel.jpg", "/stylist_2.jpg"],
    rating: 4.9,
    reviewCount: 248,
    experience: "8+ years",
    languages: ["Hindi", "English", "Marathi"],
    availability: "Mon-Sat, 10AM-7PM",
    reviews: [
      {
        id: "r1",
        clientName: "Ananya K.",
        clientAvatar: "https://i.pravatar.cc/150?u=ananya",
        rating: 5,
        comment: "Priya styled me for my sister's wedding and I received so many compliments! She understood exactly what I wanted.",
        date: "2026-09-15",
        service: "Wedding & Event Styling"
      },
      {
        id: "r2",
        clientName: "Meera R.",
        clientAvatar: "https://i.pravatar.cc/150?u=meera",
        rating: 5,
        comment: "Best wardrobe consultation ever! She helped me build a capsule wardrobe that actually works for Indian weather.",
        date: "2026-08-22",
        service: "Personal Styling"
      },
    ],
  },
  {
    id: "sty-2",
    name: "Arjun Kapoor",
    bio: "Former fashion editor turned personal stylist specializing in men's grooming and power dressing. Expert in corporate styling, casual smart looks, and Indo-western fusion for the modern Indian man.",
    tagline: "Dress sharp, feel powerful",
    genderSpecialty: "men",
    destinations: ["Bangalore", "Hyderabad", "Chennai"],
    keywords: ["menswear", "corporate", "grooming", "smart casual", "power dressing"],
    services: [
      { serviceId: "s1", customPrice: 1799 },
      { serviceId: "s4", customPrice: 2999 },
      { serviceId: "s5", customPrice: 2299 },
    ],
    imageUrl: "/stylist_2.jpg",
    portfolioImages: ["/service_consulting.jpg", "/hero.jpg"],
    rating: 4.8,
    reviewCount: 156,
    experience: "6+ years",
    languages: ["Hindi", "English", "Kannada"],
    availability: "Mon-Fri, 11AM-8PM",
    reviews: [
      {
        id: "r3",
        clientName: "Rahul S.",
        clientAvatar: "https://i.pravatar.cc/150?u=rahul",
        rating: 5,
        comment: "Arjun completely transformed my work wardrobe. I feel more confident in meetings now!",
        date: "2026-09-10",
        service: "Image Consulting"
      },
    ],
  },
  {
    id: "sty-3",
    name: "Nisha Patel",
    bio: "Versatile stylist who creates looks for every occasion — from casual brunches to extravagant celebrations. Known for budget-friendly styling that never compromises on style. Believes fashion should be fun and accessible.",
    tagline: "Style for every story, every budget",
    genderSpecialty: "unisex",
    destinations: ["Ahmedabad", "Pune", "Mumbai"],
    keywords: ["budget-friendly", "versatile", "casual", "festive", "trendy"],
    services: [
      { serviceId: "s1" },
      { serviceId: "s2" },
      { serviceId: "s4" },
      { serviceId: "s6" },
    ],
    imageUrl: "/service_wardrobe.jpg",
    portfolioImages: ["/service_shopping.jpg", "/service_travel.jpg"],
    rating: 4.7,
    reviewCount: 312,
    experience: "5+ years",
    languages: ["Hindi", "English", "Gujarati"],
    availability: "All days, 9AM-9PM",
    reviews: [
      {
        id: "r4",
        clientName: "Kavya M.",
        clientAvatar: "https://i.pravatar.cc/150?u=kavya",
        rating: 5,
        comment: "Nisha is amazing! She styled me within my budget and I looked fabulous at the Navratri celebration.",
        date: "2026-09-20",
        service: "Festive & Traditional Styling"
      },
    ],
  },
  {
    id: "sty-4",
    name: "Ritika Menon",
    bio: "Bridal and wedding specialist with deep expertise in South Indian, North Indian, and fusion bridal looks. Has styled 500+ brides. Expert in saree draping, lehenga styling, and complete bridal makeover coordination.",
    tagline: "Making every bride the star of her story",
    genderSpecialty: "women",
    destinations: ["Kochi", "Delhi", "Udaipur"],
    keywords: ["bridal", "wedding", "saree", "lehenga", "traditional"],
    services: [
      { serviceId: "s3", customPrice: 5999 },
      { serviceId: "s6", customPrice: 3499 },
      { serviceId: "s5", customPrice: 2999 },
    ],
    imageUrl: "/service_travel.jpg",
    portfolioImages: ["/hero.jpg", "/stylist_1.jpg"],
    rating: 4.9,
    reviewCount: 189,
    experience: "10+ years",
    languages: ["Hindi", "English", "Malayalam", "Tamil"],
    availability: "By appointment",
    reviews: [
      {
        id: "r5",
        clientName: "Deepa N.",
        clientAvatar: "https://i.pravatar.cc/150?u=deepa",
        rating: 5,
        comment: "Ritika made my wedding day truly magical. Every outfit change was perfect and she managed everything seamlessly!",
        date: "2026-08-30",
        service: "Wedding & Event Styling"
      },
    ],
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Sneha Iyer",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/150?u=sneha",
    comment: "I was clueless about what to wear for my office presentations. My stylist on Stylist Studio helped me build a professional wardrobe that I absolutely love!",
    rating: 5,
    service: "Image Consulting",
  },
  {
    id: "t2",
    name: "Vikram Joshi",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    comment: "Got styled for my best friend's wedding. The outfit recommendations were perfect for each ceremony. Worth every rupee!",
    rating: 5,
    service: "Wedding Styling",
  },
  {
    id: "t3",
    name: "Aisha Khan",
    location: "Bangalore",
    avatar: "https://i.pravatar.cc/150?u=aisha",
    comment: "My stylist understood my modest fashion preferences and created beautiful looks that I feel confident in. Highly recommend!",
    rating: 5,
    service: "Personal Styling",
  },
];
