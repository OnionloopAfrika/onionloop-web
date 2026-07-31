"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarIcon, SearchIcon } from "@/components/icons/svgs";
import Input from "@/components/ui/input";

export interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    time: string;
    type: "onboarded" | "activated" | "dormant";
}

const MOCK_ALL_ACTIVITIES: ActivityItem[] = [
    {
        id: "1",
        title: "New Business Onboarded",
        subtitle: "Chukwu Enterprises",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "2",
        title: "Business Activated",
        subtitle: "Lagos Express Agent",
        time: "10 mins ago",
        type: "activated",
    },
    {
        id: "3",
        title: "Business became dormant",
        subtitle: "Oluwa Ventures",
        time: "10 mins ago",
        type: "dormant",
    },
    {
        id: "4",
        title: "New Business Onboarded",
        subtitle: "Zik Tech Solutions",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "5",
        title: "Business Activated",
        subtitle: "Victoria Plaza",
        time: "10 mins ago",
        type: "activated",
    },
    {
        id: "6",
        title: "New Business Onboarded",
        subtitle: "Chukwu Enterprises",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "7",
        title: "Business Activated",
        subtitle: "Lagos Express Agent",
        time: "10 mins ago",
        type: "activated",
    },
    {
        id: "8",
        title: "Business became dormant",
        subtitle: "Oluwa Ventures",
        time: "10 mins ago",
        type: "dormant",
    },
    {
        id: "9",
        title: "New Business Onboarded",
        subtitle: "Zik Tech Solutions",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "10",
        title: "Business Activated",
        subtitle: "Victoria Plaza",
        time: "10 mins ago",
        type: "activated",
    },
    {
        id: "11",
        title: "New Business Onboarded",
        subtitle: "Chukwu Enterprises",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "12",
        title: "Business Activated",
        subtitle: "Lagos Express Agent",
        time: "10 mins ago",
        type: "activated",
    },
    {
        id: "13",
        title: "Business became dormant",
        subtitle: "Oluwa Ventures",
        time: "10 mins ago",
        type: "dormant",
    },
    {
        id: "14",
        title: "New Business Onboarded",
        subtitle: "Zik Tech Solutions",
        time: "10 mins ago",
        type: "onboarded",
    },
    {
        id: "15",
        title: "Business Activated",
        subtitle: "Victoria Plaza",
        time: "10 mins ago",
        type: "activated",
    },
];

