"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import MultiSelect from "../ui/multi-select";
import Input from "../ui/input";
import Select from "../ui/select";
import { useRouter } from "next/navigation";

interface LeaveRequest {
  id: string;
  employee: string;
  avatar: string;
  leaveType: string;
  reason: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

const mockRequests: LeaveRequest[] = [
  {
    id: "1",
    employee: "Titi Folarin",
    avatar: "https://i.pravatar.cc/150?u=12",
    leaveType: "Sick Leave",
    reason: "Flu and Fever",
    date: "2nd-5th April, 2026",
    status: "Approved",
  },
  {
    id: "2",
    employee: "Mary Olarewaju",
    avatar: "https://i.pravatar.cc/150?u=13",
    leaveType: "Annual Leave",
    reason: "Vacation",
    date: "2nd-5th April, 2026",
    status: "Approved",
  },
  {
    id: "3",
    employee: "David Anigbogu",
    avatar: "https://i.pravatar.cc/150?u=14",
    leaveType: "Casual Leave",
    reason: "Family event",
    date: "2nd-5th April, 2026",
    status: "Pending",
  },
  {
    id: "4",
    employee: "Sarah Olarewaju",
    avatar: "https://i.pravatar.cc/150?u=15",
    leaveType: "Annual Leave",
    reason: "Wedding",
    date: "2nd-5th April, 2026",
    status: "Pending",
  },
  {
    id: "5",
    employee: "Adanma Dappa",
    avatar: "https://i.pravatar.cc/150?u=16",
    leaveType: "Annual Leave",
    reason: "Wedding",
    date: "2nd-5th April, 2026",
    status: "Rejected",
  },
];

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.16602 1.66602C5.02388 1.66602 1.66602 5.02388 1.66602 9.16602C1.66602 13.3082 5.02388 16.666 9.16602 16.666C10.9369 16.666 12.5644 16.0523 13.8474 15.0259L16.9101 18.0886C17.2355 18.414 17.7632 18.414 18.0886 18.0886C18.414 17.7632 18.414 17.2355 18.0886 16.9101L15.0259 13.8474C16.0523 12.5644 16.666 10.9369 16.666 9.16602C16.666 5.02388 13.3082 1.66602 9.16602 1.66602ZM3.33268 9.16602C3.33268 5.94435 5.94435 3.33268 9.16602 3.33268C12.3877 3.33268 14.9993 5.94435 14.9993 9.16602C14.9993 12.3877 12.3877 14.9993 9.16602 14.9993C5.94435 14.9993 3.33268 12.3877 3.33268 9.16602Z"
      fill="#8A8A8A"
    />
  </svg>
);

