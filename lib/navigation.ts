import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  MapPinned,
  User,
} from "lucide-react";

export const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Jobb för mig", href: "/for-you", icon: Sparkles },
  { label: "Jobb", href: "/jobs", icon: Briefcase },
  { label: "Nära dig", href: "/nearby", icon: MapPinned },
  { label: "Min profil", href: "/profile", icon: User },
];