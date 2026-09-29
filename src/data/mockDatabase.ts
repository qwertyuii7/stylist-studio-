export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
}

export interface StylistService {
  serviceId: string;
  customPrice?: number;
}

export interface Stylist {
  id: string;
  name: string;
  bio: string;
  genderSpecialty: 'women' | 'men' | 'unisex';
  destinations: string[];
  keywords: string[];
  services: StylistService[];
  imageUrl: string;
  portfolioImages: string[];
  rating: number;
  reviewCount: number;
}

export const coreServices: Service[] = [
  {
    id: "s1",
    title: "Personal Styling",
    description: "One-on-one styling to revamp your everyday look.",
    basePrice: 150,
  },
  {
    id: "s2",
    title: "Wardrobe Styling",
    description: "A complete audit and reorganization of your closet.",
    basePrice: 250,
  },
  {
    id: "s3",
    title: "Travel Wardrobe",
    description: "Curated packing lists and outfits for your next destination.",
    basePrice: 180,
  },
  {
    id: "s4",
    title: "Image Consulting",
    description: "Strategic advice on color palettes, silhouettes, and personal brand.",
    basePrice: 300,
  },
  {
    id: "s5",
    title: "Personal Shopper",
    description: "Guided shopping experiences or done-for-you purchasing.",
    basePrice: 200,
  },
  {
    id: "s6",
    title: "Closet Organization",
    description: "Decluttering and organizing your space for maximum efficiency.",
    basePrice: 150,
  }
];

export const mockStylists: Stylist[] = [
  {
    id: "sty-1",
    name: "Elena Rodriguez",
    bio: "Elena specializes in chic, modern female wardrobes. With a background in editorial fashion, she helps women build versatile, travel-ready capsule collections.",
    genderSpecialty: "women",
    destinations: ["Paris", "New York", "Milan"],
    keywords: ["chic", "female wardrobe", "capsule", "travel", "editorial"],
    services: [
      { serviceId: "s1", customPrice: 160 },
      { serviceId: "s3" },
      { serviceId: "s5", customPrice: 220 }
    ],
    imageUrl: "/stylist_1.jpg",
    portfolioImages: ["/service_wardrobe.jpg", "/service_travel.jpg", "/stylist_2.jpg"],
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: "sty-2",
    name: "Marcus Chen",
    bio: "Marcus brings a sharp, tailored approach to menswear. Perfect for executives and professionals looking to elevate their daily image.",
    genderSpecialty: "men",
    destinations: ["London", "Tokyo"],
    keywords: ["tailoring", "menswear", "executive", "suits", "sharp"],
    services: [
      { serviceId: "s1" },
      { serviceId: "s4", customPrice: 350 },
      { serviceId: "s5" }
    ],
    imageUrl: "/stylist_2.jpg",
    portfolioImages: ["/service_consulting.jpg", "/hero.jpg"],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: "sty-3",
    name: "Sophia Rossi",
    bio: "From maximalist events to minimalist daily wear, Sophia is a versatile image consultant who helps you express your true self.",
    genderSpecialty: "unisex",
    destinations: ["Los Angeles", "Miami"],
    keywords: ["versatile", "events", "minimalist", "maximalist", "creative"],
    services: [
      { serviceId: "s1" },
      { serviceId: "s2" },
      { serviceId: "s4" },
      { serviceId: "s6" }
    ],
    imageUrl: "/service_wardrobe.jpg",
    portfolioImages: ["/service_shopping.jpg", "/service_travel.jpg"],
    rating: 4.7,
    reviewCount: 201
  },
  {
    id: "sty-4",
    name: "Chloe Bennett",
    bio: "Chloe is the queen of the 'travel wardrobe'. She ensures you look flawless on your vacations, curating outfits for specific climates and cultures.",
    genderSpecialty: "women",
    destinations: ["Bali", "Amalfi Coast", "Maldives"],
    keywords: ["travel wardrobe", "vacation", "resort wear", "summer"],
    services: [
      { serviceId: "s3", customPrice: 200 },
      { serviceId: "s5" }
    ],
    imageUrl: "/service_travel.jpg",
    portfolioImages: ["/hero.jpg", "/stylist_1.jpg"],
    rating: 5.0,
    reviewCount: 56
  }
];
