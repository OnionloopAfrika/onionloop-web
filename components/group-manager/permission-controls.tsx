import React from "react";
import { PermissionOverview } from "../permission-and-access/overview";
import { AccessAndScope } from "../permission-and-access/access-and-scope";
import Button from "../ui/button";
import { AssignedBranch } from "../permission-and-access/assigned-branch";
import { Controls } from "../permission-and-access/controls";

export function PermissionControls() {
  return (
    <>
      {" "}
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
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
}
