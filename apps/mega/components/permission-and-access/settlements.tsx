"use client";
import React from "react";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function Settlements() {
  const [toggleStates, setToggleStates] = useState({
    viewSettlements: true,
    manageSettlements: true,
  });

  const handleToggleChange = (
    key: keyof typeof toggleStates,
    checked: boolean,
  ) => {
    setToggleStates((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="rounded-[12px] p-[16px] min-h-[216px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white space-y-[24px]">
      {" "}
      <PermissionsHeader title="Settlements" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view settlements"
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
          action="Approve settlements"
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
      </div>
    </div>
  );
}
