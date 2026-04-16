"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function NavItem({ label, href, icon: Icon }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded px-3 py-2 ${
        active ? "bg-black text-white" : "text-gray-600"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}