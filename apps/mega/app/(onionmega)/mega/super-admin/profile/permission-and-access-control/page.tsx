"use client";

import React, { useState, useEffect } from "react";
import {
  ControlAvatarIcon,
  PermissionMenuIcon,
  StaffIcon,
} from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import Button from "@/components/ui/button";
import SwitchToggle from "@/components/ui/switch-toggle";
import { Checkbox } from "@/components/ui/checkbox";

type Role = {
  id: string;
  name: string;
  userCount: number;
};

type PermissionItem = {
  id: string;
  label: string;
  enabled: boolean;
};

type PermissionCategory = {
  title: string;
  permissions: PermissionItem[];
};

type RoleData = {
  roleName: string;
  description: string;
  userCount: number;
  lastUpdated: string;
  permissionCategories: PermissionCategory[];
  accessScope: "all" | "group" | "branch";
  assignedGroups: string[];
};

type ApiResponse = {
  roles: Role[];
  roleDataMap: Record<string, RoleData>;
};

const defaultPermissions: PermissionCategory[] = [
  {
    title: "Dashboard",
    permissions: [
      { id: "view_dashboard", label: "view dashboard", enabled: true },
    ],
  },
  {
    title: "Transactions",
    permissions: [
      { id: "view_transactions", label: "view transactions", enabled: true },
      {
        id: "export_transactions",
        label: "Export transactions",
        enabled: true,
      },
      {
        id: "refund_transactions",
        label: "Refund transactions",
        enabled: true,
      },
      {
        id: "view_wallet_balance",
        label: "view wallet balance",
        enabled: true,
      },
    ],
  },
  {
    title: "Reports",
    permissions: [
      { id: "view_report", label: "view report", enabled: true },
      { id: "export_report", label: "Export report", enabled: true },
    ],
  },
  {
    title: "Locations",
    permissions: [
      { id: "view_locations", label: "view locations", enabled: true },
      { id: "add_edit_locations", label: "Add/Edit locations", enabled: true },
      { id: "delete_locations", label: "Delete locations", enabled: true },
    ],
  },
  {
    title: "Staff Management",
    permissions: [
      { id: "view_staff", label: "view staff", enabled: true },
      { id: "invite_edit_staff", label: "Invite/Edit staff", enabled: true },
      { id: "deactivate_staff", label: "Deactivate Staff", enabled: true },
      {
        id: "reset_staff_password",
        label: "Reset staff password",
        enabled: true,
      },
    ],
  },
  {
    title: "Customers",
    permissions: [
      { id: "view_customers", label: "view customers", enabled: true },
      { id: "add_edit_customers", label: "Add/Edit customers", enabled: true },
      { id: "delete_customers", label: "Delete Customers", enabled: true },
    ],
  },
  {
    title: "Disputes",
    permissions: [
      { id: "view_disputes", label: "view disputes", enabled: true },
      { id: "manage_disputes", label: "Manage disputes", enabled: true },
    ],
  },
  {
    title: "Settlements",
    permissions: [
      { id: "view_settlement", label: "view settlement", enabled: true },
      { id: "approve_settlement", label: "Approve settlement", enabled: true },
    ],
  },
  {
    title: "System Control",
    permissions: [
      {
        id: "manage_permission_access",
        label: "Manage permission & access",
        enabled: true,
      },
      {
        id: "access_system_settings",
        label: "Access system settings",
        enabled: true,
      },
      { id: "view_activity_log", label: "view activity log", enabled: true },
    ],
  },
];

