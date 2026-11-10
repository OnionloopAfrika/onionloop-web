"use client";

import React, { useState } from "react";
import { Modal } from "../modal";
import Select from "../select";

interface Transaction {
  id: string;
  location: string;
  amount: number;
  processedBy: string;
  transType: string;
  status: "Successful" | "Failed" | "Pending";
  date: string;
  senderName: string;
  recipientAccountName: string;
  fee: number;
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TNX 18377489930303362249",
    location: "Ikoyi branch",
    amount: 500000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "03 Feb, 2026 at 9:00 AM",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "KFC Holdings",
    fee: 0,
    description: "Money",
  },
  {
    id: "TXN-7820",
    location: "Gbagada",
    amount: 128000,
    processedBy: "Titi Folarin",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Pizza Hut",
    fee: 0,
    description: "Food",
  },
  {
    id: "TXN-7819",
    location: "Ojota",
    amount: 6500,
    processedBy: "Mary Olarenwaju",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Munchies",
    fee: 0,
    description: "Logistics",
  },
  {
    id: "TXN-7818",
    location: "St. Claire",
    amount: 3200,
    processedBy: "David Anigbogu",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "David Anigbogu",
    fee: 0,
    description: "Refund",
  },
  {
    id: "TXN-7817",
    location: "Egbeda",
    amount: 28400,
    processedBy: "Samuel Saidu",
    transType: "Payment",
    status: "Pending",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Supermarket",
    fee: 0,
    description: "Groceries",
  },
  {
    id: "TXN-7816",
    location: "Ajegunle",
    amount: 15000,
    processedBy: "Adanma Dappa",
    transType: "Payment",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Adanma Dappa",
    fee: 0,
    description: "Services",
  },
  {
    id: "TXN-7815",
    location: "Mushin",
    amount: 9300,
    processedBy: "Kemi Saidu",
    transType: "Payment",
    status: "Failed",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Kemi Saidu",
    fee: 0,
    description: "Subscription",
  },
  {
    id: "TXN-7814",
    location: "Festac",
    amount: 22100,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Titi Folarin",
    fee: 0,
    description: "Transfer",
  },
  {
    id: "TXN-7813",
    location: "Agungi",
    amount: 7600,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Boutique",
    fee: 0,
    description: "Clothes",
  },
  {
    id: "TXN-7812",
    location: "Gbagi",
    amount: 45000,
    processedBy: "Titi Folarin",
    transType: "Bank Transfer",
    status: "Successful",
    date: "2025-03-24 09:12",
    senderName: "OLUROMOKE BALOGUN",
    recipientAccountName: "Gas Station",
    fee: 0,
    description: "Fuel",
  },
];

export default function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [latestFilter, setLatestFilter] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (txn: Transaction) => {
    setSelectedTxn(txn);
    setModalOpen(true);
  };

  const formatAmount = (amount: number, id: string) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

    return <span className="text-[#04802E] font-medium">{formatted}</span>;
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "Successful") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#E8F5E9] text-[#04802E]">
          Successful
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FFF3E0] text-[#E65100]">
          Pending
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-[#FFEBEE] text-[#C62828]">
        Failed
      </span>
    );
  };

  const getModalStatusBadge = (status: Transaction["status"]) => {
    if (status === "Successful") {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-green-200 rounded-full text-[11px] font-medium text-green-700 bg-green-50/50">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Successful
        </div>
      );
    }
    if (status === "Pending") {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-amber-200 rounded-full text-[11px] font-medium text-amber-700 bg-amber-50/50">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Pending
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-200 rounded-full text-[11px] font-medium text-red-700 bg-red-50/50">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Failed
      </div>
    );
  };

  return (
    <div className="w-full bg-white font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1 max-w-4xl">
          <div className="relative w-full max-w-[320px]">
            <input
              type="text"
              placeholder="Search by transaction ID or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div className="w-[160px]">
            <Select
              value={locationFilter}
              onValueChange={setLocationFilter}
              options={[{ value: "all", label: "All Locations" }]}
              placeholder="All Locations"
            />
          </div>

          <div className="w-[140px]">
            <Select
              value={sortFilter}
              onValueChange={setSortFilter}
              options={[{ value: "completed", label: "Completed" }]}
              placeholder="Completed"
            />
          </div>

          <div className="w-[120px]">
            <Select
              value={latestFilter}
              onValueChange={setLatestFilter}
              options={[{ value: "latest", label: "Latest" }]}
              placeholder="Latest"
            />
          </div>
        </div>

        <span className="text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
          Showing {mockTransactions.length} transactions
        </span>
      </div>

      <div className="w-full overflow-x-auto border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                TXN ID
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Location
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Processed by
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Trans. Type
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(txn)}
              >
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-medium whitespace-nowrap">
                  {txn.id}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.location}
                </td>
                <td className="px-6 py-5 text-[14px] whitespace-nowrap">
                  {formatAmount(txn.amount, txn.id)}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.processedBy}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.transType}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  {getStatusBadge(txn.status)}
                </td>
                <td className="px-6 py-5 text-[14px] text-[#6C6C6C] font-normal whitespace-nowrap">
                  {txn.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Transaction Details"
        footer={
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-3.5 bg-gray-50 text-gray-500 font-semibold rounded-xl text-[15px] hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button className="w-full py-3.5 bg-[#C62828] text-white font-semibold rounded-xl text-[15px] hover:bg-[#B71C1C] transition-colors">
              Report Transaction
            </button>
          </div>
        }
      >
        {selectedTxn && (
          <div className="flex flex-col items-center w-full font-sans h-[60vh] overflow-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="relative flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#022E40] flex items-center justify-center z-10 border border-white">
                  <span className="text-white font-bold text-[10px]">M</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center -ml-2.5 z-0 border border-white">
                  <span className="text-white font-bold text-[10px]">M</span>
                </div>
              </div>
            </div>

            <div className="text-[26px] font-bold text-gray-900 mb-1">
              -₦
              {selectedTxn.amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </div>

            <div className="text-[14px] font-medium text-gray-500 uppercase tracking-wider mb-3">
              {selectedTxn.senderName}
            </div>

            <div className="mb-8">
              {getModalStatusBadge(selectedTxn.status)}
            </div>

            <div className="w-full flex flex-col gap-5 border-t border-gray-100 pt-6">
              <h3 className="text-[15px] font-semibold text-gray-800 self-start">
                Transaction Details
              </h3>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">From:</span>
                <span className="text-gray-700 font-semibold flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-teal-700 rounded-full inline-block"></span>
                  Onionloop
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">To:</span>
                <span className="text-gray-700 font-semibold flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    M
                  </span>
                  Moniepoint MFB
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">Date:</span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.date}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Transaction Location:
                </span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.location}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">Amount:</span>
                <span className="text-gray-700 font-semibold">
                  -₦
                  {selectedTxn.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Transaction Fee:
                </span>
                <span className="text-gray-700 font-semibold">
                  ₦
                  {selectedTxn.fee.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Sender's Name:
                </span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.senderName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Recipient's Account Name:
                </span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.recipientAccountName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Payment Method:
                </span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.transType}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-400 font-medium">
                  Transaction ID:
                </span>
                <span className="text-gray-700 font-semibold flex items-center gap-1.5 text-xs">
                  {selectedTxn.id}
                  <button className="text-gray-400 hover:text-[#6C6C6C]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px] pb-4">
                <span className="text-gray-400 font-medium">Description:</span>
                <span className="text-gray-700 font-semibold">
                  {selectedTxn.description}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
