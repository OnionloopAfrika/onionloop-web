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

import {
  NavTabsList,
  NavTabsTrigger,
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import { StaffSalesPerformance } from "@/components/branch-manager/staff-sales-performance";
import { TransactionTable } from "@/components/branch-manager/transaction-table";
import { CrewSalesPerformance } from "@/components/crew/transaction/crew-sales-performance";
import CrewSales from "@/components/crew/transaction/sales";
import { CrewTransactionTable } from "@/components/crew/transaction/crew-transactiontable";

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
      const matchesCustomer = txn.customerName
        .toLowerCase()
        .includes(normalizedSearch);

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
    <main className="min-h-screen font-sans space-y-[48px]">
      <div className="space-y-[24px]">
        <div className="flex flex-col md:flex-row justify-between items-start ">
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

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 py-4 ">
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
      </div>

      <Tabs defaultValue="sales">
        <div className="rounded-[16px] p-[16px] flex justify-start items-center bg-white mb-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <NavTabsList>
            <NavTabsTrigger value="sales">Sales</NavTabsTrigger>
            <NavTabsTrigger value="transactions">Transactions</NavTabsTrigger>
          </NavTabsList>
        </div>

        <TabsContent value="sales">
          <div className="space-y-[24px]">
            <CrewSalesPerformance />
            <CrewSales />
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <CrewTransactionTable />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default TransactionsPage;
