"use client"

import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

export function Billing() {
  const router = useRouter()
  return (
    <div className="space-y-10 p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white">
      <ProfileHeader
        title="Billing & Plan"
        subtitle="Your current subscription"
      />

      <div className="space-y-6">
        <div className="p-5 rounded-sm bg-[#E7F6EC] flex justify-between items-center">
          <div className="space-y-1">
            <p className="font-semibold text-[16px] text-[#04802E]">
              Business Plan
            </p>
            <p className="font-normal text-[14px] text-[#6C6C6C]">
              Up to 15 staff · Unlimited inventory · Priority support
            </p>
          </div>
          <div className="space-y-1.25">
            <p className="font-medium text-[14px] text-[#131313]">#15,000/mo</p>
            <span className="rounded-full p-0.75 bg-[#04802E] font-normal text-[12.64px] text-white">
              Active
            </span>
          </div>
        </div>

        <div className="flex  ">
          <div className="flex gap-2.5">
            <Button variant="outline" size="md" onClick={() => router.push("/profile/account-settings/manage-billing")}>
              Manage Billing
            </Button>
            <Button variant="outline" size="md" onClick={() => router.push("/profile/account-settings/upgrade-plan")}>
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
