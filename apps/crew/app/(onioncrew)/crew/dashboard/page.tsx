import QuickActions from "@/components/dashboard/quick-actions";
import RevenueOverview from "@/components/dashboard/revenue-overview";
import TransactionsByPayment from "@/components/dashboard/transactions-by-payment";
import TopSellingProducts from "@/components/dashboard/top-selling-products";
import StaffActivity from "@/components/dashboard/staff-activity";
import {
  RevenueIcon,
  TransactionIcon,
  StaffIcon,
  InventoryIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  DownloadIconSolid,
  ProfileManagement,
  NewOrder,
} from "@/components/icons/svgs";
import DashboardActivityGrid from "@/components/inventory/dashboard-activity";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";
import { MOCK_TRANSACTIONS } from "@/lib/mockdata";
import { formatDate, formatCurrency } from "@/utils/helpers";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import Link from "next/link";

export default async function Page() {
  const initialData = await fetchRevenue("7days");

  return (
    <main className="space-y-[24px]">
      <div className="flex justify-between items-center">
        <Header
          heading="Good morning, Yetty Mama Lounge 👋"
          subHeading="Here's what's happening with your business today — Tuesday, Mar 24, 2026"
        />

        <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
          <CalendarIcon />
          Mar 2026
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 ">
        <StatCard
          themeColor="green"
          icon={<RevenueIcon color="#04802E" />}
          percentage="12.4"
          value="₦186,100"
          label="Revenue This Month"
          showTrendIcon
        />

        <StatCard
          themeColor="blue"
          icon={<ProfileManagement color="#0D5EBA" />}
          percentage="8.4"
          value="₦120,000"
          label="Total Transactions"
          showTrendIcon
        />

        <StatCard
          themeColor="orange"
          icon={<NewOrder color="#DD900D" />}
          percentage="12.4"
          value="350"
          label="Active Staff Members"
          footerColor="purple"
        />

        <StatCard
          themeColor="purple"
          icon={<StaffIcon color="#7C53FC" />}
          percentage="12.4"
          value="4/5"
          label="Products in Inventory"
          footerColor="orange"
          changePercentage={12.4}
        />
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 gap-[24px] xl:grid-cols-2">
        <RevenueOverview />
        <TransactionsByPayment />
      </div>

      <div className="grid grid-cols-1 gap-[24px] xl:grid-cols-2">
        <TopSellingProducts />
        <StaffActivity />
      </div>
    </main>
  );
}
