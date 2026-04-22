"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  prefixicon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, prefixicon, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-[8px]">
        {label && (
          <label className="block font-semibold text-[12px] text-[#131313]">
            {label}
          </label>
        )}

        <div className="relative">
          {prefixicon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none">
              {prefixicon}
            </div>
          )}

          <input
            ref={ref}
            className={`
    flex h-[48px] w-full rounded-[6px] border border-[#C7C7C7] bg-[#F7F7F7] 
    p-[16px] pr-12 font-semibold text-[14px] text-[#131313]
    placeholder:font-[400] placeholder:text-[12px] placeholder:text-[#8A8A8A] 
    focus:outline-none 
    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400

    ${prefixicon ? "pl-12" : ""}  

    ${error ? "border-danger focus:border-danger" : ""}
    ${className}
  `}
          />

          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
