import React from "react";

export function PersonalDetails() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] space-y-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-[24px]">
      <h2 className="font-[600] text-[18px] text-[#131313]">
        Personal Details
      </h2>

      <div className="divide-y divide-[#E5E7EB]">
        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Full Name:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            Joseph Maduabuchi
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">Email:</span>
          <span className="font-[600] text-[14px] text-[#131313]">
            josephmaduabuchi@mail.com
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Phone Number:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            +234 816 249 0242
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">Gender:</span>
          <span className="font-[600] text-[14px] text-[#131313]">Male</span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">BVN:</span>
          <span className="font-[600] text-[14px] text-[#04802E]">
            Verified
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">NIN:</span>
          <span className="font-[600] text-[14px] text-[#04802E]">
            Verified
          </span>
        </div>

        <div className="flex justify-between items-center py-[16px]">
          <span className="font-[400] text-[14px] text-[#6C6C6C]">
            Date of Birth:
          </span>
          <span className="font-[600] text-[14px] text-[#131313]">
            01 Jan, 1984
          </span>
        </div>
      </div>
    </div>
  );
}
