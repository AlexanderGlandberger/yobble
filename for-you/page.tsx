import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ForYouCanvas } from "@/components/bubbles/for-you-canvas";

export default function ForYouPage() {
  return (
    <DashboardShell
      title="Jobb för mig"
      subtitle="Jobb som matchar din profil och dras mot dig."
    >
      <ForYouCanvas />
    </DashboardShell>
  );
}