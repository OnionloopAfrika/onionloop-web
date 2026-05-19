import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from '../icons/svgs';

interface StatCardProps {
    icon: React.ReactNode;
    percentage?: string;
    value: string;
    label: string;
    footerText: string;
    themeColor: 'green' | 'blue' | 'purple' | 'orange' | 'red';
    showTrendIcon?: boolean;
    changePercentage?: number
    footerColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    percentage,
    value,
    label,
    footerText,
    themeColor,
    showTrendIcon = false,
    changePercentage,
    footerColor
}) => {
    const themes = {
        green: {
            bg: 'bg-[#B5E3C4]',
            text: 'text-[#04802E]',
            badge: 'bg-[#B5E3C4] text-[#04802E]',
            footer: 'text-[#04802E]',
        },
        blue: {
            bg: 'bg-[#C6DDF7]',
            text: 'text-[#0D5EBA]',
            badge: 'bg-[#C6DDF7] text-[#0D5EBA]',
            footer: 'text-[#04802E]',
        },
        purple: {
            bg: 'bg-[#CFC2F7]',
            text: 'text-[#7C53FC]',
            badge: 'bg-[#CFC2F7] text-[#7C53FC]',
            footer: 'text-[#6C6C6C]',
        },
        orange: {
            bg: 'bg-[#FBE2B7]',
            text: 'text-[#DD900D]',
            badge: 'bg-[#FBE2B7] text-[#DD900D]',
            footer: 'text-[#DD900D]',
        },
        red: {
            bg: 'bg-[#F2BCBA]',
            text: 'text-[#CB1A14]',
            badge: 'bg-[#F2BCBA] text-[#CB1A14]',
            footer: 'text-[#CB1A14]',
        },
    };

    const style = themes[themeColor];

    return (
        <div className="bg-white border border-gray-100 rounded-2xl md:p-5 p-4 shadow-sm flex flex-col gap-4 w-full flex-1">
            <div className="flex justify-between items-start">
                <div className={`md:p-[8px] p-1 rounded-lg ${style.bg} ${style.text}`}>
                    {icon}
                </div>
                {percentage && (
                    <span className={`md:text-[10px] text-[8px] font-medium px-2 py-1 rounded-full ${style.badge}`}>
                        +{percentage}%
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="md:text-[28px] text-[16px] font-semibold text-gray-900 leading-tight">
                    {value}
                </h2>
                <p className="text-[#6C6C6C] md:text-[14px] text-[12px] font-normal">
                    {label}
                </p>
            </div>

            <div className={`flex items-center gap-1 text-[10px] font-normal ${style.footer}`}>
                {showTrendIcon && (changePercentage! >= 0 ? <ArrowUpIcon color="#04802E" className='' /> : <ArrowDownIcon color="#CB1A14" className=''/> )}
                <span className={footerColor === "purple" ? "text-[#363636]" : footerColor === "orange" ? "text-[#DD900D]" : (changePercentage! >= 0 ? "text-[#04802E]" : "text-[#CB1A14]")}>{footerText}</span>
            </div>
        </div>
    );
};

export default StatCard;