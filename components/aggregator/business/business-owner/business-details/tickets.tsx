"use client";

import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import React, { useState } from "react";

interface Ticket {
  id: string;
  customerName: string;
  txnType: string;
  amount: number;
  subject: string;
  status: "Resolved" | "Pending";
  date: string;
}

const mockTickets: Ticket[] = [
  {
    id: "ISU-0091",
    customerName: "Joseph Maduabuchi",
    txnType: "Transfer",
    amount: 250000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Oluwafunmiike Robbin",
    txnType: "QR Payment",
    amount: 120000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Oladimeji Yemisi",
    txnType: "QR Payment",
    amount: 120000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "John Chinedu",
    txnType: "QR Payment",
    amount: 50000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Grace Wanjiku",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Philip Tonbara",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Joshua Agbasi",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Mary Adebayo",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "David Iwalewa",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Hannah Nwankwo",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
];

export function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    if (status === "Resolved") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#04802E] text-white">
          Resolved
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#DD900D] text-white">
        Pending
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
        <div className="relative w-full sm:max-w-[320px]">
          <SearchInput />
        </div>

        <div className="w-[140px]">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={[
              { value: "all", label: "All Status" },
              { value: "resolved", label: "Resolved" },
              { value: "pending", label: "Pending" },
            ]}
            placeholder="All Status"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Ticket ID
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
                Subject
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
            {mockTickets.map((ticket, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                  {ticket.id}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {ticket.customerName}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {ticket.txnType}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                  {formatCurrency(ticket.amount)}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {ticket.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(ticket.status)}
                </td>
                <td className="px-6 py-4 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {ticket.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
