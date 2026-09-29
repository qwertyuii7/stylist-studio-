"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StylistCard from "@/components/StylistCard";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");

  const filteredStylists = useMemo(() => {
    return mockStylists.filter((stylist) => {
      // Keyword search
      const matchesSearch = 
        searchTerm === "" || 
        stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())) ||
        stylist.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filters
      const matchesGender = selectedGender === "all" || stylist.genderSpecialty === selectedGender;
      
      const matchesService = 
        selectedService === "all" || 
        stylist.services.some(s => s.serviceId === selectedService);

      return matchesSearch && matchesGender && matchesService;
    });
  }, [searchTerm, selectedGender, selectedService]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-2">Explore Stylists</h1>
            <p className="text-text-secondary max-w-md">Find the perfect curator for your next event, trip, or daily wardrobe refresh.</p>
          </div>
          
          {/* Quick Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-accent w-[200px]"
              />
            </div>
            
            <div className="relative shrink-0">
              <select 
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                <option value="all">All Genders</option>
                <option value="women">Women Only</option>
                <option value="men">Men Only</option>
                <option value="unisex">Unisex</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>

            <div className="relative shrink-0">
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer max-w-[200px] truncate"
              >
                <option value="all">All Services</option>
                {coreServices.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredStylists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStylists.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-surface-muted rounded-2xl border border-border border-dashed">
            <h3 className="font-serif text-2xl mb-2">No stylists found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search term to discover more curators.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedGender("all"); setSelectedService("all"); }}
              className="mt-6 px-6 py-2 bg-white border border-border rounded-full text-sm font-bold uppercase tracking-wider hover:text-accent"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
