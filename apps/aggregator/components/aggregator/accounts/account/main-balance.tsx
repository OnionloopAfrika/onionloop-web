"use client";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "@/components/ui/select";
import { CalendarIcon } from "@/components/icons/svgs";
import { Calendar } from "@/components/ui/calendar";

interface BalanceTransaction {
  id: string;
  transactionType: "Credit" | "Debit";
  balanceType: "Onboarding" | "Transaction" | null;
  amount: number;
  date: string;
}

const mockTransactions: BalanceTransaction[] = [
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Transaction",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Debit",
    balanceType: null,
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
  {
    id: "TR-2026-00124",
    transactionType: "Credit",
    balanceType: "Onboarding",
    amount: 2450600,
    date: "May 19,2026 at 09:15am",
  },
];

const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseBusinessDate(dateStr: string): Date {
  const match = dateStr.match(
    /^([A-Za-z]{3})\s+(\d{1,2}),(\d{4})\s+at\s+(.+)$/,
  );
  if (!match) return new Date(NaN);
  const [, mmm, dd, yyyy, time] = match;
  const month = MONTH_MAP[mmm];
  if (month === undefined) return new Date(NaN);
  const timeStr = time.trim();
  return new Date(
    `${yyyy}-${String(month + 1).padStart(2, "0")}-${String(dd).padStart(2, "0")}T${timeStr}`,
  );
}

function parseFilterDate(dateStr: string): Date {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return new Date(NaN);
  const [dd, mm, yyyy] = parts;
  return new Date(`${yyyy}-${mm}-${dd}`);
}

export default function MainBalance() {
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("08-05-2026");
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(2026, 4, 8),
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((txn) => {
      if (typeFilter && typeFilter !== "all") {
        const typeMap: Record<string, BalanceTransaction["transactionType"]> = {
          credit: "Credit",
          debit: "Debit",
        };
        if (txn.transactionType !== typeMap[typeFilter]) return false;
      }

      if (dateFilter) {
        const itemDate = parseBusinessDate(txn.date);
        const filterDate = parseFilterDate(dateFilter);
        if (isNaN(itemDate.getTime()) || isNaN(filterDate.getTime()))
          return false;
        if (
          itemDate.getFullYear() !== filterDate.getFullYear() ||
          itemDate.getMonth() !== filterDate.getMonth() ||
          itemDate.getDate() !== filterDate.getDate()
        ) {
          return false;
        }
      }

      return true;
    });
  }, [typeFilter, dateFilter]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionTypeBadge = (
    type: BalanceTransaction["transactionType"],
  ) => {
    if (type === "Credit") {
      return <Badge variant="successful">Credit</Badge>;
    }
    return <Badge variant="failed">Debit</Badge>;
  };

  const getBalanceTypeBadge = (type: BalanceTransaction["balanceType"]) => {
    if (type === "Onboarding") {
      return <Badge variant="onboarding">Onboarding</Badge>;
    }
    if (type === "Transaction") {
      return <Badge variant="transaction">Transaction</Badge>;
    }
    return <span className="text-[14px] font-[500] text-[#6C6C6C]">---</span>;
  };

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans">
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 w-fit max-lg:w-full">
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
          options={[
            { value: "all", label: "All Transaction Types" },
            { value: "credit", label: "Credit" },
            { value: "debit", label: "Debit" },
          ]}
          placeholder="All Transaction Types"
        />

        <div ref={datePickerRef} className="relative w-full md:w-[200px]">
          <button
            type="button"
            aria-label="Select balance date"
            aria-expanded={isCalendarOpen}
            onClick={() => setIsCalendarOpen((open) => !open)}
            className="flex h-[48px] w-full items-center justify-between rounded-[6px] border border-[#E5E7EB] bg-[#f7f7f7] px-3 py-3 text-[14px] font-[500] text-[#A8A8A8]"
          >
            <span>{dateFilter}</span>
            <CalendarIcon className="h-4 w-4 text-[#8A8A8A]" />
          </button>
          {isCalendarOpen && (
            <div className="absolute left-0 top-full z-[60] mt-2">
              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setDateFilter(
                    `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`,
                  );
                  setIsCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TXN ID</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead>Balance Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((txn, i) => (
              <TableRow key={i}>
                <TableCell>{txn.id}</TableCell>
                <TableCell>
                  {getTransactionTypeBadge(txn.transactionType)}
                </TableCell>
                <TableCell>{getBalanceTypeBadge(txn.balanceType)}</TableCell>
                <TableCell>{formatAmount(txn.amount)}</TableCell>
                <TableCell>{txn.date}</TableCell>
              </TableRow>
            ))}
            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  No transactions match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
