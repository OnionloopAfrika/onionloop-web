import ReportDocumentSummary from "../report-document-summary";

export default function NetworkPerformanceSummary() {
  return (
    <ReportDocumentSummary
      title="Network Performance Report"
      summary="148 all businesses on your network, of which 112 (75.7%) transacted this period, moving ₦18.6M across 15,960 transactions. 26 are dormant and 10 have exited voluntarily."
      cards={[
        { label: "Volume progress", value: "74.4%" },
        { label: "Onboarding progress", value: "56.7%" },
        { label: "Bonuses in reach", value: "₦150,000" },
        { label: "Projected finish", value: "94%" },
      ]}
    />
  );
}
