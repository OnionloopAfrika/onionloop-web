"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import Select from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import React, { useMemo, useState } from "react";

const PAGE_SIZE = 5;

interface BusinessTransaction {
  id: string;
  customerName: string;
  txnType: string;
  amount: number;
  earnings: number;
  status: "Successful" | "Failed" | "Pending";
  date: string;
}

const mockTransactions: BusinessTransaction[] = [
  {
    id: "TXN-0091",
    customerName: "Joseph Maduabuchi",
    txnType: "Transfer",
    amount: 250000,
    earnings: 250,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Oluwafunmiike Robbin",
    txnType: "QR Payment",
    amount: 120000,
    earnings: 120,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Oladimeji Yemisi",
    txnType: "QR Payment",
    amount: 120000,
    earnings: 120,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "John Chinedu",
    txnType: "QR Payment",
    amount: 50000,
    earnings: 50,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Grace Wanjiku",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Philip Tonbara",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Joshua Agbasi",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Mary Adebayo",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "David Iwalewa",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TXN-0091",
    customerName: "Hannah Nwankwo",
    txnType: "Transfer",
    amount: 300000,
    earnings: 300,
    status: "Successful",
    date: "May 19,2026 at 09:15am",
  },
];

export function BusinessTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("successful");
  const [activeTab, setActiveTab] = useState("Transactions");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((txn) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          txn.id.toLowerCase().includes(q) ||
          txn.customerName.toLowerCase().includes(q) ||
          txn.txnType.toLowerCase().includes(q) ||
          String(txn.amount).includes(q) ||
          String(txn.earnings).includes(q);
        if (!matchesSearch) return false;
      }

      if (statusFilter && statusFilter !== "all") {
        const statusMap: Record<string, BusinessTransaction["status"]> = {
          successful: "Successful",
          pending: "Pending",
          failed: "Failed",
        };
        if (txn.status !== statusMap[statusFilter]) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredTransactions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredTransactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: BusinessTransaction["status"]) => {
    if (status === "Successful") {
      return <Badge variant="successful">Successful</Badge>;
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

  return (
    <div className="w-full space-y-[16px] font-sans">
      <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
          <div className="relative w-full sm:max-w-[360px]">
            <SearchInput
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
              }}
              categories={[]}
              products={[]}
              employees={[]}
              chats={[]}
              placeholder="Search  TXN ID, customer name, type, Amount"
            />
          </div>

          <div className="w-[180px] max-lg:w-full">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              options={[
                { value: "all", label: "All Status" },
                { value: "successful", label: "Status: Successful" },
                { value: "pending", label: "Status: Pending" },
                { value: "failed", label: "Status: Failed" },
              ]}
              placeholder="Status: Successful"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TXN ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>TXN Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>TXN Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((txn, i) => (
                <TableRow key={i}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.customerName}</TableCell>
                  <TableCell>{txn.txnType}</TableCell>
                  <TableCell>{formatCurrency(txn.amount)}</TableCell>
                  <TableCell>{formatCurrency(txn.earnings)}</TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>
                    <button className="text-[16px] font-[500] text-[#024E44] hover:underline">
                      Review
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    No transactions match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 p-4">
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={filteredTransactions.length}
          itemLabel="transactions"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
