import React from "react";
import { ProfileHeaderProps } from "@/types/profile/types";

export function ProfileHeader({
  title,
  subtitle,
  btn,
  className = "flex-col md:flex-row gap-4 justify-between items-start border-b-0 pb-[0px]"
,
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex justify-between pb-6  border-b border-b-[#C7C7C7] ${className}`}
    >
      <div className="max-md:space-y-[2px] space-y-[8px]">
        <p className="w-full text-[18px] md:text-xl font-semibold">{title}</p>
        <p className="w-full text-[14px] md:text-sm text-[#6C6C6C]">{subtitle}</p>
      </div>

      <div>{btn}</div>
    </div>
  );
}
