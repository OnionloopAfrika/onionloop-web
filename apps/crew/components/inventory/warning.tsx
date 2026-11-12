"use client";

import { WarningProps } from "@/types/inventory/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MultiplyIcon } from "../icons/svgs";

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

export function TicketWarning({ icon, text, cancel, subText }: WarningProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div
      className={
        open
          ? "rounded-[4px] overflow-hidden w-full h-[104px] py-[20px] flex  bg-white cursor-pointer "
          : "hidden"
      }
    >
      <div className="w-[6px]  h-[104px] bg-[#04802E]"></div>
      <div className="h-full py-[12px] px-[16px]  w-full flex items-start gap-[10px]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="7.5"
            fill="#E7F6EC"
          />
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="7.5"
            stroke="#B5E3C4"
          />
          <path
            d="M12 14.6667V13.3333C12 11.1267 12.6667 9.33334 16 9.33334C19.3333 9.33334 20 11.1267 20 13.3333V14.6667"
            stroke="#04802E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.9987 20.3333C16.9192 20.3333 17.6654 19.5871 17.6654 18.6667C17.6654 17.7462 16.9192 17 15.9987 17C15.0782 17 14.332 17.7462 14.332 18.6667C14.332 19.5871 15.0782 20.3333 15.9987 20.3333Z"
            stroke="#04802E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.332 22.6667H12.6654C9.9987 22.6667 9.33203 22 9.33203 19.3333V18C9.33203 15.3333 9.9987 14.6667 12.6654 14.6667H19.332C21.9987 14.6667 22.6654 15.3333 22.6654 18V19.3333C22.6654 22 21.9987 22.6667 19.332 22.6667Z"
            stroke="#04802E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* {icon} */}
        <div className=" w-full h-full flex justify-between items-start">
          <div className="space-y-[4px]">
            <p className="font-[600] text-[16px] text-[#131313]">{text}</p>
            <p className="font-[400] text-[14px] text-[#363636]">{subText}</p>
          </div>

          <span onClick={() => setOpen(false)}>
            <MultiplyIcon className="w-[20px] h-[20px] text-[#131313]" />
          </span>
        </div>
      </div>
    </div>
  );
}
