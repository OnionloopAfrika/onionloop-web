import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, DownloadIconSolid, InventoryIcon, RevenueIcon, StaffIcon, TransactionIcon, WalletIcon } from "@/components/icons/svgs";
import Alerts, { mockAlerts } from "@/components/layouts/alert-items";
import StatCard from "@/components/layouts/card-component";
import Header from "@/components/layouts/header";
import RevenueOverview from "@/components/layouts/revenue-overview";
import TopSellingProducts from "@/components/layouts/top-selling-products";
import TopPerformingLocations from "@/components/ui/charts/top-performer";

import { fetchRevenue } from "@/utils/helpers/revenue-chart";


const SuperAdminDashboard = async () => {
  const initialData = await fetchRevenue("7days");

  return (
    <div>
      <div className="flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <Header
          heading="Good morning, HQ Admin"
          subHeading="Here's what's happening with your business today — Tuesday, Mar 24, 2026"
        />
        <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
            <CalendarIcon />
            Mar 2026
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-2 py-4">
        <StatCard
          themeColor="purple"
          icon={<WalletIcon color="#7C53FC" />}
          percentage="12.4"
          value="100M"
          label="Total Balance"
          footerText="₦267k vs last month"
          footerColor="purple"
          changePercentage={12.4}
        />

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
      </div>

      {/* Row 2: Balanced Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-6 items-stretch">
        {/* Left item (Chart): Stretches smoothly to match whatever height the product list sets */}
        <div className="w-full lg:col-span-3 flex flex-col [&>*]:h-full [&>*]:flex-1">
          <RevenueOverview initialData={initialData} />
        </div>

        {/* Right item (Products): Acts as the driver. Extra white wrappers removed to prevent layout bugs. */}
        <div className="w-full bg-white rounded-2xl shadow-sm lg:col-span-2 flex flex-col max-h-[520px] overflow-y-auto custom-scrollbar [&>*]:h-full [&>*]:flex-1">
          <TopSellingProducts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
        <div className="w-full bg-white font-sans lg:col-span-2 h-full flex flex-col overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <Alerts alerts={mockAlerts} />
        </div>
        <div className="w-full bg-white font-sans lg:col-span-2 h-full flex flex-col overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <TopPerformingLocations />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;