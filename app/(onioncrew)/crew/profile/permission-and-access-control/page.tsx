import { PermissionAndControl } from "@/components/permission-and-access/permission-and-control";
import ProfileLayout from "../Shell";
import { DefaultPermission } from "@/components/staff-app/default-permission";
import { MobileAppSettings } from "@/components/staff-app/mobile-app-settings";
import { MobileSettings } from "@/components/staff-app/mobile-settings";

export default function Page() {
  return (
    <ProfileLayout
      active="profile/permission-and-access-control"
      heading="Staff Settings"
      subheading="Roles, permissions, and app access"
    >
      <div className="">
        <PermissionAndControl />
      </div>
    </ProfileLayout>
  );
}
