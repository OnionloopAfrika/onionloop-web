import {
  CalendarIcon,
  DownloadIconSolid,
  LocationIcon,
} from "@/components/icons/svgs";
import { ProfileHeader } from "@/components/profile-header";
import Button from "@/components/ui/button";
import { ReportStat } from "./reports-stat";
import RevenueOverview from "./revenue-overview";
import TransactionVolume from "./transaction-volume";
import { TopSellingProducts } from "./top-selling-products";
import Alerts, { mockAlerts } from "@/components/layouts/alert-items";
import RecentTransactions from "./recent-transactions";

export function ReportsPage() {
  return (
    <div className="space-y-[24px]">
      {" "}
      <ProfileHeader
        className="flex-col md:flex-row gap-4 justify-between items-start mb-6 border-b-0 pb-[0px]"
        title="Reports"
        subtitle="Generate and download your assigned branch reports"
        btn={
          <div className="flex items-center gap-[10px]">
            <Button variant="outline" size="cashierOutline">
              <CalendarIcon /> Mar 2026
            </Button>
            <Button variant="primary" size="cashierOutline">
              <DownloadIconSolid />
              Export Report
            </Button>
          </div>
        }
      />
      <div className="bg-white rounded-[12px] flex justify-between items-center p-[16px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-[9.6px] bg-[#DFD7F6]">
            <p className="font-[500] text-[28.8px] text-[#7851E9]">IK</p>
          </div>
          <div className="space-y-[4px]">
            <p className="flex items-center gap-[8px]">
              <span className="font-[600] text-[20px] text-[#000000]">
                Ikeja
              </span>{" "}
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#D9D9D9" />
              </svg>
              <span className="font-[500] text-[14px] text-[#8A8A8A]">
                Group 1
              </span>
            </p>

            <div className="flex items-center gap-[5px]">
              <LocationIcon className="text-[#6C6C6C]" />{" "}
              <span className="font-[500] text-[14px] text-[#6C6C6C]">
                Ikeja city mall, 2nd floor, Ikeja Lgaos.
              </span>
            </div>
          </div>
        </div>

        <span className="py-[2px] px-[16px] rounded-full bg-[#E7F6EC] flex justify-center items-center font-[500] text-[16.57px] text-[#04802E]">
          Active
        </span>
      </div>
      <ReportStat />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
        <RevenueOverview />
        <TransactionVolume />
        <TopSellingProducts />
        <Alerts alerts={mockAlerts} />
      </div>
      <div className="w-full">
        <RecentTransactions />
      </div>
    </div>
  );
}
