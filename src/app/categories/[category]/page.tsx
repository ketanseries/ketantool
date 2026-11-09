import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import CategoryIcon from "@/components/CategoryIcon";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) return {};

  const title = `${cat.name} (${cat.count} Tools) - Free Online Utilities | KetanTools`;
  const description = `${cat.description} Fast, secure, and 100% free browser-based online tools with KetanTools.`;

  return {
    title,
    description,
    keywords: [cat.name, "online tools", "free utilities", "KetanTools", cat.slug],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://ketantools.com/categories/${cat.id}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) {
    notFound();
  }

  const categoryTools = getToolsByCategory(cat.id);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: "Categories", href: "/tools" },
            { name: cat.name },
          ]}
        />

        {/* Hero Section */}
        <div className="my-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
              <CategoryIcon name={cat.id} className="w-3.5 h-3.5" />
              <span>Category Range: Tools #{cat.toolRange}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {cat.name}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              {cat.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Client-Side Privacy
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Zap className="w-4 h-4" /> {categoryTools.length} Fully Functional Tools
              </span>
            </div>
          </div>
        </div>

        {/* Top AdSlot */}
        <AdSlot slotId={`ad-category-top-${cat.id}`} />

        {/* Tools Grid */}
        <div className="my-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              All {cat.name} ({categoryTools.length})
            </h2>
            <span className="text-xs text-slate-400">Browse individual tools below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Bottom AdSlot */}
        <AdSlot slotId={`ad-category-bottom-${cat.id}`} />

        {/* Other Categories Navigation */}
        <div className="my-16 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">
            Explore Other Tool Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.filter((c) => c.id !== cat.id).map((otherCat) => (
              <Link
                key={otherCat.id}
                href={`/categories/${otherCat.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 transition-all hover:border-blue-500/40 hover:bg-slate-900"
              >
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <CategoryIcon name={otherCat.id} className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 truncate">
                    {otherCat.shortName}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {otherCat.count} tools →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
