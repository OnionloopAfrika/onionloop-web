"use client";
import React from "react";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function Customers() {
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
    <div className="rounded-[12px] p-[16px] min-h-[216px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white space-y-[24px]">
      {" "}
      <PermissionsHeader title="Customers" />
      <div className="space-y-[16px]">
        <PermissionsControls
          action="view customers"
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
          action="invite/Edit customers"
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
          action="Delete customers"
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
