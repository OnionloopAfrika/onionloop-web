import React from "react";
import ProfileLayout from "../Shell";
import { DefaultPermission } from "@/components/staff-app/default-permission";
import { MobileAppSettings } from "@/components/staff-app/mobile-app-settings";
import { MobileSettings } from "@/components/staff-app/mobile-settings";

const page = () => {
  return (
    <ProfileLayout
      active="profile/staff-app-settings"
      heading="Staff Settings"
      subheading="Roles, permissions, and app access"
    >
      <div className="space-y-[40px]">
        <DefaultPermission />
        <MobileAppSettings />
        <MobileSettings />
      </div>
    </ProfileLayout>
  );
};

export default page;
