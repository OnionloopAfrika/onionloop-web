import ReportDocumentSummary from "../report-document-summary";

export default function AccountSettlementSummary() {
  return (
    <ReportDocumentSummary
      title="Account & Settlement Statement"
      summary="Your main balance closed at ₦412,500: ₦298,500 revenue and ₦114,000 bonus. Credits of ₦181,675 were received and ₦284,000 withdrawn across two payouts. The ledger is reconciled to Onionloop settlement."
      cards={[
        { label: "Opening balance", value: "₦514,825" },
        { label: "Total credits", value: "₦181,675" },
        { label: "Total withdrawals", value: "₦284,000" },
        { label: "Closing balance", value: "₦412,500" },
      ]}
    />
  );
}
