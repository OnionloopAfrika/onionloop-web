import ReportDocumentSummary from "../report-document-summary";

export default function ComplianceSummary() {
  return (
    <ReportDocumentSummary
      title="Compliance & Verification Log (PDF)"
      summary="You completed 11 address visits this period (3 in progress, 2 failed), an 84.6% success rate. 22 of 148 owners are still KYC Tier 1. 7 business change requests were logged: 3 approved, 2 rejected and 2 awaiting a decision."
      cards={[
        { label: "Visits completed", value: "11" },
        { label: "Visit success rate", value: "84.6%" },
        { label: "Tier 1 owners", value: "22" },
        { label: "Change requests", value: "7" },
      ]}
    />
  );
}
