"use client";

import React, { useState } from "react";
import Input from "../ui/input";
import Select from "../ui/select";
import { Search } from "../staff-page/icon";
import LocationList from "./location-table";
import { LocationItem } from "@/types/types";



interface LocationManagementProps {
    selectedGroupFilter: string;
    minRevenueFilter: string;
    maxRevenueFilter: string;
    perfScoreFilter: string;
    statusAlertFilter: string;
}

export const mockLocationsData: LocationItem[] = [
    { id: "1", group: "SW Region", name: "Ikeja", manager: "Tunde Obi", revenue: "₦12.4M", trend: "14.8%", isTrendUp: true, transactions: 1000, perfScore: 91, status: "Healthy" },
    { id: "2", group: "SW Region", name: "Gbagi", manager: "Ebipade Goinbo", revenue: "₦11.2M", trend: "10.9%", isTrendUp: true, transactions: 200, perfScore: 91, status: "Healthy" },
    { id: "3", group: "SW Region", name: "Ilesha", manager: "Modupe Kolapo", revenue: "₦10.8M", trend: "10.2%", isTrendUp: true, transactions: 101, perfScore: 79, status: "Warning" },
    { id: "4", group: "SW Region", name: "Ajegunle", manager: "Amina Saidu", revenue: "₦6.8M", trend: "4.6%", isTrendUp: true, transactions: 248, perfScore: 79, status: "Warning" },
    { id: "5", group: "SW Region", name: "Onikoyi", manager: "Ayodele Omisore", revenue: "₦5.2M", trend: "7.1%", isTrendUp: false, transactions: 981, perfScore: 58, status: "Critical" },
    { id: "6", group: "SW Region", name: "Oshodi", manager: "Idris Rabiu", revenue: "₦3.6M", trend: "12.2%", isTrendUp: false, transactions: 500, perfScore: 58, status: "Critical" },
];

const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Healthy", label: "Healthy" },
    { value: "Warning", label: "Warning" },
    { value: "Critical", label: "Critical" },
];

const regionOptions = [
    { value: "south-west", label: "South West" },
    { value: "south-east", label: "South East" },
    { value: "north", label: "North" },
];

export default function LocationManagement({
    selectedGroupFilter,
    minRevenueFilter,
    maxRevenueFilter,
    perfScoreFilter,
    statusAlertFilter
}: LocationManagementProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [regionFilter, setRegionFilter] = useState("south-west");

    const getStatusStyles = (status: LocationItem["status"]) => {
        switch (status) {
            case "Healthy":
                return {
                    badge: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
                    bar: "bg-[#04802E]",
                };
            case "Warning":
                return {
                    badge: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]",
                    bar: "bg-[#DD900D]",
                };
            case "Critical":
                return {
                    badge: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
                    bar: "bg-[#CB1A14]",
                };
        }
    };

    const filteredData = mockLocationsData.filter((loc) => {
        const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocalStatus = statusFilter === "all" || loc.status === statusFilter;

        const matchesGroup = selectedGroupFilter === "all" || loc.group === selectedGroupFilter;
        const matchesAlert = statusAlertFilter === "all" || loc.status === statusAlertFilter;

        const numRevenue = parseFloat(loc.revenue.replace(/[^0-9.]/g, "")) * 1000000;
        const matchesMinRev = numRevenue >= parseFloat(minRevenueFilter);
        const matchesMaxRev = maxRevenueFilter === "no-limit" || numRevenue <= parseFloat(maxRevenueFilter);

        let matchesScore = true;
        if (perfScoreFilter !== "all") {
            matchesScore = loc.perfScore >= parseFloat(perfScoreFilter);
        }

        return matchesSearch && matchesLocalStatus && matchesGroup && matchesAlert && matchesMinRev && matchesMaxRev && matchesScore;
    });

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen font-sans">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1 max-w-4xl">
                    <div className="relative w-full max-w-[320px]">
                        <Input
                            type="text"
                            placeholder="Search by location name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            prefixicon={<Search />}
                            className="w-full h-[48px] !bg-[#F7F7F7] border-none rounded-lg text-[13px] placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    <div className="w-[150px]">
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                            options={statusOptions}
                            placeholder="Sort by: All Status"
                        />
                    </div>

                    <div className="w-[160px]">
                        <Select
                            value={regionFilter}
                            onValueChange={setRegionFilter}
                            options={regionOptions}
                            placeholder="Filter by: South West"
                        />
                    </div>
                </div>

                <div className="flex items-center self-end md:self-auto">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-2 px-3 py-[8px] rounded-lg text-[14px] font-normal transition-all ${viewMode === "grid"
                            ? "bg-[#04907E] text-[#ffffff] shadow-sm"
                            : "text-[#6C6C6C] hover:text-gray-900"
                            }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.50033 18.3337H12.5003C16.667 18.3337 18.3337 16.667 18.3337 12.5003V7.50033C18.3337 3.33366 16.667 1.66699 12.5003 1.66699H7.50033C3.33366 1.66699 1.66699 3.33366 1.66699 7.50033V12.5003C1.66699 16.667 3.33366 18.3337 7.50033 18.3337Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.125 7.5H6.875" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.125 12.5H6.875" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Grid
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-normal transition-all ${viewMode === "list"
                            ? "bg-[#04907E] text-[#ffffff] shadow-sm"
                            : "text-[#6C6C6C] hover:text-gray-900"
                            }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.50033 18.3337H12.5003C16.667 18.3337 18.3337 16.667 18.3337 12.5003V7.50033C18.3337 3.33366 16.667 1.66699 12.5003 1.66699H7.50033C3.33366 1.66699 1.66699 3.33366 1.66699 7.50033V12.5003C1.66699 16.667 3.33366 18.3337 7.50033 18.3337Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.125 7.5H6.875" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.125 12.5H6.875" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        List
                    </button>
                </div>
            </div>

            {viewMode === "list" ? (
                <LocationList filteredData={filteredData} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredData.map((loc) => {
                        const styles = getStatusStyles(loc.status);
                        return (
                            <div key={loc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#EDE8FC] text-[#7C53FC] font-semibold text-sm flex items-center justify-center">
                                            {loc.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-[16px]">{loc.name}</h4>
                                            <p className="text-xs font-medium text-[#6C6C6C]">Group 1</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-0.5 border rounded-full text-[11px] font-normal ${styles.badge.replace('text-[12px]', 'text-[11px]')}`}>
                                        {loc.status.toLowerCase()}
                                    </span>
                                </div>

                                <div className="text-[28px] font-medium text-gray-900 mb-4 mt-2">
                                    {loc.revenue}
                                </div>

                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                                    <div className={`h-full ${styles.bar}`} style={{ width: `${loc.perfScore}%` }} />
                                </div>

                                <div className="flex justify-between items-center text-xs font-medium text-[#6C6C6C] mt-1 mb-4">
                                    <span>{loc.manager}</span>
                                    <span className={`font-normal flex items-center gap-0.5 ${loc.isTrendUp ? 'text-green-600' : 'text-red-600'}`}>
                                        {loc.isTrendUp ? "↑" : "↓"}{loc.trend}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}