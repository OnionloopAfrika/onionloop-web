"use client";

import React, { useState, useMemo } from 'react';

import { SearchIcon } from '../icons/svgs';
import Input from '../ui/input';
import Select from '../ui/select';


export interface BusinessItem {
    id: string;
    owner: string;
    avatar: string;
    name: string;
    type: string;
    volume: string;
    commission: string;
    kycLevel: string;
    activeStatus: string;
    inactiveStatus: string;
}

interface BusinessTableProps {
    businesses: BusinessItem[];
    activeTab: 'active' | 'inactive';
    onTabChange: (tab: 'active' | 'inactive') => void;
    itemsPerPage?: number;
}

const filterOptions = [
    { value: 'this-month', label: 'This month' },
    { value: 'last-month', label: 'Last month' },
    { value: 'all-time', label: 'All time' },
];

export const BusinessTable: React.FC<BusinessTableProps> = ({
    businesses,
    activeTab,
    onTabChange,
    itemsPerPage = 10,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedTimeframe, setSelectedTimeframe] = useState('this-month');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBusinesses = useMemo(() => {
        return businesses.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [businesses, searchValue]);

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

        const pages: (number | string)[] = [1];

        if (currentPage > 3) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    const handleTabSwitch = (tab: 'active' | 'inactive') => {
        onTabChange(tab);
        setCurrentPage(1);
    };

    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="mt-6 space-y-2">
            <div className="w-full bg-white p-2 shadow-sm rounded-2xl">
            <div className="bg-[#F7F7F7] p-1 rounded-xl inline-flex">
                <button
                    onClick={() => handleTabSwitch('inactive')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'inactive'
                        ? 'bg-white text-[#024E44] shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                        >
                    Inactive Businesses
                </button>
                <button
                    onClick={() => handleTabSwitch('active')}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'active'
                        ? 'bg-white text-[#024E44] shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                        >
                    Active Businesses
                </button>
            </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="w-full lg:w-1/2 p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="w-full">
                        <Input
                            type="text"
                            placeholder="Search business name"
                            value={searchValue}
                            onChange={handleSearchChange}
                            prefixicon={<SearchIcon />}
                            className="text-xs"
                        />
                    </div>
                    <div className="flex items-start justify-start w-full sm:w-60">
                        <Select
                            options={filterOptions}
                            value={selectedTimeframe}
                            onValueChange={setSelectedTimeframe}
                            placeholder="Select period"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-[#6C6C6C] uppercase tracking-wider">
                                <th className="py-3 px-4"></th>
                                <th className="py-3 px-4">Business Owner</th>
                                <th className="py-3 px-4">Business Name</th>
                                <th className="py-3 px-4">Business Type</th>
                                <th className="py-3 px-4">Volume</th>
                                <th className="py-3 px-4">Commission</th>
                                <th className="py-3 px-4">KYC Level</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                            {paginatedBusinesses.length > 0 ? (
                                paginatedBusinesses.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-[#6C6C6C]">
                                            <div className="flex items-center gap-2.5 w-10">
                                                <img
                                                    src={item.avatar}
                                                    alt={item.owner}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 font-medium">{item.owner}</td>
                                        <td className="py-3 px-4 text-gray-600 font-medium">{item.name}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-[11px] font-semibold text-[#04907E] bg-[#F5FFFD] px-2 py-0.5 rounded">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 font-medium">{item.volume}</td>
                                        <td className="py-3 px-4 text-gray-700 font-medium">{item.commission}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-[10px] text-[#024E44] bg-[#B5E3C4] px-2 py-0.5 rounded-full">
                                                {item.kycLevel}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {activeTab === 'active' ? (
                                                <span className="inline-flex items-center text-[10px] text-[#024E44] bg-[#B5E3C4] px-2.5 py-1 rounded-full">
                                                    {item.activeStatus}
                                                </span>
                                            ) : (
                                                    <span className="inline-flex items-center text-[10px] font-semibold text-[#DD900D] bg-[#FFF2CC] px-2.5 py-1 rounded-full border border-amber-100">
                                                    {item.inactiveStatus}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-gray-400 text-xs">
                                        No businesses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 text-[#6C6C6C] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                    <span className="text-gray-400 text-[11px]">
                        Showing {startIndex} to {endIndex} of {totalItems} {activeTab === 'active' ? 'active' : 'inactive'} businesses
                    </span>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5415 16.5999L7.10817 11.1666C6.4665 10.5249 6.4665 9.4749 7.10817 8.83324L12.5415 3.3999" stroke="#C7C7C7" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>

                            {getPageNumbers().map((page, index) =>
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-6 h-6 rounded text-[11px] font-semibold flex items-center justify-center transition-colors ${currentPage === page
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="text-gray-500 text-xs px-1 select-none">
                                        {page}
                                    </span>
                                )
                            )}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.45801 3.4001L12.8913 8.83343C13.533 9.4751 13.533 10.5251 12.8913 11.1668L7.45801 16.6001" stroke="#6C6C6C" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};