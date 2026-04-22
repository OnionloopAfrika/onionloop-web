"use client";

import { useState } from "react";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: Record<string, boolean>;
}

export function Calendar({ value, onChange, events = {} }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(value || today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDateKey = (date: Date) => date.toISOString().split("T")[0];

  const handlePrev = () => setCurrentMonth(new Date(year, month - 1, 1));

  const handleNext = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isSelected = (day: number) => {
    if (!value) return false;

    const selected = new Date(value);

    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    );
  };

  const handleSelect = (day: number) => {
    onChange?.(new Date(year, month, day));
  };

  return (
    <div className="w-full max-w-[360px] rounded-[20px] bg-[#F5F5F5] p-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <p className="text-[18px] font-semibold text-[#131313]">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="flex gap-[12px]">
          <button className="w-[20px] h-[20px]" onClick={handlePrev}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.08398 10.666L11.834 15.3327C12.1673 15.666 12.6673 15.666 13.0007 15.3327C13.334 14.9993 13.334 14.4993 13.0007 14.166L8.91732 9.99935L13.0007 5.83268C13.334 5.49935 13.334 4.99935 13.0007 4.66602C12.834 4.49935 12.6673 4.41602 12.4173 4.41602C12.1673 4.41602 12.0007 4.49935 11.834 4.66602L7.08398 9.33268C6.75065 9.74935 6.75065 10.2493 7.08398 10.666C7.08398 10.5827 7.08398 10.5827 7.08398 10.666Z"
                fill="#121212"
              />
            </svg>
          </button>
          <button className="w-[20px] h-[20px]" onClick={handleNext}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9509 9.40796L8.23425 4.69962C8.15679 4.62152 8.06462 4.55952 7.96307 4.51721C7.86152 4.47491 7.7526 4.45312 7.64259 4.45312C7.53258 4.45312 7.42366 4.47491 7.32211 4.51721C7.22056 4.55952 7.12839 4.62152 7.05092 4.69962C6.89571 4.85576 6.80859 5.06697 6.80859 5.28712C6.80859 5.50728 6.89571 5.71849 7.05092 5.87462L11.1759 10.0413L7.05092 14.1663C6.89571 14.3224 6.80859 14.5336 6.80859 14.7538C6.80859 14.9739 6.89571 15.1852 7.05092 15.3413C7.1281 15.42 7.22014 15.4827 7.3217 15.5256C7.42326 15.5685 7.53233 15.5908 7.64259 15.5913C7.75284 15.5908 7.86191 15.5685 7.96348 15.5256C8.06504 15.4827 8.15708 15.42 8.23425 15.3413L12.9509 10.633C13.0355 10.5549 13.103 10.4602 13.1492 10.3548C13.1954 10.2494 13.2192 10.1355 13.2192 10.0205C13.2192 9.90537 13.1954 9.79153 13.1492 9.68612C13.103 9.5807 13.0355 9.48599 12.9509 9.40796Z"
                fill="#121212"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[14px] mb-[10px]">
        {weekDays.map((day, i) => (
          <span
            key={day}
            className={i === 0 || i === 6 ? "text-red-500" : "text-[#131313]"}
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-[12px] text-center">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);

          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          const selected = isSelected(day);

          const hasEvent = events?.[formatDateKey(date)];

          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`
                  w-[36px] h-[36px] flex items-center justify-center rounded-[10px]
                  text-[14px]
                  ${
                    selected
                      ? "bg-indigo-600 text-white"
                      : isWeekend
                        ? "text-red-500"
                        : "text-[#6C6C6C]"
                  }
                `}
              >
                {day}
              </div>

              {hasEvent && (
                <div className="w-[6px] h-[6px] bg-green-500 rounded-full mt-[4px]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
