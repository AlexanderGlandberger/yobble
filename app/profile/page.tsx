import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProfilePage } from "@/components/profile/profile-page";

export default function MyProfilePage() {
  return (
    <DashboardShell
      title="Min profil"
      subtitle="Ladda upp dokument och följ dina ansökningar."
    >
      <ProfilePage />
    </DashboardShell>
  );
}
