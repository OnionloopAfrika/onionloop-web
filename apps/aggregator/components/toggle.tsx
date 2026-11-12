import { ToggleProps } from "@/types/profile/types";

export function Toggle({
  title,
  subtitle,
  toggle,
  className = "",
}: ToggleProps) {
  return (
    <div
      className={`${className} flex justify-between pb-[12px]  border-b border-b-[#C7C7C7]`}
    >
      <div className="space-y-[6px]">
        <p className="font-[500] text-[12px] text-[#131313]">{title}</p>
        <p className="font-[400] text-[10px] text-[#6C6C6C]">{subtitle}</p>
      </div>

      <div>{toggle} </div>
    </div>
  );
}
