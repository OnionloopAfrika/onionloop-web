"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Select from "../../ui/select";

interface VolumeDataPoint {
  label: string;
  value: number;
}

// Exact data from the design image
const exactData: VolumeDataPoint[] = [
  { label: "Mon", value: 110 },
  { label: "Tues", value: 30 },
  { label: "Wed", value: 120 },
  { label: "Thurs", value: 50 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 40 },
  { label: "Sun", value: 110 },
];

export default function TransactionVolume() {
  const [volumeData] = useState<VolumeDataPoint[]>(exactData);
  const [timeFilter, setTimeFilter] = useState("This Week");

  const yTicks = [0, 40, 80, 120];

  return (
    <div
      className="w-full rounded-2xl bg-white p-6 shadow-md"
      style={{ height: "420px" }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Transaction volume
        </h2>

        <div className="w-[160px]">
          <Select
            value={timeFilter}
            onValueChange={setTimeFilter}
            options={[{ value: "This Week", label: "This Week" }]}
            placeholder="This Week"
          />
        </div>
      </div>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={volumeData}
            margin={{ top: 0, right: 32, left: 16, bottom: 0 }}
            barCategoryGap="40%"
          >
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 500 }}
              dy={12}
            />
            <YAxis
              ticks={yTicks}
              domain={[0, 120]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 13 }}
              width={48}
            />
            <Bar
              dataKey="value"
              fill="#2a8f62"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
