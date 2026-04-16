"use client";

import { navigation } from "@/lib/navigation";
import { NavItem } from "./nav-item";

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="mb-6 text-xl font-bold">Yobble</div>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}