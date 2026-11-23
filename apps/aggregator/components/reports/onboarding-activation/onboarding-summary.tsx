import ReportDocumentSummary from "../report-document-summary";

export default function OnboardingSummary() {
  return (
    <ReportDocumentSummary
      title="Onboarding & Activation Report"
      summary="19 all businesses were submitted: 11 approved, 6 pending and 2 rejected. 9 of 11 approved businesses (81.8%) made a first transaction within 30 days."
      cards={[
        { label: "Submitted", value: "19" },
        { label: "Approved", value: "11" },
        { label: "Activation rate (30 days)", value: "81.8%" },
        { label: "Pending Approval", value: "6" },
      ]}
    />
  );
}
