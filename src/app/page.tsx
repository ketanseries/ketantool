"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Cpu,
  Globe,
  FileCheck2,
  CheckCircle2,
  HelpCircle,
  Clock,
} from "lucide-react";
import { LogoSvg } from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import CategoryIcon from "@/components/CategoryIcon";
import { CATEGORIES } from "@/data/categories";
import { getPopularTools, TOOLS } from "@/data/tools";

export default function HomePage() {
  const popularTools = getPopularTools().slice(0, 8);
  const featuredTools = TOOLS.slice(0, 8);

  const homeFaqs = [
    {
      q: "Is KetanTools completely free to use?",
      a: "Yes! Every single one of our 300 online tools is 100% free with no hidden charges, trial limitations, or mandatory subscription fees.",
    },
    {
      q: "Are my uploaded files stored on your servers?",
      a: "No. KetanTools is built on a privacy-first, client-side architecture. File conversions and manipulations take place directly inside your web browser. Nothing is ever harvested, uploaded, or stored on remote servers.",
    },
    {
      q: "Do I need to create an account or sign in?",
      a: "No registration or login is required. You can access and execute any tool immediately with zero friction.",
    },
    {
      q: "Can I use KetanTools on mobile phones and tablets?",
      a: "Yes. The entire platform is fully responsive and optimized for touchscreens, mobile phones (iOS and Android), tablets, laptops, and 4K desktop displays.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Futuristic Background Glows & Grids */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-violet-600/20 to-cyan-400/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 shadow-glow mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>300 Free, High-Speed Online Web Tools</span>
          </motion.div>

          {/* 3D Animated Logo Emblem */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
              <LogoSvg size={84} />
            </motion.div>
          </div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Everything You Need.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              One Powerful Toolkit.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Convert, edit, compress, calculate, and transform files effortlessly with KetanTools.
            Fast, secure, and simple online tools.
          </motion.p>

          {/* Instant Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <SearchBar size="large" />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow transition-all hover:opacity-95 hover:shadow-cyan-500/30 active:scale-95"
            >
              <span>Explore All 300 Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/categories/pdf"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <span>PDF Utilities</span>
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">100% Client-Side</span>
                <span className="text-slate-400">Zero file harvesting</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-blue-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Instant Execution</span>
                <span className="text-slate-400">No queues or waiting</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-violet-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">No Registration</span>
                <span className="text-slate-400">Completely anonymous</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">300 Verified Tools</span>
                <span className="text-slate-400">Production functional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placement: Home Banner */}
      <AdSlot slotId="ad-home-banner" />

      {/* 2. Popular Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trending Utilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Most Popular Tools
              </h2>
            </div>
            <Link
              href="/tools?filter=popular"
              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-cyan-300 inline-flex items-center gap-1"
            >
              Browse all popular tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Browse by 10 Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-slate-800/60">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Comprehensive Categorization
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Explore Tools by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From PDF editing to Excel manipulation and cryptographic calculations, find the exact tool you need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-850 hover:shadow-glow"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-blue-400 border border-slate-700/60 group-hover:bg-blue-600/20 group-hover:text-cyan-300 transition-colors mb-3">
                    <CategoryIcon name={cat.id} className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[11px] text-slate-400">{cat.count} Tools</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Placement: Home Content */}
      <AdSlot slotId="ad-home-content" />

      {/* 4. Why Choose KetanTools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Engineered For Excellence
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Why Professionals Rely on KetanTools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Modern web architecture that prioritizes your privacy, speed, and workflow convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Absolute Privacy Guarantee</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Unlike traditional online converters that upload your confidential documents to unknown cloud servers,
                KetanTools executes all file processing directly inside your browser sandbox.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Zero Latency Processing</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Powered by WebAssembly, HTML5 Canvas, and modern JavaScript engines, operations take place in milliseconds
                without uploading or downloading large binary streams over slow connections.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">300 Diverse Tools in One Spot</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Stop bookmarking dozens of fragmented websites. KetanTools consolidates PDF editing, Excel analytics,
                OCR scanning, developer tools, and financial calculators in one cohesive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-t border-slate-800/60">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="text-base font-semibold text-slate-100 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-purple-950/60 p-8 sm:p-14 text-center backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Workflow?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Join thousands of creators, engineers, accountants, and students who streamline their day with KetanTools.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow hover:opacity-95"
              >
                <span>Browse All 300 Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

