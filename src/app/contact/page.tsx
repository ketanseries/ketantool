"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address.");
      return;
    }

    // Process submission
    setError(null);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Contact Us" }]} />

        <div className="my-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Support & Feedback
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Have a suggestion for a new tool or need technical assistance? We are here to help.
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-3xl border border-emerald-500/40 bg-emerald-950/20 p-8 sm:p-12 text-center backdrop-blur-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Thank You, {name}!</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              Your inquiry regarding &quot;{subject || "Support"}&quot; has been received. Our team will review your message promptly.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
              }}
              className="mt-6 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.smith@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Tool suggestion, bug report, or business inquiry"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your request or thoughts in detail..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

