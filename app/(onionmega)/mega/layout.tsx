"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import MegaSidebar from "@/components/layouts/mega-sidebar";
import { usePathname } from "next/navigation";
import {
  CASHIER_NAV_ITEMS,
  SUPER_ADMIN_NAV_SECTIONS,
  GROUP_MANAGER_NAV_SECTIONS,
  BRANCH_MANAGER_NAV_SECTIONS,
  NavItem,
  NavSection,
} from "@/utils/constant/navigation";
import { ROLE } from "@/utils/constant/const";

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

  const activeRole = pathname?.includes("/mega/cashier")
    ? "CASHIER"
    : pathname?.includes("/mega/group-manager")
      ? "GROUP_MANAGER"
      : pathname?.includes("/mega/branch-manager")
        ? "BRANCH_MANAGER"
        : pathname?.includes("/mega/super-admin")
          ? "SUPER_ADMIN"
          : ROLE;

  switch (activeRole) {
    case "CASHIER":
      navItems = CASHIER_NAV_ITEMS;
      break;
    case "GROUP_MANAGER":
      navSections = GROUP_MANAGER_NAV_SECTIONS;
      break;
    case "BRANCH_MANAGER":
      navSections = BRANCH_MANAGER_NAV_SECTIONS;
      break;
    case "SUPER_ADMIN":
      navSections = SUPER_ADMIN_NAV_SECTIONS;
      break;
    default:
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
