"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { DataPoint } from "@/types/transactions/types";
import { JSX } from "react/jsx-runtime";

/** For the persistent badge on the last dot. */
export function formatCurrency(value: number): string {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 1_000_000) return `${sign}₦${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${sign}₦${(abs / 1_000).toFixed(0)}k`;
    return `${sign}₦${abs}`;
}

/** For Y-axis tick labels. */
function formatYTick(value: number): string {
    if (value === 0) return "0";
    if (value >= 1_000_000) return `${value / 1_000_000}M`;
    if (value >= 1_000) return `${value / 1_000}k`;
    return String(value);
}

/** Compute clean Y-axis ticks from the series max. */
function getYTicks(series: DataPoint[]): number[] {
    const max = Math.max(...series.map((d) => d.value), 0);
    const step =
        max <= 2_400_000 ? 600_000 :
            max <= 8_000_000 ? 2_000_000 :
                6_000_000;

    const ticks: number[] = [];
    for (let i = 0; i <= max; i += step) ticks.push(i);
    return ticks;
}

// ─── Custom dot ───────────────────────────────────────────────────────────────

interface DotProps {
    cx?: number;
    cy?: number;
    index?: number;
    payload?: DataPoint;
    dataLength: number;
}

function CustomDot({ cx = 0, cy = 0, index = 0, payload, dataLength }: DotProps) {
    const isLast = index === dataLength - 1;

    // Regular dots — small filled circle
    if (!isLast) {
        return <circle cx={cx} cy={cy} r={4} fill="#2a8f62" />;
    }

    // Last dot — ring style + persistent badge above
    const label = payload ? formatCurrency(payload.value) : "";
    const badgeW = 82;
    const badgeH = 32;
    const badgeX = cx - badgeW / 2;
    const badgeY = cy - badgeH - 14;
    const arrowSize = 7;

    return (
        <g>
            {/* Badge body */}
            < rect
                x={badgeX} y={badgeY}
                width={badgeW} height={badgeH}
                rx={8} ry={8}
                fill="#1a3d2b"
            />

            {/* Badge label */}
            < text
                x={cx}
                y={badgeY + badgeH / 2 + 5
                }
                textAnchor="middle"
                fill="white"
                fontSize={13}
                fontWeight={700}
                fontFamily="'DM Sans', sans-serif"
            >
                {label}
            </text>

            {/* Arrow */}
            <polygon
                points={
                    `
          ${cx - arrowSize},${badgeY + badgeH}
          ${cx + arrowSize},${badgeY + badgeH}
          ${cx},${badgeY + badgeH + arrowSize}
        `}
                fill="#1a3d2b"
            />

            {/* Ring dot */}
            < circle cx={cx} cy={cy} r={8} fill="white" stroke="#2a8f62" strokeWidth={2.5} />
            <circle cx={cx} cy={cy} r={3.5} fill="#2a8f62" />
        </g>
    );
}

// ─── Chart ────────────────────────────────────────────────────────────────────

interface RevenueChartProps {
    series: DataPoint[];
}

export default function RevenueChart({ series }: RevenueChartProps) {
    const yTicks = getYTicks(series);
    const chartMax = Math.max(...series.map((d) => d.value), 0);

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <AreaChart data={series} margin={{ top: 44, right: 24, left: 0, bottom: 0 } 
            } accessibilityLayer={false}>

                {/* Gradient fill — bold top opacity, slow 3-stop fade */}
                < defs >
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1" >
                        <stop offset="0%" stopColor="#2a8f62" stopOpacity={0.55} />
                        <stop offset="60%" stopColor="#2a8f62" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#2a8f62" stopOpacity={0.03} />
                    </linearGradient>
                </defs>

                {/* Horizontal grid lines only */}
                <CartesianGrid
                    horizontal vertical={false}
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
                    domain={[0, chartMax * 1.08]}
                    tickFormatter={formatYTick}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 13 }}
                    width={48}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2a8f62"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    activeDot={false}
                    dot={(props) => (
                        <CustomDot
                            key={props.index}
                            {...props}
                            dataLength={series.length}
                        />
                    )}
                    isAnimationActive
                    animationDuration={550}
                    animationEasing="ease-out"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}