"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import { usePathname } from "next/navigation";
import { CREW_NAV_ITEMS } from "@/utils/constant/navigation";
import { ProfileIcon, SettingsIcon, StaffIconSolid, SupportIcon, LogoutIcon } from "@/components/icons/svgs";
export const productNav = [
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
]
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
    <>
      <DashboardNav
        businessName="Yetty Mama Lounge"
        userName="Margaret Ade"
        avatarUrl="https://i.pravatar.cc/150?u=12"
        messageCount={1}
        notificationCount={4}
        navItems={CREW_NAV_ITEMS}
        productNav={productNav}
      />

      <main className="w-full bg-[#F7F7F7] p-4 md:p-6">{children}</main>
    </>
  );
}
