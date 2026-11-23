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
  iconPosition?: "start" | "end";
  className?: string;
  onTriggerClick?: () => void;
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
  iconPosition = "end",
  className,
  onTriggerClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedLabel, setInternalSelectedLabel] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    value !== undefined
      ? (options?.find((option) => option.value === value)?.label ?? "")
      : internalSelectedLabel;

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
    setInternalSelectedLabel(optionLabel);
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
          onClick={() =>
            !disabled &&
            (onTriggerClick ? onTriggerClick() : setIsOpen(!isOpen))
          }
          disabled={disabled}
          className={`
            flex h-[48px] w-fit items-center ${iconPosition === "start" ? "justify-start" : "justify-between"} gap-2 rounded-[6px] ${className} border !bg-[#f7f7f7] border-[#E5E7EB] max-lg:w-full
            px-3 py-3 font-[500] text-[14px] text-[#A8A8A8] cursor-pointer
            placeholder:font-[500] placeholder:text-[12px] placeholder:text-[#A8A8A8] 
            focus:outline-none 
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${className || ""}
            ${error ? "border-red-500 focus:border-red-500" : ""}
          `}
        >
          {iconPosition === "start" && (
            <div className="shrink-0 text-[#8A8A8A] pointer-events-none">
              {icon || <SelectIcon />}
            </div>
          )}

          <span
            className={`min-w-0 flex-1 truncate whitespace-nowrap ${
              selectedLabel
                ? "text-xs font-semibold text-start"
                : "text-start text-[#8A8A8A]"
            }`}
          >
            {selectedLabel || placeholder}
          </span>

          {iconPosition === "end" && (
            <div className="shrink-0 text-[#8A8A8A] pointer-events-none">
              {icon || <SelectIcon />}
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-[6px] border border-[#C7C7C7] bg-white py-1 shadow-lg">
            {options?.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value, option.label)}
                className={`
                  px-4 py-2.5 text-[14px] font-[400] text-[#8A8A8A] cursor-pointer hover:bg-[#f7f7f7] last:border-b-0 border-b border-b-[#C7C7C7]
                  ${value === option.value ? " text-[#8A8A8A]" : ""}
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
