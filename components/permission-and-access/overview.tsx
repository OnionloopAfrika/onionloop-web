"use client";

import { usePathname } from "next/navigation";
import {
  ControlAvatarIcon,
  DotIcon,
  OpenEyeIcon,
  StaffIcon,
} from "../icons/svgs";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";

export function PermissionOverview() {
  const pathname = usePathname();
  const isGroupManager = pathname.includes("group-manager");
  const isBranchManager = pathname.includes("branch-manager");
  const isSuperAdmin = pathname.includes("super-admin");

  return (
    <div className="space-y-[24px]">
      <div className="flex flex-col gap-[24px] pb-[24px] border-b border-b-[#C7C7C7]">
        <div className="flex justify-between items-center">
          <p className="font-[600] text-[16px] text-[#131313]">
            {isGroupManager || isSuperAdmin ? "Role Overview" : " Overview"}
          </p>

          {isBranchManager && (
            <Button variant="outline" size="md">
              <OpenEyeIcon /> View Staff
            </Button>
          )}
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#B5E3C4] shrink-0">
            <ControlAvatarIcon className="w-[40px] h-[40px] text-[#024E44]" />
          </div>

          <div className="space-y-[12px]">
            <div>
              <p className="font-[600] text-[18px] text-[#131313]">
                {isSuperAdmin
                  ? "HQ Admin"
                  : isBranchManager
                    ? "Branch Manager"
                    : "Staff"}
              </p>
              <p className="font-[400] text-[14px] text-[#6C6C6C]">
                Part system access with all permissions and controls.
              </p>
            </div>
            <div className=" ">
              <p className="flex items-center gap-[8px] font-[400] text-[14px] text-[#6C6C6C]">
                <StaffIcon /> <span>20 Staff assigned</span> <DotIcon />{" "}
                <span>
                  Last updated: May 02, 2026 by Adebayo Olaniyan (You)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
