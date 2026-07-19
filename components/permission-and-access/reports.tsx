"use client";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import Switch, { SwitchToggle } from "../ui/switch";

export function Reports() {
  const [toggleStates, setToggleStates] = useState({
    viewReport: true,
    exportReport: true,
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
      <PermissionsHeader title="Reports" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view report"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewReport}
              onCheckedChange={(checked) =>
                handleToggleChange("viewReport", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Export report"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.exportReport}
              onCheckedChange={(checked) =>
                handleToggleChange("exportReport", checked)
              }
            />
          }
        />
      </div>
    </div>
  );
}
