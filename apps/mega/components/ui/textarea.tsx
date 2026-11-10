"use client";

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-[8px]">
      {label && (
        <label className="block font-semibold text-[12px] text-[#131313]">
          {label}
        </label>
      )}

      <textarea
        className={`
          w-full min-h-[120px] rounded-[6px] border border-[#C7C7C7] bg-[#F7F7F7]  
          p-[16px] text-[14px] font-semibold text-[#131313]
          placeholder:font-semibold placeholder:text-[12px] placeholder:text-[#8A8A8A]
          focus:outline-none
          disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
          resize-none
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-[12px] text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

export default Textarea;
