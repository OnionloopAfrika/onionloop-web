import { NewMerchant } from "../icons/svgs";
import Button from "../ui/button";
import Input from "../ui/input";

export default function StepTwo() {
  return (
    <div className="w-full max-w-[600px] p-[40px] max-lg:px-[20px] mx-auto bg-white rounded-[20px] space-y-[24px]">
      <div className="space-y-[8px]">
        <div className="p-[16px] rounded-[6px] h-[48px] border border-[#04907E] flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] flex justify-center items-center bg-[#04907E] rounded-[6px]">
              <NewMerchant color="#ffffff" />
            </div>
            <p className="font-[500] text-[14px] text-[#363636] max-lg:text-[12px]">
              Onboarding a merchant
            </p>
          </div>

          <p className="font-[500] text-[12px] text-[#04907E]">Change</p>
        </div>

        <p className="font-[400] text-[12px] text-[#363636]">
          They will get a link to complete KYC on their phone
        </p>
      </div>

      <div className="space-y-[16px]">
        <Input
          label="Merchant phone number"
          placeholder="e.g +234 903 246 7894"
        />

        <Input
          label="Business name (optional)"
          placeholder="e.g Mama Nkechi Shop"
        />

        <div className="p-[16px] border border-[#C7C7C7] rounded-[6px]">
          <p className="font-[500] text-[12px] max-lg:text-[12px] text-[#363636]">
            <span className="text-[#04907E] font-[400] text-[12px]">Tip: </span>{" "}
            Each merchant who completes KYC moves you towards
            <span className="font-[700]">+12,000</span> bonus
          </p>
        </div>

        <div className="space-y-[24px]">
          <Button>Generate Link</Button>
          <Button className="text-[#131313]" variant="secondary">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
