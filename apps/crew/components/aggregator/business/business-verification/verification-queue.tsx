"use client";

import {
  AggCallIcon,
  AggMessageIcon,
  LocationIcon,
  ProfileCardIcon,
  UploadIcon,
} from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Image from "next/image";
import React, { useMemo, useState } from "react";

interface QueueItem {
  business_owner: string;
  business_name: string;
  phone_number: string;
  assigned_on: string;
  address: string;
  avatar: string;
}

const mockQueue: QueueItem[] = [
  {
    business_owner: "Joseph Maduabuchi",
    business_name: "De-Light SuperStores",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "16 Ijoko Road, Ota, Lagos",
    avatar: "",
  },
  {
    business_owner: "Oladimeji Yemisi",
    business_name: "God's Owned Business",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "68 Lekki, Ajah, Lagos",
    avatar: "",
  },
  {
    business_owner: "John Chinedu",
    business_name: "Swift Logistics",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "2 Ojo str, akala , Lagos",
    avatar: "",
  },
  {
    business_owner: "Grace Wanjiku",
    business_name: "Emeka & co.",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "6 Isanlu str, Lagos",
    avatar: "",
  },
  {
    business_owner: "Joshua Agbasi",
    business_name: "Big Bites Restaurants",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "190 Tunde close, Lagos",
    avatar: "",
  },
  {
    business_owner: "David Iwalewa",
    business_name: "Grace Beauty Hub",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "45 Unilag road, Lagos",
    avatar: "",
  },
  {
    business_owner: "Hannah Nwankwo",
    business_name: "Prime Med. Pharmacy",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "87 Adekunle, Ojoh, Lagos",
    avatar: "",
  },
];

const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseBusinessDate(dateStr: string): Date {
  const match = dateStr.match(
    /^([A-Za-z]{3})\s+(\d{1,2}),(\d{4})\s+at\s+(.+)$/,
  );
  if (!match) return new Date(NaN);
  const [, mmm, dd, yyyy, time] = match;
  const month = MONTH_MAP[mmm];
  if (month === undefined) return new Date(NaN);
  const timeStr = time.trim();
  return new Date(
    `${yyyy}-${String(month + 1).padStart(2, "0")}-${String(dd).padStart(2, "0")}T${timeStr}`,
  );
}

