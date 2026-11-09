"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles, Command } from "lucide-react";
import { TOOLS, ToolItem } from "@/data/tools";
import CategoryIcon from "./CategoryIcon";

interface SearchBarProps {
  placeholder?: string;
  size?: "default" | "large";
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search across 300+ tools (e.g., merge pdf, compress image, emi, json)...",
  size = "default",
  className = "",
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "/" && document.activeElement !== inputRef.current && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered tools
  const filteredTools = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryName.toLowerCase().includes(q) ||
        tool.slug.includes(q)
    ).slice(0, 8);
  }, [query]);

  const handleSelect = (tool: ToolItem) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/tools/${tool.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredTools.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelect(filteredTools[selectedIndex]);
      } else {
        router.push(`/tools?search=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
    }
  };

  const isLarge = size === "large";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div
        className={`relative flex items-center w-full rounded-2xl border transition-all duration-300 ${
          isOpen
            ? "border-blue-500 shadow-glow bg-slate-900"
            : "border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900"
        } ${isLarge ? "h-14 sm:h-16 px-5" : "h-11 sm:h-12 px-4"}`}
      >
        <Search
          className={`shrink-0 text-slate-400 mr-3 transition-colors ${
            isOpen ? "text-blue-400" : ""
          } ${isLarge ? "w-6 h-6" : "w-4 h-4"}`}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none ${
            isLarge ? "text-base sm:text-lg" : "text-sm"
          }`}
          aria-label="Search tools"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1 ml-2 shrink-0 px-2 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400">
          <kbd className="font-mono">Ctrl</kbd>
          <span>+</span>
          <kbd className="font-mono">K</kbd>
        </div>
      </div>

      {/* Instant Dropdown Suggestions */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          <div className="p-2">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Matching Tools ({filteredTools.length})</span>
              <span>Press ↵ to open</span>
            </div>

            {filteredTools.length > 0 ? (
              <div className="mt-1 space-y-1">
                {filteredTools.map((tool, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleSelect(tool)}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-blue-600/20 text-white border border-blue-500/30"
                          : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400">
                          <CategoryIcon name={tool.category} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            <span>{tool.name}</span>
                            {tool.popular && (
                              <span className="text-[10px] text-amber-400 font-normal">
                                ★ Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {tool.categoryName} • {tool.description}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                No tools found matching &quot;{query}&quot;. Try another keyword or browse categories.
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 bg-slate-950/60 p-2 text-center">
            <button
              type="button"
              onClick={() => {
                router.push(`/tools?search=${encodeURIComponent(query)}`);
                setIsOpen(false);
              }}
              className="text-xs text-blue-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View all results for &quot;{query}&quot; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

