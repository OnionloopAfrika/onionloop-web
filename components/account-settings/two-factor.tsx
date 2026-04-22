"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";

export function TwoFactor() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [appEnabled, setAppEnabled] = useState(false);

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px]">
      <ProfileHeader
        title="Two-Factor Authentication"
        subtitle="Add an extra layer of security to your account"
      />

      <div className="space-y-[24px]">
        <Toggle
          title="Enable 2FA via SMS"
          subtitle="Receive a code to +234 800 123 4567 on login"
          toggle={
            <Switch
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
              size="md"
            />
          }
        />

        <Toggle
          className="border-b-0"
          title="Authentication App"
          subtitle="Use Google Authentication or similar"
          toggle={
            <Switch
              checked={appEnabled}
              onCheckedChange={setAppEnabled}
              size="md"
            />
          }
        />
      </div>
    </div>
  );
}
