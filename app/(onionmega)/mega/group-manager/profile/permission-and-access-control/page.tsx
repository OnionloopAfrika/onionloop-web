"use client";
import React, { useState } from "react";
import { ControlAvatarIcon, SearchIcon } from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import { PermissionControls } from "@/components/group-manager/permission-controls";

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
  { id: "branch-manager", name: "Branch Manager", userCount: 8 },
  { id: "staff", name: "Staff", userCount: 1000 },
];

const roleDataMap: Record<string, RoleData> = {
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
  const [selectedRole, setSelectedRole] = useState<string>("branch-manager");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="space-y-[24px] md:max-h-[90vh] md:overflow-hidden md:sticky">
      <div className="space-y-[12px] ">
        <p className="font-[600] text-[24px] text-[#131313]">
          Permissions & Access Control
        </p>
        <p className="font-[500] text-[16px] text-[#363636]">
          Manage what each role can do in the staff app
        </p>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-[24px]">
        <div className="space-y-[24px] h-fit bg-white rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-[16px] shrink-0">
          <div className="space-y-[14px]">
            <h3 className="font-semibold text-[16px] text-[#131313] ">Roles</h3>
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

          <div className="space-y-[8px]">
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
                      ? "bg-[#F5FFFD] border-l-4 border-l-[#024E44]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-[52px] h-[52px] rounded-full flex items-center justify-center ${
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
                      className={`font-medium text-[16px] ${
                        selectedRole === role.id
                          ? "text-[#131313]"
                          : "text-[#131313]"
                      }`}
                    >
                      {role.name}
                    </p>
                    <p className="text-[14px] font-[400] text-[#6C6C6C]">
                      {role.userCount} Users
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto h-[90vh]">
          <PermissionControls roleData={roleDataMap[selectedRole]} />
        </div>
      </div>
    </div>
  );
}
