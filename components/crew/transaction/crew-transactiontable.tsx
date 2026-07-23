"use client";

import { OrderInfo } from "@/components/cashier/order-details";
import { CopyIcon, SuccessIcon } from "@/components/icons/svgs";
import Button from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Image from "next/image";
import React, { useState } from "react";

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  processedBy: string;
  transType: string;
  status: "Successful" | "Failed" | "Pending" | "Refunded";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-7821",
    customerName: "Adaeze Nwosu",
    amount: 45000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7820",
    customerName: "Emeka Eze",
    amount: 12800,
    processedBy: "Titi Folarin",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7819",
    customerName: "Emeka Eze",
    amount: 6500,
    processedBy: "Mary Olarenwaju",
    transType: "Bank Transfer",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7818",
    customerName: "Chidinma Obi",
    amount: 3200,
    processedBy: "David Anigbogu",
    transType: "Bank Transfer",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7817",
    customerName: "Femi Adeyemi",
    amount: 28400,
    processedBy: "Samuel Saidu",
    transType: "Payment",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7816",
    customerName: "Nkechi Uba",
    amount: 15000,
    processedBy: "Adanma Dappa",
    transType: "Payment",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7815",
    customerName: "Nkechi Uba",
    amount: 9300,
    processedBy: "Kemi Saidu",
    transType: "Payment",
    status: "Failed",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7814",
    customerName: "Gbenga Olanrewaju",
    amount: 22100,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7813",
    customerName: "Adaeze Nwosu",
    amount: 7600,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7812",
    customerName: "Emeka Eze",
    amount: 45000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Pending",
    date: "2025-03-24 09:12",
  },
  {
    id: "TXN-7811",
    customerName: "Ifeoma Okafor",
    amount: 18500,
    processedBy: "Chidera Nwankwo",
    transType: "Refund",
    status: "Refunded",
    date: "2025-03-24 09:12",
  },
];

