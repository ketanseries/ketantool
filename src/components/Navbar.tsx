"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Grid,
  Info,
  Layers,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";
import CategoryIcon from "./CategoryIcon";
import { CATEGORIES } from "@/data/categories";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for shadow & blur intensification
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl shadow-lg shadow-black/40"
          : "border-b border-slate-800/40 bg-slate-950/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Logo variant="navbar" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-blue-400 bg-blue-500/10"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            Home
          </Link>

          <Link
            href="/tools"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/tools"
                ? "text-blue-400 bg-blue-500/10"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            All 300 Tools
          </Link>

          {/* Categories Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesDropdownOpen(true)}
            onMouseLeave={() => setCategoriesDropdownOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                categoriesDropdownOpen || pathname.startsWith("/categories")
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
              aria-expanded={categoriesDropdownOpen}
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  categoriesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl">
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-800/70"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600/20 group-hover:text-cyan-300 transition-colors">
                        <CategoryIcon name={cat.id} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-400">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {cat.count} tools
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
                  <span>Explore full directory of utilities</span>
                  <Link
                    href="/tools"
                    className="text-blue-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                  >
                    View All 300 Tools <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/tools?filter=popular"
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Popular</span>
          </Link>

          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "text-blue-400 bg-blue-500/10"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Right Action: Explore Tools CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/tools"
            className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:opacity-95 hover:shadow-cyan-500/25 active:scale-95"
          >
            <span>Explore Tools</span>
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/tools"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white sm:hidden"
          >
            300 Tools
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-2xl">
          <div className="space-y-1">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              All 300 Tools
            </Link>
            <Link
              href="/tools?filter=popular"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-amber-300 hover:bg-slate-800"
            >
              <Sparkles className="w-4 h-4" />
              <span>Popular Tools</span>
            </Link>

            <div className="pt-2 pb-1 text-xs font-semibold uppercase text-slate-500 px-3">
              Categories
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                >
                  <CategoryIcon name={cat.id} className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{cat.shortName}</span>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1">
              <Link
                href="/about"
                className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Contact Support
              </Link>
              <Link
                href="/privacy"
                className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
