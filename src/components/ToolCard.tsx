"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import CategoryIcon from "./CategoryIcon";
import { ToolItem } from "@/data/tools";

interface ToolCardProps {
  tool: ToolItem;
  featured?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full"
    >
      <Link
        href={`/tools/${tool.slug}`}
        className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-850/80 hover:shadow-glow ${
          featured ? "ring-1 ring-blue-500/30" : ""
        }`}
      >
        {/* Subtle Ambient Glow on Hover */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

        <div>
          {/* Header row: Icon & Category badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all duration-300">
              <CategoryIcon name={tool.category} className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-1.5">
              {tool.popular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}
              <span className="rounded-full bg-slate-800/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-400 border border-slate-700/50">
                #{tool.id}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Footer info: Category and direct action indicator */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px] font-medium text-slate-400 truncate max-w-[140px]">
            {tool.categoryName}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 opacity-0 transition-all duration-200 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0">
            Open Tool
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