export function CrewTransactionTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Successful");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortFilter, setSortFilter] = useState("Latest");
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  const formatAmount = (amount: number, status: Transaction["status"]) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

    const colorClass =
      status === "Successful"
        ? "text-[#04802E]"
        : status === "Pending"
          ? "text-[#DD900D]"
          : status === "Refunded"
            ? "text-[#0D5EBA]"
            : "text-[#C62828]";
    const prefix = status === "Refunded" ? "-" : "+";
    return (
      <span className={`${colorClass} font-[500]`}>
        {prefix}
        {formatted}
      </span>
    );
  };

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesStatus = txn.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.amount.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "Successful") {
      return (
        <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-[#E7F6EC] text-[#04802E] border border-[#04802E]">
          Successful
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-[#FEF6E7] text-[#DD900D] border border-[#DD900D]">
          Pending
        </span>
      );
    }
    if (status === "Refunded") {
      return (
        <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-[#E3EFFC] text-[#0D5EBA] border border-[#0D5EBA]">
          Refunded
        </span>
      );
    }
    return (
      <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-[#FBEAE9] text-[#C62828] border border-[#C62828]">
        Failed
      </span>
    );
  };

  return (
    <div className="w-full bg-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1 max-w-4xl">
          <div className="relative w-full sm:max-w-[320px]">
            <SearchInput />
          </div>

          <div className="w-[160px]">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "Successful", label: "Successful" },
                { value: "Failed", label: "Failed" },
                { value: "Pending", label: "Pending" },
                { value: "Refunded", label: "Refunded" },
              ]}
              placeholder="Successful"
            />
          </div>

          <div className="w-[160px]">
            <Select
              value={locationFilter}
              onValueChange={setLocationFilter}
              options={[{ value: "All Locations", label: "All Locations" }]}
              placeholder="All Locations"
            />
          </div>

          <div className="w-[120px]">
            <Select
              value={sortFilter}
              onValueChange={setSortFilter}
              options={[
                { value: "Latest", label: "Latest" },
                { value: "Oldest", label: "Oldest" },
                { value: "Highest", label: "Highest" },
                { value: "Lowest", label: "Lowest" },
              ]}
              placeholder="Latest"
            />
          </div>
        </div>

        <span className="text-[14px] text-[#6C6C6C] font-[500] whitespace-nowrap">
          Showing {filteredTransactions.length} transactions
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto select-none">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-y border-gray-50 bg-[#F9FAFB]">
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  TXN ID
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Processed by
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Transaction Type
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-gray-500 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 cursor-pointer"
                  onClick={() => setShowTransactionDetails(true)}
                >
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
                    {txn.id}
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#6C6C6C] whitespace-nowrap">
                    {txn.customerName}
                  </td>
                  <td className="px-6 py-5 text-[14px] whitespace-nowrap">
                    {formatAmount(txn.amount, txn.status)}
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#6C6C6C] whitespace-nowrap">
                    {txn.processedBy}
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#6C6C6C] whitespace-nowrap">
                    {txn.transType}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(txn.status)}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#6C6C6C] whitespace-nowrap">
                    {txn.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        className="p-[32px]"
        open={showTransactionDetails}
        onOpenChange={setShowTransactionDetails}
        title="Transaction Details"
        description="They will receive an invite to download the onionloop staff app"
        footer={
          <div className="grid grid-cols-2 gap-[16px]">
            <Button
              onClick={() => setShowTransactionDetails(false)}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button variant="danger">Report Transaction</Button>
          </div>
        }
      >
        <div className="space-y-[48px]">
          <div className="space-y-[40px]">
            <div className="space-y-[20px] pb-[20px] border-b border-b-[#C7C7C7]">
              <div className=" flex justify-center items-center">
                <Image
                  src={"/icons/onionloop.svg"}
                  width={32}
                  height={32}
                  alt="onionloop-logo"
                  className="z-1"
                />

                <Image
                  src={"/icons/moniepoint.svg"}
                  width={32}
                  height={32}
                  alt="moniepoint-logo"
                  className="translate-x-[-5px]"
                />
              </div>

              <div className="space-y-[6px]">
                <p className="text-center font-[600] text-[18px] text-[#363636]">
                  +₦50,000.00
                </p>

                <p className="text-center font-[400] text-[14px] text-[#6C6C6C]">
                  SOMTOCHUKWU ANOZIE
                </p>

                <span className="py-[4px] px-[8px] rounded-full flex items-center gap-[4px] bg-[#F7F7F7] border border-[#C7C7C7] w-fit mx-auto font-[400] text-[12px] text-[#6C6C6C]">
                  <SuccessIcon /> Successful
                </span>
              </div>
            </div>

            <div className="space-y-[16px]">
              <p className="font-[500] text-[16px] text-[#6C6C6C]">
                Transaction Details
              </p>

              <div className="space-y-[24px]">
                <OrderInfo
                  title="From:"
                  value={
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src={"/icons/moniepoint.svg"}
                        height={18}
                        width={18}
                        alt="image"
                      />
                      Moniepoint MFB
                    </div>
                  }
                />

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
                      Moniepoint MFB
                    </div>
                  }
                />

                <OrderInfo title="To:" value="03 Feb, 2026 at 9:00 AM " />

                <OrderInfo title="Transaction Location:" value="Ikoyi branch" />

                <OrderInfo title="Amount:" value="-₦50,000.00" />

                <OrderInfo title="Transaction Fee:" value="₦0.00" />

                <OrderInfo title="Sender’s  Name:" value="OLUROMOKE BALOGUN" />

                <OrderInfo
                  title="Recipient’s Account Name:"
                  value="KFC Holdings"
                />

                <OrderInfo title="Payment Method:" value="Bank Transfer" />

                <OrderInfo
                  title="Transaction ID:"
                  value={
                    <p className="flex items-center gap-[8px] font-[500] text-[16px] text-[#363636]">
                      TNX 183774899300303362249 <CopyIcon />
                    </p>
                  }
                />

                <OrderInfo title="Description:" value="Money" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
