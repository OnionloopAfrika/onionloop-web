"use client";

import React, { useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import { DownloadIcon, DownloadIconSolid } from "@/components/icons/svgs";

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

export default function AggTransaction() {
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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
      <div className="grid grid-cols-3 gap-[16px]">
        {STAT.map((item, i) => (
          <div
            key={i}
            className="bg-white h-[82px] rounded-[8px] p-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
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
              <SearchInput placeholder="Search business name" />
            </div>

            <div className="w-[180px]">
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

            <div className="w-[150px]">
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
              {mockTransactions.map((txn, i) => (
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
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
          <span className="text-[14px] text-[#6C6C6C] font-medium">
            Showing 1 to 8 of 23,654 Transactions
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
