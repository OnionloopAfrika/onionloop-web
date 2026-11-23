"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { UploadIcon, VerifyIcon } from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { AuthLink } from "./onboarding-step-one";

export default function OnboardingStepThree() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ninPhotoName, setNinPhotoName] = useState("");

  const handleFile = (file?: File) => {
    if (!file) return;
    setNinPhotoName(file.name);
  };

  const [accountSet, setAccountSet] = useState(false);

  if (accountSet) {
    return (
      <div className="w-full max-w-[600px] p-[40px] mx-auto bg-white rounded-[20px] space-y-[40px] flex flex-col items-center">
        <div className="mx-auto  flex flex-col items-center gap-[40px]">
          <VerifyIcon className="text-[#04907E]" />

          <div className="space-y-[8px]">
            <p className="text-center font-[700] text-[24px] text-[#04907E]">
              Account Set Up Successful!
            </p>
            <p className="text-center font-[500] text-[14px] text-[#363636]">
              Your details has been verified successfully you can now proceed to
              sign in
            </p>
          </div>
        </div>

        <Button className="max-w-[342px]">Continue</Button>
      </div>
    );
  }

  return (
    <form
      className="mx-auto w-full max-w-[1006px] rounded-[14px] bg-white px-[16px] pb-[40px] pt-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:px-[32px]"
      style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-[12px] text-center">
        <h1 className="text-[24px] font-[700] text-[#04907E]">
          Create Your Account
        </h1>
        <p className="text-[16px] font-[400] text-[#6C6C6C]">
          Enter your verification details
        </p>
      </div>

      <div className="mt-[32px] grid grid-cols-1 gap-[16px] md:grid-cols-2">
        <Input label="NIN" placeholder="" />
        <Input label="BVN" placeholder="" />
      </div>

      <div className="mt-[32px]">
        <span className="mb-[8px] block text-[14px] font-[600] text-[#131313]">
          Upload a Photo of NIN
        </span>

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files?.[0]);
          }}
          className="flex h-[221px] cursor-pointer items-center justify-center rounded-[6px] border border-dashed border-[#04907E] bg-[#E7F6EC] p-[16px] text-center"
        >
          <div className="flex flex-col items-center gap-[10px]">
            <div className="flex size-[56px] items-center justify-center rounded-[8px] bg-[#B5E3C4]">
              <UploadIcon className="text-[#04907E]" />
            </div>

            {ninPhotoName ? (
              <p className="text-[18px] font-[500] text-[#131313]">
                {ninPhotoName}
              </p>
            ) : (
              <p className="text-[18px] font-[500] text-[#131313]">
                Drag &amp; drop your file here or{" "}
                <span className="text-[#04907E]">click to browse</span>
              </p>
            )}
            <p className="text-[18px] font-[500] text-[#6C6C6C]">
              PNG, JPG or PDF ~ Max size 10MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </div>
      </div>

      <Button
        onClick={() => setAccountSet(true)}
        type="submit"
        variant="primary"
        size="sm"
        className="mt-[28px] h-[52px] !bg-[#044E49] !py-0 text-[14px]"
      >
        Sign up
      </Button>

      <AuthLink text="Sign in" link="/aggregator/auth/login" />
    </form>
  );
}
