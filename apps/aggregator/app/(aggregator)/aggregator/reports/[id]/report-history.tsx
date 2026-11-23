"use client";

import Button from "@/components/ui/button";
import { DownloadIconSolid } from "@/components/icons/svgs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useParams } from "next/navigation";
import CommissionEarningsPreview from "@/components/reports/commission-earnings/commission-earnings-preview";
import TargetBonusPreview from "@/components/reports/target-bonus/target-bonus-preview";
import NetworkPerformancePreview from "@/components/reports/network-performance/network-performance-preview";
import ComplianceVerificationPreview from "@/components/reports/compliance-verification/compliance-verification-preview";
import OnboardingActivationPreview from "@/components/reports/onboarding-activation/onboarding-activation-preview";
import AccountSettlementPreview from "@/components/reports/account-settlement/account-settlement-preview";

const REPORT_TITLES: Record<string, string> = {
  "commission-earnings": "Commission & Earnings Statement",
  "target-bonus": "Target & Bonus Report",
  "network-performance": "Network Performance Report",
  "compliance-verification": "Compliance & Verification Log",
  "onboarding-activation": "Onboarding & Activation Report",
  "account-settlement": "Account & Settlement Statement",
};

export default function ReportHistory() {
  const { id } = useParams<{ id: string }>();
  const reportTitle =
    REPORT_TITLES[id] ??
    id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="space-y-[20px]">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Breadcrumb
          firstTab="Reports"
          secondTab={reportTitle}
          firstLink="/aggregator/reports"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <h1 className="text-[24px] max-lg:text-[18px] font-[600] text-[#131313]">
          {reportTitle} (PDF)
        </h1>
        <Button
          type="button"
          variant="primary"
          size="md"
          icon={<DownloadIconSolid color="#FFFFFF" />}
          onClick={() => window.print()}
          className="!w-auto !rounded-[8px] !bg-[#00574D] !px-[16px] !py-[10px] !text-[16px] !font-[500]"
        >
          Download PDF
        </Button>
      </div>

      {id === "commission-earnings" ? (
        <CommissionEarningsPreview />
      ) : id === "target-bonus" ? (
        <TargetBonusPreview />
      ) : id === "network-performance" ? (
        <NetworkPerformancePreview />
      ) : id === "compliance-verification" ? (
        <ComplianceVerificationPreview />
      ) : id === "onboarding-activation" ? (
        <OnboardingActivationPreview />
      ) : id === "account-settlement" ? (
        <AccountSettlementPreview />
      ) : (
        <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-6 text-[14px] text-[#6C6C6C] shadow-sm">
          Preview for this report will be available soon.
        </div>
      )}
    </div>
  );
}
