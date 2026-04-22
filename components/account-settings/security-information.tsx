import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";
import Input from "../ui/input";

export function SecurityInformation() {
  return (
    <div className="space-y-[40px] p-[24px] shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-[12px]">
      <ProfileHeader
        title="Security Information"
        subtitle="Manage your password and login options"
      />

      <Input label="Current Password" placeholder="000000" />

      <div className="grid sm:grid-cols-2 gap-[16px]">
        <Input label="New Password" placeholder="Min. 8 character" />
        <Input label="Confirm New Password" placeholder="Re-enter password" />
      </div>

      <Button variant="primary" size="save">
        Update Password
      </Button>
    </div>
  );
}
