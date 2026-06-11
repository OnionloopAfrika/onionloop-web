"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import MegaSidebar from "@/components/layouts/mega-sidebar";
import { usePathname } from "next/navigation";
import {
  CASHIER_NAV_ITEMS,
  SUPER_ADMIN_NAV_SECTIONS,
  GROUP_MANAGER_NAV_SECTIONS,
  NavItem,
  NavSection,
} from "@/utils/constant/navigation";
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

  let navItems: NavItem[] | undefined = undefined;
  let navSections: NavSection[] | undefined = undefined;

  if (pathname?.includes("/mega/cashier")) {
    navItems = CASHIER_NAV_ITEMS;
  } else if (pathname?.includes("/mega/group-manager")) {
    navSections = GROUP_MANAGER_NAV_SECTIONS;
  } else if (
    pathname?.includes("/mega/super-admin") ||
    pathname === "/mega/dashboard"
  ) {
    navSections = SUPER_ADMIN_NAV_SECTIONS;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      <MegaSidebar navItems={navItems} navSections={navSections} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNav
          businessName="Yetty Mama Lounge"
          userName="Margaret Adekola"
          avatarUrl="https://i.pravatar.cc/150?u=12"
          messageCount={1}
          notificationCount={4}
          navItems={[]}
          showLogo={false}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
