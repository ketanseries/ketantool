import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";
import { TOOLS, getToolBySlug, getRelatedTools } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";
import CategoryIcon from "@/components/CategoryIcon";
import ToolRenderer from "@/tools/ToolRenderer";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const title = `${tool.name} - Free Online Tool | KetanTools`;
  const description = `${tool.description} Fast, secure, and 100% free browser-based processing with KetanTools.`;

  return {
    title,
    description,
    keywords: [
      tool.name,
      tool.categoryName,
      "online tools",
      "free tool",
      "KetanTools",
      tool.slug,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://ketantools.com/tools/${tool.slug}`,
      siteName: "KetanTools",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool, 4);

  // JSON-LD structured data schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.categoryName,
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "All Tools", href: "/tools" },
            { name: tool.categoryName, href: `/categories/${tool.category}` },
            { name: tool.name },
          ]}
        />

        {/* Tool Header Banner */}
        <div className="mt-6 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Link
              href={`/categories/${tool.category}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              <CategoryIcon name={tool.category} className="w-3.5 h-3.5" />
              <span>{tool.categoryName}</span>
            </Link>

            {tool.popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-400">
                <Sparkles className="w-3 h-3" />
                Popular Utility
              </span>
            )}

            <span className="rounded-full bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 text-xs font-mono text-slate-400">
              Tool #{tool.id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {tool.name}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            {tool.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <Zap className="w-4 h-4" /> Instant Browser Processing
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-4 h-4" /> No Files Stored on Servers
            </span>
          </div>
        </div>

        {/* Top AdSense Slot */}
        <AdSlot slotId={`ad-tool-top-${tool.id}`} className="my-6" />

        {/* Real Interactive Processing Studio */}
        <div className="relative my-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <ToolRenderer tool={tool} />
        </div>

        {/* Middle AdSense Slot */}
        <AdSlot slotId={`ad-tool-mid-${tool.id}`} className="my-8" />

        {/* Tool Instructions Section */}
        <div className="my-12 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-blue-400" />
            How to Use {tool.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tool.instructions.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="my-12 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {tool.faq.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
              >
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-2">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <div className="my-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Related {tool.categoryName}
              </h2>
              <Link
                href={`/categories/${tool.category}`}
                className="text-xs font-semibold text-blue-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                View all in {tool.categoryName} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((rTool) => (
                <ToolCard key={rTool.id} tool={rTool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
