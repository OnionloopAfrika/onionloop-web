"use client";

import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  placeholder = "Select an option",
  value,
  onValueChange,
  options,
  disabled = false,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setSelectedLabel(selectedOption?.label || "");
  }, [value, options]);

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

  const handleSelect = (optionValue: string, optionLabel: string) => {
    setSelectedLabel(optionLabel);
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

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
            p-[16px] pr-12 font-semibold text-[12px] text-[#6C6C6C] cursor-pointer
            placeholder:font-normal placeholder:text-[10px] placeholder:text-[#8A8A8A]
            focus:outline-none 
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
        >
          <span className={selectedLabel ? "text-xs font-semibold" : "text-[#8A8A8A]"}>
            {selectedLabel || placeholder}
          </span>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none">
            {icon || (
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
            )}
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-[6px] border border-[#C7C7C7] bg-white py-1 shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value, option.label)}
                className={`
                  px-4 py-2.5 text-[14px] font-[500] text-[#6C6C6C] cursor-pointer hover:bg-gray-100
                  ${value === option.value ? "bg-blue-50 text-blue-600" : ""}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
