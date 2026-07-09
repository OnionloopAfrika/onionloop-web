import React from "react";
import StatCard from "../layouts/card-component";
import {
  RevenueIcon,
  TransactionIcon,
  LineChartIcon,
  MultiplyIcon,
  FailedTransactionIcon,
} from "../icons/svgs";

export function BranchTransactionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        themeColor="green"
        icon={<RevenueIcon color="#04802E" />}
        // percentage="10"
        value="₦8.1M"
        label="Revenue This Month"
        footerText="10% vs last month"
        showTrendIcon
        changePercentage={10}
      />

      <StatCard
        themeColor="blue"
        icon={<TransactionIcon color="#0D5EBA" />}
        // percentage="8"
        value="1,350"
        label="Total Transactions"
        footerText="8% vs yesterday"
        showTrendIcon
        changePercentage={8}
      />

      <StatCard
        themeColor="purple"
        icon={<LineChartIcon color="#7C53FC" />}
        // percentage="8"
        value="6"
        label="Avg. Transaction Value"
        footerText="8% vs yesterday"
        showTrendIcon
        changePercentage={8}
      />

      <StatCard
        themeColor="red"
        icon={<FailedTransactionIcon color="#CB1A14" />}
        // percentage="8"
        value="28"
        label="Failed Transactions"
        footerText="8% vs yesterday"
        showTrendIcon
        changePercentage={-8}
      />
    </div>
  );
}
