import ReportDocumentSummary from "../report-document-summary";

export default function TargetBonusSummary() {
  return (
    <ReportDocumentSummary
      title="Target & Bonus Report"
      summary="Transaction volume is at 74% of target and onboarding at 57%, with the period 71% elapsed. Volume is on pace; onboarding needs 13 more approved businesses to unlock the full ₦150,000 bonus pool."
      cards={[
        { label: "Volume progress", value: "74.4%" },
        { label: "Onboarding progress", value: "56.7%" },
        { label: "Bonuses in reach", value: "₦150,000" },
        { label: "Projected finish", value: "94%" },
      ]}
    />
  );
}
