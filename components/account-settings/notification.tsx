"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";

export function Notification() {
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <div className="p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)] space-y-[40px]">
      <ProfileHeader
        title="Notification"
        subtitle="Choose which alert you receive"
      />

      <div className="space-y-[24px]">
        <Toggle
          title="Low Stock Alert"
          subtitle="Notify me when product are running low"
          toggle={
            <Switch
              checked={toggleOn}
              onCheckedChange={setToggleOn}
              size="md"
            />
          }
        />

        <Toggle
          title="Transaction Summaries"
          subtitle="Daily email digest of all sales"
          toggle={
            <Switch
              checked={toggleOn}
              onCheckedChange={setToggleOn}
              size="md"
            />
          }
        />

        <Toggle
          title="Staff Activity Alerts"
          subtitle="When staff log in or make changes"
          toggle={
            <Switch
              checked={toggleOn}
              onCheckedChange={setToggleOn}
              size="md"
            />
          }
        />

        <Toggle
          className="border-b-0"
          title="New Feature Announcements"
          subtitle="Product updates from Onionloop"
          toggle={
            <Switch
              checked={toggleOn}
              onCheckedChange={setToggleOn}
              size="md"
            />
          }
        />
      </div>
    </div>
  );
}
