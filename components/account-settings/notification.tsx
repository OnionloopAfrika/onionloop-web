"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { Toggle } from "../toggle";
import Switch from "../ui/switch";

export function Notification() {
  const [notifications, setNotifications] = useState({
    lowStock: false,
    transaction: false,
    staff: false,
    feature: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
              checked={notifications.lowStock}
              onCheckedChange={() => handleToggle("lowStock")}
              size="md"
            />
          }
        />

        <Toggle
          title="Transaction Summaries"
          subtitle="Daily email digest of all sales"
          toggle={
            <Switch
              checked={notifications.transaction}
              onCheckedChange={() => handleToggle("transaction")}
              size="md"
            />
          }
        />

        <Toggle
          title="Staff Activity Alerts"
          subtitle="When staff log in or make changes"
          toggle={
            <Switch
              checked={notifications.staff}
              onCheckedChange={() => handleToggle("staff")}
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
              checked={notifications.feature}
              onCheckedChange={() => handleToggle("feature")}
              size="md"
            />
          }
        />
      </div>
    </div>
  );
}
