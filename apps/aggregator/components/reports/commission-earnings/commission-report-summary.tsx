import ReportDocumentSummary from "../report-document-summary";

export default function CommissionReportSummary() {
  return (
    <ReportDocumentSummary
      title="Commission & Earnings Statement"
      summary="NorthGate Onboarding earned ₦176,500 gross commission from all businesses this period. After 5% withholding tax, ₦8,825 is payable, plus ₦14,000 in bonuses. Transaction commission is 81% of the total."
      cards={[
        { label: "Gross commission", value: "₦176,500" },
        { label: "Withholding tax (5%)", value: "₦8,825" },
        { label: "Net commission", value: "₦167,675" },
        { label: "Bonuses earned", value: "₦14,000" },
      ]}
    />
  );
}
