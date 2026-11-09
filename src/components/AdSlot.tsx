"use client";

import React, { useEffect, useRef } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = "default-slot",
  format = "auto",
  responsive = true,
  className = "",
  label = "ADVERTISEMENT",
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && adsenseClientId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Suppress adsbygoogle push error during development
      }
    }
  }, [adsenseClientId]);

  return (
    <div
      className={`my-8 mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 text-center backdrop-blur-sm ${className}`}
      ref={adRef}
    >
      <div className="mb-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
        {label}
      </div>
      
      {adsenseClientId ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      ) : (
        <div className="flex h-24 sm:h-28 w-full items-center justify-center rounded-lg border border-dashed border-slate-700/50 bg-slate-950/40 px-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span>AdSense Responsive Placement ({slotId})</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSlot;

