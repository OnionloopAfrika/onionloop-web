"use client";

import { cashierStats } from "@/lib/mockdata/cashier";
import { UpwordIcon, OutofStockIcon } from "@/components/icons/svgs";

export default function CashierStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
      {cashierStats.map((stat, i) => {
        const Icon = stat.icon;
        const iconBg = {
          green: "bg-[#B5E3C4] text-[#04802e]",
          orange: "bg-[#FEF6E7] text-[#DD900D]",
          blue: "bg-[#E7F3FF] text-[#0D5EBA]",
        }[stat.color];

        const actionColor = {
          green: "text-[#04802E]",
          orange: "text-[#DD900D]",
          blue: "text-[#1E5EFF]",
        }[stat.color];

        const ArrowIcon =
          stat.desc === "Products in Inventory" ? OutofStockIcon : UpwordIcon;

        return (
          <div
            key={i}
            className="rounded-[12px] space-y-[8px] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            <div className="flex justify-between items-start mb-[24px]">
              <div
                className={`w-[40px] h-[40px] rounded-[8px] p-[5px] flex justify-center items-center ${iconBg}`}
              >
                <Icon
                  className={`w-[24px] h-[24px] ${stat.desc === "Todays Total Orders" && "text-[#0D5EBA]"}  `}
                />
              </div>
              {stat.percentage && (
                <span
                  className={`rounded-[24px] px-[8px] text-[10px] font-[500] flex items-center gap-2 ${stat.desc === "Todays Total Sales" ? "bg-[#E7F6EC] text-[#04802E]" : "bg-[#C6DDF7] text-[#0D5EBA]"}`}
                >
                  {stat.percentage}
                </span>
              )}
            </div>

            <div className="space-y-[4px]">
              <p className="font-[600] text-[16px] sm:text-[28px] text-[#000000]">
                {stat.figure}
              </p>
              <p className="font-[400] text-[14px] text-[#6C6C6C]">
                {stat.desc}
              </p>
            </div>

            <div className="mt-[16px] flex items-center gap-[4px]">
              <ArrowIcon className={actionColor} />
              <span className={`font-[500] text-[10px] ${actionColor}`}>
                {stat.action}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
