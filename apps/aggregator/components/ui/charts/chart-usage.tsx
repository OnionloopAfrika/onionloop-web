'use client';

import { useState } from 'react';
import TrendChart, { ChartDataPoint } from './trend-chart';
import NetworkGrowthCard from './network-growth-chart';

// Example 1: exact replica of the design — 2 series (one area, one line)


// Example 2: single series, no range tabs
const revenueData: ChartDataPoint[] = [
    { label: 'Mon', revenue: 1200 },
    { label: 'Tue', revenue: 1800 },
    { label: 'Wed', revenue: 1500 },
    { label: 'Thu', revenue: 2100 },
    { label: 'Fri', revenue: 1950 },
    { label: 'Sat', revenue: 2400 },
    { label: 'Sun', revenue: 2600 },
];

function RevenueCard() {
    return (
        <TrendChart
            title="Weekly Revenue"
            subtitle="Total revenue collected"
            data={revenueData}
            series={[{ dataKey: 'revenue', name: 'Revenue', color: '#04907E', showArea: true }]}
        />
    );
}

// Example 3: three series, showing it scales beyond two lines
const transactionsData: ChartDataPoint[] = [
    { label: 'Mon', successful: 320, failed: 40, pending: 20 },
    { label: 'Tue', successful: 380, failed: 35, pending: 25 },
    { label: 'Wed', successful: 350, failed: 50, pending: 18 },
    { label: 'Thu', successful: 410, failed: 30, pending: 22 },
    { label: 'Fri', successful: 400, failed: 45, pending: 30 },
    { label: 'Sat', successful: 460, failed: 25, pending: 15 },
    { label: 'Sun', successful: 500, failed: 20, pending: 12 },
];

function TransactionsCard() {
    const [range, setRange] = useState('7days');

    return (
        <TrendChart
            title="Transactions"
            subtitle="Successful vs Failed vs Pending"
            data={transactionsData}
            series={[
                { dataKey: 'successful', name: 'Successful', color: '#0f9d78', showArea: true },
                { dataKey: 'failed', name: 'Failed', color: '#dc2626', showArea: false },
                { dataKey: 'pending', name: 'Pending', color: '#d97706', showArea: false },
            ]}
            ranges={['7days', '30days']}
            activeRange={range}
            onRangeChange={setRange}
        />
    );
}

export default function DashboardExample() {
    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50">
            <NetworkGrowthCard />
            <RevenueCard />
            <TransactionsCard />
        </div>
    );
}