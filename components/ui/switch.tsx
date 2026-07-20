"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  size = "md",
  disabled = false,
  id,
}) => {
  const sizes = {
    sm: {
      container: "w-9 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-4",
    },
    md: {
      container: "w-[55px] h-[31px]",
      thumb: "w-[27px] h-[27px]",
      translate: "translate-x-[23px]",
    },

    xl: {
      container: "w-[55px] h-[31px]",
      thumb: "w-[27px] h-[27px]",
      translate: "translate-x-[23px]",
    },
    lg: {
      container: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-6",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      className={`inline-flex items-center ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div
        id={id}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => !disabled && onCheckedChange(!checked)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full 
          transition-colors duration-200 focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${currentSize.container}
          ${checked ? "bg-primary-color" : "bg-[#e9e9ea]"}
          ${disabled ? "pointer-events-none" : "cursor-pointer"}
        `}
      >
        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 left-0.5 bg-white 
            rounded-full shadow-sm transition-all duration-200
            ${currentSize.thumb}
            ${checked ? currentSize.translate : ""}
          `}
        />
      </div>
    </div>
  );
};

export const SwitchToggle: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  size = "md",
  disabled = false,
  id,
}) => {
  const sizes = {
    sm: {
      container: "w-9 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-4",
    },
    md: {
      container: "w-[55px] h-[31px]",
      thumb: "w-[27px] h-[27px]",
      translate: "translate-x-[23px]",
    },

    xl: {
      container: "w-[32px] h-[19.45px]",
      thumb: "w-[16.94px] h-[16.94px]",
      translate: "translate-x-[11px]",
    },
    lg: {
      container: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-6",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      className={`inline-flex items-center ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div
        id={id}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => !disabled && onCheckedChange(!checked)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full 
          transition-colors duration-200 focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${currentSize.container}
          ${checked ? "bg-[#04907E]" : "bg-[#e9e9ea]"}
          ${disabled ? "pointer-events-none" : "cursor-pointer"}
        `}
      >
        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 left-0.5 bg-white 
            rounded-full shadow-sm transition-all duration-200
            ${currentSize.thumb}
            ${checked ? currentSize.translate : ""}
          `}
        />
      </div>
    </div>
  );
};

export default Switch;
