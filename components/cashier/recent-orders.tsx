"use client";

import Link from "next/link";
import { ProfileHeader } from "../profile-header";
import { ArrowRightIcon, RightArrowIcon } from "@/components/icons/svgs";
import { recentOrders } from "@/lib/mockdata/recent-orders";
import SearchBar from "../ui/search-bar";

export default function RecentOrders() {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-[#E7F6EC] text-[#04802E]";
      case "Pending":
        return "bg-[#FEF6E7] text-[#DD900D]";
      case "Failed":
        return "bg-[#FBEAE9] text-[#CB1A14]";
      default:
        return "bg-[#E7F6EC] text-[#04802E]";
    }
  };

  return (
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

      <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-100">
        <SearchBar
          searchPlaceholder="Search  Products or Categories"
          statusPlaceholder="Sort by:"
          datePlaceholder="filter by:"
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
        {/* <SearchBar
          searchPlaceholder="Search by Order number, or amount"
          statusOptions={[
            { value: "All Status", label: "All Status" },
            { value: "Success", label: "Success" },
            { value: "Pending", label: "Pending" },
            { value: "Failed", label: "Failed" },
          ]}
          dateOptions={[
            { value: "This Month", label: "This Month" },
            { value: "Last Month", label: "Last Month" },
            { value: "Last 3 Months", label: "Last 3 Months" },
          ]}
          showingText="Showing 08 of 100"
        /> */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F7F7F7]">
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Order Number
                </th>
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Customer Name
                </th>
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Customer Nos
                </th>
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Amount
                </th>
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Status
                </th>
                <th className="text-left px-[15px] h-[93px] py-[10px] font-[600] text-[20px] text-[#6C6C6C]">
                  Date
                </th>
                <th className="px-[15px] h-[93px] py-[10px]"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-[#F7F7F7]"
                >
                  <td className="px-[15px] h-[93px] py-[10px] font-[500] text-[18px] text-[#6C6C6C]">
                    {order.orderNumber}
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px] font-[500] text-[18px] text-[#131313]">
                    {order.customerName}
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px] font-[500] text-[18px] text-[#131313]">
                    {order.customerNos}
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px] font-[500] text-[18.38px] text-[#04802E]">
                    {order.amount}
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px]">
                    <span
                      className={`px-[15.57px] py-[2.63px] rounded-[20px] font-[500] text-[18px] ${getStatusStyle(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px] font-[500] text-[18px] text-[#6C6C6C]">
                    {order.date}
                  </td>
                  <td className="px-[15px] h-[93px] py-[10px]">
                    <RightArrowIcon className="text-[#8A8A8A]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
