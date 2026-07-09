"use client";

import React, { useState } from "react";
import Select from "../../ui/select";
import { SearchInput } from "../../ui/search-input";

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  processedBy: string;
  transType: string;
  status: "Successful" | "Failed" | "Pending" | "Refunded";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-7821",
    customerName: "Adaeze Nwosu",
    amount: 45000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7820",
    customerName: "Emeka Eze",
    amount: 12800,
    processedBy: "Titi Folarin",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7819",
    customerName: "Emeka Eze",
    amount: 6500,
    processedBy: "Mary Olarenwaju",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7818",
    customerName: "Chidinma Obi",
    amount: 3200,
    processedBy: "David Anigbogu",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7817",
    customerName: "Femi Adeyemi",
    amount: 28400,
    processedBy: "Samuel Saidu",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7816",
    customerName: "Nkechi Uba",
    amount: 15000,
    processedBy: "Adanma Dappa",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7815",
    customerName: "Nkechi Uba",
    amount: 9300,
    processedBy: "Kemi Saidu",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7814",
    customerName: "Gbenga Mary",
    amount: 22100,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7813",
    customerName: "Adaeze Nwosu",
    amount: 7600,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7812",
    customerName: "Emeka Eze",
    amount: 45000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
];

export default function RecentTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Completed");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortFilter, setSortFilter] = useState("Latest");

  const formatAmount = (amount: number, status: Transaction["status"]) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

    const colorClass =
      status === "Successful"
        ? "text-[#04802E]"
        : status === "Pending"
          ? "text-[#DD900D]"
          : status === "Refunded"
            ? "text-[#0D5EBA]"
            : "text-[#C62828]";
    const prefix = status === "Refunded" ? "-" : "+";
    return (
      <span className={`${colorClass} font-[500]`}>
        {prefix}
        {formatted}
      </span>
    );
  };

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      searchQuery === "" ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.amount.toString().includes(searchQuery);
    return matchesSearch;
  });

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "Successful") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-[500] bg-[#E8F5E9] text-[#04802E]">
          Successful
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-[500] bg-[#FFF3E0] text-[#E65100]">
          Pending
        </span>
      );
    }
    if (status === "Refunded") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-[500] bg-[#E3EFFC] text-[#0D5EBA]">
          Refunded
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-[500] bg-[#FFEBEE] text-[#C62828]">
        Failed
      </span>
    );
  };

  return (
    <div className="w-full bg-white font-sans rounded-[12px] shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="font-[600] text-[20px] text-[#363636]">
          Recent Transactions
        </h2>
        <button className="text-gray-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1 max-w-4xl">
          <div className="relative w-full max-w-[320px]">
            <SearchInput placeholder="Search by transaction ID or amount..." />
          </div>

          <div className="w-[160px]">
            <Select
              value={locationFilter}
              onValueChange={setLocationFilter}
              options={[{ value: "All Locations", label: "All Locations" }]}
              placeholder="All Locations"
            />
          </div>

          <div className="w-[160px]">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[{ value: "Completed", label: "Completed" }]}
              placeholder="Completed"
            />
          </div>

          <div className="w-[120px]">
            <Select
              value={sortFilter}
              onValueChange={setSortFilter}
              options={[{ value: "Latest", label: "Latest" }]}
              placeholder="Latest"
            />
          </div>
        </div>

        <span className="text-[14px] text-[#6C6C6C] font-[500] whitespace-nowrap">
          Showing {filteredTransactions.length} transactions
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                TXN ID
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Customer Name
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Amount
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Processed by
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Trans. Type
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Status
              </th>
              <th className="py-[10px] px-[15px] h-[93.3px] text-[20px] font-[600] text-[#6C6C6C] whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] text-[#6C6C6C] font-[500] whitespace-nowrap">
                  {txn.id}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] text-[#6C6C6C] font-[500] whitespace-nowrap">
                  {txn.customerName}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] whitespace-nowrap">
                  {formatAmount(txn.amount, txn.status)}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] text-[#6C6C6C] font-[500] whitespace-nowrap">
                  {txn.processedBy}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] text-[#6C6C6C] font-[500] whitespace-nowrap">
                  {txn.transType}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] whitesce-nowrap">
                  {getStatusBadge(txn.status)}
                </td>
                <td className="px-[15px] py-[10px] h-[93.3px] text-[18px] text-[#6C6C6C] font-[500] whitespace-nowrap">
                  {txn.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
