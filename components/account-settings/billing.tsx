import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";

export function Billing() {
  return (
    <div className="space-y-[40px] p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <ProfileHeader
        title="Billing & Plan"
        subtitle="Your current subscription"
      />

      <div className="space-y-[24px]">
        <div className="p-[20px] rounded-[4px] bg-[#E7F6EC] flex justify-between items-center">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[16px] text-[#04802E]">
              Business Plan
            </p>
            <p className="font-[400] text-[14px] text-[#6C6C6C]">
              Up to 15 staff · Unlimited inventory · Priority support
            </p>
          </div>
          <div className="space-y-[5px]">
            <p className="font-[500] text-[14px] text-[#131313]">#15,000/mo</p>
            <span className="rounded-full p-[3px] bg-[#04802E] font-[400] text-[12.64px] text-white">
              Active
            </span>
          </div>
        </div>

        <div className="flex  ">
          <div className="flex gap-[10px]">
            <Button variant="outline" size="msg">
              Manage Billing
            </Button>
            <Button variant="outline" size="msg">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
