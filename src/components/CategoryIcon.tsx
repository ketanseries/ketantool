import React from "react";
import {
  FileText,
  ShieldCheck,
  Table,
  Database,
  ScanText,
  FileCode2,
  Image as ImageIcon,
  Type,
  Terminal,
  Calculator,
  Layers,
  Wrench,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  className = "w-5 h-5",
  size,
}) => {
  const iconProps = { className, ...(size ? { size } : {}) };

  switch (name) {
    case "FileText":
    case "pdf":
      return <FileText {...iconProps} />;
    case "ShieldCheck":
    case "pdf-security":
      return <ShieldCheck {...iconProps} />;
    case "Table":
    case "excel":
      return <Table {...iconProps} />;
    case "Database":
    case "data":
      return <Database {...iconProps} />;
    case "ScanText":
    case "ocr":
      return <ScanText {...iconProps} />;
    case "FileCode2":
    case "document":
      return <FileCode2 {...iconProps} />;
    case "Image":
    case "image":
      return <ImageIcon {...iconProps} />;
    case "Type":
    case "text":
      return <Type {...iconProps} />;
    case "Terminal":
    case "developer":
      return <Terminal {...iconProps} />;
    case "Calculator":
    case "calculator":
      return <Calculator {...iconProps} />;
    default:
      return <Wrench {...iconProps} />;
  }
};

export default CategoryIcon;
