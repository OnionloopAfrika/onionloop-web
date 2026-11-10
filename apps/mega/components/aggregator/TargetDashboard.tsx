"use client"
import React, { useState } from 'react';
import dashboardData from './target-dashboard.data.json';
import { Header } from './Header';
import { SummaryCards } from './SummaryCards';
import { TargetCard } from './TargetCard';
import { BusinessTable } from './BusinessTable';
import RevenueOverview from '../layouts/revenue-overview';
import { DailyVolumeChart } from './DailyVolumeChart';
import TrendChart, { ChartDataPoint } from '../ui/charts/trend-chart';


export const TargetDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans max-w-[1400px] mx-auto text-gray-900">
            <Header
                title={dashboardData.header.title}
                subtitle={dashboardData.header.subtitle}
                date={dashboardData.header.date}
            />

            <SummaryCards data={dashboardData.summaryCards} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TargetCard
                    title={dashboardData.metrics.transactionVolume.title}
                    currentFormatted={dashboardData.metrics.transactionVolume.currentFormatted}
                    targetFormatted={dashboardData.metrics.transactionVolume.targetFormatted}
                    status={dashboardData.metrics.transactionVolume.status as 'On track'}
                    progress={dashboardData.metrics.transactionVolume.progress}
                    needText={dashboardData.metrics.transactionVolume.need}
                    currentRateText={dashboardData.metrics.transactionVolume.current}
                />
                <TargetCard
                    title={dashboardData.metrics.onboardingVolume.title}
                    currentFormatted={dashboardData.metrics.onboardingVolume.current.toString()}
                    targetFormatted={dashboardData.metrics.onboardingVolume.target}
                    status={dashboardData.metrics.onboardingVolume.status as 'On track'}
                    progress={dashboardData.metrics.onboardingVolume.progress}
                    needText={dashboardData.metrics.onboardingVolume.need}
                    currentRateText={dashboardData.metrics.onboardingVolume.currentRate}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <TargetCard
                    title={dashboardData.metrics.newBusinesses.title}
                    currentFormatted={dashboardData.metrics.newBusinesses.current.toString()}
                    targetFormatted={dashboardData.metrics.newBusinesses.target}
                    status={dashboardData.metrics.newBusinesses.status as 'Behind track'}
                    progress={dashboardData.metrics.newBusinesses.progress}
                    needText={dashboardData.metrics.newBusinesses.needText}
                    additionalText={dashboardData.metrics.newBusinesses.additionalText}
                />
                <div className="w-full lg:col-span-2 h-full">
                    {/* <DailyVolumeChart /> */}
                    <RevenueCard />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TargetCard
                    title={dashboardData.metrics.activeAgents.title}
                    currentFormatted={dashboardData.metrics.activeAgents.current.toString()}
                    targetFormatted={dashboardData.metrics.activeAgents.target}
                    status={dashboardData.metrics.activeAgents.status as 'Behind track'}
                    progress={dashboardData.metrics.activeAgents.progress}
                    needText={dashboardData.metrics.activeAgents.needText}
                    additionalText={dashboardData.metrics.activeAgents.additionalText}
                />
                <TargetCard
                    title={dashboardData.metrics.activeMerchants.title}
                    currentFormatted={dashboardData.metrics.activeMerchants.current.toString()}
                    targetFormatted={dashboardData.metrics.activeMerchants.target}
                    status={dashboardData.metrics.activeMerchants.status as 'On track'}
                    progress={dashboardData.metrics.activeMerchants.progress}
                    needText={dashboardData.metrics.activeMerchants.needText}
                    additionalText={dashboardData.metrics.activeMerchants.additionalText}
                />
            </div>

            <BusinessTable
                businesses={dashboardData.businesses}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
};

export default TargetDashboard;

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
            title="Daily Business Volume "
            subtitle="₦2.4M earned today"
            data={revenueData}
            series={[{ dataKey: 'revenue', name: 'Revenue', color: '#04907E', showArea: true }]}
        />
    );
}