"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";
import Select from "../ui/select";
import Button from "../ui/button";

export function MobileAppSettings() {
  const [settings, setSettings] = useState({
    requirePin: true,
    stockEdit: false,
    offlineMode: true,
  });

  const [sessionTimeout, setSessionTimeout] = useState("");

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px] bg-white">
      <ProfileHeader
        title="Mobile App Settings"
        subtitle="Control the staff app experience"
      />

      <div className="space-y-[24px]">
        <Toggle
          title="Require PIN on app open"
          subtitle="Staff can see product prices in the mobile app"
          toggle={
            <Switch
              checked={settings.requirePin}
              onCheckedChange={() => handleToggle("requirePin")}
              size="md"
            />
          }
        />

        <Toggle
          title="Allow stock editing"
          subtitle="Product data syncs automatically every 5 minutes"
          toggle={
            <Switch
              checked={settings.stockEdit}
              onCheckedChange={() => handleToggle("stockEdit")}
              size="md"
            />
          }
        />

        <Toggle
          title="Offline mode"
          subtitle="Allow transactions when internet is unavailable"
          toggle={
            <Switch
              checked={settings.offlineMode}
              onCheckedChange={() => handleToggle("offlineMode")}
              size="md"
            />
          }
        />

        <Select
          label="Session Timeout (minutes)"
          placeholder="13"
          value={sessionTimeout}
          onValueChange={setSessionTimeout}
          options={[
            { value: "10", label: "10" },
            { value: "5", label: "5" },
            { value: "2", label: "2" },
          ]}
        />
      </div>

      <Button variant="primary" size="save">
        Save Settings
      </Button>
    </div>
  );
}
