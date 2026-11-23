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
  className2?: string;
  className3?: string;
  subtitleClass?: string;
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
  className2 = "",
  className3 = "",
  subtitleClass = "",
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 min-h-[100vh]"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={`
          ${sizes[size]} w-full bg-white rounded-xl shadow-xl 
          flex flex-col max-h-[90vh] overflow-hidden p-[32px]
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div
            className={`flex-shrink-0 border-b border-gray-200 space-y-[12px] pb-2 space-y-[12px] ${className2}  `}
          >
            {title && (
              <h2 className="text-[24px] text-[#131313] font-[600] text-center ">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`  text-[16px] text-[#363636] font-[400] text-center  ${subtitleClass} `}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto py-4">{children}</div>

        {footer && (
          <div
            className={`flex-shrink-0 border-t border-gray-200  bg-white mt-[40px] ${className3}  `}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