export default function RecentActivitiesView() {
    const [searchValue, setSearchValue] = useState("");
    const [dateValue, setDateValue] = useState("2026-05-08");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredActivities = useMemo(() => {
        return MOCK_ALL_ACTIVITIES.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchValue.toLowerCase())
            );
        });
    }, [searchValue]);

    const totalItems = filteredActivities.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const paginatedActivities = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredActivities, currentPage, itemsPerPage]);

    const groupedCards = useMemo(() => {
        const groups: ActivityItem[][] = [];
        for (let i = 0; i < paginatedActivities.length; i += 5) {
            groups.push(paginatedActivities.slice(i, i + 5));
        }
        return groups;
    }, [paginatedActivities]);

    const getActivityIcon = (type: ActivityItem["type"]) => {
        switch (type) {
            case "onboarded":
                return (
                    <div className="w-8 h-8 rounded-full bg-[#B5E3C4] flex items-center justify-center text-[#1E8E3E]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15.4173 16.25H12.084" stroke="#04802E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.75 17.9167V14.5834" stroke="#04802E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.1341 9.05829C10.0508 9.04996 9.95081 9.04996 9.85915 9.05829C7.87581 8.99163 6.30081 7.36663 6.30081 5.36663C6.29248 3.32496 7.95081 1.66663 9.99248 1.66663C12.0341 1.66663 13.6925 3.32496 13.6925 5.36663C13.6925 7.36663 12.1091 8.99163 10.1341 9.05829Z" stroke="#04802E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.99219 18.1749C8.47552 18.1749 6.96719 17.7916 5.81719 17.0249C3.80052 15.6749 3.80052 13.4749 5.81719 12.1333C8.10885 10.5999 11.8672 10.5999 14.1589 12.1333" stroke="#04802E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );
            case "activated":
                return (
                    <div className="w-8 h-8 rounded-full bg-[#B5E3C4] flex items-center justify-center text-[#1E8E3E]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4.16602 10L8.33268 14.1667L16.666 5.83337" stroke="#04802E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );
            case "dormant":
                return (
                    <div className="w-8 h-8 rounded-full bg-[#C7C7C7] flex items-center justify-center text-[#5F6368]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.67578 3.52112C6.67935 3.47971 6.68593 3.4392 6.69141 3.39905C6.68589 3.4395 6.67933 3.48002 6.67578 3.52112ZM13.3105 3.42932C13.3143 3.45966 13.3196 3.49007 13.3223 3.52112C13.3196 3.49025 13.3143 3.45983 13.3105 3.42932ZM6.70215 3.31897C6.71046 3.27035 6.72137 3.22304 6.73242 3.17639C6.72128 3.22345 6.71038 3.27078 6.70215 3.31897ZM13.2656 3.17639C13.2759 3.21991 13.286 3.26397 13.2939 3.3092C13.2861 3.26435 13.276 3.22026 13.2656 3.17639ZM6.74902 3.10315C6.75867 3.06783 6.77103 3.03374 6.78223 2.99963C6.77096 3.03397 6.7586 3.06806 6.74902 3.10315ZM13.2178 3.00745C13.2279 3.03873 13.2392 3.06988 13.248 3.10217C13.2393 3.07007 13.228 3.03892 13.2178 3.00745ZM6.81543 2.90198C6.82815 2.86888 6.84324 2.83714 6.85742 2.8053C6.84314 2.83735 6.82806 2.86909 6.81543 2.90198ZM13.1484 2.8219C13.1598 2.84797 13.1713 2.8741 13.1816 2.901C13.1713 2.87424 13.1598 2.84811 13.1484 2.8219ZM6.89355 2.72522C6.9129 2.68652 6.93456 2.64958 6.95605 2.61292C6.93433 2.64988 6.91276 2.68686 6.89355 2.72522ZM13.0312 2.59436C13.0553 2.63436 13.0791 2.67493 13.1006 2.71741C13.0793 2.67534 13.0556 2.63472 13.0312 2.59436ZM12.7588 2.24084L12.7578 2.24182C12.7107 2.19467 12.6615 2.15015 12.6104 2.10901C12.6624 2.15075 12.7124 2.19444 12.7588 2.24084ZM7.24023 2.24084L7.24121 2.24182C7.19235 2.29068 7.14592 2.34103 7.10352 2.39417C7.14656 2.34006 7.19218 2.2889 7.24023 2.24084ZM12.4502 1.99475C12.4871 2.01839 12.522 2.04417 12.5566 2.06995C12.5217 2.04387 12.4867 2.01821 12.4502 1.99475ZM7.6123 1.95667C7.64897 1.93517 7.68591 1.91351 7.72461 1.89417C7.68625 1.91337 7.64927 1.93494 7.6123 1.95667ZM12.2773 1.89612C12.311 1.91302 12.3429 1.93228 12.375 1.95081C12.3427 1.93211 12.3107 1.91291 12.2773 1.89612ZM7.80469 1.85803C7.83653 1.84385 7.86827 1.82876 7.90137 1.81604C7.86848 1.82867 7.83674 1.84375 7.80469 1.85803ZM12.0957 1.81604C12.1247 1.82715 12.1526 1.83994 12.1807 1.85217C12.1525 1.83986 12.1245 1.82708 12.0957 1.81604ZM7.99902 1.78284C8.03313 1.77164 8.06722 1.75928 8.10254 1.74963C8.06745 1.75921 8.03336 1.77157 7.99902 1.78284ZM11.8975 1.75061C11.93 1.75954 11.9616 1.77063 11.9932 1.78088C11.9614 1.77058 11.9298 1.75947 11.8975 1.75061ZM8.18457 1.73108C8.22841 1.72087 8.27279 1.71055 8.31836 1.70276C8.27316 1.71048 8.22877 1.7208 8.18457 1.73108ZM11.6807 1.70276C11.7222 1.70986 11.7627 1.71904 11.8027 1.72815C11.7624 1.71898 11.7218 1.7098 11.6807 1.70276ZM8.39844 1.69202C8.43859 1.68654 8.4791 1.67996 8.52051 1.67639C8.47941 1.67995 8.43889 1.6865 8.39844 1.69202ZM11.4775 1.67639C11.5152 1.67963 11.5522 1.68524 11.5889 1.69006C11.552 1.6852 11.515 1.67962 11.4775 1.67639ZM12.9043 2.40784C12.941 2.45477 12.9752 2.50401 13.0078 2.5553C12.9756 2.50473 12.9415 2.45534 12.9043 2.40784ZM6.99316 2.54846C7.01793 2.5098 7.04515 2.47331 7.07227 2.43713C7.04483 2.47363 7.01773 2.51022 6.99316 2.54846ZM7.43652 2.07288C7.4727 2.04576 7.50919 2.01854 7.54785 1.99377C7.50961 2.01834 7.47302 2.04544 7.43652 2.07288Z" stroke="#8A8A8A" strokeWidth="1.25" />
                            <path d="M7 6.04163H13C14.3329 6.04167 14.8891 6.35368 15.168 6.6842C15.4802 7.05433 15.5923 7.59962 15.6953 8.43127V8.43225L16.2354 12.942H6.66602C5.98477 12.9422 5.41602 13.4915 5.41602 14.192C5.41623 14.8786 5.97946 15.4418 6.66602 15.442H16.4814C16.4665 16.1333 16.2978 16.6532 15.9688 17.0094C15.6119 17.3956 14.958 17.7086 13.7412 17.7086H6.25781C4.90922 17.7086 4.25022 17.3261 3.91699 16.8707C3.56202 16.3855 3.44851 15.6482 3.5625 14.6813L3.56152 14.6803L4.31152 8.43323L4.3125 8.43225C4.41124 7.5994 4.52179 7.05293 4.83301 6.68323C5.11076 6.35345 5.66697 6.04163 7 6.04163Z" stroke="#8A8A8A" strokeWidth="1.25" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className="w-full space-y-6 font-sans text-[#111827] min-h-screen">
            <div>
                <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <Link href="/aggregator/dashboard" className="hover:text-[#111827] transition-colors">
                        Dashboard
                    </Link>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.93994 13.28L10.2866 8.9333C10.7999 8.41997 10.7999 7.57997 10.2866 7.06664L5.93994 2.71997" stroke="#C7C7C7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <span className="font-medium text-[#111827]">Recent Activities</span>
                </nav>
                <h1 className="text-2xl font-bold text-[#111827] mt-3">Recent Activities</h1>
                <p className="text-xs text-[#6B7280] mt-1">
                    Stay updated with the latest actions across your network.
                </p>
            </div>

            <div className="bg-white p-4 rounded-[16px] border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-80">
                    <Input
                        type="text"
                        placeholder="Search business name"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setCurrentPage(1);
                        }}
                        prefixicon={<SearchIcon />}
                        className="text-xs !bg-[#F9FAFB] !border-[#E5E7EB]"
                    />
                </div>
                <div className="w-full sm:w-44">
                    <div className="w-full px-3 relative flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-md">
                        <input
                            type="date"
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                            className="h-[42px] w-full text-xs font-semibold text-[#374151] bg-transparent border-none outline-0"
                        />
                        <CalendarIcon className="w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {groupedCards.length > 0 ? (
                    groupedCards.map((group, groupIdx) => (
                        <div
                            key={groupIdx}
                            className="bg-white p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm"
                        >
                            <div className="divide-y divide-[#F3F4F6]">
                                {group.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getActivityIcon(activity.type)}
                                            <div>
                                                <p className="text-xs font-semibold text-[#131313]">
                                                    {activity.title}
                                                </p>
                                                <p className="text-[11px] text-[#6C6C6C] font-normal mt-0.5">
                                                    {activity.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-[#9CA3AF] font-medium">
                                            {activity.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-12 rounded-[16px] border border-[#E5E7EB] text-center text-xs text-[#9CA3AF]">
                        No activities found matching your criteria.
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#6C6C6C] pt-2">
                <div>
                    Showing {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} Recent Activities
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E7EB] text-[#374151] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                            <path d="M6.53955 13.825L1.10622 8.39167C0.46455 7.75 0.46455 6.7 1.10622 6.05833L6.53955 0.625" stroke="#C7C7C7" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md font-medium text-xs transition-colors ${currentPage === page
                                    ? "bg-[#04907E] text-white"
                                    : "border border-[#E5E7EB] text-[#374151] hover:bg-white"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    {totalPages > 5 && <span className="px-1 text-[#9CA3AF]">...</span>}
                    {totalPages > 4 && (
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md font-medium text-xs transition-colors ${currentPage === totalPages
                                    ? "bg-[#04907E] text-white"
                                    : "border border-[#E5E7EB] text-[#374151] hover:bg-white"
                                }`}
                        >
                            {totalPages}
                        </button>
                    )}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="w-8 h-8 flex items-center justify-center text-[#374151] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.4585 3.4001L12.8918 8.83343C13.5335 9.4751 13.5335 10.5251 12.8918 11.1668L7.4585 16.6001" stroke="#6C6C6C" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}