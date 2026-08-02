"use client";

import { PlusIcon } from "@/components/icons/svgs";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import { BUSINESSES } from "@/lib/mockdata/businesses";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BusinessOwnerProps {
  onAddBusiness?: () => void;
}

export function BusinessOwner({ onAddBusiness }: BusinessOwnerProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const STAT = [
    {
      value: "128",
      description: "Total Business",
    },
    {
      value: "96",
      description: "Active Business",
    },
    {
      value: "18",
      description: "Inactive Business",
    },
    {
      value: "90",
      description: "Total Business",
    },
    {
      value: "38",
      description: "Total",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-5 gap-[16px] max-lg:grid-cols-2">
        {STAT.map((item, i) => (
          <div
            key={i}
            className="bg-white min-h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
          >
            <p className="font-[600] text-[20px] text-[#000000]">
              {item.value}
            </p>
            <p className="font-[500] text-[10px] text-[#6C6C6C]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full bg-white font-sans rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full flex-1">
            <div className="relative w-full sm:max-w-[280px]">
              <SearchInput />
            </div>

            <div className="w-[130px] max-lg:w-full">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
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

          <button
            onClick={onAddBusiness}
            className="h-[40px] px-4 bg-[#024E44] hover:bg-[#0a4a3e] text-white text-[14px] font-medium rounded-lg flex items-center gap-2 whitespace-nowrap"
          >
            <PlusIcon />
            Add New Business
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap"></th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  Business Owner
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  Business Name
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  KYC Level
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  Phone Number
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  Business Type
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                  Date
                </th>
                <th className="px-[15px] h-[81.82px] py-[10px] text-[16px] font-[600] text-[#6C6C6C] whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BUSINESSES.map((biz, i) => (
                <tr
                  onClick={() =>
                    router.push(`/aggregator/business/business-owner/${biz.id}`)
                  }
                  key={i}
                  className="hover:bg-gray-50/50 transition-colors border-b border-[#C7C7C7] last:border-0 cursor-pointer"
                >
                  <td className="px-6 h-[81.82px] py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {biz.avatar ? (
                      <img
                        src={biz.avatar}
                        alt={biz.business_owner}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[14px] font-medium text-[#6C6C6C]">
                        {getInitials(biz.business_owner)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 h-[81.82px] py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] text-[#6C6C6C] font-medium">
                        {biz.business_owner}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 h-[81.82px] py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {biz.business_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8F5E9] text-[#04802E]">
                      {biz.hyc_level}
                    </span>
                  </td>
                  <td className="px-6 h-[81.82px] py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {biz.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-medium text-[#04907E]">
                      {biz.business_type}
                    </span>
                  </td>
                  <td className="px-6 h-[81.82px] py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {biz.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
          <span className="text-[14px] text-[#6C6C6C] font-medium">
            Showing 1 to 10 of 128 businesses
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
