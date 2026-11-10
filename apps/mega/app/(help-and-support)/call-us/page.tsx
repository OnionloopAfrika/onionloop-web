"use client";

import { EndCall, MuteIcon, RecordIcon } from "@/components/icons/svgs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Image from "next/image";
import React, { useState } from "react";

export default function page() {
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="space-y-[40px]">
      <Breadcrumb firstTab="Help & Support" secondTab="Call Us" />

      <div className=" h-screen flex justify-center items-center ">
        <div className=" gap-[16px] flex flex-col items-center ">
          <Image src="/images/ben.svg" alt="Call Us" width={185} height={131} />{" "}
          {!isCalling && (
            <>
              <p className="font-[600] text-[20px] text-[#363636] text-center">
                Speak directly with our support team for <br /> urgent matters.
              </p>

              <p className="font-[500] text-[14px] text-[#6C6C6C]">
                Available between{" "}
                <span className="text-[#363636]">8:00 AM</span> to{" "}
                <span className="text-[#363636]">6:00 PM</span> daily.
              </p>

              <p className="font-[400] text-[14px] text-[#6C6C6C]">
                Tap the number to call now.{" "}
              </p>

              <span
                onClick={() => setIsCalling(true)}
                className="text-[#04907E] font-[600] text-[16px] cursor-pointer"
              >
                0800CALLSUPORT
              </span>
            </>
          )}
          {isCalling && (
            <div className=" flex flex-col justify-between items-center space-y-[20px] gap-[19px]">
              <div className="space-y-[11px] text-center">
                <p className="font-[600] text-[32px] text-[#131313]">
                  Admin Admin
                </p>

                <p className="text-[#04907E] font-[600] text-[16px] cursor-pointer">
                  0800CALLSUPORT
                </p>

                <span className="bg-[#C7C7C79E]   min-w-[53px] h-[24px] px-[10px] rounded-full font-[400] text-[14px] text-[#131313]">
                  01:38
                </span>
              </div>
              <div className="flex  items-center w-[80%]  justify-between ">
                <div className="w-[44px] h-[44px] p-[10px] rounded-full bg-white flex justify-center items-center shrink-0">
                  <RecordIcon />
                </div>

                <div className="w-[44px] h-[44px] p-[10px] rounded-full bg-white flex justify-center items-center">
                  <MuteIcon />
                </div>

                <EndCall />
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
