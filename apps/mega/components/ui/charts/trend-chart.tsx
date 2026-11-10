'use client';

import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export interface ChartSeries {
    dataKey: string;   // key in each data point (e.g. "active")
    name: string;      // legend / tooltip label (e.g. "Active Businesses")
    color: string;      // stroke + dot + gradient color
    showArea?: boolean; // true = filled area (like "Active Businesses"), false/undefined = plain line
}

export interface ChartDataPoint {
    label: string; // x-axis label (e.g. "Mon")
    [key: string]: string | number;
}

interface TrendChartProps {
    title: string;
    subtitle?: string;
    data: ChartDataPoint[];
    series: ChartSeries[];
    ranges?: string[];            // e.g. ["7days", "30days", "90days"]
    activeRange?: string;
    onRangeChange?: (range: string) => void;
    height?: number;
}

export default function TrendChart({
    title,
    subtitle,
    data,
    series,
    ranges,
    activeRange,
    onRangeChange,
    height = 300,
}: TrendChartProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 w-full">
            <div className="flex items-start justify-between mb-1">
                <div>
                    <h3 className="text-base font-semibold text-[#131313]">{title}</h3>
                    {subtitle && <p className="text-[#6C6C6C] text-xs mt-1">{subtitle}</p>}
                </div>

                {ranges && ranges.length > 0 && (
                    <div className="flex gap-2">
                        {ranges.map((range) => (
                            <button
                                key={range}
                                type="button"
                                onClick={() => onRangeChange?.(range)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${range === activeRange
                                    ? 'bg-[#B5E3C4] text-[#04907E]'
                                    : 'bg-[#F7F7F7] text-[#6C6C6C]'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ResponsiveContainer width="100%" height={height}>
                <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                        {series
                            .filter((s) => s.showArea)
                            .map((s) => (
                                <linearGradient key={s.dataKey} id={`gradient-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                                    <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                    </defs>

                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 14 }}
                        dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} />
                    <Tooltip />

                    {series.map((s) =>
                        s.showArea ? (
                            <Area
                                key={s.dataKey}
                                type="monotone"
                                dataKey={s.dataKey}
                                name={s.name}
                                stroke={s.color}
                                strokeWidth={3}
                                fill={`url(#gradient-${s.dataKey})`}
                                dot={{ r: 5, fill: s.color, strokeWidth: 0 }}
                                activeDot={{ r: 6 }}
                            />
                        ) : (
                            <Line
                                key={s.dataKey}
                                type="monotone"
                                dataKey={s.dataKey}
                                name={s.name}
                                stroke={s.color}
                                strokeWidth={3}
                                dot={{ r: 5, fill: s.color, strokeWidth: 0 }}
                                activeDot={{ r: 6 }}
                            />
                        )
                    )}
                </ComposedChart>
            </ResponsiveContainer>

            {/* <div className="flex gap-6 justify-center mt-4 flex-wrap">
                {series.map((s) => (
                    <div key={s.dataKey} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-gray-600">{s.name}</span>
                    </div>
                ))}
            </div> */}
        </div>
    );
}