import React, { useState } from 'react'

interface StatCardItem {
    id: string
    count: string | number
    label: string
    iconBg: string
    iconColor: string
    svgPath: React.ReactNode
}

interface PerformanceMetricDashboardProps {
    metrics?: StatCardItem[]
}

export const mockDashboardMetrics: StatCardItem[] = [
    {
        id: 'total-locations',
        count: '1000',
        label: 'Total Locations',
        iconBg: 'bg-[#CFC2F7]',
        iconColor: '#7C53FC',
        svgPath: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#7C53FC" stroke-width="1.5" />
                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#7C53FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
    },
    {
        id: 'active-locations',
        count: '890',
        label: 'Active Locations',
        iconBg: 'bg-[#B5E3C4]',
        iconColor: '#04802E',
        svgPath: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        ),
    },
    {
        id: 'underperforming',
        count: '109',
        label: 'Underperforming',
        iconBg: 'bg-[#FBE2B7]',
        iconColor: '#DD900D',
        svgPath: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 7.75V13" stroke="#DD900D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#DD900D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 16.2002V16.3002" stroke="#DD900D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
    },
    {
        id: 'critical-issues',
        count: '1',
        label: 'Critical Issues',
        iconBg: 'bg-[#F2BCBA]',
        iconColor: '#CB1A14',
        svgPath: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9V14" stroke="#CB1A14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.0004 21.4103H5.94042C2.47042 21.4103 1.02042 18.9303 2.70042 15.9003L5.82042 10.2803L8.76042 5.00027C10.5404 1.79027 13.4604 1.79027 15.2404 5.00027L18.1804 10.2903L21.3004 15.9103C22.9804 18.9403 21.5204 21.4203 18.0604 21.4203H12.0004V21.4103Z" stroke="#CB1A14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9941 17H12.0031" stroke="#CB1A14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
    },
]

export default function PerformanceMetricDashboard({
    metrics = mockDashboardMetrics,
}: PerformanceMetricDashboardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-transparent font-sans">
            {metrics.map((metric) => (
                <div
                    key={metric.id}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start justify-between min-h-[160px] w-full transition-all hover:shadow-md"
                >
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.iconBg}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke={metric.iconColor}
                            className="w-5 h-5"
                        >
                            {metric.svgPath}
                        </svg>
                    </div>

                    <div className="flex flex-col gap-1 mt-4">
                        <span className="text-[28px] font-semibold text-gray-900 tracking-tight leading-none">
                            {metric.count.toLocaleString()}
                        </span>
                        <span className="text-[14px] font-normal text-[#6C6C6C] tracking-normal">
                            {metric.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}