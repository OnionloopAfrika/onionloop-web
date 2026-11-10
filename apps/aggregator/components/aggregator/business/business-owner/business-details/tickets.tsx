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
import React, { useMemo, useState } from "react";

interface Ticket {
  id: string;
  customerName: string;
  txnType: string;
  amount: number;
  subject: string;
  status: "Resolved" | "Pending";
  date: string;
}

const mockTickets: Ticket[] = [
  {
    id: "ISU-0091",
    customerName: "Joseph Maduabuchi",
    txnType: "Transfer",
    amount: 250000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Oluwafunmiike Robbin",
    txnType: "QR Payment",
    amount: 120000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Oladimeji Yemisi",
    txnType: "QR Payment",
    amount: 120000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "John Chinedu",
    txnType: "QR Payment",
    amount: 50000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Grace Wanjiku",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Philip Tonbara",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Joshua Agbasi",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Mary Adebayo",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Pending",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "David Iwalewa",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "ISU-0091",
    customerName: "Hannah Nwankwo",
    txnType: "Transfer",
    amount: 300000,
    subject: "Money Debited But Not Received",
    status: "Resolved",
    date: "May 19,2026 at 09:15am",
  },
];

export function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          ticket.id.toLowerCase().includes(q) ||
          ticket.customerName.toLowerCase().includes(q) ||
          ticket.txnType.toLowerCase().includes(q) ||
          String(ticket.amount).includes(q) ||
          ticket.subject.toLowerCase().includes(q) ||
          ticket.status.toLowerCase().includes(q) ||
          ticket.date.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (statusFilter && statusFilter !== "all") {
        const statusMap: Record<string, Ticket["status"]> = {
          resolved: "Resolved",
          pending: "Pending",
        };
        if (ticket.status !== statusMap[statusFilter]) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    if (status === "Resolved") {
      return <Badge variant="ticket_resolved">Resolved</Badge>;
    }
    return <Badge variant="ticket_pending">Pending</Badge>;
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
        <div className="relative w-full sm:max-w-[320px]">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            categories={[]}
            products={[]}
            employees={[]}
            chats={[]}
          />
        </div>

        <div className="w-[140px] max-lg:w-full">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={[
              { value: "all", label: "All Status" },
              { value: "resolved", label: "Resolved" },
              { value: "pending", label: "Pending" },
            ]}
            placeholder="All Status"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>TXN Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket, i) => (
              <TableRow key={i}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>{ticket.txnType}</TableCell>
                <TableCell>{formatCurrency(ticket.amount)}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                <TableCell>{ticket.date}</TableCell>
              </TableRow>
            ))}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  No tickets match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
