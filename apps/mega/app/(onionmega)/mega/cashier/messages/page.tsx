"use client";

import React, { useState } from "react";

import { messages } from "@/lib/mockdata/messages";
import { MessageSidebar } from "@/components/messages/messages-sidebar";
import { ChatScreen } from "@/components/messages/chat-screen";

export default function page() {
  const [selectedId, setSelectedId] = useState<number | null>(messages[0].id);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setShowChatOnMobile(true);
  };

  const selectedMessage =
    messages.find((m) => m.id === selectedId) || messages[0];

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-[24px] pb-6 overflow-hidden relative">
      <div
        className={`min-h-full ${showChatOnMobile ? "max-md:hidden" : "max-md:block"}`}
      >
        <MessageSidebar
          messages={messages}
          selectedId={selectedId || 0}
          onSelect={handleSelect}
        />
      </div>
      <div
        className={`min-h-full ${showChatOnMobile ? "max-md:block" : "max-md:hidden"}`}
      >
        <ChatScreen
          message={selectedMessage}
          onBack={() => setShowChatOnMobile(false)}
        />
      </div>
    </div>
  );
}
