"use client";

import DashboardNav from "@/components/layouts/nav-bar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isMessagesPage = pathname.startsWith("/messages");

  return (
    <>
      <DashboardNav
        activeKey="overview"
        businessName="Yetty Mama Lounge"
        userName="Margaret Adekola"
        avatarUrl="https://i.pravatar.cc/150?u=12"
        messageCount={1}
        notificationCount={4}
      />

      <main
        className={`w-full bg-[#F7F7F7] ${isMessagesPage ? "" : "p-4 md:p-6"}`}
      >
        {children}
      </main>
    </>
  );
}
