"use client";
import React, { useState } from "react";
import dashboardData from "./target-dashboard.data.json";
import { SummaryCards } from "./SummaryCards";
import { TargetCard } from "./TargetCard";
import { BusinessTable } from "./BusinessTable";
import RevenueOverview from "../layouts/revenue-overview";
import { DailyVolumeChart } from "./DailyVolumeChart";
import TrendChart, { ChartDataPoint } from "../ui/charts/trend-chart";
import Header from "../layouts/header";

export const TargetDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans  mx-auto text-gray-900 space-y-[24px]">
      <Header
        heading="Target"
        subHeading="Track your targets, monitor performance, and maximize your earnings potential."
      />

      <SummaryCards data={dashboardData.summaryCards} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <TargetCard
          title={dashboardData.metrics.transactionVolume.title}
          currentFormatted={
            dashboardData.metrics.transactionVolume.currentFormatted
          }
          targetFormatted={
            dashboardData.metrics.transactionVolume.targetFormatted
          }
          status={dashboardData.metrics.transactionVolume.status as "On track"}
          progress={dashboardData.metrics.transactionVolume.progress}
          needText={dashboardData.metrics.transactionVolume.need}
          currentRateText={dashboardData.metrics.transactionVolume.current}
        />
        <TargetCard
          title={dashboardData.metrics.onboardingVolume.title}
          currentFormatted={dashboardData.metrics.onboardingVolume.current.toString()}
          targetFormatted={dashboardData.metrics.onboardingVolume.target}
          status={dashboardData.metrics.onboardingVolume.status as "On track"}
          progress={dashboardData.metrics.onboardingVolume.progress}
          needText={dashboardData.metrics.onboardingVolume.need}
          currentRateText={dashboardData.metrics.onboardingVolume.currentRate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        <TargetCard
          title={dashboardData.metrics.newBusinesses.title}
          currentFormatted={dashboardData.metrics.newBusinesses.current.toString()}
          targetFormatted={dashboardData.metrics.newBusinesses.target}
          status={dashboardData.metrics.newBusinesses.status as "Behind track"}
          progress={dashboardData.metrics.newBusinesses.progress}
          needText={dashboardData.metrics.newBusinesses.needText}
          additionalText={dashboardData.metrics.newBusinesses.additionalText}
        />
        <div className="w-full lg:col-span-2 h-full">
          {/* <DailyVolumeChart /> */}
          <RevenueCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <TargetCard
          title={dashboardData.metrics.activeAgents.title}
          currentFormatted={dashboardData.metrics.activeAgents.current.toString()}
          targetFormatted={dashboardData.metrics.activeAgents.target}
          status={dashboardData.metrics.activeAgents.status as "Behind track"}
          progress={dashboardData.metrics.activeAgents.progress}
          needText={dashboardData.metrics.activeAgents.needText}
          additionalText={dashboardData.metrics.activeAgents.additionalText}
        />
        <TargetCard
          title={dashboardData.metrics.activeMerchants.title}
          currentFormatted={dashboardData.metrics.activeMerchants.current.toString()}
          targetFormatted={dashboardData.metrics.activeMerchants.target}
          status={dashboardData.metrics.activeMerchants.status as "On track"}
          progress={dashboardData.metrics.activeMerchants.progress}
          needText={dashboardData.metrics.activeMerchants.needText}
          additionalText={dashboardData.metrics.activeMerchants.additionalText}
        />
      </div>

      <BusinessTable
        businesses={dashboardData.businesses}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default TargetDashboard;

const revenueData: ChartDataPoint[] = [
  { label: "Mon", revenue: 900_000 },
  { label: "Tue", revenue: 1_450_000 },
  { label: "Wed", revenue: 1_050_000 },
  { label: "Thurs", revenue: 1_650_000 },
  { label: "Fri", revenue: 1_050_000 },
  { label: "Sat", revenue: 2_450_000 },
  { label: "Sun", revenue: 3_000_000 },
];

function RevenueCard() {
  const [range, setRange] = useState("7days");

  return (
    <TrendChart
      title="Daily Business Volume "
      subtitle="₦2.4M earned today"
      data={revenueData}
      ranges={["7days", "30days", "90days"]}
      activeRange={range}
      onRangeChange={setRange}
      yAxisTicks={[0, 600_000, 1_200_000, 2_400_000]}
      yAxisDomain={[0, 3_000_000]}
      yAxisTickFormatter={(value) =>
        value === 0
          ? "0"
          : value >= 1_000_000
            ? `${value / 1_000_000}M`
            : `${value / 1_000}k`
      }
      yAxisTickFontSize={14}
      showAllXAxisTicks
      showLegend={false}
      series={[
        {
          dataKey: "revenue",
          name: "Revenue",
          color: "#04907E",
          showArea: true,
        },
      ]}
    />
  );
}
