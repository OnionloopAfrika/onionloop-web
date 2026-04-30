"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadImageIcon } from "../icons/svgs";

interface FileUploadProps {
  label?: string;
  onFileSelect?: (file: File | null) => void;
  accept?: string;
}

export default function FileUpload({
  label,
  onFileSelect,
  accept = "image/*",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    onFileSelect?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-semibold text-[12px] text-[#131313]">
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex items-center gap-3 border border-[#C7C7C7] rounded-[6px] px-[16px] h-[48px] cursor-pointer bg-[#F7F7F7]"
      >
        <UploadImageIcon />

        <p className="text-sm text-gray-600">
          {fileName ? (
            <span className="text-black font-medium">{fileName}</span>
          ) : (
            <>
              <span className="text-[12px] font-[400] text-[#363636]">
                Drag & drop or{" "}
                <span className="text-light font-[400] ">Browse</span>
              </span>
            </>
          )}
        </p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
