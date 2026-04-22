"use client";

import { useState } from "react";
import { ProfileHeader } from "../profile-header";
import { FAQ_DATA } from "@/lib/mockdata/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-[40px] p-[24px] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <ProfileHeader
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions"
      />

      <div className="space-y-[16px]">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border-b border-[#E5E5E5] rounded-[8px] pb-[16px] "
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left pb-[12px]"
              >
                <p className="font-semibold text-[14px] text-[#131313]">
                  {item.question}
                </p>

                <svg
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#131313"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen && (
                <p className="mt-[12px] text-[13px] text-[#6C6C6C]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
