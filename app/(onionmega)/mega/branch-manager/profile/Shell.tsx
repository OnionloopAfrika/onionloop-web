"use client";

import Header from "@/components/layouts/header";
import ProfileDropdown from "@/components/layouts/profile-dropdown";
import { useRouter } from "next/navigation";
import { BRANCH_MANAGER_PRODUCT_NAV } from "../../layout";

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

  return (
    <div className="w-full">
      <Header heading={heading} subHeading={subheading} />

      <main className="w-full flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:w-[380px] md:shrink-0">
          <ProfileDropdown
            businessName="{businessName}"
            userName="{userName}"
            avatarUrl="https://i.pravatar.cc/150?u=12"
            active={active}
            productNav={BRANCH_MANAGER_PRODUCT_NAV}
            className="w-full bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex-col items-center hidden md:flex"
          />
        </div>

        <div className="flex-1 min-w-0 w-full">{children}</div>
      </main>
    </div>
  );
}

export default ProfileLayout;
