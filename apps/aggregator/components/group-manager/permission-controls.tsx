import React from "react";
import { PermissionOverview } from "../permission-and-access/overview";
import { AccessAndScope } from "../permission-and-access/access-and-scope";
import Button from "../ui/button";
import { AssignedBranch } from "../permission-and-access/assigned-branch";
import { Controls } from "../permission-and-access/controls";

interface PermissionControlsProps {
  roleData: {
    roleName: string;
    description: string;
    staffCount: number;
    lastUpdated: string;
    showViewStaffButton: boolean;
    assignedLabel: string;
    assignedValue: string;
    accessScopes: {
      allLocations: boolean;
      groupOnly: boolean;
      branchOnly: boolean;
    };
  };
}

export function PermissionControls({ roleData }: PermissionControlsProps) {
  return (
    <>
      <div className="space-y-[40px] p-[24px] bg-white ">
        <PermissionOverview
          roleName={roleData.roleName}
          description={roleData.description}
          staffCount={roleData.staffCount}
          lastUpdated={roleData.lastUpdated}
          showViewStaffButton={roleData.showViewStaffButton}
        />
        <Controls />
        <div className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-[12px] p-[16px]">
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
    </>
  );
}
