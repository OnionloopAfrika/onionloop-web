import React from "react";

const REPORTS = [
  {
    title: "Daily Ops Summary",
    format: "PDF",
    description: "Queue counts, approvals, and actions taken today",
  },
  {
    title: "KYC Approval Log",
    format: "XLSX",
    description: "Every approve/reject decision with reviewer & reason",
  },
  {
    title: "Merchant Onboarding Report",
    format: "CSV",
    description: "New merchant applications and approval status",
  },
  {
    title: "Agent Float & Payout Report",
    format: "XLSX",
    description: "Float top-ups, payouts, and discrepancies",
  },
  {
    title: "Aggregator Commission Report",
    format: "CSV",
    description: "Payouts processed and pending by aggregator",
  },
  {
    title: "Dispute Resolution Log",
    format: "PDF",
    description: "All disputes with status, SLA, and resolution",
  },
];

export default function ReportStat() {
  return (
    <div className="grid grid-cols-3 gap-[16px] max-lg:grid-cols-1">
      {REPORTS.map((report) => (
        <article
          key={report.title}
          className="space-y-[12px] rounded-[8px] border border-[#E5E7EB] bg-white p-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between gap-[16px]">
            <h2 className="font-[600] text-[16px] text-[#131313]">
              {report.title}
            </h2>
            <span className="rounded-[4px] bg-[#E7F6EC] px-[10px] py-[4px] font-[600] text-[12px] text-[#04907E]">
              {report.format}
            </span>
          </div>
          <p className="font-[400] text-[12px] text-[#6C6C6C]">
            {report.description}
          </p>
        </article>
      ))}
    </div>
  );
}
