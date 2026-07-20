"use client";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import Switch, { SwitchToggle } from "../ui/switch";

export function Locations() {
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
      <PermissionsHeader title="Locations" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view locations"
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
          action="Add/Edit locations"
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
          action="Delete locations"
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
