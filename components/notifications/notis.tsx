"use client";

import { notis } from "@/lib/mockdata/notis";
import React, { useState } from "react";
import {
  CautionIcon,
  FilterIcon,
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
      <div className="flex items-center gap-[16px] px-0 p-1 md:hidden">
        <div className="flex-1 overflow-hidden shadow-[0_0_5px_rgba(0,0,0,0.15)]">
          <Input
            placeholder="Search"
            prefixicon={<SearchIcon color="#8A8A8A" />}
            className="!bg-[#F7F7F7] shadow-[0_0_5px_rgba(0,0,0,0.15)] overflow-hidden"
          />
        </div>
        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#C7C7C7] bg-[#F7F7F7] p-2 shadow-[0_0_5px_rgba(0,0,0,0.15)] hover:bg-gray-50">
          <FilterIcon className="text-gray-500" />
        </button>
      </div>

      <div className="w-full bg-white py-[10px] px-[16px] shadow-[0_0_5px_rgba(0,0,0,0.15)] md:py-[24px] rounded-2xl">
        <div className="flex w-full gap-[24px] overflow-x-auto rounded-[8px] bg-white p-1 no-scrollbar md:w-fit md:rounded-full md:bg-[#F7F7F7]">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`p-3 flex items-center justify-center rounded-[40px] text-[16px] font-[500] whitespace-nowrap transition-colors ${activeFilter === filter
                  ? "min-w-[60px] bg-[#024E44]/10 font-[700] text-[#024E44] md:bg-white md:py-[4px]"
                  : "min-w-[60px] text-[#8A8A8A] hover:text-[#131313]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full space-y-[24px]">
        {notis.map((items, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-[12px] p-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] md:p-[24px] ${items.type === "out of stock" ? "bg-[#e7f6ec]" : "bg-white"}`}
          >
            <div className="flex flex-col gap-[16px] md:flex-row">
              {items.type === "out of stock" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#F2BCBA] md:h-[48px] md:w-[48px]">
                  <CautionIcon className="h-[15px] w-[15px] text-[#CB1A14] md:h-[24px] md:w-[24px]" />
                </div>
              )}

              {items.type === "warning" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#FBE2B7] md:h-[48px] md:w-[48px]">
                  <WarningIcon className="h-[15px] w-[15px] text-[#DD900D] md:h-[24px] md:w-[24px]" />
                </div>
              )}

              {items.type === "new sale" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#B5E3C4] md:h-[48px] md:w-[48px]">
                  <ShieldIcon className="h-[15px] w-[15px] text-[#04802E]  md:h-[24px] md:w-[24px]" />
                </div>
              )}

              {items.type === "inventory" && (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[7.74px] bg-[#E7F6EC] md:h-[48px] md:w-[48px]">
                  <ReceiptEditIcon className="h-[15px] w-[15px] text-[#04802E] md:h-[24px] md:w-[24px]" />
                </div>
              )}

              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-[8px]">
                    <p className="text-[10px] font-[500] text-[#000000] md:text-[16px] md:font-[600]">
                      {items.title}
                    </p>

                    <span
                      className={`hidden h-[18px] items-center justify-center rounded-full p-[8px] text-[10px] font-[500] md:flex ${items.status === "critical" ? " bg-[#F2BCBA] text-[#CB1A14]" : "bg-[#FBE2B7] text-[#DD900D]"}`}
                    >
                      {items.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-[500] text-[#6C6C6C] md:text-[14px]">
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
    </div>
  );
}