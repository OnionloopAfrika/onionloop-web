"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import MegaSidebar from "@/components/layouts/mega-sidebar";
import { usePathname } from "next/navigation";
import { CREW_NAV_ITEMS } from "@/utils/constant/navigation";
import {
  ProfileIcon,
  SettingsIcon,
  StaffIconSolid,
  SupportIcon,
  LogoutIcon,
  PermissionIcon,
} from "@/components/icons/svgs";
interface ProductNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isDestructive: boolean;
}
export const productNav: ProductNavItem[] = [
  {
    id: "profile/my-profile",
    label: "My Profile",
    icon: <ProfileIcon />,
    isDestructive: false,
  },
  {
    id: "profile/account-settings",
    label: "Account Settings",
    icon: <SettingsIcon />,
    isDestructive: false,
  },
  {
    id: "profile/staff-app-settings",
    label: "Staff App Settings",
    icon: <StaffIconSolid />,
    isDestructive: false,
  },

  {
    id: "profile/permission-and-access-control",
    label: "Permission & Access Control",
    icon: <PermissionIcon />,
    isDestructive: false,
  },
  {
    id: "profile/help-and-support",
    label: "Help & Support",
    icon: <SupportIcon />,
    isDestructive: false,
  },
  {
    id: "profile/logout",
    label: "Log Out",
    icon: <LogoutIcon />,
    isDestructive: true,
  },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/auth/login") || pathname?.includes("/auth/logout");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      <MegaSidebar navItems={CREW_NAV_ITEMS} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNav
          businessName="Yetty Mama Lounge"
          userName="Margaret Ade"
          avatarUrl="https://i.pravatar.cc/150?u=12"
          messageCount={1}
          notificationCount={4}
          navItems={[]}
          showLogo={false}
          productNav={productNav}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
