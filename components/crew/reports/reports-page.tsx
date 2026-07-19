import { CalendarIcon, DownloadIconSolid } from "@/components/icons/svgs";
import Header from "@/components/layouts/header";
import { ProfileHeader } from "@/components/profile-header";
import Button from "@/components/ui/button";
import ReportStats from "./report-stats";
import { SalesTrend } from "./sales-trend";
import SalesOverview from "@/components/layouts/sales-trend-chart";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import { CrewTransactionVolume } from "./crew-transaction-volume";
import SalesByHour from "./sales-by-hour";
import { TransactionBreakdown } from "./transaction-breakdown";
import TransactionPaymentMethod from "./transaction-payment-method";
import { CrewTopSelling } from "./crew-topselling";
import CrewTopstaffActivity from "./crew-topstaff-activity";
import { CrewStaffActivity } from "./crew-staff-activity";
import CrewReportTable from "./crew-report-table";

export default async function ReportsPage() {
  const initialData = await fetchRevenue("7days");

  return (
    <div className="space-y-[24px]">
      <ProfileHeader
        className="space-y-[8px] border-b-0 pb-[0px] "
        title="Reports"
        subtitle="Analyze merchant, agent, and transaction performance across your aggregator network."
        btn={
          <div className="flex items-center gap-[10px] ">
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

      <ReportStats />

      <div className="space-y-[24px]">
        <div className="grid grid-cols-2 gap-[24px] ">
          <SalesOverview initialData={initialData} />
          <CrewTransactionVolume />
          <CrewTopSelling />
          <SalesByHour />
          <TransactionBreakdown />
          <TransactionPaymentMethod />
          <CrewTopstaffActivity />
          <CrewStaffActivity />
        </div>
        <CrewReportTable />
      </div>
    </div>
  );
}
