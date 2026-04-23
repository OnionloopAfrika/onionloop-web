import { CONTACT_GRID } from "@/lib/mockdata/contact-and-support";
import { ProfileHeader } from "../profile-header";

export function ContactSupport() {
  return (
    <div className="space-y-10 p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white">
      <ProfileHeader title="Contact Support" subtitle="We're here to help" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CONTACT_GRID.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-6 items-center justify-center p-4 border border-gray-300 radius-[6px] min-h-49"
            >
              <div className="w-10 h-10 flex justify-center items-center bg-[#E7F6EC] rounded-lg">
                <Icon className="w-6 h-6 text-[#04802E]" />
              </div>

              <div className="text-center">
                <p className="font-semibold text-[20px] text-[#000000]">
                  {item.title}
                </p>
                <p className="font-normal text-[14px] text-[#6C6C6C]">
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
