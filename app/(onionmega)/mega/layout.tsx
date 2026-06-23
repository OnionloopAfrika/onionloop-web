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
import { LogoutIcon, ProfileIcon, SettingsIcon, SupportIcon } from "@/components/icons/svgs";
import { ControlIconSolid } from '../../../components/icons/svgs';

interface ProductNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isDestructive: boolean;
}

const CASHIER_PRODUCT_NAV: ProductNavItem[] = [];
export const SUPER_ADMIN_PRODUCT_NAV: ProductNavItem[] = [
  {
    id: "/super-admin/profile/my-profile",
    label: "My Profile",
    icon: <ProfileIcon />,
    isDestructive: false,
  },
  {
    id: "/super-admin/profile/account-settings",
    label: "Account Settings",
    icon: <SettingsIcon />,
    isDestructive: false,
  },
  {
    id: "/super-admin/profile/permission-and-access-control",
    label: "Permission & Access Control",
    icon: <ControlIconSolid />,
    isDestructive: false,
  },
  {
    id: "/super-admin/profile/help-and-support",
    label: "Help & Support",
    icon: <SupportIcon />,
    isDestructive: false,
  },
  {
    id: "/super-admin/profile/logout",
    label: "Log Out",
    icon: <LogoutIcon />,
    isDestructive: true,
  },
]
const GROUP_MANAGER_PRODUCT_NAV: ProductNavItem[] = [];
const BRANCH_MANAGER_PRODUCT_NAV: ProductNavItem[] = [];

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
  let productNav: ProductNavItem[] = [];

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
      productNav = CASHIER_PRODUCT_NAV;
      break;
    case "GROUP_MANAGER":
      navSections = GROUP_MANAGER_NAV_SECTIONS;
      productNav = GROUP_MANAGER_PRODUCT_NAV;
      break;
    case "BRANCH_MANAGER":
      navSections = BRANCH_MANAGER_NAV_SECTIONS;
      productNav = BRANCH_MANAGER_PRODUCT_NAV;
      break;
    case "SUPER_ADMIN":
      navSections = SUPER_ADMIN_NAV_SECTIONS;
      productNav = SUPER_ADMIN_PRODUCT_NAV;
      break;
    default:
      navSections = SUPER_ADMIN_NAV_SECTIONS;
      productNav = SUPER_ADMIN_PRODUCT_NAV;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      <MegaSidebar navItems={navItems} navSections={navSections} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNav
          businessName="KFC Holdings"
          userName="HQ Admin"
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