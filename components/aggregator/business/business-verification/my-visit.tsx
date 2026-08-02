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
import React, { useState } from "react";

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

export function MyVisit() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [reviewVerification, setReviewVerification] = useState(false);

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
            <SearchInput placeholder="Search business name" />
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
                <th className="px-6 w-[80px] py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap"></th>
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
                  Address
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Assigned On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockQueue.map((item, i) => (
                <tr
                  onClick={() => setReviewVerification(true)}
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
                    {item.address}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.assigned_on}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={reviewVerification}
        onOpenChange={setReviewVerification}
        title="View Verification Queue"
        description="They will receive an invite to download the Onionloop staff app ↓"
        className2="border-b-0"
        className3="border-t-0"
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
            <span className="py-[2px] px-[12px] bg-[#FBEAE9] flex justify-center items-center rounded-full font-[500] text-[13.05px] text-[#DD900D] h-[26px]">
              In Progress
            </span>
          </div>

          <p className="font-[500] text-[12px] text-[#363636]">
            Your verification is being reviewed, once we confirm your
            verification we will reach out to you with teh status of your visit
          </p>

          <div className="space-y-[16px] mt-[48px]">
            <div className="space-y-[1px]">
              <p className="font-[600] text-[14px] text-[#131313]">
                Verification Evidence
              </p>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="w-[174.74px] h-[128.1px]  relative">
                <Image
                  fill
                  src={"/images/ver-img.svg"}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="w-[174.74px] h-[128.1px]  relative">
                {" "}
                <Image
                  fill
                  src={"/images/ver-img.svg"}
                  alt=""
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-[4px] mt-[48px]">
            <p className="font-[600] text-[14px] text-[#131313]">
              Verification Evidence
            </p>

            <p className="font-[500] text-[12px] text-[#6C6C6C]">
              Her business is valid and has been verified to be in existence
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
