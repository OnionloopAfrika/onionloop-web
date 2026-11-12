import React from "react";

export function AddressDetails() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] space-y-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
      <h2 className="font-[600] text-[18px] text-[#131313]">Address Details</h2>

      <div className="divide-y divide-[#E5E7EB]">
        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Business Address:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            653, Allen adekunle
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">City:</span>
          <span className="font-[600] text-[14px] text-[#131313]">Ikeja</span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">State:</span>
          <span className="font-[600] text-[14px] text-[#131313]">
            Lagos, State
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Country:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">Nigeria</span>
        </div>
      </div>
    </div>
  );
}
