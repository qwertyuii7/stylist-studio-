"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StylistCard from "@/components/StylistCard";
import { mockStylists, coreServices } from "@/data/mockDatabase";
import { Search, SlidersHorizontal, ChevronDown, MapPin, Star, X } from "lucide-react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const allCities = useMemo(() => {
    const cities = new Set<string>();
    mockStylists.forEach(s => s.destinations.forEach(d => cities.add(d)));
    return Array.from(cities).sort();
  }, []);

  const filteredStylists = useMemo(() => {
    let results = mockStylists.filter((stylist) => {
      const matchesSearch = 
        searchTerm === "" || 
        stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stylist.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())) ||
        stylist.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGender = selectedGender === "all" || stylist.genderSpecialty === selectedGender;
      
      const matchesService = 
        selectedService === "all" || 
        stylist.services.some(s => s.serviceId === selectedService);

      const matchesCity = 
        selectedCity === "all" ||
        stylist.destinations.some(d => d.toLowerCase() === selectedCity.toLowerCase());

      return matchesSearch && matchesGender && matchesService && matchesCity;
    });

    // Sort
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      results.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === "price-low") {
      results.sort((a, b) => {
        const minA = Math.min(...a.services.map(s => s.customPrice || coreServices.find(cs => cs.id === s.serviceId)?.basePrice || 9999));
        const minB = Math.min(...b.services.map(s => s.customPrice || coreServices.find(cs => cs.id === s.serviceId)?.basePrice || 9999));
        return minA - minB;
      });
    }

    return results;
  }, [searchTerm, selectedGender, selectedService, selectedCity, sortBy]);

  const hasActiveFilters = searchTerm || selectedGender !== "all" || selectedService !== "all" || selectedCity !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGender("all");
    setSelectedService("all");
    setSelectedCity("all");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Find Your Stylist</h1>
          <p className="text-text-secondary max-w-lg">Browse verified stylists, check reviews, and book sessions for any occasion.</p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-border rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input 
                type="text" 
                placeholder="Search by name, style, occasion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
            </div>
            
            {/* City */}
            <div className="relative shrink-0">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none pl-9 pr-10 py-3 bg-surface-muted border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
              >
                <option value="all">All Cities</option>
                {allCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>

            {/* Gender */}
            <div className="relative shrink-0">
              <select 
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-surface-muted border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
              >
                <option value="all">All Genders</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="unisex">Unisex</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>

            {/* Service */}
            <div className="relative shrink-0">
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-surface-muted border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer max-w-[200px] truncate"
              >
                <option value="all">All Services</option>
                {coreServices.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-surface-muted border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="price-low">Price: Low to High</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
            </div>
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-light">
              <span className="text-xs font-medium text-text-muted">Filters:</span>
              {searchTerm && (
                <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  "{searchTerm}" <button onClick={() => setSearchTerm("")}><X size={12} /></button>
                </span>
              )}
              {selectedCity !== "all" && (
                <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  {selectedCity} <button onClick={() => setSelectedCity("all")}><X size={12} /></button>
                </span>
              )}
              {selectedGender !== "all" && (
                <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 capitalize">
                  {selectedGender} <button onClick={() => setSelectedGender("all")}><X size={12} /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs font-semibold text-accent hover:underline ml-2">
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-foreground">{filteredStylists.length}</span> stylists found
          </p>
        </div>

        {/* Results Grid */}
        {filteredStylists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStylists.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-border">
            <Search className="text-text-muted mx-auto mb-4" size={32} />
            <h3 className="font-serif text-2xl mb-2">No stylists found</h3>
            <p className="text-text-secondary mb-6 max-w-sm mx-auto">Try adjusting your filters to discover more stylists.</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-hover transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
