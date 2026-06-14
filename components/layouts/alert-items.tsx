import React from 'react';

export interface AlertItem {
    id: string | number;
    type: 'danger' | 'info' | 'warning';
    title: string;
    subtitle: string;
    timestamp: string;
}

interface AlertsProps {
    alerts?: AlertItem[];
    onViewAll?: () => void;
}

export const mockAlerts: AlertItem[] = [
    {
        id: 1,
        type: 'danger',
        title: '25 failed transactions in the last 1 hr',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
    {
        id: 2,
        type: 'info',
        title: 'System update scheduled',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
    {
        id: 3,
        type: 'info',
        title: 'System update scheduled',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
    {
        id: 4,
        type: 'danger',
        title: '25 failed transactions in the last 1 hr',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
    {
        id: 5,
        type: 'warning',
        title: '3 Locations have no transactions today',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
    {
        id: 6,
        type: 'warning',
        title: '3 Locations have no transactions today',
        subtitle: 'Victoria Island branch',
        timestamp: '10 mins ago',
    },
];

const config = {
    danger: {
        bg: 'bg-[#FDF2F2]',
        stroke: '#CB1A14',
    },
    info: {
        bg: 'bg-[#EBF5FF]',
        stroke: '#2563EB',
    },
    warning: {
        bg: 'bg-[#FEF9C3]',
        stroke: '#D97706',
    },
};

export default function Alerts({ alerts = mockAlerts, onViewAll }: AlertsProps) {
    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">Alerts</h2>
                <button
                    onClick={onViewAll}
                    className="text-base font-semibold text-[#064E3B] hover:opacity-80 transition-opacity"
                >
                    View All
                </button>
            </div>

            <div className="flex flex-col">
                {alerts.map((alert, index) => {
                    const style = config[alert.type] || config.info;

                    return (
                        <div key={alert.id}>
                            <div className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0`}>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.0206 2.91016C8.71058 2.91016 6.02058 5.60016 6.02058 8.91016V11.8002C6.02058 12.4102 5.76058 13.3402 5.45058 13.8602L4.30058 15.7702C3.59058 16.9502 4.08058 18.2602 5.38058 18.7002C9.69058 20.1402 14.3406 20.1402 18.6506 18.7002C19.8606 18.3002 20.3906 16.8702 19.7306 15.7702L18.5806 13.8602C18.2806 13.3402 18.0206 12.4102 18.0206 11.8002V8.91016C18.0206 5.61016 15.3206 2.91016 12.0206 2.91016Z"
                                                stroke={style.stroke}
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M13.8699 3.20043C13.5599 3.11043 13.2399 3.04043 12.9099 3.00043C11.9499 2.88043 11.0299 2.95043 10.1699 3.20043C10.4599 2.46043 11.1799 1.94043 12.0199 1.94043C12.8599 1.94043 13.5799 2.46043 13.8699 3.20043Z"
                                                stroke={style.stroke}
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M15.0195 19.0596C15.0195 20.7096 13.6695 22.0596 12.0195 22.0596C11.1995 22.0596 10.4395 21.7196 9.89953 21.1796C9.35953 20.6396 9.01953 19.8796 9.01953 19.0596"
                                                stroke={style.stroke}
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                            />
                                        </svg>
                                    </div>

                                    <div className="flex flex-col min-w-0 gap-1">
                                        <span className="text-[16px] font-medium text-gray-900 truncate tracking-tight">
                                            {alert.title}
                                        </span>
                                        <span className="text-[14px] font-normal text-gray-400 truncate">
                                            {alert.subtitle}
                                        </span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-normal text-gray-400 ml-4 flex-shrink-0">
                                    {alert.timestamp}
                                </span>
                            </div>
                            {index < alerts.length - 1 && (
                                <hr className="border-gray-100" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}