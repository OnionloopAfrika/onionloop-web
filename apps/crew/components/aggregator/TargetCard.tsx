import React from 'react';

interface TargetCardProps {
    title: string;
    currentFormatted: string;
    targetFormatted: string;
    status: 'On track' | 'Behind track';
    progress: number;
    needText: string;
    currentRateText?: string;
    additionalText?: string;
}

export const TargetCard: React.FC<TargetCardProps> = ({
    title,
    currentFormatted,
    targetFormatted,
    status,
    progress,
    needText,
    currentRateText,
    additionalText,
}) => {
    const isOnTrack = status === 'On track';

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xs font-semibold text-gray-800 tracking-tight">{title}</h3>
                <div className="flex items-baseline justify-between mt-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">{currentFormatted}</span>
                        <span className="text-xs text-gray-400 font-medium">{targetFormatted}</span>
                    </div>
                    <span
                        className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${isOnTrack
                            ? 'bg-[#E7F6EC] text-[#108476] border-emerald-100'
                            : 'bg-[#FBEAE9] text-[#CB1A14] border-[#FBEAE9]'
                            }`}
                    >
                        {status}
                    </span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-gray-700">{progress}%</span>
                    </div>
                    <div className={`w-full ${isOnTrack ? 'bg-[#E7F6EC]' : 'bg-[#FBEAE9]'} h-1.5 rounded-full overflow-hidden`}>
                        <div
                            className={`h-full rounded-full ${isOnTrack ? 'bg-[#108476]' : 'bg-[#CB1A14]'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-50 pt-3">
                {currentRateText ? (
                    <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-500">{needText}</span>
                        <span className="text-gray-700 font-medium">{currentRateText}</span>
                    </div>
                ) : (
                    <div className="space-y-1 text-[11px]">
                        <p className="text-gray-500">{needText}</p>
                        {additionalText && (
                            <p className="text-gray-800 font-semibold">
                                Additional <span className="text-gray-900">{additionalText.replace('Additional ', '')}</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};