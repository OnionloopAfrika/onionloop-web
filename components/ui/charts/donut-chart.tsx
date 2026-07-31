'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Select from '@/components/ui/select';

export interface DonutSlice {
    label: string;
    value: number;
    color: string;
}

interface DonutBreakdownProps {
    title: string;
    currencySymbol?: string;   // e.g. "₦"
    totalLabel?: string;       // e.g. "Total this month"
    total?: number;            // optional override, defaults to sum of data values
    data: DonutSlice[];
    dropdownOptions?: string[]; // e.g. ["This month", "Last month", "This year"]
    size?: number;              // outer diameter of the donut in px
}

export default function DonutBreakdown({
    title,
    currencySymbol = '',
    totalLabel = 'Total',
    total,
    data,
    dropdownOptions,
    size = 270,
}: DonutBreakdownProps) {
    const [selected, setSelected] = useState(dropdownOptions?.[0] ?? '');

    const sum = data.reduce((acc, d) => acc + d.value, 0);
    const displayTotal = total ?? sum;

    const formatCurrency = (n: number) =>
        `${currencySymbol}${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const selectOptions = dropdownOptions?.map((opt) => ({
        value: opt,
        label: opt,
    })) ?? [];

    return (
        <div className="bg-white rounded-3xl shadow-sm p-4 w-full">
            <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-extrabold text-gray-900">{title}</h3>

                {dropdownOptions && dropdownOptions.length > 0 && (
                    <div className="w-44">
                        <Select
                            options={selectOptions}
                            value={selected}
                            onValueChange={setSelected}
                            placeholder={dropdownOptions[0]}
                            className="bg-white border border-[#C7C7C7] rounded-2xl"
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-10">
                <div className="relative" style={{ width: size, height: size }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                innerRadius="62%"
                                outerRadius="100%"
                                paddingAngle={6}
                                cornerRadius={16}
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                                isAnimationActive={false}
                            >
                                {data.map((slice) => (
                                    <Cell key={slice.label} fill={slice.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-gray-400 text-xs">{totalLabel}</span>
                        <span className="text-lg font-extrabold text-gray-900 mt-1">
                            {formatCurrency(displayTotal)}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {data.map((slice) => (
                        <div key={slice.label} className="flex items-start gap-3">
                            <span
                                className="w-4 h-4 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: slice.color }}
                            />
                            <div>
                                <p className="text-[#131313] font-medium text-sm">{slice.label}</p>
                                <p className="text-[#6C6C6C] mt-0.5 text-xs font-normal">
                                    {formatCurrency(slice.value)} ({((slice.value / sum) * 100).toFixed(1)}%)
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}