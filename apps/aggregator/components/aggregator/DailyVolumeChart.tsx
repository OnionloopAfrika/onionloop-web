import React from 'react';
import RevenueOverview from '../layouts/revenue-overview';
import { fetchRevenue } from "@/utils/helpers/revenue-chart";



export const DailyVolumeChart = async () => {
    const initialData = await fetchRevenue("7days");
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <RevenueOverview initialData={initialData} />
        </div>
    );
};