const mockInitialData: ApiResponse = {
  roles: [
    { id: "hq-admin", name: "HQ Admin", userCount: 1 },
    { id: "group-manager", name: "Group Manager", userCount: 6 },
    { id: "branch-manager", name: "Branch Manager", userCount: 10 },
    { id: "staff", name: "Staff", userCount: 1000 },
  ],
  roleDataMap: {
    "hq-admin": {
      roleName: "HQ Admin",
      description: "Full system access with all permissions and controls.",
      userCount: 1,
      lastUpdated: "May 02, 2026 by Adebayo Olaniyan (You)",
      permissionCategories: defaultPermissions,
      accessScope: "all",
      assignedGroups: ["All groups"],
    },
    "group-manager": {
      roleName: "Group Manager",
      description:
        "Manages group-level operations and staff across assigned groups.",
      userCount: 6,
      lastUpdated: "May 03, 2026 by Adebayo Olaniyan (You)",
      permissionCategories: defaultPermissions,
      accessScope: "group",
      assignedGroups: ["Selected groups"],
    },
    "branch-manager": {
      roleName: "Branch Manager",
      description:
        "Part system access with permissions and controls for branch operations.",
      userCount: 10,
      lastUpdated: "May 04, 2026 by Adebayo Olaniyan (You)",
      permissionCategories: defaultPermissions,
      accessScope: "branch",
      assignedGroups: ["Individual branches"],
    },
    staff: {
      roleName: "Staff",
      description: "Performs day-to-day tasks with limited access.",
      userCount: 1000,
      lastUpdated: "May 05, 2026 by Adebayo Olaniyan (You)",
      permissionCategories: defaultPermissions.map((cat) => ({
        ...cat,
        permissions: cat.permissions.map((p) => ({ ...p, enabled: false })),
      })),
      accessScope: "branch",
      assignedGroups: ["Individual branches"],
    },
  },
};

