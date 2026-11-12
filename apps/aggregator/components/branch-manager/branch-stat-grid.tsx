import React from "react";
import StatCard from "../layouts/card-component";
import {
  RevenueIcon,
  TransactionIcon,
  StaffIcon,
  InventoryIcon,
  ArrowUpIcon,
} from "../icons/svgs";

export function BranchStatGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        themeColor="green"
        icon={<RevenueIcon color="#04802E" />}
        percentage="12.4"
        value="₦1M"
        label="Revenue This Month"
        footerText="₦267k vs last month"
        showTrendIcon
        changePercentage={12.4}
      />

      <StatCard
        themeColor="blue"
        icon={<TransactionIcon color="#0D5EBA" />}
        percentage="8.4"
        value="800"
        label="Total Transactions"
        footerText="98 vs last month"
        showTrendIcon
        changePercentage={8.4}
      />

      <StatCard
        themeColor="purple"
        icon={<StaffIcon color="#7C53FC" />}
        percentage="5.2"
        value="12"
        label="Active Staff Members"
        footerText="6 online now"
        footerColor="purple"
        changePercentage={5.2}
      />

      <StatCard
        themeColor="orange"
        icon={<InventoryIcon color="#DD900D" />}
        percentage="3.7"
        value="200"
        label="Products in Inventory"
        footerText="30 out of stock"
        footerColor="orange"
        changePercentage={-3.7}
      />
    </div>
  );
}
