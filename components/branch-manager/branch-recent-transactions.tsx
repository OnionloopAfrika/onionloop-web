"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "../icons/svgs";

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
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-[24px]">
      <div className="flex justify-between items-center ">
        <h2 className="text-[20px] font-[600] text-[#131313]">
          Recent Transactions
        </h2>
        <Link href="#" className="text-[#024E44] font-[500] text-[16px]">
          View All
        </Link>
      </div>

      <div className="space-y-[24px]">
        {mockTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`flex items-center justify-between py-4 ${
              index < mockTransactions.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full p-[8.75px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] bg-white">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                    transaction.isPositive ? "bg-[#E7F6EC]" : "bg-[#FBEAE9]"
                  }`}
                >
                  {transaction.isPositive ? (
                    <ArrowDownIcon
                      color="#04802E"
                      className="w-[24px] h-[24px]"
                    />
                  ) : (
                    <ArrowUpIcon
                      color="#CB1A14"
                      className="w-[24px] h-[24px]"
                    />
                  )}
                </div>{" "}
              </div>

              <div>
                <p className="font-[500] text-[16px] text-[#131313]">
                  {transaction.name}
                </p>
                <p className="font-[400] text-[14px] text-[#6C6C6C] flex items-center gap-[6px]">
                  {transaction.date}
                  <span className="text-[#6C6C6C]">•</span>
                  {transaction.time}
                </p>
              </div>
            </div>
            <p
              className={`font-[500] text-[14px] ${
                transaction.isPositive ? "text-[#04802E]" : "text-[#CB1A14]"
              }`}
            >
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
