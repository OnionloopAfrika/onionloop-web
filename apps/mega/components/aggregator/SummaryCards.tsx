import React from 'react';

interface SummaryProps {
    data: {
        availableBalance: { amount: string; status: string; date: string };
        expectedBalance: { amount: string; percentage: number; targetBalance: string; expectedCommission: string };
        quickBonus: { unlockAmount: string; description: string };
    };
}

export const SummaryCards: React.FC<SummaryProps> = ({ data }) => {
    const { availableBalance, expectedBalance, quickBonus } = data;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Available Balance</span>
                        <span className="px-2 py-0.5 text-[10px] font-medium text-[#04802E] bg-emerald-50 rounded-full border border-emerald-100">
                            {availableBalance.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{availableBalance.amount}</h2>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0411 3.26679C12.8479 3.27372 15.5511 4.92818 17.4155 7.87388C17.7829 8.45406 17.9766 9.23931 17.9746 10.0432C17.9726 10.8474 17.7745 11.6293 17.4048 12.203L17.4048 12.2039C16.5205 13.5837 15.4573 14.6765 14.2864 15.4502L14.0517 15.6C12.7883 16.3712 11.4142 16.778 10.0077 16.7746C7.28828 16.7677 4.66802 15.2218 2.81236 12.4404L2.63432 12.1675C2.26671 11.5872 2.07326 10.8037 2.07522 10.001C2.07695 9.29863 2.22847 8.61192 2.51457 8.06365L2.64501 7.83741C3.58825 6.36555 4.73513 5.22009 5.99911 4.44041L5.99814 4.43943C7.26111 3.66867 8.63508 3.26338 10.0411 3.26679ZM10.0337 6.27459C7.95484 6.26964 6.27956 7.94604 6.27441 10.0153C6.2693 12.0846 7.9363 13.7693 10.0151 13.7746C12.0941 13.7797 13.7693 12.1033 13.7744 10.0338C13.7795 7.96445 12.1126 6.27973 10.0337 6.27459Z" fill="#8A8A8A" stroke="#8A8A8A" stroke-width="0.766667" />
                            <path d="M10.0294 8.02515C11.126 8.02786 12.0271 8.93346 12.0244 10.0301C12.0215 11.1248 11.1177 12.0191 10.0195 12.0163C8.92306 12.0136 8.03078 11.1166 8.03324 10.0202C8.03597 8.9144 8.93364 8.02244 10.0294 8.02515Z" fill="#8A8A8A" stroke="#8A8A8A" stroke-width="0.766667" />
                        </svg>

                    </div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-400 border-t border-gray-50 pt-3">
                    <span>Target Progress</span>
                    <span className="font-medium text-gray-600">{availableBalance.date}</span>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Expected Balance</span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">{expectedBalance.amount}</h2>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="w-10 h-10 transform -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3.5" className="text-gray-100" fill="transparent" />
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeDasharray={100}
                                strokeDashoffset={100 - expectedBalance.percentage}
                                strokeLinecap="round"
                                className="text-[#04802E]"
                                fill="transparent"
                            />
                        </svg>
                        <span className="absolute text-[10px] font-bold text-gray-700">{expectedBalance.percentage}%</span>
                    </div>
                </div>
                <div className="space-y-1.5 text-xs border-t border-gray-50 pt-3 mt-2">
                    <div className="flex justify-between text-gray-500 text-[11px]">
                        <span>Target Balance</span>
                        <span className="font-semibold text-gray-800">{expectedBalance.targetBalance}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                        <span>Expected Commission (Estimated)</span>
                        <span className="font-semibold text-gray-800">{expectedBalance.expectedCommission}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 text-[10px] font-medium text-[#04802E] bg-emerald-50 rounded-full border border-emerald-100">
                            Quick Bonus
                        </span>
                        <span className="text-[11px] font-semibold text-gray-900">Unlock ₦30,000 bonus</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        {quickBonus.description}
                    </p>
                </div>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-4 pt-3 border-t border-gray-50 self-start">
                    <span>Get Started</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.21484 2.96497L10.2498 5.99997L7.21484 9.03497" stroke="#04907E" stroke-width="1.07143" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.75 6L10.165 6" stroke="#04907E" stroke-width="1.07143" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};