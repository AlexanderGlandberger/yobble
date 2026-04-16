"use client";

import clsx from "clsx";
import { CategoryTab } from "@/types/job";
import { categoryIcons, categoryLabels, categoryTabs } from "@/lib/categories";

type CategoryTabsProps = {
  activeTab: CategoryTab;
  onChange: (tab: CategoryTab) => void;
};

export function CategoryTabs({
  activeTab,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categoryTabs.map((tab) => {
        const Icon = categoryIcons[tab];
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{categoryLabels[tab]}</span>
          </button>
        );
      })}
    </div>
  );
}