"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  RefreshCw,
  Sliders,
  RotateCw,
  FlipHorizontal,
  Sparkles,
  Maximize2,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";
import { ToolItem } from "@/data/tools";
import { downloadBlob, downloadText, formatBytes } from "@/lib/utils";

interface ImageEngineProps {
  tool: ToolItem;
}

export const ImageEngine: React.FC<ImageEngineProps> = ({ tool }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sliders and options
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flippedH, setFlippedH] = useState(false);
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [filterBrightness, setFilterBrightness] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterGrayscale, setFilterGrayscale] = useState(0);
  const [filterBlur, setFilterBlur] = useState(0);
  const [watermarkText, setWatermarkText] = useState("KetanTools");
  const [base64Output, setBase64Output] = useState("");
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Set default format based on tool slug
  useEffect(() => {
    if (tool.slug.includes("to-png")) setTargetFormat("image/png");
    else if (tool.slug.includes("to-webp")) setTargetFormat("image/webp");
    else if (tool.slug.includes("to-jpg")) setTargetFormat("image/jpeg");
    if (tool.slug.includes("grayscale")) setFilterGrayscale(100);
  }, [tool.slug]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageSrc(dataUrl);
        setProcessedSrc(null);
        setProcessedBlob(null);

        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          setOriginalAspectRatio(img.width / img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (aspectRatioLocked && originalAspectRatio) {
      setHeight(Math.round(val / originalAspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (aspectRatioLocked && originalAspectRatio) {
      setWidth(Math.round(val * originalAspectRatio));
    }
  };

  const processImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      const targetW = width || img.width;
      const targetH = height || img.height;

      // Handle rotation dimensions
      if (rotation === 90 || rotation === 270) {
        canvas.width = targetH;
        canvas.height = targetW;
      } else {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (flippedH) ctx.scale(-1, 1);

      // Filters
      let filterStr = `brightness(${filterBrightness}%) contrast(${filterContrast}%)`;
      if (filterGrayscale > 0) filterStr += ` grayscale(${filterGrayscale}%)`;
      if (filterBlur > 0) filterStr += ` blur(${filterBlur}px)`;
      ctx.filter = filterStr;

      const drawW = rotation === 90 || rotation === 270 ? targetH : targetW;
      const drawH = rotation === 90 || rotation === 270 ? targetW : targetH;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Watermark
      if (tool.slug.includes("watermark") && watermarkText) {
        ctx.font = "bold 32px sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.textAlign = "center";
        ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 40);
      }

      // Palette extraction if requested
      if (tool.slug.includes("palette")) {
        const pData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colors: string[] = [];
        const step = Math.floor(pData.length / 40);
        for (let i = 0; i < pData.length; i += step * 4) {
          const r = pData[i].toString(16).padStart(2, "0");
          const g = pData[i + 1].toString(16).padStart(2, "0");
          const b = pData[i + 2].toString(16).padStart(2, "0");
          colors.push(`#${r}${g}${b}`.toUpperCase());
        }
        setExtractedPalette(Array.from(new Set(colors)).slice(0, 6));
      }

      // Export
      const outQuality = quality / 100;
      const dataUrl = canvas.toDataURL(targetFormat, outQuality);
      setProcessedSrc(dataUrl);
      setBase64Output(dataUrl);

      canvas.toBlob(
        (blob) => {
          if (blob) setProcessedBlob(blob);
          setIsProcessing(false);
        },
        targetFormat,
        outQuality
      );
    };
  };

  const handleDownload = () => {
    if (!processedBlob) return;
    const ext = targetFormat === "image/png" ? "png" : targetFormat === "image/webp" ? "webp" : "jpg";
    downloadBlob(processedBlob, `${tool.slug}-result.${ext}`);
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div className="rounded-2xl border-2 border-dashed border-slate-700/80 bg-slate-900/50 p-8 text-center transition-colors hover:border-pink-500/60 hover:bg-slate-900/80">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-glow">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <span className="text-base font-semibold text-slate-200">
              Upload Image (JPG, PNG, WebP, GIF, SVG)
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Supports ultra-high resolution images. Processed entirely inside your browser.
            </p>
          </div>
        </label>

        {imageFile && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-1.5 text-xs text-slate-300">
            <span className="text-pink-400 font-semibold">{imageFile.name}</span>
            <span className="text-slate-500">({formatBytes(imageFile.size)})</span>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-pink-400" />
              Adjustments & Settings
            </h4>

            {/* Quality Slider (Compression) */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Output Quality (Compression)</span>
                <span className="font-semibold text-slate-200">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            {/* Dimensions (Resizing) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100"
                />
              </div>
            </div>

            {/* Format selection */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Format</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                <option value="image/jpeg">JPG (Standard Web Photo)</option>
                <option value="image/png">PNG (Lossless & Transparency)</option>
                <option value="image/webp">WebP (Next-Gen Ultra Compact)</option>
              </select>
            </div>

            {/* Rotation & Flip */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                <RotateCw className="w-3.5 h-3.5" /> Rotate 90° ({rotation}°)
              </button>
              <button
                type="button"
                onClick={() => setFlippedH(!flippedH)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                <FlipHorizontal className="w-3.5 h-3.5" /> Flip {flippedH ? "On" : "Off"}
              </button>
            </div>

            <button
              type="button"
              onClick={processImage}
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Render & Apply Adjustments
            </button>
          </div>

          {/* Live Preview Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-semibold text-slate-200">
                  {processedSrc ? "Processed Output Preview" : "Original Image Preview"}
                </span>
                {processedBlob && (
                  <span className="text-emerald-400 font-semibold">
                    New Size: {formatBytes(processedBlob.size)}
                  </span>
                )}
              </div>

              <div className="relative aspect-video max-h-72 w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processedSrc || imageSrc}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Dominant Palette */}
              {extractedPalette.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-medium">Extracted Color Palette:</div>
                  <div className="flex items-center gap-2">
                    {extractedPalette.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(color)}
                      >
                        <div
                          className="h-8 w-8 rounded-lg shadow-sm border border-slate-700"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] font-mono text-slate-400">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {processedBlob && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 shadow-glow"
                >
                  <Download className="w-4 h-4" /> Download Processed Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEngine;
