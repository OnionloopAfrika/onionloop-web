"use client";

import React, { useState, useRef, useEffect } from "react";
import { SelectIcon } from "../icons/svgs";

interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
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
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options?.find((opt) => opt.value === value);
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
            flex h-[48px] w-full items-center justify-between rounded-[6px] ${className}  border bg-[#F9FAFB] border-[#E5E7EB]  
            p-[16px] pr-12 font-[500] text-[14px] text-[#A8A8A8] cursor-pointer
    placeholder:font-[500] placeholder:text-[12px] placeholder:text-[#A8A8A8] 
            focus:outline-none 
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${className || ""}
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
        >
          <span
            className={
              selectedLabel
                ? "text-xs font-semibold text-start "
                : " text-start text-[#8A8A8A]"
            }
          >
            {selectedLabel || placeholder}
          </span>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none">
            {icon || <SelectIcon />}
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-[6px] border border-[#C7C7C7] bg-white py-1 shadow-lg">
            {options?.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value, option.label)}
                className={`
                  px-4 py-2.5 text-[14px] font-[400] text-[#98A2B3] cursor-pointer hover:bg-gray-100 last:border-b-0 border-b border-b-[#C7C7C7]
                  ${value === option.value ? " text-[#98A2B3]" : ""}
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
