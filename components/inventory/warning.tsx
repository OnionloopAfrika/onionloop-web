import { WarningProps } from "@/types/inventory/type";

export function Warning({ icon, text, cancel }: WarningProps) {
  return (
    <div className="rounded-[4px] overflow-hidden w-full h-[59px] flex border border-[#DD900D] bg-[#f9eedc]">
      <div className="w-[6px] h-full bg-[#DD900D]"></div>{" "}
      <div className="h-full py-[12px] px-[16px]  w-full flex items-center gap-[10px]">
        {icon}{" "}
        <div className=" w-full h-full flex justify-between items-center">
          <p className="font-[600] text-[14px] text-[#DD900D]">{text}</p>

          {cancel}
        </div>
      </div>
    </div>
  );
}
