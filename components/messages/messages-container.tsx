"use client";

import React, { useState } from "react";
import { ChatScreen } from "./chat-screen";
import { MessageSidebar } from "./messages-sidebar";
import { messages } from "@/lib/mockdata/messages";

export function MessagesContainer() {
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
