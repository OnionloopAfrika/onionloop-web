"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "../icons/svgs";
import { MOCK_TRANSACTIONS } from "@/lib/mockdata";

interface Transaction {
  id: string;
  name: string;
  date: string;
  time: string;
  amount: string;
  isPositive: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    name: "Joshua Akindele",
    date: "03 Feb",
    time: "2:15 PM",
    amount: "+₦4,600.00",
    isPositive: true,
  },
  {
    id: "2",
    name: "Olashubomi Oghenechukwu",
    date: "03 Feb",
    time: "2:15 PM",
    amount: "-₦2,000.00",
    isPositive: false,
  },
  {
    id: "3",
    name: "Olashubomi Oghenechukwu",
    date: "03 Feb",
    time: "2:15 PM",
    amount: "-₦2,000.00",
    isPositive: false,
  },
  {
    id: "4",
    name: "Joshua Akindele",
    date: "03 Feb",
    time: "2:15 PM",
    amount: "+₦4,600.00",
    isPositive: true,
  },
];

export function BranchRecentTransactions() {
  return (
    <div
      className="w-full bg-white font-sans flex flex-col overflow-hidden border border-gray-100 rounded-2xl shadow-sm"
      style={{ height: "520px" }}
    >
      <div className="flex justify-between items-center p-4 pb-2">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="text-[#04802E] font-bold text-sm hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-gray-100">
          {MOCK_TRANSACTIONS.map((txn) => {
            const isPositive = txn.amount >= 0;
            const iconColor = isPositive ? "#04802E" : "#CB1A14";
            const bgColor = isPositive ? "bg-[#F0F9F3]" : "bg-[#FCEFEE]";

            return (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 bg-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}
                    >
                      {isPositive ? (
                        <ArrowDownIcon color={iconColor} className={""} />
                      ) : (
                        <ArrowUpIcon color={iconColor} className={""} />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 text-[14px] truncate">
                      {txn.customerName}
                    </h3>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {new Date(txn.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>

                <div
                  className={`font-medium text-[14px] whitespace-nowrap ml-4 ${isPositive ? "text-[#04802E]" : "text-[#CB1A14]"}`}
                >
                  {`${isPositive ? "+" : "-"}₦${Math.abs(txn.amount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
