import BusinessOutcomesTable from "./business-outcomes-table";
import NewBusinessKycTable from "./new-business-kyc-table";
import OnboardingFunnelTable from "./onboarding-funnel-table";
import OnboardingSummary from "./onboarding-summary";
import OnboardingVerificationQueue from "./onboarding-verification-queue";

export default function OnboardingActivationPreview() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
      <OnboardingSummary />
      <OnboardingFunnelTable />
      <BusinessOutcomesTable />
      <NewBusinessKycTable />
      <OnboardingVerificationQueue />
      <p className="border-t border-[#E5E7EB] p-[16px] text-[12px] leading-[1.6] text-[#6C6C6C]">
        <span className="font-[600] text-[14px] text-[#04907E]">
          Notes &amp; Insights:
        </span>{" "}
        Onboarding commission is only released once a business is approved.
        Items waiting on you are the fastest to clear — book the address visit
        first.
      </p>
    </article>
  );
}
