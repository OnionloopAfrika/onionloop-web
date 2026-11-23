"use client";

import { useState } from "react";
import {
  CopyDetailsIcon,
  CopyIcon,
  CopyLinkIcon,
  LinkIcon,
  MarkIcon,
  VerifyIcon,
} from "../icons/svgs";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

export default function StepThree() {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  if (sent) {
    return (
      <div className="w-full max-w-[600px] p-[40px] mx-auto bg-white rounded-[20px] space-y-[40px] flex flex-col items-center">
        <div className="mx-auto  flex flex-col items-center gap-[40px]">
          <VerifyIcon className="text-[#04907E]" />

          <div className="space-y-[8px]">
            <p className="text-center font-[700] text-[24px] text-[#04907E]">
              Link Sent Successfully!
            </p>
            <p className="text-center font-[500] text-[14px] text-[#363636]">
              Invitation link has been sent to mama nkechi to{" "}
              <br className="max-lg:hidden" /> complete her registration
            </p>
          </div>
        </div>

        <Button
          onClick={() => router.push("/onboarding")}
          className="max-w-[342px]"
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] max-lg:px-[20px] p-[40px] mx-auto bg-white rounded-[20px] space-y-[24px]">
      <div className="mx-auto w-[70px] h-[70px] rounded-full bg-[#E7F6EC] flex justify-center items-center">
        <MarkIcon className="w-[30px] h-[30px] text-[#04802E]" />
      </div>

      <div className="space-y-[8px] flex flex-col items-center">
        <p className="font-[700] text-[20px] text-[#04907E]">
          Link ready to share
        </p>

        <p className="font-[500] text-[16px] text-[#363636]">
          Mama Nkechi will get an SMS shortly
        </p>
      </div>

      <div className="border border-[#C7C7C7] h-[73px] p-[16px] pr-0 rounded-[6px] flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] flex justify-center items-center bg-[#EEEEEE] rounded-[6px]">
            <LinkIcon className="w-[24px] h-[24px] text-[#292D32]" />
          </div>

          <p className="font-[500] text-[14px] max-lg:text-[12px] text-[#363636]">
            app./onb/agg.com/.invite - tunde/m-8Q4x
          </p>
        </div>

        <button className="bg-[#04907E] flex items-center gap-[10px] rounded-[8px] py-[16px] px-[12px] font-[600] text-[14px] text-[#FFFFFF]">
          <CopyLinkIcon />
          Copy
        </button>
      </div>

      <div className="space-y-[24px]">
        <Button onClick={() => setSent(true)}>Done</Button>
        <Button className="text-[#131313]" variant="secondary">
          Back
        </Button>
      </div>
    </div>
  );
}
