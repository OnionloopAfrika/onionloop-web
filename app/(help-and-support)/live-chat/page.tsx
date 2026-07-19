"use client";

import { useState } from "react";
import {
  AddIcon,
  LocationIcon,
  LockIcon,
  OnionIcon,
  SyncIcon,
} from "@/components/icons/svgs";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Image from "next/image";

interface ChatMessage {
  id: string;
  type: "user" | "agent";
  text: string;
  time?: string;
}

interface Chat {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
}

export default function LiveChatPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {
      id: "1",
      sender: "other",
      text: "Hello! How can I help you today?",
      time: "9:00 AM",
    },
  ]);
  const chatData = {
    avatar: "/images/ben.svg",
    name: "Onionloop Support",
  };

  const instantMessages = [
    {
      icon: <SyncIcon className="text-[#0D5EBA]" />,
      bgColor: "#C6DDF7",
      msg: "How do I sync inventory with my staff mobile app?",
    },
    {
      icon: <LockIcon className="text-[#7C53FC]" />,
      bgColor: "#CFC2F7",
      msg: "How do I reset a staff member’s PIN?",
    },
    {
      icon: <LocationIcon className="text-[#DD900D]" />,
      bgColor: "#FBE2B7",
      msg: "Can I add multiple store location?",
    },
  ];

  const handleInstantMessageClick = (msg: string) => {
    setInputMessage(msg);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newChat: Chat = {
      id: Date.now().toString(),
      sender: "me",
      text: inputMessage,
      time: "Just now",
    };
    setChatHistory([...chatHistory, newChat]);
    setInputMessage("");
    setChatStarted(true);
  };

  return (
    <div className="pt-5 min-h-screen flex flex-col">
      <Breadcrumb firstTab="Help & Support" secondTab="Live Chat" />

      <div className="flex-1 flex flex-col mt-[50px] items-center px-4 ">
        {!chatStarted ? (
          <div className="space-y-8 w-[80%] w-full flex-1">
            <div className="flex flex-col items-center gap-5">
              <OnionIcon className="w-16 h-[72px]" />
              <div className="text-center">
                <p className="font-normal text-lg text-black">Hi there,👋</p>
                <p className="font-semibold text-2xl text-gray-900 mt-1">
                  How can we help?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[80%] mx-auto">
              {instantMessages.map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleInstantMessageClick(item.msg)}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 p-[10px]"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {item.icon}
                  </div>

                  <p className="font-[500] text-[12px] text-[#131313] leading-relaxed">
                    {item.msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-scrollbar flex-1 overflow-y-auto  px-[16px] py-[10px] space-y-8  w-full md:p-6 md:px-0">
            {chatHistory.map((chat) => (
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
                        src={chatData.avatar}
                        fill
                        alt={chatData.name}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-[8px]">
                    <div
                      className={`px-4 py-2.5 text-[14px] font-[400] leading-relaxed md:text-[16px] md:font-[500] ${
                        chat.sender === "me"
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
        )}

        <div className="w-[80%] mx-auto mt-auto mb-6">
          <div className="bg-white rounded-full border border-gray-200 shadow-sm p-3 px-[12px] flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <AddIcon className="text-[#6C6C6C] w-[32px] h-[32px]" />
            </button>

            <input
              type="text"
              placeholder="How do I sync inventory with my staff mobile app?"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-[8px] py-[12px] font-[500] text-[12px] text-[#131313] placeholder-gray-400 focus:outline-none border border-[#C7C7C7] rounded-full"
            />

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 29.3337C23.2815 29.3337 29.3337 23.2945 29.3337 16.0003C29.3337 8.71903 23.2681 2.66699 15.9867 2.66699C8.69294 2.66699 2.66699 8.71903 2.66699 16.0003C2.66699 23.2945 8.70577 29.3337 16 29.3337ZM16.0006 27.1116C9.82964 27.1116 4.90079 22.17 4.90079 16.0003C4.90079 9.84288 9.81625 4.88903 15.9867 4.88903C22.1437 4.88903 27.0976 9.84343 27.111 16.0003C27.1238 22.1706 22.1565 27.1116 15.9995 27.1116M12.1956 14.8107C12.9664 14.8107 13.6067 14.1308 13.6067 13.1765C13.6067 12.2228 12.9664 11.5423 12.1956 11.5423C11.4371 11.5423 10.8096 12.2228 10.8096 13.1765C10.8096 14.1302 11.4371 14.8107 12.1956 14.8107ZM19.8424 14.8107C20.6138 14.8107 21.2546 14.1308 21.2546 13.1765C21.2546 12.2228 20.6138 11.5423 19.843 11.5423C19.0721 11.5423 18.4441 12.2228 18.4441 13.1765C18.4441 14.1302 19.071 14.8107 19.8424 14.8107ZM16 22.3011C19.1502 22.3011 21.1241 20.0657 21.1241 19.2163C21.1241 19.0461 20.9936 18.9675 20.8631 19.0724C19.9088 19.8699 18.3008 20.6541 15.9995 20.6541C13.6859 20.6541 12.0395 19.8175 11.1242 19.0852C10.9931 18.9681 10.8626 19.0461 10.8626 19.2163C10.8626 20.0657 12.8365 22.3006 15.9995 22.3006"
                    fill="#6C6C6C"
                  />
                </svg>
              </button>

              <button onClick={handleSendMessage}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="16" fill="#024E44" />
                  <path
                    d="M19.3123 8.76842L12.0883 11.1684C7.23229 12.7924 7.23229 15.4404 12.0883 17.0564L14.2323 17.7684L14.9443 19.9124C16.5603 24.7684 19.2163 24.7684 20.8323 19.9124L23.2403 12.6964C24.3123 9.45642 22.5523 7.68842 19.3123 8.76842ZM19.5683 13.0724L16.5283 16.1284C16.4083 16.2484 16.2563 16.3044 16.1043 16.3044C15.9523 16.3044 15.8003 16.2484 15.6803 16.1284C15.4483 15.8964 15.4483 15.5124 15.6803 15.2804L18.7203 12.2244C18.9523 11.9924 19.3363 11.9924 19.5683 12.2244C19.8003 12.4564 19.8003 12.8404 19.5683 13.0724Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
