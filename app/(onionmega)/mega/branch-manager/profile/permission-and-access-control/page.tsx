import React from "react";
import ProfileLayout from "../Shell";
import { DefaultPermission } from "@/components/staff-app/default-permission";
import { MobileAppSettings } from "@/components/staff-app/mobile-app-settings";
import { MobileSettings } from "@/components/staff-app/mobile-settings";
import { PermissionOverview } from "@/components/permission-and-access/overview";
import Controls from "@/components/permission-and-access/controls";
import { AccessAndScope } from "@/components/permission-and-access/access-and-scope";
import AssignedBranch from "@/components/permission-and-access/assigned-branch";
import Button from "@/components/ui/button";

const page = () => {
  return (
    <ProfileLayout
      active="/branch-manager/profile/permission-and-access-control"
      heading="Permissions & Access Control"
      subheading="Manage what each role can do in the staff app"
    >
      <div className="space-y-[40px] p-[24px] bg-white">
        <PermissionOverview />
        <Controls />

        <div className="grid grid-cols-[2fr_1fr] gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-[12px] p-[16px]">
          <AccessAndScope />
          <AssignedBranch />
        </div>
      </div>
      <div className="flex justify-end items-center py-[30px]">
        <div className="grid grid-cols-2 gap-[16px]">
          <Button variant="outline" size="md">
            Cancel
          </Button>

          <Button variant="primary" size="md">
            Save chnages
          </Button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default page;
