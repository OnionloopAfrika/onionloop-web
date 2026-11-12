"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useState, useEffect, useRef } from "react";
import Select from "../../ui/select";

interface SalesDataPoint {
  label: string;
  value: number;
  display: string;
}

const salesData: (SalesDataPoint & { color: string })[] = [
  {
    label: "12AM - 3AM",
    value: 200000,
    display: "+₦4,600.00",
    color: "#C2EAD0",
  },
  {
    label: "12AM - 3AM",
    value: 300000,
    display: "+₦4,600.00",
    color: "#C2EAD0",
  },
  {
    label: "12AM - 3AM",
    value: 800000,
    display: "+₦4,600.00",
    color: "#044E49",
  },
  {
    label: "12AM - 3AM",
    value: 500000,
    display: "+₦4,600.00",
    color: "#C2EAD0",
  },
  {
    label: "12AM - 3AM",
    value: 400000,
    display: "+₦4,600.00",
    color: "#C2EAD0",
  },
  {
    label: "12AM - 3AM",
    value: 350000,
    display: "+₦4,600.00",
    color: "#C2EAD0",
  },
];

export default function SalesByHour() {
  const [timeFilter, setTimeFilter] = useState("This week");
  const [isMounted, setIsMounted] = useState(false);
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const xTicks = [0, 400000, 800000];

  const formatXAxis = (value: number) => {
    if (value === 0) return "0";
    return `${value / 1000}k`;
  };

  const renderLabel = (props: any) => {
    const { y, index } = props;
    return (
      <text
        x={chartWidth - 16}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        fill="#6C6C6C"
        fontSize="13"
        fontWeight="500"
      >
        {salesData[index].display}
      </text>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Sales by Hour
        </h2>

        <div className="w-[160px]">
          <Select
            value={timeFilter}
            onValueChange={setTimeFilter}
            options={[{ value: "This week", label: "This week" }]}
            placeholder="This week"
          />
        </div>
      </div>

      <div ref={containerRef} style={{ height: 320 }}>
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              layout="vertical"
              margin={{ top: 0, right: 100, left: 16, bottom: 0 }}
              barCategoryGap="20%"
            >
              <XAxis
                type="number"
                ticks={xTicks}
                domain={[0, 800000]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                tickFormatter={formatXAxis}
              />
              <YAxis
                dataKey="label"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 500 }}
                width={100}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList content={renderLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
