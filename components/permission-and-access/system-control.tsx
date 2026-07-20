"use client";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import Switch, { SwitchToggle } from "../ui/switch";

export function SystemControl() {
  const [toggleStates, setToggleStates] = useState({
    viewSettlements: true,
    manageSettlements: true,
    viewActivityLog: true,
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
      <PermissionsHeader title="System Control" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="Manage Permissions & access"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewSettlements}
              onCheckedChange={(checked) =>
                handleToggleChange("viewSettlements", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Access system settings"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.manageSettlements}
              onCheckedChange={(checked) =>
                handleToggleChange("manageSettlements", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="view activity log"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewActivityLog}
              onCheckedChange={(checked) =>
                handleToggleChange("viewActivityLog", checked)
              }
            />
          }
        />
      </div>
    </div>
  );
}
