import RevenueOverview from "@/components/layouts/revenue-overview";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import React from "react";

export async function Performance() {
  const initialData = await fetchRevenue("7days");

  const STAT = [
    {
      value: "₦12,440, 000",
      description: "Total Transation Volume",
    },
    {
      value: "1,296",
      description: "Total Transactions",
    },
    {
      value: "₦185,900",
      description: "Earnings Generated",
    },
    {
      value: "₦50,000",
      description: "Average Transaction",
    },
  ];

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-4 gap-[16px] max-lg:grid-cols-2">
        {STAT.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-[24px] max-lg:grid-cols-1">
        <RevenueOverview initialData={initialData} />
        <div className="space-y-[24px]">
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px] space-y-[12px]">
            <h2 className="font-[600] text-[18px] text-[#131313]">
              Business Health
            </h2>
            <span className="inline-block px-[12px] py-[4px] rounded-full text-[14px] font-[500] bg-[#E7F6EC] text-[#04802E]">
              Healthy
            </span>
            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              This Business is performing well
            </p>
          </div>

          <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
            <h2 className="font-[600] text-[18px] text-[#131313] mb-[16px]">
              Top Performing Day
            </h2>

            <div className="space-y-[4px] mb-[16px]">
              <p className="font-[500] text-[12px] text-[#242424]">Friday</p>
              <p className="font-[500] text-[10px] text-[#6C6C6C]">₦124,500</p>
            </div>

            <div className="border-t border-[#E5E7EB] pt-[16px] space-y-[4px]">
              <p className="font-[500] text-[10px] text-[#6C6C6C]">
                Peak Hours
              </p>
              <p className="font-[500] text-[12px] text-[#242424]">
                12PM – 2PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
