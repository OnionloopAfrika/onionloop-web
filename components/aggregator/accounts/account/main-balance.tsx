"use client";

import React, { useState } from "react";
import Select from "@/components/ui/select";

interface BalanceTransaction {
  id: string;
  transactionType: "Credit" | "Debit";
  balanceType: "Onboarding" | "Transaction" | null;
  amount: number;
  date: string;
}

const mockTransactions: BalanceTransaction[] = [
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
];

export default function MainBalance() {
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionTypeBadge = (
    type: BalanceTransaction["transactionType"],
  ) => {
    if (type === "Credit") {
      return (
        <span className="px-3 py-1 rounded-full text-[10.44px] font-medium bg-[#E7F6EC] text-[#04802E]">
          Credit
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[10.44px] font-medium text-[#CB1A14] bg-[#FBEAE9]">
        Debit
      </span>
    );
  };

  const getBalanceTypeBadge = (type: BalanceTransaction["balanceType"]) => {
    if (type === "Onboarding") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#C6DDF7] text-[#0D5EBA]">
          Onboarding
        </span>
      );
    }
    if (type === "Transaction") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#B5E3C4] text-[#024E44]">
          Transaction
        </span>
      );
    }
    return <span className="text-[14px] font-[500] text-[#6C6C6C]">---</span>;
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 w-[40%]">
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
          options={[
            { value: "all", label: "All Transaction Types" },
            { value: "credit", label: "Credit" },
            { value: "debit", label: "Debit" },
          ]}
          placeholder="All Transaction Types"
        />

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

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-b-[#C7C7C7]">
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                TXN ID
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Transaction Type
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Balance Type
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
            {mockTransactions.map((txn, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50/50 transition-colors border border-b-[#C7C7C7] last:border-0"
              >
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                  {txn.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTransactionTypeBadge(txn.transactionType)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getBalanceTypeBadge(txn.balanceType)}
                </td>
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
                  {formatAmount(txn.amount)}
                </td>
                <td className="px-6 py-4 text-[14px] font-[500] text-[#6C6C6C] whitespace-nowrap">
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
