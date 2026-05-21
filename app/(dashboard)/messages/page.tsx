"use client";

import React from "react";
import { ProfileHeader } from "@/components/profile-header";
import { MessagesContainer } from "@/components/messages/messages-container";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  return (
    <div className="h-screen flex flex-col bg-[#f7f7f7]">
      <ProfileHeader
        className="border-b-0 pl-[24px] pt-[10px] max-md:pl-0 max-md:hidden"
        title="Messages"
        subtitle="Real-time operational alerts across all branches"
      />

      <MessagesContainer />
    </div>
  );
}
