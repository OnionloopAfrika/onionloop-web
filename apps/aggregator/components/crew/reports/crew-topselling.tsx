"use client";

import Table, { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { TrendingUpIcon, UpwordIcon } from "../../icons/svgs";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  name: string;
  unitsSold: number;
  revenue: string;
  trend: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    image: "/images/coke.svg",
    name: "Cocacola",
    unitsSold: 400,
    revenue: "₦12.4M",
    trend: "₦1.6M",
  },
  {
    id: 2,
    image: "/images/ice-cream.svg",
    name: "Icecream",
    unitsSold: 390,
    revenue: "₦12.4M",
    trend: "₦1.6M",
  },
  {
    id: 3,
    image: "/images/pizza.svg",
    name: "Pizza",
    unitsSold: 300,
    revenue: "₦12.4M",
    trend: "₦1.6M",
  },
  {
    id: 4,
    image: "/images/shawarma.svg",
    name: "Shawarma",
    unitsSold: 291,
    revenue: "₦12.4M",
    trend: "₦1.6M",
  },
  {
    id: 5,
    image: "/images/pepsi.svg",
    name: "Pepsi",
    unitsSold: 289,
    revenue: "₦12.4M",
    trend: "₦1.6M",
  },
];

export function CrewTopSelling() {
  return (
    <div className="w-full bg-white rounded-[12px] shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-[600] text-[20px] text-[#131313]">
          Top Selling Products
        </h2>
        <Link href="#" className="font-[600] text-[16px] text-[#04802E]">
          View All
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Product Name
              </TableHead>
              <TableHead>
                Units Sold
              </TableHead>
              <TableHead>
                Revenue
              </TableHead>
              <TableHead>
                Trends
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product, index) => (
              <TableRow
                key={product.id}
              >
                <TableCell>
                  <div className="flex items-center gap-[8px]">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </div>
                    <span className="font-[500] text-[12px] text-[#6C6C6C]">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {product.unitsSold}
                </TableCell>
                <TableCell>
                  {product.revenue}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-[#04802E] font-[500] text-[12px]">
                    <UpwordIcon />
                    <span>{product.trend}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
