import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer - KetanTools",
  description: "Official accuracy disclaimer and limitations for tools provided on KetanTools.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "Disclaimer" }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tool Limitations & Accuracy Disclaimer
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last Updated: November 09, 2026
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. General Information</h2>
            <p>
              The information and tools provided by KetanTools are for general utility, productivity, and informational purposes.
              We strive to keep calculations and conversions accurate and up-to-date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Financial & Tax Calculators</h2>
            <p>
              Our financial utilities (including EMI, Loan, GST, Interest, and Investment calculators) are mathematical simulations designed
              to provide estimates. They should not be considered certified legal, financial, or tax advisory services. Always consult
              qualified financial advisors or banks for binding contractual calculations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. OCR & Document Conversions</h2>
            <p>
              Optical Character Recognition (OCR) accuracy depends heavily on input image resolution, lighting, fonts, and language scripts.
              Results from handwritten scans or distorted images may contain optical inaccuracies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. PDF Security & Encryption</h2>
            <p>
              KetanTools PDF security utilities respect official PDF authorization standards. We do not claim that permission flags prevent
              all unauthorized screen captures or third-party extraction tools once a document is visually opened.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
