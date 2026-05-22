import {
  RevenueIcon,
  TransactionIcon,
  StaffIcon,
  InventoryIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  DownloadIconSolid,
} from "@/components/icons/svgs";
import DashboardActivityGrid from "@/components/inventory/dashboard-activity";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";
import RevenueOverview from "@/components/layouts/revenue-overview";
import { MOCK_TRANSACTIONS } from "@/lib/mockdata";
import { formatDate, formatCurrency } from "@/utils/helpers";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import Link from 'next/link';

export default async function Page() {
  const initialData = await fetchRevenue("7days");

  return (
    <main className="">
      <div className="flex-col md:flex-row gap-4 justify-between items-start mb-6">
      <Header
        heading="Good morning, Yetty Mama Lounge 👋"
        subHeading="Here's what's happening with your business today — Tuesday, Mar 24, 2026"
      />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 px-1 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
          <button className="flex items-center gap-2 px-2 py-2 bg-[#044E49] text-white rounded-lg text-[14px] font-medium">
            <DownloadIconSolid />
            Download Report
          </button>
        </div>
      </div>
      {/* card component for the overview */}

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 py-4">
        <StatCard
          themeColor="green"
          icon={<RevenueIcon color="#04802E" />}
          percentage="12.4"
          value="₦2.41M"
          label="Revenue This Month"
          footerText="₦267k vs last month"
          showTrendIcon
          changePercentage={12.4}
        />

        <StatCard
          themeColor="blue"
          icon={<TransactionIcon color="#0D5EBA" />}
          percentage="8.4"
          value="1,350"
          label="Total Transactions"
          footerText="98 vs last month"
          showTrendIcon
          changePercentage={8.4}
        />

        <StatCard
          themeColor="purple"
          icon={<StaffIcon color="#7C53FC" />}
          percentage="12.4"
          value="6"
          label="Active Staff Members"
          footerText="4 online now"
          footerColor="purple"
          changePercentage={12.4}
        />

        <StatCard
          themeColor="orange"
          icon={<InventoryIcon color="#DD900D" />}
          percentage="12.4"
          value="120"
          label="Products in Inventory"
          footerText="5 out of stock"
          footerColor="orange"
          changePercentage={12.4}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 h-125">
        <div className="w-full lg:col-span-2 h-full">
          <RevenueOverview initialData={initialData} />
        </div>

        <div className="w-full bg-white font-sans lg:col-span-1 h-full flex flex-col overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center p-4 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Transactions
            </h2>
            <Link href="/transactions" className="text-[#04802E] font-bold text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-gray-100">
              {MOCK_TRANSACTIONS.map((txn) => {
                const isPositive = txn.amount >= 0;
                const iconColor = isPositive ? "#04802E" : "#CB1A14";
                const bgColor = isPositive ? "bg-[#F0F9F3]" : "bg-[#FCEFEE]";

                return (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-4 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}
                        >
                          {isPositive ? (
                            <ArrowDownIcon color={iconColor} className={""} />
                          ) : (
                            <ArrowUpIcon color={iconColor} className={""} />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 text-[14px] truncate">
                          {txn.customerName}
                        </h3>
                        <p className="text-gray-400 text-[10px] mt-0.5">
                          {formatDate(txn.date)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`font-medium text-[14px] whitespace-nowrap ml-4 ${isPositive ? "text-[#04802E]" : "text-[#CB1A14]"}`}
                    >
                      {formatCurrency(txn.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <DashboardActivityGrid /> */}
    </main>
  );
}
