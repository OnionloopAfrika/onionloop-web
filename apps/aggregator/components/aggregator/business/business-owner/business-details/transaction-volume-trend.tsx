"use client";

import TrendChart, {
  type ChartDataPoint,
} from "@/components/ui/charts/trend-chart";
import type { Period, RevenuePayload } from "@/types/transactions/types";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import { useState } from "react";

const periods: Period[] = ["7days", "30days", "90days"];

interface TransactionVolumeTrendProps {
  initialData: RevenuePayload;
}

export default function TransactionVolumeTrend({
  initialData,
}: TransactionVolumeTrendProps) {
  const [data, setData] = useState(initialData);
  const [period, setPeriod] = useState(initialData.period);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chartData: ChartDataPoint[] = data.series.map((point) => ({
    label: point.label,
    volume: point.value,
  }));

  const handleRangeChange = async (range: string) => {
    const nextPeriod = periods.find((item) => item === range);
    if (!nextPeriod || nextPeriod === period || isLoading) return;

    setPeriod(nextPeriod);
    setIsLoading(true);
    setError(null);

    try {
      setData(await fetchRevenue(nextPeriod));
    } catch (err) {
      console.error(err);
      setError("Could not load transaction volume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div aria-busy={isLoading}>
      <TrendChart
        title="Transaction Volume Trend"
        data={chartData}
        series={[
          {
            dataKey: "volume",
            name: "Transaction Volume",
            color: "#04907E",
            showArea: true,
          },
        ]}
        ranges={periods}
        activeRange={period}
        onRangeChange={handleRangeChange}
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
        height={320}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
