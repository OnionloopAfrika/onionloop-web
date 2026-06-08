"use client"

import Header from "@/components/layouts/header";
import ProfileDropdown from "@/components/layouts/profile-dropdown";
import { useRouter } from "next/navigation";

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

      <main className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
        <div className="w-full col-span-1">
          <ProfileDropdown
            businessName="{businessName}"
            userName="{userName}"
            avatarUrl="https://i.pravatar.cc/150?u=12"
            active={active}
            className="w-85 bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex-col items-center z-50 hidden md:flex"
          />
        </div>
        <div className="col-span-3 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
