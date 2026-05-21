"use client";

import { notis } from "@/lib/mockdata/notis";
import React, { useState } from "react";
import {
  CautionIcon,
  FilterIcon,
  InventoryIcon,
  ReceiptEditIcon,
  SearchIcon,
  ShieldIcon,
  WarningIcon,
} from "../icons/svgs";
import Input from "../ui/input";

export function Notis() {
  const filters = ["All", "Read", "Unread"];
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-[16px]">
      <div className="  flex gap-[16px] items-center max-md:px-0 p-1 md:hidden">
        <div className="flex-1 overflow-hidden max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)]">
          <Input
            placeholder="Search"
            prefixicon={<SearchIcon color="#8A8A8A" />}
            className="!bg-white max-md:!bg-[#F7F7F7] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)] overflow-hidden"
          />
        </div>
        <button className="p-2 border border-[#C7C7C7] rounded-lg hover:bg-gray-50 h-12 w-12 flex items-center justify-center shrink-0 max-md:bg-[#F7F7F7] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)]">
          <FilterIcon className="text-gray-500" />
        </button>
      </div>

      <div className="w-full bg-white flex items-center py-[24px] px-[16px] max-md:py-[10px] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)]">
        <div className="p-[4px] h-[52px] p-[4px] flex gap-[24px]  overflow-x-auto no-scrollbar  bg-[#F7F7F7] max-md:bg-white w-fit max-md:w-full rounded-full max-md:w-full max-md:rounded-[8px] max-md:h-[48px] max-md:px-[12px]  ">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-[12px] py-[4px] rounded-full text-[16px] font-[500] whitespace-nowrap transition-colors flex justify-center items-center ${
                activeFilter === filter
                  ? "font-[700] bg-white text-[#024E44] max-md:bg-[#024E44]/10 min-w-[60px]  max-md:py-[10px] max-md:px-[12px]"
                  : "text-[#8A8A8A] min-w-[60px] hover:text-[#131313]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-[24px] w-full">
        {notis.map((items, i) => (
          <div
            key={i}
            className={`p-[24px] max-md:p-[12px] rounded-[12px]   flex justify-between items-center shadow-[0_0_15px_rgba(0,0,0,0.15)] ${items.type === "out of stock" ? "bg-[#e7f6ec]" : "bg-white"}`}
          >
            <div className="flex gap-[16px] max-md:flex-col">
              {items.type === "out of stock" && (
                <div className="w-[48px] h-[48px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#F2BCBA] flex justify-center items-center">
                  <CautionIcon className="text-[#CB1A14] max-md:w-[15px] max-md:h-[15px]" />
                </div>
              )}

              {items.type === "warning" && (
                <div className="w-[48px] h-[48px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#FBE2B7] flex justify-center items-center">
                  <WarningIcon className="text-[#DD900D] max-md:w-[15px] max-md:h-[15px]" />
                </div>
              )}

              {items.type === "new sale" && (
                <div className="w-[48px] h-[48px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#B5E3C4] flex justify-center items-center">
                  <ShieldIcon className="text-[#04802E] max-md:w-[15px] max-md:h-[15px]" />
                </div>
              )}

              {items.type === "inventory" && (
                <div className="w-[48px] h-[48px] max-md:w-[24px] max-md:h-[24px] rounded-[7.74px] bg-[#E7F6EC] flex justify-center items-center">
                  <ReceiptEditIcon className="text-[#04802E] max-md:w-[15px] max-md:h-[15px]" />
                </div>
              )}

              <div className="space-y-[16px]">
                <div className="space-y-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <p className="font-[600] max-md:font-[500] max-md:text6-[10px] text-[20px] text-[#000000]">
                      {items.title}
                    </p>

                    <span
                      className={`p-[8px] max-md:hidden  rounded-full font-[500] text-[10px]  ${items.status === "critical" ? " bg-[#F2BCBA] text-[#CB1A14]" : "bg-[#FBE2B7] text-[#DD900D]"}`}
                    >
                      {items.status}
                    </span>
                  </div>
                  <p className="max-md:text-[9px] font-[500] text-[16px] text-[#6C6C6C]">
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
    </div>
  );
}
