import DashboardNav from "@/components/layouts/nav-bar";
import { productNav } from "../(onioncrew)/crew/layout";
import Link from "next/link";
import { OnionloopIcon } from "@/components/icons/svgs";

type HelpLayoutProps = {
  children: React.ReactNode;
};

export default function Helplayout({ children }: HelpLayoutProps) {
  return (
    <div className="bg-[#F7F7F7]">
      <div className="flex-1 flex flex-col min-w-0 border">
        <DashboardNav
          businessName="Yetty Mama Lounge"
          userName="Margaret Ade"
          avatarUrl="https://i.pravatar.cc/150?u=12"
          messageCount={1}
          notificationCount={4}
          navItems={[]}
          showLogo={true}
          productNav={productNav}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
