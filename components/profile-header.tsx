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
        <p className="font-semibold text-base md:text-xl text-[#131313]">
          {title}
        </p>
        <p className="font-normal text-sm md:text-sm text-[#363636]">
          {subtitle}
        </p>
      </div>

      <div> {btn} </div>
    </div>
  );
}
