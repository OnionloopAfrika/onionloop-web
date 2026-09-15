"use client";

import React, { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";

interface RevenueItem {
  business_owner: string;
  business_name: string;
  earning_type: "Onboarding" | "Transaction";
  amount: number;
  date: string;
  avatar: string;
}

const mockRevenue: RevenueItem[] = [
  {
    business_owner: "Joseph Maduabuchi",
    business_name: "De-Light SuperStores",
    earning_type: "Onboarding",
    amount: 250,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Oluwafunmiike Robbin",
    business_name: "KFC Holdings",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Oladimeji Yemisi",
    business_name: "Proens Stores",
    earning_type: "Onboarding",
    amount: 120,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "John Chinedu",
    business_name: "God's Owned Business",
    earning_type: "Transaction",
    amount: 50,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Grace Wanjiku",
    business_name: "Swift Logistics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Philip Tonbara",
    business_name: "Emeka & co.",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Joshua Agbasi",
    business_name: "Big Bites Restaurants",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Mary Adebayo",
    business_name: "Grace Beauty Hub",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "David Iwalewa",
    business_name: "Mains Cosmetics",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
  {
    business_owner: "Hannah Nwankwo",
    business_name: "Prime Med. Pharmacy",
    earning_type: "Onboarding",
    amount: 300,
    date: "May 19,2026 at 09:15am",
    avatar: "",
  },
];

export function RevenueBalance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [earningFilter, setEarningFilter] = useState("");

  const filteredRevenue = useMemo(() => {
    return mockRevenue.filter((item) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          item.business_owner.toLowerCase().includes(q) ||
          item.business_name.toLowerCase().includes(q) ||
          item.earning_type.toLowerCase().includes(q) ||
          String(item.amount).includes(q) ||
          item.date.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (earningFilter && earningFilter !== "all") {
        const typeMap: Record<string, RevenueItem["earning_type"]> = {
          onboarding: "Onboarding",
          transaction: "Transaction",
        };
        if (item.earning_type !== typeMap[earningFilter]) return false;
      }

      return true;
    });
  }, [searchQuery, earningFilter]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getEarningBadge = (type: RevenueItem["earning_type"]) => {
    if (type === "Onboarding") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#C6DDF7] text-[#0D5EBA]">
          Onboarding
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#B5E3C4] text-[#024E44]">
        Transaction
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="grid grid-cols-[2fr_1fr] gap-3 p-4 w-[40%] max-lg:w-full max-lg:grid-cols-1">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          categories={[]}
          products={[]}
          employees={[]}
          chats={[]}
          placeholder="Search business name"
        />

        <Select
          value={earningFilter}
          onValueChange={setEarningFilter}
          options={[
            { value: "all", label: "All Earning Types" },
            { value: "onboarding", label: "Onboarding" },
            { value: "transaction", label: "Transaction" },
          ]}
          placeholder="All Earning Types"
        />
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
                Earning Type
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRevenue.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50/50 transition-colors border border-b-[#C7C7C7] last:border-0"
              >
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.business_owner}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[12px] font-medium text-gray-600">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {getEarningBadge(item.earning_type)}
                </td>
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                  {formatAmount(item.amount)}
                </td>
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                  {item.date}
                </td>
              </tr>
            ))}
            {filteredRevenue.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 h-[200px] text-center text-[14px] text-[#6C6C6C] font-medium"
                >
                  No revenue items match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
        <span className="text-[14px] text-[#6C6C6C] font-medium">
          Showing{" "}
          {filteredRevenue.length === 0
            ? "0"
            : `1 to ${filteredRevenue.length}`}{" "}
          of {mockRevenue.length} Accounts
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
            16
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
  );
}
