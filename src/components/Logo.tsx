"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "navbar" | "footer" | "mobile" | "loading" | "hero" | "icon";
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const LogoSvg: React.FC<{ size?: number; animated?: boolean }> = ({
  size = 40,
  animated = false,
}) => {
  const content = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="logoBlueCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="logoVioletBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="logoCyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Backdrop Glow */}
      <circle cx="128" cy="128" r="85" fill="#3B82F6" opacity="0.2" filter="url(#logoGlow)" />

      {/* Outer Rounded Shield */}
      <rect
        x="24"
        y="24"
        width="208"
        height="208"
        rx="48"
        fill="#0B1020"
        stroke="url(#logoBlueCyan)"
        strokeWidth="4"
        strokeOpacity="0.6"
      />

      {/* Inner Subtle Grid Accent */}
      <rect
        x="28"
        y="28"
        width="200"
        height="200"
        rx="44"
        fill="none"
        stroke="url(#logoVioletBlue)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeOpacity="0.4"
      />

      {/* 'K' Left Pillar */}
      <path d="M72 64 H94 V192 H72 Z" fill="url(#logoBlueCyan)" rx="4" />

      {/* 'K' Top-Right Diagonal Wing */}
      <path d="M94 128 L142 74 H170 L118 132 Z" fill="url(#logoCyanViolet)" />

      {/* 'K' Bottom-Right Diagonal Leg */}
      <path d="M110 122 L168 192 H140 L94 136 Z" fill="url(#logoVioletBlue)" />

      {/* 'T' Top Bar */}
      <path d="M140 64 H202 V84 H140 Z" fill="url(#logoBlueCyan)" rx="2" />

      {/* 'T' Vertical Stem Connecting Down */}
      <path d="M166 84 H186 V172 H166 Z" fill="url(#logoVioletBlue)" rx="2" />

      {/* 3D Geometric Energy Node / Core Dot */}
      <circle cx="176" cy="186" r="6" fill="#22D3EE" filter="url(#logoGlow)" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export const Logo: React.FC<LogoProps> = ({
  variant = "navbar",
  showTagline = false,
  className = "",
  onClick,
}) => {
  if (variant === "loading") {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-xl animate-pulse" />
          <LogoSvg size={72} />
        </motion.div>
        <div className="text-center">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">Ketan</span>
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Tools
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
            Powerful Tools. Simple Solutions.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "icon") {
    return <LogoSvg size={36} />;
  }

  const iconSizes = {
    navbar: 38,
    mobile: 34,
    footer: 44,
    hero: 64,
  };

  const textSizes = {
    navbar: "text-xl",
    mobile: "text-lg",
    footer: "text-2xl",
    hero: "text-4xl",
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
      aria-label="KetanTools Homepage"
    >
      <LogoSvg size={iconSizes[variant] || 38} />
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight leading-none ${textSizes[variant] || "text-xl"}`}>
          <span className="text-white group-hover:text-slate-100 transition-colors">Ketan</span>
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Tools
          </span>
        </div>
        {(showTagline || variant === "footer") && (
          <span className="text-[11px] font-medium text-slate-400 tracking-wide mt-1">
            Powerful Tools. Simple Solutions.
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
