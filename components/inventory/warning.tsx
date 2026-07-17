"use client";

import { WarningProps } from "@/types/inventory/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Warning({ icon, text, cancel }: WarningProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/crew/inventory/out-of-stock")}
      className={
        open
          ? "rounded-[4px] overflow-hidden w-full h-[59px] flex border border-[#DD900D] bg-[#f9eedc] cursor-pointer"
          : "hidden"
      }
    >
      <div className="w-[6px] h-full bg-[#DD900D]"></div>
      <div className="h-full py-[12px] px-[16px]  w-full flex items-center gap-[10px]">
        {icon}{" "}
        <div className=" w-full h-full flex justify-between items-center">
          <p className="font-[600] text-[14px] text-[#DD900D]">{text}</p>
          <span onClick={() => setOpen(false)}>{cancel}</span>
        </div>
      </div>
    </div>
  );
}
