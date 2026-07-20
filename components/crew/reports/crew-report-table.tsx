"use client";

import { useState } from "react";
import Select from "../../ui/select";

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  processedBy: string;
  transactionType: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-7821",
    customerName: "Adaeze Nwosu",
    amount: 45000,
    processedBy: "Titi Folarin",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7820",
    customerName: "Emeka Eze",
    amount: 12800,
    processedBy: "Titi Folarin",
    transactionType: "QR Payment",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7819",
    customerName: "Emeka Eze",
    amount: 6500,
    processedBy: "Mary Olarenwaju",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7818",
    customerName: "Chidinma Oka",
    amount: 3200,
    processedBy: "David Anigbogu",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7817",
    customerName: "Femi Adeyemi",
    amount: 28400,
    processedBy: "Samuel Saidu",
    transactionType: "QR Payment",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7816",
    customerName: "Nkechi Uba",
    amount: 15000,
    processedBy: "Adanma Dappa",
    transactionType: "QR Payment",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7815",
    customerName: "Nkechi Uba",
    amount: 9300,
    processedBy: "Kemi Saidu",
    transactionType: "QR Payment",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7814",
    customerName: "Gbenga Olanrewaju",
    amount: 22100,
    processedBy: "Titi Folarin",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7813",
    customerName: "Adaeze Nwosu",
    amount: 7600,
    processedBy: "Titi Folarin",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
  {
    id: "TXN-7812",
    customerName: "Emeka Eze",
    amount: 45000,
    processedBy: "Titi Folarin",
    transactionType: "Bank Transfer",
    status: "Completed",
    date: "May 19,2026 at 08:15am",
  },
];

export default function CrewReportTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const formatAmount = (amount: number) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

    return <span className="text-[#04802E] font-medium">+{formatted}</span>;
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "Completed") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8F5E9] text-[#04802E]">
          Completed
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
    <div className="w-full bg-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1 max-w-4xl">
          <div className="relative w-full max-w-[320px]">
            <input
              type="text"
              placeholder="Search by ref or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div className="w-[140px]">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "all", label: "All Status" },
                { value: "completed", label: "Completed" },
              ]}
              placeholder="All Status"
            />
          </div>

          <div className="w-[140px]">
            <Select
              value={sortFilter}
              onValueChange={setSortFilter}
              options={[{ value: "latest", label: "Latest" }]}
              placeholder="Latest"
            />
          </div>

          <div className="w-[160px]">
            <Select
              value={dateFilter}
              onValueChange={setDateFilter}
              options={[{ value: "may-19", label: "08-05-2026" }]}
              placeholder="08-05-2026"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Customer Name
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Processed by
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Transaction Type
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                  {txn.id}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.customerName}
                </td>
                <td className="px-6 py-5 text-[14px] whitespace-nowrap">
                  {formatAmount(txn.amount)}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.processedBy}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.transactionType}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  {getStatusBadge(txn.status)}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-[14px] text-[#6C6C6C] font-medium">
          Showing 1 to 10 of 128 transactions
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
          <button className="w-8 h-8 rounded-lg bg-[#04802E] text-white text-[13px] font-medium">
            1
          </button>
          <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[13px] font-medium hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[13px] font-medium hover:bg-gray-50">
            3
          </button>
          <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[13px] font-medium hover:bg-gray-50">
            4
          </button>
          <span className="text-[13px] text-[#6C6C6C] font-medium">...</span>
          <button className="w-8 h-8 rounded-lg text-[#6C6C6C] text-[13px] font-medium hover:bg-gray-50">
            8
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
