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
  tech: "border-blue-300/70 bg-gradient-to-br from-blue-100/80 via-sky-50/80 to-indigo-100/70 text-blue-800 shadow-blue-200/70",
  sales_marketing:
    "border-emerald-300/70 bg-gradient-to-br from-emerald-100/80 via-lime-50/80 to-green-100/70 text-emerald-800 shadow-emerald-200/70",
  healthcare:
    "border-rose-300/70 bg-gradient-to-br from-rose-100/80 via-pink-50/80 to-red-100/70 text-rose-800 shadow-rose-200/70",
  design:
    "border-violet-300/70 bg-gradient-to-br from-violet-100/80 via-fuchsia-50/80 to-purple-100/70 text-violet-800 shadow-violet-200/70",
  finance_admin:
    "border-slate-300/80 bg-gradient-to-br from-slate-100/80 via-zinc-50/80 to-slate-200/70 text-slate-800 shadow-slate-200/70",
  industry:
    "border-amber-300/75 bg-gradient-to-br from-amber-100/80 via-orange-50/80 to-yellow-100/70 text-amber-800 shadow-amber-200/70",
  service:
    "border-cyan-300/75 bg-gradient-to-br from-cyan-100/80 via-sky-50/80 to-teal-100/70 text-cyan-800 shadow-cyan-200/70",
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
