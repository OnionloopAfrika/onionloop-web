"use client";

import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  error,
  placeholder = "Select options",
  value = [],
  onValueChange,
  options,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    let newValues: string[];

    if (value.includes(optionValue)) {
      newValues = value.filter((v) => v !== optionValue);
    } else {
      newValues = [...value, optionValue];
    }

    onValueChange?.(newValues);
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="w-full flex flex-col gap-[8px]" ref={containerRef}>
      {label && (
        <label className="block font-semibold text-[12px] text-[#131313]">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            flex h-[48px] w-full items-center justify-between rounded-[6px] border border-[#C7C7C7] bg-[#F7F7F7]  
            p-[16px] pr-12 font-semibold text-[14px]
            focus:outline-none 
            disabled:cursor-not-allowed disabled:bg-gray-100
            ${error ? "border-red-500" : ""}
          `}
        >
          <span className={value.length ? "text-[#131313]" : "text-[#8A8A8A]"}>
            {value.length ? selectedLabels.join(", ") : placeholder}
          </span>

          <span className="absolute right-4 text-[#8A8A8A]">
            {" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9336 6.81641H9.74195H5.06695C4.26695 6.81641 3.86695 7.78307 4.43361 8.34974L8.75028 12.6664C9.44195 13.3581 10.5669 13.3581 11.2586 12.6664L12.9003 11.0247L15.5753 8.34974C16.1336 7.78307 15.7336 6.81641 14.9336 6.81641Z"
                fill="#8A8A8A"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-[6px] border border-[#C7C7C7] bg-white py-1 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            {options.map((option) => {
              const isChecked = value.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="flex justify-between items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-100 "
                >
                  <span
                    className={`text-[14px] ${
                      isChecked
                        ? "text-primary-color font-semibold"
                        : "text-[#6C6C6C]"
                    }`}
                  >
                    {option.label}
                  </span>

                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOption(option.value)}
                    className="w-4 h-4 accent-primary-color"
                  />
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
