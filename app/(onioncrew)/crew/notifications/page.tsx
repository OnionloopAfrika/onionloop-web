import { Notis } from "@/components/notifications/notis";
import { ProfileHeader } from "@/components/profile-header";

export default function page() {
  return (
    <div className="space-y-[24px] max-md:space-y-[0px] min-h-screen bg-[#f7f7f7]">
      <ProfileHeader
        className=" pb-[10px] border-b-[0px]"
        title="Notifications"
        subtitle="Real-time operational alerts across all branches"
      />

      <Notis />
    </div>
  );
}
