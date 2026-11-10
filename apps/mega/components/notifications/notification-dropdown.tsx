import { notis } from "@/lib/mockdata/notis";
import React, { Dispatch, SetStateAction } from "react";
import {
  CautionIcon,
  ReceiptEditIcon,
  ShieldIcon,
  WarningIcon,
} from "../icons/svgs";
import { useRouter, usePathname } from "next/navigation";
import { useSubdomain } from "@/hooks/useSubdomain";

const ROLES = [
  { label: "Cashier", value: "cashier" },
  { label: "Super Admin", value: "super-admin" },
  { label: "Group Manager", value: "group-manager" },
  { label: "Branch Manager", value: "branch-manager" },
];

type ToggleProp = {
  setNotificationDropDown: Dispatch<SetStateAction<boolean>>;
};

export default function NotificationDropdown({
  setNotificationDropDown,
}: ToggleProp) {
  const router = useRouter();
  const subdomain = useSubdomain();
  const pathname = usePathname();
  const currentRole =
    subdomain === "mega"
      ? ROLES.find((role) => pathname.includes(role.value))?.value ||
        "super-admin"
      : null;

  return (
    <div className="absolute top-[calc(100%+2px)] left-[-350px] right-0.5 z-50 flex max-h-[80vh] w-full min-w-[600px] max-w-[600px] flex-col items-center rounded-lg border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <p className="flex items-center gap-[8px] text-[20px] font-[600] text-[#131313]">
          Notification{" "}
          <span className="flex h-[20px] items-center justify-center rounded-full bg-[#F2BCBA] p-[10px] text-[12px] font-[500] text-[#CB1A14]">
            {notis.length} new
          </span>
        </p>

        <p className="text-[14px] font-normal text-[#024E44]">Mark all read</p>
      </div>

      <div className="max-h-[50vh] overflow-y-scroll w-full">
        {notis.slice(0, 3).map((items, i) => (
          <div
            onClick={() => {
              router.push(
                `/${subdomain}${currentRole ? `/${currentRole}` : ""}/notifications`,
              );
              setNotificationDropDown(false);
            }}
            key={i}
            className={`flex cursor-pointer items-center justify-between border-b border-b-[#C7C7C7] p-[12px] md:p-[18px] ${items.type === "out of stock" ? "bg-[#e7f6ec]" : "bg-white"}`}
          >
            <div className="flex flex-col gap-2 md:flex-row">
              {items.type === "out of stock" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#F2BCBA] md:h-[40px] md:w-[40px]">
                  <CautionIcon className="h-[15px] w-[15px] text-[#CB1A14] md:h-[25.81px] md:w-[25.81px]" />
                </div>
              )}

              {items.type === "warning" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#FBE2B7] md:h-[40px] md:w-[40px]">
                  <WarningIcon className="h-[15px] w-[15px] text-[#DD900D] md:h-[25.81px] md:w-[25.81px]" />
                </div>
              )}

              {items.type === "new sale" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#B5E3C4] md:h-[40px] md:w-[40px]">
                  <ShieldIcon className="h-[15px] w-[15px] text-[#04802E] md:h-[25.81px] md:w-[25.81px]" />
                </div>
              )}

              {items.type === "inventory" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#E7F6EC] md:h-[40px] md:w-[40px]">
                  <ReceiptEditIcon className="h-[15px] w-[15px] text-[#04802E] md:h-[25.81px] md:w-[25.81px]" />
                </div>
              )}

              <div className="space-y-1">
                <div className="">
                  <div className="flex items-center gap-[8px]">
                    <p className="text-[10px] font-bold text-[#000000] md:text-[16px] md:font-semibold">
                      {items.title}
                    </p>
                  </div>
                  <p className="text-[10px] font-[500] text-[#6C6C6C] md:text-[12px]">
                    {items.description}
                  </p>
                </div>
                <p className="hidden text-[12px] font-[400] text-[#6C6C6C] md:block">
                  {items.time}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-[34px] md:block">
              <p className="text-[10px] font-[400] text-[#6C6C6C] md:hidden">
                {items.time}
              </p>

              {items.type === "out of stock" && (
                <div className="h-[12px] w-[12px] rounded-full bg-[#04907E]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[64px] items-center justify-center">
        <p
          onClick={() =>
            router.push(
              `/${subdomain}${currentRole ? `/${currentRole}` : ""}/notifications`,
            )
          }
          className="cursor-pointer text-[16px] font-[600] text-[#024E44]"
        >
          View all notification
        </p>
      </div>
    </div>
  );
}
