import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6">
        <Logo variant="hero" />
      </div>

      <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-400 mb-4 inline-block">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
        Lost in Cyberspace?
      </h1>

      <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
        The tool or page you are looking for does not exist or may have been relocated.
        Explore all 300 online tools in our directory.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-blue-500 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse All 300 Tools</span>
        </Link>
      </div>
    </div>
  );
}

