import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy - KetanTools",
  description:
    "Review our transparent Privacy Policy. KetanTools operates on a zero-file-storage, browser-first privacy architecture.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ name: "Privacy Policy" }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Last Updated: November 09, 2026
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Introduction & Core Privacy Promise</h2>
            <p>
              At KetanTools (&quot;we&quot;, &quot;our&quot;, &quot;platform&quot;), protecting user confidentiality is our highest design principle.
              KetanTools is intentionally engineered to operate with zero server-side file retention.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Client-Side Browser Processing</h2>
            <p>
              All file parsing, compression, format transformations, image editing, PDF operations, OCR scanning, and data formatting
              execute directly inside your local web browser utilizing client-side technologies including JavaScript, WebAssembly,
              and HTML5 Canvas.
            </p>
            <p className="mt-2">
              <strong>Your files are never transmitted to our servers, never stored in databases, and never inspected by humans.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Advertising & Cookies (Google AdSense)</h2>
            <p>
              We utilize Google AdSense to serve advertisements when you visit our website. Google, as a third-party vendor, uses cookies
              to serve ads based on your prior visits to this website or other sites on the internet.
            </p>
            <p className="mt-2">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Google Ad Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Log Files & Analytics</h2>
            <p>
              Like most standard websites, we may collect non-identifiable technical log data such as browser type, referring URLs,
              operating system version, and timestamps to diagnose technical errors and ensure high availability. None of this data is linked
              to personal identities or document contents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Updates to this Policy</h2>
            <p>
              We may update our Privacy Policy periodically. Any revisions will be reflected on this page with an updated modification timestamp.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

