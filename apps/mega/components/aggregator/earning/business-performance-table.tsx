"use client";

import { SearchIcon } from "@/components/icons/svgs";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import React, { useState, useMemo } from "react";



export interface BusinessItem {
    id: string;
    owner: string;
    avatar: string;
    name: string;
    kycLevel: string;
    phoneNumber: string;
    type: "Agent" | "Merchant";
    perfScore: number;
}

interface BusinessPerformanceTableProps {
    initialData?: BusinessItem[];
    itemsPerPage?: number;
}

const MOCK_BUSINESSES: BusinessItem[] = [
    {
        id: "1",
        owner: "Joseph Maduabuchi",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        name: "De-Light SuperStores",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Agent",
        perfScore: 91,
    },
    {
        id: "2",
        owner: "Oluwafunmiike Robbin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        name: "KFC Holdings",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "3",
        owner: "Oladimejii Yemisi",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        name: "Proens Stores",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "4",
        owner: "John Chinedu",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
        name: "God’s Owned Business",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "5",
        owner: "Grace Wanjiku",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        name: "Swift Logistics",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "6",
        owner: "Philip Tonbara",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        name: "Emeka & co.",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "7",
        owner: "Joshua Agbasi",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        name: "Big Bites Restaurants",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 91,
    },
    {
        id: "8",
        owner: "Mary Adebayo",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        name: "Grace Beauty Hub",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Merchant",
        perfScore: 58,
    },
    {
        id: "9",
        owner: "David Iwalewa",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        name: "Mains Cosmetics",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Agent",
        perfScore: 58,
    },
    {
        id: "10",
        owner: "Hannah Nwankwo",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        name: "Prime Med. Pharmacy",
        kycLevel: "TIER 3",
        phoneNumber: "+234 816 249 0242",
        type: "Agent",
        perfScore: 58,
    },
];

const perfScoreOptions = [
    { value: "all", label: "All Perf. Score" },
    { value: "high", label: "High (70 - 100)" },
    { value: "low", label: "Low (0 - 69)" },
];

const businessTypeOptions = [
    { value: "all", label: "All Businesses" },
    { value: "Agent", label: "Agent" },
    { value: "Merchant", label: "Merchant" },
];

export const BusinessPerformanceTable: React.FC<BusinessPerformanceTableProps> = ({
    initialData = MOCK_BUSINESSES,
    itemsPerPage = 10,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedPerfScore, setSelectedPerfScore] = useState("all");
    const [selectedBusinessType, setSelectedBusinessType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBusinesses = useMemo(() => {
        return initialData.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.owner.toLowerCase().includes(searchValue.toLowerCase());

            const matchesType =
                selectedBusinessType === "all" || item.type === selectedBusinessType;

            const matchesPerf =
                selectedPerfScore === "all" ||
                (selectedPerfScore === "high" && item.perfScore >= 70) ||
                (selectedPerfScore === "low" && item.perfScore < 70);

            return matchesSearch && matchesType && matchesPerf;
        });
    }, [initialData, searchValue, selectedBusinessType, selectedPerfScore]);

    const totalItems = filteredBusinesses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedBusinesses = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredBusinesses.slice(start, start + itemsPerPage);
    }, [filteredBusinesses, currentPage, itemsPerPage]);

    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages: (number | string)[] = [];
        pages.push(1, 2, 3, 4);
        if (currentPage > 4 && currentPage < totalPages - 1) {
            pages.push("...");
            pages.push(currentPage);
        }
        pages.push("...");
        pages.push(totalPages);
        return pages;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden font-sans">
            <div className="p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:max-w-xs">
                    <Input
                        type="text"
                        placeholder="Search business name"
                        value={searchValue}
                        onChange={handleSearchChange}
                        prefixicon={<SearchIcon />}
                        className="text-xs !bg-[#F9FAFB] !border-[#E5E7EB]"
                    />
                </div>
                <div className="w-full sm:w-44">
                    <Select
                        options={perfScoreOptions}
                        value={selectedPerfScore}
                        onValueChange={(val) => {
                            setSelectedPerfScore(val);
                            setCurrentPage(1);
                        }}
                        placeholder="All Perf. Score"
                    />
                </div>
                <div className="w-full sm:w-44">
                    <Select
                        options={businessTypeOptions}
                        value={selectedBusinessType}
                        onValueChange={(val) => {
                            setSelectedBusinessType(val);
                            setCurrentPage(1);
                        }}
                        placeholder="All Businesses"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F9FAFB] border-b border-[#F3F4F6] text-[14px] font-semibold text-[#6C6C6C]">
                            <th className="py-3.5 px-6 whitespace-nowrap"></th>
                            <th className="py-3.5 px-6 whitespace-nowrap">Business Owner</th>
                            <th className="py-3.5 px-6 whitespace-nowrap">Business Name</th>
                            <th className="py-3.5 px-6 whitespace-nowrap">KYC Level</th>
                            <th className="py-3.5 px-6 whitespace-nowrap">Phone Number</th>
                            <th className="py-3.5 px-6 whitespace-nowrap">Business Type</th>
                            <th className="py-3.5 px-6 whitespace-nowrap">Perf. Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6] text-xs font-medium text-[#374151]">
                        {paginatedBusinesses.length > 0 ? (
                            paginatedBusinesses.map((item) => {
                                const isHighPerf = item.perfScore >= 70;
                                return (
                                    <tr key={item.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center gap-3 w-10">
                                                <img
                                                    src={item.avatar}
                                                    alt={item.owner}
                                                    className="w-7 h-7 rounded-full object-cover"
                                                />
                                                {/* <span className="font-semibold text-[#111827]">{item.owner}</span> */}
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 text-[#6C6C6C] font-medium whitespace-nowrap">{item.owner}</td>
                                        <td className="py-4 px-6 text-[#6C6C6C] font-medium whitespace-nowrap">{item.name}</td>

                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className="text-[10px] font-bold text-[#024E44] bg-[#B5E3C4] px-2.5 py-1 rounded-full">
                                                {item.kycLevel}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6 text-[#6C6C6C] font-medium whitespace-nowrap">{item.phoneNumber}</td>

                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className="text-[11px] font-semibold text-[#04907E] bg-[#F5FFFD] px-2.5 py-1 rounded-full">
                                                {item.type}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${isHighPerf ? "bg-[#024E44]" : "bg-[#CB1A14]"
                                                            }`}
                                                        style={{ width: `${item.perfScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-[11px] font-medium text-[#6C6C6C]">
                                                    {item.perfScore}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-[#9CA3AF] text-xs">
                                    No businesses match your search parameters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-[#F3F4F6] bg-white flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                <span className="text-[#6B7280] text-[12px] font-medium">
                    Showing {startIndex} to {endIndex} of {totalItems} businesses
                </span>

                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5417 16.5999L7.10841 11.1666C6.46675 10.5249 6.46675 9.4749 7.10841 8.83324L12.5417 3.3999" stroke="#C7C7C7" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>

                    {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={`w-7 h-7 rounded-md text-[12px] font-medium flex items-center justify-center transition-colors ${currentPage === page
                                    ? "bg-[#008A75] text-white"
                                    : "text-[#6C6C6C] hover:bg-[#F3F4F6]"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="text-[#9CA3AF] text-xs px-1 select-none">
                                {page}
                            </span>
                        )
                    )}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.45825 3.4001L12.8916 8.83343C13.5333 9.4751 13.5333 10.5251 12.8916 11.1668L7.45825 16.6001" stroke="#6C6C6C" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessPerformanceTable;