"use client";

import Header from "@/components/layouts/header";
import ProfileDropdown from "@/components/layouts/profile-dropdown";
import LogoutConfirmationModal from "@/components/layouts/logout-confirmation-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSubdomain } from "@/hooks/useSubdomain";
import { productNav } from "../layout";

function ProfileLayout({
  active,
  heading,
  subheading,
  children,
}: {
  active: string;
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const subdomain = useSubdomain();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    router.push(`/${subdomain ?? "aggregator"}/auth/login`);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <div className="shrink-0">
        <Header heading={heading} subHeading={subheading} />
      </div>

      <main className="mt-6 flex min-h-0 w-full flex-1 flex-col gap-8 overflow-hidden md:flex-row">
        <div className="w-full md:h-full md:w-[380px] md:shrink-0 md:overflow-hidden">
          <ProfileDropdown
            businessName="{businessName}"
            userName="{userName}"
            avatarUrl="https://i.pravatar.cc/150?u=12"
            active={active}
            productNav={productNav}
            onLogoutSelect={() => setIsLogoutModalOpen(true)}
            className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex-col items-center hidden md:flex"
          />
        </div>

        <div className="min-h-0 w-full flex-1 overflow-y-auto md:min-w-0">
          {children}
        </div>
      </main>

      <LogoutConfirmationModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={confirmLogout}
      />
    </div>
  );
}

export default ProfileLayout;
