"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Badge from "@/components/ui/badge";

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
    avatar: "/images/joshua.svg",
  },
  {
    business_owner: "Oladimeji Yemisi",
    business_name: "God's Owned Business",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "68 Lekki, Ajah, Lagos",
    avatar: "/images/ben.svg",
  },
  {
    business_owner: "John Chinedu",
    business_name: "Swift Logistics",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "2 Ojo str, akala , Lagos",
    avatar: "/images/agent.svg",
  },
  {
    business_owner: "Grace Wanjiku",
    business_name: "Emeka & co.",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "6 Isanlu str, Lagos",
    avatar: "/images/grace.svg",
  },
  {
    business_owner: "Joshua Agbasi",
    business_name: "Big Bites Restaurants",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "190 Tunde close, Lagos",
    avatar: "/images/joshua.svg",
  },
  {
    business_owner: "David Iwalewa",
    business_name: "Grace Beauty Hub",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "45 Unilag road, Lagos",
    avatar: "/images/tunde.svg",
  },
  {
    business_owner: "Hannah Nwankwo",
    business_name: "Prime Med. Pharmacy",
    phone_number: "+234 816 249 0242",
    assigned_on: "May 19,2026 at 09:15am",
    address: "87 Adekunle, Ojoh, Lagos",
    avatar: "/images/zinny.svg",
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

export function MyVisit() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [reviewVerification, setReviewVerification] = useState(false);

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

          <div className="w-[200px] max-lg:w-full">
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

          <div className="w-[200px] max-lg:w-full">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Business Owner</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Assigned On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((item, i) => (
                <TableRow onClick={() => setReviewVerification(true)} key={i}>
                  <TableCell>
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={item.avatar}
                        alt={item.business_owner}
                        width={36}
                        height={36}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[500] text-[#6C6C6C]">
                        {item.business_owner}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.business_name}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.assigned_on}</TableCell>
                </TableRow>
              ))}
              {filteredQueue.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    No items match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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

            <Badge variant="in_progress"> In Progress</Badge>
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
