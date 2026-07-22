"use client";
import React, { useState } from "react";
import { ControlAvatarIcon, SearchIcon } from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import { PermissionControls } from "@/components/group-manager/permission-controls";
import { AccessAndScope } from "@/components/permission-and-access/access-and-scope";
import { AssignedBranch } from "@/components/permission-and-access/assigned-branch";
import { Controls } from "@/components/permission-and-access/controls";
import { PermissionOverview } from "@/components/permission-and-access/overview";
import Button from "@/components/ui/button";

type Role = {
  id: string;
  name: string;
  userCount: number;
  avatar?: string;
};

type RoleData = {
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

const roles: Role[] = [
  { id: "hq-admin", name: "HQ Admin", userCount: 1 },
  { id: "group-manager", name: "Group Manager", userCount: 6 },
  { id: "branch-manager", name: "Branch Manager", userCount: 10 },
  { id: "staff", name: "Staff", userCount: 1000 },
];

const roleDataMap: Record<string, RoleData> = {
  "hq-admin": {
    roleName: "HQ Admin",
    description: "Part system access with all permissions and controls.",
    staffCount: 20,
    lastUpdated: "May 02, 2026 by Adebayo Olaniyan (You)",
    showViewStaffButton: false,
    assignedLabel: "Assigned Groups",
    assignedValue: "All groups",
    accessScopes: {
      allLocations: true,
      groupOnly: false,
      branchOnly: false,
    },
  },
  "group-manager": {
    roleName: "Group Manager",
    description: "Manages group-level operations and staff.",
    staffCount: 15,
    lastUpdated: "May 03, 2026 by Adebayo Olaniyan (You)",
    showViewStaffButton: false,
    assignedLabel: "Assigned Groups",
    assignedValue: "Selected groups",
    accessScopes: {
      allLocations: false,
      groupOnly: true,
      branchOnly: false,
    },
  },
  "branch-manager": {
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
  },
  staff: {
    roleName: "Staff",
    description: "Performs day-to-day tasks with limited access.",
    staffCount: 5,
    lastUpdated: "May 05, 2026 by Adebayo Olaniyan (You)",
    showViewStaffButton: false,
    assignedLabel: "Assigned Branch",
    assignedValue: "individual branches",
    accessScopes: {
      allLocations: false,
      groupOnly: false,
      branchOnly: true,
    },
  },
};

export default function page() {
  const [selectedRole, setSelectedRole] = useState<string>("hq-admin");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const roleData = roleDataMap[selectedRole];

  return (
    <div className="w-full md:sticky ">
      <div className="space-y-[24px] md:max-h-[90vh] md:overflow-hidden ">
        <div className="space-y-[12px] ">
          <p className="font-[600] text-[24px] max-lg:text-[18px]  text-[#131313]">
            Permissions & Access Control
          </p>
          <p className="font-[500] text-[16px] max-lg:text-[12px]  text-[#363636]">
            Manage what each role can do in the staff app
          </p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-[24px] max-lg:grid-cols-1 ">
          <div className="space-y-[24px] h-fit bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-[16px] shrink-0">
            <div className="space-y-[14px]">
              <h3 className="font-semibold text-[16px] text-[#131313] ">
                Roles
              </h3>
              <SearchInput
                placeholder="Search roles.."
                value={searchQuery}
                onChange={setSearchQuery}
                categories={[]}
                products={[]}
                employees={[]}
                chats={[]}
              />
            </div>

            <div className="space-y-[8px] max-lg:flex max-lg:overflow-x-scroll">
              {roles
                .filter((role) =>
                  role.name.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full flex items-center gap-[24px] py-[16px] px-[24px] rounded-[12px] transition-all ${
                      selectedRole === role.id
                        ? "bg-[#F5FFFD] border-l-4 border-l-[#024E44]   max-lg:border-l-0    max-lg:border-b-[#024E44] max-lg:border-b max-lg:border-b-4"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-[52px] h-[52px] max-lg:w-[24px] max-lg:h-[24px] rounded-full flex items-center justify-center ${
                        selectedRole === role.id
                          ? "bg-[#B5E3C4] text-white"
                          : "bg-[#F7F7F7] text-gray-500"
                      }`}
                    >
                      {selectedRole === role.id ? (
                        <ControlAvatarIcon className="text-[#024E44]" />
                      ) : (
                        <ControlAvatarIcon className="text-[#6C6C6C]" />
                      )}
                    </div>
                    <div className="flex-1 text-left  space-y-[4px]">
                      <p
                        className={`font-medium text-[16px] max-lg:text-[12px] ${
                          selectedRole === role.id
                            ? "text-[#131313]"
                            : "text-[#131313]"
                        }`}
                      >
                        {role.name}
                      </p>
                      <p className="text-[14px] max-lg:text-[10px] font-[400] text-[#6C6C6C]">
                        {role.userCount} Users
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
