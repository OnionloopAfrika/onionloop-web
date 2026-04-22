import React from "react";
import ProfileLayout from "../Shell";
import { SecurityInformation } from "@/components/account-settings/security-information";
import { TwoFactor } from "@/components/account-settings/two-factor";
import { Billing } from "@/components/account-settings/billing";
import { Notification } from "@/components/account-settings/notification";

const page = () => {
  return (
    <ProfileLayout
      active="account-settings"
      heading="Account Settings"
      subheading="Security, billing, and integrations"
    >
      <div className="space-y-[40px]">
        <SecurityInformation />
        <TwoFactor />
        <Notification />
        <Billing />
      </div>
    </ProfileLayout>
  );
};

export default page;
