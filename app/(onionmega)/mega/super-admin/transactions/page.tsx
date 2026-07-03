import {
  CalendarIcon,
  DownloadIconSolid,
  RevenueIcon,
  InventoryIcon,
  LineChartIcon,
  TransactionIcon,
} from "@/components/icons/svgs";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";
import TransactionsTable from "@/components/ui/tables/transaction-table";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <Header
          heading="Transactions"
          subHeading="View and manage all sales and payment records"
        />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
          <button className="flex items-center gap-2 px-2 py-2 bg-[#044E49] text-white rounded-lg text-[14px] font-medium">
            <DownloadIconSolid />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 py-4 mb-8">
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

      {/* Transaction List implementation  */}
      <TransactionsTable />
    </div>
  );
};

export default page;
