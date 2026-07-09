import React from "react";
import StatCard from "../../layouts/card-component";
import {
  DollarSignIcon,
  BarChart3Icon,
  TrendingUpIcon,
  MultiplyIcon,
  FailedTransactionIcon,
  ChartIcon,
} from "../../icons/svgs";

export function ReportStat() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        themeColor="green"
        icon={<DollarSignIcon color="#04802E" />}
        value="₦12.4M"
        label="Revenue this month"
        footerText=""
      />
      <StatCard
        themeColor="blue"
        icon={<ChartIcon color="#0D5EBA" />}
        value="3,241"
        label="Total Transaction"
        footerText=""
      />
      <StatCard
        themeColor="green"
        icon={<TrendingUpIcon color="#04802E" />}
        value="96"
        label="Avg. Perf. Score"
        footerText=""
      />
      <StatCard
        themeColor="red"
        icon={<FailedTransactionIcon color="#CB1A14" />}
        value="0"
        label="Failed Transactions"
        footerText=""
      />
    </div>
  );
}
