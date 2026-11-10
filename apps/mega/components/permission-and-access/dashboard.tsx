"use client";
import React from "react";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function Dashboard() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="rounded-[12px] p-[16px] min-h-[216px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white space-y-[24px]">
      <PermissionsHeader title="Dashboard" />
      <PermissionsControls
        action="view dashboard"
        toggle={
          <SwitchToggle
            size="xl"
            checked={checked}
            onCheckedChange={setChecked}
          />
        }
      />
    </div>
  );
}
