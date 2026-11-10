import React from "react";
import ProfileLayout from "../Shell";
import { ProfileHeader } from "@/components/profile-header";
import { PersonalInfo } from "@/components/profile/personal-information";
import { ProfilePhoto } from "@/components/profile/profile-photo";
import { BusinessCategory } from "@/components/profile/business-category";

const page = () => {
  return (
    <ProfileLayout
      active="profile/my-profile"
      heading="My Profile"
      subheading="Manage your personal Information"
    >
      <div className=" flex flex-col gap-[40px]">
        <PersonalInfo />
        <ProfilePhoto />
      </div>
    </ProfileLayout>
  );
};

export default page;
