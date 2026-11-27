"use client";

import { useState } from "react";
import Select from "@/components/ui/select";
import { CardHeader } from "@/components/layouts/card-header";
import Card from "@/components/card";

export interface PaymentMethodData {
  name: string;
  value: number;
  color: string;
  backgroundColor: string;
}

interface PaymentMethodChartProps {
  title: string;
  data: PaymentMethodData[];
  total?: number;
  periodOptions?: { value: string; label: string }[];
  selectedPeriod?: string;
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export default function PaymentMethodChart({
  title,
  data,
  total,
  periodOptions = [],
  selectedPeriod,
  defaultPeriod,
  onPeriodChange,
}: PaymentMethodChartProps) {
  const [internalPeriod, setInternalPeriod] = useState(
    defaultPeriod ?? periodOptions[0]?.value ?? "",
  );
  const transactionTotal =
    total ?? data.reduce((sum, item) => sum + item.value, 0);
  const period = selectedPeriod ?? internalPeriod;

  const handlePeriodChange = (nextPeriod: string) => {
    if (selectedPeriod === undefined) setInternalPeriod(nextPeriod);
    onPeriodChange?.(nextPeriod);
  };

  return (
    <Card className="flex  w-full flex-col justify-between">
      <header className="flex items-center justify-between">
        <CardHeader title={title} />
        {periodOptions.length > 0 && (
          <div className=" shrink-0">
            <Select
              value={period}
              onValueChange={handlePeriodChange}
              options={periodOptions}
              placeholder={periodOptions[0].label}
            />
          </div>
        )}
      </header>

      <div className="space-y-[12px]">
        <div className=" flex items-center justify-between">
          <span className="text-[12px] font-normal text-[#6C6C6C]">
            Total Transactions:
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {transactionTotal.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {data.map((item) => {
            const percentage =
              transactionTotal > 0 ? (item.value / transactionTotal) * 100 : 0;
            const progress = Math.min(100, Math.max(0, percentage));

            return (
              <div key={item.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[12px] font-medium text-[#131313]">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-[500] text-[#6C6C6C]">
                    {item.value.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: item.backgroundColor }}
                  role="progressbar"
                  aria-label={`${item.name} transactions`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
