import { ProfileHeader } from "../profile-header";
import { PermissionsTable } from "./permissions-table";

export function PermissionAndControl() {
  return (
    <div className="space-y-[24px]">
      <ProfileHeader
        className="border-b-0 space-y-[6px]"
        title="Permissions & Access Control"
        subtitle="Manage what each role can do in the staff app"
      />

      <PermissionsTable />
    </div>
  );
}
