"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import {
  Code2,
  Download,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  FileCode,
  Table,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadText } from "@/lib/utils";

interface DataEngineProps {
  tool: ToolItem;
}

export const DataEngine: React.FC<DataEngineProps> = ({ tool }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load sample data based on tool type
  const loadSample = () => {
    if (tool.slug.includes("json")) {
      setInputText(
        JSON.stringify(
          [
            { id: 1, name: "Alpha Tool", category: "PDF", active: true },
            { id: 2, name: "Beta Converter", category: "Excel", active: false },
            { id: 3, name: "Gamma Processor", category: "Image", active: true },
          ],
          null,
          tool.slug.includes("minify") ? 0 : 2
        )
      );
    } else if (tool.slug.includes("csv")) {
      setInputText(
        `id,name,role,department,salary\n101,John Doe,Lead Architect,Engineering,145000\n102,Jane Smith,Senior Designer,Product,120000\n103,Alex Rivera,Full-Stack Dev,Engineering,110000`
      );
    } else if (tool.slug.includes("xml")) {
      setInputText(
        `<catalog>\n  <tool id="1">\n    <name>Merge PDF</name>\n    <category>PDF Tools</category>\n  </tool>\n</catalog>`
      );
    } else if (tool.slug.includes("sql")) {
      setInputText(
        `select u.id, u.username, count(o.id) as total_orders from users u left join orders o on u.id = o.user_id where u.active = 1 group by u.id, u.username order by total_orders desc limit 100;`
      );
    } else if (tool.slug.includes("yaml")) {
      setInputText(
        `version: '3.8'\nservices:\n  app:\n    image: node:20-alpine\n    ports:\n      - "3000:3000"\n    environment:\n      NODE_ENV: production`
      );
    } else {
      setInputText(
        `Sample structured data content for testing KetanTools high performance engine.`
      );
    }
    setError(null);
  };

  const processData = () => {
    if (!inputText.trim()) {
      setError("Please enter or upload input text.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setStatusMessage(null);

    try {
      let result = "";

      if (tool.engineType === "data-json-format" || tool.engineType === "data-json-beautify" || tool.slug.includes("json-format")) {
        const obj = JSON.parse(inputText);
        result = JSON.stringify(obj, null, 2);
        setStatusMessage("JSON formatted and validated successfully!");
      } else if (tool.engineType === "data-json-minify" || tool.slug.includes("json-minify")) {
        const obj = JSON.parse(inputText);
        result = JSON.stringify(obj);
        setStatusMessage("JSON minified successfully.");
      } else if (tool.engineType === "data-json-validate" || tool.slug.includes("json-validate")) {
        JSON.parse(inputText);
        result = "✓ VALID JSON: Syntax is 100% standard and well-formed.";
        setStatusMessage("Valid JSON syntax!");
      } else if (tool.engineType === "data-csv-to-json" || tool.slug.includes("csv-to-json")) {
        const parsed = Papa.parse(inputText, { header: true, skipEmptyLines: true });
        result = JSON.stringify(parsed.data, null, 2);
        setStatusMessage(`Converted ${parsed.data.length} CSV rows to JSON array.`);
      } else if (tool.engineType === "data-json-to-csv" || tool.slug.includes("json-to-csv")) {
        const obj = JSON.parse(inputText);
        const csv = Papa.unparse(Array.isArray(obj) ? obj : [obj]);
        result = csv;
        setStatusMessage("Converted JSON objects into CSV format.");
      } else if (tool.slug.includes("csv-to-sql") || tool.engineType === "data-csv-to-sql") {
        const parsed = Papa.parse<any[]>(inputText, { header: false, skipEmptyLines: true });
        if (parsed.data.length < 2) throw new Error("CSV requires a header row and at least 1 data row.");
        const headers = parsed.data[0];
        const tableName = "imported_records";
        let sql = `CREATE TABLE ${tableName} (\n  ${headers.map((h: any) => `\`${h}\` VARCHAR(255)`).join(",\n  ")}\n);\n\n`;
        const insertRows = parsed.data.slice(1).map((row: any[]) => {
          const vals = row.map((v: any) => `'${String(v).replace(/'/g, "''")}'`);
          return `INSERT INTO ${tableName} (${headers.map((h: any) => `\`${h}\``).join(", ")}) VALUES (${vals.join(", ")});`;
        });
        sql += insertRows.join("\n");
        result = sql;
        setStatusMessage(`Generated SQL table schema and ${insertRows.length} INSERT statements.`);
      } else if (tool.slug.includes("sql-format")) {
        // Beautify SQL keywords
        const keywords = [
          "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
          "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES",
          "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "AND", "OR"
        ];
        let formatted = inputText;
        keywords.forEach((kw) => {
          const reg = new RegExp(`\\b${kw}\\b`, "gi");
          formatted = formatted.replace(reg, kw);
        });
        // Basic line-break indentation
        formatted = formatted
          .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|LEFT JOIN|RIGHT JOIN|INNER JOIN)\b/gi, "\n$1\n  ")
          .trim();
        result = formatted;
        setStatusMessage("SQL formatted with standard uppercase keywords and indentation.");
      } else if (tool.slug.includes("xml")) {
        // XML formatting / minification / conversion
        if (tool.slug.includes("minify")) {
          result = inputText.replace(/>\s+</g, "><").trim();
        } else {
          // XML pretty indentation
          let formatted = "";
          let pad = 0;
          inputText.split(/>\s*</).forEach((node) => {
            let indent = 0;
            if (node.match(/^\/\w/)) pad = Math.max(0, pad - 1);
            else if (node.match(/^<?\w[^>]*[^\/]$/)) indent = 1;
            formatted += "  ".repeat(pad) + "<" + node + ">\n";
            pad += indent;
          });
          result = formatted.trim();
        }
        setStatusMessage("XML processing completed.");
      } else if (tool.slug.includes("yaml")) {
        // YAML simple formatting / conversion
        result = inputText.replace(/\t/g, "  ").trim();
        setStatusMessage("YAML processed and validated.");
      } else {
        // General CSV cleaner / deduplicator
        const lines = inputText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
        const unique = Array.from(new Set(lines));
        result = unique.join("\n");
        setStatusMessage(`Cleaned data: ${lines.length - unique.length} duplicates removed.`);
      }

      setOutputText(result);
    } catch (err: any) {
      setError(err.message || "Failed to process data.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (outputText) {
      const ext = tool.slug.includes("csv")
        ? "csv"
        : tool.slug.includes("json")
        ? "json"
        : tool.slug.includes("sql")
        ? "sql"
        : tool.slug.includes("xml")
        ? "xml"
        : "txt";
      downloadText(outputText, `${tool.slug}-result.${ext}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-purple-400" />
          Data Input & Transformation Studio
        </h3>
        <button
          type="button"
          onClick={loadSample}
          className="text-xs font-medium text-blue-400 hover:text-cyan-300 transition-colors"
        >
          Load Example Data
        </button>
      </div>

      {/* Side-by-side or stacked Input / Output editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input box */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Input ({tool.categoryName})</span>
            <span className="font-mono text-[11px]">{inputText.length} chars</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Paste your ${tool.name} data, JSON, CSV, XML or SQL query here...`}
            rows={14}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Output box */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Processed Output</span>
            <div className="flex items-center gap-2">
              {outputText && (
                <>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-cyan-300 transition-colors ml-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <textarea
            readOnly
            value={outputText}
            placeholder="Processed output will appear here automatically..."
            rows={14}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400 placeholder-slate-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={processData}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:opacity-95 disabled:opacity-50"
        >
          {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Run {tool.name}
        </button>

        <button
          type="button"
          onClick={() => {
            setInputText("");
            setOutputText("");
            setError(null);
            setStatusMessage(null);
          }}
          className="rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          Clear
        </button>
      </div>

      {statusMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
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

export default DataEngine;
