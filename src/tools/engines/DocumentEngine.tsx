"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  FileText,
  Download,
  Copy,
  Check,
  RefreshCw,
  Award,
  Receipt,
  UserCheck,
  FileCode,
  BookOpen,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadBlob, downloadText } from "@/lib/utils";

interface DocumentEngineProps {
  tool: ToolItem;
}

export const DocumentEngine: React.FC<DocumentEngineProps> = ({ tool }) => {
  const [docContent, setDocContent] = useState("");
  const [copied, setCopied] = useState(false);

  // Resume builder state
  const [fullName, setFullName] = useState("Alex Johnson");
  const [jobTitle, setJobTitle] = useState("Senior Full-Stack Engineer");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [summary, setSummary] = useState(
    "Innovative software engineer with 6+ years of experience architecting scalable Next.js applications and cloud microservices."
  );
  const [skills, setSkills] = useState("TypeScript, React, Next.js, Node.js, Tailwind CSS, PostgreSQL, Docker, AWS");

  // Invoice generator state
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-001");
  const [clientName, setClientName] = useState("Acme Corporation");
  const [itemDesc, setItemDesc] = useState("Web Development & SaaS Architecture");
  const [itemAmount, setItemAmount] = useState(3500);
  const [taxRate, setTaxRate] = useState(10);

  // Certificate state
  const [recipientName, setRecipientName] = useState("Sarah Williams");
  const [courseName, setCourseName] = useState("Advanced Full-Stack Engineering & Cloud Architecture");
  const [issueDate, setIssueDate] = useState("November 09, 2026");

  // Generate Resume PDF
  const generateResumePdf = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text(fullName, 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(59, 130, 246);
    doc.text(jobTitle, 20, 33);

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`${email}  |  ${phone}`, 20, 40);

    doc.setDrawColor(226, 232, 240);
    doc.line(20, 45, 190, 45);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("PROFESSIONAL SUMMARY", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, 63);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("CORE COMPETENCIES & SKILLS", 20, 85);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const splitSkills = doc.splitTextToSize(skills, 170);
    doc.text(splitSkills, 20, 93);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("PROFESSIONAL EXPERIENCE", 20, 115);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("Lead Architect  •  Apex Cloud Systems", 20, 125);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("2022 - Present | San Francisco, CA", 20, 131);

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text("• Led team of 8 engineers delivering enterprise web tools and APIs.", 20, 139);
    doc.text("• Reduced cloud computing costs by 34% through serverless architecture.", 20, 146);

    const blob = doc.output("blob");
    downloadBlob(blob, `${fullName.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`);
  };

  // Generate Invoice PDF
  const generateInvoicePdf = () => {
    const doc = new jsPDF();
    const tax = (itemAmount * taxRate) / 100;
    const total = itemAmount + tax;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(30, 41, 59);
    doc.text("INVOICE", 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("Billed To:", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(clientName, 20, 62);

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(20, 75, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", 25, 82);
    doc.text("Amount (USD)", 150, 82);

    // Table row
    doc.setFont("helvetica", "normal");
    doc.text(itemDesc, 25, 95);
    doc.text(`$${itemAmount.toFixed(2)}`, 150, 95);

    doc.line(20, 105, 190, 105);

    // Totals
    doc.text(`Subtotal:`, 130, 115);
    doc.text(`$${itemAmount.toFixed(2)}`, 165, 115);

    doc.text(`Tax (${taxRate}%):`, 130, 123);
    doc.text(`$${tax.toFixed(2)}`, 165, 123);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`Total Due:`, 130, 135);
    doc.text(`$${total.toFixed(2)}`, 165, 135);

    const blob = doc.output("blob");
    downloadBlob(blob, `${invoiceNumber}.pdf`);
  };

  // Generate Certificate PDF
  const generateCertificatePdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    // Border
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, 269, 182);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(30, 41, 59);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 45, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text("THIS ACKNOWLEDGES THAT", 148, 65, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(59, 130, 246);
    doc.text(recipientName, 148, 85, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(71, 85, 105);
    doc.text("has successfully completed all requirements for", 148, 105, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text(courseName, 148, 120, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(`Issued on: ${issueDate}`, 50, 160);
    doc.text("Verified Signature", 220, 160);

    doc.line(200, 155, 260, 155);

    const blob = doc.output("blob");
    downloadBlob(blob, `certificate-${recipientName.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };

  // Markdown or HTML conversion
  const handleMarkdownConvert = () => {
    if (tool.slug.includes("markdown-to-html") || tool.engineType === "doc-md-to-html") {
      // Basic markdown parser
      let html = docContent
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*)\*/gim, "<i>$1</i>")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, "<br />");
      downloadText(html, "document.html", "text/html");
    } else if (tool.slug.includes("txt-to-pdf") || tool.engineType === "doc-txt-to-pdf") {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(docContent || "Sample document text.", 170);
      doc.text(lines, 20, 20);
      const blob = doc.output("blob");
      downloadBlob(blob, "document.pdf");
    } else {
      downloadText(docContent, "document.txt");
    }
  };

  const isResume = tool.slug.includes("resume");
  const isInvoice = tool.slug.includes("invoice");
  const isCertificate = tool.slug.includes("certificate");

  return (
    <div className="space-y-6">
      {isResume ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> Professional Resume Builder
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Professional Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400">Executive Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Skills (Comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          <button
            type="button"
            onClick={generateResumePdf}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            <Download className="w-4 h-4" /> Download PDF Resume
          </button>
        </div>
      ) : isInvoice ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <Receipt className="w-4 h-4" /> Professional Business Invoice Generator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Client / Company Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Item Description</label>
              <input
                type="text"
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Amount (USD)</label>
              <input
                type="number"
                value={itemAmount}
                onChange={(e) => setItemAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={generateInvoicePdf}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            <Download className="w-4 h-4" /> Download PDF Invoice
          </button>
        </div>
      ) : isCertificate ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <Award className="w-4 h-4" /> Official Certificate of Achievement Generator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Recipient Full Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Course / Award Title</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={generateCertificatePdf}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            <Download className="w-4 h-4" /> Download Landscape Certificate
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Document Editor & Converter</span>
            <span>{docContent.split(/\s+/).filter(Boolean).length} words</span>
          </div>

          <textarea
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            placeholder="Type or paste your Markdown, TXT, or document content here..."
            rows={12}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMarkdownConvert}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <Download className="w-4 h-4" /> Process & Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEngine;
