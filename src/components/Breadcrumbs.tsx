"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-xs sm:text-sm text-slate-400 overflow-x-auto py-2 ${className}`}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-200 font-medium whitespace-nowrap truncate max-w-[200px] sm:max-w-none">
                {item.name}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

