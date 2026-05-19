"use client";

import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  children?: React.ReactNode;

  footer?: React.ReactNode;

  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  className = "",
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-[650px]",
    lg: "max-w-lg",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-screen m-3`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm "
        onClick={() => onOpenChange(false)}
      />

      <div
        className={`relative z-10 w-full ${sizes[size]} rounded-[12px] bg-white p-[24px] shadow-[0_0_25px_rgba(0,0,0,0.2)]  ${className}`}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {(title || description) && (
          <div className="mb-[16px]">
            {title && (
              <h2 className="text-[20px] font-bold text-center mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[13px] text-[#6C6C6C] mt-[4px]">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="space-y-[12px]">{children}</div>

        {footer && (
          <div className="mt-[20px] flex justify-end gap-[8px]">{footer}</div>
        )}
      </div>
    </div>
  );
}
