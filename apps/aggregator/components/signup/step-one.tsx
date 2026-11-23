"use client";

import React, { useState } from "react";
import { NewAgent, NewMerchant, NewUser, SelectedIcon } from "../icons/svgs";
import Button from "../ui/button";

export default function StepOne() {
  const [selectedUserType, setSelectedUserType] = useState<number | null>(null);
  const userType = [
    {
      icon: NewMerchant,
      title: "New Merchant",
    },

    {
      icon: NewAgent,
      title: "New Agent",
    },

    {
      icon: NewUser,
      title: "New User",
    },
  ];

  return (
    <div className="w-full max-w-[600px]  max-lg:px-[20px] p-[40px] mx-auto bg-white rounded-[20px] space-y-[42px]">
      <div className="space-y-[8px]">
        <StepTitle title="Onboard New User" />
        <StepSubTitle text="Select the appropriate user for onboarding" />
      </div>

      <div className="space-y-[16px]">
        {userType.map((item, i) => {
          const isSelected = selectedUserType === i;

          return (
            <button
              key={item.title}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedUserType(i)}
              className={`w-full rounded-[6px] border h-[48px] ${
                isSelected ? "border-[#04907E]" : "border-[#C7C7C7]"
              } bg-[#F7F7F7] flex justify-between items-center py-[17px] px-[16px]`}
            >
              <div className="flex items-center gap-[8px]">
                <div
                  className={`flex justify-center items-center h-[32px] w-[32px] rounded-[6px]   ${isSelected ? "bg-[#04907E]" : "bg-[#EEEEEE]"}   `}
                >
                  <item.icon color={isSelected ? "#FFFFFF" : "#292D32"} />
                </div>

                <p className="font-[500] text-[14px] text-[#363636]">
                  {item.title}
                </p>
              </div>

              {isSelected && <SelectedIcon color="#04907E" />}
            </button>
          );
        })}
      </div>

      <Button children="Continue" />
    </div>
  );
}

type StepTitleProp = {
  title: string;
};

export const StepTitle = ({ title }: StepTitleProp) => {
  return (
    <p className="font-[700] text-[20px] text-[#04907E] text-center">
      {" "}
      {title}{" "}
    </p>
  );
};

type StepSubTitleProp = {
  text: string;
};

export const StepSubTitle = ({ text }: StepSubTitleProp) => {
  return (
    <p className="font-[500] text-[16px] text-[#363636] text-center">
      {" "}
      {text}{" "}
    </p>
  );
};
