"use client";

import { useState } from "react";

const initialNotifications = [
  {
    id: "dispute",
    title: "DSP-321 escalated-needs response within 24hours",
    category: "Dispute",
    age: "3 h ago",
  },
];

export default function DisputeNotis() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const dismissNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  return (
    <section
      aria-label="KYC notifications"
      className="w-full overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white px-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-sm:px-[16px]"
    >
      {notifications.map((notification) => (
        <article
          className="flex min-h-[78px] items-center gap-[16px] border-b border-[#E0E0E0] last:border-b-0 max-sm:gap-[12px] max-sm:py-[14px]"
          key={notification.id}
        >
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] shrink-0 rounded-full bg-[#CB1A14]"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-[500] leading-[20px] text-[#131313]">
              {notification.title}
            </p>
            <p className="mt-[4px] flex items-center gap-[8px] text-[12px] font-[400] leading-[16px] text-[#6C6C6C]">
              <span>{notification.category}</span>
              <span
                aria-hidden="true"
                className="h-[4px] w-[4px] rounded-full bg-[#D9D9D9]"
              />
              <span>{notification.age}</span>
            </p>
          </div>

          <button
            aria-label={`Dismiss notification: ${notification.title}`}
            className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-[#8A8A8A] hover:text-[#363636]"
            onClick={() => dismissNotification(notification.id)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-[16px] w-[16px]"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="m4 4 8 8m0-8-8 8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </article>
      ))}
    </section>
  );
}
