import { DashboardShell } from "@/components/layout/dashboard-shell";
import { NearbyMap } from "@/components/nearby/nearby-map";

export default function NearbyPage() {
  return (
    <DashboardShell
      title="Nära dig"
      subtitle="Se jobb runt din nuvarande plats och företagets adress på kartan."
    >
      <NearbyMap />
    </DashboardShell>
  );
}
