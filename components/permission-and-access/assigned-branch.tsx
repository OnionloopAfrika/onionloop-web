"use client";
import React from "react";

interface AssignedBranchProps {
  assignedLabel: string;
  assignedValue: string;
}

export function AssignedBranch({
  assignedLabel,
  assignedValue,
}: AssignedBranchProps) {
  return (
    <div className="p-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]">
      <div className="space-y-[8px]">
        <p className="font-[600] text-[12px] text-[#363636]">{assignedLabel}</p>
        <span className="bg-[#F5FFFD] px-[16px] py-[4px] rounded-full flex justify-center items-center font-[500] text-[12px] text-[#04907E] w-fit">
          {assignedValue}
        </span>
      </div>
    </div>
  );
}
