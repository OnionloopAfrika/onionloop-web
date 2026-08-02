"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Modak } from "next/font/google";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Image from "next/image";
import Textarea from "@/components/ui/textarea";
import { UploadIcon, VerifyIcon } from "@/components/icons/svgs";

interface TransferItem {
  reference_id: string;
  business_name: string;
  from_type: string;
  to_type: string;
  requested_on: string;
  status: "Approved" | "In Review" | "Rejected";
}

const mockTransfers: TransferItem[] = [
  {
    reference_id: "TR-2026-00124",
    business_name: "De-Light SuperStores",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "God's Owned Business",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Swift Logistics",
    from_type: "Agent",
    to_type: "Agent",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Emeka & co.",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Big Bites Restaurants",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Grace Beauty Hub",
    from_type: "Agent",
    to_type: "Agent",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Prime Med. Pharmacy",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
  },
];

export default function Rejected() {
  const [searchQuery, setSearchQuery] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [step, setStep] = useState(1);
  const [openNextModal, setOpenNextModal] = useState(false);
  const [reviewBusiness, setReviewBusiness] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [openTransferBusiness, setOpenTransferBusiness] = useState(false);

  const handleContinue = () => {
    if (!businessName) return;

    if (step === 1) {
      setShowCard(true);
      setStep(2);
    } else if (step === 2) {
      setOpenNextModal(true);
      setOpenTransferBusiness(false);
    }
  };

  const getStatusBadge = (status: TransferItem["status"]) => {
    if (status === "Approved") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E7F6EC] text-[#04802E]">
          Approved
        </span>
      );
    }
    if (status === "In Review") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E3EFFC] text-[#0D5EBA]">
          In Review
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FBEAE9] text-[#CB1A14]">
        Rejected
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5FFFD] text-[#04907E]">
        {type}
      </span>
    );
  };

  return (
    <>
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4">
          <div className="relative w-full sm:max-w-[280px]">
            <SearchInput placeholder="Search business name" />
          </div>

          <Button onClick={() => setOpenTransferBusiness(true)} size="md">
            Transfer business
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-b-[#C7C7C7]">
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Reference ID
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Name
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Type
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Type
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Requested On
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransfers.map((item, i) => (
                <tr
                  onClick={() => setOpenTransferBusiness(true)}
                  key={i}
                  className="hover:bg-gray-50/50 cursor-pointer transition-colors border border-b-[#C7C7C7] last:border-0"
                >
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.reference_id}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.business_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(item.from_type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(item.to_type)}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.requested_on}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Transfer Business"
        description="Change a business's account type and submit for review and approval."
        open={openTransferBusiness}
        onOpenChange={setOpenTransferBusiness}
        footer={
          <Button
            onClick={handleContinue}
            className={`${businessName ? "bg-[#024E44]" : "bg-[#C7C7C7]"}`}
          >
            Continue
          </Button>
        }
      >
        <div className="space-y-[12px]">
          <Input
            label="Business name"
            placeholder="Search business name"
            value={businessName}
            onChange={(e: any) => setBusinessName(e.target.value)}
          />
        </div>

        {showCard && (
          <div className="mt-[12px] flex justify-between items-center p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[4px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[40px] h-[40px] relative rounded-full">
                <Image
                  fill
                  src={"/images/de-light.svg"}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {businessName}
                </p>
                <p className="font-[400] text-[12px] text-[#6C6C6C]">
                  Joseph Maduabuchi
                </p>
              </div>
            </div>
            <p className="font-[400] text-[15px] text-[#04907E]">Merchant</p>
          </div>
        )}
      </Modal>

      <Modal
        className2="border-b-0"
        className3="border-t-0"
        title="Transfer Business"
        description="Change a business's account type and submit for review and approval."
        open={openNextModal}
        onOpenChange={setOpenNextModal}
        footer={
          <Button
            onClick={() => {
              (setOpenNextModal(false), setReviewBusiness(true));
            }}
          >
            Continue
          </Button>
        }
      >
        <div className="space-y-[32px]">
          <div className="mt-[12px] flex justify-between items-center p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[4px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[40px] h-[40px] relative rounded-full">
                <Image
                  fill
                  src={"/images/de-light.svg"}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {businessName}
                </p>
                <p className="font-[400] text-[12px] text-[#6C6C6C]">
                  Joseph Maduabuchi
                </p>
              </div>
            </div>
            <p className="font-[400] text-[15px] text-[#04907E]">Merchant</p>
          </div>

          <Input label="Current Business Type" placeholder="Merchant" />
          <Input
            label="New  Business Type"
            placeholder="Enter new business type"
          />

          <Textarea label="Reason" placeholder="Write something..." />

          <Input label="Additional Note(Optional)" placeholder="Enter note" />

          <div className="gap-[10px] flex flex-col">
            <div>
              <div>
                <span className="font-[600] text-[14px] text-[#131313]">
                  Attach a File(Optional)
                </span>{" "}
                <p className="font-[500] text-[12px] text-[#6C6C6C]">
                  Upload a receipt, screenshot or supporting document.{" "}
                </p>
              </div>
            </div>
            <div className="w-full h-[221px] border border-dashed border-[#C7C7C7] rounded-[6px] bg-[#F7F7F7] flex items-center justify-center p-4">
              <div className="flex flex-col gap-[10px] items-center">
                <div className="bg-[#E7F6EC] flex justify-center items-center p-[10px] rounded-[8px]">
                  <UploadIcon className="text-[#04907E]" />
                </div>

                <div className="space-y-[7px] text-center">
                  <p className="font-[500] text-[12px] text-[#131313]">
                    Drag & drop your file here or{" "}
                    <span className="text-[#04907E]">click to browse</span>
                  </p>

                  <p className="font-[500] text-[12px] text-[#6C6C6C]">
                    PNG, JPG or PDF ~ Max size 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={reviewBusiness}
        onOpenChange={setReviewBusiness}
        footer={
          <div className="grid grid-cols-2 gap-[16px]">
            <Button
              onClick={() => setReviewBusiness(false)}
              variant="secondary"
            >
              Cancel{" "}
            </Button>

            <Button
              onClick={() => {
                (setReviewBusiness(false), setReviewSuccess(true));
              }}
            >
              Submit
            </Button>
          </div>
        }
        className2="border-b-0"
        className3="border-t-0"
        title="Review Business transfer"
        description="Change a business's account type and submit for review and approval."
      >
        <div className="space-y-[24px]">
          <div className=" flex justify-between items-center p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[4px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[40px] h-[40px] relative rounded-full">
                <Image
                  fill
                  src={"/images/de-light.svg"}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {businessName}
                </p>
                <p className="font-[400] text-[12px] text-[#6C6C6C]">
                  Joseph Maduabuchi
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-[16px]">
            <ReviewBox review="Business Name:" value="De-Light SuperStores" />
            <ReviewBox review="Current Business Type:" value="Merchant" />
            <ReviewBox
              className="!text-[#04907E]"
              review="Requested Business Type:"
              value="Agent"
            />
            <ReviewBox review="Reason:" value="Owner Request" />
          </div>

          <div className="space-y-[8px]">
            <p className="font-[400] text-[12px] text-[#363636]">
              This request will be reviewed before changes are applied to the
              business.
            </p>
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" />{" "}
              <span className="font-[400] text-[12px] text-[#6C6C6C]">
                I confirm the information is correct.
              </span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className3="border-t-0"
        open={reviewSuccess}
        onOpenChange={setReviewSuccess}
        footer={
          <div className="grid grid-cols-2 gap-[16px]">
            <Button onClick={() => setReviewSuccess(false)} variant="secondary">
              View Requests
            </Button>
            <Button onClick={() => setReviewSuccess(false)}>
              Return to Transfer
            </Button>
          </div>
        }
      >
        <div className=" flex flex-col items-center  gap-[24px]">
          <VerifyIcon className="text-[#04907E]" />

          <div className="space-y-[8px] flex flex-col items-center ">
            <p className="font-[700] text-[24px] text-[#04907E] ">
              Request Submitted
            </p>

            <p className="font-[500] text-[16px] text-[#363636]">
              Transfer request submitted successfully.
            </p>

            <p className="flex items-center font-[500] text-[14px] text-[#6C6C6C] mx-auto">
              Reference ID:{" "}
              <span className="text-[#363636]">TR-2026-00124</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

type ReviewProps = {
  review: string;
  value: string;
  className?: string;
};

const ReviewBox = ({ review, value, className = "" }: ReviewProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-[400] text-[12px] text-[#6C6C6C]">{review} </p>
      <p className={`  font-[500] text-[14px] text-[#242424] ${className} `}>
        {value}
      </p>
    </div>
  );
};
