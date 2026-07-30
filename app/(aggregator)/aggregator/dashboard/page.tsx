"use client"

import { useState } from 'react'
import { AggregatorIcon, AggregatorRevenueIcon, AggregatorTransactionIcon, CalendarIcon, InventoryIcon, RevenueIcon, StaffIcon, TransactionIcon } from '@/components/icons/svgs'
import StatCard from '@/components/layouts/card-component'
import Header from '@/components/layouts/header'
import TrendChart, { ChartDataPoint } from '@/components/ui/charts/trend-chart'
import RateCard, { SparklinePoint } from '@/components/ui/rate-card'
import BusinessPerformanceTable from '@/components/aggregator/earning/business-performance-table'


const networkGrowthData: ChartDataPoint[] = [
    { label: 'Mon', active: 170, new: 45 },
    { label: 'Tue', active: 232, new: 58 },
    { label: 'Wed', active: 175, new: 47 },
    { label: 'Thu', active: 253, new: 62 },
    { label: 'Fri', active: 178, new: 45 },
    { label: 'Sat', active: 320, new: 75 },
    { label: 'Sun', active: 375, new: 82 },
];
function NetworkGrowthCard() {
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

const dormantChartData: SparklinePoint[] = [
    { label: '1', value: 9.5 },
    { label: '2', value: 9.0 },
    { label: '3', value: 7.5 },
    { label: '4', value: 6.5 },
    { label: '5', value: 7.0 },
    { label: '6', value: 6.8 },
    { label: '7', value: 7.2 },
    { label: '8', value: 6.9 },
    { label: '9', value: 7.4 },
    { label: '10', value: 6.4 },
    { label: '11', value: 6.6 },
];

function DormantRateCard() {
    return (
        <RateCard
            title="Dormant Rate"
            subtitle="Businesses that stopped activities"
            badge={{ direction: 'down', value: '1.8%' }}
            statValue="6.4%"
            statLabel="Last 30 days"
            comparisonText="improved from 8.2 last period"
            chartData={dormantChartData}
            chartColor="#dc2626"
            breakdownTitle="BREAKDOWN"
            breakdownItems={[
                { label: 'Dormant', value: 12, percent: 65, color: '#04802E' },
                { label: 'Voluntary exit', value: 3, percent: 20, color: '#CB1A14' },
            ]}
        />
    );
}

const page = () => {
    return (
        <main>
            <div className=" flex flex-col md:flex-row gap-4 justify-between items-start">
                <Header
                    heading="Dashboard"
                    subHeading="Manage and track all businesses under your aggregator network"
                />
                <div className="flex gap-3 w-full justify-end mt-4 md:mt-0">
                    <button className="inline-flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-lg bg-white text-[14px] font-medium text-gray-700">
                        <CalendarIcon />
                        Mar 2026
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 py-4">
                <StatCard
                    themeColor="purple"
                    icon={<AggregatorRevenueIcon color="#04802E" />}
                    percentage="12.4"
                    value="₦2.41M"
                    label="Total Business"
                    footerText="₦267k vs last month"
                    showTrendIcon
                    changePercentage={12.4}
                />

                <StatCard
                    themeColor="green"
                    icon={<AggregatorTransactionIcon color="#0D5EBA" />}
                    percentage="8.4"
                    value="1,350"
                    label="Active Business"
                    footerText="98 vs last month"
                    showTrendIcon
                    changePercentage={8.4}
                />

                <StatCard
                    themeColor="green"
                    icon={<AggregatorIcon color="#04802E" />}
                    percentage="12.4"
                    value="6"
                    label="New Business"
                    footerText="5.2 vs last month"
                    footerColor="green"
                    showTrendIcon
                    changePercentage={12.4}
                />

                <StatCard
                    themeColor="blue"
                    icon={<TransactionIcon color="#0D5EBA" />}
                    percentage="12.4"
                    value="120"
                    label="Products in Inventory"
                    footerText="5 out of stock"
                    footerColor="green"
                    showTrendIcon
                    changePercentage={12.4}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
                <div className="w-full md:col-span-2 h-full">
                <NetworkGrowthCard />
                </div>
                <div className="col-span-1 h-full">
                <DormantRateCard />
                </div>
            </div>
            <BusinessPerformanceTable />
        </main>
    )
}

export default page