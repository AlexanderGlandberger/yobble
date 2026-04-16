import { DashboardShell } from "../components/layout/dashboard-shell";
import { BubbleCanvas } from "../components/bubbles/bubble-canvas";

export default function HomePage() {
  return (
    <DashboardShell
      title="Dashboard"
      subtitle="Utforska jobb genom bubblor istället för listor."
    >
      <BubbleCanvas />
    </DashboardShell>
  );
}