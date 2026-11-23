"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import React, { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Modak } from "next/font/google";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Image from "next/image";
import Textarea from "@/components/ui/textarea";
import { UploadIcon, VerifyIcon } from "@/components/icons/svgs";
import { BUSINESSES } from "@/lib/mockdata/businesses";

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
    status: "Approved",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "God's Owned Business",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "In Review",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Swift Logistics",
    from_type: "Agent",
    to_type: "Agent",
    requested_on: "May 19,2026 at 09:15am",
    status: "In Review",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Emeka & co.",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Approved",
  },
  {
    reference_id: "TR-2026-00124",
    business_name: "Big Bites Restaurants",
    from_type: "Merchant",
    to_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Approved",
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
    status: "Approved",
  },
];

const transferBusinesses = Array.from(
  new Map(
    mockTransfers.map((transfer) => [transfer.business_name, transfer]),
  ).values(),
).map((transfer) => {
  const business = BUSINESSES.find(
    (item) => item.business_name === transfer.business_name,
  );

  return {
    id: business?.id ?? transfer.business_name,
    avatar: business?.avatar ?? "/images/de-light.svg",
    business_owner: business?.business_owner,
    business_name: transfer.business_name,
    business_type: business?.business_type ?? transfer.from_type,
  };
});

export default function AllTransfers() {
  type Business = (typeof transferBusinesses)[number];

  const [searchQuery, setSearchQuery] = useState("");
  const [openTransferBusiness, setOpenTransferBusiness] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [openNextModal, setOpenNextModal] = useState(false);
  const [reviewBusiness, setReviewBusiness] = useState(false);
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const businessSuggestions = useMemo(() => {
    const query = businessName.trim().toLowerCase();
    if (!query || selectedBusiness) return [];

    return transferBusinesses.filter((business) =>
      [
        business.business_name,
        business.business_owner,
        business.business_type,
      ].some((value) => value?.toLowerCase().includes(query)),
    );
  }, [businessName, selectedBusiness]);

  const filteredTransfers = useMemo(() => {
    return mockTransfers.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.reference_id.toLowerCase().includes(q) ||
          item.business_name.toLowerCase().includes(q) ||
          item.from_type.toLowerCase().includes(q) ||
          item.to_type.toLowerCase().includes(q) ||
          item.requested_on.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [searchQuery]);

  const handleOpenTransferBusiness = () => {
    setBusinessName("");
    setSelectedBusiness(null);
    setOpenTransferBusiness(true);
  };

  const handleContinue = () => {
    if (!selectedBusiness) return;
    setOpenNextModal(true);
    setOpenTransferBusiness(false);
  };

  const getStatusBadge = (status: TransferItem["status"]) => {
    if (status === "Approved") {
      return <Badge variant="transfer_approved">Approved</Badge>;
    }
    if (status === "In Review") {
      return <Badge variant="transfer_in_review">In Review</Badge>;
    }
    return <Badge variant="transfer_rejected">Rejected</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === "Agent" ? "agent" : "merchant"}>{type}</Badge>
    );
  };

  return (
    <>
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4">
          <div className="relative w-full sm:max-w-[280px]">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              categories={[]}
              products={[]}
              employees={[]}
              chats={[]}
              placeholder="Search business name"
            />
          </div>

          <Button onClick={handleOpenTransferBusiness} size="md">
            Transfer business
          </Button>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference ID</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.reference_id}</TableCell>
                  <TableCell>{item.business_name}</TableCell>
                  <TableCell>{getTypeBadge(item.from_type)}</TableCell>
                  <TableCell>{getTypeBadge(item.to_type)}</TableCell>
                  <TableCell>{item.requested_on}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
              {filteredTransfers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    No transfers match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
            disabled={!selectedBusiness}
            className={`${selectedBusiness ? "bg-[#024E44]" : "bg-[#C7C7C7]"}`}
          >
            Continue
          </Button>
        }
      >
        <div className="space-y-[12px]">
          <div>
            <Input
              label="Business name"
              placeholder="Search business name"
              value={businessName}
              onChange={(event) => {
                setBusinessName(event.target.value);
                setSelectedBusiness(null);
              }}
              autoComplete="off"
              role="combobox"
              aria-expanded={Boolean(businessName.trim() && !selectedBusiness)}
              aria-controls="transfer-business-suggestions"
            />
            {businessName.trim() && !selectedBusiness && (
              <div
                id="transfer-business-suggestions"
                role="listbox"
                className="mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[#E5E7EB] bg-white shadow-lg"
              >
                {businessSuggestions.length > 0 ? (
                  businessSuggestions.map((business) => (
                    <button
                      key={business.id}
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => {
                        setBusinessName(business.business_name);
                        setSelectedBusiness(business);
                      }}
                      className="flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-[#F7F7F7]"
                    >
                      <span className="font-[500] text-[14px] text-[#242424]">
                        {business.business_name}
                      </span>
                      <span className="text-[12px] text-[#6C6C6C]">
                        {business.business_owner} · {business.business_type}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-[14px] text-[#6C6C6C]">
                    No businesses found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedBusiness && (
          <div className="mt-[12px] flex justify-between items-center p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[4px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[40px] h-[40px] relative rounded-full">
                <Image
                  fill
                  src={selectedBusiness.avatar}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {selectedBusiness.business_name}
                </p>
                {selectedBusiness.business_owner && (
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    {selectedBusiness.business_owner}
                  </p>
                )}
              </div>
            </div>

            <Badge variant="merchant"> {selectedBusiness.business_type}</Badge>
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
              setOpenNextModal(false);
              setReviewConfirmed(false);
              setReviewBusiness(true);
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
                  src={selectedBusiness?.avatar ?? "/images/de-light.svg"}
                  alt={selectedBusiness?.business_name ?? ""}
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {selectedBusiness?.business_name}
                </p>
                {selectedBusiness?.business_owner && (
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    {selectedBusiness.business_owner}
                  </p>
                )}
              </div>
            </div>

            <Badge variant="merchant"> {selectedBusiness?.business_type}</Badge>
          </div>

          <Input
            label="Current Business Type"
            value={selectedBusiness?.business_type ?? ""}
            readOnly
          />
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
              disabled={!reviewConfirmed}
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
                  src={selectedBusiness?.avatar ?? "/images/de-light.svg"}
                  alt={selectedBusiness?.business_name ?? ""}
                  className="object-cover"
                />
              </div>
              <div className="space-y-[4px]">
                <p className="font-[500] text-[14px] text-[#242424]">
                  {selectedBusiness?.business_name}
                </p>
                {selectedBusiness?.business_owner && (
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    {selectedBusiness.business_owner}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-[16px]">
            <ReviewBox
              review="Business Name:"
              value={selectedBusiness?.business_name ?? ""}
            />
            <ReviewBox
              review="Current Business Type:"
              value={selectedBusiness?.business_type ?? ""}
            />
            <ReviewBox
              className="!text-[#04907E]"
              review="Requested Business Type:"
              value={<Badge variant="merchant">Agent</Badge>}
            />
            <ReviewBox review="Reason:" value="Owner Request" />
          </div>

          <div className="space-y-[8px]">
            <p className="font-[400] text-[12px] text-[#363636]">
              This request will be reviewed before changes are applied to the
              business.
            </p>
            <div className="flex items-center gap-[8px]">
              <input
                className="accent-primary-color"
                type="checkbox"
                checked={reviewConfirmed}
                onChange={(event) => setReviewConfirmed(event.target.checked)}
              />
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
  value: React.ReactNode;
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
