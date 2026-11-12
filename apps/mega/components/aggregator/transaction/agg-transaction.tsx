"use client";

import React, { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import { DownloadIconSolid } from "@/components/icons/svgs";

interface AggTxn {
  id: string;
  business_name: string;
  txn_type: string;
  balance_before: number;
  earnings: number;
  balance_after: number;
  date: string;
}

const mockTransactions: AggTxn[] = [
  {
    id: "TXN-0091",
    business_name: "De-Light SuperStores",
    txn_type: "Transfer",
    balance_before: 5000,
    earnings: 500,
    balance_after: 5500,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "KFC Holdings",
    txn_type: "QR Payment",
    balance_before: 5000,
    earnings: 120000,
    balance_after: 120120,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Proens Stores",
    txn_type: "QR Payment",
    balance_before: 10000,
    earnings: 120000,
    balance_after: 120120,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "God's Owned Business",
    txn_type: "QR Payment",
    balance_before: 5000,
    earnings: 50000,
    balance_after: 50050,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Swift Logistics",
    txn_type: "Transfer",
    balance_before: 2000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Emeka & co.",
    txn_type: "Transfer",
    balance_before: 3000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Big Bites Restaurants",
    txn_type: "Transfer",
    balance_before: 3000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Grace Beauty Hub",
    txn_type: "Transfer",
    balance_before: 1000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Mains Cosmetics",
    txn_type: "Transfer",
    balance_before: 10000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    business_name: "Prime Med. Pharmacy",
    txn_type: "Transfer",
    balance_before: 15000,
    earnings: 300000,
    balance_after: 300300,
    date: "May 19,2026 at 09:15am",
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

function parseFilterDate(dateStr: string): Date {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return new Date(NaN);
  const [dd, mm, yyyy] = parts;
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function AggTransaction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((txn) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          txn.id.toLowerCase().includes(q) ||
          txn.business_name.toLowerCase().includes(q) ||
          txn.txn_type.toLowerCase().includes(q) ||
          String(txn.balance_before).includes(q) ||
          String(txn.earnings).includes(q) ||
          String(txn.balance_after).includes(q) ||
          txn.date.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (typeFilter && typeFilter !== "all") {
        const typeMap: Record<string, string> = {
          transfer: "Transfer",
          qr: "QR Payment",
        };
        if (txn.txn_type !== typeMap[typeFilter]) return false;
      }

      if (dateFilter) {
        const itemDate = parseBusinessDate(txn.date);
        const filterDate = parseFilterDate(dateFilter);
        if (isNaN(itemDate.getTime()) || isNaN(filterDate.getTime()))
          return false;
        if (
          itemDate.getFullYear() !== filterDate.getFullYear() ||
          itemDate.getMonth() !== filterDate.getMonth() ||
          itemDate.getDate() !== filterDate.getDate()
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, typeFilter, dateFilter]);

  const STAT = [
    {
      value: "678",
      description: "Total Transaction",
    },
    {
      value: "₦487,265.00",
      description: "Total Volume",
    },
    {
      value: "450",
      description: "Successful Transaction",
    },
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-3 gap-[16px] max-lg:grid-cols-1">
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

      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
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

            <div className="w-[180px] max-lg:w-full">
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
                options={[
                  { value: "all", label: "All Transaction Types" },
                  { value: "transfer", label: "Transfer" },
                  { value: "qr", label: "QR Payment" },
                ]}
                placeholder="All Transaction Types"
              />
            </div>

            <div className="w-[150px] max-lg:w-full">
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
                options={[
                  { value: "08-05-2026", label: "08-05-2026" },
                  { value: "09-05-2026", label: "09-05-2026" },
                ]}
                placeholder="08-05-2026"
              />
            </div>
          </div>

          <button className="flex items-center gap-[10px] bg-[#024E44] py-[8px] px-[12px] rounded-[8px]">
            <DownloadIconSolid className="text-white" />
            <span className="font-[500] text-[16px] text-white">
              Download Report
            </span>
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-b-[#C7C7C7]">
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  TXN ID
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Business Name
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  TXN Type
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Balance Before
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Earnings
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Balance After
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((txn, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50/50 transition-colors border border-b-[#C7C7C7] last:border-0"
                >
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {txn.id}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {txn.business_name}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {txn.txn_type}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {formatAmount(txn.balance_before)}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {formatAmount(txn.earnings)}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {formatAmount(txn.balance_after)}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                    {txn.date}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 h-[200px] text-center text-[14px] text-[#6C6C6C] font-medium"
                  >
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
          <span className="text-[14px] text-[#6C6C6C] font-medium">
            Showing{" "}
            {filteredTransactions.length === 0
              ? "0"
              : `1 to ${filteredTransactions.length}`}{" "}
            of {mockTransactions.length} Transactions
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
    </div>
  );
}
