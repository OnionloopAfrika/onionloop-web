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
            bg: 'bg-[#C2EAD0]',
            text: 'text-[#04802E]',
            badge: 'bg-[#C2EAD0] text-[#04802E]',
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
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between w-full flex-1">
            <div className="flex justify-between items-start">
                <h2 className="text-[20px] font-semibold text-[#111827] leading-none tracking-tight">
                    {value}
                </h2>
                <div className={`p-1 rounded-[8px] flex justify-center items-center ${style.bg} ${style.text}`}>
                    {icon}
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
                <p className="text-[#4B5563] text-[12px] font-normal leading-normal">
                    {label}
                </p>

                <div className={`flex items-center gap-1.5 text-[10px] font-medium ${style.footer}`}>
                    {showTrendIcon && (changePercentage! >= 0 ? (
                        <ArrowUpIcon color="#04802E" className="" />
                    ) : (
                        <ArrowDownIcon color="#CB1A14" className="" />
                    ))}
                    <span className={footerColor === "purple" ? "text-[#363636]" : footerColor === "orange" ? "text-[#DD900D]" : (changePercentage! >= 0 ? "text-[#04802E]" : "text-[#CB1A14]")}>
                        {footerText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;