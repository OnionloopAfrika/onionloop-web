"use client";

import React, { useState } from "react";
import Select from "../ui/select";

interface Product {
  id: number;
  rank: number;
  name: string;
  image: string;
  amount: string;
  progress: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    rank: 1,
    name: "Cocacola",
    image: "/images/coke.svg",
    amount: "₦312,000",
    progress: 75,
  },
  {
    id: 2,
    rank: 2,
    name: "icecream",
    image: "/images/ice-cream.svg",
    amount: "₦312,000",
    progress: 60,
  },
  {
    id: 3,
    rank: 3,
    name: "Pizza",
    image: "/images/pizza.svg",
    amount: "₦312,000",
    progress: 50,
  },
  {
    id: 4,
    rank: 4,
    name: "Shawarma",
    image: "/images/shawarma.svg",
    amount: "₦312,000",
    progress: 40,
  },
  {
    id: 5,
    rank: 5,
    name: "Pepsi",
    image: "/images/pepsi.svg",
    amount: "₦312,000",
    progress: 35,
  },
];

const dropdownOptions = [
  { value: "this-week", label: "This week" },
  { value: "30-days", label: "30 days" },
  { value: "60-days", label: "60 days" },
];

export default function BranchTopSelling() {
  const [timeframe, setTimeframe] = useState("this-week");

  return (
    <div className="bg-white border border-gray-100 rounded-[12px] shadow-sm pt-6 pr-6 pl-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-[600] text-[20px] text-[#363636]">
          Top 5 Selling Products
        </h2>
        <div className="w-[130px]">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
            options={dropdownOptions}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        {mockProducts.map((product, index) => (
          <div key={product.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-[500] text-[14px] text-[#131313]">
                    #{product.rank}
                  </span>
                  <span className="font-[500] text-[14px] text-[#131313]">
                    {product.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-1 ml-8">
                <div className="flex-1 h-2 bg-[#E0F0EA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#04802E] rounded-full"
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
                <span className="font-[500] text-[14px] text-[#6C6C6C] whitespace-nowrap">
                  {product.amount}
                </span>
              </div>
            </div>
            {index < mockProducts.length - 1 && (
              <hr className="border-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
