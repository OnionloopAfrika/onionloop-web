import React from "react";
import Badge from "@/components/ui/badge";
import { DotIcon } from "../icons/svgs";

interface TargetCardProps {
  title: string;
  currentFormatted: string;
  targetFormatted: string;
  status: "On track" | "Behind track";
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
  const isOnTrack = status === "On track";

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-[16px] font-semibold text-[#131313] tracking-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-[16px]">
          <div className="flex items-center gap-[16px]">
            <span className="text-2xl font-bold text-gray-900">
              {currentFormatted}
            </span>
            <span className="text-xs text-[#6C6C6C] font-medium">
              {targetFormatted}
            </span>
          </div>
          <Badge variant={isOnTrack ? "on_track" : "behind_track"}>
            {status}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
            <span className="font-[400] text-[12px] text-[#6C6C6C]">
              Progress
            </span>
            <span className="font-bold text-gray-700">{progress}%</span>
          </div>
          <div
            className={`w-full ${isOnTrack ? "bg-[#E7F6EC]" : "bg-[#FBEAE9]"} h-1.5 rounded-full overflow-hidden`}
          >
            <div
              className={`h-full rounded-full ${isOnTrack ? "bg-[#108476]" : "bg-[#CB1A14]"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-[16px]  pt-3 flex items-center  ">
        {currentRateText ? (
          <div className="flex  items-center text-[11px]  gap-[20px]">
            <span className="font-[400] text-[14px] text-[#6C6C6C]">
              {needText}
            </span>
            <DotIcon className="w-[4px] h-[4px]" />
            <span className="font-[400] text-[14px] text-[#6C6C6C]">
              {currentRateText}
            </span>
          </div>
        ) : (
          <div className="space-y-1 text-[11px]">
            <p className="font-[400] text-[14px] text-[#6C6C6C]">{needText}</p>
            {additionalText && (
              <p className="text-gray-800 font-semibold">
                Additional{" "}
                <span className="text-gray-900">
                  {additionalText.replace("Additional ", "")}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
