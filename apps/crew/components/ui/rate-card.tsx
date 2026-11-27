"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Badge from "./badge";
import { CardHeader } from "../layouts/card-header";

export interface SparklinePoint {
  label: string;
  value: number;
}

export interface BreakdownItem {
  label: string;
  value: string | number;
  percent: number; // 0-100, width of the progress bar
  color: string;
}

interface TrendBadge {
  direction: "up" | "down";
  value: string; // e.g. "1.8%"
  color?: "green" | "red";
}

interface RateCardProps {
  title: string;
  subtitle?: string;
  badge?: TrendBadge;
  statValue: string; // e.g. "6.4%"
  statLabel?: string; // e.g. "Last 30 days"
  comparisonText?: string; // e.g. "improved from 8.2 last period"
  chartData: SparklinePoint[];
  chartColor?: string;
  breakdownTitle?: string;
  breakdownItems?: BreakdownItem[];
}

export default function RateCard({
  title,
  subtitle,
  badge,
  statValue,
  statLabel,
  comparisonText,
  chartData,
  chartColor = "#dc2626",
  breakdownTitle,
  breakdownItems,
}: RateCardProps) {
  const badgeColor =
    badge?.color ?? (badge?.direction === "down" ? "green" : "red");
  const badgeClasses =
    badgeColor === "green"
      ? "bg-emerald-100 text-emerald-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="bg-white rounded-3xl shadow-sm w-full p-[24px] h-full min-h-0 flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between">
          <CardHeader title={title} subtitle={subtitle ?? ""} />

          {badge && (
            <Badge variant="percentage">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3.4591 8.41748L6.99994 11.9583L10.5408 8.41748"
                  stroke="#04802E"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 2.04169V11.8592"
                  stroke="#04802E"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {badge.value}
            </Badge>
          )}
        </div>

        <div className=" flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-gray-900">
            {statValue}
          </span>
          {statLabel && (
            <span className="text-[#6C6C6C] font-[400] text-[10px]">
              {statLabel}
            </span>
          )}
        </div>
        {comparisonText && (
          <p className="text-[#8A8A8A] text-xs mt-1">{comparisonText}</p>
        )}

        <div className="" style={{ height: 70 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`sparkline-${title.replace(/\s+/g, "-")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2.5}
                fill={`url(#sparkline-${title.replace(/\s+/g, "-")})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {breakdownItems && breakdownItems.length > 0 && (
        <div className="mt-auto">
          {breakdownTitle && (
            <p className="text-[#6C6C6C] text-[16px] font-[500] tracking-wide mb-4">
              {breakdownTitle}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {breakdownItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-600 text-xs">{item.label}</span>
                  <span className="text-gray-900 text-xs font-semibold">
                    {item.value}
                  </span>
                </div>
                <div
                  className="h-1.5 w-full rounded-full"
                  style={{ backgroundColor: `${item.color}22` }}
                >
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
