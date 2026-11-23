import Button from "../ui/button";
import Input from "../ui/input";
import { ProfileHeader } from "../profile-header";

export function PersonalInfo() {
  return (
    <div className="flex flex-col gap-[40px] p-[24px] rounded-[12px] bg-white  shadow-sm">
      <ProfileHeader
        title="Personal Information "
        className="flex-col md:flex-row gap-4 justify-between items-start border-b-0 pb-[0px]"
        subtitle="Update your name and contact details "
        btn={
          <div className="flex flex-nowrap gap-[5px] justify-end">
            <Button
              variant="outline"
              size="md"
              className="shrink-0 whitespace-nowrap"
            >
              Discard
            </Button>

            <Button
              variant="primary"
              size="md"
              className="shrink-0 whitespace-nowrap"
            >
              Save Changes
            </Button>
          </div>
        }
      />

      <div className="w-full space-y-[32px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Input label="First Name" placeholder="Enter first name" />
          <Input label="Last Name" placeholder="Enter last name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <Input label="Email" placeholder="example@email.com" />
          <Input label="Phone Number" placeholder="000000000" />
        </div>

        <div>
          <Input label="Business Name " placeholder="Input Yetty Mama Lounge" />
        </div>

        <div>
          <Input
            label="Business Address"
            placeholder="14 Balogun St, Lagos Island, Lagos"
          />
        </div>
      </div>
    </div>
  );
}
