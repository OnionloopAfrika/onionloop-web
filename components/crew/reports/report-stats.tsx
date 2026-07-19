"use client";

import StatCard from "@/components/layouts/card-component";
import {
  DollarSignIcon,
  ChartIcon,
  TrendingUpIcon,
  FailedTransactionIcon,
  StaffIcon,
  InventoryIcon,
  CalendarIcon,
  TotalOrdersIcon,
  AvgIcon,
  Pending,
} from "@/components/icons/svgs";

export default function ReportStats() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          themeColor="green"
          icon={<DollarSignIcon color="#04802E" />}
          value="₦2.41M"
          label="Total Sales"
          footerText=""
        />
        <StatCard
          themeColor="lemon"
          icon={<TotalOrdersIcon color="#6D8A14" />}
          value="₦2.41M"
          label="Total Orders"
          footerText=""
        />
        <StatCard
          themeColor="purple"
          icon={<StaffIcon color="#7C53FC" />}
          value="4"
          label="Active Staff"
          footerText=""
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          themeColor="purple"
          icon={<TrendingUpIcon color="#7C53FC" />}
          value="1,357"
          label="Avg. Transaction Value"
          footerText=""
        />
        <StatCard
          themeColor="green"
          icon={<AvgIcon color="#04802E" />}
          value="200"
          label="Successful Transaction"
          footerText=""
        />
        <StatCard
          themeColor="orange"
          icon={<Pending color="#DD900D" />}
          value="10"
          label="Pending Transaction"
          footerText=""
        />
        <StatCard
          themeColor="red"
          icon={<FailedTransactionIcon color="#CB1A14" />}
          value="3"
          label="Failed Transactions"
          footerText=""
        />
      </div>
    </div>
  );
}
