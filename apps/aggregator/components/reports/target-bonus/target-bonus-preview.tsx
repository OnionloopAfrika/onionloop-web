import BusinessVolumeChart from "./business-volume-chart";
import BonusEligibilityTable from "./bonus-eligibility-table";
import TargetBonusSummary from "./target-bonus-summary";
import TargetProjectionTable from "./target-projection-table";
import TargetScorecardTable from "./target-scorecard-table";

export default function TargetBonusPreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <TargetBonusSummary />
      <div className="p-[8px]">
        <BusinessVolumeChart />
      </div>
      <TargetScorecardTable />
      <BonusEligibilityTable />
      <TargetProjectionTable />
      <p className="border-t border-[#E5E7EB] p-[16px] text-[12px] leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[14px] text-[#04907E]">
          Notes &amp; Insights:
        </span>
        <span className="ml-[4px]">
          At the current daily average (about ₦1.4M) you finish near ₦23.5M,
          roughly 6% short. Reactivating 6 dormant businesses would bring the
          dormant rate under 20% and unlock the retention bonus.
        </span>
      </p>
    </article>
  );
}
