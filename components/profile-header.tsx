import { ProfileHeaderProps } from "@/types/profile/types";

export function ProfileHeader({
  title,
  subtitle,
  btn,
  className = "",
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex justify-between pb-6  border-b border-b-[#C7C7C7] ${className}`}
    >
      <div className="space-y-[6px] max-md:space-y-[2px]">
        <p className="font-semibold text-[24px] text-[#131313] max-md:text-[14px]">
          {title}
        </p>
        <p className="font-normal text-[18px] text-[#363636] max-md:font-[500] max-md:text-[10px]">
          {subtitle}
        </p>
      </div>

      <div> {btn} </div>
    </div>
  );
}
