"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";
import Select from "../ui/select";
import Button from "../ui/button";

export function MobileAppSettings() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px]">
      <ProfileHeader
        title="Mobile App Settings"
        subtitle="Control the staff app experience"
      />

      <div className="space-y-[24px]">
        <Toggle
          title="Require PIN on app open"
          subtitle="Staff can see product prices in the mobile app"
          toggle={<Switch checked={open} onCheckedChange={setOpen} size="md" />}
        />

        <Toggle
          title="Allow stock editing"
          subtitle="Product data syncs automatically every 5 minutes"
          toggle={<Switch checked={open} onCheckedChange={setOpen} size="md" />}
        />

        <Toggle
          title="Offline mode"
          subtitle="Allow transactions when internet is unavailable"
          toggle={<Switch checked={open} onCheckedChange={setOpen} size="md" />}
        />

        <Select
          label="Session Timeout(minutes)"
          placeholder="13"
          //   value={selectedRole}
          //   onValueChange={setSelectedRole}
          options={[
            { value: "admin", label: "10" },
            { value: "editor", label: "5" },
            { value: "viewer", label: "2" },
          ]}
        />
      </div>

      <Button variant="primary" size="save">
        Save Settings
      </Button>
    </div>
  );
}
