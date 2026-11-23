import CommissionReportSummary from "./commission-report-summary";
import CommissionSummaryTable from "./commission-summary-table";
import OnboardingVerificationTable from "./onboarding-verification-table";
import PayoutHistoryTable from "./payout-history-table";
import TransactionCommissionTable from "./transaction-commission-table";

export default function CommissionEarningsPreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <CommissionReportSummary />
      <CommissionSummaryTable />
      <TransactionCommissionTable />
      <OnboardingVerificationTable />
      <PayoutHistoryTable />
      <p className="border-t border-[#E5E7EB] p-[16px] text-[12px] leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[14px] text-[#04907E]">
          Notes &amp; Insights:
        </span>
        <span className="ml-[4px]">
          Onboarding commission stays Pending until Onionloop Ops approves the
          business. Withholding tax is deducted at source and a tax credit note
          is available on request. Rates shown are illustrative.
        </span>
      </p>
    </article>
  );
}
