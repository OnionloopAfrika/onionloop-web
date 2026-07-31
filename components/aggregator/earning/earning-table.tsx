"use client";

import { CalendarIcon, SearchIcon } from "@/components/icons/svgs";
import Input from "@/components/ui/input";
import React, { useState, useMemo } from "react";

export interface EarningItem {
  id: string;
  businessName: string;
  avatar?: string;
  kycLevel?: string;
  earningType: "Transaction" | "Onboarding";
  balanceBefore?: string;
  balanceAfter: string;
  earnings: string;
  status: "Successful" | "Completed";
  date?: string;
}

interface EarningsTableProps {
  initialData?: EarningItem[];
  itemsPerPage?: number;
}

const MOCK_ONBOARDING_DATA: EarningItem[] = [
  {
    id: "1",
    businessName: "De-Light SuperStores",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦250,250.00",
    earnings: "₦250.00",
    status: "Completed",
  },
  {
    id: "2",
    businessName: "KFC Holdings",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦120,120.00",
    earnings: "₦120.00",
    status: "Completed",
  },
  {
    id: "3",
    businessName: "Proens Stores",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦120,120.00",
    earnings: "₦120.00",
    status: "Completed",
  },
  {
    id: "4",
    businessName: "God’s Owned Business",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦50,050.00",
    earnings: "₦50.00",
    status: "Completed",
  },
  {
    id: "5",
    businessName: "Swift Logistics",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "6",
    businessName: "Emeka & co.",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "7",
    businessName: "Big Bites Restaurants",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "8",
    businessName: "Grace Beauty Hub",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "9",
    businessName: "Mains Cosmetics",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
  {
    id: "10",
    businessName: "Prime Med. Pharmacy",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    kycLevel: "TIER 3",
    earningType: "Onboarding",
    balanceAfter: "₦300,300.00",
    earnings: "₦300.00",
    status: "Completed",
  },
];

const MOCK_TRANSACTION_DATA: EarningItem[] = [
  {
    id: "t1",
    businessName: "De-Light SuperStores",
    earningType: "Transaction",
    balanceBefore: "₦250,000.00",
    earnings: "₦250.00",
    balanceAfter: "₦250,250.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t2",
    businessName: "KFC Holdings",
    earningType: "Transaction",
    balanceBefore: "₦120,000.00",
    earnings: "₦120.00",
    balanceAfter: "₦120,120.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t3",
    businessName: "Proens Stores",
    earningType: "Transaction",
    balanceBefore: "₦120,000.00",
    earnings: "₦120.00",
    balanceAfter: "₦120,120.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t4",
    businessName: "God’s Owned Business",
    earningType: "Transaction",
    balanceBefore: "₦50,000.00",
    earnings: "₦50.00",
    balanceAfter: "₦50,050.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t5",
    businessName: "Swift Logistics",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t6",
    businessName: "Emeka & co.",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t7",
    businessName: "Big Bites Restaurants",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t8",
    businessName: "Grace Beauty Hub",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t9",
    businessName: "Mains Cosmetics",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "t10",
    businessName: "Prime Med. Pharmacy",
    earningType: "Transaction",
    balanceBefore: "₦300,000.00",
    earnings: "₦300.00",
    balanceAfter: "₦300,300.00",
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
];

export const EarningsTableSection: React.FC<EarningsTableProps> = ({
  itemsPerPage = 10,
}) => {
  const [activeTab, setActiveTab] = useState<"transaction" | "onboarding">(
    "transaction",
  );
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("08-05-2026");
  const [currentPage, setCurrentPage] = useState(1);

  const rawData =
    activeTab === "transaction" ? MOCK_TRANSACTION_DATA : MOCK_ONBOARDING_DATA;

  const filteredData = useMemo(() => {
    return rawData.filter((item) =>
      item.businessName.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [rawData, searchValue]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    pages.push(1, 2, 3, 4);
    if (currentPage > 4 && currentPage < totalPages - 1) {
      pages.push("...");
      pages.push(currentPage);
    }
    pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const handleTabSwitch = (tab: "transaction" | "onboarding") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const startIndex =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full">
      <div className="border border-[#F2F4F7] bg-white p-2.5 rounded-[14px] mb-6">
        <div className="bg-[#F7F7F7] p-1.5 rounded-[10px] inline-flex w-full sm:w-auto">
          <button
            onClick={() => handleTabSwitch("transaction")}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-[8px] text-[13px] transition-all ${
              activeTab === "transaction"
                ? "bg-white text-[#024E44] font-bold shadow-sm"
                : "text-[#6C6C6C]"
            }`}
          >
            Transaction Earnings
          </button>
          <button
            onClick={() => handleTabSwitch("onboarding")}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-[8px] text-[13px] transition-all ${
              activeTab === "onboarding"
                ? "bg-white text-[#024E44] font-bold shadow-sm"
                : "text-[#6C6C6C]"
            }`}
          >
            Onboarding Earnings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="w-full md:w-1/2 p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="w-full">
            <Input
              type="text"
              placeholder="Search business name"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              prefixicon={<SearchIcon />}
              className="!h-10 text-xs !bg-[#F9FAFB] !border-[#E5E7EB]"
            />
          </div>
          <div className="w-full sm:w-60">
            <div className="w-full px-2 relative flex items-center justify-start bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none">
              <input
                type="text"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="h-10 px-4 text-xs font-semibold text-[#374151] border-none outline-0"
              />
              <CalendarIcon className="w-4 h-4 text-[#9CA3AF]" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#F3F4F6] text-[12px] font-semibold text-[#6C6C6C]">
                {activeTab === "onboarding" && (
                  <th className="py-3.5 px-6"></th>
                )}
                <th className="py-3.5 px-6">Business Name</th>
                {activeTab === "onboarding" && (
                  <th className="py-3.5 px-6">KYC Level</th>
                )}
                <th className="py-3.5 px-6">Earning Type</th>
                {activeTab === "transaction" && (
                  <th className="py-3.5 px-6">Balance Before</th>
                )}
                {activeTab === "onboarding" && (
                  <th className="py-3.5 px-6">Balance After</th>
                )}
                <th className="py-3.5 px-6">Earnings</th>
                <th className="py-3.5 px-6">Balance After</th>
                <th className="py-3.5 px-6">Status</th>
                {activeTab === "transaction" && (
                  <th className="py-3.5 px-6">Date</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6] text-xs font-medium text-[#374151]">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F9FAFB]/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {activeTab === "onboarding" && item.avatar && (
                          <img
                            src={item.avatar}
                            alt={item.businessName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                        )}
                        {activeTab != "onboarding" && (
                          <td className="text-[#6C6C6C]">
                            {item.businessName}
                          </td>
                        )}{" "}
                      </div>
                    </td>

                    {activeTab === "onboarding" && (
                      <td className="py-4 px-6 text-[#6C6C6C]">
                        {item.businessName}
                      </td>
                    )}
                    {activeTab === "onboarding" && (
                      <td className="py-4 px-6">
                        <span className="text-[10px] font-bold text-[#024E44] bg-[#B5E3C4] px-2.5 py-1 rounded-full">
                          {item.kycLevel}
                        </span>
                      </td>
                    )}

                    <td className="py-4 px-6">
                      {activeTab === "onboarding" ? (
                        <span className="text-[11px] font-semibold text-[#0D5EBA] bg-[#C6DDF7] px-3 py-1 rounded-full">
                          Onboarding
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#024E44] bg-[#B5E3C4] px-3 py-1 rounded-full">
                          Transaction
                        </span>
                      )}
                    </td>

                    {activeTab === "transaction" && (
                      <td className="py-4 px-6 text-[#6C6C6C]">
                        {item.balanceBefore}
                      </td>
                    )}

                    {activeTab === "onboarding" && (
                      <td className="py-4 px-6 text-[#6C6C6C]">
                        {item.balanceAfter}
                      </td>
                    )}

                    <td className="py-4 px-6 text-[#6C6C6C]">
                      {item.earnings}
                    </td>
                    <td className="py-4 px-6 text-[#6C6C6C]">
                      {item.balanceAfter}
                    </td>

                    <td className="py-4 px-6">
                      {item.status === "Completed" ? (
                        <span className="inline-flex items-center text-[11px] font-medium text-[#024E44] bg-[#B5E3C4] px-3 py-1 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[11px] font-medium text-[#024E44] bg-[#B5E3C4] px-3 py-1 rounded-full">
                          Successful
                        </span>
                      )}
                    </td>

                    {activeTab === "transaction" && (
                      <td className="py-4 px-6 text-[#6B7280]">{item.date}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={activeTab === "onboarding" ? 7 : 7}
                    className="py-12 text-center text-[#9CA3AF] text-xs"
                  >
                    No earnings activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#F3F4F6] bg-white flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span className="text-[#6B7280] text-[12px] font-medium">
            Showing {startIndex} to {endIndex} of {totalItems} inactive
            businesses
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-full text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5415 16.5999L7.10817 11.1666C6.4665 10.5249 6.4665 9.4749 7.10817 8.83324L12.5415 3.3999"
                  stroke="#C7C7C7"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-md text-[12px] font-medium flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? "bg-[#008A75] text-white"
                      : "text-[#6C6C6C] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="text-[#9CA3AF] text-xs px-1 select-none"
                >
                  {page}
                </span>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-full text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.45801 3.4001L12.8913 8.83343C13.533 9.4751 13.533 10.5251 12.8913 11.1668L7.45801 16.6001"
                  stroke="#6C6C6C"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsTableSection;
