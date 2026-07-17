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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={`
          ${sizes[size]} w-full bg-white rounded-xl shadow-xl 
          flex flex-col max-h-[90vh] overflow-hidden
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="flex-shrink-0 border-b border-gray-200 px-6 py-4 space-y-[12px]">
            {title && (
              <h2 className="text-[20px] font-bold text-center ">{title}</h2>
            )}
            {description && (
              <p className="text-[13px] text-[#6C6C6C] text-center">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto p-6">{children}</div>

        {footer && (
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
