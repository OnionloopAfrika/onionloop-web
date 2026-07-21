"use client";
import React from "react";
import { useState } from "react";
import { PermissionsControls, PermissionsHeader } from "./controls";
import SwitchToggle from "../ui/switch-toggle";

export function Dashboard() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="rounded-[12px] p-[16px] min-h-[216px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] bg-white space-y-[24px]">
      {" "}
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
