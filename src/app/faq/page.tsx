import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) - KetanTools",
  description: "Find answers to commonly asked questions regarding KetanTools, file privacy, and tools.",
};

const faqs = [
  {
    category: "General & Pricing",
    items: [
      {
        q: "Is KetanTools really 100% free?",
        a: "Yes. All 300 tools across PDF, Excel, OCR, Code, Image, and Calculators are completely free to use with zero hidden subscriptions or paywalls.",
      },
      {
        q: "Do I need to download or install any software?",
        a: "No installation required! KetanTools runs entirely within your modern web browser (Chrome, Edge, Safari, Firefox, Opera).",
      },
      {
        q: "Why did you build 300 tools in one place?",
        a: "Most online tools are scattered across different sites with intrusive popups and separate logins. KetanTools brings everything together under one clean, unified, and blazing-fast interface.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Are my confidential files uploaded to any server?",
        a: "No. KetanTools uses client-side WebAssembly, HTML5 Canvas, and browser execution. Your files stay on your device.",
      },
      {
        q: "Do you keep copies or backups of processed files?",
        a: "Never. Because files never reach our servers, there are no file copies or backups created anywhere on remote storage.",
      },
    ],
  },
  {
    category: "File Limits & Devices",
    items: [
      {
        q: "What is the maximum file size supported?",
        a: "Since processing happens locally, file sizes are limited only by your browser's available memory. Most modern computers easily handle files up to 100MB-200MB.",
      },
      {
        q: "Does KetanTools work on smartphones?",
        a: "Yes! Every single page and tool is fully responsive for iPhone, iPad, Android, laptops, and desktop computers.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "FAQ" }]} />

        <div className="my-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Clear answers about file safety, browser processing, features, and platform limits.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
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
          ))}
        </div>

        <div className="mt-12 text-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <h3 className="text-base font-semibold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-400 mt-1">Our team is always happy to assist with inquiries or suggestions.</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Contact Support <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

