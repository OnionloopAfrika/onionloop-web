import React from "react";
import { ProfileHeaderProps } from "@/types/profile/types";

export function ProfileHeader({
  title,
  subtitle,
  btn,
  className = " ",
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex justify-between pb-6  border-b border-b-[#C7C7C7] ${className}`}
    >
      <div className="max-md:space-y-[2px] space-y-[8px]">
        <p className="w-full text-base md:text-xl font-semibold">{title}</p>
        <p className="w-full text-sm md:text-sm text-[#6C6C6C]">{subtitle}</p>
      </div>

      <div>{btn}</div>
    </div>
  );
}
