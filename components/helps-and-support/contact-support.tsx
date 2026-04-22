import { CONTACT_GRID } from "@/lib/mockdata/contact-and-support";
import { ProfileHeader } from "../profile-header";

export function ContactSupport() {
  return (
    <div className="space-y-[40px] p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <ProfileHeader title="Contact Support" subtitle="We're here to help" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
        {CONTACT_GRID.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-[24px] items-center justify-center p-[16px] border border-gray-300 radius-[6px] min-h-[196px]"
            >
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#E7F6EC] rounded-[8px]">
                <Icon className="w-8 h-8 text-primary-color" />
              </div>

              <div className="text-center">
                <p className="font-[600] text-[20px] text-[#000000]">
                  {item.title}
                </p>
                <p className="font-[400] text-[14px] text-[#6C6C6C]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