export function VerificationQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [viewVerification, setViewVerification] = useState(false);
  const [verificationReview, setVerificationReview] = useState(false);

  const filteredQueue = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return mockQueue.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.business_owner.toLowerCase().includes(q) ||
          item.business_name.toLowerCase().includes(q) ||
          item.phone_number.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.assigned_on.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (dateFilter) {
        const d = parseBusinessDate(item.assigned_on);
        if (isNaN(d.getTime())) return false;
        if (dateFilter === "this-month") {
          if (d.getMonth() !== currentMonth || d.getFullYear() !== currentYear)
            return false;
        } else if (dateFilter === "last-month") {
          if (d.getMonth() !== lastMonth || d.getFullYear() !== lastMonthYear)
            return false;
        }
      }

      return true;
    });
  }, [searchQuery, dateFilter]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
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

          <div className="w-[130px] max-lg:w-full">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "all", label: "All Status" },
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
              ]}
              placeholder="All Status"
            />
          </div>

          <div className="w-[140px] max-lg:w-full">
            <Select
              value={dateFilter}
              onValueChange={setDateFilter}
              options={[
                { value: "this-month", label: "This Month" },
                { value: "last-month", label: "Last Month" },
              ]}
              placeholder="This Month"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-b-[#C7C7C7]">
                <th className="px-6 py-4 w-[80px] text-[14px] font-semibold text-gray-500 whitespace-nowrap"></th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Owner
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Name
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Assigned On
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQueue.map((item, i) => (
                <tr
                  onClick={() => setViewVerification(true)}
                  key={i}
                  className="hover:bg-gray-50/50 cursor-pointer transition-colors border border-b-[#C7C7C7] last:border-0"
                >
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap ">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.business_owner}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[14px] font-[500] text-[#6C6C6C]">
                        {getInitials(item.business_owner)}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[500] text-[#6C6C6C]">
                        {item.business_owner}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.business_name}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.phone_number}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.assigned_on}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.address}
                  </td>
                </tr>
              ))}
              {filteredQueue.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 h-[200px] text-center text-[14px] text-[#6C6C6C] font-medium"
                  >
                    No items match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="View Verification Queue"
        description="They will receive an invite to download the Onionloop staff app ↓"
        className2="border-b-0"
        className3="border-t-0"
        footer={
          <Button
            onClick={() => {
              (setViewVerification(false), setVerificationReview(true));
            }}
          >
            Review Verification
          </Button>
        }
        open={viewVerification}
        onOpenChange={setViewVerification}
      >
        <div className="space-y-[16px]">
          <div className="flex gap-[16px] items-start  pb-[16px] border-b border-b-[#C7C7C7]">
            <Image src={"/images/de-light.svg"} width={40} height={40} alt="" />
            <div className=" w-full space-y-[16px]">
              <div className="flex justify-between items-center">
                <p className="font-[600] text-[14px] text-[#131313]">
                  De-Light SuperStores
                </p>
                <p className="font-[400] text-[10px] text-[#6C6C6C]">
                  May 19,2026 at 09:15am
                </p>
              </div>

              <div className="space-y-[8px]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-[8px] items-center">
                    <ProfileCardIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      Joseph Maduabuchi
                    </span>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <AggCallIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      +234 816 249 0242
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-[8px] items-center">
                    <AggMessageIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      josephmaduabuchi@gmail.com
                    </span>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <LocationIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      653, Allen adekunle, Ogba, Lagos, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              Verification Status:
            </p>
            <span className="py-[2px] px-[12px] bg-[#FBEAE9] flex justify-center items-center rounded-full font-[500] text-[13.05px] text-[#CB1A14] h-[26px]">
              Unverified
            </span>
          </div>
        </div>
      </Modal>

      <Modal
        open={verificationReview}
        onOpenChange={setVerificationReview}
        title="View Verification Queue"
        description="They will receive an invite to download the Onionloop staff app ↓"
        className2="border-b-0"
        className3="border-t-0"
        footer={
          <div className="grid grid-cols-2 gap-[16px]">
            <Button
              onClick={() => setVerificationReview(false)}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button onClick={() => setVerificationReview(false)}>Submit</Button>
          </div>
        }
      >
        <div className="space-y-[16px]">
          <div className="flex gap-[16px] items-start  pb-[16px] border-b border-b-[#C7C7C7]">
            <Image src={"/images/de-light.svg"} width={40} height={40} alt="" />
            <div className=" w-full space-y-[16px]">
              <div className="flex justify-between items-center">
                <p className="font-[600] text-[14px] text-[#131313]">
                  De-Light SuperStores
                </p>
                <p className="font-[400] text-[10px] text-[#6C6C6C]">
                  May 19,2026 at 09:15am
                </p>
              </div>

              <div className="space-y-[8px]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-[8px] items-center">
                    <ProfileCardIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      Joseph Maduabuchi
                    </span>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <AggCallIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      +234 816 249 0242
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-[8px] items-center">
                    <AggMessageIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      josephmaduabuchi@gmail.com
                    </span>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <LocationIcon className="text-[#8A8A8A]" />{" "}
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      653, Allen adekunle, Ogba, Lagos, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              To have your verification approved, please provide the following
              details.
            </p>
            <span className="py-[2px] px-[12px] bg-[#FBEAE9] flex justify-center items-center rounded-full font-[500] text-[13.05px] text-[#CB1A14] h-[26px]">
              Unverified
            </span>
          </div>

          <div className="space-y-[48px]">
            <div className="space-y-[20px]">
              <div className="space-y-[1px]">
                <p className="font-[600] text-[14px] text-[#131313]">
                  Verification Evidence{" "}
                </p>
                <p className="font-[500] text-[12px] text-[#6C6C6C]">
                  Upload image captured during business visit.
                </p>
              </div>

              <div className="w-full h-[221px] border border-dashed border-[#04907E] rounded-[6px] bg-[#E7F6EC] flex items-center justify-center p-4">
                <div className="flex flex-col gap-[10px] items-center">
                  <div className="bg-[#B5E3C4] flex justify-center items-center p-[10px] rounded-[8px]">
                    <UploadIcon className="text-[#04907E]" />
                  </div>

                  <div className="space-y-[7px] text-center">
                    <p className="font-[600] text-[14px] text-[#131313]">
                      Drag & drop your file here or{" "}
                      <span className="text-[#04907E]">click to browse</span>
                    </p>

                    <p className="font-[600] text-[14px] text-[#6C6C6C]">
                      PNG, JPG or PDF ~ Max size 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-[20px]">
              <div className="space-y-[1px]">
                <p className="font-[600] text-[14px] text-[#131313] flex items-center">
                  Verification Evidence{" "}
                  <span className="font-[500] text-[14px] text-[#6C6C6C]">
                    (Optional)
                  </span>
                </p>
                <p className="font-[500] text-[12px] text-[#6C6C6C]">
                  Share observations from your visit to support the verification
                  process.{" "}
                </p>
              </div>

              <Textarea placeholder="Add observation from your visit..." />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
