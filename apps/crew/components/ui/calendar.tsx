"use client";

import { useState } from "react";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: Record<string, boolean>;
}

function CalendarArrow({
  direction,
  double = false,
}: {
  direction: "previous" | "next";
  double?: boolean;
}) {
  const isPrevious = direction === "previous";
  const path = isPrevious
    ? double
      ? "M10.5 3.5 6 8l4.5 4.5M6 3.5 1.5 8 6 12.5"
      : "M9.5 3.5 5 8l4.5 4.5"
    : double
      ? "M3.5 3.5 8 8l-4.5 4.5M8 3.5 12.5 8 8 12.5"
      : "M4.5 3.5 9 8l-4.5 4.5";

  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 16"
      fill="none"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
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

  const handlePrevYear = () => setCurrentMonth(new Date(year - 1, month, 1));

  const handleNextYear = () => setCurrentMonth(new Date(year + 1, month, 1));

  const isSelected = (day: number) => {
    const selected = value ? new Date(value) : today;

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
    <div className="w-full max-w-[345px] min-h-[295px] rounded-[8px] border border-[#E5E7EB] bg-white p-[20px]">
      <div className="mb-[12px] flex items-center justify-center gap-[10px] border-b border-[#F1F1F1] pb-[12px]">
        <button
          type="button"
          aria-label="Previous year"
          onClick={handlePrevYear}
          className="grid size-[18px] place-items-center rounded-[4px] border border-[#E5E7EB] text-[#8A8A8A] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005B50]"
        >
          <CalendarArrow direction="previous" double />
        </button>
        <button
          type="button"
          aria-label="Previous month"
          onClick={handlePrev}
          className="grid size-[18px] place-items-center rounded-[4px] border border-[#E5E7EB] text-[#8A8A8A] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005B50]"
        >
          <CalendarArrow direction="previous" />
        </button>
        <p className="min-w-[88px] text-center text-[10px] font-semibold text-[#363636]">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={handleNext}
          className="grid size-[18px] place-items-center rounded-[4px] border border-[#E5E7EB] text-[#8A8A8A] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005B50]"
        >
          <CalendarArrow direction="next" />
        </button>
        <button
          type="button"
          aria-label="Next year"
          onClick={handleNextYear}
          className="grid size-[18px] place-items-center rounded-[4px] border border-[#E5E7EB] text-[#8A8A8A] hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005B50]"
        >
          <CalendarArrow direction="next" double />
        </button>
      </div>

      <div className="mb-[8px] grid grid-cols-7 text-center text-[12px]">
        {weekDays.map((day, i) => (
          <span
            key={day}
            className={
              i === 0 || i === 6
                ? "text-[#CB1A14] font-[400] text-[12px]"
                : "text-[#131313] font-[400] text-[12px]"
            }
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-[4px] text-center">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
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
              type="button"
              aria-pressed={selected}
              aria-label={date.toLocaleDateString()}
              onClick={() => handleSelect(day)}
              className="relative flex h-[32px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#005B50]"
            >
              <div
                className={`
                  flex h-[32px] w-[30px] font-[400] items-center justify-center rounded-[8px]
                  text-[12px]
                  ${
                    selected
                      ? "w-[44px] bg-[#024E44] text-white"
                      : isWeekend
                        ? "text-[#F04438]"
                        : "text-[#8A8A8A]"
                  }
                `}
              >
                {day}
              </div>

              {hasEvent && (
                <span className="absolute bottom-[1px] h-[4px] w-[4px] rounded-full bg-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
