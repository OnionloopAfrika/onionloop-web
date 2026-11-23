import TrendChart, { ChartDataPoint } from "@/components/ui/charts/trend-chart";

interface VolumePoint {
  day: string;
  volume: number;
}

interface ReportVolumeChartProps {
  title: string;
  data: VolumePoint[];
}

export default function ReportVolumeChart({
  title,
  data,
}: ReportVolumeChartProps) {
  const chartData: ChartDataPoint[] = data.map(({ day, volume }) => ({
    label: day,
    volume,
  }));

  return (
    <TrendChart
      title={title}
      data={chartData}
      series={[
        {
          dataKey: "volume",
          name: "Volume",
          color: "#04907E",
          showArea: true,
        },
      ]}
      yAxisTicks={[0, 20, 40, 60, 80, 100]}
      yAxisDomain={[0, 100]}
      // yAxisTickFontSize={14}
      showAllXAxisTicks
      showLegend={false}
      height={280}
    />
  );
}
