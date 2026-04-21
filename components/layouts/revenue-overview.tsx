"use client"

import { RevenuePayload, Period } from "@/types/transactions/types";
import { fetchRevenue } from "@/utils/helpers/revenue-chart";
import { useEffect, useState, useTransition } from "react";
import RevenueChart, { formatCurrency } from "../ui/charts/revenue-charts";
import { ChartSkeleton } from "../ui/skeleton/revenue-skeleton";
interface RevenueOverviewProps {
    initialData: RevenuePayload;
}

export default function RevenueOverview({ initialData }: RevenueOverviewProps) {
    const [data, setData] = useState<RevenuePayload>(initialData);
    const [period, setPeriod] = useState<Period>(initialData.period);
    const [error, setError] = useState<string | null>(null);
    const PERIODS: Period[] = ["7days", "30days", "90days"];

    // useTransition keeps the buttons interactive while the fetch runs
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Skip initial render — initialData already covers the default period
        if (period === initialData.period) return;

        setError(null);

        startTransition(async () => {
            try {
                const payload = await fetchRevenue(period);
                setData(payload);
            } catch (err) {
                setError("Could not load data. Please try again.");
                console.error(err);
            }
        });
    }, [period]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="w-full rounded-2xl bg-white p-6 shadow-md"
            style={{height: "500px"}}
            
        >
            {/* ── Header ── */}
            <div className="mb-5 flex items-start justify-between">
                <div>
                    <h2 className="text-[17px] font-semibold text-gray-900">
                        Revenue Overview
                    </h2>
                    <p
                        className={[
                            "mt-0.5 text-[13px] text-gray-500 transition-opacity duration-200",
                            isPending ? "opacity-40" : "opacity-100",
                        ].join(" ")}
                    >
                        {formatCurrency(data.earnedToday)} earned today
                    </p>
                </div>

                {/* Period toggle pill */}
                <div className="flex items-center gap-1 rounded-full p-1">
                    {PERIODS.map((p) => (
                        <button
                            key={p}
                            onClick={() => p !== period && setPeriod(p)}
                            disabled={isPending}
                            className={[
                                "rounded-full px-3 py-1 text-[13px] font-medium transition-all duration-200",
                                p === period
                                    ? "bg-[#d6f0e6] text-[#1a6b4a] shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 disabled:cursor-wait",
                            ].join(" ")}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Chart area ── */}
            <div style={{ height: 280 }}>
                {error ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                ) : isPending ? (
                    <ChartSkeleton />
                ) : (
                    <RevenueChart series={data.series} />
                )}
            </div>
        </div>
    );
}