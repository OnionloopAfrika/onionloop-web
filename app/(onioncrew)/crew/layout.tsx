"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import { usePathname } from "next/navigation";
import { CREW_NAV_ITEMS } from "@/utils/constant/navigation";

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
        userName="Margaret Adekola"
        avatarUrl="https://i.pravatar.cc/150?u=12"
        messageCount={1}
        notificationCount={4}
        navItems={CREW_NAV_ITEMS}
      />

      <main className="w-full bg-[#F7F7F7] p-4 md:p-6">{children}</main>
    </>
  );
}
