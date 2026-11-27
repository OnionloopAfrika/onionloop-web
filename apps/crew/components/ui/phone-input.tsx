"use client";

import Image from "next/image";
import React from "react";

import Input from "./input";

interface PhoneInputProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  countryCode?: string;
  flagSrc?: string;
  countryName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export default function PhoneInput({
  label = "Phone Number",
  value,
  defaultValue,
  placeholder = "800 000 0000",
  countryCode = "+234",
  flagSrc = "/icons/flag.svg",
  countryName = "Nigeria",
  onChange,
  onValueChange,
  className = "",
  error,
}: PhoneInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <span className="mb-[8px] block text-[12px] font-[600] text-[#131313]">
          {label}
        </span>
      )}
      <div className="grid grid-cols-[82px_1fr] gap-[8px]">
        <Input
          readOnly
          aria-label="Country code"
          className="rounded-r-[0px] pr-[4px]"
          prefixicon={
            <span className="flex items-center gap-[6px] whitespace-nowrap text-[12px] font-[500] text-[#8A8A8A]">
              <Image
                src={flagSrc}
                alt={`${countryName} flag`}
                width={14}
                height={14}
              />
              <span>{countryCode}</span>
            </span>
          }
        />
        <Input
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          error={error}
          className="-ml-[1px] rounded-l-[0px]"
        />
      </div>
    </div>
  );
}
