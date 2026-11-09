"use client";

import React from "react";
import { ToolItem } from "@/data/tools";
import PdfEngine from "./engines/PdfEngine";
import ExcelEngine from "./engines/ExcelEngine";
import DataEngine from "./engines/DataEngine";
import OcrEngine from "./engines/OcrEngine";
import DocumentEngine from "./engines/DocumentEngine";
import ImageEngine from "./engines/ImageEngine";
import TextEngine from "./engines/TextEngine";
import DeveloperEngine from "./engines/DeveloperEngine";
import CalculatorEngine from "./engines/CalculatorEngine";

interface ToolRendererProps {
  tool: ToolItem;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool }) => {
  switch (tool.category) {
    case "pdf":
    case "pdf-security":
      return <PdfEngine tool={tool} />;
    case "excel":
      return <ExcelEngine tool={tool} />;
    case "data":
      return <DataEngine tool={tool} />;
    case "ocr":
      return <OcrEngine tool={tool} />;
    case "document":
      return <DocumentEngine tool={tool} />;
    case "image":
      return <ImageEngine tool={tool} />;
    case "text":
      return <TextEngine tool={tool} />;
    case "developer":
      return <DeveloperEngine tool={tool} />;
    case "calculator":
      return <CalculatorEngine tool={tool} />;
    default:
      return <TextEngine tool={tool} />;
  }
};

export default ToolRenderer;
