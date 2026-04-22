import { ProfileHeaderProps } from "@/types/profile/types";

export function ProfileHeader({ title, subtitle, btn }: ProfileHeaderProps) {
  return (
    <div className="flex justify-between pb-[24px]  border-b border-b-[#C7C7C7]">
      <div className="space-y-[6px]">
        <p className="font-[600] text-[24px] text-[#131313]">{title}</p>
        <p className="font-[400] text-[16px] text-[#363636]">{subtitle}</p>
      </div>

      <div> {btn} </div>
    </div>
  );
}
