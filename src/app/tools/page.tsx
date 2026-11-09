"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wrench,
  Sparkles,
  Filter,
  Search,
  Grid,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { TOOLS, ToolItem } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import CategoryIcon from "@/components/CategoryIcon";

function AllToolsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showPopularOnly, setShowPopularOnly] = useState(initialFilter === "popular");
  const [sortBy, setSortBy] = useState<"id" | "name" | "popular">("id");

  // Filtering and sorting logic
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        search.trim() === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.categoryName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;

      const matchesPopular = !showPopularOnly || tool.popular;

      return matchesSearch && matchesCategory && matchesPopular;
    }).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return a.id - b.id;
    });
  }, [search, selectedCategory, showPopularOnly, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Directory • 300 High-Speed Tools</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Explore All 300 Online Tools
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Fast, secure, and zero-storage browser utilities across PDF, Spreadsheets, OCR, Image,
            Code, Document, and Financial calculations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools by name, description, or keyword..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Sort & Quick Toggles */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                  showPopularOnly
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                    : "border-slate-700 bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Popular Only
              </button>

              <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none text-xs text-slate-200 cursor-pointer"
                >
                  <option value="id" className="bg-slate-900">Sort by Number (1–300)</option>
                  <option value="name" className="bg-slate-900">Sort Alphabetically (A–Z)</option>
                  <option value="popular" className="bg-slate-900">Sort by Popularity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              All Categories (300)
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <CategoryIcon name={cat.id} className="w-3 h-3" />
                <span>{cat.shortName}</span>
                <span className="text-[10px] opacity-70 font-mono">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* AdSense Placement */}
        <AdSlot slotId="ad-all-tools-banner" />

        {/* Result Header Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-slate-200">{filteredTools.length}</strong> of 300 tools
          </span>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-blue-400 hover:underline"
            >
              Clear search &quot;{search}&quot;
            </button>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-12 text-center">
            <Wrench className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No matching tools found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or selecting a different category filter.
            </p>
          </div>
        )}

        {/* Footer AdSlot */}
        <AdSlot slotId="ad-all-tools-bottom" className="mt-12" />
      </div>
    </div>
  );
}

export default function AllToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center text-slate-400">Loading tools directory...</div>}>
      <AllToolsContent />
    </Suspense>
  );
}

