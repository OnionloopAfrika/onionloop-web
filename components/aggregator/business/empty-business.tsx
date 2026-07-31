"use client";

import {
  AddIcon,
  AgentIcon,
  DuplicateIcon,
  LinkIcon,
  MerchantIcon,
  NoProductsIcon,
  UploadIcon,
  VerifyIcon,
} from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import React, { useEffect, useState } from "react";

interface EmptyBusinessProps {
  triggerOpen?: number;
  showEmptyUI?: boolean;
}

export default function EmptyBusiness({
  triggerOpen = 0,
  showEmptyUI = true,
}: EmptyBusinessProps) {
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [merchantSuccess, setMerchantSuccess] = useState(false);

  const [stepOneAgent, setStepOneAgent] = useState(false);
  const [stepTwoAgent, setStepTwoAgent] = useState(false);
  const [stepThreeAgent, setStepThreeAgent] = useState(false);
  const [agentSuccess, setAgentSuccess] = useState(false);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (triggerOpen > 0) {
      setStepOne(true);
    }
  }, [triggerOpen]);

  const businessType = [
    {
      icon: <MerchantIcon className="text-[#04907E]" />,
      type: "Merchant",
      description: "Accept payment through QR codes for your business",
    },
    {
      icon: <AgentIcon className="text-[#04907E]" />,
      type: "Agent",
      description: "Help individuals deposit money & withdraw cash",
    },
  ];

  return (
    <>
      {showEmptyUI && (
        <div className="w-full pt-[20px]  flex justify-center items-start">
          <div className="max-w-[836px] flex flex-col items-center gap-[42px]">
            <div className="space-y-[24px] flex flex-col items-center">
              <NoProductsIcon />

              <div className="text-center space-y-[16px]">
                <p className="font-[500] text-[24px] text-[#131313]">
                  No Network Data yet
                </p>
                <p className="font-[400] text-[14px] text-[#6C6C6C]">
                  You haven’t added any businesses yet. <br /> Start by adding
                  new business
                </p>
              </div>
            </div>

            <Button
              onClick={() => setStepOne(true)}
              variant="primary"
              size="save"
            >
              <AddIcon /> Add New Business
            </Button>
          </div>
        </div>
      )}

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Add New Business"
        description="Onboard new businesses and enable secure payment collection."
        footer={
          <Button
            onClick={() => {
              setStepOne(false);
              if (selectedType === "Merchant") {
                setStepTwo(true);
              } else if (selectedType === "Agent") {
                setStepOneAgent(true);
              }
            }}
          >
            Next
          </Button>
        }
        open={stepOne}
        onOpenChange={setStepOne}
      >
        <div className="space-y-[24px]">
          {businessType.map((item, i) => (
            <div
              onClick={() => setSelectedType(item.type)}
              key={i}
              className="p-[16px] cursor-pointer flex justify-between items-center rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="flex items-start gap-[8px]">
                <div className="w-[32px] h-[32px] p-[8px] flex justify-center items-center rounded-[2.67px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ">
                  {item.icon}
                </div>

                <div className="space-y-[6px]">
                  <p className="font-[500] text-[14px] text-[#363636]">
                    {item.type}
                  </p>
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    {item.description}
                  </p>
                </div>
              </div>
              <Checkbox
                checked={selectedType === item.type}
                onCheckedChange={() => setSelectedType(item.type)}
              />
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={stepTwo}
        onOpenChange={setStepTwo}
        className2="border-b-0"
        className3="border-t-0"
        title="Add New Business"
        description="Onboard new businesses and enable secure payment collection."
        footer={
          <div className="space-y-[24px]">
            <Button
              onClick={() => {
                setStepTwo(false);
                setMerchantSuccess(true);
              }}
            >
              Generate Link
            </Button>
            <Button onClick={() => setStepTwo(false)} variant="ghost">
              Back
            </Button>
          </div>
        }
      >
        <div className="space-y-[32px]">
          {businessType
            .filter((item) => item.type === selectedType)
            .map((item, i) => (
              <div className="space-y-[32px]" key={i}>
                <div className="p-[16px] rounded-[12px] border border-[#04907E] flex justify-between items-center">
                  <div className="flex items-start gap-[8px]">
                    <div className="w-[32px] h-[32px] p-[8px] flex justify-center items-center rounded-[2.67px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ">
                      {item.icon}
                    </div>

                    <div className="space-y-[6px]">
                      <p className="font-[500] text-[14px] text-[#363636]">
                        {item.type}
                      </p>
                      <p className="font-[400] text-[12px] text-[#6C6C6C]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <p className="font-[600] text-[14px] text-[#04907E]">
                    Change
                  </p>
                </div>

                <div className="space-y-[16px]">
                  <Input
                    placeholder="e.g +234 903 246 7894"
                    label="Merchant phone number"
                  />

                  <Input
                    placeholder="e.g Mama Nkechi Shop"
                    label="Business name (optional)"
                  />

                  <p className="flex gap-[6px] items-center text-[#363636]  font-[500] text-[12px] ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8067 4.24001C12.1134 2.84001 10.7734 1.80667 9.22006 1.46667C7.59339 1.10667 5.92673 1.49334 4.65339 2.52001C3.3734 3.54001 2.64673 5.06667 2.64673 6.70001C2.64673 8.42667 3.68006 10.2333 5.24006 11.28V11.8333C5.2334 12.02 5.22673 12.3067 5.4534 12.54C5.68673 12.78 6.03339 12.8067 6.30673 12.8067H9.72673C10.0867 12.8067 10.3601 12.7067 10.5467 12.52C10.8001 12.26 10.7934 11.9267 10.7867 11.7467V11.28C12.8534 9.88667 14.1534 6.94667 12.8067 4.24001Z"
                        fill="#8A8A8A"
                      />
                      <path
                        d="M10.1733 14.6664C10.1333 14.6664 10.0866 14.6598 10.0466 14.6464C8.70661 14.2664 7.29994 14.2664 5.95994 14.6464C5.71327 14.7131 5.45327 14.5731 5.38661 14.3264C5.31327 14.0798 5.45994 13.8198 5.70661 13.7531C7.21327 13.3264 8.79994 13.3264 10.3066 13.7531C10.5533 13.8264 10.6999 14.0798 10.6266 14.3264C10.5599 14.5331 10.3733 14.6664 10.1733 14.6664Z"
                        fill="#8A8A8A"
                      />
                    </svg>
                    <span className="">Tip:</span>
                    <span className="font-[400]">
                      Each merchant who completes KYC moves you towards
                    </span>
                    <span> +12,000</span>
                    bonus
                  </p>
                </div>

                <p className="font-[400] text-[12px] text-[#363636] text-center">
                  They will get a link to complete KYC on their phone
                </p>
              </div>
            ))}
        </div>
      </Modal>

      <Modal
        className3="border-t-0"
        open={merchantSuccess}
        onOpenChange={setMerchantSuccess}
        footer={<Button onClick={() => setMerchantSuccess(false)}>Done</Button>}
      >
        <div className="space-y-[48px]">
          <div className="flex flex-col gap-[32px] items-center">
            <VerifyIcon className="text-[#04907E]" />

            <div className="space-y-[8px]">
              <p className="font-[700] text-[24px] text-[#04907E] text-center">
                Business Added Successfully!
              </p>
              <div className="space-y-[8px]">
                <p className="font-[500] text-[14px] text-[#363636] text-center">
                  The business has been successfully onboarded to Onionloop. The
                  business owner can now complete any the remaining setup using
                  the link below and begin using the platform.
                </p>

                <p className="font-[500] text-[14px] text-[#363636] text-center mt-[32px]">
                  Copy the link below to share with the business account
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#C7C7C7] bg-[#F7F7F7] px-[16px] py-[8px] rounded-[6px] flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <LinkIcon className="text-[#292D32] w-[32px] h-[32px]" />{" "}
              <p className="font-[500] text-[14px] text-[#363636]">
                Input app./onb/agg.com/.invite - tunde/m-8Q4x
              </p>
            </div>

            <button className="bg-[#04907E] rounded-[8px] py-[16px] px-[12px] flex items-center gap-[10px] font-[600] text-[14px] text-white">
              <DuplicateIcon />
              Copy
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Add New Business"
        description="Onboard new businesses and enable secure payment collection."
        open={stepOneAgent}
        onOpenChange={setStepOneAgent}
        footer={
          <Button
            onClick={() => {
              setStepOneAgent(false);
              setStepTwoAgent(true);
            }}
          >
            Next
          </Button>
        }
      >
        <div className="space-y-[32px]">
          {businessType
            .filter((item) => item.type === "Agent")
            .map((item, i) => (
              <div key={i}>
                <div className="space-y-[32px]">
                  <div className="grid grid-cols-2 gap-[12px]">
                    <Input label="First Name" placeholder="Adegoriola" />

                    <Input label="Last Name" placeholder="Adegoriola" />
                  </div>

                  <Input
                    label="Email Address"
                    placeholder="josephmaduabuchi@mail.com"
                  />

                  <div className="grid grid-cols-2 gap-3 items-start">
                    <div className="flex flex-col gap-2">
                      <span className="text-[#131313] font-[600] text-[12px]">
                        Phone Number
                      </span>

                      <div className="grid grid-cols-[1fr_2fr] gap-3">
                        <Input
                          placeholder="+234"
                          className="rounded-tr-[0px] rounded-br-[0px]"
                        />
                        <Select
                          className=" rounded-tl-[0px] rounded-bl-[0px]"
                          placeholder="800 000 000"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[#131313] font-[600] text-[12px]">
                        Gender
                      </span>

                      <Select placeholder="Select gender" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[#131313] font-[600] text-[12px]">
                      Date of Birth
                    </span>

                    <div className="grid grid-cols-[1fr_2fr_2fr] gap-3">
                      <Select placeholder="DD" />
                      <Select placeholder="MM" />
                      <Select placeholder="YYYY" />
                    </div>

                    <p className="font-[400] text-[12px] text-[#6C6C6C]">
                      You must be 18 years and above to create an account
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Add New Business"
        description="Onboard new businesses and enable secure payment collection."
        footer={
          <Button
            onClick={() => {
              (setStepTwoAgent(false), setStepThreeAgent(true));
            }}
          >
            Next
          </Button>
        }
        open={stepTwoAgent}
        onOpenChange={setStepTwoAgent}
      >
        <div className="space-y-[32px]">
          <div className="grid grid-cols-2 gap-[12px]">
            <Input placeholder="Adegoriola" label="Business Name" />
            <Select placeholder="Select Type" label="Business Type" />
          </div>

          <div className="grid grid-cols-2 gap-[12px]">
            <Input placeholder="Adegoriola" label="Business Location" />
            <Select placeholder="Select City" label="City" />
          </div>

          <Input placeholder="RC 74747474" label="CAC Number" />
        </div>
      </Modal>

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Add New Business"
        description="Onboard new businesses and enable secure payment collection."
        footer={
          <Button
            onClick={() => {
              setStepThreeAgent(false);
              setAgentSuccess(true);
            }}
          >
            Create business account
          </Button>
        }
        open={stepThreeAgent}
        onOpenChange={setStepThreeAgent}
      >
        <div className="space-y-[40px]">
          <div className="grid grid-cols-2 gap-[12px]">
            <Input label="NIN" placeholder="0000000000" />
            <Input label="BVN" placeholder="0000000000" />
          </div>

          <div className="flex flex-col gap-[20px]">
            <span className="font-[600] text-[14px] text-[#131313]">
              Upload a Photo of NIN
            </span>

            <div className="w-full h-[221px] border border-dashed border-[#04907E] rounded-[6px] bg-[#E7F6EC] flex items-center justify-center p-4">
              <div className="flex flex-col gap-[10px] items-center">
                <div className="bg-[#B5E3C4] flex justify-center items-center p-[10px] rounded-[8px]">
                  <UploadIcon className="text-[#04907E]" />
                </div>

                <div className="space-y-[7px] text-center">
                  <p className="font-[500] text-[18px] text-[#131313]">
                    Drag & drop your file here or{" "}
                    <span className="text-[#04907E]">click to browse</span>
                  </p>

                  <p className="font-[500] text-[18px] text-[#6C6C6C]">
                    PNG, JPG or PDF ~ Max size 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className3="border-t-0"
        open={agentSuccess}
        onOpenChange={setAgentSuccess}
        footer={<Button onClick={() => setAgentSuccess(false)}>Done</Button>}
      >
        <div className="gap-[40px] flex flex-col items-center">
          <VerifyIcon className="text-[#04907E]" />

          <div className="flex flex-col items-center gap-[8px]">
            <p className="font-[700] text-[24px] text-[#04907E]">
              Business Added Successfully!
            </p>

            <p className="text-center font-[500] text-[14px] text-[#363636]">
              The business has been successfully onboarded to Onionloop. <br />{" "}
              The business owner can now complete any remaining setup and begin
              using the platform.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
