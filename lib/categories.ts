import type { ComponentType } from "react";
import {
  Briefcase,
  HeartPulse,
  MonitorSmartphone,
  Palette,
  Calculator,
  Hammer,
  Store,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { CategoryTab, JobCategory } from "@/types/job";

export const categoryLabels: Record<CategoryTab, string> = {
  all: "Alla branscher",
  for_you: "Jobb för mig",
  tech: "Tech",
  sales_marketing: "Sälj & Marknad",
  healthcare: "Vård & Omsorg",
  design: "Design & Kreativt",
  finance_admin: "Ekonomi & Admin",
  industry: "Industri & Bygg",
  service: "Service & Handel",
};

export const categoryStyles: Record<JobCategory, string> = {
  tech: "border-blue-200 bg-blue-100/70 text-blue-700",
  sales_marketing: "border-emerald-200 bg-emerald-100/70 text-emerald-700",
  healthcare: "border-rose-200 bg-rose-100/70 text-rose-700",
  design: "border-violet-200 bg-violet-100/70 text-violet-700",
  finance_admin: "border-slate-300 bg-slate-100/70 text-slate-700",
  industry: "border-amber-300 bg-amber-100/70 text-amber-700",
  service: "border-cyan-200 bg-cyan-100/70 text-cyan-700",
};

export const categoryIcons: Record<
  CategoryTab,
  ComponentType<{ className?: string }>
> = {
  all: LayoutGrid,
  for_you: Sparkles,
  tech: MonitorSmartphone,
  sales_marketing: Briefcase,
  healthcare: HeartPulse,
  design: Palette,
  finance_admin: Calculator,
  industry: Hammer,
  service: Store,
};

export const categoryTabs: CategoryTab[] = [
  "all",
  "tech",
  "sales_marketing",
  "healthcare",
  "design",
  "finance_admin",
  "industry",
  "service",
];