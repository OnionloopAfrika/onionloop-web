"use client";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function StaffManagement() {
  const [toggleStates, setToggleStates] = useState({
    viewLocations: true,
    addEditLocations: true,
    refundLocations: true,
    viewWalletBalance: true,
  });

  const handleToggleChange = (
    key: keyof typeof toggleStates,
    checked: boolean,
  ) => {
    setToggleStates((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="rounded-[12px] p-[16px] min-h-[216px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] bg-white space-y-[24px]">
      {" "}
      <PermissionsHeader title="Staff Management" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view staff"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewLocations}
              onCheckedChange={(checked) =>
                handleToggleChange("viewLocations", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="invite/Edit staff"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.addEditLocations}
              onCheckedChange={(checked) =>
                handleToggleChange("addEditLocations", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Deactivate staff"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.refundLocations}
              onCheckedChange={(checked) =>
                handleToggleChange("refundLocations", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Reset staff password"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.refundLocations}
              onCheckedChange={(checked) =>
                handleToggleChange("refundLocations", checked)
              }
            />
          }
        />
      </div>
    </div>
  );
}
