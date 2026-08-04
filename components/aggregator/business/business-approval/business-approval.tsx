"use client";

import React, { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import SearchBar from "@/components/ui/search-bar";

interface ApprovalItem {
  id: string;
  business_name: string;
  related_name: string;
  business_type: string;
  requested_on: string;
  status: "Pending" | "Approved" | "Rejected";
  avatar: string;
}

const mockApprovals: ApprovalItem[] = [
  {
    id: "1",
    business_name: "De-Light SuperStores",
    related_name: "De-Light SuperStores",
    business_type: "Merchant",
    requested_on: "Aug 1,2026 at 09:15am",
    status: "Pending",
    avatar: "",
  },
  {
    id: "2",
    business_name: "KFC Holdings",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "Aug 2,2026 at 11:30am",
    status: "Approved",
    avatar: "",
  },
  {
    id: "3",
    business_name: "Proens Stores",
    related_name: "God's Owned Business",
    business_type: "Agent",
    requested_on: "Aug 3,2026 at 02:45pm",
    status: "Rejected",
    avatar: "",
  },
  {
    id: "4",
    business_name: "God's Owned Business",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "July 15,2026 at 10:00am",
    status: "Approved",
    avatar: "",
  },
  {
    id: "5",
    business_name: "Swift Logistics",
    related_name: "God's Owned Business",
    business_type: "Merchant",
    requested_on: "July 20,2026 at 04:20pm",
    status: "Pending",
    avatar: "",
  },
  {
    id: "6",
    business_name: "Emeka & co.",
    related_name: "Swift Logistics",
    business_type: "Agent",
    requested_on: "July 28,2026 at 08:45am",
    status: "Approved",
    avatar: "",
  },
  {
    id: "7",
    business_name: "Big Bites Restaurants",
    related_name: "Emeka & co.",
    business_type: "Merchant",
    requested_on: "May 19,2026 at 09:15am",
    status: "Rejected",
    avatar: "",
  },
  {
    id: "8",
    business_name: "Grace Beauty Hub",
    related_name: "Big Bites Restaurants",
    business_type: "Merchant",
    requested_on: "May 22,2026 at 01:10pm",
    status: "Pending",
    avatar: "",
  },
  {
    id: "9",
    business_name: "Mains Cosmetics",
    related_name: "Grace Beauty Hub",
    business_type: "Agent",
    requested_on: "June 5,2026 at 03:05pm",
    status: "Approved",
    avatar: "",
  },
  {
    id: "10",
    business_name: "Prime Med. Pharmacy",
    related_name: "Prime Med. Pharmacy",
    business_type: "Agent",
    requested_on: "July 31,2026 at 07:50pm",
    status: "Pending",
    avatar: "",
  },
];

export function BusinessApproval() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredApprovals = useMemo(() => {
    return mockApprovals.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.business_name.toLowerCase().includes(q) ||
          item.related_name.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (statusFilter && statusFilter !== "all") {
        const normalized =
          statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1);
        if (item.status !== normalized) return false;
      }

      if (typeFilter && typeFilter !== "all") {
        const normalized =
          typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1);
        if (item.business_type !== normalized) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const BUSINESS_APPROVAL = [
    { value: "128", desc: "Transfer Request" },
    { value: "128", desc: "In Review" },
    { value: "128", desc: "Approved" },
    { value: "1", desc: "Rejected" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusBadge = (status: ApprovalItem["status"]) => {
    if (status === "Pending") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FBE2B7] text-[#DD900D]">
          Pending
        </span>
      );
    }
    if (status === "Approved") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8F5E9] text-[#04802E]">
          Approved
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FFEBEE] text-[#C62828]">
        Rejected
      </span>
    );
  };

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-4 gap-[16px] max-lg:grid-cols-2">
        {BUSINESS_APPROVAL.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="w-[60%] max-lg:w-full">
          <SearchBar
            searchPlaceholder="Search business name..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            categories={[]}
            products={[]}
            statusOptions={[
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            statusValue={statusFilter}
            statusPlaceholder="All Status"
            onStatusChange={setStatusFilter}
            dateOptions={[
              { value: "all", label: "All Types" },
              { value: "merchant", label: "Merchant" },
              { value: "agent", label: "Agent" },
            ]}
            dateValue={typeFilter}
            datePlaceholder="All Types"
            onDateChange={setTypeFilter}
          />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-b-[#C7C7C7]">
                <th className="px-6 py-4 text-[14px] w-[80px] font-semibold text-gray-500 whitespace-nowrap"></th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Name
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Name
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
              {filteredApprovals.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 cursor-pointer transition-colors border border-b-[#C7C7C7] last:border-0"
                >
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.business_name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[12px] font-medium text-gray-600">
                        {getInitials(item.business_name)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-[500] text-[#6C6C6C]">
                        {item.business_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.related_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-medium text-[#04907E]">
                      {item.business_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {item.requested_on}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
              {filteredApprovals.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 h-[200px] text-center text-[14px] text-[#6C6C6C] font-medium"
                  >
                    No requests match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
          <span className="text-[14px] text-[#6C6C6C] font-medium">
            Showing{" "}
            {filteredApprovals.length === 0
              ? "0"
              : `1 to ${filteredApprovals.length}`}{" "}
            of {mockApprovals.length} Requests
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0D5C4D] text-white text-[14px] font-medium">
              1
            </button>
            <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[14px] font-medium hover:bg-gray-50">
              2
            </button>
            <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[14px] font-medium hover:bg-gray-50">
              3
            </button>
            <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[14px] font-medium hover:bg-gray-50">
              4
            </button>
            <span className="text-[14px] text-[#6C6C6C] font-medium">...</span>
            <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[14px] font-medium hover:bg-gray-50">
              10
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
