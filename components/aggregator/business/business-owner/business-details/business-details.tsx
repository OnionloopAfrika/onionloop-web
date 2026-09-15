import React from "react";

export function BusinessDetails() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] space-y-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
      <h2 className="font-[600] text-[18px] text-[#131313] ">
        Business Details
      </h2>

      <div className="divide-y divide-[#E5E7EB]">
        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Business Name:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            De- Light Superstores
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Linked Businesses:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            4 businesses
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Business Type:
          </span>
          <span className="px-[12px] py-[4px] rounded-full text-[14px] font-[500] bg-[#E0F7F4] text-[#04907E]">
            Merchant
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Onboarded On:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            April 12, 2024
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Business Status:
          </span>
          <span className="px-[12px] py-[4px] rounded-full text-[12px] font-[500] bg-[#E8F5E9] text-[#04802E]">
            Active
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            CAC Number:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            RCC1234567
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Business Location:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            Lagos, Nigeria
          </span>
        </div>
      </div>
    </div>
  );
}
