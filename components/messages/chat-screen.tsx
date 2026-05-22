"use client";

import React from "react";
import {
  VideoIcon,
  PhoneIcon,
  StarIcon,
  PlusIcon,
  MicIcon,
  SmileIcon,
  ChevronLeftIcon,
  ChatSendIcon,
} from "../icons/svgs";
import Image from "next/image";
import Input from "../ui/input";

interface ChatScreenProps {
  message: any;
  onBack?: () => void;
}

export function ChatScreen({ message, onBack }: ChatScreenProps) {
  if (!message) return null;

  return (
    <div className="fixed top-16 bottom-0 left-0 right-0 flex flex-col overflow-hidden bg-white md:relative md:top-auto md:bottom-auto md:left-auto md:right-auto md:h-full md:w-full md:rounded-[16px] md:border md:border-[#E5E7EB] md:p-[24px]">
      <div className="sticky top-0 z-10 shrink-0 flex items-center justify-between bg-white p-[16px] px-[16px] pb-[16px] border-b border-b-[#C7C7C7] md:static md:px-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 text-[#8A8A8A] hover:text-[#131313] md:hidden"
            >
              <ChevronLeftIcon className="h-6 w-6 text-[#8A8A8A]" />
            </button>
          )}
          <div className="relative h-[32px] w-[31px] shrink-0 overflow-hidden rounded-full bg-gray-100 md:h-[49.5px] md:w-[48px]">
            <Image
              src={message.avatar}
              fill
              className="object-cover"
              alt="user-avatar"
            />
          </div>
          <div className="space-y-[4px]">
            <h2 className="flex items-center gap-2 text-[12px] font-[600] leading-tight text-[#131313] md:text-[18px]">
              <span className="md:hidden">
                @joshuaakin
              </span>
              <span className="hidden text-[10px] font-[400] text-[#8A8A8A] md:inline">
                {message.name}
              </span>
            </h2>
            <p className="text-[14px] font-[400] uppercase tracking-wider text-[#6C6C6C] md:normal-case md:tracking-normal">
              <span className="hidden md:inline">{message.role}</span>
              <span className="md:hidden">
                {message.name}
              </span>
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-[24px] md:flex">
          <button className="text-[#8A8A8A] transition-colors hover:text-[#131313]">
            <VideoIcon className="h-6 w-6 text-[#6C6C6C]" />
          </button>
          <button className="text-[#8A8A8A] transition-colors hover:text-[#131313]">
            <PhoneIcon className="h-6 w-6 text-[#6C6C6C]" />
          </button>
          <button className="text-[#8A8A8A] transition-colors hover:text-[#131313]">
            <StarIcon className="h-6 w-6 text-[#6C6C6C]" />
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto bg-[#f7f7f7] px-[16px] py-[10px] space-y-8 md:bg-white md:p-6 md:px-0">
        {message.chatHistory.map((chat: any) => (
          <div
            key={chat.id}
            className={`flex flex-col ${chat.sender === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`flex max-w-[80%] gap-[8px] ${chat.sender === "me" ? "flex-row-reverse" : ""}`}
            >
              {chat.sender === "other" && (
                <div className="relative mt-1 h-[40px] w-[39px] shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={message.avatar}
                    fill
                    alt={message.name}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="space-y-[8px]">
                <div
                  className={`px-4 py-2.5 text-[14px] font-[400] leading-relaxed md:text-[16px] md:font-[500] ${chat.sender === "me"
                    ? "rounded-bl-[8px] rounded-tl-[8px] rounded-tr-[8px] rounded-br-none bg-[#04907E] text-white"
                    : "rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] bg-white text-[#131313]"
                    }`}
                >
                  {chat.text}
                </div>
                <p
                  className={`mt-1 text-[12px] font-[400] text-[#363636] md:text-[14px] ${chat.sender === "me" ? "text-right" : "ml-[20px]"}`}
                >
                  {chat.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 z-10 shrink-0 bg-white p-6 px-[12px] md:static">
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#8A8A8A] transition-colors hover:text-[#131313]">
            <PlusIcon className="h-[32px] w-[32px]" />
          </button>
          <div className="flex w-full items-center gap-[16px]">
            <div className="w-full rounded-full border border-[#C7C7C7] bg-white">
              <Input
                type="text"
                className="h-full w-full overflow-hidden rounded-full border-0 bg-white text-[14px] text-[#131313] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#6C6C6C] focus:outline-none"
                placeholder="Write me a message...."
              />
            </div>

            <div className="flex items-center gap-[16px]">
              <button className="hidden text-[#8A8A8A] transition-colors hover:text-[#131313] md:block">
                <MicIcon className="h-[32px] w-[32px]" />
              </button>
              <button className="text-[#8A8A8A] transition-colors hover:text-[#131313]">
                <SmileIcon className="h-[32px] w-[32px]" />
              </button>

              <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#024E44] text-white">
                <ChatSendIcon className="h-[19.2px] w-[19.2px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}