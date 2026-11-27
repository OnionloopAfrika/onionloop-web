import React from "react";
import Header from "../layouts/header";
import StatCard from "../layouts/card-component";
import {
  AggregatorIcon,
  AggregatorTransactionIcon,
  ChartIcon,
  ProfileManagement,
  TransactionIcon,
} from "../icons/svgs";
import ProfitTable from "./profit-table";

export default function ProfitManagement() {
  return (
    <div className="space-y-[24px]">
      <Header
        heading="Profit Management"
        subHeading="Cost vs. selling price per product, units sold, and what's actually driving your margin."
      />

      <div className="grid grid-cols-3 gap-[16px]">
        <StatCard
          icon={
            <ProfileManagement color="#0D5EBA" className="w-[16px] h-[16px] " />
          }
          themeColor="blue"
          label="Profit (last 7 days)"
          value="₦496,050"
        />

        <StatCard
          icon={
            <TransactionIcon color="#04802E" className="w-[16px] h-[16px] " />
          }
          themeColor="green"
          label="Units sold (7d)"
          value="892"
        />

        <StatCard
          icon={
            <AggregatorTransactionIcon
              color="#04802E"
              className="w-[16px] h-[16px] "
            />
          }
          themeColor="purple"
          label="Avg. Transaction Value"
          value="49%"
        />
      </div>

      <ProfitTable />
    </div>
  );
}
