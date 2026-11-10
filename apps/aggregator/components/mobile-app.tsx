import { MobileProps } from "@/types/profile/types";
import Image from "next/image";

export function MobileApp({
  avatar,
  fullName,
  role,
  btn,
  className = "",
}: MobileProps) {
  return (
    <div
      className={`${className} flex justify-between items-center py-[12px] border-b border-b-[#C7C7C7]`}
    >
      <div className="flex gap-[16px]">
        <Image width={48} height={48} src={avatar} alt="phone-owner" />
        <div className="space-y-[2px]">
          <p className="font-[500] text-[16px] text-[#131313]">{fullName}</p>
          <p className="font-[500] text-[14px] text-[#6C6C6C]">{role}</p>
        </div>
      </div>

      <div>{btn}</div>
    </div>
  );
}
