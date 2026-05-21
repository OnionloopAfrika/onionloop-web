"use client";

import React from "react";
import {
  VideoIcon,
  PhoneIcon,
  StarIcon,
  PlusIcon,
  MicIcon,
  SmileIcon,
  SendIcon,
  ChatSendIcon,
  ChevronLeftIcon,
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
    <div className="flex flex-col p-[24px]  max-md:p-0 h-full bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden max-md:border-0 max-md:rounded-0">
      <div className=" border-b border-b-[#C7C7C7] max-md:px-[16px] max-md:p-[16px] pb-[16px]  flex items-center justify-between bg-white max-md:px-0">
        <div className="flex items-center gap-3 ">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-1 text-[#8A8A8A] hover:text-[#131313]"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#8A8A8A]" />
            </button>
          )}
          <div className="w-[48px] h-[49.5px] max-md:w-[31px] max-md:h-[32px] rounded-full overflow-hidden bg-gray-100 shrink-0 relative">
            <Image
              src={message.avatar}
              fill
              className="object-cover"
              alt="user-avatar"
            />
          </div>
          <div className="space-y-[4px]">
            <h2 className="font-[600] text-[18px] text-[#131313] leading-tight flex items-center gap-2">
              <span className="max-md:text-[#131313] max-md:font-[600] max-md:text-[12px] md:hidden">
                @joshuaakin
              </span>
              <span className="max-md:hidden font-[400] text-[10px] text-[#8A8A8A]">
                {message.name}
              </span>
            </h2>
            <p className="font-[400] text-[14px] text-[#6C6C6C] ">
              <span className="max-md:hidden">{message.role}</span>
              <span className="md:hidden uppercase tracking-wider">
                {message.name}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[24px] max-md:hidden">
          <button className="text-[#8A8A8A] hover:text-[#131313] transition-colors">
            <VideoIcon className="w-6 h-6 text-[#6C6C6C]" />
          </button>
          <button className="text-[#8A8A8A] hover:text-[#131313] transition-colors">
            <PhoneIcon className="w-6 h-6 text-[#6C6C6C]" />
          </button>
          <button className="text-[#8A8A8A] hover:text-[#131313] transition-colors">
            <StarIcon className="w-6 h-6 text-[#6C6C6C]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-md:py-[10px] max-md:px-[16px] space-y-8 bg-white max-md:bg-[#f7f7f7] no-scrollbar max-md:px-0">
        {message.chatHistory.map((chat: any) => (
          <div
            key={chat.id}
            className={`flex flex-col ${chat.sender === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`flex gap-[8px] max-w-[80%]  ${chat.sender === "me" ? "flex-row-reverse" : ""}`}
            >
              {chat.sender === "other" && (
                <div className="w-[39px] h-[40px] rounded-full  overflow-hidden bg-gray-100 shrink-0 mt-1 relative">
                  <Image
                    src={message.avatar}
                    fill
                    alt={message.name}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="space-y-[8px] ">
                <div
                  className={`px-4 py-2.5  text-[14px] leading-relaxed max-md:font-[400] max-md:text-[14px]  ${
                    chat.sender === "me"
                      ? "bg-[#04907E] font-[500]  text-[16px] text-white rounded-br-none rounded-tr-[8px] rounded-tl-[8px] rounded-bl-[8px]"
                      : "bg-[#F7F7F7] font-[500]  text-[16px] text-[#131313] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px] bg-white"
                  }`}
                >
                  {chat.text}
                </div>
                <p
                  className={`font-[400] text-[14px] max-md:text-[12px] text-[#363636] mt-1 ${chat.sender === "me" ? "text-right" : "ml-[20px]"}`}
                >
                  {chat.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white max-md:px-0 max-md:px-[12px] ">
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#8A8A8A] hover:text-[#131313] transition-colors">
            <PlusIcon className="w-[32px] h-[32px]" />
          </button>
          <div className="flex items-center gap-[16px] w-full ">
            <div className="border w-full rounded-full border-[#C7C7C7]  max-md:bg-white">
              <Input
                type="text"
                className="w-full h-full rounded-full border-0 overflow-hidden bg-white focus:outline-none text-[14px] text-[#131313] placeholder:text-[#6C6C6C] placeholder:font-[400] placeholder:text-[14px] "
                placeholder="Write me a message...."
              />
            </div>

            <div className="flex items-center gap-[16px] ">
              <button className="text-[#8A8A8A] hover:text-[#131313] transition-colors">
                <MicIcon className="w-[32px] h-[32px] max-md:hidden" />
              </button>
              <button className="text-[#8A8A8A] hover:text-[#131313] transition-colors">
                <SmileIcon className="w-[32px] h-[32px]" />
              </button>

              <button className="w-[32px] h-[32px] bg-[#024E44] rounded-full flex items-center justify-center text-white  ">
                <ChatSendIcon className="w-[19.2px] h-[19.2px] " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
