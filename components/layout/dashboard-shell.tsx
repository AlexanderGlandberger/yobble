import { Sidebar } from "./sidebar";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function DashboardShell({ title, subtitle, children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}