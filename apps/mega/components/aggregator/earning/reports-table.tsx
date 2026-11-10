"use client";

import { CalendarIcon, SearchIcon } from "@/components/icons/svgs";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export interface TransactionItem {
    id: string;
    businessName: string;
    avatar: string;
    txnType: "Transfer" | "QR Payment" | "Airtime";
    amount: string;
    earnings: string;
    status: "Successful" | "Pending";
    txnDate: string;
    perfScore: number;
}

export interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    time: string;
    type: "onboarded" | "activated" | "dormant";
}

export interface TopBusinessItem {
    rank: number;
    name: string;
    type: "Agent" | "Merchant";
    amount: string;
    transactions: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
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
];

const MOCK_TOP_BUSINESSES: TopBusinessItem[] = [
    { rank: 1, name: "Chukwu global Limited", type: "Agent", amount: "₦2,500,000.00", transactions: "360 Transactions" },
    { rank: 2, name: "Swift Logistics", type: "Merchant", amount: "₦1,000,000.00", transactions: "200 Transactions" },
    { rank: 3, name: "De-Light SuperStores", type: "Merchant", amount: "₦900,000.00", transactions: "198 Transactions" },
    { rank: 4, name: "KFC Holdings", type: "Merchant", amount: "₦600,000.00", transactions: "184 Transactions" },
    { rank: 5, name: "Victoria Plaza", type: "Agent", amount: "₦500,000.00", transactions: "150 Transactions" },
];

const MOCK_TRANSACTIONS: TransactionItem[] = [
    {
        id: "1",
        businessName: "De-Light SuperStores",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        txnType: "Transfer",
        amount: "₦250,000.00",
        earnings: "₦250.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "2",
        businessName: "KFC Holdings",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        txnType: "QR Payment",
        amount: "₦120,000.00",
        earnings: "₦120.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "3",
        businessName: "Proens Stores",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        txnType: "QR Payment",
        amount: "₦120,000.00",
        earnings: "₦120.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "4",
        businessName: "God’s Owned Business",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
        txnType: "QR Payment",
        amount: "₦50,000.00",
        earnings: "₦50.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "5",
        businessName: "Swift Logistics",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        txnType: "Transfer",
        amount: "₦300,000.00",
        earnings: "₦300.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "6",
        businessName: "Emeka & co.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        txnType: "Transfer",
        amount: "₦300,000.00",
        earnings: "₦300.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "7",
        businessName: "Big Bites Restaurants",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        txnType: "Transfer",
        amount: "₦300,000.00",
        earnings: "₦300.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 91,
    },
    {
        id: "8",
        businessName: "Grace Beauty Hub",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        txnType: "Airtime",
        amount: "₦300,000.00",
        earnings: "₦300.00",
        status: "Successful",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 58,
    },
    {
        id: "9",
        businessName: "Mains Cosmetics",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        txnType: "Transfer",
        amount: "₦300,000.00",
        earnings: "₦300.00",
        status: "Pending",
        txnDate: "May 19,2026 at 09:15am",
        perfScore: 58,
    },
];

const statusOptions = [
    { value: "all", label: "Status: All" },
    { value: "Successful", label: "Status: Successful" },
    { value: "Pending", label: "Status: Pending" },
];

const businessTypeOptions = [
    { value: "all", label: "All Businesses" },
    { value: "Agent", label: "Agents Only" },
    { value: "Merchant", label: "Merchants Only" },
];

const timeframeOptions = [
    { value: "this-week", label: "This week" },
    { value: "this-month", label: "This month" },
    { value: "all-time", label: "All time" },
];

