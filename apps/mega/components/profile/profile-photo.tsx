"use client"

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { ProfileHeader } from "../profile-header";
import Button from "../ui/button";

export function ProfilePhoto() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-[40px] p-[24px] shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-[12px]">
      <ProfileHeader
        title="Profile Photo"
        subtitle="Your avatar across the platform"
      />
      <div className="flex justify-start">
        <div className="flex justify-between items-center gap-[20px] w-fit">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
            className="hidden"
          />

          <Image
            src={imagePreview || "/icons/avatar.svg"}
            width={102}
            height={102}
            alt="user-avatar"
            className="rounded-full object-cover"
          />

          <div className="space-y-[8px]">
            <Button
              className="w-full"
              variant="outline"
              size="md"
              onClick={handleEditClick}
            >
              Edit Photo
            </Button>

            <p className="font-[500] text-[14px] text-[#363636]">
              JPG or PNG, max 2MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}