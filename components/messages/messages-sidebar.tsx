"use client";

import React, { useState } from "react";
import { SearchIcon, FilterIcon, TickIcon } from "../icons/svgs";
import Input from "../ui/input";
import Image from "next/image";
import { ProfileHeader } from "../profile-header";

const filters = ["All", "Agents", "Staff", "Friends"];

interface MessageSidebarProps {
  messages: any[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export function MessageSidebar({
  messages = [],
  selectedId,
  onSelect,
}: MessageSidebarProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-col h-full  space-y-[16px] rounded-[16px] overflow-hidden max-md:border-0 max-md:rounded-0">
      <ProfileHeader
        className="border-b-0 md:hidden"
        title="Messages"
        subtitle="Real-time operational alerts across all branches "
      />

      <div className="space-y-[16px]">
        <div className="  flex gap-[16px] items-center">
          <div className="flex-1 overflow-hidden max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <Input
              placeholder="Search"
              prefixicon={<SearchIcon color="#8A8A8A" />}
              className="!bg-white max-md:!bg-[#F7F7F7] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)] overflow-hidden"
            />
          </div>
          <button className="p-2 border border-[#C7C7C7] rounded-lg hover:bg-gray-50 h-12 w-12 flex items-center justify-center shrink-0 max-md:bg-[#F7F7F7] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <FilterIcon className="text-gray-500" />
          </button>
        </div>

        <div className="p-[4px] h-[40px] flex gap-[16px] overflow-x-auto no-scrollbar max-md:px-0 bg-white w-fit rounded-full max-md:w-full max-md:rounded-[8px] max-md:h-[48px] max-md:px-[12px] max-md:shadow-[0_0_5px_rgba(0,0,0,0.15)] max-md:py-[10px]">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-[12px] py-[4px] rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-[#F7F7F7] text-[#024E44] max-md:bg-[#024E44]/10 min-w-[60px]  max-md:py-[4px] max-md:px-[12px]"
                  : "text-[#8A8A8A] hover:text-[#131313] min-w-[60px]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll max-md:px-0  ">
        {messages?.map((msg, index) => (
          <div key={msg.id} onClick={() => onSelect(msg.id)}>
            <div
              className={`p-[16px] flex gap-3 bg-white items-center cursor-pointer transition-colors border-b border-b-[#C7C7C7] ${
                selectedId === msg.id ? "bg-[#F7F7F7]" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-[40px] relative h-[41px] max-md:w-[39px] max-md:h-[40px] rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={msg.avatar}
                  alt={msg.name}
                  fill
                  className=" object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-[600] text-[16px] max-md:text-[14px] text-[#131313] truncate">
                    {msg.name}
                  </h3>
                  <span
                    className={`text-[12px] ${
                      msg.status === "unread"
                        ? "font-[600] text-[14px] max-md:text-[12px] text-[#04802E]"
                        : "font-[500] text-[14px] max-md:text-[12px] text-[#131313]"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p
                    className={`text-[14px] truncate ${
                      msg.status === "typing"
                        ? "font-[400] text-[16px]  max-md:text-[14px] text-[#8A8A8A]"
                        : msg.status === "read"
                          ? "font-[400] text-[16px]  max-md:text-[14px] text-[#8A8A8A]"
                          : msg.status === "unread"
                            ? "font-[600] text-[16px]  max-md:text-[14px] text-[#8A8A8A]"
                            : "font-[400] text-[16px]  max-md:text-[14px] text-[#8A8A8A]"
                    }`}
                  >
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-1">
                    {msg.status === "unread" && (
                      <div className="w-[30px] h-[22px] max-md:w-[28px] max-md:h-[20px] rounded-full text-white bg-[#04802E] flex justify-center items-center font-[600] text-[14px] max-md:text-[12px]">
                        {msg.unreadCount}
                      </div>
                    )}
                    {msg.status === "read" && (
                      <TickIcon
                        color="#8A8A8A"
                        className="w-[20px] h-[20px] "
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {index < messages.length - 1 && (
              <div className="mx-4 border-b border-[#F0F0F0]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
