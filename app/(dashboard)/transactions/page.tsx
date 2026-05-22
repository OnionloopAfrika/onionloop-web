"use client";

import React, { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "@/lib/stream";
import { computeStats } from "@/utils/helpers";
import {
  InventoryIcon,
  LineChartIcon,
  RevenueIcon,
  TransactionIcon,
  CalendarIcon,
  DownloadIconSolid,
} from "@/components/icons/svgs";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";

import { MOCK_TRANSACTIONS } from "@/lib/mockdata";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "refunded", label: "Refunded" },
    { value: "failed", label: "Failed" },
  ];

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

  const filteredTransactions = useMemo(() => {
    return transactionData.filter((txn) => {
      const matchesStatus = statusFilter ? txn.status === statusFilter : true;

      const normalizedSearch = searchQuery.toLowerCase().trim();
      if (!normalizedSearch) return matchesStatus;

      const matchesRef = txn.id.toLowerCase().includes(normalizedSearch);
      const matchesAmount = txn.amount.toString().includes(normalizedSearch);
      const matchesCustomer = txn.customerName.toLowerCase().includes(normalizedSearch);

      return matchesStatus && (matchesRef || matchesAmount || matchesCustomer);
    });
  }, [transactionData, searchQuery, statusFilter]);

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
    return (
      <div className="p-6 font-sans text-gray-500 h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen font-sans">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-2 md:mb-6">
        <Header
          heading="Transactions"
          subHeading="View and manage all sales and payment records"
        />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-semibold text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#044E49] text-white rounded-lg text-[14px] font-semibold">
            <DownloadIconSolid />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 py-4 mb-8">
        <StatCard
          themeColor="green"
          icon={<RevenueIcon color="#04802E" />}
          value="₦8.1M"
          label="This Month"
          footerText="10% vs last month"
          showTrendIcon
          changePercentage={10}
        />
        <StatCard
          themeColor="blue"
          icon={<TransactionIcon color="#0D5EBA" />}
          value="1,350"
          label="Total Transactions"
          footerText="8% vs yesterday"
          showTrendIcon
          changePercentage={8}
        />
        <StatCard
          themeColor="purple"
          icon={<LineChartIcon />}
          value="6"
          label="Avg. Transaction Value"
          footerText="8% vs yesterday"
          showTrendIcon
          changePercentage={8}
        />
        <StatCard
          themeColor="red"
          icon={<InventoryIcon color="#CB1A14" />}
          value="128"
          label="Failed Transactions"
          footerText="8% vs yesterday"
          showTrendIcon
          changePercentage={8}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex sm:flex-row gap-2 w-full md:w-auto">
            <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by ref or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72"
              prefixicon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.12 12.71h-.74l-.27-.25A5.87 5.87 0 1 0 11.8 13.8l.25.27v.74l4.24 4.23 1.27-1.27-4.44-4.26zm-5.62 0a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44z"
                    fill="#8A8A8A"
                  />
                </svg>
              }
            />
            </div>

            <div className="w-[120px] md:w-[150px] bg-white">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                options={statusOptions}
                placeholder="All Status"
              // className="w-full sm:w-48"
              />
            </div>

          </div>
          <span className="text-[13px] text-gray-500 font-medium whitespace-nowrap self-end md:self-auto">
            Showing {filteredTransactions.length} transactions
          </span>
        </div>

        <div className="w-full overflow-x-auto select-none">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Processed by
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300"
                >
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
                    {txn.id}
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#6c6c6c] whitespace-nowrap">
                    {txn.customerName}
                  </td>
                  <td className="px-6 py-5 text-[14px] whitespace-nowrap">
                    {formatAmount(txn.amount, txn.status)}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                    {txn.processedBy}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[12px] font-medium border ${getStatusStyles(txn.status)} capitalize`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
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