"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export interface LocationPerformanceData {
  name: string;
  revenue: number;
  formattedRevenue: string;
}

interface TopPerformingLocationsProps {
  data?: LocationPerformanceData[];
  onLocationChange?: (value: string) => void;
}

export const mockLocationData: LocationPerformanceData[] = [
  { name: "Ikeja", revenue: 12.4, formattedRevenue: "₦12.4M" },
  { name: "Ijegun", revenue: 11.2, formattedRevenue: "₦11.2M" },
  { name: "Benin", revenue: 10.8, formattedRevenue: "₦10.8M" },
  { name: "Ile ife", revenue: 8.9, formattedRevenue: "₦8.9M" },
  { name: "Ado", revenue: 7.6, formattedRevenue: "₦7.6M" },
  { name: "Gbagi", revenue: 6.8, formattedRevenue: "₦6.8M" },
];

const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 12}
      fill="#6C6C6C"
      className="text-[14px] font-semibold tracking-tight"
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

export default function TopPerformingLocations({
  data = mockLocationData,
}: TopPerformingLocationsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
          Top Performing Locations
        </h2>

        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-[14px] font-medium">
            All Locations
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[320px] mt-4">
        {isMounted && (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={320}
            minWidth={300}
          >
            <BarChart
              data={data}
              margin={{ top: 30, right: 10, left: 10, bottom: 10 }}
              barSize={60}
              accessibilityLayer={false}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6C6C6C", fontSize: 15, fontWeight: 500 }}
                dy={15}
              />
              <YAxis hide domain={[0, "dataMax + 2"]} />
              <Bar
                dataKey="revenue"
                fill="#0D9488"
                radius={[10, 10, 0, 0]}
                label={<CustomLabel dataKey="formattedRevenue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
