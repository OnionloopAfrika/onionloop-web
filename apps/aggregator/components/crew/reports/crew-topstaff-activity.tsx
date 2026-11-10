"use client";

import { useState } from "react";
import Select from "../../ui/select";

interface Staff {
  id: number;
  rank: number;
  name: string;
  image: string;
  sales: number;
  amount: string;
}

const mockStaff: Staff[] = [
  {
    id: 1,
    rank: 1,
    name: "Mary Olanrewaju",
    image: "/images/zinny.svg",
    sales: 10,
    amount: "+₦45,000",
  },
  {
    id: 2,
    rank: 2,
    name: "Mary Olanrewaju",
    image: "/images/zinny.svg",
    sales: 5,
    amount: "+₦28,400",
  },
  {
    id: 3,
    rank: 3,
    name: "Mary Olanrewaju",
    image: "/images/zinny.svg",

    sales: 3,
    amount: "+₦8,400",
  },
  {
    id: 4,
    rank: 4,
    name: "Mary Olanrewaju",
    image: "/images/zinny.svg",
    sales: 3,
    amount: "+₦8,400",
  },
  {
    id: 5,
    rank: 5,
    name: "Mary Olanrewaju",
    image: "/images/grace.svg",
    sales: 2,
    amount: "+₦5,400",
  },
];

const dropdownOptions = [
  { value: "this-week", label: "This week" },
  { value: "30-days", label: "30 days" },
  { value: "60-days", label: "60 days" },
];

export default function CrewTopstaffActivity() {
  const [timeframe, setTimeframe] = useState("this-week");

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-semibold text-[#131313]">
          TOP Selling Staff Active
        </h2>
        <div className="w-[160px]">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
            options={dropdownOptions}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {mockStaff.map((staff, index) => (
          <div key={staff.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-[14px] font-semibold text-[#6C6C6C]">
                  #{staff.rank}
                </span>
                <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[14px] font-[500] text-[#131313]">
                    {staff.name}
                  </span>
                  <span className="font-[400] text-[12px] text-[#6C6C6C]">
                    {staff.sales} Sales
                  </span>
                </div>
              </div>

              <span className="text-[14px] font-[500] text-[#04802E]">
                {staff.amount}
              </span>
            </div>
            {index < mockStaff.length - 1 && <hr className="border-gray-100" />}
          </div>
        ))}
      </div>
    </div>
  );
}
