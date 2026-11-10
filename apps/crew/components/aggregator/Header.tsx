import React from 'react';
import { CalendarIcon } from '../icons/svgs';

interface HeaderProps {
    title: string;
    subtitle: string;
    date: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, date }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            </div>
            <button className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 self-start md:self-auto">
                <CalendarIcon />
                <span>{date}</span>
            </button>
        </div>
    );
};