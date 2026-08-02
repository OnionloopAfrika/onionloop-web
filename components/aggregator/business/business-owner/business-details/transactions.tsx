"use client";

import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import React, { useState } from "react";

interface BusinessTransaction {
  id: string;
  customerName: string;
  txnType: string;
  amount: number;
  earnings: number;
  status: "Successful" | "Failed" | "Pending";
  date: string;
}

const mockTransactions: BusinessTransaction[] = [
  {
    id: "TXN-0091",
    customerName: "Joseph Maduabuchi",
    txnType: "Transfer",
    amount: 250000,
    earnings: 250,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Oluwafunmiike Robbin",
    txnType: "QR Payment",
    amount: 120000,
    earnings: 120,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Oladimeji Yemisi",
    txnType: "QR Payment",
    amount: 120000,
    earnings: 120,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "John Chinedu",
    txnType: "QR Payment",
    amount: 50000,
    earnings: 50,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Grace Wanjiku",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Philip Tonbara",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Joshua Agbasi",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Mary Adebayo",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "David Iwalewa",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Hannah Nwankwo",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
];

export function BusinessTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("successful");
  const [activeTab, setActiveTab] = useState("Transactions");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: BusinessTransaction["status"]) => {
    if (status === "Successful") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8F5E9] text-[#04802E]">
          Successful
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FFF3E0] text-[#E65100]">
          Pending
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FFEBEE] text-[#C62828]">
        Failed
      </span>
    );
  };

  return (
    <div className="w-full space-y-[16px] font-sans">
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
          <div className="relative w-full sm:max-w-[360px]">
            <SearchInput placeholder="Search  TXN ID, customer name, type, Amount" />
          </div>

          <div className="w-[180px] max-lg:w-full">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "all", label: "All Status" },
                { value: "successful", label: "Status: Successful" },
                { value: "pending", label: "Status: Pending" },
                { value: "failed", label: "Status: Failed" },
              ]}
              placeholder="Status: Successful"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  TXN ID
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  TXN Type
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Earnings
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                  TXN Date
                </th>
                <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                    {txn.id}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {txn.customerName}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {txn.txnType}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                    {formatCurrency(txn.earnings)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(txn.status)}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                    {txn.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[14px] font-medium text-[#04907E] hover:underline">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100">
          <span className="text-[14px] text-[#6C6C6C] font-medium">
            Showing 1 to 10 of 70 transactions
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
