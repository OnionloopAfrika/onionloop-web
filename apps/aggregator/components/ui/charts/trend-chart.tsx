"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Badge from "@/components/ui/badge";
import { CardHeader } from "@/components/layouts/card-header";

export interface ChartSeries {
  dataKey: string; // key in each data point (e.g. "active")
  name: string; // legend / tooltip label (e.g. "Active Businesses")
  color: string; // stroke + dot + gradient color
  showArea?: boolean; // true = filled area (like "Active Businesses"), false/undefined = plain line
}

export interface ChartDataPoint {
  label: string; // x-axis label (e.g. "Mon")
  [key: string]: string | number;
}

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  series: ChartSeries[];
  ranges?: string[]; // e.g. ["7days", "30days", "90days"]
  activeRange?: string;
  onRangeChange?: (range: string) => void;
  yAxisTicks?: number[];
  yAxisDomain?: [number | "auto", number | "auto"];
  yAxisTickFormatter?: (value: number) => string;
  yAxisTickFontSize?: number;
  showAllXAxisTicks?: boolean;
  showLegend?: boolean;
  height?: number;
}

export default function TrendChart({
  title,
  subtitle,
  data,
  series,
  ranges,
  activeRange,
  onRangeChange,
  yAxisTicks,
  yAxisDomain,
  yAxisTickFormatter,
  yAxisTickFontSize = 18,
  showAllXAxisTicks = false,
  showLegend = true,
  height = 300,
}: TrendChartProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-1 flex items-start justify-between gap-4">
        <CardHeader title={title} subtitle={subtitle ?? ""} />

        {ranges && ranges.length > 0 && (
          <div className="flex shrink-0 gap-2">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => onRangeChange?.(range)}
                aria-pressed={range === activeRange}
                className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04907E]"
              >
                <Badge
                  variant="days"
                  className={
                    range === activeRange
                      ? "font-[500] text-[11.2px]"
                      : "!bg-[#F7F7F7] !text-[#6C6C6C] font-[500] text-[11.2px]"
                  }
                >
                  {range}
                </Badge>
              </button>
            ))}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={data}
          margin={{ top: 12, right: 12, left: 0, bottom: 4 }}
        >
          <defs>
            {series
              .filter((s) => s.showArea)
              .map((s) => (
                <linearGradient
                  key={s.dataKey}
                  id={`gradient-${s.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
          </defs>

          <CartesianGrid vertical={false} stroke="#D9D9D9" />
          <XAxis
            dataKey="label"
            padding={{ left: 56 }}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6C6C6C", fontSize: 14, fontWeight: 500 }}
            interval={showAllXAxisTicks ? 0 : undefined}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6C6C6C",
              fontSize: yAxisTickFontSize,
              fontWeight: 500,
            }}
            ticks={yAxisTicks}
            domain={yAxisDomain}
            tickFormatter={yAxisTickFormatter}
          />
          <Tooltip />

          {series.map((s) =>
            s.showArea ? (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color}
                strokeWidth={3}
                fill={`url(#gradient-${s.dataKey})`}
                dot={{ r: 5, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            ) : (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color}
                strokeWidth={3}
                dot={{ r: 5, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            ),
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {showLegend && series.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-[12px] gap-y-2">
          {series.map((item) => (
            <div key={item.dataKey} className="flex items-center gap-[6px]">
              <span
                className="h-[12.87px] w-[12.87px] rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[14px] font-[500] text-[#6C6C6C]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
