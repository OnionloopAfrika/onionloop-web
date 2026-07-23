"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchInput } from "../ui/search-input";
import { CalendarIcon, RightArrowIcon } from "../icons/svgs";
import { Modal } from "@/components/ui/modal"; // Adjust path if needed

export interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  sales: number;
  orders: number;
  role?: string; // e.g. "Attendant"
  totalSales?: number; // For modal
  lastActive?: string;
  status?: "Active" | "Inactive";
}

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  product_count: string;
  sales: number;
  time: string;
}

interface CrewSalesPerformanceProps {
  staff: StaffMember[];
  transactions?: Record<string, Transaction[]>;
  title?: string;
  date?: string;
  onRowClick?: (staffId: string) => void;
  searchPlaceholder?: string;
}

export function SalesPerformance({
  staff,
  transactions = {},
  title = "Staff Sales Performance",
  date = "08-05-2026",
  onRowClick,
  searchPlaceholder = "Search by ref or amount...",
}: CrewSalesPerformanceProps) {
  const router = useRouter();
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (member: StaffMember) => {
    if (onRowClick) {
      onRowClick(member.id);
    } else {
      setSelectedStaff(member);
      setShowModal(true);
    }
  };

  const staffTransactions = selectedStaff
    ? transactions[selectedStaff.id] || []
    : [];

  return (
    <>
      <div className="space-y-[16px]">
        <p className="font-[600] text-[18px] text-[#131313]">{title}</p>

        <div className="flex items-center gap-4 bg-white rounded-tl-[16px] rounded-tr-[16px] p-[16px] h-[113px]">
          <div className="w-[50%] grid grid-cols-[2fr_1fr] gap-[9px]">
            <div>
              <SearchInput
                placeholder={searchPlaceholder}
                className="rounded-[12px]"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-3 w-fit">
              <span className="text-[#6C6C6C] font-[500]">{date}</span>
              <CalendarIcon className="w-5 h-5 text-[#8A8A8A]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto select-none">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                  <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap w-[64px]"></th>
                  <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                    Staff Name
                  </th>
                  <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                    Sales
                  </th>
                  <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                    Order
                  </th>
                  <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {staff.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => handleRowClick(member)}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full flex-shrink-0">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[14px] font-medium text-[#6C6C6C]">
                        {member.name}
                      </p>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-start font-medium text-[#04802E] text-[14px]">
                      +₦{member.sales.toLocaleString()}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-start font-medium text-[#6C6C6C] text-[14px]">
                      {member.orders}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-end">
                      <RightArrowIcon className="w-[24px] h-[24px] text-[#6C6C6C]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Staff Details Modal */}
      <Modal
        open={showModal}
        onOpenChange={setShowModal}
        title={selectedStaff?.name}
        description={selectedStaff?.role || "Attendant"}
        className="max-w-4xl py-8 px-8"
      >
        {selectedStaff && (
          <div className="space-y-8">
            {/* Staff Info + Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedStaff.avatar}
                      alt={selectedStaff.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-[#131313]">
                      {selectedStaff.name}
                    </h3>
                    <p className="text-[#6C6C6C]">
                      {selectedStaff.role || "Attendant"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#6C6C6C]">Total Amount:</span>
                    <span className="font-semibold">
                      ₦
                      {selectedStaff.totalSales?.toLocaleString() ||
                        selectedStaff.sales * 10}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C6C6C]">Status:</span>
                    <span className="bg-[#04802E] text-white px-4 py-1 rounded-full text-sm font-medium">
                      {selectedStaff.status || "Active"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C6C6C]">Last Active:</span>
                    <span className="font-medium">
                      {selectedStaff.lastActive || "May 19, 2026 at 09:15am"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Add your 4 metric cards here similar to the example */}
                {/* ... (you can extend this) */}
              </div>
            </div>

            {/* Transactions Table */}
            <div>
              <div className="flex items-center justify-between bg-white rounded-tl-[16px] rounded-tr-[16px] p-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="w-[400px]">
                    <SearchInput
                      placeholder="Search transactions..."
                      className="rounded-[12px]"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-[12px] px-4 py-3 w-fit">
                    <span className="text-[#6C6C6C] font-medium">{date}</span>
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-[#6C6C6C] font-medium">
                  Showing {staffTransactions.length} transactions
                </div>
              </div>

              <div className="bg-white rounded-b-2xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-y">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-500">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-500">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-500">
                        Products
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-500">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-500">
                        Time
                      </th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {staffTransactions.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => alert("Open order detail modal")}
                      >
                        <td className="px-6 py-5">{t.orderId}</td>
                        <td className="px-6 py-5 font-medium">{t.customer}</td>
                        <td className="px-6 py-5">{t.product_count}</td>
                        <td className="px-6 py-5 text-[#04802E] font-medium">
                          +₦{t.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-[#6C6C6C]">{t.time}</td>
                        <td className="px-6 py-5 text-end">
                          <RightArrowIcon className="w-6 h-6 text-[#6C6C6C]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