export default function Page() {
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("hq-admin");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleDataMap, setRoleDataMap] = useState<Record<string, RoleData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        setIsLoading(true);
        setRolesList(mockInitialData.roles);
        setRoleDataMap(mockInitialData.roleDataMap);
      } catch (error) {
        console.error("Failed to fetch role permissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRolePermissions();
  }, []);

  const currentRoleData = roleDataMap[selectedRole];

  const handleTogglePermission = (catIndex: number, permIndex: number) => {
    setRoleDataMap((prev) => {
      const updatedRole = { ...prev[selectedRole] };
      const updatedCategories = [...updatedRole.permissionCategories];
      const updatedCategory = { ...updatedCategories[catIndex] };
      const updatedPermissions = [...updatedCategory.permissions];

      updatedPermissions[permIndex] = {
        ...updatedPermissions[permIndex],
        enabled: !updatedPermissions[permIndex].enabled,
      };

      updatedCategory.permissions = updatedPermissions;
      updatedCategories[catIndex] = updatedCategory;
      updatedRole.permissionCategories = updatedCategories;

      return { ...prev, [selectedRole]: updatedRole };
    });
  };

  const handleScopeChange = (scope: "all" | "group" | "branch") => {
    setRoleDataMap((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        accessScope: scope,
      },
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const payload = {
        roleId: selectedRole,
        roleData: roleDataMap[selectedRole],
      };

      console.log("Saving payload to API:", payload);
    } catch (error) {
      console.error("Failed to update role permissions:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading access control settings...
        </p>
      </div>
    );
  }

  return (
    <div className=" bg-[#F9FAFB] min-h-screen space-y-6">
      <div className="space-y-1">
        <h1 className="font-semibold text-[24px] max-lg:text-[18px] text-[#131313]">
          Permissions & Access Control
        </h1>
        <p className="font-medium text-[16px] max-lg:text-[12px] text-[#363636]">
          Manage what each role can do in the staff app
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-4 shrink-0">
          <h2 className="font-semibold text-base text-[#131313]">Roles</h2>
          <SearchInput
            placeholder="Search roles.."
            value={searchQuery}
            onChange={setSearchQuery}
            categories={[]}
            products={[]}
            employees={[]}
            chats={[]}
          />

          <div className="space-y-2 max-lg:flex max-lg:overflow-x-scroll">
            {rolesList
              .filter((role) =>
                role.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full  flex items-center gap-3 p-3 rounded-xl transition-all text-left  ${
                      isSelected
                        ? "bg-[#F5FFFD] border-l-4 border-l-[#024E44] max-lg:border-l-0 max-lg:border-b-2 max-lg:border-b-[#024E44]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-[52px] h-[52px] max-lg:w-[36px] max-lg:h-[36px] rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#B5E3C4] text-[#024E44]"
                          : "bg-[#F7F7F7] text-[#6C6C6C]"
                      }`}
                    >
                      <ControlAvatarIcon
                        className={
                          isSelected ? "text-[#024E44]" : "text-[#6C6C6C]"
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-1 ">
                      <p className="font-medium text-[16px] max-lg:text-[12px] text-[#131313]">
                        {role.name}
                      </p>
                      <p className="text-[14px] max-lg:text-[10px] font-normal text-[#6C6C6C]">
                        {role.userCount} Users
                      </p>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {currentRoleData && (
          <div className="space-y-[40px] w-full">
            <div></div>
            <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm space-y-[24px]">
              <h2 className="font-[600] text-[16px] text-[#131313]">
                Role Overview
              </h2>

              <div className="flex   items-start sm:items-center gap-[12px] border-b border-b-[#C7C7C7] pb-[24px]">
                <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full bg-[#B5E3C4] text-[#024E44] flex items-center justify-center shrink-0">
                  <ControlAvatarIcon className="w-6 h-6 md:w-[40px] md:h-[40px] text-[#024E44]" />
                </div>
                <div className="space-y-[12px]">
                  <div className="space-y-[2px]">
                    <p className="font-[600] text-[18px] text-[#131313] max-lg:text-[14px]">
                      {currentRoleData.roleName}
                    </p>
                    <p className="font-[400] text-[14px] text-[#6C6C6C] max-lg:text-[12px]">
                      {currentRoleData.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#6C6C6C]  max-lg:text-[10px]">
                    <span className="inline-flex items-center gap-1">
                      <StaffIcon className="w-[16px] h-[16px]" />
                      {currentRoleData.userCount} Users assigned
                    </span>
                    <span>•</span>
                    <span>Last updated: {currentRoleData.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentRoleData.permissionCategories.map(
                  (category, catIndex) => (
                    <div
                      key={category.title}
                      className="bg-white rounded-xl min-h-[216px] p-4 border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]  space-y-[24px] "
                    >
                      <div className="flex items-center gap-[12px] font-semibold text-[16px] text-[#242424]">
                        <span className="text-[#04907E] font-bold">
                          <PermissionMenuIcon className="w-[24px] h-[24px]" />
                        </span>
                        {category.title}
                      </div>
                      <div className="space-y-[18px]">
                        {category.permissions.map((permission, permIndex) => (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between "
                          >
                            <span className="font-[500] text-[14px] text-[#363636]">
                              {permission.label}
                            </span>
                            <SwitchToggle
                              size="sm"
                              checked={permission.enabled}
                              onCheckedChange={() =>
                                handleTogglePermission(catIndex, permIndex)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="bg-white rounded-xl p-4 md:p-6  border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]  grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="space-y-[12px]">
                  <h4 className="font-[600] text-[16px] text-[#131313]">
                    Access Scope
                  </h4>
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    Define the data and location this role can access
                  </p>
                </div>

                <div className="space-y-[8px]">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      className="w-[20px] h-[20px]"
                      name="accessScope"
                      onChange={() => handleScopeChange("all")}
                      checked={currentRoleData.accessScope === "all"}
                    />

                    <div className="space-y-[4px]">
                      <p className="font-[600] text-[12px] text-[#363636]">
                        All locations
                      </p>
                      <p className="font-[400] text-[12px] text-[#6C6C6C]">
                        Can access and manage all locations
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      className="w-[20px] h-[20px]"
                      name="accessScope"
                      onChange={() => handleScopeChange("group")}
                      checked={currentRoleData.accessScope === "group"}
                    />

                    <div className="space-y-[4px]">
                      <p className="font-[600] text-[12px] text-[#363636]">
                        Group Only
                      </p>
                      <p className="font-[400] text-[12px] text-[#6C6C6C]">
                        Can only access locations with assigned groups
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      className="w-[20px] h-[20px]"
                      name="accessScope"
                      onChange={() => handleScopeChange("branch")}
                      checked={currentRoleData.accessScope === "branch"}
                    />

                    <div className="space-y-[4px]">
                      <p className="font-[600] text-[12px] text-[#363636]">
                        Branch/Location only
                      </p>
                      <p className="font-[400] text-[12px] text-[#6C6C6C]">
                        Can only access their assigned locations
                      </p>
                    </div>
                  </label>
                </div>

                <div className=" rounded-xl p-4   border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]  space-y-2">
                  <p className="font-semibold text-xs text-[#363636]">
                    Assigned Groups
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentRoleData.assignedGroups.map((group) => (
                      <span
                        key={group}
                        className="px-[16px] py-[4px] bg-[#F5FFFD] text-[#04907E] font-[500] text-[12px] rounded-full flex justify-center items-center"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center py-[30px] ">
              <div className="grid grid-cols-2 gap-[16px] max-lg:w-full">
                <Button variant="outline" size="md">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  variant="primary"
                  size="md"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
