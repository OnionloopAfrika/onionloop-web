import Input from "@/components/ui/input";
import ProfileLayout from "../Shell";
import { ProfileHeader } from "@/components/profile-header";
import Button from "@/components/ui/button";

const page = () => {
  return (
    <ProfileLayout
      active="/branch-manager/profile/branch-information"
      heading="Branch Information"
      subheading="Manage your branch Information"
    >
      <div className="flex flex-col gap-[40px] bg-white p-[24px]">
        <ProfileHeader
          title="Branch Information"
          subtitle="Enter details about your branch"
          btn={
            <div className="flex items-center gap-[5px]">
              <Button variant="outline" size="md">
                Discard
              </Button>

              <Button variant="primary" size="md">
                Save Changes{" "}
              </Button>
            </div>
          }
        />
        <Input placeholder="KFC Holdings" label="Business Name" />
        <div className="grid grid-cols-2 gap-[16px]">
          <Input placeholder="Enter firstname" label="Branch Name" />
          <Input placeholder="Enter last name" label="Branch ID" />
        </div>

        <div className="grid grid-cols-2 gap-[16px]">
          <Input placeholder="Enter your branch location" label="Location" />
          <Input placeholder="example@email.com" label="Email" />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default page;
