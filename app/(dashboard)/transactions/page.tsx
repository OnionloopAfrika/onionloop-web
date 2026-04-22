"use client";

import React, { useEffect, useState } from "react";
import { fetchTransactions } from "@/lib/stream";
import { computeStats } from "@/utils/helpers";
import {
  InventoryIcon,
  LineChartIcon,
  RevenueIcon,
  TransactionIcon,
  SearchIcon,
  ChevronDownIcon,
  CalendarIcon,
  DownloadIcon,
} from "@/components/icons/svgs";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";
import { MOCK_TRANSACTIONS } from "@/lib/mockdata";

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  processedBy: string;
  status: "completed" | "pending" | "refunded" | "failed";
  date: string;
}

const TransactionsPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await fetchTransactions();
        setTransactionData(response.transactions);
        setTotalTransactions(response.total);

        const computed = computeStats(MOCK_TRANSACTIONS, "2026-03");
        setStats(computed);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const getStatusStyles = (status: string) => {
    const styles: Record<string, string> = {
      completed: "text-[#04802E] bg-[#E7F6EC] border-[#04802E]",
      pending: "text-[#DD900D] bg-[#FEF6E7] border-[#DD900D]",
      refunded: "text-[#0D5EBA] bg-[#E3EFFC] border-[#0D5EBA]",
      failed: "text-[#CB1A14] bg-[#FBEAE9] border-[#CB1A14]",
    };
    return styles[status] || "text-gray-500 bg-gray-50 border-gray-200";
  };

  const formatAmount = (amount: number, status: string) => {
    const colorClass =
      status === "completed"
        ? "text-[#04802E]"
        : status === "pending"
          ? "text-[#DD900D]"
          : status === "refunded"
            ? "text-[#0D5EBA]"
            : "text-[#CB1A14]";

    const prefix = amount > 0 ? "+" : "";
    return (
      <span className={`font-normal ${colorClass}`}>
        {prefix}₦{Math.abs(amount).toLocaleString()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")
      .slice(0, 16);
  };

  if (isLoading || !stats) {
    return <div className="p-6 font-sans text-gray-500">Loading stats...</div>;
  }

  return (
    <main className="p-8 bg-[#FCFCFC] min-h-screen font-sans">
      <div className="flex justify-between items-start mb-6">
        <Header
          heading="Transactions"
          subHeading="View and manage all sales and payment records"
        />
        <div className="flex gap-3 w-full justify-end">
          <button className="inline-flex items-center justify-center gap-1 px-1 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
          <button className="flex items-center gap-2 px-2 py-2 bg-[#044E49] text-white rounded-lg text-[14px] font-semibold">
            <DownloadIcon />
            Download Report
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-4 mb-8">
        <StatCard
          themeColor="green"
          icon={<RevenueIcon color="#04802E" />}
          value="₦8.1M"
          label="This Month"
          footerText="10% vs last month"
          showTrendIcon
        />
        <StatCard
          themeColor="blue"
          icon={<TransactionIcon color="#0D5EBA" />}
          value="1,350"
          label="Total Transactions"
          footerText="8% vs yesterday"
          showTrendIcon
        />
        <StatCard
          themeColor="red"
          icon={<InventoryIcon color="#CB1A14" />}
          value="120"
          label="Total Refunds Today"
          footerText="1 refund issued"
        />
        <StatCard
          themeColor="purple"
          icon={<LineChartIcon />}
          value="6"
          label="Avg. Transaction Value"
          footerText="4 online now"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="flex gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by ref or amount..."
                className="pl-10 pr-4 py-2.5 w-72 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#04907E]"
              />
            </div>
            <button className="flex items-center gap-8 px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-500 bg-white">
              All Status
              <ChevronDownIcon />
            </button>
          </div>
          <span className="text-[13px] text-gray-500 font-medium">
            Showing {transactionData.length} transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Processed by
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactionData.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C]">
                    {txn.id}
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-gray-900">
                    {txn.customerName}
                  </td>
                  <td className="px-6 py-5 text-[14px]">
                    {formatAmount(txn.amount, txn.status)}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-medium">
                    {txn.processedBy}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium border ${getStatusStyles(txn.status)} capitalize`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C]">
                    {formatDate(txn.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
