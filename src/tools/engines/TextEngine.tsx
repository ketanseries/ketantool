"use client";

import React, { useState, useMemo } from "react";
import {
  Type,
  Copy,
  Check,
  Download,
  Trash2,
  RefreshCw,
  Sparkles,
  GitCompare,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadText } from "@/lib/utils";

interface TextEngineProps {
  tool: ToolItem;
}

export const TextEngine: React.FC<TextEngineProps> = ({ tool }) => {
  const [text, setText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [copied, setCopied] = useState(false);

  // Stats calculation
  const stats = useMemo(() => {
    const raw = text.trim();
    const words = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s+/g, "").length;
    const sentences = raw ? raw.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0;
    const paragraphs = raw ? raw.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
    const readingTimeMin = Math.ceil(words / 200);
    const speakingTimeMin = Math.ceil(words / 130);

    return {
      words,
      chars,
      charsNoSpace,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
    };
  }, [text]);

  // Transformation helper
  const transformText = (action: string) => {
    let result = text;
    switch (action) {
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "titlecase":
        result = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "sentencecase":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "reverse":
        result = text.split("").reverse().join("");
        break;
      case "sort-lines":
        result = text
          .split("\n")
          .sort((a, b) => a.localeCompare(b))
          .join("\n");
        break;
      case "remove-duplicate-lines":
        result = Array.from(new Set(text.split("\n"))).join("\n");
        break;
      case "remove-empty-lines":
        result = text
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .join("\n");
        break;
      case "remove-extra-spaces":
        result = text.replace(/\s+/g, " ").trim();
        break;
      case "url-encode":
        result = encodeURIComponent(text);
        break;
      case "url-decode":
        try {
          result = decodeURIComponent(text);
        } catch {
          // ignore
        }
        break;
      case "html-encode":
        result = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
        break;
      case "html-decode":
        const doc = new DOMParser().parseFromString(text, "text/html");
        result = doc.documentElement.textContent || "";
        break;
      case "find-replace":
        if (findStr) {
          result = text.replaceAll(findStr, replaceStr);
        }
        break;
      default:
        break;
    }
    setText(result);
  };

  const generateLorem = (paragraphs = 3) => {
    const loremSample =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    setText(Array(paragraphs).fill(loremSample).join("\n\n"));
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCompare = tool.slug.includes("compare") || tool.slug.includes("diff");
  const isLorem = tool.slug.includes("lorem");

  return (
    <div className="space-y-6">
      {/* Live Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Words</span>
          <span className="block text-xl font-bold text-slate-100 mt-0.5">{stats.words}</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Characters</span>
          <span className="block text-xl font-bold text-slate-100 mt-0.5">{stats.chars}</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Without Spaces</span>
          <span className="block text-xl font-bold text-slate-100 mt-0.5">{stats.charsNoSpace}</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Sentences</span>
          <span className="block text-xl font-bold text-slate-100 mt-0.5">{stats.sentences}</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Paragraphs</span>
          <span className="block text-xl font-bold text-slate-100 mt-0.5">{stats.paragraphs}</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
          <span className="text-[11px] text-slate-500 font-medium">Reading Time</span>
          <span className="block text-xl font-bold text-cyan-400 mt-0.5">~{stats.readingTimeMin}m</span>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        {/* Quick Transformation Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
          <button
            type="button"
            onClick={() => transformText("uppercase")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            UPPERCASE
          </button>
          <button
            type="button"
            onClick={() => transformText("lowercase")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            lowercase
          </button>
          <button
            type="button"
            onClick={() => transformText("titlecase")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Title Case
          </button>
          <button
            type="button"
            onClick={() => transformText("sentencecase")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Sentence case
          </button>
          <button
            type="button"
            onClick={() => transformText("remove-extra-spaces")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Trim Spaces
          </button>
          <button
            type="button"
            onClick={() => transformText("remove-duplicate-lines")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Remove Duplicates
          </button>
          <button
            type="button"
            onClick={() => transformText("reverse")}
            className="rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Reverse Text
          </button>
          {isLorem && (
            <button
              type="button"
              onClick={() => generateLorem(3)}
              className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Generate 3 Paragraphs
            </button>
          )}
        </div>

        {/* Find & Replace Bar */}
        {(tool.slug.includes("find") || tool.slug.includes("replace")) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <input
              type="text"
              value={findStr}
              onChange={(e) => setFindStr(e.target.value)}
              placeholder="Find text..."
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
            />
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder="Replace with..."
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
            />
            <button
              type="button"
              onClick={() => transformText("find-replace")}
              className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
            >
              Replace All Matches
            </button>
          </div>
        )}

        {/* Text Area(s) */}
        {isCompare ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1 font-medium">Original Document</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste original text here..."
                rows={12}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-slate-100 font-mono"
              />
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1 font-medium">Modified Document</div>
              <textarea
                value={secondText}
                onChange={(e) => setSecondText(e.target.value)}
                placeholder="Paste modified text to compare..."
                rows={12}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-slate-100 font-mono"
              />
            </div>
          </div>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Type or paste your text for ${tool.name}...`}
            rows={12}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-xs text-slate-100 font-mono focus:border-violet-500 focus:outline-none"
          />
        )}

        {/* Bottom Bar: Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy to Clipboard"}
            </button>
            <button
              type="button"
              onClick={() => downloadText(text, `${tool.slug}.txt`)}
              disabled={!text}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> Download TXT
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setText("");
              setSecondText("");
            }}
            className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEngine;
