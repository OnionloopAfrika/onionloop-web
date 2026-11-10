"use client";

import React from "react";
import Link from "next/link";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  status: "online" | "offline";
  lastSeen?: string;
}

const mockStaff: StaffMember[] = [
  {
    id: 1,
    name: "Titi Folarin",
    role: "Cashier",
    image: "/images/joshua.svg",
    status: "online",
  },
  {
    id: 2,
    name: "Mary Olanrewaju",
    role: "Manager",
    image: "/images/grace.svg",
    status: "online",
    lastSeen: "2hrs",
  },
  {
    id: 3,
    name: "David Anigbogu",
    role: "Head of Staff",
    image: "/images/ben.svg",
    status: "offline",
    lastSeen: "3days ago",
  },
  {
    id: 4,
    name: "Samuel Saidu",
    role: "Attendant",
    image: "/images/agent.svg",
    status: "online",
  },
  {
    id: 5,
    name: "Adanma Dappa",
    role: "Attendant",
    image: "/images/zinny.svg",
    status: "online",
  },
  {
    id: 6,
    name: "David Anigbogu",
    role: "Head of Staff",
    image: "/images/ben.svg",
    status: "offline",
    lastSeen: "3days ago",
  },
  {
    id: 7,
    name: "Kemi Saidu",
    role: "Senior Manager",
    image: "/images/tunde.svg",
    status: "online",
    lastSeen: "2hrs",
  },
];

export function CrewStaffActivity() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-[#131313]">
          Staff Activity
        </h2>
        <Link href="#" className="text-[#024E44] font-[600] text-[16px]">
          Manage Activities
        </Link>
      </div>

      <div className="flex flex-col">
        {mockStaff.map((staff, index) => (
          <div key={staff.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-[10px]">
                <div className="w-[40px] h-[40px] rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </div>
                <div className="space-y-[2px]">
                  <p className="font-[500] text-[16px] text-[#131313]">
                    {staff.name}
                  </p>
                  <p className="font-[400] text-[12px] text-[#6C6C6C]">
                    {staff.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {staff.status === "online" ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#04802E]" />
                    {!staff.lastSeen && (
                      <span className="text-[#04802E] font-medium text-[14px]">
                        Online
                      </span>
                    )}
                    {staff.lastSeen && (
                      <>
                        <span className="text-[#8A8A8A] font-medium text-[14px]">
                          Online
                        </span>
                        <span className="text-[#8A8A8A]">•</span>
                        <span className="text-[#8A8A8A] font-medium text-[14px]">
                          {staff.lastSeen}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#CB1A14] font-medium text-[14px]">
                      Offline
                    </span>
                    {staff.lastSeen && (
                      <>
                        <span className="text-[#6C6C6C]">•</span>
                        <span className="text-[#CB1A14] font-medium text-[14px]">
                          {staff.lastSeen}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            {index < mockStaff.length - 1 && <hr className="border-gray-100" />}
          </div>
        ))}
      </div>
    </div>
  );
}
