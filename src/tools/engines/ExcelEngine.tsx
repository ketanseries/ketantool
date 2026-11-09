"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import {
  Upload,
  Download,
  RefreshCw,
  Table,
  CheckCircle,
  AlertCircle,
  Settings,
  Trash2,
  Filter,
  BarChart2,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadBlob, downloadText, formatBytes, readFileAsArrayBuffer, readFileAsText } from "@/lib/utils";

interface ExcelEngineProps {
  tool: ToolItem;
}

export const ExcelEngine: React.FC<ExcelEngineProps> = ({ tool }) => {
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [tableData, setTableData] = useState<any[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultData, setResultData] = useState<any[][] | null>(null);
  const [jsonResult, setJsonResult] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configuration options
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
      setResultData(null);
      setJsonResult(null);
      setStats(null);

      try {
        if (selected.name.endsWith(".csv")) {
          const text = await readFileAsText(selected);
          const parsed = Papa.parse<any[]>(text, { skipEmptyLines: false });
          setTableData(parsed.data || []);
          setSheets(["Sheet1"]);
          setActiveSheet("Sheet1");
        } else {
          const buffer = await readFileAsArrayBuffer(selected);
          const workbook = XLSX.read(buffer, { type: "array" });
          setSheets(workbook.SheetNames);
          const firstSheet = workbook.SheetNames[0];
          setActiveSheet(firstSheet);
          const worksheet = workbook.Sheets[firstSheet];
          const raw: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setTableData(raw);
        }
      } catch (err: any) {
        setError("Failed to parse spreadsheet: " + err.message);
      }
    }
  };

  const processSpreadsheet = () => {
    if (!tableData || tableData.length === 0) {
      setError("Please upload a spreadsheet with data.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let output: any[][] = [...tableData.map((row) => [...row])];

      if (tool.engineType === "sheet-to-csv" || tool.engineType === "data-csv-to-json") {
        // Output as CSV or JSON
        const headers = output[0] || [];
        const rows = output.slice(1);
        const jsonObjects = rows.map((r) => {
          const obj: Record<string, any> = {};
          headers.forEach((h, i) => {
            obj[String(h || `col_${i}`)] = r[i] !== undefined ? r[i] : "";
          });
          return obj;
        });
        setJsonResult(JSON.stringify(jsonObjects, null, 2));
      } else if (tool.engineType === "sheet-dedup" || tool.slug.includes("duplicate")) {
        // Remove duplicates
        const seen = new Set<string>();
        output = output.filter((row) => {
          const key = JSON.stringify(row);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      } else if (tool.engineType === "sheet-remove-empty-rows" || tool.slug.includes("empty-row")) {
        // Remove empty rows
        output = output.filter((row) =>
          row && row.some((cell) => cell !== null && cell !== undefined && String(cell).trim() !== "")
        );
      } else if (tool.engineType === "sheet-cleaner" || tool.slug.includes("cleaner")) {
        // Clean and trim text
        output = output.map((row) =>
          row.map((cell) => (typeof cell === "string" ? cell.trim() : cell))
        );
      } else if (tool.engineType === "sheet-sorter" || tool.slug.includes("sort")) {
        // Sort by selected column
        const headers = output[0];
        const body = output.slice(1);
        body.sort((a, b) => {
          const valA = a[selectedColumn] ?? "";
          const valB = b[selectedColumn] ?? "";
          return sortOrder === "asc"
            ? String(valA).localeCompare(String(valB), undefined, { numeric: true })
            : String(valB).localeCompare(String(valA), undefined, { numeric: true });
        });
        output = [headers, ...body];
      } else if (tool.engineType === "sheet-find-replace" || tool.slug.includes("replace")) {
        // Find and replace
        if (findText) {
          output = output.map((row) =>
            row.map((cell) =>
              typeof cell === "string" ? cell.replaceAll(findText, replaceText) : cell
            )
          );
        }
      } else if (tool.engineType === "sheet-stats" || tool.slug.includes("statistics") || tool.slug.includes("counter")) {
        // Compute column statistics
        const numericValues: number[] = [];
        output.slice(1).forEach((row) => {
          const val = Number(row[selectedColumn]);
          if (!isNaN(val) && row[selectedColumn] !== "" && row[selectedColumn] !== null) {
            numericValues.push(val);
          }
        });

        const totalRows = output.length - 1;
        const totalCols = output[0]?.length || 0;
        const sum = numericValues.reduce((a, b) => a + b, 0);
        const mean = numericValues.length ? sum / numericValues.length : 0;
        const min = numericValues.length ? Math.min(...numericValues) : 0;
        const max = numericValues.length ? Math.max(...numericValues) : 0;

        setStats({
          "Total Rows": totalRows,
          "Total Columns": totalCols,
          "Numeric Cells Found": numericValues.length,
          "Column Sum": sum.toFixed(2),
          "Column Mean (Average)": mean.toFixed(2),
          "Min Value": min,
          "Max Value": max,
        });
      }

      setResultData(output);
    } catch (err: any) {
      setError(err.message || "Spreadsheet processing error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadXlsx = () => {
    if (!resultData) return;
    const ws = XLSX.utils.aoa_to_sheet(resultData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([out as any], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    downloadBlob(blob, `${tool.slug}-result.xlsx`);
  };

  const downloadCsv = () => {
    if (!resultData) return;
    const csv = Papa.unparse(resultData);
    downloadText(csv, `${tool.slug}-result.csv`, "text/csv;charset=utf-8;");
  };

  const downloadJson = () => {
    if (jsonResult) {
      downloadText(jsonResult, `${tool.slug}-result.json`, "application/json");
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div className="rounded-2xl border-2 border-dashed border-slate-700/80 bg-slate-900/50 p-8 text-center transition-colors hover:border-emerald-500/60 hover:bg-slate-900/80">
        <input
          type="file"
          id="excel-upload"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label
          htmlFor="excel-upload"
          className="cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow">
            <Table className="w-8 h-8" />
          </div>
          <div>
            <span className="text-base font-semibold text-slate-200">
              Upload Excel Workbook (.xlsx, .xls) or CSV
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Supports millions of cells. Completely client-side and 100% private.
            </p>
          </div>
        </label>

        {file && (
          <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400">{file.name}</span>
            <span className="text-slate-500">({formatBytes(file.size)})</span>
            <span className="text-slate-500">| {tableData.length} rows loaded</span>
          </div>
        )}
      </div>

      {/* Options Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-emerald-400" />
          Spreadsheet Action Controls
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tableData.length > 0 && tableData[0] && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Target Column
              </label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              >
                {tableData[0].map((h, i) => (
                  <option key={i} value={i}>
                    Col {i + 1}: {String(h || `Column ${i + 1}`).substring(0, 20)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(tool.engineType === "sheet-sorter" || tool.slug.includes("sort")) && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Sort Direction
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              >
                <option value="asc">Ascending (A to Z / Low to High)</option>
                <option value="desc">Descending (Z to A / High to Low)</option>
              </select>
            </div>
          )}

          {(tool.engineType === "sheet-find-replace" || tool.slug.includes("replace")) && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Find Text
                </label>
                <input
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="Text to search..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Replace With
                </label>
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replacement value..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={processSpreadsheet}
            disabled={isProcessing || !file}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:opacity-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Run {tool.name}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Statistics view */}
      {stats && (
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-5">
          <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Calculated Statistics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <span className="text-[11px] text-slate-400 block">{k}</span>
                <span className="text-base font-bold text-slate-100 mt-1 block">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output / Results preview & downloads */}
      {(resultData || jsonResult) && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Processed Results Ready
              </h4>
              <p className="text-xs text-slate-400">
                {resultData ? `${resultData.length} rows processed` : "Structured JSON ready"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {resultData && (
                <>
                  <button
                    type="button"
                    onClick={downloadXlsx}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download XLSX
                  </button>
                  <button
                    type="button"
                    onClick={downloadCsv}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download CSV
                  </button>
                </>
              )}
              {jsonResult && (
                <button
                  type="button"
                  onClick={downloadJson}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download JSON
                </button>
              )}
            </div>
          </div>

          {/* Table Data Preview */}
          {resultData && resultData.length > 0 && (
            <div className="max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="sticky top-0 bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    {resultData[0]?.map((cell, idx) => (
                      <th key={idx} className="p-2.5 whitespace-nowrap">
                        {String(cell || `Col ${idx + 1}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {resultData.slice(1, 11).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 whitespace-nowrap max-w-xs truncate">
                          {String(cell ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {resultData.length > 11 && (
                <div className="p-2 text-center text-[11px] text-slate-500 border-t border-slate-800">
                  Showing first 10 rows of {resultData.length - 1} records. Download file for complete dataset.
                </div>
              )}
            </div>
          )}

          {jsonResult && (
            <pre className="max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
              {jsonResult}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelEngine;
