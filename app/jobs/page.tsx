import { DashboardShell } from "@/components/layout/dashboard-shell";
import { JobsList } from "@/components/jobs/jobs-list";

export default function JobsPage() {
  return (
    <DashboardShell
      title="Jobb"
      subtitle="Utforska och filtrera jobb i en klassisk listvy."
    >
      <JobsList />
    </DashboardShell>
  );
}
