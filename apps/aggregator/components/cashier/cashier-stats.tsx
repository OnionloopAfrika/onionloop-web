"use client";

import { cashierStats } from "@/lib/mockdata/cashier";
import StatCard from "@/components/layouts/card-component";

export default function CashierStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
      {cashierStats.map((stat, i) => {
        const Icon = stat.icon;
        const percentageValue = stat.percentage
          .replace("+", "")
          .replace("%", "");
        const changePercentage = percentageValue
          ? parseFloat(percentageValue)
          : 0;
        const showTrendIcon = stat.desc !== "Products in Inventory";
        const footerColor =
          stat.desc === "Products in Inventory" ? "orange" : undefined;

        return (
          <StatCard
            key={i}
            themeColor={stat.color}
            icon={<Icon />}
            percentage={percentageValue || undefined}
            value={stat.figure}
            label={stat.desc}
            footerText={stat.action}
            showTrendIcon={showTrendIcon}
            changePercentage={changePercentage}
            footerColor={footerColor}
          />
        );
      })}
    </div>
  );
}
