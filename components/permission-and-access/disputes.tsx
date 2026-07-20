"use client";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import Switch, { SwitchToggle } from "../ui/switch";

export function Disputes() {
  const [toggleStates, setToggleStates] = useState({
    viewDisputes: true,
    manageDisputes: true,
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
      <PermissionsHeader title="Disputes" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view disputes"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.viewDisputes}
              onCheckedChange={(checked) =>
                handleToggleChange("viewDisputes", checked)
              }
            />
          }
        />

        <PermissionsControls
          action="Manage disputes"
          toggle={
            <SwitchToggle
              size="xl"
              checked={toggleStates.manageDisputes}
              onCheckedChange={(checked) =>
                handleToggleChange("manageDisputes", checked)
              }
            />
          }
        />
      </div>
    </div>
  );
}
