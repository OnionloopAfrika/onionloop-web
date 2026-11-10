"use client";
import React from "react";

import {
  ControlAvatarIcon,
  DotIcon,
  OpenEyeIcon,
  StaffIcon,
} from "../icons/svgs";
import Button from "../ui/button";

interface PermissionOverviewProps {
  roleName: string;
  description: string;
  staffCount: number;
  lastUpdated: string;
  showViewStaffButton: boolean;
}

export function PermissionOverview({
  roleName,
  description,
  staffCount,
  lastUpdated,
  showViewStaffButton,
}: PermissionOverviewProps) {
  return (
    <div className="space-y-[24px]">
      <div className="flex flex-col gap-[24px] pb-[24px] border-b border-b-[#C7C7C7]">
        <div className="flex justify-between items-center">
          <p className="font-[600] text-[16px] text-[#131313]">Role Overview</p>

          {showViewStaffButton && (
            <Button variant="outline" size="md">
              <OpenEyeIcon /> View Staff
            </Button>
          )}
        </div>

        <div className="flex max-lg:items-start items-center gap-[12px]">
          <div className="w-[80px] h-[80px]  max-lg:w-[40px] max-lg:h-[40px] flex justify-center items-center rounded-full bg-[#B5E3C4] shrink-0">
            <ControlAvatarIcon className="w-[40px] h-[40px] text-[#024E44]" />
          </div>

          <div className="space-y-[12px]">
            <div>
              <p className="font-[600] text-[18px] text-[#131313] max-lg:text-[14px]">
                {roleName}
              </p>
              <p className="font-[400] text-[14px] text-[#6C6C6C] max-lg:text-[12px]">
                {description}
              </p>
            </div>
            <div className=" ">
              <p className="flex items-center gap-[8px] font-[400] text-[14px] text-[#6C6C6C]  max-lg:text-[10px]">
                <StaffIcon /> <span>{staffCount} Staff assigned</span>{" "}
                <DotIcon /> <span>Last updated: {lastUpdated}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
