import { ProfileHeaderProps } from "@/types/profile/types";

export function ProfileHeader({ title, subtitle, btn }: ProfileHeaderProps) {
  return (
    <div className="flex justify-between pb-6  border-b border-b-[#C7C7C7]">
      <div className="space-y-1.5">
        <p className="font-semibold text-xl text-[#131313]">{title}</p>
        <p className="font-normal text-sm text-[#363636]">{subtitle}</p>
      </div>

      <div> {btn} </div>
    </div>
  );
}
