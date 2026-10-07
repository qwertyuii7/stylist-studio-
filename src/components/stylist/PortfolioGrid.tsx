// src/components/stylist/PortfolioGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Sparkles, X, Tag } from "lucide-react";

export interface PortfolioItemType {
  id: string;
  title?: string | null;
  imageUrl: string;
  description?: string | null;
  tags: string[];
  likesCount?: number;
}

export default function PortfolioGrid({
  items,
  stylistName,
}: {
  items: PortfolioItemType[];
  stylistName?: string;
}) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<PortfolioItemType | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  // Extract all unique tags
  const allTags = Array.from(new Set(items.flatMap((item) => item.tags || [])));

  const filteredItems =
    selectedTag === "all"
      ? items
      : items.filter((item) => item.tags?.includes(selectedTag));

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleShare = (item: PortfolioItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-surface-muted rounded-2xl p-12 text-center border border-border">
        <Sparkles className="mx-auto text-accent mb-3" size={32} />
        <h4 className="font-semibold text-foreground">No portfolio looks yet</h4>
        <p className="text-sm text-text-secondary mt-1">
          Looks curated by {stylistName || "the stylist"} will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === "all"
                ? "bg-accent text-white shadow-sm"
                : "bg-surface-muted text-text-secondary hover:bg-border"
            }`}
          >
            All Looks ({items.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-all ${
                selectedTag === tag
                  ? "bg-accent text-white shadow-sm"
                  : "bg-surface-muted text-text-secondary hover:bg-border"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Masonry-Style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filteredItems.map((item, index) => {
          const itemLikes = (item.likesCount || 0) + (likes[item.id] || 0);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => setActiveItem(item)}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white border border-border cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Portfolio look"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => handleShare(item, e)}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                      title="Share link"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                  <div>
                    {item.title && (
                      <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                    )}
                    {item.description && (
                      <p className="text-xs text-white/80 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-white/25 backdrop-blur-sm px-2 py-0.5 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar on card */}
              <div className="p-3 bg-white flex items-center justify-between border-t border-border-light">
                <span className="text-xs font-medium text-foreground truncate">
                  {item.title || "Signature Look"}
                </span>
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center gap-1.5 text-xs text-text-muted hover:text-red-500 transition-colors"
                >
                  <Heart
                    size={14}
                    className={likes[item.id] ? "fill-red-500 text-red-500" : ""}
                  />
                  <span>{itemLikes}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Preview Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto min-h-[300px]">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.title || "Portfolio look"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                    <Sparkles size={14} /> Styled by {stylistName || "Stylist"}
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    {activeItem.title || "Signature Editorial Look"}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {activeItem.description ||
                      "Tailored look conceptualized for modern elegance, blending timeless silhouette with contemporary accessories."}
                  </p>

                  <div className="mb-6">
                    <h5 className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1.5">
                      <Tag size={12} /> Style Tags
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent-light text-accent text-xs px-3 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(activeItem.id, e)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-surface-muted transition-colors text-sm font-medium"
                  >
                    <Heart
                      size={16}
                      className={
                        likes[activeItem.id] ? "fill-red-500 text-red-500" : ""
                      }
                    />
                    <span>
                      {(activeItem.likesCount || 0) + (likes[activeItem.id] || 0)}{" "}
                      Likes
                    </span>
                  </button>

                  <button
                    onClick={(e) => handleShare(activeItem, e)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors text-sm font-semibold"
                  >
                    <Share2 size={16} />
                    <span>{copied ? "Link Copied!" : "Share Look"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
