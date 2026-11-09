import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy - KetanTools",
  description: "Learn about how cookies and advertising technologies are utilized on KetanTools.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "Cookie Policy" }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last Updated: November 09, 2026
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make
              websites function efficiently and provide reporting analytics.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. How We Use Cookies</h2>
            <p>
              KetanTools uses cookies primarily for advertising delivery (Google AdSense), remembering user preferences (such as dark mode),
              and tracking aggregate website performance. We do not use cookies to track individual document data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Managing and Disabling Cookies</h2>
            <p>
              You can instruct your browser to refuse all cookies or to notify you when a cookie is being sent. However, some sections of the website
              may not function optimally if cookies are completely blocked.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

