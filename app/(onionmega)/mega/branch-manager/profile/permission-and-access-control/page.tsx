// branch-manager/profile/permission-and-access-control/page.tsx
import React from "react";
import ProfileLayout from "../Shell";
import { PermissionOverview } from "@/components/permission-and-access/overview";
import { AccessAndScope } from "@/components/permission-and-access/access-and-scope";
import Button from "@/components/ui/button";
import { Controls } from "@/components/permission-and-access/controls";
import { AssignedBranch } from "@/components/permission-and-access/assigned-branch";

const roleData = {
  roleName: "Branch Manager",
  description: "Manages branch-level operations and staff.",
  staffCount: 10,
  lastUpdated: "May 04, 2026 by Adebayo Olaniyan (You)",
  showViewStaffButton: true,
  assignedLabel: "Assigned Branch",
  assignedValue: "individual branches",
  accessScopes: {
    allLocations: false,
    groupOnly: false,
    branchOnly: true,
  },
};

export default function page() {
  return (
    <div className="w-full md:max-h-[90vh]  md:sticky top-0 md:overflow-hidden ">
      <ProfileLayout
        active="/branch-manager/profile/permission-and-access-control"
        heading="Permissions & Access Control"
        subheading="Manage what each role can do in the staff app"
      >
        <div className="w-full  overflow-y-auto md:h-[90vh] md:pb-[100px]">
          <div className="space-y-[40px] p-[24px] bg-white">
            <PermissionOverview
              roleName={roleData.roleName}
              description={roleData.description}
              staffCount={roleData.staffCount}
              lastUpdated={roleData.lastUpdated}
              showViewStaffButton={roleData.showViewStaffButton}
            />
            <Controls />

            <div className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-[24px]  border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[12px] p-[16px]">
              <AccessAndScope initialScopes={roleData.accessScopes} />
              <AssignedBranch
                assignedLabel={roleData.assignedLabel}
                assignedValue={roleData.assignedValue}
              />
            </div>
          </div>
          <div className="flex justify-end items-center py-[30px] ">
            <div className="grid grid-cols-2 gap-[16px] max-lg:w-full">
              <Button variant="outline" size="md">
                Cancel
              </Button>

              <Button variant="primary" size="md">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}
