import React from "react";

interface ProductData {
    id: number;
    name: string;
    weight: string;
    unitsSold: number;
    totalRevenue: number;
}

interface StaffData {
    id: number;
    name: string;
    role: string;
    avatar: string;
    status: "Online" | "Offline";
    lastSeen: string;
}

function getRelativeTime(isoString: string): string {
    const now = new Date();
    const past = new Date(isoString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = now.getTime() - past.getTime();

    if (elapsed < msPerMinute) {
        return "just now";
    } else if (elapsed < msPerHour) {
        const mins = Math.round(elapsed / msPerMinute);
        return `${mins}m ago`;
    } else if (elapsed < msPerDay) {
        const hours = Math.round(elapsed / msPerHour);
        return `${hours}hrs`;
    } else {
        const days = Math.round(elapsed / msPerDay);
        return `${days}days ago`;
    }
}

export default function DashboardActivityGrid() {
    const products: ProductData[] = [
        { id: 1, name: "Organic Tomatoes", weight: "1kg", unitsSold: 1500, totalRevenue: 312000 },
        { id: 2, name: "Organic Tomatoes", weight: "1kg", unitsSold: 1200, totalRevenue: 312000 },
        { id: 3, name: "Organic Tomatoes", weight: "1kg", unitsSold: 950, totalRevenue: 312000 },
        { id: 4, name: "Organic Tomatoes", weight: "1kg", unitsSold: 600, totalRevenue: 312000 },
        { id: 5, name: "Organic Tomatoes", weight: "1kg", unitsSold: 350, totalRevenue: 312000 },
    ];

    const staffMembers: StaffData[] = [
        { id: 1, name: "Titi Folarin", role: "Cashier", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", status: "Online", lastSeen: new Date().toISOString() },
        { id: 2, name: "Mary Olanrewaju", role: "Manager", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", status: "Online", lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
        { id: 3, name: "David Anigbogu", role: "Head of Staff", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", status: "Offline", lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { id: 4, name: "Samuel Saidu", role: "Attendant", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80", status: "Online", lastSeen: new Date().toISOString() },
        { id: 5, name: "Kemi Saidu", role: "Senior Manager", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80", status: "Online", lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    ];

    const maxUnitsSold = Math.max(...products.map((item) => item.unitsSold), 1);

    return (
        <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6 bg-[#f9fafb]">
            <div className="flex-1 rounded-xl border border-gray-100 bg-background p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-[#131313] md:text-[20px]">Top 5 Selling Products</h2>
                    <div className="relative">
                        <select className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-[14px] font-medium text-gray-600 outline-none focus:border-primary-color">
                            <option>This week</option>
                        </select>
                        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-[22px]">
                    {products.map((product, index) => {
                        const progressPercentage = (product.unitsSold / maxUnitsSold) * 100;

                        return (
                            <div key={product.id} className="flex flex-col gap-2 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
                                <div className="flex items-center gap-2 min-w-[180px]">
                                    <span className="text-[14px] font-medium text-gray-400">#{index + 1}</span>
                                    <p className="text-[14px] font-semibold text-[#131313] md:text-[15px]">
                                        {product.name} <span className="text-gray-400 font-normal">({product.weight})</span>
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center gap-4 w-full">
                                    <div className="h-2 w-full rounded-full bg-[#e7f6ec]">
                                        <div
                                            className="h-full rounded-full bg-light"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                    <span className="text-[14px] font-bold text-[#131313] min-w-[70px] text-right">
                                        ₦{product.totalRevenue.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex-1 rounded-xl border border-gray-100 bg-background p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-[#131313] md:text-[20px]">Staff Activity</h2>
                    <button className="text-[14px] font-bold text-primary-color hover:underline">
                        Manage Activities
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {staffMembers.map((staff) => {
                        const relativeTime = getRelativeTime(staff.lastSeen);
                        const showTimeText = relativeTime !== "just now";

                        return (
                            <div key={staff.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={staff.avatar}
                                        alt={staff.name}
                                        className="h-10 w-10 rounded-full object-cover border border-gray-50"
                                    />
                                    <div>
                                        <h3 className="text-[14px] font-bold text-[#131313] md:text-[15px]">{staff.name}</h3>
                                        <p className="text-[13px] font-normal text-gray-400">{staff.role}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    {staff.status === "Online" ? (
                                        <p className="flex items-center justify-end gap-1.5 text-[13px] font-semibold text-light">
                                            <span className="h-1.5 w-1.5 rounded-full bg-light" />
                                            {showTimeText ? <span className="text-gray-400 font-normal">Online • </span> : "Online"}
                                            {showTimeText && relativeTime}
                                        </p>
                                    ) : (
                                        <p className="flex items-center justify-end gap-1.5 text-[13px] font-semibold text-danger">
                                            Offline • {relativeTime}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}