# KetanTools — Powerful Tools. Simple Solutions.

> **KetanTools** is a fully functional, premium, futuristic all-in-one SaaS online tools platform built with Next.js App Router, React, TypeScript, and Tailwind CSS. It features **300 browser-first, privacy-focused online tools** across 10 categories with zero compulsory registration and zero server file storage.

---

## 🚀 Key Highlights

- **300 Real Functional Tools**: Every single tool from 1 to 300 is cataloged, has its own dedicated SEO-optimized route (`/tools/[slug]`), and features real interactive execution with output previews and downloads.
- **100% Client-Side & Privacy-First**: Files are processed locally on the user's machine utilizing WebAssembly, Canvas API, `pdf-lib`, and `xlsx`. Nothing is uploaded or harvested on remote servers.
- **Futuristic 3D SaaS Aesthetic**: Designed with a dark futuristic color palette (`#080B18`, `#0B1020`, `#3B82F6`, `#8B5CF6`, `#22D3EE`), glassmorphism, subtle glows, and responsive cards.
- **Original Custom SVG Logo**: Futuristic isometric KT monogram with electric blue, violet, and cyan gradients and 3D depth.
- **Google AdSense Ready**: Standard-compliant responsive `<AdSlot />` components with publisher environment variable support and `ads.txt`.
- **Complete SEO Engine**: Metadata templates, Open Graph, Twitter cards, JSON-LD structured schemas, breadcrumbs, dynamic `sitemap.xml`, and `robots.txt`.
- **Production-Ready Next.js 14 Build**: Static Site Generation (SSG) for all 324 pages.

---

## 🗂️ 300 Tools Catalog by Category

| Category | Range | Tool Count | Description |
| :--- | :--- | :--- | :--- |
| **A. PDF Tools** | 1 – 50 | 50 Tools | Merge, Split, Compress, Rotate, Watermark, Number, Annotate, Convert |
| **B. PDF Security Tools** | 51 – 70 | 20 Tools | Protect, Unlock, Permission Editor, Encryption Audit, Integrity Hash |
| **C. Excel & Spreadsheet Tools** | 71 – 110 | 40 Tools | Excel/CSV conversion, Deduplication, Sorter, Formulas, Statistics |
| **D. Data Entry & Management** | 111 – 150 | 40 Tools | JSON/CSV/XML/YAML formatters, SQL Generators, CSV editor |
| **E. OCR & Document Extraction** | 151 – 180 | 30 Tools | Image/PDF OCR, Receipt/Invoice scan, Contrast enhancer, Deskew |
| **F. Word & Document Tools** | 181 – 205 | 25 Tools | Resume Builder, Invoice Generator, Certificate Maker, Markdown/HTML |
| **G. Image Processing Tools** | 206 – 235 | 30 Tools | Compress, Resize, Crop, Rotate, Filter, Palette Extractor, Base64 |
| **H. Text & String Utilities** | 236 – 260 | 25 Tools | Word Counter, Case Converter, Diff Checker, Sorter, Regex Replace |
| **I. Developer & Code Tools** | 261 – 280 | 20 Tools | Regex Tester, UUID Generator, QR Code Maker, Barcode, JWT Decoder |
| **J. Calculators & Converters** | 281 – 300 | 20 Tools | Scientific Calc, EMI, Loan, GST, Age, Unit Converters, BMI |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Engine**: `pdf-lib`, `jspdf`
- **Spreadsheets**: `xlsx` (SheetJS), `PapaParse`
- **Graphics & OCR**: HTML5 Canvas API, Web Crypto API

---

## 📁 Project Architecture

```
ketan-tools/
├── public/
│   ├── logo.svg              # Futuristic vector KT brand emblem
│   ├── favicon.svg           # Scalable favicon asset
│   ├── ads.txt               # Google AdSense crawler specification
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts, metadata, navbar & footer
│   │   ├── page.tsx          # Premium homepage (Hero, Search, Popular, FAQs)
│   │   ├── tools/
│   │   │   ├── page.tsx      # All 300 tools searchable directory
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Dynamic tool page for all 300 tools with SSG
│   │   ├── categories/
│   │   │   └── [category]/
│   │   │       └── page.tsx  # 10 Category landing pages
│   │   ├── about/page.tsx    # About Us
│   │   ├── contact/page.tsx  # Contact Us with validation
│   │   ├── privacy/page.tsx  # Privacy Policy (Client-side guarantees)
│   │   ├── terms/page.tsx    # Terms & Conditions
│   │   ├── disclaimer/page.tsx # Accuracy & Limitations Disclaimer
│   │   ├── cookie-policy/page.tsx # Cookie Policy
│   │   ├── faq/page.tsx      # FAQ Directory
│   │   ├── not-found.tsx     # Custom 404 page
│   │   ├── sitemap.ts        # Dynamic sitemap (324 routes)
│   │   └── robots.ts         # Dynamic robots configuration
│   ├── components/
│   │   ├── Logo.tsx          # KT Logo variants (Navbar, Footer, Loading, Hero)
│   │   ├── Navbar.tsx        # Responsive header with category mega-dropdown
│   │   ├── Footer.tsx        # Complete footer with legal links and branding
│   │   ├── SearchBar.tsx     # Keyboard-friendly instant search across 300 tools
│   │   ├── ToolCard.tsx      # 3D hover effect glassmorphic tool cards
│   │   ├── CategoryIcon.tsx  # Dynamic Lucide icon resolver
│   │   ├── Breadcrumbs.tsx   # SEO breadcrumb navigation
│   │   └── AdSlot.tsx        # Google AdSense responsive ad component
│   ├── data/
│   │   ├── categories.ts     # 10 categories metadata
│   │   └── tools.ts          # Complete registry of all 300 tools with FAQ & steps
│   ├── tools/
│   │   ├── ToolRenderer.tsx  # Central router mapping tools to specialized engines
│   │   └── engines/
│   │       ├── PdfEngine.tsx        # PDF manipulation, merge, split, watermark
│   │       ├── ExcelEngine.tsx      # Spreadsheet processing, XLSX/CSV, formulas
│   │       ├── DataEngine.tsx       # JSON, XML, YAML, SQL formatting & converting
│   │       ├── OcrEngine.tsx        # Canvas-assisted OCR and scanner preprocessing
│   │       ├── DocumentEngine.tsx   # Resume builder, invoice, certificate creator
│   │       ├── ImageEngine.tsx      # Compression, resizing, format conversion
│   │       ├── TextEngine.tsx       # Word counters, diffing, case transformations
│   │       ├── DeveloperEngine.tsx  # QR generator, UUIDs, JWT, Web Crypto hashes
│   │       └── CalculatorEngine.tsx # Scientific, EMI, GST, BMI, Unit converters
│   └── lib/
│       └── utils.ts          # Download helpers, formatters, array buffer parsers
```

---

## ⚡ Quick Start & Development

1. Clone or navigate to the workspace directory:
   ```bash
   cd "d:\ketan tool"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Next.js will be automatically detected with zero custom configuration needed.
5. In **Environment Variables**, optionally set:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: `ca-pub-XXXXXXXXXXXXXXXX`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
6. Click **Deploy**. Your site will be live across Vercel's global Edge network!

---

## 🛡️ Privacy & Compliance

- **No Compulsory Registration**: Anonymous and direct access for all users.
- **Client-Side Operations**: Files remain in browser memory and are wiped when the tab is closed.
- **Google AdSense Compliant**: Labeled responsive ads, valid `ads.txt`, transparent cookie policy, and non-intrusive ad density.

---

## 📄 License

Copyright © 2026 KetanTools. All rights reserved.
