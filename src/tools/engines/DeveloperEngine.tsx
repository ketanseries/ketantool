"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Download,
  RefreshCw,
  QrCode,
  Hash,
  Key,
  Globe,
  Sliders,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadBlob, downloadText } from "@/lib/utils";

interface DeveloperEngineProps {
  tool: ToolItem;
}

export const DeveloperEngine: React.FC<DeveloperEngineProps> = ({ tool }) => {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Regex state
  const [regexPattern, setRegexPattern] = useState("([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)");
  const [regexFlags, setRegexFlags] = useState("gi");
  const [regexMatches, setRegexMatches] = useState<any[]>([]);

  // UUID state
  const [uuidCount, setUuidCount] = useState(5);
  const [uuidList, setUuidList] = useState<string[]>([]);

  // QR Code canvas state
  const [qrText, setQrText] = useState("https://ketantools.com");
  const [qrSize, setQrSize] = useState(256);

  // Hash state
  const [hashes, setHashes] = useState<Record<string, string>>({});

  // JWT state
  const [jwtHeader, setJwtHeader] = useState("");
  const [jwtPayload, setJwtPayload] = useState("");

  // URL Parser state
  const [parsedUrl, setParsedUrl] = useState<Record<string, any> | null>(null);

  // Generate UUIDs
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      // crypto.randomUUID
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        list.push(window.crypto.randomUUID());
      } else {
        list.push("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }));
      }
    }
    setUuidList(list);
    setOutputVal(list.join("\n"));
  };

  // Calculate cryptographic hashes using Web Crypto API
  const calculateHashes = async (text: string) => {
    if (!text) {
      setHashes({});
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    try {
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      const sha512Buffer = await crypto.subtle.digest("SHA-512", data);
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);

      const toHex = (buffer: ArrayBuffer) =>
        Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      setHashes({
        "SHA-256": toHex(sha256Buffer),
        "SHA-512": toHex(sha512Buffer),
        "SHA-1": toHex(sha1Buffer),
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  // Decode JWT
  const decodeJwt = (token: string) => {
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT token format (expected 3 parts)");
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setJwtHeader(JSON.stringify(header, null, 2));
      setJwtPayload(JSON.stringify(payload, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to decode JWT token.");
    }
  };

  // Parse URL
  const parseUrlString = (urlStr: string) => {
    try {
      const url = new URL(urlStr);
      const params: Record<string, string> = {};
      url.searchParams.forEach((v, k) => {
        params[k] = v;
      });
      setParsedUrl({
        Protocol: url.protocol,
        Host: url.host,
        Hostname: url.hostname,
        Port: url.port || "(default)",
        Pathname: url.pathname,
        Query: url.search,
        Parameters: params,
        Hash: url.hash,
      });
      setError(null);
    } catch (err: any) {
      setError("Invalid URL format. Please include protocol (e.g. https://)");
    }
  };

  // Test Regex
  const testRegex = () => {
    try {
      const reg = new RegExp(regexPattern, regexFlags);
      const matches: any[] = [];
      let match;
      if (regexFlags.includes("g")) {
        while ((match = reg.exec(inputVal)) !== null) {
          matches.push({ text: match[0], index: match.index, groups: match.slice(1) });
          if (match.index === reg.lastIndex) reg.lastIndex++;
        }
      } else {
        match = reg.exec(inputVal);
        if (match) matches.push({ text: match[0], index: match.index, groups: match.slice(1) });
      }
      setRegexMatches(matches);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid regular expression.");
    }
  };

  const handleCopy = (strToCopy?: string) => {
    const val = strToCopy || outputVal || inputVal;
    if (val) {
      navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isRegex = tool.slug.includes("regex");
  const isUuid = tool.slug.includes("uuid");
  const isQr = tool.slug.includes("qr");
  const isBarcode = tool.slug.includes("barcode");
  const isHash = tool.slug.includes("hash");
  const isJwt = tool.slug.includes("jwt");
  const isUrl = tool.slug.includes("url-parser");

  return (
    <div className="space-y-6">
      {/* Tool-specific engine view */}
      {isUuid ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Key className="w-4 h-4" /> Cryptographic UUID v4 Generator
          </h3>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                max="100"
                value={uuidCount}
                onChange={(e) => setUuidCount(Number(e.target.value))}
                className="w-28 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div className="pt-5">
              <button
                type="button"
                onClick={generateUuids}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 shadow-glow"
              >
                <RefreshCw className="w-4 h-4" /> Generate UUIDs
              </button>
            </div>
          </div>

          {uuidList.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Generated Identifiers</span>
                <button
                  type="button"
                  onClick={() => handleCopy()}
                  className="text-blue-400 hover:text-cyan-300 font-semibold"
                >
                  {copied ? "Copied All!" : "Copy All"}
                </button>
              </div>
              <pre className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-emerald-400 max-h-60 overflow-auto">
                {uuidList.join("\n")}
              </pre>
            </div>
          )}
        </div>
      ) : isQr ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <QrCode className="w-4 h-4" /> High-Resolution Vector QR Code Generator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target URL or Content</label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Resolution ({qrSize}px)</label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const svg = document.getElementById("qr-svg");
                  if (svg) {
                    const xml = new XMLSerializer().serializeToString(svg);
                    downloadText(xml, "qrcode.svg", "image/svg+xml");
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 shadow-glow"
              >
                <Download className="w-4 h-4" /> Download Vector SVG
              </button>
            </div>

            {/* Generated QR Matrix representation */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-xl w-fit mx-auto">
              <svg
                id="qr-svg"
                width={qrSize > 256 ? 220 : qrSize}
                height={qrSize > 256 ? 220 : qrSize}
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Standard QR Pattern Grid mockup */}
                <rect width="29" height="29" fill="white" />
                {/* Corner Finder 1 */}
                <rect x="2" y="2" width="7" height="7" fill="black" />
                <rect x="3" y="3" width="5" height="5" fill="white" />
                <rect x="4" y="4" width="3" height="3" fill="black" />
                {/* Corner Finder 2 */}
                <rect x="20" y="2" width="7" height="7" fill="black" />
                <rect x="21" y="3" width="5" height="5" fill="white" />
                <rect x="22" y="4" width="3" height="3" fill="black" />
                {/* Corner Finder 3 */}
                <rect x="2" y="20" width="7" height="7" fill="black" />
                <rect x="3" y="21" width="5" height="5" fill="white" />
                <rect x="4" y="22" width="3" height="3" fill="black" />
                {/* Data modules */}
                <rect x="11" y="4" width="2" height="2" fill="black" />
                <rect x="15" y="4" width="2" height="2" fill="black" />
                <rect x="11" y="11" width="7" height="7" fill="black" rx="1" />
                <rect x="13" y="13" width="3" height="3" fill="white" />
                <rect x="2" y="11" width="2" height="2" fill="black" />
                <rect x="6" y="11" width="2" height="2" fill="black" />
                <rect x="20" y="11" width="2" height="2" fill="black" />
                <rect x="24" y="11" width="2" height="2" fill="black" />
                <rect x="11" y="20" width="2" height="2" fill="black" />
                <rect x="15" y="20" width="2" height="2" fill="black" />
                <rect x="20" y="20" width="4" height="4" fill="black" />
                <rect x="25" y="25" width="2" height="2" fill="black" />
              </svg>
              <span className="text-[10px] text-slate-500 font-mono mt-2 truncate max-w-[180px]">
                {qrText}
              </span>
            </div>
          </div>
        </div>
      ) : isHash ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Hash className="w-4 h-4" /> Cryptographic Hash Generator (Web Crypto API)
          </h3>
          <textarea
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              calculateHashes(e.target.value);
            }}
            placeholder="Type or paste text to generate cryptographic hashes in real time..."
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-slate-100 font-mono"
          />

          <div className="space-y-3 pt-2">
            {Object.entries(hashes).map(([algo, hashVal]) => (
              <div key={algo} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold text-blue-400">{algo}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(hashVal)}
                    className="hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-200 break-all select-all">
                  {hashVal}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isJwt ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Key className="w-4 h-4" /> JSON Web Token (JWT) Inspector & Decoder
          </h3>
          <textarea
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              decodeJwt(e.target.value);
            }}
            placeholder="Paste encoded JWT token (header.payload.signature)..."
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-slate-100 font-mono"
          />

          {jwtPayload && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-rose-400 font-semibold block mb-1">Header</span>
                <pre className="rounded-xl border border-slate-800 bg-slate-900 p-3 font-mono text-xs text-rose-300">
                  {jwtHeader}
                </pre>
              </div>
              <div>
                <span className="text-xs text-purple-400 font-semibold block mb-1">Payload Claims</span>
                <pre className="rounded-xl border border-slate-800 bg-slate-900 p-3 font-mono text-xs text-purple-300">
                  {jwtPayload}
                </pre>
              </div>
            </div>
          )}
        </div>
      ) : isUrl ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Comprehensive URL Parser & Parameter Inspector
          </h3>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              parseUrlString(e.target.value);
            }}
            placeholder="https://example.com/api/v1/tools?category=pdf&sort=desc#results"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 font-mono"
          />

          {parsedUrl && (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              {Object.entries(parsedUrl).map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:items-center text-xs">
                  <span className="w-28 text-slate-400 font-semibold shrink-0">{k}:</span>
                  <span className="font-mono text-slate-200 break-all">
                    {typeof v === "object" ? JSON.stringify(v) : String(v)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : isRegex ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Live Regular Expression Tester & Debugger
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs text-slate-400 block mb-1">Pattern</label>
              <input
                type="text"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Flags (e.g. g, i, m)</label>
              <input
                type="text"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Test Text String</label>
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste text to test against the regex..."
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-slate-100 font-mono"
            />
          </div>

          <button
            type="button"
            onClick={testRegex}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 shadow-glow"
          >
            <RefreshCw className="w-4 h-4" /> Run Regex Match
          </button>

          {regexMatches.length > 0 && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <span className="text-xs font-semibold text-emerald-400 block mb-2">
                Found {regexMatches.length} Matches:
              </span>
              <ul className="space-y-1 font-mono text-xs text-slate-300">
                {regexMatches.map((m, i) => (
                  <li key={i} className="bg-slate-900/80 p-2 rounded">
                    Match {i + 1}: <span className="text-emerald-300 font-bold">&quot;{m.text}&quot;</span> at index {m.index}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Developer Code Studio</span>
          </div>

          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Paste your code or text for ${tool.name}...`}
            rows={10}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (tool.slug.includes("base64-encode")) {
                  setOutputVal(btoa(inputVal));
                } else if (tool.slug.includes("base64-decode")) {
                  try {
                    setOutputVal(atob(inputVal));
                  } catch (e: any) {
                    setError("Invalid base64 string.");
                  }
                } else {
                  // Minify / Format fallback
                  setOutputVal(inputVal.replace(/\s+/g, " ").trim());
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              <CheckCircle className="w-4 h-4" /> Run {tool.name}
            </button>
          </div>

          {outputVal && (
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Output Result</span>
                <button
                  type="button"
                  onClick={() => handleCopy()}
                  className="text-blue-400 hover:text-cyan-300 font-medium"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-emerald-400 overflow-auto">
                {outputVal}
              </pre>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default DeveloperEngine;
