import AddressVisitTable from "./address-visit-table";
import BusinessChangeRequestsTable from "./business-change-requests-table";
import ComplianceSummary from "./compliance-summary";
import KycLevelsTable from "./kyc-levels-table";
import VerificationQueueTable from "./verification-queue-table";

export default function ComplianceVerificationPreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <ComplianceSummary />
      <KycLevelsTable />
      <AddressVisitTable />
      <VerificationQueueTable />
      <BusinessChangeRequestsTable />
      <p className="border-t border-[#E5E7EB] p-[16px] text-[12px] leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[#04907E] text-[14px]">
          Notes &amp; Insights:
        </span>

        <span className="ml-[4px]">
          A failed visit does not reject the business outright; Ops will ask for
          a repeat visit. Complete it within 7 days to protect the onboarding
          commission. A business moving to another aggregator reduces your
          active count from the effective date.
        </span>
      </p>
    </article>
  );
}
