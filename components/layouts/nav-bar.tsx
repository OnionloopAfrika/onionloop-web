"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ProfileDropdown from "./profile-dropdown";
import { OverviewIcon, TransactionIcon, InventoryIcon, StaffIcon, OnionloopIcon, MessageIcon, NotificationIcon, ChevronDownIcon } from "../icons/svgs";

const ACTIVE_COLOR = "#04907E";

type NavItem = {
    key: string;
    label: string;
    icon: (color?: string) => React.ReactNode;
    href?: string;
};

const NAV_ITEMS: NavItem[] = [
    { key: "overview", href: "/overview", label: "Overview", icon: (color) => <OverviewIcon color={color} /> },
    { key: "transactions", href: "/transactions", label: "Transactions", icon: (color) => <TransactionIcon color={color} /> },
    { key: "inventory", href: "/inventory", label: "Inventory", icon: (color) => <InventoryIcon color={color} /> },
    { key: "staffs", href: "/staffs", label: "Staffs", icon: (color) => <StaffIcon color={color} /> },
];

interface DashboardNavProps {
    businessName?: string;
    userName?: string;
    avatarUrl?: string;
    messageCount?: number;
    notificationCount?: number;
    activeKey: string
}

export default function DashboardNav({
    businessName = "Yetty Mama Lounge",
    userName = "Margaret Adekola",
    avatarUrl,
    messageCount = 1,
    notificationCount = 4,
}: DashboardNavProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const active = NAV_ITEMS.find(i => pathname.startsWith(i.href!))?.key ?? "overview";

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sticky top-0 z-50">
            <div className="flex items-center h-18 px-7 max-w-360 mx-auto justify-between">
                <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
                    <OnionloopIcon />
                </Link>

                <div className="flex items-center justify-center gap-1 flex-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = active === item.key;
                        return (
                            <button
                                key={item.key}
                                onClick={() => router.push(item.href!)}
                                className={[
                                    "relative flex items-center px-4 py-3 gap-2",
                                    "border-b-2 bg-transparent cursor-pointer",
                                    "text-[14.5px] whitespace-nowrap transition-all duration-150",
                                    isActive
                                        ? "text-[#04907E] font-bold border-b-[#04907E]"
                                        : "text-gray-500 font-normal border-b-transparent hover:text-gray-700",
                                ].join(" ")}
                            >
                                {item.icon(isActive ? ACTIVE_COLOR : undefined)}
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <IconButton badge={messageCount}>
                        <MessageIcon />
                    </IconButton>

                    <IconButton badge={notificationCount}>
                        <NotificationIcon />
                    </IconButton>

                    <div
                        className="relative h-full flex items-center"
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => setIsProfileOpen(false)}
                    >
                        <div className="flex items-center gap-2.5 ml-2 pl-1.5 pr-2.5 py-1.5 rounded-full border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors duration-150">
                            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#d6f0e6] flex items-center justify-center">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={userName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-[13px] font-bold text-[#04907E]">
                                        {businessName.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-[1px]">
                                <span className="text-[13px] font-bold text-gray-900 leading-tight whitespace-nowrap">
                                    {businessName}
                                </span>
                                <span className="text-[11.5px] text-gray-400 leading-tight whitespace-nowrap">
                                    {userName}
                                </span>
                            </div>

                            <ChevronDownIcon />
                        </div>

                        {isProfileOpen && (
                            <ProfileDropdown
                                businessName={businessName}
                                userName={userName}
                                avatarUrl={avatarUrl}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function IconButton({
    children,
    badge,
}: {
    children: React.ReactNode;
    badge?: number;
}) {
    return (
        <button className="relative flex items-center justify-center w-9.5 h-9.5 rounded-full border border-gray-200 bg-white cursor-pointer shrink-0 hover:border-gray-300 transition-colors duration-150">
            {children}
            {badge !== undefined && badge > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4 h-4 rounded-full bg-red-500 text-white text-[9.5px] font-bold flex items-center justify-center px-[3px] leading-none">
                    {badge}
                </span>
            )}
        </button>
    );
}