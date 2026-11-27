"use client";

import Image from "next/image";
import { useState } from "react";
import Card from "@/components/card";
import Select from "@/components/ui/select";
import { CardHeader } from "@/components/layouts/card-header";

export interface TopSellingProduct {
  id: string | number;
  name: string;
  image?: string;
  fallback?: string;
  unitsSold: number;
  revenue: string;
}

interface TopSellingProductsChartProps {
  title: string;
  products: TopSellingProduct[];
  periodOptions?: { value: string; label: string }[];
  selectedPeriod?: string;
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export default function TopSellingProductsChart({
  title,
  products,
  periodOptions = [],
  selectedPeriod,
  defaultPeriod,
  onPeriodChange,
}: TopSellingProductsChartProps) {
  const [internalPeriod, setInternalPeriod] = useState(
    defaultPeriod ?? periodOptions[0]?.value ?? "",
  );
  const period = selectedPeriod ?? internalPeriod;

  const handlePeriodChange = (nextPeriod: string) => {
    if (selectedPeriod === undefined) setInternalPeriod(nextPeriod);
    onPeriodChange?.(nextPeriod);
  };

  return (
    <Card>
      <header className="mb-5 flex items-center justify-between gap-4">
        <CardHeader title={title} />
        {periodOptions.length > 0 && (
          <div className="w-[118px] shrink-0">
            <Select
              value={period}
              onValueChange={handlePeriodChange}
              options={periodOptions}
              placeholder={periodOptions[0].label}
            />
          </div>
        )}
      </header>

      <div>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`grid grid-cols-[minmax(0,1fr)_72px_96px] items-center gap-3 py-3.5 ${
              index < products.length - 1 ? "border-b border-[#6C6C6C]" : ""
            }`}
          >
            <div className="flex min-w-0 items-center gap-[8px]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F7F7F7]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={30}
                    height={30}
                    className="h-[40px] w-[40px] object-contain"
                  />
                ) : (
                  <span className="text-[22px]" aria-hidden="true">
                    {product.fallback ?? product.name.slice(0, 1)}
                  </span>
                )}
              </div>
              <span className="truncate text-[12px] font-[500] text-[#6C6C6C]">
                {product.name}
              </span>
            </div>

            <span className="text-left text-[12px] font-[500] text-[#6C6C6C]">
              {product.unitsSold.toLocaleString()}
            </span>
            <span className="text-left text-[12px] font-[500] text-[#6C6C6C]">
              {product.revenue}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