export const DashboardOverview: React.FC = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Successful");
    const [selectedBusiness, setSelectedBusiness] = useState("all");
    const [timeframe, setTimeframe] = useState("this-week");
    const [dateValue, setDateValue] = useState("08-06-2026");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredTransactions = useMemo(() => {
        return MOCK_TRANSACTIONS.filter((item) => {
            const matchesSearch =
                item.businessName.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.txnType.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.amount.toLowerCase().includes(searchValue.toLowerCase());

            const matchesStatus =
                selectedStatus === "all" || item.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [searchValue, selectedStatus]);

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTransactions, currentPage, itemsPerPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (val: string) => {
        setSelectedStatus(val);
        setCurrentPage(1);
    };

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

    const getTxnTypeBadge = (type: TransactionItem["txnType"]) => {
        switch (type) {
            case "Transfer":
                return (
                    <span className="text-[11px] font-semibold text-[#0D5EBA] bg-[#C6DDF7] px-3 py-1 rounded-full">
                        Transfer
                    </span>
                );
            case "QR Payment":
                return (
                    <span className="text-[11px] font-semibold text-[#0D5EBA] bg-[#C6DDF7] px-3 py-1 rounded-full">
                        QR Payment
                    </span>
                );
            case "Airtime":
                return (
                    <span className="text-[11px] font-semibold text-[#0D5EBA] bg-[#C6DDF7] px-3 py-1 rounded-full">
                        Airtime
                    </span>
                );
        }
    };

    return (
        <div className="w-full space-y-6 font-sans text-[#111827]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-semibold text-[#111827]">Transaction Target Volume</h3>
                        <div className="flex items-baseline justify-between mt-3">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-[#111827]">₦3.2M</span>
                                <span className="text-xs font-semibold text-[#6B7280]">/ ₦5M target</span>
                            </div>
                            <span className="text-[10px] font-semibold text-[#04802E] bg-[#E7F6EC] px-2.5 py-0.5 rounded-full ">
                                On track
                            </span>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center text-[10px] text-[#6B7280] mb-1.5">
                                <span>Progress</span>
                                <span className="font-bold text-[#111827]">78%</span>
                            </div>
                            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0D9488] h-full rounded-full" style={{ width: "78%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#F3F4F6] flex items-center gap-1.5 text-xs text-[#6C6C6C] font-medium">
                        <span>Need ₦874k/day</span>
                        <span>•</span>
                        <span>Current: ₦624k/day</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-semibold text-[#111827]">Onboarding Target Volume</h3>
                        <div className="flex items-baseline justify-between mt-3">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-[#111827]">30</span>
                                <span className="text-xs font-semibold text-[#6B7280]">/ 50 agents, merchants, users</span>
                            </div>
                            <span className="text-[10px] font-semibold text-[#04802E] bg-[#E7F6EC] px-2.5 py-0.5 rounded-full">
                                On track
                            </span>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center text-[10px] text-[#6B7280] mb-1.5">
                                <span>Progress</span>
                                <span className="font-bold text-[#111827]">68%</span>
                            </div>
                            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0D9488] h-full rounded-full" style={{ width: "68%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#F3F4F6] flex items-center gap-1.5 text-xs text-[#6C6C6C] font-medium">
                        <span>Need 5/day</span>
                        <span>•</span>
                        <span>Current: 2/day</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#111827]">Recent Activities</h3>
                        <button className="text-xs font-bold text-[#024E44] hover:underline" onClick={() => router.push("/aggregator/dashboard/activities")}>
                            View All
                        </button>
                    </div>

                    <div className="divide-y divide-[#F3F4F6]">
                        {MOCK_ACTIVITIES.map((activity) => (
                            <div key={activity.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    {getActivityIcon(activity.type)}
                                    <div>
                                        <p className="text-xs font-semibold text-[#131313]">{activity.title}</p>
                                        <p className="text-[11px] text-[#6C6C6C] font-normal mt-0.5">{activity.subtitle}</p>
                                    </div>
                                </div>
                                <span className="text-[11px] text-[#9CA3AF] font-medium">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-[16px] border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-[#111827]">TOP Performing Businesses</h3>
                            <div className="w-32">
                                <Select
                                    options={timeframeOptions}
                                    value={timeframe}
                                    onValueChange={setTimeframe}
                                    placeholder="This week"
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-[#F3F4F6]">
                            {MOCK_TOP_BUSINESSES.map((biz) => (
                                <div key={biz.rank} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-[#6C6C6C] w-4">#{biz.rank}</span>
                                        <div>
                                            <p className="text-xs font-semibold text-[#131313]">{biz.name}</p>
                                            <p className="text-[11px] text-[#6C6C6C] font-normal mt-0.5">{biz.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[#04802E]">{biz.amount}</p>
                                        <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">{biz.transactions}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#F3F4F6] flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full sm:flex-1">
                        <Input
                            type="text"
                            placeholder="Search TXN ID, customer name, type, Amount"
                            value={searchValue}
                            onChange={handleSearchChange}
                            prefixicon={<SearchIcon />}
                            className="text-xs !bg-[#F9FAFB] !border-[#E5E7EB]"
                        />
                    </div>
                    <div className="w-full sm:w-44">
                        <Select
                            options={statusOptions}
                            value={selectedStatus}
                            onValueChange={handleStatusChange}
                            placeholder="Status: Successful"
                        />
                    </div>
                    <div className="w-full sm:w-100 flex items-center gap-2">
                        <div className="w-full sm:w-40">
                            <Select
                                options={businessTypeOptions}
                                value={selectedBusiness}
                                onValueChange={setSelectedBusiness}
                                placeholder="All Businesses"
                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <div className="w-full px-2 relative flex items-center justify-start bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none">
                                <input
                                    type="date"
                                    value={dateValue}
                                    onChange={(e) => setDateValue(e.target.value)}
                                    className="h-[46px] px-4 text-xs font-semibold text-[#374151] border-none outline-0"
                                />
                                <CalendarIcon className="w-4 h-4 text-[#9CA3AF]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[960px] text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F9FAFB] border-b border-[#F3F4F6] text-[12px] font-semibold text-[#6C6C6C]">
                                <th className="py-3.5 px-6 whitespace-nowrap"></th>
                                <th className="py-3.5 px-6 whitespace-nowrap">Business Name</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">TXN Type</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">Amount</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">Earnings</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">Status</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">TXN Date</th>
                                <th className="py-3.5 px-6 whitespace-nowrap">Perf. Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6] text-xs font-medium text-[#374151]">
                            {paginatedTransactions.length > 0 ? (
                                paginatedTransactions.map((item) => {
                                    const isHighPerf = item.perfScore >= 70;
                                    return (
                                        <tr key={item.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center gap-3 w-10">
                                                    <img
                                                        src={item.avatar}
                                                        alt={item.businessName}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 whitespace-nowrap">{item.businessName}</td>
                                            <td className="py-4 px-6 whitespace-nowrap">{getTxnTypeBadge(item.txnType)}</td>

                                            <td className="py-4 px-6 text-[#6C6C6C] font-normal whitespace-nowrap">{item.amount}</td>

                                            <td className="py-4 px-6 text-[#6C6C6C] font-normal whitespace-nowrap">{item.earnings}</td>

                                            <td className="py-4 px-6 whitespace-nowrap">
                                                {item.status === "Successful" ? (
                                                    <span className="inline-flex items-center text-[11px] font-medium text-[#04802E] bg-[#E7F6EC] px-3 py-1 rounded-full">
                                                        Successful
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center text-[11px] font-medium text-[#DD900D] bg-[#FBE2B7] px-3 py-1 rounded-full">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{item.txnDate}</td>

                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${isHighPerf ? "bg-[#04802E]" : "bg-[#DC2626]"
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
                                    <td colSpan={8} className="py-12 text-center text-[#9CA3AF] text-xs">
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length > itemsPerPage && (
                    <div className="p-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#6C6C6C]">
                        <div>
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
                                    <path d="M6.54004 13.825L1.10671 8.39167C0.465038 7.75 0.465038 6.7 1.10671 6.05833L6.54004 0.625" stroke="#C7C7C7" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1.5 rounded font-medium text-xs transition-colors ${currentPage === page
                                        ? "bg-[#04907E] text-white"
                                            : "border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.45801 3.39998L12.8913 8.83331C13.533 9.47498 13.533 10.525 12.8913 11.1666L7.45801 16.6" stroke="#6C6C6C" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardOverview;