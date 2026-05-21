import { notis } from "@/lib/mockdata/notis";
import React, { Dispatch, SetStateAction } from "react";
import {
  CautionIcon,
  ReceiptEditIcon,
  ShieldIcon,
  WarningIcon,
} from "../icons/svgs";
import { useRouter } from "next/navigation";

type ToggleProp = {
  setNotificationDropDown: Dispatch<SetStateAction<boolean>>;
};

export default function NotificationDropdown({
  setNotificationDropDown,
}: ToggleProp) {
  const router = useRouter();

  return (
    <div className=" max-h-[80vh]  absolute top-[calc(100%+2px)] left-[-500px] right-0.5 max-w-[600px] min-w-[600px] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100  flex flex-col items-center z-50">
      <div className="w-full flex justify-between items-center p-[24px] h-[110px]">
        <p className="font-[600] text-[24px] text-[#131313] flex items-center gap-[8px]">
          Notification{" "}
          <span className="bg-[#F2BCBA] p-[10px] rounded-full font-[500] text-[12px] text-[#CB1A14] h-[20px] flex justify-center items-center">
            {notis.length} new
          </span>
        </p>

        <p className="font-[600] text-[14px] text-[#024E44]">Mark all read</p>
      </div>

      <div className="max-h-[60vh]  overflow-y-scroll">
        {notis.slice(0, 3).map((items, i) => (
          <div
            onClick={() => {
              router.push("/notifications");
              setNotificationDropDown(false);
            }}
            key={i}
            className={`p-[24px] max-md:p-[12px] cursor-pointer  flex justify-between items-center border-b border-b-[#C7C7C7]  ${items.type === "out of stock" ? "bg-[#e7f6ec]" : "bg-white"}`}
          >
            <div className="flex gap-[16px] max-md:flex-col">
              {items.type === "out of stock" && (
                <div className="w-[40px] h-[40px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#F2BCBA] flex justify-center items-center">
                  <CautionIcon className="text-[#CB1A14] max-md:w-[15px] max-md:h-[15px] w-[25.81px] h-[25.81px]" />
                </div>
              )}

              {items.type === "warning" && (
                <div className="w-[40px] h-[40px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#FBE2B7] flex justify-center items-center">
                  <WarningIcon className="text-[#DD900D] max-md:w-[15px] max-md:h-[15px] w-[25.81px] h-[25.81px]" />
                </div>
              )}

              {items.type === "new sale" && (
                <div className="w-[40px] h-[40px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#B5E3C4] flex justify-center items-center">
                  <ShieldIcon className="text-[#04802E] max-md:w-[15px] max-md:h-[15px] w-[25.81px] h-[25.81px]" />
                </div>
              )}

              {items.type === "inventory" && (
                <div className="w-[40px] h-[40px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#E7F6EC] flex justify-center items-center">
                  <ReceiptEditIcon className="text-[#04802E] max-md:w-[15px] max-md:h-[15px] w-[25.81px] h-[25.81px]" />
                </div>
              )}

              <div className="space-y-[16px]">
                <div className="space-y-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <p className="font-[600] max-md:font-[500] max-md:text6-[10px] text-[20px] text-[#000000]">
                      {items.title}
                    </p>
                  </div>
                  <p className="max-md:text-[9px] font-[500] text-[14px] text-[#6C6C6C]">
                    {items.description}
                  </p>
                </div>
                <p className="font-[400] text-[14px] text-[#6C6C6C] max-md:hidden">
                  {items.time}
                </p>
              </div>
            </div>

            <div className=" max-md:flex max-md:flex-col max-md:items-end max-md:gap-[34px]">
              <p className="font-[400] text-[14px] text-[#6C6C6C] md:hidden max-md:text-[10px]">
                {items.time}
              </p>

              {items.type === "out of stock" && (
                <div className="w-[12px] h-[12px] rounded-full bg-[#04907E]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center h-[64px]">
        <p
          onClick={() => router.push("/notifications")}
          className="font-[600] text-[16px] text-[#024E44] cursor-pointer"
        >
          View all notification
        </p>
      </div>
    </div>
  );
}
