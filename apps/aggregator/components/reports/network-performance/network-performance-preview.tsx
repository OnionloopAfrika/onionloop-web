import ActivityStatusTable from "./activity-status-table";
import BusinessTypeTable from "./business-type-table";
import DormantBusinessesTable from "./dormant-businesses-table";
import NetworkGrowthTable from "./network-growth-table";
import NetworkPerformanceSummary from "./network-performance-summary";
import NetworkVolumeChart from "./network-volume-chart";
import TopPerformanceTable from "./top-performance-table";

export default function NetworkPerformancePreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <NetworkPerformanceSummary />
      <div className="p-[8px]">
        <NetworkVolumeChart />
      </div>
      <BusinessTypeTable />
      <ActivityStatusTable />
      <NetworkGrowthTable />
      <TopPerformanceTable />
      <DormantBusinessesTable />
      <p className="border-t border-[#E5E7EB] p-[16px] font-[600]  leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[#04907E] text-[14px]">
          Notes &amp; Insights:
        </span>
        <span className="text-[12px] ml-[4px]">
          Dormant businesses (no transaction in 30+ days) count against the
          retention bonus. A follow-up visit is the cheapest way to reactivate
          them.
        </span>
      </p>
    </article>
  );
}
