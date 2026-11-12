import { useState } from "react";
import TrendChart, { ChartDataPoint } from "./trend-chart";

const networkGrowthData: ChartDataPoint[] = [
    { label: 'Mon', active: 170, new: 45 },
    { label: 'Tue', active: 232, new: 58 },
    { label: 'Wed', active: 175, new: 47 },
    { label: 'Thu', active: 253, new: 62 },
    { label: 'Fri', active: 178, new: 45 },
    { label: 'Sat', active: 320, new: 75 },
    { label: 'Sun', active: 375, new: 82 },
];

export default function NetworkGrowthCard() {
    const [range, setRange] = useState('7days');

    return (
        <TrendChart
            title="Network Growth"
            subtitle="Active Businesses vs New Businesses"
            data={networkGrowthData}
            series={[
                { dataKey: 'active', name: 'Active Businesses', color: '#04907E', showArea: true },
                { dataKey: 'new', name: 'New Businesses', color: '#166534', showArea: false },
            ]}
            ranges={['7days', '30days', '90days']}
            activeRange={range}
            onRangeChange={setRange}
        />
    );
}