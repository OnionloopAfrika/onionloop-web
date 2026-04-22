"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";

export function DefaultPermission() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px]">
      <ProfileHeader
        title="Default Staff Permissions"
        subtitle="Set what staff can do by default when added"
      />

      <div className="space-y-[24px]">
        <Toggle
          title="Allow staff to view prices"
          subtitle="Staff can see product prices in the mobile app"
          toggle={
            <Switch checked={checked} onCheckedChange={setChecked} size="md" />
          }
        />

        <Toggle
          title="Allow stock editing"
          subtitle="Staff can adjust stock quantities"
          toggle={
            <Switch checked={checked} onCheckedChange={setChecked} size="md" />
          }
        />

        <Toggle
          title="Allow discount application"
          subtitle="Staff can apply discounts to transactions"
          toggle={
            <Switch checked={checked} onCheckedChange={setChecked} size="md" />
          }
        />

        <Toggle
          className="border-b-0"
          title="Allow report access"
          subtitle="Staff can generate and download reports"
          toggle={
            <Switch checked={checked} onCheckedChange={setChecked} size="md" />
          }
        />
      </div>
    </div>
  );
}
