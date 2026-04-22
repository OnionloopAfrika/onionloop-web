import Image from "next/image";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";

export function ProfilePhoto() {
  return (
    <div className="space-y-[40px] p-[24px] shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-[12px]">
      <ProfileHeader
        title="Profile Photo"
        subtitle="Your avatar across the platform"
      />
      <div className="flex justify-start">
        <div className="flex justify-between items-center gap-[20px] w-fit">
          <Image
            src={"/icons/avatar.svg"}
            width={102}
            height={102}
            alt="user-avatar"
          />

          <div className="space-y-[8px]">
            <Button variant="outline" size="msg">
              Edit Photo
            </Button>

            <p className="font-[500] text-[14px] text-[#363636]">
              JPG or PNG, max 2MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
