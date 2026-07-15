"use client";

import Link from "next/link";
import { ProfileHeader } from "../profile-header";
import {
  ArrowRightIcon,
  CopyIcon,
  RightArrowIcon,
  ShareReceiptIcon,
  SuccessIcon,
  TroubleIcon,
} from "@/components/icons/svgs";
import { recentOrders } from "@/lib/mockdata/recent-orders";
import SearchBar from "../ui/search-bar";
import { useState } from "react";
import { Modal } from "../ui/modal";
import Image from "next/image";
import { OrderInfo } from "./order-details";

export default function RecentOrders() {
  const toDo = [
    {
      title: "Share Receipt",
      description: "Share transaction receipt",
    },

    {
      title: "Trouble With Your Payment?",
      description: "Report this transaction",
    },
  ];

  const [showTransatctionDetails, setShowTransatctionDetails] = useState(false);

  const handleTransactionDetails = () => {
    setShowTransatctionDetails(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Success":
        return "text-[#04802E] bg-[#E7F6EC] border-[#04802E]";
      case "Pending":
        return "text-[#DD900D] bg-[#FEF6E7] border-[#DD900D]";
      case "Failed":
        return "text-[#CB1A14] bg-[#FBEAE9] border-[#CB1A14]";
      default:
        return "text-[#04802E] bg-[#E7F6EC] border-[#04802E]";
    }
  };

  return (
    <>
      <div className="space-y-[24px]">
        <ProfileHeader
          className="border-b-0 pb-[0px]"
          title="Recent Orders"
          btn={
            <Link className="font-[600] text-[16px] text-primary-color" href="">
              View All
            </Link>
          }
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <SearchBar
            searchPlaceholder="Search  Products or Categories"
            statusPlaceholder="All Status:"
            datePlaceholder="Filter by:"
            statusOptions={[
              { value: "all", label: "All Status" },
              { value: "In stock", label: "In stock" },
              { value: "Low stock", label: "Low stock" },
              { value: "Out of stock", label: "Out of stock" },
            ]}
            dateOptions={[
              { value: "Food", label: "Food" },
              { value: "Beverages", label: "Beverages" },
              { value: "Drinks", label: "Drinks" },
              { value: "Snacks", label: "Snacks" },
              { value: "Grocceries", label: "Grocceries" },
              { value: "Household", label: "Household" },
              { value: "Stationaries", label: "Stationaries" },
              { value: "Water", label: "Water" },
              { value: "Alcoholics", label: "Alcoholics" },
              { value: "Fruits", label: "Fruits" },
              { value: "Others", label: "Others" },
            ]}
            showingText="Showing 08 of 100"
          />

          <div className="w-full overflow-x-auto select-none">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Order Number
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Customer Nos
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-gray-500 whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, index) => (
                  <tr
                    onClick={handleTransactionDetails}
                    key={index}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                  >
                    <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#6c6c6c] whitespace-nowrap">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#6C6C6C] whitespace-nowrap">
                      {order.customerNos}
                    </td>
                    <td className="px-6 py-5 text-[14px] whitespace-nowrap font-medium text-[#04802E]">
                      {order.amount}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium border ${getStatusStyle(order.status)} capitalize`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
                      {order.date}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <RightArrowIcon className="text-[#8A8A8A]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        className="p-[32px]  rounded-[20px]"
        open={showTransatctionDetails}
        onOpenChange={setShowTransatctionDetails}
      >
        <div className="space-y-[48px]">
          <div className="space-y-[34px]">
            <p className="text-center font-[600] text-[24px] text-[#131313]">
              Transaction Details
            </p>

            <div className="mx-auto gap-[24px] flex flex-col items-center">
              <div className="flex items-center">
                <Image
                  src={"/icons/onionloop.svg"}
                  width={50}
                  height={50}
                  alt="sender-icon"
                />
                <Image
                  className="translate-x-[-10px]"
                  src={"/icons/onionloop.svg"}
                  width={50}
                  height={50}
                  alt="sender-icon"
                />
              </div>

              <div className="space-y-[8px]">
                <p className="font-[600] text-[24px] text-[#363636]">
                  +₦12,362.50.
                </p>
                <p className="font-[400] text-center text-[14px] text-[#6C6C6C]">
                  AYODELE OKUNADE
                </p>

                <span className="py-[4px] px-[8px] rounded-full flex items-center gap-[4px] bg-[#F7F7F7] border border-[#C7C7C7] w-fit mx-auto font-[400] text-[12px] text-[#6C6C6C]">
                  <SuccessIcon /> Successful
                </span>
              </div>
            </div>

            <div className="space-y-[16px]">
              <p className="font-[600] text-[16px] text-[#363636]">
                Transaction details
              </p>
              <div className="flex justify-between items-center border-b border-b-[#C7C7C7] pb-[8px]">
                <p className="font-[500] text-[16px] text-[#363636]">
                  KFC Holdings
                </p>

                <p className="font-[400] text-[16px] text-[#6C6C6C]">
                  03 Feb, 2026 at 9:00 AM{" "}
                </p>
              </div>

              <OrderInfo
                title="From:"
                value={
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src={"/icons/onionloop.svg"}
                      height={18}
                      width={18}
                      alt="image"
                    />
                    Onionloop
                  </div>
                }
              />

              <OrderInfo
                title="To:"
                value={
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src={"/icons/onionloop.svg"}
                      height={18}
                      width={18}
                      alt="image"
                    />
                    Onionloop
                  </div>
                }
              />

              <OrderInfo title="Customer’s  Name:" value="Ayodele Okunade" />

              <OrderInfo
                title="Customer’s  Phone Number:"
                value="09023454678"
              />

              <OrderInfo title="Payment Method:" value="Bank Transfer" />

              <OrderInfo
                title="Transaction ID:"
                value={
                  <p className="flex items-center gap-[8px] font-[500] text-[16px] text-[#363636]">
                    TXN-7821 <CopyIcon />
                  </p>
                }
              />

              <OrderInfo title="Processed by:" value="David Anigbogu" />

              <OrderInfo title="Item Purchased" value="Snacks and Drinks" />

              <OrderInfo title="Order Number:" value="#0023" />

              <OrderInfo title="Order Amount:" value="₦11,500.00" />

              <OrderInfo title="VAT (7.5%):" value="₦11,500.00" />

              <OrderInfo title="Total Amount:" value="₦12.362.00" />
            </div>
          </div>
          <div className="space-y-[12px]">
            {toDo.map((item, i) => (
              <div
                key={i}
                className={`flex pb-[8px] justify-between items-center ${item.title === "Share Receipt" ? "border-b border-b-[#C7C7C7]" : "border-b-0"}   `}
              >
                <div className="flex gap-[8px]">
                  <div
                    className={`   w-[32px] h-[32px] flex justify-center items-center rounded-[2.4px]  ${item.title === "Share Receipt" ? "bg-[#E7F6EC]" : "bg-[#FBEAE9]"}  `}
                  >
                    {item.title === "Share Receipt" ? (
                      <ShareReceiptIcon className="text-[#04907E]" />
                    ) : (
                      <TroubleIcon className="text-[#CB1A14]" />
                    )}
                  </div>

                  <div className="space-y-[1px]">
                    <p
                      className={` ${item.title === "Share Receipt" ? "font-[500] text-[14px] text-[#131313]" : "font-[500] text-[14px] text-[#CB1A14]"}    `}
                    >
                      {item.title}
                    </p>
                    <p className="font-[400] text-[14px] text-[#6C6C6C]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <RightArrowIcon className="text-[#8A8A8A] w-[20px] h-[20px]" />
              </div>
            ))}
          </div>{" "}
        </div>
      </Modal>
    </>
  );
}