const MoreVertical = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4.16699V4.17533M10 10.0003V10.0087M10 15.8337V15.842"
      stroke="#A8A8A8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LeaveRequestPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("this_month");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRequests = useMemo(() => {
    return mockRequests.filter((request) => {
      const matchesTab = activeTab === "All" || request.status === activeTab;

      const matchesSearch =
        request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMultiStatus =
        selectedStatus.length === 0 ||
        selectedStatus.includes(request.status.toLowerCase());

      return matchesTab && matchesSearch && matchesMultiStatus;
    });
  }, [activeTab, searchQuery, selectedStatus]);

  return (
    <div className="min-h-screen text-[#131313] py-6">
      <div className="flex items-center gap-2 mb-6 text-[14px]">
        <span
          onClick={() => router.back()}
          className="text-[#6C6C6C] cursor-pointer"
        >
          Staff management
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="#6C6C6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-medium">Leave request</span>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-[16px_24px] mb-6 shadow-sm border border-[#F0F0F0] overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex gap-2 p-1 bg-[#F7F7F7] w-full md:w-fit rounded-full">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-initial md:px-6 md:py-2 p-[8px_12px] text-[10px] rounded-full md:text-[14px] font-medium transition-all text-center ${
                activeTab === tab
                  ? "bg-white shadow-sm text-[#024E44] font-semibold"
                  : "text-[#6C6C6C]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden shadow-sm">
        <div className="p-4 md:p-6 flex flex-col-reverse md:flex-row items-stretch md:items-center justify-between border-b border-[#F0F0F0] gap-4">
          <div className="flex flex-row md:flex-row gap-2 md:gap-4 items-center w-full max-w-[760px]">
            <div className="flex-1 md:w-100">
              <Input
                prefixicon={<SearchIcon />}
                placeholder="Search products..."
                className="!bg-[#F7F7F7] border-none shadow-sm rounded-lg focus:ring-0 placeholder:font-semibold w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-50">
              <MultiSelect
                options={statusOptions}
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                placeholder="Status: "
              />
            </div>
            <div className="w-[120px] md:w-[150px] bg-white">
              <Select
                options={monthOptions}
                value={selectedMonth}
                onValueChange={setSelectedMonth}
                placeholder="Timeline: "
              />
            </div>
          </div>
          <span className="text-[14px] text-[#6C6C6C] font-semibold hidden md:inline">
            Showing {filteredRequests.length.toString().padStart(2, "0")}{" "}
            employees
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[520px] md:min-w-full">
            <thead>
              <tr className="text-left bg-[#FBFBFB] border-b border-[#F0F0F0]">
                <th className="p-4 md:p-6 text-[14px] font-semibold text-[#6C6C6C] text-left"></th>
                <th className="p-4 md:p-6 text-[14px] font-semibold text-[#6C6C6C] text-left">
                  Employee
                </th>
                <th className="p-4 md:p-6 text-[14px] font-semibold text-[#6C6C6C] text-left">
                  Leave Type
                </th>
                <th className="p-4 md:p-6 text-[14px] font-semibold text-[#6C6C6C] text-left">
                  Status
                </th>
                <th className="p-4 md:p-6 w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-[#F0F0F0] last:border-none hover:bg-gray-50 transition-colors align-middle"
                >
                  <td className="p-4 md:p-6 pr-2">
                    <img
                      src={request.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                  </td>
                  <td className="p-4 md:p-6 pr-2">
                    <div className="flex items-center gap-3">
                      <span className="font-normal text-sm text-[#6c6c6c] truncate max-w-[150px] md:max-w-none">
                        {request.employee}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 md:p-6 px-2 text-sm text-[#6c6c6c] text-left whitespace-nowrap">
                    {request.leaveType}
                  </td>
                  <td className="p-4 md:p-6 px-2 text-left">
                    <span
                      className={`px-4 py-1 rounded-full text-[12px] font-medium inline-block text-center min-w-[90px] ${
                        request.status === "Approved"
                          ? "bg-[#E6F4F1] text-[#008A70]"
                          : request.status === "Pending"
                            ? "bg-[#FFF8E6] text-[#FFA800]"
                            : "bg-[#FEECEB] text-[#F34139]"
                      }`}
                    >
                      {request.status === "Rejected"
                        ? "Rejection"
                        : request.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 pl-2 text-right relative">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === request.id ? null : request.id,
                        )
                      }
                      className="text-gray-400 hover:text-black p-1 inline-block"
                    >
                      <MoreVertical />
                    </button>

                    {activeMenu === request.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-4 top-12 w-44 bg-white border border-gray-100 shadow-xl rounded-lg z-20 overflow-hidden text-left"
                      >
                        {request.status === "Approved" ? (
                          <div className="p-4 flex items-center gap-2 text-[#008A70] text-sm font-medium bg-gray-50/50">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6663 5L7.49967 14.1667L3.33301 10"
                                stroke="#008A70"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Approved
                          </div>
                        ) : request.status === "Rejected" ? (
                          <div className="p-4 flex items-center gap-2 text-[#CB1A14] text-sm font-medium bg-gray-50/50">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.70057 3.75776C4.44022 3.49741 4.01811 3.49741 3.75776 3.75776C3.49741 4.01811 3.49741 4.44022 3.75776 4.70057L7.05759 8.0004L3.75776 11.3002C3.49741 11.5606 3.49741 11.9827 3.75776 12.243C4.01811 12.5034 4.44022 12.5034 4.70057 12.243L8.0004 8.94321L11.3002 12.243C11.5606 12.5034 11.9827 12.5034 12.243 12.243C12.5034 11.9827 12.5034 11.5606 12.243 11.3002L8.94321 8.0004L12.243 4.70057C12.5034 4.44022 12.5034 4.01811 12.243 3.75776C11.9827 3.49741 11.5606 3.49741 11.3002 3.75776L8.0004 7.05759L4.70057 3.75776Z"
                                fill="#CB1A14"
                              />
                            </svg>
                            Rejected
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setActiveMenu(null)}
                              className="w-full text-left px-4 py-3 text-sm font-medium text-[#008A70] hover:bg-gray-50 border-b border-gray-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setActiveMenu(null)}
                              className="w-full text-left px-4 py-3 text-sm font-medium text-[#F34139] hover:bg-gray-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#F0F0F0] flex justify-end md:hidden">
          <span className="text-[14px] text-[#6C6C6C] font-semibold">
            Showing {filteredRequests.length.toString().padStart(2, "0")}{" "}
            products
          </span>
        </div>
      </div>
    </div>
  );
}
