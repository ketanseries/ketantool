import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Globe, Heart, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "About Us - KetanTools",
  description:
    "Learn about KetanTools: our mission, technology stack, and privacy-first commitment to delivering 300 free high-speed browser tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "About Us" }]} />

        <div className="my-8 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start mb-4">
            <Logo variant="hero" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About KetanTools
          </h1>
          <p className="text-base text-slate-400 mt-2">
            Powerful Tools. Simple Solutions.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
            <p>
              KetanTools was engineered with a single goal: to replace cluttered, ad-ridden, slow, and privacy-invasive
              utility websites with one unified, blazing-fast, and trustworthy suite of 300 online tools.
            </p>
            <p className="mt-3">
              Whether you need to merge sensitive financial PDFs, clean dirty spreadsheet columns, decode cryptographic JWTs,
              convert photo formats, or run optical character recognition on scanned receipts, KetanTools gives you instant results.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">The Client-Side Philosophy</h2>
            <p>
              Traditional online utility websites force users to upload their documents, photos, and spreadsheets to remote
              servers. This exposes private invoices, contracts, personal photos, and business data to security vulnerabilities.
            </p>
            <p className="mt-3">
              KetanTools operates on a strict <strong>browser-first architecture</strong>. Using modern WebAssembly,
              HTML5 Canvas, and advanced JavaScript runtime parsers (such as pdf-lib and SheetJS), your files are processed directly
              on your own device. Your files never leave your machine, guaranteeing total confidentiality and zero server storage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-3">Technology Stack</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-sm">
              <li>Next.js App Router for high-performance server-rendered hydration.</li>
              <li>TypeScript for type safety and clean architecture.</li>
              <li>Tailwind CSS & Framer Motion for modern 3D visual glassmorphism.</li>
              <li>PDF-Lib and jsPDF for zero-server PDF manipulation and generation.</li>
              <li>SheetJS & PapaParse for fast multi-thousand row spreadsheet analysis.</li>
              <li>Web Crypto API for cryptographically secure hashing and UUID creation.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            <span>Explore All 300 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
