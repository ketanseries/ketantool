import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions - KetanTools",
  description: "Terms and conditions governing the use of KetanTools online utility services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "Terms & Conditions" }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last Updated: November 09, 2026
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KetanTools, you agree to be bound by these Terms and Conditions and our Privacy Policy.
              If you do not agree, please do not use this platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Permitted Use</h2>
            <p>
              KetanTools provides free browser-based online tools for individual, educational, and business use. You agree not to misuse
              the platform, attempt to reverse engineer client code for malicious purposes, or deploy automated scraping bots that degrade
              site performance for other users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property</h2>
            <p>
              All branding, logos, graphics, interface designs, code components, and compilation rights belong exclusively to KetanTools.
              You retain 100% intellectual property ownership of any files, texts, or documents you process through our tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Disclaimer of Warranty</h2>
            <p>
              All tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. While our algorithms
              are thoroughly tested for high precision, KetanTools assumes no liability for loss of data, calculation errors, or formatting anomalies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
