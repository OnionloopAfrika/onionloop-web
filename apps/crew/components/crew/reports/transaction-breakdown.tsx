"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import Select from "../../ui/select";

interface BreakdownDataPoint {
  name: string;
  value: number;
  color: string;
}

const breakdownData: BreakdownDataPoint[] = [
  { name: "Successful", value: 100, color: "#04802E" },
  { name: "Pending", value: 5, color: "#DD900D" },
  { name: "Refunded", value: 2, color: "#0D5EBA" },
  { name: "Failed", value: 1, color: "#CB1A14" },
];

export function TransactionBreakdown() {
  const [timeFilter, setTimeFilter] = useState("This week");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = breakdownData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Transactions Breakdown
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

      <div className="flex items-center justify-evenly gap-8">
        <div style={{ width: 280, height: 280 }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  fill="#111827"
                  fontSize="14"
                  fontWeight="500"
                >
                  Total Transactions
                </text>
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#111827"
                  fontSize="24"
                  fontWeight="semibold"
                >
                  {total.toLocaleString()}
                </text>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {breakdownData.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {item.value} ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
