"use client";

import { useState } from "react";
import TrendChart, { ChartDataPoint } from "@/components/ui/charts/trend-chart";

const REVENUE_BY_RANGE: Record<string, ChartDataPoint[]> = {
  "7days": [
    { label: "Mon", revenue: 1_000_000 },
    { label: "Tue", revenue: 1_350_000 },
    { label: "Wed", revenue: 1_050_000 },
    { label: "Thu", revenue: 1_500_000 },
    { label: "Fri", revenue: 1_000_000 },
    { label: "Sat", revenue: 1_100_000 },
    { label: "Sun", revenue: 2_100_000 },
  ],
  "30days": [
    { label: "1", revenue: 850_000 },
    { label: "5", revenue: 1_300_000 },
    { label: "10", revenue: 1_000_000 },
    { label: "15", revenue: 1_550_000 },
    { label: "20", revenue: 1_050_000 },
    { label: "25", revenue: 1_200_000 },
    { label: "30", revenue: 2_100_000 },
  ],
  "90days": [
    { label: "1", revenue: 900_000 },
    { label: "15", revenue: 1_400_000 },
    { label: "30", revenue: 1_050_000 },
    { label: "45", revenue: 1_600_000 },
    { label: "60", revenue: 1_000_000 },
    { label: "75", revenue: 1_250_000 },
    { label: "90", revenue: 2_100_000 },
  ],
};

const formatRevenueAxis = (value: number) => {
  if (value === 0) return "0";
  return value >= 1_000_000
    ? `${Number((value / 1_000_000).toFixed(1))}M`
    : `${value / 1_000}K`;
};

export default function RevenueOverview() {
  const [range, setRange] = useState("7days");

  return (
    <TrendChart
      title="Revenue Overview"
      subtitle="₦2.4M earned today"
      data={REVENUE_BY_RANGE[range]}
      series={[
        {
          dataKey: "revenue",
          name: "Revenue",
          color: "#009B8A",
          showArea: true,
        },
      ]}
      ranges={Object.keys(REVENUE_BY_RANGE)}
      activeRange={range}
      onRangeChange={setRange}
      yAxisTicks={[0, 600_000, 1_200_000, 1_800_000]}
      yAxisDomain={[0, 2_400_000]}
      yAxisTickFormatter={formatRevenueAxis}
      showAllXAxisTicks
      showLegend={false}
      //   height={260}
    />
  );
}
