import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ketantools.com"),
  title: {
    default: "KetanTools - Free Online PDF, Image, Excel & Text Tools",
    template: "%s | KetanTools",
  },
  description:
    "Use KetanTools for free online PDF, image, Excel, text, OCR, developer, and calculator tools. Fast, secure, and easy-to-use online utilities.",
  keywords: [
    "KetanTools",
    "online tools",
    "free pdf converter",
    "merge pdf online",
    "compress image",
    "excel to csv",
    "image to text ocr",
    "emi calculator",
    "json formatter",
    "developer utilities",
  ],
  authors: [{ name: "KetanTools Team" }],
  creator: "KetanTools",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ketantools.com",
    siteName: "KetanTools",
    title: "KetanTools - Free Online PDF, Image, Excel & Text Tools",
    description:
      "Convert, edit, compress, calculate, and transform files effortlessly with KetanTools. Fast, secure, and simple online tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KetanTools - Free Online PDF, Image, Excel & Text Tools",
    description:
      "Powerful Tools. Simple Solutions. 300 free browser-first utilities for PDF, Excel, OCR, Code & Calculations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-background text-slate-100 antialiased selection:bg-blue-500 selection:text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

